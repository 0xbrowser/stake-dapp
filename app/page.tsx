'use client';

import { Stake } from '@/components/Stake/Stake';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'stake dapp',
  projectId: 'eb81d16feac269f5aa9e14a0c67c73de',
  chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/29e3a8fb21de47e3915cca2a8d875a84'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/29e3a8fb21de47e3915cca2a8d875a84'),
  },
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
