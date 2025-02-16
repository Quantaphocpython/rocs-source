"use client";

import { Dialog, DialogContent } from "../ui/dialog";
import { Heart, Sword, Shield, Zap, Flame, Droplet, Trees, Mountain, Cog } from "lucide-react";

interface TutorialDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TutorialDialog({ isOpen, onClose }: TutorialDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border border-gray-800 text-white p-0 max-w-3xl max-h-[80vh] overflow-y-auto">
                <div className="p-6 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                        <p className="text-gray-400">A strategic card game where you battle against powerful monsters using elemental cards.</p>
                    </div>

                    {/* Game Flow */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-400">Game Flow</h3>
                        <div className="space-y-2">
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">1. Deck Building:</span> Choose 13 cards to build your deck. Each card has a limit on how many copies you can include.</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">2. Battle Phase:</span> Take turns playing cards and attacking the monster. Each turn you can:</p>
                                <ul className="mt-2 space-y-1 text-sm text-gray-400">
                                    <li>• Play one card (costs stamina)</li>
                                    <li>• Attack with played cards</li>
                                    <li>• End your turn to draw a card</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card Elements */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-400">Card Elements</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Flame className="w-6 h-6 text-red-500" />
                                <div>
                                    <p className="font-medium">Fire</p>
                                    <p className="text-sm text-gray-400">High damage, explosive effects</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Droplet className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-medium">Water</p>
                                    <p className="text-sm text-gray-400">Healing and lifesteal abilities</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Trees className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="font-medium">Wood</p>
                                    <p className="text-sm text-gray-400">Balanced stats and effects</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Mountain className="w-6 h-6 text-yellow-500" />
                                <div>
                                    <p className="font-medium">Earth</p>
                                    <p className="text-sm text-gray-400">High health, defensive abilities</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Cog className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="font-medium">Metal</p>
                                    <p className="text-sm text-gray-400">Strong attacks, armor effects</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Stats */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-400">Card Stats</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Sword className="w-5 h-5 text-orange-500" />
                                <div>
                                    <p className="font-medium">Attack</p>
                                    <p className="text-sm text-gray-400">Damage dealt to monster</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Heart className="w-5 h-5 text-red-500" />
                                <div>
                                    <p className="font-medium">Health</p>
                                    <p className="text-sm text-gray-400">Card's durability</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                <div>
                                    <p className="font-medium">Stamina Cost</p>
                                    <p className="text-sm text-gray-400">Required to play card</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Effects */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-400">Special Effects</h3>
                        <div className="space-y-2">
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">Critical Strike:</span> 30% chance to deal double damage</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">Lifesteal:</span> Heals for 50% of damage dealt</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">Thorns:</span> Reflects 2 damage when attacked</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm"><span className="text-yellow-500 font-medium">Explode:</span> Deals 3 damage when destroyed</p>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-blue-400">Tips</h3>
                        <div className="space-y-2">
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm">• Balance your deck with different card types and effects</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm">• Consider stamina costs when building your deck</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm">• Use defensive cards to protect against monster attacks</p>
                            </div>
                            <div className="bg-black/50 p-4 border border-gray-800 rounded-lg">
                                <p className="text-sm">• Right-click cards to view detailed information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}