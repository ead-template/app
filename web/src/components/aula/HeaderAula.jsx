import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogoContainer } from '../sidebar/style.jsx'
import { LessonTitle } from './style.jsx'
import HeaderWrapper from '../header/HeaderWrapper.jsx'
import { desmarcarProgresso, marcarProgresso } from '@/store/AulaSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'primereact/checkbox'
import {
  closeSidebarAula,
  openSidebarAula,
} from '@/store/aula/sidebarAulaActions'
import { Button } from 'primereact/button'
import { useMediaQuery } from 'react-responsive'
import { Knob } from 'primereact/knob'

/**
 * Componente Header para a página de aula.
 * Exibe um header personalizado que inclui o título da aula, barra de progresso, checkbox para marcar a conclusão da aula,
 * e botões para controlar a visibilidade da barra lateral e navegar para a página inicial.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const aulaCompleta = useSelector((state) => state.aula.aula)
  const sidebarState = useSelector((state) => state.sidebarAula.visible)
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [progressoGeral, setProgressoGeral] = useState(0)

  const handleCheckboxChange = (e) => {
    if (e.target.checked && aulaCompleta && aulaCompleta.aula) {
      dispatch(marcarProgresso({ uuidAula: aulaCompleta.aula.uuid }))
    } else if (!e.target.checked && aulaCompleta && aulaCompleta.progresso) {
      dispatch(
        desmarcarProgresso({ uuid: aulaCompleta.progresso.uuid, type: 'aula' }),
      )
    }
  }

  const handleToggleSidebar = () => {
    if (sidebarState) {
      dispatch(closeSidebarAula())
    } else {
      dispatch(openSidebarAula())
    }
  }

  const navigateToHome = () => {
    router.push('/')
  }

  useEffect(() => {
    const calcularProgressoGeral = () => {
      if (
        aulaCompleta &&
        aulaCompleta.conteudos &&
        aulaCompleta.conteudos.length
      ) {
        const totalConteudos = aulaCompleta.conteudos.length
        const conteudosCompletos = aulaCompleta.conteudos.filter(
          (conteudo) => conteudo.progresso !== null,
        ).length

        return parseInt((conteudosCompletos / totalConteudos) * 100)
      }
      return 0
    }

    setProgressoGeral(calcularProgressoGeral())
  }, [aulaCompleta])

  return (
    <HeaderWrapper id={'header'} className="flex justify-content-between  ">
      <div className="flex">
        {isMobile ? (
          <Button
            icon="pi pi-arrow-left"
            className="back-button"
            text
            onClick={navigateToHome}
          />
        ) : (
          <LogoContainer onClick={navigateToHome}>
            <img src="assets/logo/logo.png" alt="Logo" />
          </LogoContainer>
        )}

        {aulaCompleta && aulaCompleta.aula && aulaCompleta.aula.titulo && (
          <LessonTitle className="ml-3">{aulaCompleta.aula.titulo}</LessonTitle>
        )}
      </div>

      <div className="flex align-items-center">
        {aulaCompleta && (
          <>
            <Knob
              className="mr-5 progress-bar"
              value={progressoGeral}
              readOnly
              size={50}
            />
            {!isMobile && (
              <>
                <Checkbox
                  inputId="aulaConcluida"
                  onChange={handleCheckboxChange}
                  checked={!!aulaCompleta.progresso}
                />
                <label
                  htmlFor="aulaConcluida"
                  className={isMobile ? 'mobile-label' : 'ml-2'}
                >
                  Aula Concluída
                </label>
              </>
            )}
          </>
        )}
        {!isMobile && (
          <Button
            icon="pi pi-bars"
            className="ml-3"
            rounded
            text
            onClick={handleToggleSidebar}
          />
        )}
      </div>
    </HeaderWrapper>
  )
}

export default Header
