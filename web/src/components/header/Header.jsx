import React, { useContext } from 'react' // Importe useContext
import { ThemeContext } from '@/theme/ThemeProvider.jsx' // Importe o contexto
import { Button } from 'primereact/button'
import HeaderWrapper from './HeaderWrapper.jsx'
import { SpeedDial } from 'primereact/speeddial'
import AuthService from '../../services/AuthService.js'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { LogoContainer } from '../sidebar/style.jsx'
import { useSelector, useDispatch } from 'react-redux'
import {
  closeSidebar,
  openSidebar,
} from '@/store/sidebar/sidebarActions.jsx'
import SearchBar from '../search/SearchBar'


const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const sidebarState = useSelector((state) => state.sidebar.visible)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const themeItems = [
    {
      label: 'Dark',
      icon: 'pi pi-moon',
      command: () => {
        toggleTheme('dark')
      },
    },
    {
      label: 'Light',
      icon: 'pi pi-sun',
      command: () => {
        toggleTheme('light')
      },
    },
  ]

  const profileItems = [
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        AuthService.logout()
        router.push('/login')
      },
    },
  ]

  const { toggleTheme } = useContext(ThemeContext)

  const handleToggleSidebar = () => {
    if (sidebarState) {
      dispatch(closeSidebar())
    } else {
      dispatch(openSidebar())
    }
  }

  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <>
      <HeaderWrapper
        id={'header'}
        className="flex justify-content-between flex-wrap "
      >
        <div className="flex  flex-row-reverse sm:flex-row">
          <LogoContainer
            onClick={navigateToHome}
            className="logo-container ml-3 sm:ml-0"
          >
            <img src={'/assets/logo/logo.png'} alt="Logo" />
          </LogoContainer>

          {isMobile && <SearchBar shouldRedirect={true} />}
          <Button
            icon="pi pi-bars"
            className="ml-3"
            rounded
            text
            onClick={handleToggleSidebar}
          />
        </div>
        {!isMobile && (
          <div className="w-8 mt-2">
            <SearchBar shouldRedirect={true} />
          </div>
        )}


        <div className="flex">

          <SpeedDial
            model={themeItems}
            direction="down"
            style={{ position: 'relative', top: 0, right: '4rem' }}
            buttonClassName="p-button-outlined p-button-text"
            showIcon="pi pi-palette"
            hideIcon="pi pi-times"
          />
          <SpeedDial
            model={profileItems}
            direction="down"
            buttonClassName="p-button-outlined p-button-text"
            hideIcon="pi pi-times"
            showIcon="pi pi-user"
            transitionDelay={80}
          />
        </div>
      </HeaderWrapper>
    </>
  )
}

export default Header
