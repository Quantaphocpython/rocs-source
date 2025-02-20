import { Button } from '../ui/button';
import { Sword, Sparkles, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortOptionsProps {
  sortBy: 'attack' | 'health' | 'cost';
  setSortBy: (sort: 'attack' | 'health' | 'cost') => void;
}

export function SortOptions({ sortBy, setSortBy }: SortOptionsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <Button
        className={cn(
          'sort-button bg-black/50 border border-yellow-600/30 text-yellow-400 hover:bg-yellow-900/30',
          sortBy === 'attack' && 'bg-yellow-900/50 border-yellow-400'
        )}
        onClick={() => setSortBy('attack')}
      >
        <Sword className="w-4 h-4 mr-2" />
        Attack
      </Button>
      <Button
        className={cn(
          'sort-button bg-black/50 border border-yellow-600/30 text-yellow-400 hover:bg-yellow-900/30',
          sortBy === 'health' && 'bg-yellow-900/50 border-yellow-400'
        )}
        onClick={() => setSortBy('health')}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Health
      </Button>
      <Button
        className={cn(
          'sort-button bg-black/50 border border-yellow-600/30 text-yellow-400 hover:bg-yellow-900/30',
          sortBy === 'cost' && 'bg-yellow-900/50 border-yellow-400'
        )}
        onClick={() => setSortBy('cost')}
      >
        <Filter className="w-4 h-4 mr-2" />
        Cost
      </Button>
    </div>
  );
}
