"use client";

import { useState, useEffect } from "react";
import type { Card, PrebuiltDeck } from "@/types/game";

const DECK_STORAGE_KEY = "tcg-battle-deck";
const DECK_INFO_KEY = "tcg-deck-info";

interface SavedDeckInfo {
  id: string;
  name: string;
  description: string;
  coverImage: string;
}

// Helper function to safely get initial data
function getInitialData() {
  if (typeof window === "undefined") return { deck: null, info: null };

  try {
    const storedDeck = localStorage.getItem(DECK_STORAGE_KEY);
    const storedInfo = localStorage.getItem(DECK_INFO_KEY);

    return {
      deck: storedDeck ? JSON.parse(storedDeck) : null,
      info: storedInfo ? JSON.parse(storedInfo) : null,
    };
  } catch (error) {
    console.error("Error loading initial deck data:", error);
    return { deck: null, info: null };
  }
}

export function useDeck() {
  // Initialize with data from localStorage immediately
  const [{ savedDeck, deckInfo }, setState] = useState(() => {
    const { deck, info } = getInitialData();
    return {
      savedDeck: deck as Card[] | null,
      deckInfo: info as SavedDeckInfo | null,
    };
  });

  const saveDeck = (deck: PrebuiltDeck) => {
    try {
      // Save deck cards
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck.cards));

      // Save deck info
      const info: SavedDeckInfo = {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        coverImage: deck.coverImage,
      };
      localStorage.setItem(DECK_INFO_KEY, JSON.stringify(info));

      // Update state
      setState({
        savedDeck: deck.cards,
        deckInfo: info,
      });
    } catch (error) {
      console.error("Error saving deck:", error);
      throw new Error("Failed to save deck");
    }
  };

  const clearDeck = () => {
    try {
      localStorage.removeItem(DECK_STORAGE_KEY);
      localStorage.removeItem(DECK_INFO_KEY);
      setState({
        savedDeck: null,
        deckInfo: null,
      });
    } catch (error) {
      console.error("Error clearing deck:", error);
    }
  };

  return {
    savedDeck,
    deckInfo,
    saveDeck,
    clearDeck,
  };
}
