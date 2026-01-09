"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TextTypeProps {
    text: string[];
    typingSpeed?: number;
    pauseDuration?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
    className?: string;
}

export function TextType({
    text,
    typingSpeed = 50,
    pauseDuration = 1000,
    showCursor = true,
    cursorCharacter = "|",
    className,
}: TextTypeProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const currentString = text[currentTextIndex % text.length];

        if (isDeleting) {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayedText(currentString.substring(0, displayedText.length - 1));
                }, typingSpeed / 2);
            } else {
                setIsDeleting(false);
                setCurrentTextIndex((prev) => prev + 1);
            }
        } else {
            if (displayedText.length < currentString.length) {
                timeout = setTimeout(() => {
                    setDisplayedText(currentString.substring(0, displayedText.length + 1));
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, pauseDuration);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentTextIndex, text, typingSpeed, pauseDuration]);

    return (
        <span className={cn("inline-flex items-center", className)}>
            <span>{displayedText}</span>
            {showCursor && (
                <span className="animate-pulse ml-0.5">{cursorCharacter}</span>
            )}
        </span>
    );
}
