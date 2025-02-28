'use client';

import { Card } from '@/components/ui/card';
import { Sparkles, Rocket, Shield, Globe, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ROADMAP_PHASES = [
  {
    phase: 'Phase 1: Launch',
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Core Game Experience',
    timeline: 'Q1 2025',
    features: [
      'Deck building system',
      'Five elemental card types',
      'Basic boss battles',
      'Card effects implementation',
      'Single player campaign',
      'Tutorial system',
    ],
    status: 'Completed',
    progress: 100,
    color: 'from-yellow-400 to-amber-500',
  },
  {
    phase: 'Phase 2: Enhancement',
    icon: <Rocket className="h-5 w-5" />,
    title: 'Advanced Features',
    timeline: 'Q2 2025',
    features: [
      'Additional card effects',
      'New boss monsters',
      'Enhanced battle animations',
      'Card fusion system',
      'Achievement system',
      'Expanded card pool',
    ],
    status: 'In Progress',
    progress: 30,
    color: 'from-amber-500 to-orange-500',
  },
  {
    phase: 'Phase 3: Expansion',
    icon: <Shield className="h-5 w-5" />,
    title: 'Multiplayer & Events',
    timeline: 'Q3 2025',
    features: [
      'PvP battle system',
      'Seasonal events',
      'Tournament mode',
      'Friend system',
      'Leaderboards',
      'Weekly challenges',
    ],
    status: 'Upcoming',
    progress: 0,
    color: 'from-orange-500 to-red-500',
  },
  {
    phase: 'Phase 4: Evolution',
    icon: <Globe className="h-5 w-5" />,
    title: 'Community & Beyond',
    timeline: 'Q4 2025',
    features: [
      'Custom card creation',
      'Guild system',
      'Cross-platform play',
      'Advanced AI opponents',
      'Community events',
      'Expanded storyline',
    ],
    status: 'Upcoming',
    progress: 0,
    color: 'from-red-500 to-yellow-500',
  },
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={cn('h-full rounded-full bg-gradient-to-r', color)}
      />
    </div>
  );
}

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof ROADMAP_PHASES)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className="p-6 bg-gradient-to-br from-slate-700 to-slate-800 border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="space-y-6">
          {/* Phase Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-medium text-yellow-400">
                  <div className="p-2 rounded-lg bg-yellow-400/10">
                    {phase.icon}
                  </div>
                  {phase.phase}
                </div>
                <h3 className="text-xl font-bold text-white">{phase.title}</h3>
              </div>
              <div
                className={cn(
                  'text-xs font-medium px-3 py-1.5 rounded-full',
                  phase.status === 'In Progress'
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : phase.status === 'Upcoming'
                    ? 'bg-blue-500/10 text-blue-400'
                    : 'bg-green-500/10 text-green-400'
                )}
              >
                {phase.status === 'In Progress' && (
                  <Clock className="inline-block w-3 h-3 mr-1" />
                )}
                {phase.status === 'Upcoming' && (
                  <Rocket className="inline-block w-3 h-3 mr-1" />
                )}
                {phase.status === 'Completed' && (
                  <Check className="inline-block w-3 h-3 mr-1" />
                )}
                {phase.status}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-400">
                {phase.timeline}
              </div>
              <div className="flex-1">
                <ProgressBar progress={phase.progress} color={phase.color} />
              </div>
              <div className="text-sm font-medium text-white">
                {phase.progress}%
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {phase.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                className="flex items-start gap-2 p-3 rounded-lg text-sm bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="relative overflow-hidden py-20">
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwLjA1Ii8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PC9zdmc+')]"
        style={{
          backgroundSize: '600px 600px',
          opacity: 0.1,
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400/20 to-amber-600/20 px-4 py-2 rounded-full text-yellow-400 text-sm font-medium mb-4 hover:from-yellow-400/30 hover:to-amber-600/30 transition-all duration-300">
            <Rocket className="h-4 w-4" />
            Development Roadmap
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Our Journey Forward
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Follow our development progress as we build the future of
            Realm-of-Cards Adventure
          </p>
        </div>

        {/* Timeline Connector */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-400/50 via-amber-500/30 to-transparent hidden lg:block" />

          {/* Roadmap Grid */}
          <div className="grid gap-8 lg:gap-16">
            {ROADMAP_PHASES.map((phase, index) => (
              <div
                key={index}
                className={cn(
                  'lg:grid lg:grid-cols-2 lg:gap-8 items-center',
                  index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                )}
              >
                {index % 2 === 0 ? (
                  <>
                    <PhaseCard phase={phase} index={index} />
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <PhaseCard phase={phase} index={index} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
