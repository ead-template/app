import React, { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import { TabView, TabPanel } from 'primereact/tabview';
import PropTypes from 'prop-types';
import { ContentItem, StyledContainer } from './style.jsx';
import { Checkbox } from 'primereact/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { desmarcarProgresso, marcarProgresso } from '../../store/AulaSlice.jsx';

/*
 * A component to list and filter contents by type.
 *
 * @component
 * @param {Object[]} conteudos - An array of content objects to be displayed.
 */
const ContentList = ({ conteudos, onContentSelect, conteudoAtual }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const aulaCompleta = useSelector((state) => state.aula.aula);

  const sortedContentsByType = (type) => {
    return conteudos
      .filter((content) => !type || content.tipo === type)
      .sort((a, b) => a.ordem - b.ordem)
      .map((content, index) => ({
        ...content,
        order: index + 1, // Adicionar atributo "order" com a ordem correta
      }));
  };

  const handleCheckboxChange = (event, content) => {
    event.preventDefault();
    event.stopPropagation();
    if (content.progresso === null) {
      // Se o conteúdo não estiver completado, marque-o como concluído
      dispatch(
        marcarProgresso({
          uuidConteudo: content.uuid,
          uuidAula: aulaCompleta.aula.uuid,
        }),
      );
    } else {
      // Se o conteúdo já estiver completado, desmarque-o
      if (content.progresso && content.progresso.uuid)
        dispatch(
          desmarcarProgresso({
            uuid: content.progresso.uuid,
            type: 'conteudo',
          }),
        );
    }
  };
  const itemTemplate = (option, index) => {
    const isCurrentContent =
      conteudoAtual && conteudoAtual.uuid === option.uuid;

    return (
      <ContentItem isCurrent={isCurrentContent}>
        <Checkbox
          inputId={option.nome}
          checked={option.progresso !== null}
          onChange={(event) => handleCheckboxChange(event, option)}
          onClick={(event) => handleCheckboxChange(event, option)}
          className="mr-2"
        />
        <span className="p-checkbox-label">{option.order}.</span>
        <div
          style={{ marginLeft: '10px', cursor: 'pointer', flexGrow: 1 }}
          onClick={() => onContentSelect(option)}
        >
          <span>{option.nome}</span>
        </div>
      </ContentItem>
    );
  };

  return (
    <StyledContainer>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        <TabPanel header="Vídeo">
          <ListBox
            value={sortedContentsByType('VIDEO')}
            options={sortedContentsByType('VIDEO')}
            itemTemplate={itemTemplate}
            style={{ width: '100%', overflow: 'auto' }}
          />
        </TabPanel>
        <TabPanel header="Extra">
          <ListBox
            value={sortedContentsByType('EXTRA')}
            options={sortedContentsByType('EXTRA')}
            itemTemplate={itemTemplate}
            style={{ width: '100%', overflow: 'auto' }}
          />
        </TabPanel>
      </TabView>
    </StyledContainer>
  );
};

ContentList.propTypes = {
  /**
   * An array of content objects.
   * Each object should have a `tipo` property to determine its type.
   */
  conteudos: PropTypes.arrayOf(
    PropTypes.shape({
      tipo: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onContentSelect: PropTypes.func.isRequired,
  conteudoAtual: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    // Outras propriedades, se necessário
  }),
};

export default ContentList;
