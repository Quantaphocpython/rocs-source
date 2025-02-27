import { useEffect, useState } from 'react';

const STORAGE_KEY = 'defeatedMonsters';

export function useDefeatedMonsters() {
  const [defeatedMonsters, setDefeatedMonsters] = useState<number[]>([]);

  // Load danh sách từ localStorage khi component mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setDefeatedMonsters(JSON.parse(storedData));
    }
  }, []);

  // Hàm kiểm tra xem quái đã bị đánh bại chưa
  const isDefeated = (monsterId: number) =>
    defeatedMonsters.includes(monsterId);

  // Hàm thêm quái vào danh sách bị đánh bại
  const addDefeatedMonster = (monsterId: number) => {
    if (!defeatedMonsters.includes(monsterId)) {
      const updatedList = [...defeatedMonsters, monsterId];
      setDefeatedMonsters(updatedList);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    }
  };

  return { defeatedMonsters, isDefeated, addDefeatedMonster };
}
