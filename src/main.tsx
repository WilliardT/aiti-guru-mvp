import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { rootStore } from './core/store/rootStore'
import AppErrorBoundary from './core/components/AppErrorBoundary/AppErrorBoundary.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={rootStore}>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </Provider>
  </StrictMode>,
)
