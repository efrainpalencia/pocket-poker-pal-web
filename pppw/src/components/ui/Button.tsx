import React from "react";
import clsx from "clsx";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export const Button = ({
                           type = "button",
                           variant = "primary",
                           children,
                           onClick,
                           disabled = false,
                           className = "",
                       }: ButtonProps) => {
    const base =
        "px-4 py-2 text-sm font-medium rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
        primary:
        // uses your --color-primary token (fallback to orange if you prefer)
            "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
        secondary:
        // uses your --color-secondary token
            "bg-secondary text-white outline-2 outline-offset-2 outline-tertiary hover:bg-secondary/90 focus:ring-secondary",
        danger:
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                base,
                variants[variant],
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {children}
        </button>
    );
};
