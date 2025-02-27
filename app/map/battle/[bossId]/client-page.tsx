'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDeck } from '@/hooks/useDeck';
import { GameBoard } from '@/components/game/map-battle/GameBoard';
import { LoadingScreen } from '@/components/game/map-battle/LoadingScreen';
import { toast } from 'sonner';
import { Card, Monster } from '@/types/game';
import { useGetMonsters } from '@/hooks/useGetMonsters';

export default function BossBattleClientPage() {
  const router = useRouter();
  const params = useParams();
  const { savedDeck } = useDeck();
  const { monsters, isLoading: isMonstersLoading } = useGetMonsters();

  const [currentBoss, setCurrentBoss] = useState<Monster | null>(null);

  useEffect(() => {
    if (isMonstersLoading) return; // Chờ dữ liệu
    if (!savedDeck) {
      toast.error('You need to select a deck first');
      router.push('/deck');
      return;
    }

    const bossId = params.bossId as string;
    const boss = monsters?.find((b) => b.id.toString() === bossId);

    if (!boss) {
      toast.error('Boss not found');
      router.push('/map');
      return;
    }

    if (!currentBoss || currentBoss.id !== boss.id) {
      setCurrentBoss(boss);
    }
  }, [
    savedDeck,
    router,
    params.bossId,
    monsters,
    isMonstersLoading,
    currentBoss,
  ]);

  if (isMonstersLoading || !currentBoss) {
    return <LoadingScreen bossName={currentBoss?.name || 'Boss'} />;
  }

  return <GameBoard initialDeck={savedDeck as Card[]} boss={currentBoss} />;
}
