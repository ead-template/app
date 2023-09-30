import React from 'react';
import { Menu } from 'primereact/menu';
import { SidebarWrapper } from './style.jsx';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Sidebar } from 'primereact/sidebar';
import { closeSidebar } from '@/store/sidebar/sidebarActions.jsx';

/*
 * SidebarComponent - Um componente de barra lateral para navegação.
 * Utiliza o Menu da PrimeReact para exibir os itens de navegação.
 *
 * @return {React.Component} Retorna o componente SidebarWrapper se o estado 'visible' for verdadeiro.
 */
const SidebarComponent = () => {
  const router = useRouter();
  const visible = useSelector((state) => state.sidebar.visible);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const dispatch = useDispatch();

  const items = [
    {
      label: 'Início',
      icon: 'pi pi-fw pi-home',
      command: () => {
        router.push('/');
        if (isMobile) {
          dispatch(closeSidebar());
        }
      },
    },
    // {
    //   label: 'Aulas',
    //   icon: 'pi pi-fw pi-book',
    //   command: () => {
    //     navigate('/aula')
    //   },
    // },
    {
      label: 'Perfil',
      icon: 'pi pi-fw pi-user',
      command: () => {
        router.push('/perfil');
        if (isMobile) {
          dispatch(closeSidebar());
        }
      },
    },

    // Adicione mais itens conforme necessário
  ];

  if (!visible) return null;

  const content = (
    <div className="p-sidebar-content">
      <Menu model={items} />
    </div>
  );

  return isMobile ? (
    <Sidebar
      visible={visible}
      onHide={() => {
        dispatch(closeSidebar());
      }}
    >
      {content}
    </Sidebar>
  ) : (
    <SidebarWrapper visible={visible.toString()}>{content}</SidebarWrapper>
  );
};

export default SidebarComponent;
