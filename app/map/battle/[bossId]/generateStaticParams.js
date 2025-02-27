import { bossList } from '@/lib/boss-data';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
    return bossList.map(boss => ({
        bossId: boss.id.toString()
    }));
}