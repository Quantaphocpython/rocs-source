'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function BattlePage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      toast.info('Please select a deck first');
      router.push('/deck');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-yellow-400 text-xl">
        Redirecting to deck selection...
      </div>
    </div>
  );
}
