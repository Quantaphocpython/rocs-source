'use client';

import {
  createHappyChainWagmiConfig,
  happyChainSepolia,
} from '@happy.tech/core';
import { HappyWalletProvider } from '@happy.tech/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { WagmiProvider } from 'wagmi';

const config = createHappyChainWagmiConfig(happyChainSepolia);

const queryClient = new QueryClient();

type Props = React.ReactNode;

export default function ContextProvider({ children }: { children: Props }) {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <RainbowKitProvider
          initialChain={happyChainSepolia}
          showRecentTransactions={true}
          theme={rainbowKitTheme}
          avatar={CustomAvatar}
          locale="en-US"
        >
          {mounted && children} */}
        <HappyWalletProvider>{mounted && children}</HappyWalletProvider>
        {/* </RainbowKitProvider> */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
