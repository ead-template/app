'use client';

import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import FormAuth from './style.jsx';
import { LogoContainer } from '@/components/sidebar/style.jsx';
import AuthService from '../../services/AuthService.js';
import { Divider } from 'primereact/divider';
import { useRouter } from 'next/navigation';
import ChaskiqScrip from '../../components/chat/ChaskiqScrip';
import Image from 'next/image';
import PropTypes from 'prop-types';

/**
 * Esquema de validação para o formulário de recuperação de senha.
 */
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/[a-zA-Z]/, 'A senha deve conter ao menos uma letra')
    .matches(/\d/, 'A senha deve conter ao menos um número')
    .matches(/[@$!%*?&]/, 'A senha deve conter ao menos um caractere especial')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas devem corresponder')
    .required('Confirme a senha'),
});

/**
 * Componente de página de recuperação de senha.
 *
 * Este componente permite que o usuário insira sua nova senha.
 *
 * @return {React.Component} O componente renderizado.
 */
const ResetPasswordPage = ({ searchParams }) => {
  const toast = useRef(null);

  const router = useRouter();
  const canonicalUrl = `process.env.NEXT_PUBLIC_FRONT_URL${router.pathname}`;
  const token = searchParams.token;
  /**
   * Exibe uma notificação toast.
   *
   * @param {string} severity - Severidade da mensagem (ex. 'error', 'success').
   * @param {string} summary - Resumo da mensagem a ser exibida.
   */
  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 });
  };

  return (
    <>
      <head>
        <title>Recuperar Senha - Ariflix</title>
        <meta
          name="description"
          content="Recuperar a senha para acessar seus cursos de medicina de alta qualidade e totalmente credenciados."
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
      </head>
      <LogoContainer>
        <Image
          src={'/assets/logo/logo.png'}
          alt="Logo do Ariflix"
          width={80}
          height={40}
        />
      </LogoContainer>
      <FormAuth>
        <Toast ref={toast} />
        <Card
          title="Recuperação de Senha"
          style={{ width: '400px' }}
          className="p-3 p-shadow-3"
        >
          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await AuthService.resetPassword({
                  password: values.password,
                  token,
                });
                showToast(
                  'success',
                  'Senha atualizada com sucesso! Redirecionando para a pagina de login ...',
                );
                setTimeout(() => {
                  router.push('/login');
                }, 500);
              } catch (error) {
                showToast(
                  'error',
                  'Ocorreu um erro ao atualizar a senha. Por favor, tente novamente.',
                );
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => {
              const calculatePasswordStrength = (password) => {
                let strength = 0;
                const missingAttributes = [];

                if (password.length < 8)
                  missingAttributes.push('Pelo menos 8 caracteres');

                if (/[A-Z]/.test(password)) strength += 25;
                else missingAttributes.push('Letra maiúscula');

                if (/[a-z]/.test(password)) strength += 25;
                else missingAttributes.push('Letra minúscula');

                if (/\d/.test(password)) strength += 25;
                else missingAttributes.push('Número');

                if (/\W/.test(password)) strength += 25;
                else missingAttributes.push('Caractere especial');

                return { strength, missingAttributes };
              };

              const { strength, missingAttributes } = calculatePasswordStrength(
                values.password,
              );

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
              );

              const footer = (
                <>
                  <Divider />
                  <div className="p-p-2">
                    {missingAttributes.length > 0 && (
                      <p>Falta: {missingAttributes.join(', ')}</p>
                    )}
                  </div>
                </>
              );
              return (
                <Form>
                  <div className="p-fluid">
                    <div className="p-field mb-3">
                      <label htmlFor="password" className="p-d-block mb-1">
                        Senha:
                      </label>
                      <Password
                        inputId="password"
                        name="password"
                        feedback={true}
                        header={header}
                        footer={footer}
                        className={
                          errors.password && touched.password ? 'p-invalid' : ''
                        }
                        value={values.password}
                        onChange={(e) =>
                          setFieldValue('password', e.target.value)
                        }
                        toggleMask
                      />
                      <ErrorMessage
                        name="password"
                        component="small"
                        className="p-error"
                      />
                    </div>
                    <div className="p-field mb-3">
                      <label
                        htmlFor="confirmPassword"
                        className="p-d-block mb-1"
                      >
                        Confirmar Senha:
                      </label>
                      <Password
                        inputId="confirmPassword"
                        name="confirmPassword"
                        feedback={false}
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? 'p-invalid'
                            : ''
                        }
                        value={values.confirmPassword}
                        onChange={(e) =>
                          setFieldValue('confirmPassword', e.target.value)
                        }
                        toggleMask
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="small"
                        className="p-error"
                      />
                    </div>
                    <div className="p-d-flex p-jc-end">
                      <Button
                        label={isSubmitting ? 'Atualizando...' : 'Atualizar'}
                        type="submit"
                        className="p-button-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <i className="pi pi-spin pi-spinner"></i>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </FormAuth>
      <ChaskiqScrip />
    </>
  );
};

ResetPasswordPage.propTypes = {
  searchParams: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResetPasswordPage;
