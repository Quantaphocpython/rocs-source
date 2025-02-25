'use client';

import CustomAvatar from '@/components/users/CustomAvatar';

import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import walletConfig, { network } from '../configs/WalletConfig';
import {
  createHappyChainWagmiConfig,
  happyChainSepolia,
} from '@happy.tech/core';
import { HappyWalletProvider } from '@happy.tech/react';

const config = createHappyChainWagmiConfig(happyChainSepolia);

const queryClient = new QueryClient();

type Props = React.ReactNode;

export default function ContextProvider({ children }: { children: Props }) {
  const [mounted, setMounted] = React.useState(false);
  const { theme } = useTheme();
  const [rainbowKitTheme, setRainbowKitTheme] = useState(
    darkTheme({
      accentColor: '#ff8800',
      accentColorForeground: 'white',
      borderRadius: 'none',
    })
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const newTheme =
      theme === 'dark'
        ? darkTheme({
            accentColor: '#ff8800',
            accentColorForeground: 'white',
            borderRadius: 'none',
          })
        : lightTheme({
            accentColor: '#ff8800',
            accentColorForeground: 'white',
            borderRadius: 'none',
          });
    setRainbowKitTheme(newTheme);
  }, [theme]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider
          initialChain={network}
          showRecentTransactions={true}
          theme={rainbowKitTheme}
          avatar={CustomAvatar}
          locale="en-US"
        >
          {mounted && children}
        </RainbowKitProvider> */}
        <HappyWalletProvider>{children}</HappyWalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
