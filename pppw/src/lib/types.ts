export type Role = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: Role;
    content: string;
    createdAt: number; // epoch ms
}

export interface AskTextResponse {
    answer?: string;
    error?: string;
}

export interface AskAudioResponse {
    answer?: string;
    error?: string;
}
