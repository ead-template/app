// ChaskiqScript.js
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ChaskiqScript = () => {
  const auth = useSelector((state) => state.auth)

  /**
   * Creates a script element for embedding a Chaskiq messenger.
   *
   * @param {boolean} isLoggedIn - Indicates if the user is logged in.
   * @return {HTMLElement} The script element.
   */
  const createScript = (isLoggedIn) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = true
    script.src = 'https://chaskiq-app-9884h.ondigitalocean.app/embed.js'
    script.onload = () => {
      const browserLang = navigator.language || 'pt_BR'
      new window.ChaskiqMessengerEncrypted({
        domain: 'https://chaskiq-app-9884h.ondigitalocean.app',
        ws: 'wss://chaskiq-app-9884h.ondigitalocean.app/cable',
        app_id: 'tEsERFPdrG8yrHNGL28fvYv1',
        data: isLoggedIn
          ? {
              email: auth.user.username,
              identifier_key: auth.user.chat,
              properties: { aluno: auth.user.aluno, name: auth.user.name },
            }
          : {},
        lang: browserLang,
      })
    }
    return script
  }

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://chaskiq-app-9884h.ondigitalocean.app/embed.js"]',
    )
    if (existingScript) {
      existingScript.remove()
    }

    const newScript = createScript(auth.isLoggedIn)
    document.head.appendChild(newScript)
  }, [auth.isLoggedIn])

  return null
}

export default ChaskiqScript
