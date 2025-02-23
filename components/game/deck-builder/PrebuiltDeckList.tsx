'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PrebuiltDeck } from "@/types/game";

import { cn } from '@/lib/utils';
import { PrebuiltDeckCard } from './PreviewDeckCard';

interface PrebuiltDeckListProps {
  decks: PrebuiltDeck[];
  selectedDeck: PrebuiltDeck | null;
  onDeckSelect: (deck: PrebuiltDeck) => void;
}

export function PrebuiltDeckList({ decks, selectedDeck, onDeckSelect }: PrebuiltDeckListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {decks.map((deck) => (
            <div key={deck.id} className="flex-[0_0_100%] min-w-0 pl-4 first:pl-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <PrebuiltDeckCard
                  deck={deck}
                  isSelected={selectedDeck?.id === deck.id}
                  onSelect={onDeckSelect}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          className={cn(
            "w-12 h-12 -ml-6 flex items-center justify-center rounded-full",
            "bg-black/60 text-yellow-400 hover:bg-black/80 transition-all",
            "transform hover:scale-110 hover:-translate-x-1",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          className={cn(
            "w-12 h-12 -mr-6 flex items-center justify-center rounded-full",
            "bg-black/60 text-yellow-400 hover:bg-black/80 transition-all",
            "transform hover:scale-110 hover:translate-x-1",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === selectedIndex
                ? "w-8 bg-yellow-400"
                : "bg-yellow-400/30 hover:bg-yellow-400/50"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}