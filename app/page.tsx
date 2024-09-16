'use client';

import { Home } from '../components/Home/Home';
import { BaseLayout } from '@/components/PageLayout/BaseLayout';
import { useState, useEffect } from 'react';
import { BackgroundImg } from '@/components/BackgroundImg/BackgroundImg';
import { Stake } from '@/components/Stake/Stake';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'stake dapp',
  projectId: 'eb81d16feac269f5aa9e14a0c67c73de',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function HomePage() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            locale="en"
            theme={lightTheme({
              accentColor: '#B0A6EE',
              accentColorForeground: 'white',
              borderRadius: 'large',
              fontStack: 'system',
            })}
          >
            <Stake />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
