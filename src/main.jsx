
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import AddContact from './components/AddContact.jsx';
import SignUp from './components/SignUp.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import EditContact from './components/EditContact.jsx';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/home/:id', element: <Home /> },
  { path: '/addConntact/:id', element: <AddContact /> },
  { path: '/Registrarse', element: <SignUp />},
  { path: '/editContact/:id/:idContacto', element: <EditContact /> } 

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
