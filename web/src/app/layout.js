'use client';
import './globals.css';
import Head from 'next/head';
import React from 'react';
import { Providers } from '@/app/provider';
import * as Sentry from '@sentry/react';
import Script from 'next/script';
import PropTypes from 'prop-types';

// Configuração do Sentry
Sentry.init({
  dsn: 'https://a45fa76a0897a4b5212e5f0010d3f379@o4505731203923968.ingest.sentry.io/4505731205758976',
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', 'https://ariflix.app.br/'],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

/**
 * Renders the root layout for the application.
 *
 * @param {Object} children - The child components to be rendered.
 * @return {JSX.Element} The root layout component.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <head>
        <link
          id="theme-css"
          href={`/assets/css/theme-dark.css`}
          rel="stylesheet"
        ></link>
        <link rel="manifest" href="/manifest.json" />
        <title>Ariflix</title>
        <link rel="canonical" href="https://ariflix.app.br/" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Explore cursos de medicina de alta qualidade e totalmente credenciados, desenvolvidos por profissionais de saúde renomados. Acesse nosso EAD e avance em sua carreira médica com flexibilidade e suporte personalizado."
        />
        <meta
          name="keywords"
          content="medicina, cursos, credenciados, profissionais de saúde, EAD, carreira médica, flexibilidade, suporte personalizado"
        />
        <meta name="author" content="Ariflix" />
        <meta property="og:title" content="Ariflix" />
        <meta
          property="og:description"
          content="Explore cursos de medicina de alta qualidade e totalmente credenciados, desenvolvidos por profissionais de saúde renomados. Acesse nosso EAD e avance em sua carreira médica com flexibilidade e suporte personalizado."
        />
        <meta property="og:url" content="https://ariflix.app.br/" />
        <meta property="og:image" content="/logo_1200x630.jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ariflix" />
      </head>
      <Script id="pwa" strategy="afterInteractive">
        {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    // Registro bem-sucedido
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    // Registro falhou
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-X8R1B66JG4"
        strategy="afterInteractive"
      />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-X8R1B66JG4');
                `}
      </Script>

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
