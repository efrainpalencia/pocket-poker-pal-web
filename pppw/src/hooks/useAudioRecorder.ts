// src/hooks/useAudioRecorder.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "recording" | "stopped" | "error";

function pickMimeType(): string | undefined {
    if (typeof MediaRecorder === "undefined") return undefined;
    const candidates = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/ogg",
    ];
    return candidates.find((t) => MediaRecorder.isTypeSupported(t)) || undefined;
}

export function useAudioRecorder() {
    const streamRef = useRef<MediaStream | null>(null);
    const recRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);

    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<string | null>(null);
    const [lastBlob, setLastBlob] = useState<Blob | null>(null);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<number | null>(null);

    const isSupported = useMemo(
        () => typeof navigator !== "undefined" && !!navigator.mediaDevices && typeof MediaRecorder !== "undefined",
        []
    );

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setSeconds(0);
        timerRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    };
    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const start = useCallback(async () => {
        if (!isSupported) {
            setError("This browser doesn't support MediaRecorder.");
            setStatus("error");
            return;
        }
        if (status === "recording") return;

        setError(null);
        setLastBlob(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            const mimeType = pickMimeType();
            const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            recRef.current = rec;
            chunksRef.current = [];

            rec.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
            };
            rec.onstop = () => {
                const type = mimeType ?? (rec.mimeType || "audio/webm");
                const blob = new Blob(chunksRef.current, { type });
                chunksRef.current = [];
                setLastBlob(blob);
                setStatus("stopped");

                // stop tracks
                stream.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            };

            rec.start(); // you can pass a timeslice (e.g., 250ms) if you want periodic chunks
            setStatus("recording");
            startTimer();
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Failed to start microphone";
            setError(msg);
            setStatus("error");
        }
    }, [isSupported, status]);

    const stop = useCallback(() => {
        if (recRef.current && recRef.current.state !== "inactive") {
            stopTimer();
            recRef.current.stop();
        }
    }, []);

    const reset = useCallback(() => {
        setLastBlob(null);
        setError(null);
        setStatus("idle");
        setSeconds(0);
        chunksRef.current = [];
        // best‑effort cleanup
        try {
            recRef.current?.stop();
        } catch {}
        recRef.current = null;
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
    }, []);

    useEffect(() => {
        return () => {
            stopTimer();
            try { recRef.current?.stop(); } catch {}
            streamRef.current?.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
            recRef.current = null;
        };
    }, []);

    const lastUrl = useMemo(
        () => (lastBlob ? URL.createObjectURL(lastBlob) : null),
        [lastBlob]
    );

    return {
        isSupported,
        status,
        error,
        seconds,
        lastBlob, // Blob of type audio/webm or audio/ogg
        lastUrl,  // for <audio controls src={lastUrl}>
        start,
        stop,
        reset,
    };
}
