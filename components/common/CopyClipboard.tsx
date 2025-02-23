'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyClipboardProps {
    text: string;
    className?: string;
}

export default function CopyClipboard({ text, className }: CopyClipboardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={cn(
                'hover:opacity-70 transition-opacity cursor-pointer',
                className
            )}
        >
            {copied ? (
                <Check className="w-full h-full text-green-500" />
            ) : (
                <Copy className="w-full h-full" />
            )}
        </button>
    );
}