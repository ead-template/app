'use client';
import React from 'react';
import ProtectedLayout from '@/components/layout/DefaultLayout.jsx';
import ListaAulas from '@/components/aula/ListaAulas.jsx';
import Content from '@/components/content/Content.jsx';

/**
 * Componente representando a página inicial.
 *
 * @return {React.Component} Retorna o componente da página inicial.
 */
export default function Home() {
  return (
    <main>
      <ProtectedLayout>
        <Content title="Home">
          <ListaAulas />
        </Content>
      </ProtectedLayout>
    </main>
  );
}
