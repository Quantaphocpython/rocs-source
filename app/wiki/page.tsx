'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import {
  Flame,
  Droplet,
  Trees,
  Mountain,
  Cog,
  Sword,
  Shield,
  Heart,
  Zap,
  BookOpen,
  Scroll,
  Sparkles,
  Skull,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Class,
  OnAttackEffect,
  OnDeadEffect,
  OnDefenseEffect,
  ActiveSkill,
} from '@/types/game';
import { SectionHighlight } from '@/components/ui/section-highlight';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data for cards
const cardData = [
  {
    id: 1,
    name: 'Stormcaller',
    attack: 6,
    health: 5,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/ykavqv8jwrrw4s7gemh5.png',
    description: 'A powerful elemental mage who commands the fury of storms.',
  },
  {
    id: 2,
    name: 'Shadow Beast',
    attack: 7,
    health: 4,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049292/TCG%20Battle%20Adventure/dqxfnzy7pxmy31divjpf.png',
    description:
      'A stealthy predator that lurks in the shadows of ancient forests.',
  },
  {
    id: 3,
    name: 'Ancient Guardian',
    attack: 3,
    health: 12,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740051204/TCG%20Battle%20Adventure/btxjd57q0zdo0pj8c5ue.png',
    description:
      'An ancient stone construct that has protected sacred lands for millennia.',
  },
  {
    id: 4,
    name: 'Cursed Doll',
    attack: 3,
    health: 5,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049295/TCG%20Battle%20Adventure/byimjbt4jdxrlsluvpb7.png',
    description: 'A haunted doll that drains the life force of its victims.',
  },
  {
    id: 5,
    name: 'Doom Bringer',
    attack: 8,
    health: 6,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049295/TCG%20Battle%20Adventure/rmdav3sz3idglw8n0elj.png',
    description:
      'A fearsome warrior clad in dark armor, harbinger of destruction.',
  },
  {
    id: 6,
    name: 'Forest Wraith',
    attack: 5,
    health: 6,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049298/TCG%20Battle%20Adventure/zuv1adu24pfvq6pk11tq.png',
    description:
      'A vengeful spirit that haunts the ancient forests, draining life from intruders.',
  },
  {
    id: 7,
    name: 'Molten Fiend',
    attack: 6,
    health: 5,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049290/TCG%20Battle%20Adventure/y4f0d2pntrgjhfbqpq8n.png',
    description:
      'A creature born of magma and flame that explodes violently when destroyed.',
  },
  {
    id: 8,
    name: 'Frost Revenant',
    attack: 4,
    health: 7,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049298/TCG%20Battle%20Adventure/gsywiudl3ul991qgjbjy.png',
    description: 'An icy specter that freezes attackers with its frigid aura.',
  },
  {
    id: 9,
    name: 'Skybreaker',
    attack: 10,
    health: 4,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049292/TCG%20Battle%20Adventure/u8t4oxqdpunhsbtpxyyu.png',
    description:
      'A legendary warrior whose mighty blade can cleave the heavens themselves.',
  },
  {
    id: 10,
    name: 'Plague Harbinger',
    attack: 5,
    health: 6,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049292/TCG%20Battle%20Adventure/o9vyx6irjqiyonfltr5m.png',
    description:
      'A sinister entity that spreads disease and decay, draining life to sustain itself.',
  },
  {
    id: 11,
    name: 'Bone Dragon',
    attack: 7,
    health: 8,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739799615/TCG%20Battle%20Adventure/evulnnlv4zwrrvmftmig.png',
    description:
      'An ancient dragon skeleton reanimated by dark magic, with armor-piercing attacks.',
  },
  {
    id: 12,
    name: 'Astral Phantom',
    attack: 4,
    health: 5,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739799446/TCG%20Battle%20Adventure/ism9nbuglmitrjsubmo1.png',
    description:
      'A spectral entity that can phase between dimensions, evading attacks with ease.',
  },
  {
    id: 13,
    name: 'Blood Alchemist',
    attack: 6,
    health: 6,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739799266/TCG%20Battle%20Adventure/yqrbzo4klyklxhupqvur.png',
    description:
      'A dark mage who harnesses blood magic to drain life from enemies and heal allies.',
  },
  {
    id: 14,
    name: 'Wicked Puppeteer',
    attack: 3,
    health: 7,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739799181/TCG%20Battle%20Adventure/lkmxy6cguhzjdwnzkkgh.png',
    description:
      'A sinister puppet master who can control enemies with invisible strings.',
  },
  {
    id: 15,
    name: 'Obsidian Titan',
    attack: 5,
    health: 10,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739799056/TCG%20Battle%20Adventure/f96kp7c0xoneknpixjqj.png',
    description:
      'A massive golem of black volcanic glass that reflects damage back to attackers.',
  },
  {
    id: 16,
    name: 'Nightmare Stalker',
    attack: 7,
    health: 4,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739798953/TCG%20Battle%20Adventure/qkkspuiwige47obk7shd.png',
    description:
      'A terrifying entity that hunts prey in their dreams, striking with devastating precision.',
  },
  {
    id: 17,
    name: 'Phoenix Rebirth',
    attack: 6,
    health: 5,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739798578/TCG%20Battle%20Adventure/ft2siwxlhnjtuncbigdf.png',
    description:
      'A majestic firebird that can be reborn from its ashes when destroyed.',
  },
  {
    id: 18,
    name: 'Void Specter',
    attack: 5,
    health: 6,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739798389/TCG%20Battle%20Adventure/b9aacgyeclbrwqk9zgjn.png',
    description:
      'A ghostly entity from the void between worlds that drains life essence from its victims.',
  },
  {
    id: 19,
    name: 'Golem of Ruin',
    attack: 6,
    health: 8,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739798680/TCG%20Battle%20Adventure/r3i1t2tgftgr3p6fo9i8.png',
    description:
      'A massive construct made from the rubble of fallen civilizations, with impenetrable defenses.',
  },
  {
    id: 20,
    name: 'King of Abyss',
    attack: 8,
    health: 10,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH, Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739797997/TCG%20Battle%20Adventure/wsx7msv8qgeefylwbwv9.png',
    description:
      'The sovereign ruler of the deepest abyss, wielding both earthen might and metallic precision.',
  },
  {
    id: 21,
    name: 'Blazing Sword',
    attack: 5,
    health: 4,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1739797748/TCG%20Battle%20Adventure/jzm1wj6kzrekhu3zq8an.png',
    description:
      'A fiery blade that burns its foes with every critical strike.',
  },
  {
    id: 22,
    name: 'Frost Shield',
    attack: 2,
    health: 8,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049298/TCG%20Battle%20Adventure/r9ahkormzgxdmlfwuj9s.png',
    description:
      'An icy barrier that freezes attackers with a chilling retaliation.',
  },
  {
    id: 23,
    name: 'Venom Dagger',
    attack: 3,
    health: 4,
    maxPerSession: 3,
    staminaCost: 1,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/vgsemseiixtxtyjjfo1v.png',
    description: 'A swift, poisoned blade that saps life with every strike.',
  },
  {
    id: 24,
    name: 'Healing Light',
    attack: 2,
    health: 6,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049289/TCG%20Battle%20Adventure/hwa5oiqezmwdiid5gaci.jpg',
    description:
      'A radiant entity that heals itself by draining vitality from foes.',
  },
  {
    id: 25,
    name: 'Berserker’s Rage',
    attack: 7,
    health: 5,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/bwmtrdybdv8wnz3zycg7.png',
    description:
      'A frenzied warrior that sacrifices health for devastating critical strikes.',
  },
  {
    id: 26,
    name: 'Shadow Step',
    attack: 3,
    health: 5,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.SACRIFICE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049293/TCG%20Battle%20Adventure/vnwlzhguts8rfc7jkhnp.png',
    description:
      'A nimble assassin who sacrifices stamina to evade deadly blows.',
  },
  {
    id: 27,
    name: 'Arcane Blast',
    attack: 6,
    health: 4,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/lm03b601m6xeobc7wczu.png',
    description:
      'A surge of magical energy that delivers a powerful critical hit.',
  },
  {
    id: 28,
    name: 'Stone Wall',
    attack: 2,
    health: 10,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/pmvgcr6abzs1p2d8yarx.png',
    description:
      'An unyielding barrier of stone that retaliates against attackers.',
  },
  {
    id: 29,
    name: 'Fire Elemental',
    attack: 4,
    health: 6,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.FIRE],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049296/TCG%20Battle%20Adventure/re7ggndj9lxailwqsf2y.png',
    description:
      'A living flame that scorches enemies with fiery critical strikes.',
  },
  {
    id: 30,
    name: 'Ice Spear',
    attack: 3,
    health: 5,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049290/TCG%20Battle%20Adventure/ufmrlee4xkdapmpsizuj.png',
    description: 'A frozen lance that freezes foes who dare to strike it.',
  },
  {
    id: 31,
    name: 'Abyss Crawler',
    attack: 6,
    health: 5,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.WOOD],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/aeklge0zyujx8ikxcryz.png',
    description:
      'A venomous creature from the abyss that drains life with each attack.',
  },
  {
    id: 32,
    name: 'Soul Eater',
    attack: 5,
    health: 6,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049292/TCG%20Battle%20Adventure/mlqpln4i9bznjomk7muz.png',
    description:
      'A sinister blade that consumes the souls of its victims to grow stronger.',
  },
  {
    id: 33,
    name: 'Thunder Drake',
    attack: 7,
    health: 6,
    maxPerSession: 1,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL, Class.WATER],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/sgpqtvvxsop5g9x04wa4.png',
    description: 'A majestic beast that unleashes thunderous critical strikes.',
  },
  {
    id: 34,
    name: 'Necro Mage',
    attack: 4,
    health: 7,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/zfna0w9d2ndjyyyjbmph.png',
    description:
      'A dark sorcerer who sacrifices itself to resurrect fallen allies.',
  },
  {
    id: 35,
    name: 'Blood Reaper',
    attack: 8,
    health: 5,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.LIFESTEAL,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049295/TCG%20Battle%20Adventure/qpfcfs8vffnipuicubrn.png',
    description: 'A deadly scythe-wielder that harvests life with every swing.',
  },
  {
    id: 36,
    name: 'Iron Golem',
    attack: 4,
    health: 12,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/wqujynso8o9akodknazz.png',
    description:
      'A towering construct of steel that punishes attackers with its resilience.',
  },
  {
    id: 37,
    name: 'Phantom Blade',
    attack: 6,
    health: 4,
    maxPerSession: 2,
    staminaCost: 2,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/vhdctqr1lot3u202xthg.png',
    description:
      'A ghostly sword that pierces armor with deadly critical strikes.',
  },
  {
    id: 38,
    name: 'Void Warden',
    attack: 5,
    health: 8,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049294/TCG%20Battle%20Adventure/fyhboeidk6dgfaldgbce.png',
    description:
      'A guardian of the void that reflects magical assaults back at its foes.',
  },
  {
    id: 39,
    name: 'Lava Behemoth',
    attack: 9,
    health: 8,
    maxPerSession: 1,
    staminaCost: 4,
    onAttackEffect: OnAttackEffect.CRITICAL_STRIKE,
    onDeadEffect: OnDeadEffect.EXPLODE,
    onDefenseEffect: OnDefenseEffect.NONE,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.FIRE, Class.EARTH],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049291/TCG%20Battle%20Adventure/nonfpunalm20kyfl6jxe.png',
    description:
      'A colossal beast of molten rock that burns and explodes with devastating force.',
  },
  {
    id: 40,
    name: 'Crystal Serpent',
    attack: 4,
    health: 9,
    maxPerSession: 2,
    staminaCost: 3,
    onAttackEffect: OnAttackEffect.NONE,
    onDeadEffect: OnDeadEffect.NONE,
    onDefenseEffect: OnDefenseEffect.THORNS,
    activeSkill: ActiveSkill.NONE,
    classes: [Class.EARTH, Class.METAL],
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740049328/TCG%20Battle%20Adventure/vi2awomtpdu6bwzt9vgg.png',
    description:
      'A shimmering serpent of crystal that reflects damage with its radiant scales.',
  },
];

// Mock data for bosses
const bossData = [
  {
    id: 1,
    name: 'Blazing Titan',
    health: 80,
    attack: 10,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654745/TCG%20Battle%20Adventure/537804e6-d2ea-46cd-824d-3fafc5364b81_wphwqi.png',
    class: ['FIRE', 'EARTH'],
    description:
      'A colossal beast engulfed in flames with a hardened stone shell, unleashing devastating lava eruptions.',
  },
  {
    id: 2,
    name: 'Frost Leviathan',
    health: 90,
    attack: 12,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654745/TCG%20Battle%20Adventure/8c4d5fc2-80ab-4774-9f28-ba9e2f1e95ab_co4o0f.png',
    class: ['WATER', 'METAL'],
    description:
      'A massive sea serpent clad in icy metallic scales, capable of freezing everything in its path.',
  },
  {
    id: 3,
    name: 'Verdant Inferno',
    health: 100,
    attack: 14,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654746/TCG%20Battle%20Adventure/9e0c87bb-75ce-48f7-aea7-e66e42c1a2b8_hnojrc.png',
    class: ['WOOD', 'FIRE'],
    description:
      'A forest creature blending twisted vines with raging flames, dealing widespread fiery destruction.',
  },
  {
    id: 4,
    name: 'Iron Storm Drake',
    health: 85,
    attack: 11,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654744/TCG%20Battle%20Adventure/d2cf6175-9c3d-451c-9761-52881e750068_txlx1q.png',
    class: ['METAL', 'WATER'],
    description:
      'An armored dragon summoning tempests, wielding the combined power of metal and water.',
  },
  {
    id: 5,
    name: 'Ember Root Behemoth',
    health: 95,
    attack: 13,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654745/TCG%20Battle%20Adventure/58847d12-e887-4c85-b2a0-d6e5db4299fb_z4eu5l.png',
    class: ['FIRE', 'WOOD'],
    description:
      'A towering beast with smoldering roots, boasting immense endurance and ferocious attacks.',
  },
  {
    id: 6,
    name: 'Abyssal Stone Lord',
    health: 110,
    attack: 15,
    image:
      'https://res.cloudinary.com/dlotuochc/image/upload/v1740654746/TCG%20Battle%20Adventure/ed0eef71-531b-4dc5-84ab-59ba0b85b8af_le5dx3.png',
    class: ['EARTH', 'METAL'],
    description:
      'A stone lord from the abyss, clad in impenetrable metal armor with earth-shattering strength.',
  },
];

// Helper function to get element icon
function getElementIcon(element: string) {
  switch (element) {
    case 'FIRE':
      return <Flame className="h-5 w-5 text-red-500" />;
    case 'WATER':
      return <Droplet className="h-5 w-5 text-blue-500" />;
    case 'WOOD':
      return <Trees className="h-5 w-5 text-green-500" />;
    case 'EARTH':
      return <Mountain className="h-5 w-5 text-yellow-500" />;
    case 'METAL':
      return <Cog className="h-5 w-5 text-gray-400" />;
    default:
      return null;
  }
}

// Helper function to get element color
function getElementColor(element: string) {
  switch (element) {
    case 'FIRE':
      return 'text-red-500 border-red-900/30';
    case 'WATER':
      return 'text-blue-500 border-blue-900/30';
    case 'WOOD':
      return 'text-green-500 border-green-900/30';
    case 'EARTH':
      return 'text-yellow-500 border-yellow-900/30';
    case 'METAL':
      return 'text-gray-400 border-gray-700/30';
    default:
      return 'text-white border-white/30';
  }
}

// Helper function to get effect description
function getEffectDescription(effect: string) {
  switch (effect) {
    case 'CRITICAL_STRIKE':
      return '30% chance to deal double damage';
    case 'LIFESTEAL':
      return 'Heals for 50% of damage dealt';
    case 'EXPLODE':
      return 'Deals 3 damage when destroyed';
    case 'THORNS':
      return 'Reflects 2 damage when attacked';
    case 'SACRIFICE':
      return 'Can be sacrificed to gain 2 stamina';
    default:
      return 'No special effect';
  }
}

// Card Component
function CardItem({ card }: { card: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/20"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-lg font-bold text-white mb-1">{card.name}</h3>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(card.classes)
              ? card.classes.map((cls: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full"
                  >
                    {getElementIcon(cls)}
                    <span className="text-xs">{cls}</span>
                  </div>
                ))
              : card.class &&
                card.class.map((cls: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full"
                  >
                    {getElementIcon(cls)}
                    <span className="text-xs">{cls}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1 p-2 rounded-lg bg-black/60 border border-red-900/30">
            <Sword className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-400">
              {card.attack}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2 rounded-lg bg-black/60 border border-green-900/30">
            <Heart className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold text-green-400">
              {card.health}
            </span>
          </div>
          <div className="flex items-center gap-1 p-2 rounded-lg bg-black/60 border border-yellow-900/30">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-400">
              {card.staminaCost}
            </span>
          </div>
        </div>

        {/* Effects */}
        <div className="space-y-2">
          {card.onAttackEffect && card.onAttackEffect !== 'NONE' && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-red-900/30">
              <Sword className="w-4 h-4 text-red-500" />
              <div className="text-xs">
                <span className="text-red-400 font-medium">Attack: </span>
                <span className="text-white/70">
                  {getEffectDescription(card.onAttackEffect)}
                </span>
              </div>
            </div>
          )}

          {card.onDefenseEffect && card.onDefenseEffect !== 'NONE' && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-blue-900/30">
              <Shield className="w-4 h-4 text-blue-500" />
              <div className="text-xs">
                <span className="text-blue-400 font-medium">Defense: </span>
                <span className="text-white/70">
                  {getEffectDescription(card.onDefenseEffect)}
                </span>
              </div>
            </div>
          )}

          {card.onDeadEffect && card.onDeadEffect !== 'NONE' && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-purple-900/30">
              <Skull className="w-4 h-4 text-purple-500" />
              <div className="text-xs">
                <span className="text-purple-400 font-medium">Death: </span>
                <span className="text-white/70">
                  {getEffectDescription(card.onDeadEffect)}
                </span>
              </div>
            </div>
          )}

          {card.activeSkill && card.activeSkill !== 'NONE' && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black/60 border border-yellow-900/30">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <div className="text-xs">
                <span className="text-yellow-400 font-medium">Active: </span>
                <span className="text-white/70">
                  {getEffectDescription(card.activeSkill)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {card.description && (
          <div className="p-3 rounded-lg bg-black/60 border border-white/10">
            <p className="text-xs text-white/70">{card.description}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Boss Component
function BossItem({ boss }: { boss: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 border border-white/10 rounded-lg overflow-hidden hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-900/20"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={boss.image}
          alt={boss.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-2">{boss.name}</h3>
          <div className="flex flex-wrap gap-1">
            {boss.class.map((cls: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full"
              >
                {getElementIcon(cls)}
                <span className="text-xs">{cls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-black/60 border border-red-900/30">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-xs text-red-400/80">Health</p>
              <p className="text-lg font-bold text-red-400">{boss.health}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-black/60 border border-orange-900/30">
            <Sword className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-orange-400/80">Attack</p>
              <p className="text-lg font-bold text-orange-400">{boss.attack}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-3 rounded-lg bg-black/60 border border-white/10">
          <p className="text-sm text-white/70">{boss.description}</p>
        </div>

        {/* Element Analysis */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-yellow-400 flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Element Analysis
          </h4>

          {boss.class.map((cls: string, i: number) => (
            <div
              key={i}
              className={`p-3 rounded-lg bg-black/60 border ${getElementColor(
                cls
              )}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {getElementIcon(cls)}
                <h4 className="text-sm font-medium">{cls} Element</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-yellow-400/80 mb-1">Strong Against:</p>
                  <ul className="space-y-1 text-white/60">
                    {getStrongAgainst(cls).map((element, j) => (
                      <li key={j} className="flex items-center gap-1">
                        {getElementIcon(element)}
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-yellow-400/80 mb-1">Weak Against:</p>
                  <ul className="space-y-1 text-white/60">
                    {getWeakAgainst(cls).map((element, j) => (
                      <li key={j} className="flex items-center gap-1">
                        {getElementIcon(element)}
                        <span>{element}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to determine element strengths
function getStrongAgainst(element: string): string[] {
  switch (element) {
    case 'FIRE':
      return ['METAL', 'WOOD'];
    case 'WATER':
      return ['FIRE', 'EARTH'];
    case 'WOOD':
      return ['WATER', 'EARTH'];
    case 'EARTH':
      return ['METAL', 'FIRE'];
    case 'METAL':
      return ['WOOD', 'WATER'];
    default:
      return [];
  }
}

// Helper function to determine element weaknesses
function getWeakAgainst(element: string): string[] {
  switch (element) {
    case 'FIRE':
      return ['WATER', 'EARTH'];
    case 'WATER':
      return ['WOOD', 'METAL'];
    case 'WOOD':
      return ['FIRE', 'METAL'];
    case 'EARTH':
      return ['WOOD', 'WATER'];
    case 'METAL':
      return ['FIRE', 'EARTH'];
    default:
      return [];
  }
}

// Game Mechanics Component
function GameMechanics() {
  return (
    <div className="space-y-8">
      <div className="bg-black/40 border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Game Overview
        </h3>
        <p className="text-white/80 mb-4">
          Realm-of-Cards Adventure is a strategic card game where you build a
          deck of elemental cards and battle against powerful bosses. Each card
          has unique abilities and elemental affinities that interact with each
          other in complex ways.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              Core Gameplay
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Build a deck of 13 cards from the available card pool
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Challenge bosses on the world map with increasing difficulty
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Play cards strategically to defeat bosses before they defeat
                  you
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Unlock new cards and bosses as you progress</span>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              Key Features
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Five elemental types with unique strengths and weaknesses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Special card effects that trigger on attack, defense, or death
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Strategic deck building with card limits</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Challenging boss battles with unique mechanics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <Scroll className="w-5 h-5" />
          Game Flow
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              1. Deck Building
            </h4>
            <p className="text-white/70 mb-2">
              Before entering battle, you must build a deck of 13 cards. Each
              card has a limit on how many copies you can include in your deck.
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Choose from pre-built decks or create your own custom deck
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Balance your deck with different card types and elemental
                  affinities
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Consider stamina costs when building your deck</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              2. Map Navigation
            </h4>
            <p className="text-white/70 mb-2">
              After building your deck, you'll navigate the world map to select
              a boss to challenge.
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Each boss has unique elemental affinities and abilities
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Study boss weaknesses and build decks to exploit them
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Bosses increase in difficulty as you progress</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              3. Battle Phase
            </h4>
            <p className="text-white/70 mb-2">
              During battle, you and the boss take turns playing cards and
              attacking.
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Draw cards from your deck at the start of your turn</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Play cards by spending stamina</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Cards on the field automatically attack the boss</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  The boss will attack your cards or you directly if you have no
                  cards
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>End your turn to draw a new card</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              4. Victory Conditions
            </h4>
            <p className="text-white/70 mb-2">
              The battle ends when either you or the boss is defeated.
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Reduce the boss's health to 0 to win</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>If your health reaches 0, you lose</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Winning unlocks new bosses and rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Card Mechanics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-black/60 border border-red-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-red-400 mb-2 flex items-center gap-2">
              <Sword className="w-4 h-4" />
              Attack Effects
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-red-400" />
                <div>
                  <span className="font-medium text-red-400">
                    Critical Strike:{' '}
                  </span>
                  <span>30% chance to deal double damage to the target</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-red-400" />
                <div>
                  <span className="font-medium text-red-400">Lifesteal: </span>
                  <span>Heals the player for 50% of the damage dealt</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-blue-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-blue-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Defense Effects
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-blue-400" />
                <div>
                  <span className="font-medium text-blue-400">Thorns: </span>
                  <span>
                    Reflects 2 damage back to the attacker when attacked
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-purple-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-purple-400 mb-2 flex items-center gap-2">
              <Skull className="w-4 h-4" />
              Death Effects
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-purple-400" />
                <div>
                  <span className="font-medium text-purple-400">Explode: </span>
                  <span>
                    Deals 3 damage to the enemy when the card is destroyed
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-yellow-900/30 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Active Skills
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <div>
                  <span className="font-medium text-yellow-400">
                    Sacrifice:{' '}
                  </span>
                  <span>Card can be sacrificed to gain 2 stamina</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
          <h4 className="text-lg font-medium text-yellow-400 mb-2">
            Element Interactions
          </h4>
          <p className="text-white/70 mb-3">
            Each card belongs to one or more elemental types, which have
            strengths and weaknesses against other elements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-sm">
            <div className="bg-black/40 border border-red-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-red-500" />
                <span className="font-medium text-red-400">Fire</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Wood, Metal</p>
              <p className="text-white/70 text-xs">Weak vs: Water, Earth</p>
            </div>

            <div className="bg-black/40 border border-blue-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-400">Water</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Fire, Earth</p>
              <p className="text-white/70 text-xs">Weak vs: Wood, Metal</p>
            </div>

            <div className="bg-black/40 border border-green-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Trees className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-400">Wood</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Water, Earth</p>
              <p className="text-white/70 text-xs">Weak vs: Fire, Metal</p>
            </div>

            <div className="bg-black/40 border border-yellow-900/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Mountain className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-yellow-400">Earth</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Metal, Fire</p>
              <p className="text-white/70 text-xs">Weak vs: Wood, Water</p>
            </div>

            <div className="bg-black/40 border border-gray-700/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Cog className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-400">Metal</span>
              </div>
              <p className="text-white/70 text-xs">Strong vs: Wood, Water</p>
              <p className="text-white/70 text-xs">Weak vs: Earth, Fire</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          Strategy Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              Deck Building
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Balance your deck with different card types and elemental
                  effects
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Consider stamina costs when building your deck</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Include cards with complementary effects</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Adapt your deck to counter specific boss elements</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-black/60 border border-white/10 rounded-lg">
            <h4 className="text-lg font-medium text-yellow-400 mb-2">
              Battle Tactics
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Use defensive cards to protect against boss attacks</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>
                  Save high-damage cards for when the boss is vulnerable
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Manage your stamina efficiently</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 bg-yellow-400" />
                <span>Consider the order in which you play cards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState(cardData);
  const [filteredBosses, setFilteredBosses] = useState(bossData);
  const [elementFilter, setElementFilter] = useState<string | null>(null);

  // Filter cards based on search term and element filter
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    const filtered = cardData.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(term.toLowerCase()) ||
        card.description.toLowerCase().includes(term.toLowerCase());

      const matchesElement = elementFilter
        ? Array.isArray(card.classes)
          ? card.classes.includes(elementFilter as Class)
          : false
        : true;

      return matchesSearch && matchesElement;
    });

    setFilteredCards(filtered);

    const filteredBoss = bossData.filter(
      (boss) =>
        boss.name.toLowerCase().includes(term.toLowerCase()) ||
        boss.description.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredBosses(filteredBoss);
  };

  // Filter cards by element
  const handleElementFilter = (element: string | null) => {
    setElementFilter(element === elementFilter ? null : element);

    const filtered = cardData.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesElement =
        element && element !== elementFilter
          ? Array.isArray(card.classes)
            ? card.classes.includes(element as Class)
            : false
          : true;

      return matchesSearch && matchesElement;
    });

    setFilteredCards(filtered);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <SectionHighlight
        containerClassName="py-20 min-h-screen"
        dotColor="rgb(255, 255, 255)"
        dotOpacity="0.15"
        glowColor="rgba(255, 255, 255, 0.05)"
      >
        <div className="container mx-auto px-4 pt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                Realm-of-Cards Adventure Wiki
              </h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Your comprehensive guide to cards, bosses, and game mechanics
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search cards, bosses, or mechanics..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
              </div>
            </div>

            {/* Element Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'bg-black/40 border-white/20 text-white hover:bg-red-900/20',
                  elementFilter === 'FIRE' &&
                    'bg-red-900/20 border-red-400/50 text-red-400'
                )}
                onClick={() => handleElementFilter('FIRE')}
              >
                <Flame className="w-4 h-4 mr-2" />
                Fire
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'bg-black/40 border-white/20 text-white hover:bg-blue-900/20',
                  elementFilter === 'WATER' &&
                    'bg-blue-900/20 border-blue-400/50 text-blue-400'
                )}
                onClick={() => handleElementFilter('WATER')}
              >
                <Droplet className="w-4 h-4 mr-2" />
                Water
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'bg-black/40 border-white/20 text-white hover:bg-green-900/20',
                  elementFilter === 'WOOD' &&
                    'bg-green-900/20 border-green-400/50 text-green-400'
                )}
                onClick={() => handleElementFilter('WOOD')}
              >
                <Trees className="w-4 h-4 mr-2" />
                Wood
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'bg-black/40 border-white/20 text-white hover:bg-yellow-900/20',
                  elementFilter === 'EARTH' &&
                    'bg-yellow-900/20 border-yellow-400/50 text-yellow-400'
                )}
                onClick={() => handleElementFilter('EARTH')}
              >
                <Mountain className="w-4 h-4 mr-2" />
                Earth
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  'bg-black/40 border-white/20 text-white hover:bg-gray-700/20',
                  elementFilter === 'METAL' &&
                    'bg-gray-700/20 border-gray-400/50 text-gray-400'
                )}
                onClick={() => handleElementFilter('METAL')}
              >
                <Cog className="w-4 h-4 mr-2" />
                Metal
              </Button>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="cards" className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8 bg-gradient-to-r from-slate-600 to-slate-800/90 p-1 rounded-lg">
                <TabsTrigger
                  value="cards"
                  className="text-amber-100 data-[state=active]:bg-gradient-to-r from-amber-500 to-yellow-600 data-[state=active]:text-white rounded-md transition-all duration-300 hover:bg-amber-700/30"
                >
                  Cards
                </TabsTrigger>
                <TabsTrigger
                  value="bosses"
                  className="text-amber-100 data-[state=active]:bg-gradient-to-r from-amber-500 to-yellow-600 data-[state=active]:text-white rounded-md transition-all duration-300 hover:bg-amber-700/30"
                >
                  Bosses
                </TabsTrigger>
                <TabsTrigger
                  value="mechanics"
                  className="text-amber-100 data-[state=active]:bg-gradient-to-r from-amber-500 to-yellow-600 data-[state=active]:text-white rounded-md transition-all duration-300 hover:bg-amber-700/30"
                >
                  Game Mechanics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cards">
                {filteredCards.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredCards.map((card) => (
                      <CardItem key={card.id} card={card} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/70">
                      No cards found matching your search criteria.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bosses">
                {filteredBosses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredBosses.map((boss) => (
                      <BossItem key={boss.id} boss={boss} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/70">
                      No bosses found matching your search criteria.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="mechanics">
                <GameMechanics />
              </TabsContent>
            </Tabs>

            {/* Back to Game Button */}
            <div className="mt-12 text-center">
              <Link href="/">
                <Button className="bg-yellow-900/90 hover:bg-yellow-800 text-yellow-400 px-6 py-2">
                  Back to Game
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionHighlight>
    </div>
  );
}
