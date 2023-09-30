'use client';
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import PerfilPage from '@/components/profile/ProfileContent.jsx';
import SecurityContent from '@/components/profile/SecurityContent.jsx';
import ProtectedLayout from '@/components/layout/DefaultLayout.jsx';

const ProfilePage = () => {
  const items = [
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-user',
      command: (e) => {
        setCurrentPage('profile');
      },
    },
    {
      label: 'Segurança',
      icon: 'pi pi-fw pi-lock',
      command: (e) => {
        setCurrentPage('security');
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState('profile');

  return (
    <>
      <head>
        <title>Ariflix - Perfil</title>
        <link rel="canonical" href="https://ariflix.app.br/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            name: 'Profile Page',
            description: 'This page allows the user to edit their profile.',
            url: 'https://ariflix.app.br/login',
          })}
        </script>
      </head>
      <ProtectedLayout>
        <TabMenu model={items} />

        {currentPage === 'profile' && <PerfilPage />}

        {currentPage === 'security' && <SecurityContent />}
      </ProtectedLayout>
    </>
  );
};

export default ProfilePage;
