// AulaDescricao.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { TabView, TabPanel } from 'primereact/tabview';
import { useMediaQuery } from 'react-responsive';
import Avaliacoes from '../feedback/Avaliacoes';

/*
 * AulaDescricao component to display description and video.
 *
 * @param {string} descricao - The description of the lesson.
 * @param {string} videoUrl - The URL of the video to be played.
 * @param {string} texto - The text to be displayed, it can include HTML content.
 */
const AulaDescricao = ({ videoUrl, texto, contentList }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <TabView>
      <TabPanel header="Visão Geral">
        <h4>Descrição</h4>
        {videoUrl && <video controls width="100%" src={videoUrl}></video>}

        <div dangerouslySetInnerHTML={{ __html: texto }} />
      </TabPanel>
      {isMobile && <TabPanel header="Conteúdos">{contentList}</TabPanel>}

      <TabPanel header="Avaliações">
        <Avaliacoes />
      </TabPanel>

      {/* Você pode adicionar outros TabPanels aqui conforme necessidade */}
    </TabView>
  );
};

// Define PropTypes for the AulaDescricao component
AulaDescricao.propTypes = {
  videoUrl: PropTypes.string,
  texto: PropTypes.string,
  contentList: PropTypes.node,
};

export default AulaDescricao;
