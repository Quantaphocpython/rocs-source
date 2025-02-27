'use client';

import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import {
  Card,
  OnAttackEffect,
  OnDeadEffect,
  OnDefenseEffect,
  ActiveSkill,
  Class,
} from '@/types/game';
import { Address } from 'viem';

// Hàm ánh xạ từ number sang enum (sử dụng giá trị từ enum thay vì chuỗi literal)
const mapOnAttackEffect = (value: number): OnAttackEffect => {
  const effectMap: { [key: number]: OnAttackEffect } = {
    0: OnAttackEffect.NONE,
    1: OnAttackEffect.LIFESTEAL,
    2: OnAttackEffect.CRITICAL_STRIKE,
  };
  return effectMap[value] || OnAttackEffect.NONE; // Default về NONE
};

const mapOnDeadEffect = (value: number): OnDeadEffect => {
  const effectMap: { [key: number]: OnDeadEffect } = {
    0: OnDeadEffect.NONE,
    1: OnDeadEffect.EXPLODE,
  };
  return effectMap[value] || OnDeadEffect.NONE;
};

const mapOnDefenseEffect = (value: number): OnDefenseEffect => {
  const effectMap: { [key: number]: OnDefenseEffect } = {
    0: OnDefenseEffect.NONE,
    1: OnDefenseEffect.THORNS,
  };
  return effectMap[value] || OnDefenseEffect.NONE;
};

const mapActiveSkill = (value: number): ActiveSkill => {
  const effectMap: { [key: number]: ActiveSkill } = {
    0: ActiveSkill.NONE,
    1: ActiveSkill.SACRIFICE,
  };
  return effectMap[value] || ActiveSkill.NONE;
};

const mapClassFromNumber = (classNumber: number): Class => {
  const classMap: { [key: number]: Class } = {
    0: Class.METAL,
    1: Class.WOOD,
    2: Class.WATER,
    3: Class.FIRE,
    4: Class.EARTH,
  };
  return classMap[classNumber] || Class.METAL; // Default về METAL
};

// Kiểm tra dữ liệu hợp lệ từ contract
function isValidCardWithId(data: unknown): data is {
  id: bigint;
  card: {
    name: string;
    attack: bigint;
    health: bigint;
    maxPerSession: bigint;
    staminaCost: bigint;
    image: string;
    onAttackEffect: number;
    onDeadEffect: number;
    onDefenseEffect: number;
    activeSkill: number;
    classes: number[];
  };
} {
  return (
    data !== null &&
    typeof data === 'object' &&
    'id' in data &&
    'card' in data &&
    typeof (data as any).card === 'object' &&
    'name' in (data as any).card &&
    'attack' in (data as any).card &&
    'health' in (data as any).card &&
    'maxPerSession' in (data as any).card &&
    'staminaCost' in (data as any).card &&
    'image' in (data as any).card &&
    'onAttackEffect' in (data as any).card &&
    'onDeadEffect' in (data as any).card &&
    'onDefenseEffect' in (data as any).card &&
    'activeSkill' in (data as any).card &&
    'classes' in (data as any).card &&
    Array.isArray((data as any).card.classes)
  );
}

export function useGetCardById(cardId: bigint) {
  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getCardById',
    args: [cardId],
    query: {
      enabled: cardId > BigInt(0),
      staleTime: 1000 * 60 * 5, // Cache 5 phút
    },
  });

  const processedCard: Card | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidCardWithId(contractData)) {
      console.error('Invalid card data', contractData);
      return undefined;
    }

    return {
      id: Number(contractData.id),
      name: contractData.card.name,
      attack: Number(contractData.card.attack),
      health: Number(contractData.card.health),
      maxPerSession: Number(contractData.card.maxPerSession),
      staminaCost: Number(contractData.card.staminaCost),
      image: contractData.card.image,
      onAttackEffect: mapOnAttackEffect(contractData.card.onAttackEffect),
      onDeadEffect: mapOnDeadEffect(contractData.card.onDeadEffect),
      onDefenseEffect: mapOnDefenseEffect(contractData.card.onDefenseEffect),
      activeSkill: mapActiveSkill(contractData.card.activeSkill),
      class: contractData.card.classes.map((c: number) =>
        mapClassFromNumber(c)
      ),
    };
  })();

  return {
    card: processedCard,
    error,
    isLoading,
    refetch,
  };
}
