'use client';

import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { Monster, Class } from '@/types/game';
import { Address } from 'viem';

const mapClassFromNumber = (classNumber: number): Class => {
  const classMap: { [key: number]: Class } = {
    0: Class.METAL,
    1: Class.WOOD,
    2: Class.WATER,
    3: Class.FIRE,
    4: Class.EARTH,
  };
  return classMap[classNumber] || Class.METAL; // Default về METAL nếu không khớp
};

function isValidMonsterWithId(data: unknown): data is {
  id: bigint;
  monster: {
    name: string;
    health: bigint;
    attack: bigint;
    image: string;
    classes: number[];
  };
} {
  return (
    data !== null &&
    typeof data === 'object' &&
    'id' in data &&
    'monster' in data &&
    typeof (data as any).monster === 'object' &&
    'name' in (data as any).monster &&
    'health' in (data as any).monster &&
    'attack' in (data as any).monster &&
    'image' in (data as any).monster &&
    'classes' in (data as any).monster &&
    Array.isArray((data as any).monster.classes)
  );
}

export function useGetMonsterById(monsterId: bigint) {
  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getMonsterById',
    args: [monsterId],
    query: {
      enabled: monsterId > BigInt(0), // Chỉ gọi khi monsterId hợp lệ (> 0)
      staleTime: 1000 * 60 * 5,
    },
  });

  const processedMonster: Monster | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidMonsterWithId(contractData)) {
      console.error('Invalid monster data', contractData);
      return undefined;
    }

    return {
      id: Number(contractData.id), // Chuyển từ bigint sang number
      name: contractData.monster.name,
      health: Number(contractData.monster.health),
      attack: Number(contractData.monster.attack),
      image: contractData.monster.image,
      class: contractData.monster.classes.map((c: number) =>
        mapClassFromNumber(c)
      ),
    };
  })();

  return {
    monster: processedMonster,
    error,
    isLoading,
    refetch,
  };
}
