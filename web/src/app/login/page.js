'use client';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Formik, Form, ErrorMessage } from 'formik';
import AuthService from '../../services/AuthService.js';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { login } from '@/store/authReducer.jsx';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Password } from 'primereact/password';
import FormAuth from './style.jsx';
import { Divider } from 'primereact/divider';
import { LogoContainer } from '@/components/sidebar/style.jsx';
import ChaskiqScrip from '@/components/chat/ChaskiqScrip';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Esquema de validação para o formulário de login.
 */
const validationSchema = Yup.object({
  username: Yup.string('Digite seu e-mail')
    .email('Digite um e-mail válido')
    .required('O nome de usuário é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

/**
 * Componente de página de login.
 *
 * Este componente permite que o usuário insira suas credenciais e faça login.
 *
 * @return {React.Component} O componente renderizado.
 */
const LoginPage = () => {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const canonicalUrl = `process.env.NEXT_PUBLIC_FRONT_URL`;

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
        <title>Login - Ariflix</title>
        <meta
          name="description"
          content="Faça login para acessar seus cursos de medicina de alta qualidade e totalmente credenciados."
        />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebPage',
            name: 'Login Page',
            description:
              'This page allows the user to enter their credentials and log in.',
            url: 'https://ariflix.app.br/login',
          })}
        </script>
      </head>
      <LogoContainer>
        <Image
          src={'/assets/logo/logo.png'}
          alt="Logo do Ariflix"
          width={96}
          height={42}
        />
      </LogoContainer>
      <FormAuth>
        <Toast ref={toast} />
        <Card
          title="Login"
          style={{ width: '400px' }}
          className="p-3 p-shadow-3"
        >
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await AuthService.auth({
                  username: values.username,
                  password: values.password,
                });
                showToast('success', 'Logado com sucesso!');
                AuthService.setUsuarioCorrente(response.data);
                dispatch(login(response.data));
                router.push('/?fromLogin=true');
              } catch (error) {
                showToast(
                  'error',
                  'Ocorreu um erro ao logar. Por favor, verifique suas credenciais e tente novamente.',
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
                    <label htmlFor="username" className="p-d-block mb-1">
                      Email:
                    </label>
                    <span className="p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <InputText
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={(e) =>
                          setFieldValue('username', e.target.value)
                        }
                        className={
                          errors.username && touched.username ? 'p-invalid' : ''
                        }
                      />
                    </span>
                    <ErrorMessage
                      name="username"
                      component="small"
                      className="p-error"
                    />
                  </div>
                  <div className="p-field mb-3">
                    <label htmlFor="password" className="p-d-block mb-1">
                      Senha:
                    </label>
                    <Password
                      inputId="password"
                      name="password"
                      feedback={false}
                      className={
                        errors.password && touched.password ? 'p-invalid' : ''
                      }
                      value={values.password}
                      onChange={(e) => {
                        setFieldValue('password', e.target.value);
                      }}
                      toggleMask
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="p-error"
                    />
                  </div>
                  <div className="p-d-flex p-jc-end">
                    <Button
                      label={isSubmitting ? 'Entrando...' : 'Entrar'}
                      type="submit"
                      className="p-button-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <i className="pi pi-spin pi-spinner"></i>
                      )}
                    </Button>
                    <div className="mt-3">
                      <Link href="/recover-password">Esqueceu a senha?</Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <Divider align="center" type="dashed">
            <b>OU</b>
          </Divider>
          <div className="p-mt-3 p-text-center">
            <span>Não tem uma conta? </span>
            <Link href="/register">Registrar-se</Link>
          </div>
        </Card>
      </FormAuth>
      <ChaskiqScrip />
    </>
  );
};

export default LoginPage;
