import styled from 'styled-components';
import { Card } from 'primereact/card';

export const StyledContent = styled(Card)`
  padding: 0.5em;
  max-width: 100%;
  @media (min-width: 768px) {
    padding: 2.5em;
    padding-top: 1em;
  }

  @media (max-width: 767px) {
    padding: 0;
    .p-card .p-card-body {
      padding: 0.5em !important;
    }
  }
`;
