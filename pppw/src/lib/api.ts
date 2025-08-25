const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "");

async function json<T>(res: Response): Promise<T> {
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
            const body = await res.json();
            msg = body?.error || msg;
        } catch { /* ignore */ }
        throw new Error(msg);
    }
    return res.json() as Promise<T>;
}

export async function askText(question: string) {
    const res = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
    });
    return json<{ answer?: string; error?: string }>(res);
}

export async function transcribeAudio(audio: Blob) {
    let type = audio.type || "audio/webm";
    if (!type.startsWith("audio/")) {
        if (type === "video/webm" || type === "") type = "audio/webm";
    }
    const ext = type.includes("webm") ? "webm" :
        type.includes("ogg")  ? "ogg"  :
            type.includes("wav")  ? "wav"  : "bin";
    const file = new File([audio], `recording.${ext}`, { type });

    const fd = new FormData();
    fd.append("audio", file, file.name);

    const res = await fetch(`${API_BASE}/api/transcribe-audio`, { method: "POST", body: fd });
    return json<{ transcript?: string; error?: string }>(res);
}
