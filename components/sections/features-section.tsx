import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, Flame, Droplet, Trees, Mountain, Cog } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    title: ReactNode;
    category: string;
    imageUrl: string;
    color: string;
    glowColor: string;
    href: string;
    icon: ReactNode;
    description: string;
  };
  index: number;
  isHovered: boolean;
  totalCards: number;
}

function FeatureCard({
  feature,
  index,
  isHovered,
  totalCards,
}: FeatureCardProps) {
  const {
    title,
    category,
    imageUrl,
    color,
    glowColor,
    href,
    icon,
    description,
  } = feature;

  // Calculate stacked position when not hovered
  const stackOffset = 4; // Reduced offset for smaller cards
  const baseTransform = {
    x: 0,
    y: index * -stackOffset,
    rotate: -1 + index * 1,
    scale: 1 - index * 0.01,
  };

  // Calculate fanned position when hovered
  const fanAngle = 10; // Reduced angle for smoother fan
  const fanSpread = 300; // Reduced spread for smaller cards
  const middleIndex = Math.floor(totalCards / 2);
  const relativeIndex = index - middleIndex;
  const fanTransform = {
    x: relativeIndex * fanSpread,
    y: Math.abs(relativeIndex) * 20,
    rotate: relativeIndex * fanAngle,
    scale: 1,
  };

  return (
    <motion.div
      className="absolute origin-bottom"
      initial={baseTransform}
      animate={isHovered ? fanTransform : baseTransform}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{ zIndex: isHovered ? totalCards - index : index }}
    >
      <Link href={href}>
        <div
          className={cn(
            'w-[280px] h-[400px] rounded-2xl relative overflow-hidden group cursor-pointer', // Reduced size
            'transition-all duration-300',
            isHovered && 'hover:scale-105'
          )}
        >
          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
            }}
          />

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="absolute inset-0 blur-2xl" // Reduced blur
              style={{ backgroundColor: glowColor, opacity: 0.3 }}
            />
          </div>

          {/* Image and Overlay */}
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, 
                  rgba(0,0,0,0.95), 
                  rgba(0,0,0,0.8) 30%,
                  ${glowColor}20 60%,
                  transparent
                )`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-5 gap-4">
            {' '}
            {/* Reduced padding and gap */}
            {/* Category Badge */}
            <div
              className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium" // Reduced size
              style={{
                backgroundColor: `${color}15`,
                border: `1px solid ${color}30`,
                color: color,
              }}
            >
              {icon}
              <span>{category}</span>
            </div>
            {/* Title and Description */}
            <div
              className="rounded-lg backdrop-blur-sm p-4 space-y-2 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" // Reduced padding and spacing
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderLeft: `2px solid ${color}`, // Thinner border
              }}
            >
              <h3 className="text-lg font-bold text-white">
                {' '}
                {/* Reduced font size */}
                {title}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2">
                {' '}
                {/* Reduced font size and lines */}
                {description}
              </p>

              {/* Action Button */}
              <div
                className="flex items-center gap-2 text-sm mt-3 transition-colors" // Reduced size and spacing
                style={{ color }}
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Hover Border Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ border: `1px solid ${color}30` }} // Thinner border
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function FeatureSection() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      category: 'Fire Element',
      imageUrl:
        'https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png',
      title: 'Harness the Power of Flames',
      description:
        'Fire cards deliver devastating attacks with high damage output and critical strike abilities.',
      color: 'rgb(239, 68, 68)', // red-500
      glowColor: 'rgba(239, 68, 68, 0.5)',
      href: '/deck',
      icon: <Flame className="w-4 h-4" />, // Reduced icon size
    },
    {
      category: 'Water Element',
      title: 'Master Fluid Adaptability',
      description:
        'Water cards excel in healing and lifesteal effects, providing sustainability in longer battles.',
      imageUrl:
        'https://res.cloudinary.com/dlotuochc/image/upload/v1740049290/TCG%20Battle%20Adventure/ufmrlee4xkdapmpsizuj.png',
      color: 'rgb(59, 130, 246)', // blue-500
      glowColor: 'rgba(59, 130, 246, 0.5)',
      href: '/deck',
      icon: <Droplet className="w-4 h-4" />, // Reduced icon size
    },
    {
      category: 'Earth Element',
      title: 'Unleash Steadfast Resilience',
      description:
        'Earth cards feature high health and defensive abilities, creating impenetrable walls against enemy attacks.',
      imageUrl:
        'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/zfna0w9d2ndjyyyjbmph.png',
      color: 'rgb(234, 179, 8)', // yellow-500
      glowColor: 'rgba(234, 179, 8, 0.5)',
      href: '/deck',
      icon: <Mountain className="w-4 h-4" />, // Reduced icon size
    },
    {
      category: 'Wood Element',
      title: 'Grow Your Strategic Advantage',
      description:
        'Wood cards balance offense and defense with regenerative abilities and sustained damage output.',
      imageUrl:
        'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/aeklge0zyujx8ikxcryz.png',
      color: 'rgb(34, 197, 94)', // green-500
      glowColor: 'rgba(34, 197, 94, 0.5)',
      href: '/deck',
      icon: <Trees className="w-4 h-4" />, // Reduced icon size
    },
    {
      category: 'Metal Element',
      title: 'Forge Unbreakable Strength',
      description:
        'Metal cards combine high attack power with armor effects, creating formidable offensive threats.',
      imageUrl:
        'https://res.cloudinary.com/dlotuochc/image/upload/v1740049295/TCG%20Battle%20Adventure/rmdav3sz3idglw8n0elj.png',
      color: 'rgb(148, 163, 184)', // slate-400
      glowColor: 'rgba(148, 163, 184, 0.5)',
      href: '/deck',
      icon: <Cog className="w-4 h-4" />, // Reduced icon size
    },
  ];

  return (
    <section
      id="features"
      className="relative flex w-full flex-col items-center gap-10 py-24 overflow-hidden"
    >
      {' '}
      {/* Reduced vertical spacing */}
      {/* Background Effects */}
      <motion.header
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-3xl flex-col items-center gap-4 text-center px-4" // Reduced gap
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {' '}
          {/* Reduced font size */}
          Elemental Powers
        </h2>
        <Balancer className="text-lg text-white/80">
          {' '}
          {/* Reduced font size */}
          Master the five elements and harness their unique strengths to build
          the perfect deck for your playstyle.
        </Balancer>
      </motion.header>
      <div className="w-full max-w-[1200px] mx-auto px-4">
        {' '}
        {/* Reduced max width */}
        <div
          className="relative h-[500px] flex items-center justify-center py-12" // Reduced height
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.category}
                feature={feature}
                index={index}
                isHovered={isHovered}
                totalCards={features.length}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* Element Interaction Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1200px] mx-auto px-4"
      >
        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
            Element Interaction Guide
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="bg-black/40 border border-red-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-400">Fire</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Wood, Metal</p>
              <p className="text-white/70 text-xs">Weak vs: Water, Earth</p>
            </div>

            <div className="bg-black/40 border border-blue-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-400">Water</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Fire, Earth</p>
              <p className="text-white/70 text-xs">Weak vs: Wood, Metal</p>
            </div>

            <div className="bg-black/40 border border-green-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Trees className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-400">Wood</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Water, Earth</p>
              <p className="text-white/70 text-xs">Weak vs: Fire, Metal</p>
            </div>

            <div className="bg-black/40 border border-yellow-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Mountain className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-yellow-400">Earth</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Metal, Fire</p>
              <p className="text-white/70 text-xs">Weak vs: Wood, Water</p>
            </div>

            <div className="bg-black/40 border border-gray-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Cog className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-400">Metal</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Wood, Water</p>
              <p className="text-white/70 text-xs">Weak vs: Earth, Fire</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
