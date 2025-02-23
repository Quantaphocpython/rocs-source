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
            {/* Element Filters */}
            <div className="p-4 bg-black/40 rounded-lg border border-yellow-900/50">
                <h4 className="text-sm font-medium text-yellow-400 mb-3">Filter by Element</h4>
                <div className="flex flex-wrap items-center gap-2">
                    {Object.values(Class).map((classType) => (
                        <Button
                            key={classType}
                            variant="outline"
                            size="sm"
                            className={cn(
                                "bg-black/60 border-yellow-900/50 text-yellow-400 hover:bg-yellow-900/20",
                                "transition-all duration-300",
                                activeFilter === classType && "bg-yellow-900/50 border-yellow-400"
                            )}
                            onClick={() => onFilterChange(activeFilter === classType ? null : classType)}
                        >
                            {classType === Class.FIRE && <Flame className="w-4 h-4 mr-2" />}
                            {classType === Class.WATER && <Droplet className="w-4 h-4 mr-2" />}
                            {classType === Class.WOOD && <Trees className="w-4 h-4 mr-2" />}
                            {classType === Class.EARTH && <Mountain className="w-4 h-4 mr-2" />}
                            {classType === Class.METAL && <Cog className="w-4 h-4 mr-2" />}
                            {classType}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Sort Options */}
            <div className="p-4 bg-black/40 rounded-lg border border-yellow-900/50">
                <h4 className="text-sm font-medium text-yellow-400 mb-3">Sort by</h4>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "bg-black/60 border-yellow-900/50 text-yellow-400 hover:bg-yellow-900/20",
                            "transition-all duration-300",
                            sortBy === 'attack' && "bg-yellow-900/50 border-yellow-400"
                        )}
                        onClick={() => onSortChange('attack')}
                    >
                        <Sword className="w-4 h-4 mr-2" />
                        Attack
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "bg-black/60 border-yellow-900/50 text-yellow-400 hover:bg-yellow-900/20",
                            "transition-all duration-300",
                            sortBy === 'health' && "bg-yellow-900/50 border-yellow-400"
                        )}
                        onClick={() => onSortChange('health')}
                    >
                        <Shield className="w-4 h-4 mr-2" />
                        Health
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                            "bg-black/60 border-yellow-900/50 text-yellow-400 hover:bg-yellow-900/20",
                            "transition-all duration-300",
                            sortBy === 'cost' && "bg-yellow-900/50 border-yellow-400"
                        )}
                        onClick={() => onSortChange('cost')}
                    >
                        <Zap className="w-4 h-4 mr-2" />
                        Cost
                    </Button>
                </div>
            </div>
        </div>
    );
}