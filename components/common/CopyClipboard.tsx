'use client';
import { toastDuration } from '@/constants/toast';
import { useToast } from '@/hooks/use-toast';
import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

interface CopyClipboardProps {
  text: string;
  className?: string;
  iconClassName?: string;
}

const CopyClipboard: React.FC<CopyClipboardProps> = ({
  text,
  className = '',
  iconClassName = '',
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: 'Copied Successfully',
        // description: 'Wallet address has been successfully copied',
        duration: toastDuration,
      });
      setTimeout(() => setIsCopied(false), toastDuration);
    } catch (err) {
      toast({
        title: 'Copy Failed',
        description: 'Unable to copy wallet address',
        duration: toastDuration,
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      onClick={handleCopy}
      className={`flex items-center justify-center cursor-pointer transition-all duration-300 group ${className}`}
      title="Click to copy"
    >
      {isCopied ? (
        <Check
          className={`w-4 h-4 text-green-500 animate-ping-once group-hover:scale-110 ${iconClassName}`}
        />
      ) : (
        <Copy
          className={`w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors group-hover:scale-105 group-hover:text-green-500 ${iconClassName}`}
        />
      )}
    </div>
  );
};

export default CopyClipboard;
