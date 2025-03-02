import BossBattleClientPage from './client-page';
import { bossList } from '@/lib/boss-data';
import { useEffect, useState } from 'react';

export function generateStaticParams() {
  return bossList.map((boss) => ({
    bossId: boss.id.toString(),
  }));
}

export default function BossBattlePage() {
  return <BossBattleClientPage />;
}

// export default function BossBattlePage() {
//   const { monsters, isLoading } = useGetMonsters();
//   const [bossParams, setBossParams] = useState<{ bossId: string }[]>([]);

//   useEffect(() => {
//     if (!isLoading && monsters && monsters.length > 0) {
//       setBossParams(
//         monsters.map((monster) => ({ bossId: monster.id.toString() }))
//       );
//     }
//   }, [monsters, isLoading]);

//   if (isLoading) return <p>Loading monsters...</p>;

//   return <BossBattleClientPage />;
// }
