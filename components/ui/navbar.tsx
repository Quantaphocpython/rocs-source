'use client';

import { motion } from 'framer-motion';
import { Sword, Shield, Map, Info, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { CustomConnectButton } from '../wallet/CustomConnectButton';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const navItems = [
    {
      name: 'Home',
      id: 'home',
      href: '',
      icon: <Sword className="h-4 w-4" />,
    },
    {
      name: 'Features',
      id: 'features',
      href: '',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      name: 'Gameplay',
      id: 'gameplay',
      href: '',
      icon: <Map className="h-4 w-4" />,
    },
    {
      name: 'Roadmap',
      id: 'roadmap',
      href: '',
      icon: <Info className="h-4 w-4" />,
    },
    // {
    //   name: 'Wiki',
    //   id: 'wiki',
    //   href: '/wiki',
    //   icon: <BookOpen className="w-4 h-4" />,
    // },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 border-b border-yellow-900/20 bg-black/30 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative flex-shrink-0"
            >
              <Image
                src={
                  'https://res.cloudinary.com/dlotuochc/image/upload/v1740388538/TCG%20Battle%20Adventure/xidofyh4oq2p24sguawe.png?fbclid=IwY2xjawItSs1leHRuA2FlbQIxMAABHX5XS30ZIYoL_9c7tfDeCQIqE7bc902Y7YCWUGCR7yuFzgU_Q4hpnwrkOQ_aem_x8cCBAlUI59rx3BkNmHY1Q'
                }
                alt="Logo"
                width={48} // Tăng kích thước một chút
                height={48}
                className="rounded-full border-2 border-yellow-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent tracking-tight"
            >
              Realm-of-Cards
            </motion.div>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium text-yellow-400/70 transition-colors hover:text-yellow-400',
                  'px-3 py-2 rounded-full hover:bg-yellow-400/10'
                )}
              >
                {item.icon}
                <span>{item.name}</span>

                <Link href={item.href} />
              </motion.button>
            ))}

            <motion.button
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 4 * 0.1 }}
              className={cn(
                'flex items-center space-x-1 text-sm font-medium text-yellow-400/70 transition-colors hover:text-yellow-400',
                'px-3 py-2 rounded-full hover:bg-yellow-400/10'
              )}
            >
              <BookOpen className="w-4 h-4" />
              <span>Wiki</span>

              <Link href={'/wiki'} />
            </motion.button>
          </nav>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <a
              href="/deck"
              className="hidden md:flex items-center space-x-1 rounded-full bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-400/20"
            >
              <span>Start Playing</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
