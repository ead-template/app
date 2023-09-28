import styled from 'styled-components'

export const SidebarWrapper = styled.div.attrs(() => ({
  className: 'p-sidebar',
}))`
  height: 100%;
  overflow-x: hidden;
  min-width: 30em;
  top: 0;
  left: 0;
  transform: translateX(${(props) => (props.visible ? '0' : '-100%')});
  transition: 0.5s;
  .p-sidebar-content {
    overflow-x: hidden;
  }

  .p-sidebar-header {
    display: flex;
    justify-content: flex-start;
  }
`

export const LogoContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  img {
    max-width: 100%;
  }
`
