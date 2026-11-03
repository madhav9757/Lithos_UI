import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { ToastProvider } from './components/ui/Toast'
import { ThemeProvider } from './core/ThemeProvider'

import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
)
