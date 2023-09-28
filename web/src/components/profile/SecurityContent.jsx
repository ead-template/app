import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, ErrorMessage } from 'formik'
import { Button } from 'primereact/button'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import Content from '../content/Content.jsx'
import { Divider } from 'primereact/divider'
import { FormContainer, Title } from './style.jsx'
import { changePassword } from '@/store/alunoSlice.jsx'
import { Password } from 'primereact/password'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  senhaAtual: Yup.string().required('Senha atual é obrigatória'),
  novaSenha: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'A senha deve conter ao menos uma letra')
    .matches(/\d/, 'A senha deve conter ao menos um número')
    .matches(/[@$!%*?&]/, 'A senha deve conter ao menos um caractere especial')
    .notOneOf(
      [Yup.ref('senhaAtual')],
      'A nova senha não pode ser igual à atual',
    )
    .required('A senha é obrigatória'),
  confirmarSenha: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('novaSenha')], 'As senhas não coincidem'),
})

const TrocaDeSenha = () => {
  const dispatch = useDispatch()
  const toast = useRef(null)
  const router = useRouter();
  const alunoState = useSelector((state) => state.aluno)
  const canonicalUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}${router.pathname}`;


  useEffect(() => {
    if (alunoState.status === 'succeeded') {
      showToast('success', 'Senha atualizada com sucesso!')
    } else if (alunoState.status === 'failed') {
      showToast(
        'error',
        alunoState.error ? alunoState.error : 'Erro ao atualizar a senha',
      )
    }
  }, [alunoState.status])

  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 })
  }

  return (
    <>
      <Helmet>
        <title>Segurança - Ariflix</title>
        <meta
          name="description"
          content="Pagina para que possa configurar a segurança no site acessando de forma segura."
        />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            name: 'Reset Password Page',
            description:
              'This page allows the user to enter their new password.',
            url: 'https://ariflix.app.br/reset-password',
          })}
        </script>
      </Helmet>
      <Content>
        <Title>Troca de Senha</Title>
        <Toast ref={toast} />
        <FormContainer>
          <Divider />
          <Formik
            initialValues={{
              senhaAtual: '',
              novaSenha: '',
              confirmarSenha: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await dispatch(changePassword(values))
            }}
          >
            {({ errors, touched, setFieldValue, values, isSubmitting }) => {
              const calculatePasswordStrength = (password) => {
                let strength = 0
                const missingAttributes = []

                if (password.length < 8)
                  missingAttributes.push('Pelo menos 8 caracteres')

                if (/[A-Z]/.test(password)) strength += 25
                else missingAttributes.push('Letra maiúscula')

                if (/[a-z]/.test(password)) strength += 25
                else missingAttributes.push('Letra minúscula')

                if (/\d/.test(password)) strength += 25
                else missingAttributes.push('Número')

                if (/\W/.test(password)) strength += 25
                else missingAttributes.push('Caractere especial')

                return { strength, missingAttributes }
              }

              const { strength, missingAttributes } = calculatePasswordStrength(
                values.novaSenha,
              )

              const header = (
                <div className="p-p-2">
                  <h6>Força da senha:</h6>
                  <div
                    className="p-mb-2"
                    style={{
                      height: '5px',
                      borderRadius: '3px',
                      background: '#f0f0f0',
                    }}
                  >
                    <div
                      style={{
                        width: `${strength}%`,
                        height: '5px',
                        borderRadius: '3px',
                        background: 'green',
                      }}
                    />
                  </div>
                  <p>
                    (Utilize uma senha forte combinando letras maiúsculas,
                    minúsculas, números e caracteres especiais.)
                  </p>
                </div>
              )

              const footer = (
                <>
                  <Divider />
                  <div className="p-p-2">
                    {missingAttributes.length > 0 && (
                      <p>Falta: {missingAttributes.join(', ')}</p>
                    )}
                  </div>
                </>
              )
              return (
                <Form>
                  <div className="p-fluid p-formgrid p-grid">
                    <div className="p-field p-col-12 p-md-6 mt-1">
                      <label htmlFor="senhaAtual" className="p-d-block mb-1">
                        Senha Atual:
                      </label>
                      <Password
                        inputId="senhaAtual"
                        name="senhaAtual"
                        feedback={false}
                        toggleMask
                        className={
                          errors.senhaAtual && touched.senhaAtual
                            ? 'p-invalid'
                            : ''
                        }
                        value={values.senhaAtual}
                        onChange={(e) =>
                          setFieldValue('senhaAtual', e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="senhaAtual"
                        component="small"
                        className="p-error"
                      />
                    </div>

                    <div className="p-field p-col-12 p-md-6 mt-1">
                      <label htmlFor="novaSenha" className="p-d-block mb-1">
                        Nova Senha:
                      </label>
                      <Password
                        inputId="novaSenha"
                        name="novaSenha"
                        feedback={true}
                        toggleMask
                        header={header}
                        footer={footer}
                        className={
                          errors.novaSenha && touched.novaSenha
                            ? 'p-invalid'
                            : ''
                        }
                        value={values.novaSenha}
                        onChange={(e) =>
                          setFieldValue('novaSenha', e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="novaSenha"
                        component="small"
                        className="p-error"
                      />
                    </div>

                    <div className="p-field p-col-12 p-md-6 mt-1">
                      <label
                        htmlFor="confirmarSenha"
                        className="p-d-block mb-1"
                      >
                        Confirmar Nova Senha:
                      </label>
                      <Password
                        inputId="confirmarSenha"
                        name="confirmarSenha"
                        feedback={false}
                        toggleMask
                        className={
                          errors.confirmarSenha && touched.confirmarSenha
                            ? 'p-invalid'
                            : ''
                        }
                        value={values.confirmarSenha}
                        onChange={(e) =>
                          setFieldValue('confirmarSenha', e.target.value)
                        }
                      />
                      <ErrorMessage
                        name="confirmarSenha"
                        component="small"
                        className="p-error"
                      />
                    </div>

                    <Button
                      label={
                        isSubmitting ? 'Atualizando...' : 'Atualizar Senha'
                      }
                      type="submit"
                      style={{ width: 'fit-content' }}
                      className="p-button  p-button-primary mt-3"
                      disabled={isSubmitting}
                    />
                  </div>
                </Form>
              )
            }}
          </Formik>
        </FormContainer>
      </Content>
    </>
  )
}

export default TrocaDeSenha
