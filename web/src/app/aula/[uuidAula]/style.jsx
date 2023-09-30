import styled from 'styled-components';

export const Sidebar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen && isOpen === 'true' ? 'translateX(0)' : 'translateX(100%)'};
  display: flex;
  flex-direction: column;
`;
