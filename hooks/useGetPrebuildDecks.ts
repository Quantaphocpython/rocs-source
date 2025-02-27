'use client';

import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import {
  ActiveSkill,
  Class,
  OnAttackEffect,
  OnDeadEffect,
  OnDefenseEffect,
  PrebuiltDeck,
} from '@/types/game';
import { Address } from 'viem';

// Kiểm tra dữ liệu hợp lệ từ contract
function isValidPrebuiltDecks(
  data: unknown
): data is { id: bigint; deck: any }[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        'id' in item &&
        'deck' in item &&
        typeof item.deck === 'object' &&
        'name' in item.deck &&
        'description' in item.deck &&
        'difficulty' in item.deck &&
        'playstyle' in item.deck &&
        'strengths' in item.deck &&
        Array.isArray(item.deck.strengths) &&
        'weaknesses' in item.deck &&
        Array.isArray(item.deck.weaknesses) &&
        'cards' in item.deck &&
        Array.isArray(item.deck.cards) &&
        item.deck.cards.every(
          (card: any) =>
            typeof card === 'object' &&
            'id' in card &&
            'name' in card &&
            'attack' in card &&
            'health' in card &&
            'maxPerSession' in card &&
            'staminaCost' in card &&
            'image' in card &&
            'onAttackEffect' in card &&
            'onDeadEffect' in card &&
            'onDefenseEffect' in card &&
            'activeSkill' in card &&
            'classes' in card &&
            Array.isArray(card.classes)
        ) &&
        'coverImage' in item.deck &&
        'strategy' in item.deck
    )
  );
}

// Hàm ánh xạ số sang Class (tái sử dụng từ useGetCards)
const mapClassFromNumber = (classNumber: number): Class => {
  const classMap: { [key: number]: Class } = {
    0: Class.METAL,
    1: Class.WOOD,
    2: Class.WATER,
    3: Class.FIRE,
    4: Class.EARTH,
  };
  return classMap[classNumber] || Class.METAL;
};

export function useGetPrebuiltDecks() {
  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getAllPrebuiltDecks',
    query: {
      staleTime: 1000 * 60 * 5, // Cache 5 phút
    },
  });

  const processedDecks: PrebuiltDeck[] | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidPrebuiltDecks(contractData)) {
      console.error('Invalid contract data', contractData);
      return undefined;
    }

    return contractData.map((item) => ({
      id: Number(item.id), // Chuyển bigint thành number
      name: item.deck.name,
      description: item.deck.description,
      difficulty: item.deck.difficulty as 'Easy' | 'Medium' | 'Hard' | 'Expert',
      playstyle: item.deck.playstyle as
        | 'Aggressive'
        | 'Defensive'
        | 'Control'
        | 'Combo'
        | 'Versatile',
      strengths: item.deck.strengths,
      weaknesses: item.deck.weaknesses,
      cards: item.deck.cards.map((card: any) => ({
        id: Number(card.id),
        name: card.name,
        attack: Number(card.attack),
        health: Number(card.health),
        maxPerSession: Number(card.maxPerSession),
        staminaCost: Number(card.staminaCost),
        image: card.image,
        onAttackEffect:
          OnAttackEffect[
            OnAttackEffect[card.onAttackEffect as keyof typeof OnAttackEffect]
          ],
        onDeadEffect:
          OnDeadEffect[
            OnDeadEffect[card.onDeadEffect as keyof typeof OnDeadEffect]
          ],
        onDefenseEffect:
          OnDefenseEffect[
            OnDefenseEffect[
              card.onDefenseEffect as keyof typeof OnDefenseEffect
            ]
          ],
        activeSkill:
          ActiveSkill[
            ActiveSkill[card.activeSkill as keyof typeof ActiveSkill]
          ],
        class: card.classes.map((c: number) => mapClassFromNumber(c)),
      })),
      coverImage: item.deck.coverImage,
      strategy: item.deck.strategy,
    }));
  })();

  return {
    decks: processedDecks,
    error,
    isLoading,
    refetch,
  };
}
