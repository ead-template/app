import styled from 'styled-components';

const DropdownWrapper = styled.div`
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

  .spped-dial {
    background: none;
    border: none;
  }
`;

export default DropdownWrapper;
