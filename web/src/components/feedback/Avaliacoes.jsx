// AvaliacoesTab.jsx

import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { Rating } from 'primereact/rating'
import { Dialog } from 'primereact/dialog'
import { Menu } from 'primereact/menu'

import {
  createFeedbackAula,
  filtrarFeedbackAula,
  meFeedbackAula,
  removeFeedbackAula,
  summaryFeedbackAula,
  updateFeedbackAula,
} from '@/store/feedback/feedbackSlice'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { Divider } from 'primereact/divider'
import { ConfirmDialog } from 'primereact/confirmdialog'
import moment from 'moment'
import { FeedbackCard } from './FeedbackComponents'
import { RatingSummary } from './RatingSummary'
import FeedbackForm from './FeedbackForm' // ajuste o caminho para o seu arquivo de slice

function capitalizeFirstLetterOfEachWord(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

const AvaliacoesTab = () => {
  const toast = useRef(null)
  const dispatch = useDispatch()
  const feedback = useSelector((state) => state.feedback) // ajuste de acordo com sua árvore de estado
  const aulaCompleta = useSelector((state) => state.aula.aula)

  const [minRating, setMinRating] = useState(null)
  const [maxRating, setMaxRating] = useState(null)
  const [totalElementos, setTotalElementos] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null)
  const [selectedEditFeedback, setEditSelectedFeedback] = useState(null)
  const [initialValues, setInitialValues] = useState({ rating: 0, comment: '' })
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [currentFeedbackUuid, setCurrentFeedbackUuid] = useState(null)

  const menu = useRef(null)

  const handleMenuToggle = (event, fb) => {
    setSelectedFeedback(fb)
    menu.current.toggle(event)
  }

  const menuItems = [
    {
      label: 'Editar',
      icon: 'pi pi-fw pi-pencil',
      command: () => handleEditFeedback(selectedFeedback),
    },
    {
      label: 'Remover',
      icon: 'pi pi-fw pi-trash',
      command: () => handleRemoveFeedback(selectedFeedback.uuid),
    },
  ]

  const handleEditFeedback = (feedback) => {
    setInitialValues({ rating: feedback.rating, comment: feedback.comment })
    setEditSelectedFeedback(feedback.uuid) // Supondo que uuid seja o identificador único do feedback
    setShowDialog(true)
  }
  const handleUpdateFeedback = async (values) => {
    try {
      await dispatch(
        updateFeedbackAula({
          uuid: selectedEditFeedback,
          feedback: values,
        }),
      )
      showToast('success', 'Feedback atualizado com sucesso!')
      setShowDialog(false)
      setEditSelectedFeedback(null)
    } catch (error) {
      showToast(
        'error',
        'Ocorreu um erro ao editar o feedback. Tente novamente.',
      )
    }
  }
  const handleRemoveFeedback = (feedbackId) => {
    setCurrentFeedbackUuid(feedbackId)
    setShowConfirmDialog(true)
  }

  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 })
  }
  useEffect(() => {
    const params = {
      minRating,
      maxRating,
      aula:
        (aulaCompleta && aulaCompleta.aula && aulaCompleta.aula.uuid) || null,
      me: null,
    }

    dispatch(filtrarFeedbackAula(params)).then((response) => {
      if (response && response.totalElementos !== undefined) {
        setTotalElementos(response.totalElementos)
      }
    })
  }, [dispatch, minRating, maxRating, rowsPerPage, aulaCompleta?.aula?.uuid])

  useEffect(() => {
    if (aulaCompleta && aulaCompleta.aula && aulaCompleta.aula.uuid) {
      dispatch(summaryFeedbackAula(aulaCompleta.aula.uuid))
      dispatch(meFeedbackAula({ aula: aulaCompleta.aula.uuid }))
    }
  }, [dispatch, aulaCompleta?.aula?.uuid])

  const handleCreateFeedback = async (values, { setSubmitting }) => {
    try {
      const request = { ...values, uuid: aulaCompleta.aula.uuid }
      const resultAction = await dispatch(createFeedbackAula(request))
      if (createFeedbackAula.fulfilled.match(resultAction)) {
        showToast('success', 'Feedback adicionado com sucesso!')
      } else if (createFeedbackAula.rejected.match(resultAction)) {
        if (
          resultAction.payload.message ===
          'Feedback já existe para o usuário na aula especificada'
        ) {
          showToast('warn', 'Você já enviou um feedback para esta aula.')
        } else {
          showToast(
            'error',
            'Ocorreu um erro ao adicionar o feedback. Tente novamente.',
          )
        }
      }
    } catch (error) {
      if (
        feedback.error &&
        feedback.error ===
          'Feedback já existe para o usuário na aula especificada'
      ) {
        showToast('warn', 'Você já enviou um feedback para esta aula.')
      } else {
        showToast(
          'error',
          'Ocorreu um erro ao adicionar o feedback. Tente novamente.',
        )
      }
      console.error(error)
    } finally {
      setSubmitting(false)
      setShowDialog(false)
    }
  }

  return (
    <div className="p-grid p-justify-between">
      {feedback &&
      feedback.meFilteredFeedback &&
      feedback.meFilteredFeedback.length ? (
        feedback.meFilteredFeedback.map((fb, index) => (
          <Card key={index} className="p-col-12 mb-2">
            <div className="p-3">
              <div className="flex justify-between">
                <h3>
                  {capitalizeFirstLetterOfEachWord(fb.user.nome.toString())}
                </h3>
                <Button
                  className="ml-2"
                  text
                  icon="pi pi-ellipsis-v"
                  onClick={(event) => handleMenuToggle(event, fb)}
                  aria-controls="popup_menu"
                  aria-haspopup
                />
                <Menu model={menuItems} popup ref={menu} id="popup_menu" />
              </div>
              <div className="flex">
                <Rating value={fb.rating} readOnly stars={5} cancel={false} />
                <p className="ml-3"> {moment(fb.date).fromNow()}</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: fb.comment }} />
            </div>
            <Divider align="center" />
          </Card>
        ))
      ) : (
        <Card className="p-col-12 mb-2" title="Deixe sua avaliação !">
          <h3>Contribua com a Ariflix!</h3>
          <p>
            Seu feedback é valioso para nós. Clique no botão abaixo para
            adicionar seu feedback.
          </p>
          <Button
            label="Adicionar Feedback"
            onClick={() => {
              setShowDialog(true)
              setInitialValues({ rating: 0, comment: '' })
            }}
          />
        </Card>
      )}

      {feedback && feedback.summary && (
        <RatingSummary summary={feedback.summary} />
      )}
      <Toast ref={toast} />

      <ConfirmDialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        message="Você tem certeza de que deseja excluir este feedback?"
        header="Confirmação"
        icon="pi pi-exclamation-triangle"
        accept={async () => {
          if (currentFeedbackUuid) {
            try {
              await dispatch(removeFeedbackAula(currentFeedbackUuid))
              showToast('success', 'Feedback removido com sucesso!')
            } catch (error) {
              console.error(error)
              showToast(
                'error',
                'Ocorreu um erro ao remover o feedback. Tente novamente.',
              )
            }
            setCurrentFeedbackUuid(null)
            setShowConfirmDialog(false)
          }
        }}
      />

      <div className="p-col-12">
        <h2 className="p-text-center">Buscar Avaliações</h2>
      </div>
      <div className="flex p-2 flex-column md:flex-row">
        <div className="p-field p-col-4 md:mt-0">
          <label htmlFor="minRating">Min Rating</label>
          <Rating
            id="minRating"
            value={minRating}
            cancel={false}
            stars={5}
            onChange={(e) => setMinRating(e.value)}
          />
        </div>

        <div className="p-field p-col-4 md:ml-6 mt-2 md:mt-0">
          <label htmlFor="maxRating">Max Rating</label>
          <Rating
            id="maxRating"
            value={maxRating}
            cancel={false}
            stars={5}
            onChange={(e) => setMaxRating(e.value)}
          />
        </div>

        <div className="p-field p-col-3 md:ml-6 mt-2 md:mt-0">
          <Dropdown
            id="rowsPerPage"
            value={rowsPerPage}
            options={[10, 20, 50]}
            placeholder="Registros por página"
            onChange={(e) => setRowsPerPage(e.value)}
          />
        </div>
      </div>

      {feedback &&
        feedback.filteredFeedback &&
        feedback.filteredFeedback.map((fb, index) => (
          <FeedbackCard feedback={fb} index={index} key={index} />
        ))}
      <Paginator
        className="p-col-12"
        totalRecords={totalElementos}
        rows={rowsPerPage}
        onPageChange={(e) => {
          dispatch(
            filtrarFeedbackAula({
              minRating,
              maxRating,
              page: e.page + 1,
              size: e.rows,
              aula:
                (aulaCompleta && aulaCompleta.aula && aulaCompleta.aula.uuid) ||
                null,
              me: false,
            }),
          )
        }}
      />

      <Dialog
        header="Adicionar Avaliação"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
      >
        <FeedbackForm
          onSubmit={
            selectedFeedback ? handleUpdateFeedback : handleCreateFeedback
          }
          initialValues={initialValues}
        />
      </Dialog>
    </div>
  )
}

export default AvaliacoesTab
