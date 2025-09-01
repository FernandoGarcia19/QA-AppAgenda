
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import AddContact from './components/AddContact.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/home/:id', element: <Home /> },
  { path: '/addConntact/:id', element: <AddContact /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
