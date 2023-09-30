import styled from 'styled-components';

const HeaderWrapper = styled.div`
  max-height: 3.5em;
  .custom-dropdown .p-dropdown-label {
    display: none;
  }

  .custom-dropdown .p-dropdown-panel .p-dropdown-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .p-dropdown-trigger {
    display: none !important;
  }
  .p-dropdown {
    border: none;
    background: none;
    padding: 0;
    min-height: 0;
  }

  .p-dropdown:not(p-disabled).p-focus {
    border: none;
    box-shadow: none;
  }

  .p-dropdown-panel {
    border: none;
  }

  .p-ai-center.remove-border {
    font-size: 2em !important;
  }

  .progress-bar {
    transition: width 0.5s ease-out; /* Animação suave */
  }

  .mobile-label {
    display: none; /* Ocultar no celular */
  }

  /* Estilos para mobile */
  @media only screen and (max-width: 768px) {
    .logo-container {
      justify-content: center; /* Centraliza o logo */
    }

    .sidebar-button {
      margin-left: 0; /* Remove a margem esquerda */
    }
  }
`;

export default HeaderWrapper;
