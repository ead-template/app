'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paginator } from 'primereact/paginator';
import { buscarAulasPorTermo } from '@/store/AulaSlice';
import { useRouter } from 'next/navigation';
import Content from '@/components/content/Content';
import ProtectedLayout from '@/components/layout/DefaultLayout.jsx';
import SearchCard from '@/components/search/SearchCard';

const SearchPage = () => {
  const [first, setFirst] = React.useState(0);
  const [rows, setRows] = React.useState(10);
  const resultados = useSelector((state) => state.aula.aulasPorTermo);
  const term = useSelector((state) => state.aula.searchTerm);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAulaClick = (uuidAula) => {
    router.push(`/aula/${uuidAula}`);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    dispatch(
      buscarAulasPorTermo({
        search: term,
        pagina: event.first / event.rows,
        tamanho: event.rows,
      }),
    );
  };

  return (
    <ProtectedLayout>
      <Content title="Busca">
        <div>
          {resultados && (
            <>
              <h3>Resultados da Busca:</h3>
              <p>Total de Resultados: {resultados.totalElementos}</p>
              <div className="p-grid p-justify-between">
                {resultados.resultados.map((aula, index) => (
                  <SearchCard
                    key={index}
                    aula={aula}
                    handleAulaClick={handleAulaClick}
                  />
                ))}
              </div>
              <Paginator
                first={first}
                rows={rows}
                totalRecords={resultados.totalElementos}
                onPageChange={onPageChange}
              ></Paginator>
            </>
          )}
        </div>
      </Content>
    </ProtectedLayout>
  );
};

export default SearchPage;
