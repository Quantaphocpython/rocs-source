import BossBattleClientPage from './client-page';
import { bossList } from '@/lib/boss-data';

export function generateStaticParams() {
    return bossList.map(boss => ({
        bossId: boss.id.toString()
    }));
}

export default function BossBattlePage() {
    return <BossBattleClientPage />;
}