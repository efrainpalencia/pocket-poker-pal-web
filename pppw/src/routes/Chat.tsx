import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { askText, transcribeAudio } from "../lib/api";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useChatSession } from "../store/useChatSession";
import MessageBubble from "../components/chat/MessageBubble";
import type { ChatMessage } from "../lib/types";
import { Button } from "../components/ui/Button";
import Chatbot from "../assets/icons8-chatbot-48.png";

const uid = () => Math.random().toString(36).slice(2);

// Handy suggested questions for the empty state (mobile-friendly chips)
const SUGGESTIONS = [
    "What is a string bet?",
    "Can I expose one card if I folded?",
    "When is an all-in binding?",
    "How do I break a tie with kickers?",
];

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
        if (!rec.lastBlob) return;
        if (processedBlobRef.current === rec.lastBlob) return;
        processedBlobRef.current = rec.lastBlob;

        (async () => {
            setBusyTranscribe(true);
            try {
                const { transcript, error } = await transcribeAudio(rec.lastBlob!);
                const text = (transcript ?? "").trim();
                if (text) {
                    setInput(text);
                } else {
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

    // --- UI helpers: auto-grow textarea + keyboard submit (Enter to send, Shift+Enter newline)
    const taRef = useRef<HTMLTextAreaElement | null>(null);
    const autoGrow = () => {
        const el = taRef.current;
        if (!el) return;
        el.style.height = "0px";
        const next = Math.min(el.scrollHeight, 160); // cap growth so it doesn’t overtake the screen
        el.style.height = next + "px";
    };
    useEffect(() => { autoGrow(); }, [input]);

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const q = input.trim();
            if (!q || busy) return;
            onSubmit(e as unknown as FormEvent);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary text-white">
            {/* Header */}
            <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 border-b border-white/10 bg-secondary/95 backdrop-blur">
                <div className="flex items-center gap-2">
                    <img
                        src={Chatbot}
                        alt="Chatbot"
                        className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                        loading="eager"
                        decoding="async"
                    />
                    <span className="text-sm sm:text-base font-semibold">Ask Pocket Poker Pal</span>
                </div>

                {/* Clear button: icon on xs, text on sm+ */}
                <div className="flex items-center">
                    <button
                        className="inline-flex items-center justify-center rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-white/5 hover:bg-white/10 disabled:opacity-50 transition"
                        onClick={clear}
                        disabled={busy}
                        aria-label="Clear conversation"
                        title="Clear"
                    >
                        <span className="sm:hidden">🗑️</span>
                        <span className="hidden sm:inline">Clear</span>
                    </button>
                </div>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto">
                <div
                    ref={listRef}
                    onScroll={onScroll}
                    className="mx-auto w-full max-w-3xl px-3 sm:px-4 py-4"
                >
                    {messages.length === 0 ? (
                        <div className="py-10">
                            <p className="text-center text-gray-400">Do you have a poker question?</p>
                            {/* Suggestion chips (wrap on small screens) */}
                            <ul className="mt-4 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
                                {SUGGESTIONS.map((s) => (
                                    <li key={s}>
                                        <button
                                            type="button"
                                            onClick={() => setInput(s)}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:text-sm hover:bg-white/10"
                                        >
                                            {s}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        messages.map((m) => <MessageBubble key={m.id} msg={m} />)
                    )}
                </div>

                {/* Scroll-to-bottom FAB */}
                {!autoScroll && (
                    <div className="sticky bottom-24 sm:bottom-28 flex justify-center pointer-events-none">
                        <button
                            onClick={() => {
                                if (!listRef.current) return;
                                listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
                            }}
                            className="pointer-events-auto rounded-full px-3 py-1.5 text-xs bg-white text-black shadow"
                            aria-label="Scroll to latest"
                            title="Scroll to latest"
                        >
                            Jump to latest ↓
                        </button>
                    </div>
                )}
            </div>

            {/* Composer (sticky with safe-area for mobile keyboards) */}
            <form onSubmit={onSubmit} className="border-t border-white/10 bg-secondary sticky bottom-0">
                <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 py-2 sm:py-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {/* Auto-growing textarea for better mobile typing */}
                        <div className="flex-1">
                            <label htmlFor="chat-input" className="sr-only">Your question</label>
                            <textarea
                                id="chat-input"
                                ref={taRef}
                                rows={1}
                                onInput={autoGrow}
                                className="w-full resize-none max-h-40 min-h-[44px] border border-white/15 bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/60 placeholder:text-gray-400"
                                placeholder="Type your question… (Enter to send, Shift+Enter for a new line)"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={onKeyDown}
                                disabled={busyAsk}
                                aria-label="Your question"
                            />
                        </div>

                        <div className="flex items-stretch gap-2">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={busy || !input.trim()}
                                className="whitespace-nowrap"
                                aria-label="Send message"
                            >
                                Send
                            </Button>

                            {canRecord && (
                                <>
                                    {rec.status !== "recording" ? (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                processedBlobRef.current = null;
                                                rec.start();
                                            }}
                                            disabled={busy}
                                            className="rounded-xl px-3 py-2 min-w-[44px] bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
                                            title="Record voice"
                                            aria-label="Start recording"
                                        >
                                            🎙️
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={rec.stop}
                                            className="rounded-xl px-3 py-2 min-w-[44px] bg-red-600 text-white"
                                            title="Stop recording"
                                            aria-label="Stop recording"
                                        >
                                            ⏹
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* recorder status row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2">
                        {rec.status === "recording" && <span>Recording… {rec.seconds}s — tap ⏹ when done.</span>}
                        {busyTranscribe && <span>Transcribing…</span>}
                        {rec.error && <span className="text-red-400">{rec.error}</span>}

                        {/* Right-side cluster */}
                        <div className="ml-auto flex items-center gap-3">
                            {rec.lastUrl && (
                                <audio
                                    className="max-w-[55vw] sm:max-w-xs"
                                    controls
                                    src={rec.lastUrl ?? undefined}
                                    aria-label="Recording preview"
                                />
                            )}
                            {rec.lastBlob && !busyTranscribe && (
                                <button
                                    type="button"
                                    className="underline"
                                    onClick={() => {
                                        rec.reset();
                                        processedBlobRef.current = null;
                                        setInput("");
                                    }}
                                >
                                    Discard recording
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
