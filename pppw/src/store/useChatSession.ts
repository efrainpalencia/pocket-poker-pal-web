import { create } from "zustand";
import type { ChatMessage } from "../lib/types";

type ChatState = {
    messages: ChatMessage[];
    add: (m: ChatMessage) => void;
    replaceById: (id: string, patch: Partial<ChatMessage>) => void;
    clear: () => void;
};

const STORAGE_KEY = "pppw.chat.v1";

export const useChatSession = create<ChatState>((set, get) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial: ChatMessage[] = saved ? JSON.parse(saved) : [];

    const persist = (msgs: ChatMessage[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    };

    return {
        messages: initial,
        add: (m) => {
            const next = [...get().messages, m];
            set({ messages: next });
            persist(next);
        },
        replaceById: (id, patch) => {
            const next = get().messages.map((m) => (m.id === id ? { ...m, ...patch } : m));
            set({ messages: next });
            persist(next);
        },
        clear: () => {
            set({ messages: [] });
            persist([]);
        },
    };
});
