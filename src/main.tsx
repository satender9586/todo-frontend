
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';
import { ProtectedRoutes } from './lib/ProtectRoutes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/Store.tsx'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoutes>
            <App />
          </ProtectedRoutes>
        </BrowserRouter>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  
)
