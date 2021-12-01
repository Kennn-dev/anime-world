import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import '../styles/main.css';
import NextNProgress from 'nextjs-progressbar';

import React from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <NextNProgress
      color="#f14445"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
