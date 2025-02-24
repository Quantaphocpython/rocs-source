'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDeck } from '@/hooks/useDeck';
import { GameBoard } from '@/components/game-board';

export default function BattlePage() {
  const router = useRouter();
  const { savedDeck } = useDeck();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Short timeout to ensure localStorage is checked
    const timer = setTimeout(() => {
      if (!savedDeck) {
        router.push('/deck');
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [savedDeck, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (!savedDeck) return null;

  return <GameBoard initialDeck={savedDeck} />;
}