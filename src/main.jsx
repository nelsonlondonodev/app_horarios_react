import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx' // Import AppProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider> {/* Wrap App with AppProvider */}
      <App />
    </AppProvider>
  </StrictMode>,
)
