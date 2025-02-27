'use client';

import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { Monster, Class } from '@/types/game';
import { Address } from 'viem';

// Kiểm tra dữ liệu hợp lệ từ contract
function isValidMonsters(
  data: unknown
): data is { id: bigint; monster: any }[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        'id' in item &&
        'monster' in item &&
        typeof item.monster === 'object' &&
        'name' in item.monster &&
        'health' in item.monster &&
        'attack' in item.monster &&
        'image' in item.monster &&
        'classes' in item.monster &&
        Array.isArray(item.monster.classes)
    )
  );
}

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

export function useGetMonsters() {
  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getAllMonsters',
    query: {
      staleTime: 10000000000000000000 * 60 * 5,
    },
  });

  const processedMonsters: Monster[] | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidMonsters(contractData)) {
      console.error('Invalid contract data', contractData);
      return undefined;
    }

    return contractData.map((item) => ({
      id: Number(item.id),
      name: item.monster.name,
      health: Number(item.monster.health),
      attack: Number(item.monster.attack),
      image: item.monster.image,
      class: item.monster.classes.map((c: number) => mapClassFromNumber(c)),
    }));
  })();

  return {
    monsters: processedMonsters,
    error,
    isLoading,
    refetch,
  };
}
