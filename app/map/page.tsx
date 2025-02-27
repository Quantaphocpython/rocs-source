'use client';

import { BossDetails } from '@/components/game/map/BossDetails';
import { MapBossSelection } from '@/components/game/map/MapBossSelection';
import { Button } from '@/components/ui/button';
import { useDeck } from '@/hooks/useDeck';
import { useGetMonsters } from '@/hooks/useGetMonsters';
import { Class } from '@/types/game';
import { motion } from 'framer-motion';
import { ArrowLeft, Sword } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

export default function MapPage() {
  const router = useRouter();
  const { savedDeck } = useDeck();
  const { monsters, isLoading: isMonsterLoading } = useGetMonsters();
  const [selectedBoss, setSelectedBoss] = useState({
    id: -1,
    name: 'Default Monster',
    health: 50,
    attack: 10,
    image: '/default-monster.png',
    class: [Class.METAL],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (monsters && monsters.length > 0 && selectedBoss.id === -1) {
      setSelectedBoss(monsters.find((m) => m.id === 0) || monsters[0]);
    }
  }, [monsters, selectedBoss.id]);

  useEffect(() => {
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

    if (!isConnected) {
      toast.error('Please connect your wallet first');
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
            {monsters && selectedBoss && (
              <MapBossSelection
                bosses={monsters}
                selectedBoss={selectedBoss}
                onSelectBoss={setSelectedBoss}
              />
            )}
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
