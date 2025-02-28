'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Flame,
  Droplet,
  Trees,
  Mountain,
  Cog,
  Sword,
  Shield,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SectionHighlight } from '@/components/ui/section-highlight';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LinkPreview } from '@/components/ui/link-preview';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

// Card showcase data
const SHOWCASE_CARDS = [
  {
    name: 'Fire Dragon',
    element: 'Fire',
    attack: 8,
    health: 6,
    cost: 3,
    effect: 'Critical Strike: 30% chance to deal double damage',
    description:
      'A powerful dragon that breathes scorching flames, devastating enemies with critical strikes.',
    src: 'https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png',
  },
  {
    name: 'Water Elemental',
    element: 'Water',
    attack: 6,
    health: 6,
    cost: 2,
    effect: 'Lifesteal: Heals for 50% of damage dealt',
    description:
      'A fluid entity that absorbs the life force of its enemies, sustaining itself through battle.',
    src: 'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/vgsemseiixtxtyjjfo1v.png',
  },
  {
    name: 'Ancient Treant',
    element: 'Wood',
    attack: 4,
    health: 12,
    cost: 3,
    effect: 'Thorns: Reflects 2 damage when attacked',
    description:
      'An ancient forest guardian with bark as tough as steel, punishing those who dare attack it.',
    src: 'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/wqujynso8o9akodknazz.png',
  },
  {
    name: 'Earth Golem',
    element: 'Earth',
    attack: 4,
    health: 10,
    cost: 2,
    effect: 'Thorns: Reflects 2 damage when attacked',
    description:
      'A massive creature formed from living stone, creating an impenetrable wall against enemies.',
    src: 'https://res.cloudinary.com/dlotuochc/image/upload/v1740049298/TCG%20Battle%20Adventure/r9ahkormzgxdmlfwuj9s.png',
  },
  {
    name: 'Metal Knight',
    element: 'Metal',
    attack: 7,
    health: 8,
    cost: 3,
    effect: 'Critical Strike: 30% chance to deal double damage',
    description:
      'A warrior clad in impenetrable armor, striking with precision and devastating force.',
    src: 'https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/bwmtrdybdv8wnz3zycg7.png',
  },
];

// Element icon mapping
function getElementIcon(element: string) {
  switch (element) {
    case 'Fire':
      return <Flame className="h-5 w-5 text-red-500" />;
    case 'Water':
      return <Droplet className="h-5 w-5 text-blue-500" />;
    case 'Wood':
      return <Trees className="h-5 w-5 text-green-500" />;
    case 'Earth':
      return <Mountain className="h-5 w-5 text-yellow-500" />;
    case 'Metal':
      return <Cog className="h-5 w-5 text-gray-400" />;
    default:
      return null;
  }
}

// Element color mapping
function getElementColor(element: string) {
  switch (element) {
    case 'Fire':
      return 'from-red-500 to-orange-500';
    case 'Water':
      return 'from-blue-500 to-cyan-500';
    case 'Wood':
      return 'from-green-500 to-emerald-500';
    case 'Earth':
      return 'from-yellow-500 to-amber-500';
    case 'Metal':
      return 'from-gray-400 to-slate-500';
    default:
      return 'from-yellow-400 to-yellow-600';
  }
}

// Card Showcase Component
function CardShowcase() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % SHOWCASE_CARDS.length);
  };

  const handlePrev = () => {
    setActive(
      (prev) => (prev - 1 + SHOWCASE_CARDS.length) % SHOWCASE_CARDS.length
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Card Image */}
        <div>
          <div className="relative h-80 w-full">
            {SHOWCASE_CARDS.map((card, index) => (
              <motion.div
                key={card.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: index === active ? 1 : 0.7,
                  scale: index === active ? 1 : 0.95,
                  z: index === active ? 0 : -100,
                  rotate: index === active ? 0 : randomRotateY(),
                  zIndex:
                    index === active ? 999 : SHOWCASE_CARDS.length + 2 - index,
                  y: index === active ? [0, -20, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={card.src}
                  alt={card.name}
                  className="h-full w-full rounded-3xl object-contain object-center"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Card Details */}
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            className="space-y-6"
          >
            {/* Card Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getElementIcon(SHOWCASE_CARDS[active].element)}
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${getElementColor(
                    SHOWCASE_CARDS[active].element
                  )} bg-clip-text text-transparent`}
                >
                  {SHOWCASE_CARDS[active].name}
                </h3>
              </div>
              <p className="text-sm text-yellow-400">
                {SHOWCASE_CARDS[active].element} Element
              </p>
            </div>

            {/* Card Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-black/40 border border-red-900/30">
                <Sword className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-xs text-red-400/80">Attack</p>
                  <p className="text-lg font-bold text-red-400">
                    {SHOWCASE_CARDS[active].attack}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-black/40 border border-green-900/30">
                <Heart className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-green-400/80">Health</p>
                  <p className="text-lg font-bold text-green-400">
                    {SHOWCASE_CARDS[active].health}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-black/40 border border-yellow-900/30">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-xs text-yellow-400/80">Cost</p>
                  <p className="text-lg font-bold text-yellow-400">
                    {SHOWCASE_CARDS[active].cost}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Effect */}
            <div className="p-4 rounded-lg bg-black/40 border border-yellow-900/30">
              <p className="text-sm font-medium text-yellow-400 mb-1">
                Special Effect
              </p>
              <p className="text-sm text-muted-foreground">
                {SHOWCASE_CARDS[active].effect}
              </p>
            </div>

            {/* Card Description */}
            <motion.p className="text-base text-muted-foreground">
              {SHOWCASE_CARDS[active].description
                .split(' ')
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      filter: 'blur(10px)',
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: 'blur(0px)',
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeInOut',
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 flex items-center justify-center group transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            </button>
            <div className="flex-1 flex items-center">
              <div className="w-full flex gap-2">
                {SHOWCASE_CARDS.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === active
                        ? 'bg-yellow-400 flex-grow'
                        : 'bg-yellow-400/20 flex-grow-0 flex-1'
                    )}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 flex items-center justify-center group transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive Card Mechanics Section
function CardMechanicsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <h3 className="text-2xl font-bold mb-6 text-yellow-400">
        Card Mechanics
      </h3>

      <div className="bg-black/30 border border-yellow-900/30 rounded-lg p-6">
        <p className="text-base text-muted-foreground mb-6">
          Cards in Realm-of-Cards Adventure feature various mechanics that
          interact with each other. Hover over card names to see their details:
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-black/40 border border-red-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-red-400 mb-2">
              Attack Effects
            </h4>
            <p className="text-sm text-muted-foreground">
              Cards like{' '}
              <LinkPreview
                cardData={{
                  name: 'Fire Dragon',
                  element: 'Fire',
                  attack: 8,
                  health: 6,
                  cost: 3,
                  effect: 'Critical Strike: 30% chance to deal double damage',
                  image: SHOWCASE_CARDS[0].src,
                }}
                className="text-red-400 font-medium"
              >
                Fire Dragon
              </LinkPreview>{' '}
              have a chance to deal critical damage, while{' '}
              <LinkPreview
                cardData={{
                  name: 'Water Elemental',
                  element: 'Water',
                  attack: 6,
                  health: 6,
                  cost: 2,
                  effect: 'Lifesteal: Heals for 50% of damage dealt',
                  image: SHOWCASE_CARDS[1].src,
                }}
                className="text-blue-400 font-medium"
              >
                Water Elemental
              </LinkPreview>{' '}
              can heal you based on damage dealt.
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-green-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-green-400 mb-2">
              Defense Effects
            </h4>
            <p className="text-sm text-muted-foreground">
              Defensive cards like{' '}
              <LinkPreview
                cardData={{
                  name: 'Earth Golem',
                  element: 'Earth',
                  attack: 4,
                  health: 10,
                  cost: 2,
                  effect: 'Thorns: Reflects 2 damage when attacked',
                  image: SHOWCASE_CARDS[3].src,
                }}
                className="text-yellow-400 font-medium"
              >
                Earth Golem
              </LinkPreview>{' '}
              and{' '}
              <LinkPreview
                cardData={{
                  name: 'Ancient Treant',
                  element: 'Wood',
                  attack: 4,
                  health: 12,
                  cost: 3,
                  effect: 'Thorns: Reflects 2 damage when attacked',
                  image: SHOWCASE_CARDS[2].src,
                }}
                className="text-green-400 font-medium"
              >
                Ancient Treant
              </LinkPreview>{' '}
              reflect damage back to attackers with their Thorns ability.
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-gray-700/30 rounded-lg">
            <h4 className="text-lg font-medium text-gray-400 mb-2">
              Element Interactions
            </h4>
            <p className="text-sm text-muted-foreground">
              Elements have strengths and weaknesses against each other. For
              example,{' '}
              <LinkPreview
                cardData={{
                  name: 'Metal Knight',
                  element: 'Metal',
                  attack: 7,
                  health: 8,
                  cost: 3,
                  effect: 'Critical Strike: 30% chance to deal double damage',
                  image: SHOWCASE_CARDS[4].src,
                }}
                className="text-gray-400 font-medium"
              >
                Metal Knight
              </LinkPreview>{' '}
              is strong against Wood but weak against Fire elements.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function GameplaySection() {
  return (
    <section id="gameplay" className="relative overflow-hidden py-20">
      <SectionHighlight
        containerClassName="py-20"
        dotColor="rgb(234, 179, 8)"
        dotOpacity="0.15"
        glowColor="rgba(234, 179, 8, 0.1)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              How To Play
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Master the strategic depth of Realm-of-Cards Adventure with these
              gameplay mechanics
            </p>
          </div>

          {/* Card Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold mb-8 text-center text-yellow-400">
              Featured Cards
            </h3>
            <CardShowcase />
          </motion.div>

          {/* Card Mechanics Section with Hover Effects */}
          <CardMechanicsSection />

          {/* Gameplay Content */}
          <div className="py-16 px-4 sm:px-6 lg:px-8 space-y-24">
            {/* Game Flow */}
            <motion.div
              {...fadeInUp}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6 text-yellow-500">
                  Game Flow
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: '1. Deck Building',
                      content:
                        'Choose 13 cards to build your deck. Each card has a limit on how many copies you can include.',
                    },
                    {
                      title: '2. Map Navigation',
                      content: 'Select a boss to challenge from the world map.',
                    },
                    {
                      title: '3. Battle Phase',
                      content:
                        'Take turns playing cards and attacking the boss. Each turn you can:',
                      list: [
                        'Play one card (costs stamina)',
                        'Attack with played cards',
                        'End your turn to draw a card',
                      ],
                    },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-900/30 hover:border-yellow-700/50 transition-colors duration-300"
                    >
                      <h4 className="text-lg font-semibold mb-2 text-yellow-400">
                        {item.title}
                      </h4>
                      <p className="text-gray-300">{item.content}</p>
                      {item.list && (
                        <ul className="mt-2 space-y-1 text-sm text-gray-400 pl-4">
                          {item.list.map((listItem, listIndex) => (
                            <li
                              key={listIndex}
                              className="flex items-center space-x-2"
                            >
                              <span className="text-yellow-500">•</span>
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <motion.img
                  src="https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png"
                  alt="Card Example"
                  className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: -5 }}
                />
                <motion.img
                  src="https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/bwmtrdybdv8wnz3zycg7.png"
                  alt="Boss Example"
                  className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                />
              </div>
            </motion.div>

            {/* Card Elements */}
            <motion.div {...fadeInUp}>
              <h3 className="text-3xl font-bold mb-8 text-yellow-500">
                Card Elements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                  {
                    icon: Flame,
                    color: 'text-red-500',
                    bgColor: 'from-red-950 to-gray-900',
                    borderColor: 'border-red-900/30',
                    title: 'Fire',
                    description: 'High damage, critical strikes',
                  },
                  {
                    icon: Droplet,
                    color: 'text-blue-500',
                    bgColor: 'from-blue-950 to-gray-900',
                    borderColor: 'border-blue-900/30',
                    title: 'Water',
                    description: 'Healing and lifesteal abilities',
                  },
                  {
                    icon: Trees,
                    color: 'text-green-500',
                    bgColor: 'from-green-950 to-gray-900',
                    borderColor: 'border-green-900/30',
                    title: 'Wood',
                    description: 'Balanced stats and effects',
                  },
                  {
                    icon: Mountain,
                    color: 'text-yellow-500',
                    bgColor: 'from-yellow-950 to-gray-900',
                    borderColor: 'border-yellow-900/30',
                    title: 'Earth',
                    description: 'High health, defensive abilities',
                  },
                  {
                    icon: Cog,
                    color: 'text-gray-400',
                    bgColor: 'from-gray-800 to-gray-900',
                    borderColor: 'border-gray-700/30',
                    title: 'Metal',
                    description: 'Strong attacks, armor effects',
                  },
                ].map((element, index) => (
                  <Card
                    key={index}
                    className={`p-5 bg-gradient-to-br ${element.bgColor} ${element.borderColor} hover:border-opacity-50 transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-center gap-4">
                      <element.icon className={`w-8 h-8 ${element.color}`} />
                      <div>
                        <p className="font-semibold text-lg text-gray-200">
                          {element.title}
                        </p>
                        <p className="text-sm text-gray-400">
                          {element.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Strategy Tips */}
            <motion.div {...fadeInUp}>
              <h3 className="text-3xl font-bold mb-8 text-yellow-500">
                Strategy Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  'Balance your deck with different card types and elemental effects',
                  'Consider stamina costs when building your deck',
                  'Use defensive cards to protect against boss attacks',
                  'Study boss weaknesses and build decks to exploit them',
                ].map((tip, index) => (
                  <Card
                    key={index}
                    className="p-5 bg-gradient-to-br from-gray-900 to-gray-800 border-yellow-900/30 hover:border-yellow-700/50 transition-all duration-300 transform hover:scale-105"
                  >
                    <p className="text-gray-300 flex items-start">
                      <span className="text-yellow-500 mr-2 font-bold">•</span>
                      {tip}
                    </p>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionHighlight>
    </section>
  );
}
