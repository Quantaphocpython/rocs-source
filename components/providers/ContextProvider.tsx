'use client'; // 🔥 Quan trọng khi dùng Next.js App Router

import React, { ReactNode } from 'react';
import { InjectedConnector } from 'starknetkit/injected';
import {
  ArgentMobileConnector,
  isInArgentMobileAppBrowser,
} from 'starknetkit/argentMobile';
import { WebWalletConnector } from 'starknetkit/webwallet';
import { mainnet, sepolia } from '@starknet-react/chains';
import { StarknetConfig, publicProvider } from '@starknet-react/core';

type Props = {
  children: ReactNode;
};

export default function ContextProvider({ children }: Props) {
  const chains = [mainnet, sepolia];

  const connectors = React.useMemo(() => {
    // Kiểm tra có đang chạy trên browser hay không để tránh lỗi SSR
    if (typeof window === 'undefined') return [];

    return isInArgentMobileAppBrowser()
      ? [
          ArgentMobileConnector.init({
            options: {
              dappName: process.env.NEXT_PUBLIC_APP_NAME ?? '',
              projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
            },
            inAppBrowserOptions: {},
          }),
        ]
      : [
          new InjectedConnector({
            options: { id: 'braavos', name: 'Braavos' },
          }),
          new InjectedConnector({
            options: { id: 'argentX', name: 'Argent X' },
          }),
          new WebWalletConnector({ url: 'https://web.argent.xyz' }),
          ArgentMobileConnector.init({
            options: {
              dappName: 'Example dapp',
              projectId: 'example-project-id',
            },
          }),
        ];
  }, []);

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors}
    >
      {children}
    </StarknetConfig>
  );
}
