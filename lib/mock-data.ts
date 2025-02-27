import {
  Card,
  Class,
  Monster,
  OnAttackEffect,
  OnDeadEffect,
  OnDefenseEffect,
  ActiveSkill,
  GameState,
  PrebuiltDeck,
} from "@/types/game";

// Base card pool (40 cards)
export const cardPool: Card[] = [
  {
    id: 1,
    name: "Fire Dragon",
    attack: 8,
    health: 6,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png",
    class: [Class.FIRE],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 2,
    name: "Earth Golem",
    attack: 4,
    health: 10,
    maxPerSession: 3,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049298/TCG%20Battle%20Adventure/r9ahkormzgxdmlfwuj9s.png",
    class: [Class.EARTH],
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 3,
    name: "Water Elemental",
    attack: 6,
    health: 6,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/vgsemseiixtxtyjjfo1v.png",
    class: [Class.WATER],
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 4,
    name: "Metal Knight",
    attack: 7,
    health: 8,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/bwmtrdybdv8wnz3zycg7.png",
    class: [Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 5,
    name: "Wood Elf",
    attack: 5,
    health: 4,
    maxPerSession: 3,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049289/TCG%20Battle%20Adventure/hwa5oiqezmwdiid5gaci.jpg",
    class: [Class.WOOD],
    staminaCost: 1,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 6,
    name: "Flame Assassin",
    attack: 9,
    health: 4,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049293/TCG%20Battle%20Adventure/vnwlzhguts8rfc7jkhnp.png",
    class: [Class.FIRE],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
  },
  {
    id: 7,
    name: "Stone Guardian",
    attack: 3,
    health: 12,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/pmvgcr6abzs1p2d8yarx.png",
    class: [Class.EARTH],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 8,
    name: "Water Healer",
    attack: 4,
    health: 6,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049289/TCG%20Battle%20Adventure/hwa5oiqezmwdiid5gaci.jpg",
    class: [Class.WATER],
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 9,
    name: "Metal Berserker",
    attack: 8,
    health: 5,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049295/TCG%20Battle%20Adventure/qpfcfs8vffnipuicubrn.png",
    class: [Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
  },
  {
    id: 10,
    name: "Forest Druid",
    attack: 5,
    health: 7,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/lm03b601m6xeobc7wczu.png",
    class: [Class.WOOD],
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 11,
    name: "Volcanic Giant",
    attack: 10,
    health: 8,
    maxPerSession: 1,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/nonfpunalm20kyfl6jxe.png",
    class: [Class.FIRE, Class.EARTH],
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 12,
    name: "Storm Mage",
    attack: 7,
    health: 5,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/zfna0w9d2ndjyyyjbmph.png",
    class: [Class.WATER, Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 13,
    name: "Nature's Warden",
    attack: 6,
    health: 8,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/aeklge0zyujx8ikxcryz.png",
    class: [Class.WOOD, Class.EARTH],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 14,
    name: "Blade Master",
    attack: 8,
    health: 6,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/vhdctqr1lot3u202xthg.png",
    class: [Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
  },
  {
    id: 15,
    name: "Ancient Treant",
    attack: 4,
    health: 12,
    maxPerSession: 1,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/wqujynso8o9akodknazz.png",
    class: [Class.WOOD],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 16,
    name: "Phoenix Warrior",
    attack: 7,
    health: 5,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/sgpqtvvxsop5g9x04wa4.png",
    class: [Class.FIRE],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 17,
    name: "Crystal Golem",
    attack: 5,
    health: 9,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049328/TCG%20Battle%20Adventure/vi2awomtpdu6bwzt9vgg.png",
    class: [Class.EARTH, Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 18,
    name: "Tide Caller",
    attack: 6,
    health: 6,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/vgsemseiixtxtyjjfo1v.png",
    class: [Class.WATER],
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 19,
    name: "Steel Sentinel",
    attack: 6,
    health: 8,
    maxPerSession: 2,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/bwmtrdybdv8wnz3zycg7.png",
    class: [Class.METAL],
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
  },
  {
    id: 20,
    name: "Forest Scout",
    attack: 4,
    health: 4,
    maxPerSession: 3,
    image:
      "https://res.cloudinary.com/dlotuochc/image/upload/v1740049289/TCG%20Battle%20Adventure/hwa5oiqezmwdiid5gaci.jpg",
    class: [Class.WOOD],
    staminaCost: 1,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
  },
];

export const mockGameState: GameState = {
  _id: "mock-game-1",
  playerId: "player-1",
  sessionId: "session-1",
  currentStage: 1,
  playerHealth: 40,
  playerStamina: 1,
  deck: [],
  currentMonster: {
    monsterId: 1,
    health: 40,
    attack: 5,
  },
  currentBoss: null,
  cardsOnField: [],
  battleHistory: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const prebuiltDecks: PrebuiltDeck[] = [
  {
    id: "fire-aggro",
    name: "Inferno Dominance",
    description:
      "Overwhelm your enemies with aggressive fire attacks and explosive combinations",
    difficulty: "Medium",
    playstyle: "Aggressive",
    strengths: ["High burst damage", "Critical strikes", "Explosive effects"],
    weaknesses: ["Low survivability", "Vulnerable to control"],
    cards: [
      cardPool[0], // Fire Dragon x2
      cardPool[0],
      cardPool[5], // Flame Assassin x2
      cardPool[5],
      cardPool[15], // Phoenix Warrior x2
      cardPool[15],
      cardPool[10], // Volcanic Giant
      cardPool[2], // Water Elemental x2
      cardPool[2],
      cardPool[7], // Water Healer x2
      cardPool[7],
      cardPool[11], // Storm Mage x2
      cardPool[11],
    ],
    coverImage:
      "https://images.unsplash.com/photo-1544553866-7f0d760b6f46?q=80&w=2070",
    strategy:
      "Focus on dealing maximum damage early. Use Water Elementals for sustain and Storm Mages for consistent damage.",
  },
  {
    id: "earth-defense",
    name: "Mountain's Bulwark",
    description: "An impenetrable fortress of earth and stone",
    difficulty: "Easy",
    playstyle: "Defensive",
    strengths: ["High health pool", "Thorns damage", "Good sustain"],
    weaknesses: ["Low mobility", "Weak to burst damage"],
    cards: [
      cardPool[1], // Earth Golem x3
      cardPool[1],
      cardPool[1],
      cardPool[6], // Stone Guardian x2
      cardPool[6],
      cardPool[16], // Crystal Golem x2
      cardPool[16],
      cardPool[12], // Nature's Warden x2
      cardPool[12],
      cardPool[14], // Ancient Treant
      cardPool[9], // Forest Druid x2
      cardPool[9],
      cardPool[19], // Forest Scout
    ],
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070",
    strategy:
      "Build a wall of high-health units. Use thorns effects to punish attackers while slowly grinding them down.",
  },
  {
    id: "metal-control",
    name: "Steel Legion",
    description: "Precise strikes and calculated moves",
    difficulty: "Hard",
    playstyle: "Control",
    strengths: ["Balanced stats", "Critical strikes", "Armor effects"],
    weaknesses: ["Resource intensive", "Complex combinations"],
    cards: [
      cardPool[3], // Metal Knight x2
      cardPool[3],
      cardPool[8], // Metal Berserker x2
      cardPool[8],
      cardPool[13], // Blade Master x2
      cardPool[13],
      cardPool[18], // Steel Sentinel x2
      cardPool[18],
      cardPool[11], // Storm Mage x2
      cardPool[11],
      cardPool[16], // Crystal Golem x2
      cardPool[16],
      cardPool[10], // Volcanic Giant
    ],
    coverImage:
      "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070",
    strategy:
      "Control the battlefield with armored units while setting up powerful critical strike combinations.",
  },
  {
    id: "nature-combo",
    name: "Wild Synthesis",
    description: "Harness the power of nature's harmony",
    difficulty: "Medium",
    playstyle: "Combo",
    strengths: ["Synergy bonuses", "Resource efficient", "Flexible gameplay"],
    weaknesses: ["Requires setup", "Weak individually"],
    cards: [
      cardPool[4], // Wood Elf x3
      cardPool[4],
      cardPool[4],
      cardPool[9], // Forest Druid x2
      cardPool[9],
      cardPool[14], // Ancient Treant
      cardPool[12], // Nature's Warden x2
      cardPool[12],
      cardPool[2], // Water Elemental x2
      cardPool[2],
      cardPool[7], // Water Healer x2
      cardPool[7],
    ],
    coverImage:
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2070",
    strategy:
      "Build powerful combinations between Wood and Water units. Focus on healing and sustain while growing stronger.",
  },
  {
    id: "elemental-chaos",
    name: "Elemental Chaos",
    description: "Master all elements in perfect discord",
    difficulty: "Expert",
    playstyle: "Versatile",
    strengths: ["Unpredictable", "Powerful effects", "Multiple strategies"],
    weaknesses: ["Inconsistent", "Hard to master"],
    cards: [
      cardPool[0], // Fire Dragon
      cardPool[1], // Earth Golem
      cardPool[2], // Water Elemental
      cardPool[3], // Metal Knight
      cardPool[4], // Wood Elf
      cardPool[10], // Volcanic Giant
      cardPool[11], // Storm Mage
      cardPool[12], // Nature's Warden
      cardPool[13], // Blade Master
      cardPool[14], // Ancient Treant
      cardPool[15], // Phoenix Warrior
      cardPool[16], // Crystal Golem
      cardPool[17], // Tide Caller
    ],
    coverImage:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2070",
    strategy:
      "Adapt to each situation by combining different elemental effects. Requires deep knowledge of all mechanics.",
  },
];
