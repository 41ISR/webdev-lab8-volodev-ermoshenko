import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/style.css"
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.jsx'
import { AuthProvider } from './store/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

// register service worker for basic PWA/offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(reg => console.log('SW registered', reg.scope))
      .catch(err => console.warn('SW registration failed', err));
  });
}
