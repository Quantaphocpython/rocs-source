'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDeck } from '@/hooks/useDeck';
import { GameBoard } from '@/components/game/map-battle/GameBoard';
import { LoadingScreen } from '@/components/game/map-battle/LoadingScreen';
import { toast } from 'sonner';
import { Card, Monster } from '@/types/game';
import { bossData } from '@/app/wiki/page';

export default function BossBattleClientPage() {
  const router = useRouter();
  const params = useParams();
  const { savedDeck } = useDeck();

  const [currentBoss, setCurrentBoss] = useState<any | null>(null);

  useEffect(() => {
    // if (isMonstersLoading) return; // Chờ dữ liệu
    if (!savedDeck) {
      toast.error('You need to select a deck first');
      router.push('/deck');
      return;
    }

    const bossId = params.bossId as string;
    const boss = bossData?.find((b) => b.id.toString() === bossId);

    if (!boss) {
      toast.error('Boss not found');
      router.push('/map');
      return;
    }

    if (!currentBoss || currentBoss.id !== boss.id) {
      setCurrentBoss(boss);
    }
  }, [savedDeck, router, params.bossId, bossData, currentBoss]);

  if (!currentBoss) {
    return <LoadingScreen bossName={currentBoss?.name || 'Boss'} />;
  }

  return <GameBoard initialDeck={savedDeck as Card[]} boss={currentBoss} />;
}
