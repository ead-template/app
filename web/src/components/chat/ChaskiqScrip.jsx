'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ChaskiqScript = () => {
  const auth = useSelector((state) => state.auth);
  const [shouldLoadScript, setShouldLoadScript] = useState(false);

  useEffect(() => {
    // Supondo que você deseja recarregar o script toda vez que auth.isLoggedIn mudar
    setShouldLoadScript(false);
    setShouldLoadScript(true);
  }, [auth.isLoggedIn]);

  return (
      shouldLoadScript && (
          <Script
              strategy="afterInteractive"
              src="https://chaskiq-app-9884h.ondigitalocean.app/embed.js"
              onLoad={() => {
                const browserLang = navigator.language || 'pt_BR';
                new window.ChaskiqMessengerEncrypted({
                  domain: 'https://chaskiq-app-9884h.ondigitalocean.app',
                  ws: 'wss://chaskiq-app-9884h.ondigitalocean.app/cable',
                  app_id: 'tEsERFPdrG8yrHNGL28fvYv1',
                  data: auth.isLoggedIn
                      ? {
                        email: auth.user.username,
                        identifier_key: auth.user.chat,
                        properties: { aluno: auth.user.aluno, name: auth.user.name },
                      }
                      : {},
                  lang: browserLang,
                });
              }}
          />
      )
  );
};

export default ChaskiqScript;
