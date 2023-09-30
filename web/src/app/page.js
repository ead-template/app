'use client';
import React from 'react';
import ProtectedLayout from '@/components/layout/DefaultLayout.jsx';
import ListaAulas from '@/components/aula/ListaAulas.jsx';
import Content from '@/components/content/Content.jsx';
import Head from 'next/head';

/**
 * Componente representando a página inicial.
 *
 * @return {React.Component} Retorna o componente da página inicial.
 */
export default function Home() {
  return (
    <>
      <Head>
        <title>Ariflix</title>
        <link rel="canonical" href="https://ariflix.app.br/" />
      </Head>
      <main>
        <ProtectedLayout>
          <Content title="Home">
            <ListaAulas />
          </Content>
        </ProtectedLayout>
      </main>
    </>
  );
}
