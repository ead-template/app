import React from 'react';
import { StyledContent } from './style.jsx';
import PropTypes from 'prop-types';

/**
 * Componente Content.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.title - Título do conteúdo.
 * @param {React.ReactNode} props.children - Elementos filhos do React.
 *
 * @return {React.ReactNode} Componente Content.
 */
function Content({ title, children }) {
  return <StyledContent title={title}>{children}</StyledContent>;
}

Content.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default Content;
