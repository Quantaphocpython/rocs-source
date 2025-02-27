'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDeck } from '@/hooks/useDeck';
import { bossList } from '@/lib/boss-data';
import { GameBoard } from '@/components/game/map-battle/GameBoard';
import { LoadingScreen } from '@/components/game/map-battle/LoadingScreen';
import { toast } from 'sonner';
import { Card } from '@/types/game';

export default function BossBattleClientPage() {
    const router = useRouter();
    const params = useParams();
    const { savedDeck } = useDeck();
    const [isLoading, setIsLoading] = useState(true);
    const [currentBoss, setCurrentBoss] = useState<any>(null);

    useEffect(() => {

        const timer = setTimeout(() => {
            if (!savedDeck) {
                toast.error('You need to select a deck first');
                router.push('/deck');
                return;
            }

            const bossId = params.bossId as string;
            const boss = bossList.find(b => b.id.toString() === bossId);

            if (!boss) {
                toast.error('Boss not found');
                router.push('/map');
                return;
            }

            setCurrentBoss(boss);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [savedDeck, router, params]);

    if (isLoading || !currentBoss || !savedDeck) {
        return <LoadingScreen bossName={currentBoss?.name || 'Boss'} />;
    }

    return <GameBoard initialDeck={savedDeck as Card[]} boss={currentBoss} />;
}