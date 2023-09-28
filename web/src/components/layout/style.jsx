import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`

export const SidebarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['visible', 'isMobile'].includes(prop),
})`
  flex: ${(props) =>
    props.visible === 'true' && props.isMobile === 'false'
      ? '0 0 240px'
      : '0 0 0px'};
  overflow-x: hidden;
  transition: flex 0.5s;
`

export const ContentWrapper = styled.div`
  flex: 1;
`
