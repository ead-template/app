import { useState, useEffect } from 'react'

/**
 * Hook para obter as dimensões da janela do navegador.
 * @return {Object} Um objeto contendo as propriedades 'width' e 'height', representando a largura e a altura da janela do navegador, respectivamente.
 * @example
 * const { width, height } = useWindowDimensions();
 */
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    /**
     * Manipula o evento de redimensionamento da janela, atualizando as dimensões da janela.
     */
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useWindowDimensions
