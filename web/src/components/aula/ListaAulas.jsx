import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buscarAulasPorAluno, limparErro } from '@/store/inscricaoSlice.jsx';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/navigation';
import { CarouselAula, ListaAulasStyle, StyledImage } from './style.jsx';
import { Tooltip } from 'primereact/tooltip';
import { useMediaQuery } from 'react-responsive';

/**
 * Componente que lista as aulas de um aluno.
 * @function
 * @component
 * @return {React.ReactNode} O componente renderizado de lista de aulas.
 */
function ListaAulas() {
  const aulas = useSelector((state) => state.inscricao.inscricoes);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.inscricao.error);
  const toast = useRef(null);
  const router = useRouter();
  const smalDesktop = useMediaQuery({ query: '(max-width: 1600px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1199px)' });

  useEffect(() => {
    const params = {
      tamanho: 10,
      pagina: 0,
      ordenacao: 'createdAt',
    };

    dispatch(buscarAulasPorAluno(params)).catch(() => {
      setTimeout(() => {
        dispatch(limparErro());
      }, 3000);
    });
  }, [dispatch]);

  useEffect(() => {
    if (error && toast.current) {
      toast.current.show({ severity: 'error', summary: error, life: 3000 });
    }
  }, [error]);

  const handleAulaClick = (uuidAula) => {
    router.push(`/aula/${uuidAula}`);
  };

  /**
   * Renders a template for a specific class.
   *
   * @param {Object} aula - The class object to render the template for.
   * @return {JSX.Element} The rendered template.
   */
  const aulaTemplate = (aula) => {
    const uniqueId = `descricao-limited-${aula.inscricao.aula.uuid}`;
    const isConcluida = !!(aula.progresso && aula.progresso.dataConclusao);
    return (
      <ListaAulasStyle className="border-1 surface-border border-round m-1 sm:m-2 text-center py-3 sm:py-5 px-1 sm:px-3 flex justify-content-between flex-column">
        <div className="mb-3">
          <StyledImage
            src={aula.inscricao.aula.url}
            alt={aula.inscricao.aula.titulo}
            preview
            width={120}
          />
        </div>
        <div>
          <h4 className="mb-1">
            {aula.inscricao.aula.titulo}{' '}
            {isConcluida && (
              <i
                className="pi pi-check ml-1"
                style={{ fontSize: '1.5em', color: 'green' }}
              ></i>
            )}
          </h4>

          <h5 className="mt-0 mb-2">Ariane Ribeiro Lage</h5>
          <h6 id={uniqueId} className="descricao-limited p-m-0">
            {aula.inscricao.aula.descricao.length > 100
              ? aula.inscricao.aula.descricao.substring(0, 97) + '...'
              : aula.inscricao.aula.descricao}
          </h6>
          <Tooltip
            target={`#${uniqueId}`}
            mouseTrack
            mouseTrackTop={15}
            content={aula.inscricao.aula.descricao}
          />

          {aula.inscricao.aula.videoUrl && (
            <video controls width="100%" src={aula.inscricao.aula.videoUrl}>
              <track kind="captions" />
            </video>
          )}
          <div className="mt-2 flex flex-wrap gap-2 justify-content-center">
            <Button
              label="Assistir"
              icon="pi pi-play"
              className="p-button-success p-button-rounded"
              onClick={() => handleAulaClick(aula.inscricao.aula.uuid)}
            />
          </div>
        </div>
      </ListaAulasStyle>
    );
  };

  return (
    <CarouselAula>
      <h3 className="p-m-0">Minhas aulas</h3>
      <Toast ref={toast} />
      {aulas && aulas.resultados && aulas.resultados.length > 0 ? (
        <Carousel
          value={aulas.resultados}
          itemTemplate={aulaTemplate}
          style={{ maxWidth: '100%' }}
          className="carosel-aulas"
          numVisible={isMobile ? 1 : smalDesktop ? 2 : 3}
          numScroll={smalDesktop ? 1 : 3}
        />
      ) : (
        ''
      )}
    </CarouselAula>
  );
}

export default ListaAulas;
