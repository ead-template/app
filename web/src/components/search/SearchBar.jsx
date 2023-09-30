import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buscarAulasPorTermo, clearError } from '@/store/AulaSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { SearchBarContainer } from './SearchBarStyles';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Dialog } from 'primereact/dialog';

const SearchBar = ({ shouldRedirect }) => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.aula.isLoading);
  const error = useSelector((state) => state.aula.error);
  const toast = useRef(null);
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleSearch = () => {
    try {
      dispatch(buscarAulasPorTermo({ search }));
      if (shouldRedirect && router.pathname !== '/search') {
        router.push('/search');
      }
    } catch (e) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: e,
        life: 3000,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleModal = () => {
    // Função para alternar modal
    setShowModal(!showModal);
  };

  const renderFooter = () => {
    return (
      <div>
        <Button label="Cancelar" icon="pi pi-times" onClick={toggleModal} />
        <Button
          label="Buscar"
          icon="pi pi-check"
          onClick={handleSearch}
          disabled={isLoading}
        />
      </div>
    );
  };

  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: error,
        life: 3000,
      });
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, dispatch]);

  return (
    <SearchBarContainer
      className={!isMobile ? 'p-inputgroup search-bar mb-4 ml-2 md:w-10' : ''}
    >
      <Toast ref={toast} />
      {isMobile && (
        <Button rounded text icon="pi pi-search" onClick={toggleModal} />
      )}
      {!isMobile && (
        <>
          <span id="icon-search" className="p-inputgroup-addon">
            <i className="pi pi-search"></i>
          </span>

          <InputText
            placeholder="Buscar aula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            size="small"
            label={isLoading ? 'Buscando...' : 'Buscar'}
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading && <i className="pi pi-spin pi-spinner"></i>}
          </Button>
        </>
      )}

      <Dialog
        header="Buscar Aula"
        visible={showModal}
        onHide={toggleModal}
        footer={renderFooter()}
      >
        <InputText
          placeholder="Buscar aula..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && <i className="pi pi-spin pi-spinner"></i>}
      </Dialog>
    </SearchBarContainer>
  );
};

SearchBar.propTypes = {
  shouldRedirect: PropTypes.bool.isRequired,
};
export default SearchBar;
