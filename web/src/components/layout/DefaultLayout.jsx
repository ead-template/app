'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../header/Header.jsx';
import SidebarComponent from '../sidebar/Sidebar.jsx';
import { ContentWrapper, LayoutWrapper, SidebarWrapper } from './style.jsx';
import PropTypes from 'prop-types';
import { useLoginCheck } from '@/hocs/UseLoginCheck';
import { useMediaQuery } from 'react-responsive';
import ChaskiqScrip from '../chat/ChaskiqScrip';

const DefaultLayout = ({ children }) => {
  useLoginCheck();
  const sidebarVisible = useSelector((state) => state.sidebar.visible);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      <Header />
      <LayoutWrapper>
        <SidebarWrapper
          visible={sidebarVisible.toString()}
          isMobile={isMobile.toString()}
        >
          <SidebarComponent />
        </SidebarWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </LayoutWrapper>

      <ChaskiqScrip />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout; // Envolvendo o componente com o HOC
