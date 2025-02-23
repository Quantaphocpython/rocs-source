'use client';

import { useRouter } from 'next/navigation';
import { GameLobby } from '@/components/game-lobby';

export default function Home() {
  return <GameLobby />;
}