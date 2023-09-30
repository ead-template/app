import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import YouTubeVideo from '../video/YouTubeVideo.jsx';
import { useDispatch } from 'react-redux';
import { marcarProgresso } from '@/store/AulaSlice.jsx';
import dynamic from 'next/dynamic';
import { buscarAulasPorAluno } from '@/store/inscricaoSlice';

const DynamicPDFViewer = dynamic(() => import('../pdf/PDFViewer.jsx'), {
  ssr: false, // Desativa a renderização no lado do servidor para este componente
});

/*
 * A component to display the selected content.
 *
 * @component
 * @param {Object} content - The selected content object to be displayed.
 */
const ContentDisplay = ({
  content,
  aula,
  contentsList,
  setDisplayedContent,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (content && content.progresso === null && content.tipo === 'EXTRA') {
      dispatch(
        marcarProgresso({
          uuidConteudo: content.uuid,
          uuidAula: aula,
        }),
      );
    }
  }, [content]);

  const markProgress = (content) => {
    if (content.progresso === null) {
      dispatch(
        marcarProgresso({
          uuidConteudo: content.uuid,
          uuidAula: aula,
        }),
      );
    }
  };

  const handleVideoProgress = () => {
    markProgress(content);
    moveToNextContent();
  };
  const moveToNextContent = () => {
    const currentIndex = contentsList.findIndex((c) => c.uuid === content.uuid);
    const nextContent = contentsList[currentIndex + 1];
    console.log(nextContent);

    if (nextContent) {
      setDisplayedContent(nextContent);
      if (nextContent.tipo === 'EXTRA') {
        markProgress(nextContent);
      }
    } else {
      console.log('This is the last content!');
      // Handle the scenario when there's no next content, e.g., show a message, navigate to a different page, etc.
    }
  };

  return (
    <div style={{ flex: 3 }} className="p-1 sm:p-4">
      {content && <h3>{content.titulo}</h3>}
      {content ? (
        content.tipo === 'VIDEO' ? (
          <YouTubeVideo
            videoUrl={content.url}
            onVideoProgress={handleVideoProgress}
          />
        ) : content.tipo === 'EXTRA' &&
          content.mimeType === 'application/pdf' ? (
          <div className="pdf-container">
            <DynamicPDFViewer url={content.url} />
          </div>
        ) : (
          <div>{content.nome}</div>
        )
      ) : (
        <p>Selecione um conteúdo para visualizar.</p>
      )}
    </div>
  );
};

ContentDisplay.propTypes = {
  content: PropTypes.object,
  aula: PropTypes.string.isRequired,
  contentsList: PropTypes.arrayOf(PropTypes.object).isRequired, // List of all contents for the aula
  setDisplayedContent: PropTypes.func.isRequired,
};

export default ContentDisplay;
