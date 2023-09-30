'use client';
import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { Password } from 'primereact/password';
import { Formik, ErrorMessage, Form } from 'formik';
import { Divider } from 'primereact/divider';
import FormAuth from './style.jsx';

import AuthService from '../../services/AuthService.js';
import { LogoContainer } from '@/components/sidebar/style.jsx';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import ChaskiqScrip from '../../components/chat/ChaskiqScrip';
import Image from 'next/image';
import Link from 'next/link';

const validationSchema = Yup.object({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),
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

const RegisterPage = ({ params }) => {
  const router = useRouter();
  const invite = params.invite;
  const toast = useRef(null);
  const canonicalUrl = `process.env.NEXT_PUBLIC_FRONT_URL${router.pathname}`;

  const showToast = (severity, summary) => {
    toast.current.show({ severity, summary, life: 3000 });
  };
  const cardTitle = invite ? 'Cadastro - Você Foi Convidado!' : 'Cadastro';

  return (
    <>
      <Head>
        <title>Register - Ariflix</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="description"
          content="Registre-se para acessar seus cursos de medicina de alta qualidade e totalmente credenciados."
        />
      </Head>
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
          title={cardTitle}
          style={{ width: '400px' }}
          className="p-3 p-shadow-3"
        >
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await AuthService.register({
                  nome: values.name,
                  username: values.email,
                  senha: values.password,
                  invite,
                });
                showToast('success', 'Registrado com sucesso!');
                router.push('/login');
              } catch (e) {
                showToast(
                  'error',
                  'Ocorreu ao se registrar. Por favor, verifique suas informações e tente novamente.',
                );
                console.error('Erro ao criar a conta:', error);
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
                      <label htmlFor="name" className="p-d-block mb-1">
                        Nome:
                      </label>
                      <InputText
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        className={
                          errors.name && touched.name ? 'p-invalid' : ''
                        }
                      />
                      <ErrorMessage
                        name="name"
                        component="small"
                        className="p-error"
                      />
                    </div>
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
                          onChange={(e) =>
                            setFieldValue('email', e.target.value)
                          }
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
                        label={isSubmitting ? 'Registrando...' : 'Registrar'}
                        type="submit"
                        className="p-button-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <i className="pi pi-spin pi-spinner"></i>
                        )}
                      </Button>
                      <p className="p-mt-3">
                        Já tem uma conta?
                        <Link href="/login" className="p-ml-2 ml-2">
                          Faça login aqui.
                        </Link>
                      </p>
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

export default RegisterPage;
