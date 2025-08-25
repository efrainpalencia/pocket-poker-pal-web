import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { askText, transcribeAudio } from "../lib/api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useChatSession } from "../store/useChatSession";
import MessageBubble from "../components/chat/MessageBubble";
import type { ChatMessage } from "../lib/types";
import { Button } from "../components/ui/Button";

const uid = () => Math.random().toString(36).slice(2);

export default function Chat() {
    const { messages, add, replaceById, clear } = useChatSession();
    const [input, setInput] = useState("");
    const [busyAsk, setBusyAsk] = useState(false);
    const [busyTranscribe, setBusyTranscribe] = useState(false);
    const listRef = useRef<HTMLDivElement | null>(null);

    // auto-scroll when a new message arrives and user is near bottom
    const [autoScroll, setAutoScroll] = useState(true);
    useEffect(() => {
        if (!listRef.current || !autoScroll) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, autoScroll]);

    const onScroll = () => {
        if (!listRef.current) return;
        const el = listRef.current;
        const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        setAutoScroll(nearBottom);
    };

    async function sendQuestion(question: string) {
        const userMsg: ChatMessage = { id: uid(), role: "user", content: question, createdAt: Date.now() };
        const placeholder: ChatMessage = { id: uid(), role: "assistant", content: "Thinking…", createdAt: Date.now() };
        add(userMsg);
        add(placeholder);
        setBusyAsk(true);
        try {
            const res = await askText(question);
            const answer = res.answer ?? res.error ?? "No answer returned.";
            replaceById(placeholder.id, { content: answer });
        } catch (e: any) {
            replaceById(placeholder.id, { content: `Error: ${e?.message || "failed to ask"}` });
        } finally {
            setBusyAsk(false);
        }
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const q = input.trim();
        if (!q || busyAsk || busyTranscribe) return;
        setInput("");
        await sendQuestion(q);
    };

    // Audio (MediaRecorder) — auto-transcribe when recording stops
    const rec = useAudioRecorder();
    const canRecord = useMemo(() => rec.isSupported, [rec.isSupported]);
    const processedBlobRef = useRef<Blob | null>(null);

    useEffect(() => {
        // When a new blob appears (recording stopped), auto-transcribe and populate input
        if (!rec.lastBlob) return;
        if (processedBlobRef.current === rec.lastBlob) return; // avoid duplicate runs
        processedBlobRef.current = rec.lastBlob;

        (async () => {
            setBusyTranscribe(true);
            try {
                const { transcript, error } = await transcribeAudio(rec.lastBlob!);
                const text = (transcript ?? "").trim();
                if (text) {
                    setInput(text); // let user review/edit
                } else {
                    // Put the error/empty state into the input so they can see/edit it
                    setInput(error ? `[Transcription error] ${error}` : "[No speech detected]");
                }
            } catch (e: any) {
                setInput(`[Transcription failed: ${e?.message || "unknown error"}]`);
            } finally {
                setBusyTranscribe(false);
            }
        })();
    }, [rec.lastBlob]);

    const busy = busyAsk || busyTranscribe;

    return (
        <div className="min-h-full flex flex-col">
            {/* header */}
            <div className="h-16 flex items-center justify-between px-4 border-b bg-secondary">
                <div className="font-semibold">Pocket Poker Pal — Chat</div>
                <div className="flex gap-2">
                    <button
                        className="text-sm px-3 py-1 rounded bg-secondary hover:bg-gray-500 disabled:opacity-50"
                        onClick={clear}
                        disabled={busy}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* message list */}
            <div ref={listRef} onScroll={onScroll} className="flex-1 overflow-y-auto px-3 py-4 bg-secondary">
                {messages.length === 0 && (
                    <div className="text-center text-gray-500 py-10">Ask a question about the rulebook.</div>
                )}
                {messages.map((m) => (
                    <MessageBubble key={m.id} msg={m} />
                ))}
            </div>

            {/* composer */}
            <form onSubmit={onSubmit} className="border-t bg-secondary p-3">
                <div className="flex gap-2 items-center">
                    <input
                        className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring"
                        placeholder="Type your question…"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={busyAsk} // allow edits while transcribing? toggle if you prefer
                    />
                    <Button type="submit" variant="primary" disabled={busy || !input.trim()}>
                        Send
                    </Button>

                    {canRecord && (
                        <>
                            {rec.status !== "recording" ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        // reset previous processed blob marker so a new stop triggers transcription
                                        processedBlobRef.current = null;
                                        rec.start();
                                    }}
                                    disabled={busy}
                                    className="px-3 py-2 rounded-xl bg-secondary outline-1 disabled:opacity-50"
                                    title="Record voice"
                                    aria-label="Start recording"
                                >
                                    🎙️
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={rec.stop}
                                    className="px-3 py-2 rounded-xl bg-red-600 text-white"
                                    title="Stop"
                                    aria-label="Stop recording"
                                >
                                    ⏹
                                </button>
                            )}
                        </>
                    )}
                </div>

                {/* recorder status row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
                    {rec.status === "recording" && <span>Recording… {rec.seconds}s — tap ⏹ when done.</span>}
                    {busyTranscribe && <span>Transcribing…</span>}
                    {rec.error && <span className="text-red-600">{rec.error}</span>}
                    {rec.lastUrl && (
                        <audio
                            className="ml-auto max-w-full"
                            controls
                            src={rec.lastUrl ?? undefined}
                            aria-label="Recording preview"
                        />
                    )}
                    {rec.lastBlob && !busyTranscribe && (
                        <button
                            type="button"
                            className="ml-auto underline"
                            onClick={() => {
                                // let the user discard the transcript and recording
                                rec.reset();
                                processedBlobRef.current = null;
                                setInput("");
                            }}
                        >
                            Discard recording
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
