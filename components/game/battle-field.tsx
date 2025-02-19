"use client";

import { GameCard } from "@/types/game";
import { GameCard as GameCardComponent } from "../ui/game-card";
import { cn } from "@/lib/utils";

interface BattleFieldProps {
    cardsOnField: (GameCard | null)[];
    selectedCard: number | null;
    targetSlot: number | null;
    onSlotClick: (index: number) => void;
    onSlotHover: (index: number | null) => void;
}

export function BattleField({
    cardsOnField,
    selectedCard,
    targetSlot,
    onSlotClick,
    onSlotHover
}: BattleFieldProps) {
    return (
        <div id="battle-field" className="battle-field">
            <div className="relative h-full flex flex-col p-6">
                <div className="flex-1 grid grid-cols-5 grid-rows-2 gap-4 p-8">
                    {[...Array(10)].map((_, index) => {
                        const card = cardsOnField[index];
                        return (
                            <div
                                key={`slot-${index}`}
                                className={cn(
                                    "card-slot",
                                    targetSlot === index && "targetable",
                                    selectedCard !== null && !card && "cursor-pointer"
                                )}
                                onClick={() => {
                                    if (selectedCard !== null && !card) {
                                        onSlotClick(index);
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (selectedCard !== null && !card) {
                                        onSlotHover(index);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (targetSlot === index) {
                                        onSlotHover(null);
                                    }
                                }}
                            >
                                {card && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <GameCardComponent
                                            card={card}
                                            disabled={true}
                                            size="small"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}