'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Sword } from 'lucide-react';
import { PrebuiltDeck } from "@/types/game";

import { cn } from '@/lib/utils';
import { PrebuiltDeckCard } from './PreviewDeckCard';

interface PrebuiltDeckListProps {
  decks: PrebuiltDeck[];
  selectedDeck: PrebuiltDeck | null;
  onDeckSelect: (deck: PrebuiltDeck) => void;
  onStartBattle: () => void;
}

export function PrebuiltDeckList({ decks, selectedDeck, onDeckSelect, onStartBattle }: PrebuiltDeckListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: true,
    containScroll: 'keepSnaps',
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {decks.map((deck) => (
            <div key={deck.id} className="embla__slide">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-[1200px]"
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
      <button
        className="embla__button embla__button--prev"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="embla__button embla__button--next"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "embla__dot",
              index === selectedIndex && "embla__dot--selected"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Start Battle Button */}
      {selectedDeck && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed top-8 right-8 z-50"
        >
          <button
            onClick={onStartBattle}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-lg text-lg font-medium",
              "bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md",
              "border border-yellow-900/30 hover:border-yellow-400/50",
              "text-yellow-400 hover:text-yellow-200",
              "shadow-lg shadow-yellow-900/20 hover:shadow-xl hover:shadow-yellow-900/40",
              "transform transition-all duration-300 hover:scale-105",
              "relative overflow-hidden group"
            )}
          >
            {/* Hiệu ứng gradient hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Nội dung nút */}
            <Sword className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Start Battle</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}