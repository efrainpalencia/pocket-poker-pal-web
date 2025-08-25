import type { ChatMessage } from "../../lib/types";
import { memo } from "react";

export default memo(function MessageBubble({ msg }: { msg: ChatMessage }) {
    const isUser = msg.role === "user";
    return (
        <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"} my-1`}>
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-6 whitespace-pre-wrap
          ${isUser ? "bg-primary text-white" : "bg-tertiary text-secondary"}`}
            >
                {msg.content}
            </div>
        </div>
    );
});
