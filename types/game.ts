export enum OnAttackEffect {
  NONE = 'NONE',
  LIFESTEAL = 'LIFESTEAL',
  CRITICAL_STRIKE = 'CRITICAL_STRIKE'
}

export enum OnDeadEffect {
  NONE = 'NONE',
  EXPLODE = 'EXPLODE'
}

export enum OnDefenseEffect {
  NONE = 'NONE',
  THORNS = 'THORNS'
}

export enum ActiveSkill {
  NONE = 'NONE',
  SACRIFICE = 'SACRIFICE'
}

export enum Class {
  METAL = 'METAL',
  WOOD = 'WOOD',
  WATER = 'WATER',
  FIRE = 'FIRE',
  EARTH = 'EARTH'
}

export interface Card {
  id: number;
  name: string;
  attack: number;
  health: number;
  maxPerSession: number;
  class: Class[];
  staminaCost: number;
  onAttackEffect: OnAttackEffect;
  onDeadEffect: OnDeadEffect;
  onDefenseEffect: OnDefenseEffect;
  activeSkill: ActiveSkill;
  image: string;
}

export interface GameCard extends Omit<Card, 'maxPerSession'> {
  currentHealth: number;
}

export interface Monster {
  id: number;
  health: number;
  attack: number;
  class: Class[];
  image: string;
}

export interface GameState {
  _id: string;
  playerId: string;
  sessionId: string;
  currentStage: number;
  playerHealth: number;
  playerStamina: number;
  deck: GameCard[];
  currentMonster: {
    monsterId: number;
    health: number;
    attack: number;
  };
  cardsOnField: (GameCard | null)[];
  battleHistory: {
    turn: number;
    action: 'play_card' | 'monster_attack';
    cardId?: number;
    damageDealt: number;
    monsterHpLeft?: number;
    playerHpLeft?: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface PrebuiltDeck {
  id: string;
  name: string;
  description: string;
  cards: Card[];
  coverImage: string;
}