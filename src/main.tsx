import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl'
import { UnityIconsProvider } from '@payfit/unity-icons'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale="en" defaultLocale="en">
      <UnityIconsProvider>
        <App />
      </UnityIconsProvider>
    </IntlProvider>
  </StrictMode>,
)
