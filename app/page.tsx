"use client";

import { useEffect, useState } from "react";
import { GameCard } from "@/components/game/GameCard";
import { GameBoard } from "@/components/game/GameBoard";
import { Button } from "@/components/ui/button";

interface GameCard {
  id: number;
  name: string;
  damage: number;
  health: number;
  maxHealth?: number;
  staminaCost: number;
  effects: {
    onAttack?: "lifesteal" | "pierce" | "splash" | "freeze" | "critical";
    onDead?: "explode" | "revive" | "thorns" | "sacrifice" | "summonAlly";
  };
  isDeployed?: boolean;
  copiesSelected?: number;
}

interface Monster {
  id: number;
  name: string;
  health: number;
  maxHealth: number;
  damage: number;
  effects?: string[];
  isStunned?: boolean;
}

type GamePhase = "setup" | "battle" | "gameOver";

export default function Home() {
  const [playerHealth, setPlayerHealth] = useState(40);
  const [stamina, setStamina] = useState(1);
  const [deck, setDeck] = useState<GameCard[]>([]);
  const [hand, setHand] = useState<GameCard[]>([]);
  const [field, setField] = useState<GameCard[]>([]);
  const [availableCards, setAvailableCards] = useState<GameCard[]>([]);
  const [currentMonster, setCurrentMonster] = useState<Monster | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>("setup");
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [cardCopies, setCardCopies] = useState<Record<number, number>>({});

  useEffect(() => {
    const generateCards = (): GameCard[] => {
      const cards: GameCard[] = [];
      const effects = {
        onAttack: ["lifesteal", "pierce", "splash", "freeze", "critical"],
        onDead: ["explode", "revive", "thorns", "sacrifice", "summonAlly"],
      };

      for (let i = 0; i < 40; i++) {
        const health = Math.floor(Math.random() * 8) + 1;
        const damage = Math.floor(Math.random() * 10) + 1;
        const staminaCost = Math.floor(Math.random() * 3) + 1;
        
        const cardPower = (damage * 2 + health) / staminaCost;
        const maxCopies = cardPower > 15 ? 1 : cardPower > 10 ? 2 : 3;
        
        cards.push({
          id: i,
          name: `Card ${i + 1}`,
          damage,
          health,
          maxHealth: health,
          staminaCost,
          effects: {
            onAttack: Math.random() > 0.7 ? effects.onAttack[Math.floor(Math.random() * effects.onAttack.length)] as any : undefined,
            onDead: Math.random() > 0.7 ? effects.onDead[Math.floor(Math.random() * effects.onDead.length)] as any : undefined,
          },
          copiesSelected: 0,
        });
      }
      return cards;
    };

    setAvailableCards(generateCards());
  }, []);

  const drawCard = () => {
    if (deck.length > 0 && hand.length < 6) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const drawnCard = deck[randomIndex];
      const newDeck = [...deck];
      newDeck.splice(randomIndex, 1);
      
      setDeck(newDeck);
      setHand([...hand, drawnCard]);
    }
  };

  const handleCardSummon = (card: GameCard) => {
    if (!isPlayerTurn || stamina < card.staminaCost) return;

    const newHand = hand.filter(c => c.id !== card.id);
    setHand(newHand);
    setField([...field, { ...card, isDeployed: true }]);
    setStamina(prev => prev - card.staminaCost);
  };

  const resolveBattle = () => {
    if (!currentMonster || !isPlayerTurn) return;

    let totalDamage = 0;
    const updatedField: GameCard[] = [];
    const deadCards: GameCard[] = [];

    // Calculate total damage from all cards
    field.forEach(card => {
      let damage = card.damage;
      
      if (card.effects.onAttack === "critical" && Math.random() < 0.3) {
        damage *= 2;
      }

      if (card.effects.onAttack === "lifesteal") {
        const healing = Math.floor(damage * 0.5);
        setPlayerHealth(prev => Math.min(40, prev + healing));
      }

      totalDamage += damage;

      // Monster's remaining health acts as armor
      const cardNewHealth = card.health - Math.max(0, currentMonster.damage);
      
      if (cardNewHealth <= 0) {
        if (card.effects.onDead === "explode") {
          totalDamage += 10;
        } else if (card.effects.onDead === "sacrifice") {
          setPlayerHealth(prev => Math.min(40, prev + 5));
        }
        deadCards.push(card);
      } else {
        updatedField.push({ ...card, health: cardNewHealth });
      }
    });

    // Update monster health
    const newMonsterHealth = currentMonster.health - totalDamage;
    
    // Only update monster if it's still alive (health > 0)
    if (newMonsterHealth > 0) {
      setCurrentMonster({
        ...currentMonster,
        health: newMonsterHealth
      });
    } else {
      // Monster is defeated, generate a new one
      setCurrentMonster(generateMonster());
      setIsPlayerTurn(true);
      setStamina(prev => Math.min(5, prev + 1));
      drawCard();
      return;
    }

    setField(updatedField);

    // If no cards on field, monster attacks player directly
    if (updatedField.length === 0) {
      setPlayerHealth(prev => Math.max(0, prev - currentMonster.damage));
    }

    setIsPlayerTurn(false);
    setTimeout(monsterTurn, 1000);
  };

  const monsterTurn = () => {
    if (!currentMonster) {
      setCurrentMonster(generateMonster());
      setIsPlayerTurn(true);
      setStamina(prev => Math.min(5, prev + 1));
      drawCard();
      return;
    }

    setIsPlayerTurn(true);
    setStamina(prev => Math.min(5, prev + 1));
    drawCard();
  };

  const generateMonster = (): Monster => {
    return {
      id: Math.random(),
      name: `Monster ${Math.floor(Math.random() * 100)}`,
      health: Math.floor(Math.random() * 21) + 40,
      maxHealth: 60,
      damage: Math.floor(Math.random() * 6) + 5,
      isStunned: false
    };
  };

  const handleCardSelect = (card: GameCard) => {
    const currentCopies = cardCopies[card.id] || 0;
    const totalSelected = Object.values(cardCopies).reduce((sum, count) => sum + count, 0);
    
    const cardPower = (card.damage * 2 + card.health) / card.staminaCost;
    const maxCopies = cardPower > 15 ? 1 : cardPower > 10 ? 2 : 3;

    if (totalSelected < 13 && currentCopies < maxCopies) {
      const newCopies = { ...cardCopies };
      newCopies[card.id] = (newCopies[card.id] || 0) + 1;
      setCardCopies(newCopies);
      
      const cardCopy = { ...card, id: card.id + (currentCopies * 1000) };
      setSelectedCards([...selectedCards, cardCopy]);
    }
  };

  const handleCardDeselect = (card: GameCard) => {
    const baseId = card.id % 1000;
    const newCopies = { ...cardCopies };
    if (newCopies[baseId] > 0) {
      newCopies[baseId]--;
      if (newCopies[baseId] === 0) {
        delete newCopies[baseId];
      }
      setCardCopies(newCopies);
      
      const cardIndex = selectedCards.map(c => c.id % 1000).lastIndexOf(baseId);
      if (cardIndex !== -1) {
        setSelectedCards([...selectedCards.slice(0, cardIndex), ...selectedCards.slice(cardIndex + 1)]);
      }
    }
  };

  const startBattle = () => {
    if (selectedCards.length === 13) {
      const initialDeck = [...selectedCards];
      setDeck(initialDeck);
      
      const initialHand: GameCard[] = [];
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * initialDeck.length);
        initialHand.push(initialDeck[randomIndex]);
        initialDeck.splice(randomIndex, 1);
      }
      
      setHand(initialHand);
      setDeck(initialDeck);
      setCurrentMonster(generateMonster());
      setGamePhase("battle");
    }
  };

  const renderSetupPhase = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="pixel-text text-4xl mb-4">Pixel Legends: Realm of Cards</h1>
        <h2 className="pixel-text text-xl text-blue-600 mb-6">Battle for the Digital Frontier</h2>
        <p className="pixel-text text-lg mb-2">Select 13 cards to build your deck</p>
        <p className="pixel-text text-sm text-muted-foreground">
          Stronger cards have limited copies (1-3)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {availableCards.map((card) => {
          const copies = cardCopies[card.id] || 0;
          const cardPower = (card.damage * 2 + card.health) / card.staminaCost;
          const maxCopies = cardPower > 15 ? 1 : cardPower > 10 ? 2 : 3;
          
          return (
            <div key={card.id} className="relative">
              <GameCard 
                card={card}
                onClick={() => handleCardSelect(card)}
                isSelected={copies > 0}
              />
              {copies > 0 && (
                <div className="absolute top-2 right-2 pixel-text text-xs bg-blue-500 text-white px-2 py-1">
                  {copies}/{maxCopies}
                </div>
              )}
              {copies > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardDeselect(card);
                  }}
                  className="pixel-button remove-button"
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <Button 
          size="lg"
          onClick={startBattle}
          disabled={selectedCards.length !== 13}
          className="pixel-button"
        >
          Start Battle ({selectedCards.length}/13 cards selected)
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-4">
      {gamePhase === "setup" && renderSetupPhase()}
      {gamePhase === "battle" && currentMonster && (
        <GameBoard
          monster={currentMonster}
          playerHealth={playerHealth}
          stamina={stamina}
          field={field}
          hand={hand}
          deck={deck}
          isPlayerTurn={isPlayerTurn}
          onCardSummon={handleCardSummon}
          onEndTurn={resolveBattle}
        />
      )}
    </div>
  );
}