import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <div className="bg-[#EFF6FF]">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router}></RouterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </div>
    </HelmetProvider>
  </StrictMode>,
)
