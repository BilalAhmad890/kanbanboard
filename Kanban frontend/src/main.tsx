import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Home from './pages/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ], 
  },
]);


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
   </QueryClientProvider>
  </StrictMode>
)
