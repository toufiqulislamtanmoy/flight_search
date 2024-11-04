import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FlightSearch from './pages/FlightSearch';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/flight/search",
    element: <FlightSearch />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
