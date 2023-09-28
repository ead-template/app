import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Document, Page } from 'react-pdf'
import { PDFContainer, PDFLoad, PDFView } from '../aula/style.jsx'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'
import { ProgressBar } from 'primereact/progressbar'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = "/_next/static/worker/8862b20797b2bc280737fc3cb531ed6c.js";

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(0)
  const containerRef = useRef(null)
  const toast = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      setPageWidth(containerRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setPageNumber(1)
  }, [url])

  const handleLoadError = (error) => {
    console.error(error)
    setLoading(false)
    toast.current.show({
      severity: 'error',
      summary: 'Erro ao Carregar PDF',
      detail:
        'Não foi possível carregar o documento. Tente novamente mais tarde.',
    })
  }

  return (
    <PDFContainer>
      <Toast ref={toast} />
      <PDFView ref={containerRef}>
        {loading && (
          <div className="loading-container">
            <ProgressBar mode="indeterminate" style={{ height: '4px' }} />
          </div>
        )}
        <Document
          key={url}
          file={url}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages)
            setLoading(false)
          }}
          onLoadError={handleLoadError}
          loading={
            <PDFLoad className="custom-loading-container">
              <ProgressSpinner
                style={{ width: '50px', height: '50px' }}
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
              <p className="text-primary">Carregando PDF...</p>
            </PDFLoad>
          }
        >
          <Page
            pageNumber={pageNumber}
            onLoadSuccess={() => setLoading(false)}
            onLoadError={() => setLoading(false)}
            renderAnnotationLayer={false}
            height={600}
            width={pageWidth}
          />
        </Document>
      </PDFView>

      <div className="pagination-controls flex justify-content-center mt-4">
        <Button
          label="Anterior"
          onClick={() => {
            setLoading(true)
            setPageNumber(pageNumber - 1)
          }}
          disabled={pageNumber <= 1}
          className="p-button-text"
        />

        <Badge
          value={`${pageNumber} de ${numPages}`}
          severity="danger"
          className="pagination-badge"
        />

        <Button
          label="Próximo"
          onClick={() => {
            setLoading(true) // Ativa carregamento antes de trocar de página
            setPageNumber(pageNumber + 1)
          }}
          disabled={pageNumber >= numPages}
          className="p-button-text"
        />
      </div>
    </PDFContainer>
  )
}

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PDFViewer
