'use client';

import { Button } from "@/components/ui/button";
import { Class } from "@/types/game";
import { cn } from "@/lib/utils";
import { Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";

interface CardFiltersProps {
    activeFilter: Class | null;
    sortBy: 'attack' | 'health' | 'cost';
    onFilterChange: (filter: Class | null) => void;
    onSortChange: (sort: 'attack' | 'health' | 'cost') => void;
}

export function CardFilters({
    activeFilter,
    sortBy,
    onFilterChange,
    onSortChange,
}: CardFiltersProps) {
    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-2">
                {Object.values(Class).map((classType) => (
                    <Button
                        key={classType}
                        className={cn(
                            "filter-button",
                            activeFilter === classType && "filter-button-active"
                        )}
                        onClick={() => onFilterChange(activeFilter === classType ? null : classType)}
                    >
                        {classType === Class.FIRE && <Flame className="w-4 h-4" />}
                        {classType === Class.WATER && <Droplet className="w-4 h-4" />}
                        {classType === Class.WOOD && <Trees className="w-4 h-4" />}
                        {classType === Class.EARTH && <Mountain className="w-4 h-4" />}
                        {classType === Class.METAL && <Cog className="w-4 h-4" />}
                    </Button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <Button
                    className={cn(
                        "sort-button",
                        sortBy === 'attack' && "sort-button-active"
                    )}
                    onClick={() => onSortChange('attack')}
                >
                    <Sword className="w-4 h-4 mr-2" />
                    Attack
                </Button>
                <Button
                    className={cn(
                        "sort-button",
                        sortBy === 'health' && "sort-button-active"
                    )}
                    onClick={() => onSortChange('health')}
                >
                    <Shield className="w-4 h-4 mr-2" />
                    Health
                </Button>
                <Button
                    className={cn(
                        "sort-button",
                        sortBy === 'cost' && "sort-button-active"
                    )}
                    onClick={() => onSortChange('cost')}
                >
                    <Zap className="w-4 h-4 mr-2" />
                    Cost
                </Button>
            </div>
        </div>
    );
}