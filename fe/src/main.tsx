import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import client from './api/index.api.ts'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer position='top-right' limit={3} />
    </ApolloProvider>
  </StrictMode>,
)
