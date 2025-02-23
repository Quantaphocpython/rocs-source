"use client";

import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

const TUTORIAL_STEPS = [
  {
    element: '#player-stats',
    popover: {
      title: '💫 Player Stats',
      description: `
        <div class="space-y-2">
          <p>Monitor your vital stats:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li><span class="text-red-400">Health Points (HP)</span> - Stay above 0 to survive</li>
            <li><span class="text-yellow-400">Stamina</span> - Required to play cards</li>
            <li>Gain 1 stamina at the start of your turn</li>
          </ul>
        </div>
      `,
      side: "right",
      align: 'start'
    }
  },
  {
    element: '#monster-stats',
    popover: {
      title: '👿 Monster Stats',
      description: `
        <div class="space-y-2">
          <p>Know your enemy:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li><span class="text-red-400">Monster HP</span> - Reduce to 0 to win</li>
            <li><span class="text-orange-400">Attack Power</span> - Damage dealt to your cards</li>
            <li>Monster can use special abilities like Lifesteal and Critical Hits</li>
          </ul>
        </div>
      `,
      side: "left",
      align: 'start'
    }
  },
  {
    element: '#battle-field',
    popover: {
      title: '⚔️ Battle Field',
      description: `
        <div class="space-y-2">
          <p>Your cards fight here:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>Place cards in empty slots</li>
            <li>Cards automatically attack the monster each turn</li>
            <li>Monster will attack your cards first</li>
            <li>If no cards are on field, monster attacks you directly</li>
          </ul>
        </div>
      `,
      side: "bottom",
      align: 'center'
    }
  },
  {
    element: '#player-hand',
    popover: {
      title: '🎴 Your Hand',
      description: `
        <div class="space-y-2">
          <p>Manage your cards:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>Click a card to select it</li>
            <li>Click an empty field slot to play it</li>
            <li>Right-click cards to view details</li>
            <li>Draw a new card when ending your turn</li>
          </ul>
        </div>
      `,
      side: "top",
      align: 'center'
    }
  },
  {
    element: '#battle-log',
    popover: {
      title: '📜 Battle Log',
      description: `
        <div class="space-y-2">
          <p>Track the battle:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>View recent actions and effects</li>
            <li>Monitor damage dealt and received</li>
            <li>See triggered special abilities</li>
            <li>Keep track of HP changes</li>
          </ul>
        </div>
      `,
      side: "right",
      align: 'start'
    }
  },
  {
    element: '#action-buttons',
    popover: {
      title: '⚡ Action Buttons',
      description: `
        <div class="space-y-2">
          <p>Control the game flow:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li><span class="text-yellow-400">Play Card</span> - Place selected card on field</li>
            <li><span class="text-yellow-400">End Turn</span> - Finish your turn and draw</li>
            <li>Monster takes its turn after you end yours</li>
          </ul>
        </div>
      `,
      side: "top",
      align: 'end'
    }
  }
];

// Custom styles for driver.js
const CUSTOM_STYLES = `
  .driver-popover {
    background: rgba(0, 0, 0, 0.95) !important;
    border: 2px solid #854d0e !important;
    border-radius: 12px !important;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5) !important;
    backdrop-filter: blur(12px) !important;
  }

  .driver-popover-title {
    color: #facc15 !important;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
    padding: 16px 24px !important;
    border-bottom: 1px solid #854d0e !important;
  }

  .driver-popover-description {
    color: #fef3c7 !important;
    font-size: 0.95rem !important;
    line-height: 1.5 !important;
    padding: 16px 24px !important;
  }

  .driver-popover-footer {
    border-top: 1px solid #854d0e !important;
    padding: 12px !important;
  }

  .driver-popover-progress-text {
    color: #facc15 !important;
  }

  .driver-popover-prev-btn,
  .driver-popover-next-btn,
  .driver-popover-done-btn {
    background: #854d0e !important;
    color: #facc15 !important;
    border: 1px solid #facc15 !important;
    padding: 8px 16px !important;
    border-radius: 6px !important;
    font-weight: 500 !important;
    transition: all 0.2s !important;
  }

  .driver-popover-prev-btn:hover,
  .driver-popover-next-btn:hover,
  .driver-popover-done-btn:hover {
    background: #713f12 !important;
    transform: translateY(-1px) !important;
  }

  .driver-popover-close-btn {
    color: #facc15 !important;
    opacity: 0.7 !important;
    transition: opacity 0.2s !important;
  }

  .driver-popover-close-btn:hover {
    opacity: 1 !important;
  }

  .driver-overlay {
    background: rgba(0, 0, 0, 0.7) !important;
    backdrop-filter: blur(4px) !important;
  }

  .driver-highlighted-element {
    border: 2px solid #facc15 !important;
    border-radius: 8px !important;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.3) !important;
  }
`;

export function GameTutorial() {
  const [driverObj, setDriverObj] = useState<any>(null);

  useEffect(() => {
    // Add custom styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = CUSTOM_STYLES;
    document.head.appendChild(styleSheet);

    const driverInstance = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayClickNext: false,
      stagePadding: 10,
      steps: TUTORIAL_STEPS,
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Got it!',
      onDestroyed: () => {
        localStorage.setItem('tutorial-completed', 'true');
      },
      onHighlighted: (element) => {
        element.style.transition = 'all 0.3s ease-in-out';
        element.style.transform = 'scale(1.05)';
      },
      onDeselected: (element) => {
        if (element) {
          element.style.transform = 'scale(1)';
        }
      }
    });

    setDriverObj(driverInstance);

    // Only show tutorial if it hasn't been completed before
    if (!localStorage.getItem('tutorial-completed')) {
      driverInstance.drive();
    }

    return () => {
      driverInstance.destroy();
      document.head.removeChild(styleSheet);
    };
  }, []);

  return null;
}