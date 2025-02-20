import { Button } from '../ui/button';
import { Class } from '@/types/game';
import { Flame, Droplet, Trees, Mountain, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassFilterProps {
  activeFilter: Class | null;
  setActiveFilter: (filter: Class | null) => void;
}

export function ClassFilter({
  activeFilter,
  setActiveFilter,
}: ClassFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
      {Object.values(Class).map((classType) => (
        <Button
          key={classType}
          className={cn(
            'filter-button bg-black/50 border border-yellow-600/30 text-yellow-400 hover:bg-yellow-900/30',
            activeFilter === classType && 'bg-yellow-900/50 border-yellow-400'
          )}
          onClick={() =>
            setActiveFilter(activeFilter === classType ? null : classType)
          }
        >
          {classType === Class.FIRE && <Flame className="w-4 h-4" />}
          {classType === Class.WATER && <Droplet className="w-4 h-4" />}
          {classType === Class.WOOD && <Trees className="w-4 h-4" />}
          {classType === Class.EARTH && <Mountain className="w-4 h-4" />}
          {classType === Class.METAL && <Cog className="w-4 h-4" />}
          <span className="ml-2">{classType}</span>
        </Button>
      ))}
    </div>
  );
}
