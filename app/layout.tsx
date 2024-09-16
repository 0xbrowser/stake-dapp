import './layout.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Analytics } from '@vercel/analytics/react';

import EthereumProvider from '@/components/EthereumProvider/EthereumProvider';

export const metadata = {
  title: 'Spiralism',
  description: 'Dapp for protocol',
};

const theme = createTheme({
  colors: {
    // override dark colors to change them for all components
    dark: [
      '#f8f8f9',
      '#acaebf',
      '#8c8fa3',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#393550',
      '#3F3B59',
      '#0c0d21',
      '#01010a',
    ],
  },
  fontFamily: 'Noto Sans Mono, monospace',
});

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/Logo.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <EthereumProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Notifications />
            {children}
            <Analytics />
          </MantineProvider>
        </EthereumProvider>
      </body>
    </html>
  );
}
