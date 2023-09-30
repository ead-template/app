'use client';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Toast } from 'primereact/toast';
import FormAuth from './style.jsx';
import { LogoContainer } from '@/components/sidebar/style.jsx';
import AuthService from '@/services/AuthService.js';
import { useRouter } from 'next/navigation';
import ChaskiqScrip from '@/components/chat/ChaskiqScrip';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Esquema de validação para o formulário de recuperação de conta.
 */
const validationSchema = Yup.object({
  email: Yup.string('Digite seu e-mail')
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
});

/**
 * Componente de página de recuperação de conta.
 *
 * Este componente permite que o usuário insira seu e-mail para recuperar a conta.
 *
 * @return {React.Component} O componente renderizado.
 */
const AccountRecoveryPage = () => {
  const toast = useRef(null);
  const router = useRouter();
  const canonicalUrl = `process.env.NEXT_PUBLIC_FRONT_URL${router.pathname}`;

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
        <title>Recuperação de conta - Ariflix</title>
        <meta
          name="description"
          content="Recuperar sua conta em Ariflix a partir do email"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="Account Recovery, Ariflix, Email, Security, Segurança, Recuperação de conta"
        />
        <meta name="author" content="Renan Ribeiro Lage" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            name: 'Account Recovery Page',
            description:
              'This page allows the user to enter their email to recover their account.',
            url: 'https://ariflix.app.br/account-recovery',
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
          title="Recuperação de Conta"
          style={{ width: '400px' }}
          className="p-3 p-shadow-3"
        >
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await AuthService.recovery({
                  email: values.email,
                });
                router.push('/recovery-email-sent');
              } catch (error) {
                showToast(
                  'error',
                  'Ocorreu um erro ao enviar o e-mail de recuperação. Por favor, tente novamente.',
                );
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched, isSubmitting, setFieldValue, values }) => (
              <Form>
                <div className="p-fluid">
                  <div className="p-field mb-3">
                    <label htmlFor="email" className="p-d-block mb-1">
                      Email:
                    </label>
                    <span className="p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => setFieldValue('email', e.target.value)}
                        className={
                          errors.email && touched.email ? 'p-invalid' : ''
                        }
                      />
                    </span>
                    <ErrorMessage
                      name="email"
                      component="small"
                      className="p-error"
                    />
                  </div>
                  <div className="p-d-flex p-jc-end">
                    <Button
                      label={isSubmitting ? 'Enviando...' : 'Enviar'}
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
            )}
          </Formik>
          <div className="p-mt-3 p-text-center mt-2">
            <Link href="/login">Voltar para o Login</Link>
          </div>
        </Card>
      </FormAuth>
      <ChaskiqScrip />
    </>
  );
};

export default AccountRecoveryPage;
