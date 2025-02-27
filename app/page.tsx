'use client';

import { GameLobby } from '@/components/game/lobby';
import { useGetCardById } from '@/hooks/useGetCardById';
import { useGetMonsterById } from '@/hooks/useGetMonsterById';
import { useGetPrebuiltDecks } from '@/hooks/useGetPrebuildDecks';

export default function Home() {
  // nhớ là cả card và monster đều bắt đầu từ id là 1 nha bro
  const { card } = useGetCardById(BigInt(2)); // có thể undefined nên có gì làm thì thêm 1 if check
  const { monster } = useGetMonsterById(BigInt(1)); // có thể undefined nên có gì làm thì thêm 1 if check
  const { decks } = useGetPrebuiltDecks();

  console.log('Card: {}', card);
  console.log('Monster: {}', monster);
  console.log('Decks: {}', decks);
  return (
    <div className="relative">
      <GameLobby />
    </div>
  );
}
