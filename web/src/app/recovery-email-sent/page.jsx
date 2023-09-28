'use client'
import React from 'react'
import { Card } from 'primereact/card'
import Link  from 'next/link'
import FormAuth from './style.jsx'
import { LogoContainer } from '@/components/sidebar/style.jsx'
import ChaskiqScrip from '@/components/chat/ChaskiqScrip'
import Image from "next/image";

/**
 * Componente de página informando que o e-mail de recuperação foi enviado.
 *
 * Este componente exibe uma mensagem ao usuário informando que o e-mail
 * de recuperação de senha foi enviado com sucesso.
 *
 * @return {React.Component} O componente renderizado.
 */
const RecoveryEmailSentPage = () => {
    return (
        <>
            <LogoContainer>
                <Image src={'/assets/logo/logo.png'} alt="Logo do Ariflix" width={80} height={40} />
            </LogoContainer>
            <FormAuth>
                <Card
                    title="E-mail de Recuperação Enviado"
                    style={{ width: '400px' }}
                    className="p-3 p-shadow-3"
                >
                    <div className="p-fluid p-text-center">
                        <p>
                            Um e-mail foi enviado para o seu endereço com instruções para
                            recuperar a sua senha. Por favor, verifique a sua caixa de
                            entrada.
                        </p>
                        <div className="p-mt-3 p-text-center mt-2">
                            <Link href="/login">Voltar para o Login</Link>
                        </div>
                    </div>
                </Card>
            </FormAuth>
            <ChaskiqScrip />
        </>
    )
}

export default RecoveryEmailSentPage
