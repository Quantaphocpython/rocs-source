'use client';

import { useRouter } from 'next/navigation';
import { Shield, Scroll } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { BackgroundEffects } from './BackgroundEffects';
import { HeroSection } from './HeroSection';
import { MenuCard } from './MenuCard';

export function GameLobby() {
  const router = useRouter();

  const menuItems = [
    {
      icon: Shield,
      title: 'Deck Builder',
      description: 'Create your deck before entering the adventure',
      path: '/deck',
    },
    {
      icon: Scroll,
      title: 'How to Play',
      description: 'Learn the game mechanics and strategies',
      path: '/tutorial',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-900/20 to-black">
      <Navbar />
      <BackgroundEffects />

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <HeroSection />

        {/* Menu Cards */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-6">
          {menuItems.map((item, i) => (
            <MenuCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={() => router.push(item.path)}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}