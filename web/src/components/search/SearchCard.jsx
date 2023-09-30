import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Badge } from 'primereact/badge';
import Image from 'next/image';

const AulaCard = ({ aula, handleAulaClick }) => {
  const formatData = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  return (
    <div className="p-col-12 p-md-4 mb-3">
      <Card title={aula.title}>
        <div className="flex p-jc-start">
          <div className="mr-2 ml-2 mt-6">
            <Image
              src={aula.fileUrl}
              alt={aula.title}
              style={{ width: '100px' }}
              className="mr-6"
            />
          </div>
          <div>
            <p>
              <strong>Nome: </strong>
              {aula.name}
            </p>
            <p>
              <strong>Descrição: </strong>
              {aula.description}
            </p>
            <p>
              <strong>Status: </strong>
              <Badge
                value={aula.enrolled ? 'Matriculado' : 'Não Matriculado'}
                severity={aula.enrolled ? 'success' : 'danger'}
              ></Badge>
            </p>
            {aula.inscriptionDate && (
              <p>
                <strong>Data de Inscrição: </strong>
                {formatData(aula.inscriptionDate)}
              </p>
            )}

            <div className="p-d-flex p-jc-end">
              {aula.enrolled ? (
                <Button
                  label="Ir para a aula"
                  className="p-button-success"
                  onClick={() => handleAulaClick(aula.uuid)}
                />
              ) : (
                <Button
                  label="Inscrever-se"
                  className="p-button-info"
                  onClick={() => handleAulaClick(aula.uuid)}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

AulaCard.propTypes = {
  aula: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    videoUrl: PropTypes.string,
    text: PropTypes.string,
    themeName: PropTypes.string,
    fileUrl: PropTypes.string.isRequired,
    inscriptionDate: PropTypes.string,
    enrolled: PropTypes.bool.isRequired,
    uuid: PropTypes.string.isRequired,
  }).isRequired,
  handleAulaClick: PropTypes.func.isRequired,
};

export default AulaCard;
