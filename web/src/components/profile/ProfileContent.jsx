import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { updateAluno } from '@/store/alunoSlice.jsx'
import Content from '../content/Content.jsx'
import { Dropdown } from 'primereact/dropdown'
import { Divider } from 'primereact/divider'
import { FormContainer, Title } from './style.jsx'
import PhoneInput from '../layout/PhoneInput.jsx'

const validationSchema = Yup.object({
  telefone: Yup.string(),
  tipoAluno: Yup.string(),
  dataNascimento: Yup.date().nullable().typeError('Data inválida'),
})

const tipoAlunoOptions = [
  { label: 'Estudante', value: 'ESTUDANTE' },
  { label: 'Outros', value: 'OUTROS' },
  { label: 'Trabalho', value: 'TRABALHO' },
]

const UpdateAlunoInfo = () => {
  const dispatch = useDispatch() // Usando o dispatch do Redux
  const toast = useRef(null)

  const alunoState = useSelector((state) => state.aluno)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (alunoState.status === 'succeeded') {
      showToast('success', 'Dados atualizados com sucesso!')
    } else if (alunoState.status === 'failed') {
      showToast(
        'error',
        alunoState.error
          ? alunoState.error
          : 'Ocorreu um erro ao atualizar. Tente novamente.',
      )
    }
  }, [alunoState.status])
  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 })
  }

  return (
    <>
      <Content>
        <Title>Perfil</Title>
        <Toast ref={toast} />
        <FormContainer>
          <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
              <label htmlFor="username">E-mail</label>
              <InputText id="username" value={user.username} readOnly />
            </div>
            <div className="p-field p-col-12 p-md-6 mt-1">
              <label htmlFor="name">Nome</label>
              <InputText id="name" value={user.name} readOnly />
            </div>
          </div>
          <Divider />
          <Formik
            initialValues={{
              telefone: user.aluno.telefone || '',
              tipoAluno: user.aluno.tipoAluno || '',
              dataNascimento: user.aluno.dataNascimento || null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const cleanedPhone = values.telefone.replace(/[^\d]/g, '')
                const payload = {
                  ...values,
                  telefone: cleanedPhone,
                  uuid: user.aluno.uuid,
                }
                await dispatch(updateAluno(payload))
              } catch (error) {
                console.error(error)
              }
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              values,
              onChange,
              setFieldValue,
              isSubmitting,
              ...props
            }) => {
              return (
                <Form>
                  <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6 mt-1">
                      <PhoneInput
                        name="telefone"
                        value={values.telefone}
                        setFieldValue={setFieldValue}
                        placeholder="Telefone"
                        errors={errors}
                        touched={touched}
                      />
                    </div>

                    <div className="p-field p-col-12 p-md-4 mt1">
                      <label htmlFor="tipoAluno">Status:</label>
                      <Dropdown
                        id="tipoAluno"
                        value={values.tipoAluno}
                        options={tipoAlunoOptions}
                        onChange={(e) => setFieldValue('tipoAluno', e.value)}
                      />
                      {errors.tipoAluno && touched.tipoAluno && (
                        <small className="p-error">{errors.tipoAluno}</small>
                      )}
                    </div>
                    <div className="p-field p-col-12 m-1">
                      <label htmlFor="dataNascimento">
                        Data de Nascimento:
                      </label>
                      <Calendar
                        id="dataNascimento"
                        value={values.dataNascimento}
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.dataNascimento && touched.dataNascimento && (
                        <small className="p-error">
                          {errors.dataNascimento}
                        </small>
                      )}
                    </div>
                  </div>
                  <Button
                    label={isSubmitting ? 'Atualizando...' : 'Atualizar'}
                    type="submit"
                    className="p-button-primary mt-3"
                    disabled={isSubmitting}
                  />
                </Form>
              )
            }}
          </Formik>
        </FormContainer>
      </Content>
    </>
  )
}

export default UpdateAlunoInfo
