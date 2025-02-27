'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDeck } from '@/hooks/useDeck';
import { motion } from 'framer-motion';
import { MapBossSelection } from '@/components/game/map/MapBossSelection';
import { BossDetails } from '@/components/game/map/BossDetails';
import { bossList } from '@/lib/boss-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sword } from 'lucide-react';
import { toast } from 'sonner';

export default function MapPage() {
    const router = useRouter();
    const { savedDeck } = useDeck();
    const [selectedBoss, setSelectedBoss] = useState(bossList[0]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user has a deck
        const timer = setTimeout(() => {
            if (!savedDeck) {
                toast.error('You need to select a deck first');
                router.push('/deck');
            }
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [savedDeck, router]);

    const handleStartBattle = () => {
        if (!savedDeck) {
            toast.error('You need to select a deck first');
            router.push('/deck');
            return;
        }

        router.push(`/map/battle/${selectedBoss.id}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-yellow-400 text-xl">Loading...</div>
            </div>
        );
    }

    if (!savedDeck) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-900/20 to-black">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center mb-8">
                    <Button
                        variant="ghost"
                        className="text-yellow-400 hover:bg-yellow-900/20"
                        onClick={() => router.push('/')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                    <h1 className="text-4xl font-bold text-yellow-400 ml-4">Boss Map</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MapBossSelection
                            bosses={bossList}
                            selectedBoss={selectedBoss}
                            onSelectBoss={setSelectedBoss}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        <BossDetails boss={selectedBoss} />

                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                className="w-full bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 py-6 text-lg"
                                onClick={handleStartBattle}
                            >
                                <Sword className="mr-2 h-5 w-5" />
                                Start Battle
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}