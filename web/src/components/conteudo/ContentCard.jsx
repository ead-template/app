// ContentCard.jsx

import React from 'react'
import { Card } from 'primereact/card'
import PropTypes from 'prop-types' // Usando o Card do PrimeReact

const ContentCard = ({ content }) => {
  return (
    <Card title={content.nome}>
      <p>{content.descricao}</p>
      {/* Você pode expandir para exibir outros detalhes do conteúdo aqui, como url, tipo, tema, etc. */}
    </Card>
  )
}

ContentCard.propTypes = {
  content: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
  }).isRequired,
}

export default ContentCard
