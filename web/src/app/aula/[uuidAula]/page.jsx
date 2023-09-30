'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Content from '@/components/content/Content.jsx';
import { buscarAulaCompleta } from '@/store/AulaSlice.jsx';
import { Toast } from 'primereact/toast';
import ContentList from '@/components/aula/ContentList.jsx';
import AulaLayout from '@/components/aula/AulaLayout.jsx';
import ContentDisplay from '@/components/aula/ContentDisplay.jsx';
import { Sidebar } from './style.jsx';
import AulaDescricao from '@/components/aula/AulaDescricao.jsx';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

const AulaPage = ({ params }) => {
  const router = useRouter();
  const { uuidAula } = params;
  const dispatch = useDispatch();
  const aulaCompleta = useSelector((state) => state.aula.aula);
  const error = useSelector((state) => state.aula.error);
  const sidebarState = useSelector((state) => state.sidebarAula.visible);
  const toast = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  console.log(router.pathname);
  const canonicalUrl = `process.env.NEXT_PUBLIC_FRONT_URL$`;

  useEffect(() => {
    dispatch(buscarAulaCompleta(uuidAula));
  }, [dispatch, uuidAula]);

  useEffect(() => {
    if (aulaCompleta && aulaCompleta.conteudos) {
      const firstUncompleted = aulaCompleta.conteudos.find(
        (content) => content.progresso === null,
      );
      setSelectedContent(firstUncompleted || aulaCompleta.conteudos[0]);
    }
  }, [aulaCompleta]);

  useEffect(() => {
    if (error && toast) {
      toast.current.show({ severity: 'error', summary: error, life: 3000 });
    }
  }, [error]);

  const [selectedContent, setSelectedContent] = useState(null);

  const renderContentList = (conteudos) => (
    <ContentList
      conteudos={conteudos}
      onContentSelect={(content) => {
        setSelectedContent(content);
      }}
      conteudoAtual={selectedContent}
    />
  );

  return (
    <AulaLayout>
      <head>
        <title>
          {aulaCompleta && aulaCompleta.aula
            ? aulaCompleta.aula.titulo
            : 'Loading...'}
        </title>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="description"
          content={
            aulaCompleta && aulaCompleta.aula
              ? aulaCompleta.aula.descricao
              : 'Loading...'
          }
        />
        <meta name="author" content="Renan Ribeiro Lage" />
      </head>
      <Toast ref={toast} />
      {aulaCompleta && aulaCompleta.aula ? (
        <div className="flex">
          <div className="flex flex-1 flex-column">
            <ContentDisplay
              content={selectedContent}
              aula={aulaCompleta.aula.uuid}
              contentsList={aulaCompleta.conteudos}
              setDisplayedContent={setSelectedContent}
            />
            <Content>
              <AulaDescricao
                descricao={aulaCompleta.aula.descricao}
                videoUrl={aulaCompleta.aula.videoUrl}
                texto={aulaCompleta.aula.texto}
                contentList={
                  isMobile && renderContentList(aulaCompleta.conteudos)
                }
              />
            </Content>
          </div>
          {!isMobile && (
            <Sidebar isOpen={sidebarState.toString()}>
              {renderContentList(aulaCompleta.conteudos)}
            </Sidebar>
          )}
        </div>
      ) : (
        <Content title="Aula">
          <p>Carregando aula...</p>
        </Content>
      )}
    </AulaLayout>
  );
};

AulaPage.propTypes = {
  params: PropTypes.shape({
    uuidAula: PropTypes.string.isRequired,
  }).isRequired,
};

export default AulaPage;
