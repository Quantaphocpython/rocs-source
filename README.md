# Realm of Cards - Frontend
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/WeTranscend-labs/FE-Realm-of-Cards/actions) [![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](https://github.com/WeTranscend-labs/FE-Realm-of-Cards/releases) [![HappyChain](https://img.shields.io/badge/Blockchain-HappyChain-yellow.svg)](https://happy-testnet-sepolia.hub.caldera.xyz/)

  

Welcome to the thrilling universe of **Realm of Cards - Frontend**! This is your gateway to an electrifying blockchain-powered trading card game (TCG) adventure. Whether you're a seasoned deck-builder or a newcomer ready to dive into epic battles, this frontend brings the **Realm of Cards** to life with style, speed, and a touch of magic. Here’s everything you need to know about this project! ⚔️🎴

----------

## 📜 Table of Contents

- [🌟 What is Realm of Cards - Frontend?](#what-is-realm-of-cards---frontend)
- [🚀 How to Get Started](#how-to-get-started)
  - [🛠️ Prerequisites](#prerequisites)
  - [⚙️ Installation](#installation)
- [💻 Technologies Powering the Realm](#technologies-powering-the-realm)
- [🗂️ Project Structure](#project-structure)
- [🤝 How to Contribute](#how-to-contribute)
- [📜 License](#license)

  

----------

## 🌟 What is Realm of Cards - Frontend? 

  

**Realm of Cards - Frontend** is the beating heart of a turn-based card game built on the **HappyChain** blockchain. Imagine a wild arena where you craft decks from 40 unique cards, face off against fearsome monsters, and track your victories—all powered by cutting-edge web technology and blockchain wizardry. With a sleek, real-time interface, this frontend lets you:

-   Build killer decks with flair 🎨
  
-   Battle monstrous foes in pulse-pounding showdowns 🐉
  
-   Manage on-chain assets like a pro 🧙‍♂️
  
-   Experience seamless gameplay tied to the **HappyChain Testnet** ✨
  
It’s card combat cranked up to eleven—perfect for strategists and blockchain enthusiasts alike!

----------

## 🚀 How to Get Started

Ready to jump into the action? Follow these steps to set up the **Realm of Cards - Frontend** on your own machine and start slinging cards! 🎮

### 🛠️ Prerequisites
Before you begin, make sure you have:

-   **Node.js**: Version 16 or higher—your engine for this epic quest.
  
-   **npm or yarn**: Your tool of choice to summon dependencies.
  
-   **Web Browser**: Chrome, Firefox, or any browser that’s ready to roll!

### ⚙️Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WeTranscend-labs/FE-Realm-of-Cards.git
   cd FE-Realm-of-Cards
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NEXT_PUBLIC_APP_NAME=<your-app-name>
	 NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=<your-wallet-connect-priject-id>
	 NEXT_PUBLIC_CONTRACT_ADDRESS=<your-contract-address>
     ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5.  **Enter the Realm**:  

-   Open your browser and head to http://localhost:3000.
  
-   Relax, grab a snack, and watch the card-battling magic unfold! 🍕✨

----------

## 💻 Technologies Powering the Realm

This frontend is forged with a powerful mix of modern tools and libraries, blending seamless gameplay with blockchain integration. Here’s the tech stack fueling the adventure:

  

-   **Next.js**: Lightning-fast React framework with server-side rendering (SSR) and static site generation (SSG) for smooth performance. ⚡
  
-   **React**: Dynamic, responsive UI magic for deck-building and battles. 🪄
  
-   **TypeScript**: Rock-solid code with static typing to keep bugs at bay. 🗡️
  
-   **Tailwind CSS**: Stunning, responsive designs crafted in a flash. 🌪️
  
-   **Radix UI**: Accessible, polished components for dialogs, tooltips, and more. 🛠️
  
-   **Viem & Ethers.js**: Blockchain connectivity for wallets, transactions, and smart contracts. 🔐
  
-   **HappyChain SDK**: Gas sponsorship and session keys for a frictionless blockchain experience. ✨
  

Together, these tools create a slick, immersive frontend tied to the **HappyChain Testnet**—ready for card-slinging chaos! 🃏💥

----------

## 🗂️ Project Structure

```
.
├── app/                      # Contains the main application logic, routing, and page components for the game
├── components/               # Reusable UI components, such as card displays, battle interfaces, and modals
├── constants/                # Static values like card effects, game rules, or HappyChain configurations
├── contracts/                # Smart contract ABIs or interfaces for interacting with HappyChain on-chain logic
├── hooks/                    # Custom React hooks for managing game state, blockchain interactions, and UI logic
├── lib/                      # Utility libraries and functions
├── styles/                   # Global and component-specific CSS/SCSS/Tailwind styles for the game’s design
├── types/                    # TypeScript type definitions for cards, game states, and blockchain data
├── utils/                    # Helper functions for gameplay mechanics, data formatting, or blockchain utilities
└── .env                      # Environment configuration file storing sensitive keys 
```
----------

## 🤝 How to Contribute

Want to join the adventure? We’d love your help! Fork the repository, make some epic changes, and send us a pull request. Whether it’s fixing bugs, adding features, or tweaking the UI, every contribution makes the **Realm of Cards** even more legendary! 🧙‍♂️⚡


----------

## 📜 License

  

The **Realm of Cards - Frontend** is released under the **MIT License**. Feel free to explore, modify, and share—just check the [LICENSE](./LICENSE) file for details.
