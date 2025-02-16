"use client";

import { Card, Class, OnAttackEffect, OnDeadEffect, OnDefenseEffect, ActiveSkill } from "@/types/game";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Heart, Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";

interface CardDetailsProps {
    card: Card | null;
    isOpen: boolean;
    onClose: () => void;
}

function getEffectDescription(card: Card | null) {
    if (!card) return [];

    const effects = [];

    if (card.onAttackEffect === OnAttackEffect.CRITICAL_STRIKE) {
        effects.push("30% chance to deal double damage");
    } else if (card.onAttackEffect === OnAttackEffect.LIFESTEAL) {
        effects.push("Heals for 50% of damage dealt");
    }

    if (card.onDeadEffect === OnDeadEffect.EXPLODE) {
        effects.push("Deals 3 damage to enemy when destroyed");
    }

    if (card.onDefenseEffect === OnDefenseEffect.THORNS) {
        effects.push("Reflects 2 damage when attacked");
    }

    if (card.activeSkill === ActiveSkill.SACRIFICE) {
        effects.push("Can be sacrificed to gain 2 stamina");
    }

    return effects;
}

function getClassIcon(className: Class) {
    switch (className) {
        case Class.FIRE:
            return <Flame className="w-5 h-5" />;
        case Class.WATER:
            return <Droplet className="w-5 h-5" />;
        case Class.WOOD:
            return <Trees className="w-5 h-5" />;
        case Class.EARTH:
            return <Mountain className="w-5 h-5" />;
        case Class.METAL:
            return <Cog className="w-5 h-5" />;
    }
}

export function CardDetails({ card, isOpen, onClose }: CardDetailsProps) {
    if (!card) return null;

    const effects = getEffectDescription(card);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border border-gray-800 text-white p-0 max-w-2xl">
                <DialogHeader className="p-6 border-b border-gray-800">
                    <DialogTitle className="text-2xl font-bold">{card.name}</DialogTitle>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Classes */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-400">Classes</h3>
                        <div className="flex gap-3">
                            {card.class.map((cls, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded border border-gray-800"
                                >
                                    {getClassIcon(cls)}
                                    <span className="text-sm font-medium">{cls}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-400">Stats</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded border border-gray-800">
                                <Sword className="w-5 h-5 text-orange-500" />
                                <div>
                                    <div className="text-sm font-medium">Attack</div>
                                    <div className="text-lg font-bold text-orange-500">{card.attack}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded border border-gray-800">
                                <Heart className="w-5 h-5 text-red-500" />
                                <div>
                                    <div className="text-sm font-medium">Health</div>
                                    <div className="text-lg font-bold text-red-500">{card.health}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded border border-gray-800">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <div>
                                    <div className="text-sm font-medium">Cost</div>
                                    <div className="text-lg font-bold text-yellow-500">{card.staminaCost}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Effects */}
                    {effects.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-gray-400">Effects</h3>
                            <div className="space-y-2">
                                {effects.map((effect, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded border border-gray-800"
                                    >
                                        <Shield className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm">{effect}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Deck Limit */}
                    <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded border border-gray-800">
                        <span className="text-sm">Maximum {card.maxPerSession} copies per deck</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}