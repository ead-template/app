import styled from 'styled-components'
import { Image } from 'primereact/image'

export const LessonTitle = styled.h2`
  margin-left: 20px; // Espaçamento para separar do logo
  font-size: 1.5em;
  font-weight: bold;
  align-self: center; // Alinha o título verticalmente no centro
`

export const StyledContainer = styled.div`
  flex: 1;
  padding: 1rem;

  .p-listbox {
    max-width: 400px; // Define a largura máxima para desktop
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    .p-listbox {
      width: 100%;
    }
  }
`

export const ContentItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCurrent',
})`
  display: flex;
  align-items: center;
  opacity: ${(props) => (props.isCurrent ? 0.5 : 1)};
`

export const PDFContainer = styled.div`
  width: 100%;
  max-height: 700px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .pagination-controls {
    gap: 1rem; // espaço entre os botões
    align-items: center; // alinha os botões e o texto verticalmente
    margin-top: 1rem; // espaço entre o Document e os botões
  }

  .PDFContainer {
    transition: opacity 0.3s;
  }

  .loading-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pagination-badge {
    z-index: 100;
  }
`

export const PDFView = styled.div`
  overflow: auto;
  width: 100%;
  max-height: 700px;

  .react-pdf__Document > .react-pdf__Page > .react-pdf__Page__textContent {
    display: none;
    height: fit-content;
    width: fit-content;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }

  @media screen and (max-width: 1024px) {
    max-width: 800px;
  }

  @media screen and (max-width: 768px) {
    max-width: 600px;
  }

  @media screen and (max-width: 480px) {
    max-width: 100%;
  }
`

export const PDFLoad = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const ListaAulasStyle = styled.div`
  /* Estilos padrão */
  width: 520px;
  height: 360px;

  @media screen and (min-width: 1024px) {
    .descricao-limited {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%; /* Ou qualquer outro valor que você queira especificar */
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1500px) {
    width: 550px;
  }

  @media screen and (max-width: 1024px) {
    width: 80%;
    max-width: 600px;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    max-width: 500px;
    height: 100%;
    .p-carousel-items-content .carosel-aulas {
      width: 20em;
    }
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    max-width: 400px;
    height: auto;
    .p-carousel-items-content .carosel-aulas {
      width: 18em;
    }
  }

  @media screen and (max-width: 480px) {
    height: auto;
    width: 13.5em;
  }
`

export const CarouselAula = styled.div`
  /* Estilos padrão */
  width: 100%;
  max-width: 90vw;

  @media screen and (max-width: 1024px) {
    width: 90%;
    max-width: 92vw; // Exemplo de largura máxima para este breakpoint
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    max-width: 95vw; // Exemplo de largura máxima para este breakpoint
    // Outros estilos específicos para essa faixa de tamanho
    .carosel-aulas {
      width: 20em;
    }
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    max-width: 96vw;
    .p-carousel-items-content .carosel-aulas {
      width: 18em;
    }
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: 98vw;

    .p-carousel-items-content .carosel-aulas {
      width: 18em;
    }
  }
`

export const StyledImage = styled(Image)`
  max-width: 100%;
  height: 130px;
  object-fit: cover;

  @media only screen and (max-width: 1024px) {
    max-height: 120px;
  }

  @media only screen and (max-width: 600px) {
    max-height: 100px;
  }

  @media only screen and (max-width: 480px) {
    max-height: 80px;
  }
`
