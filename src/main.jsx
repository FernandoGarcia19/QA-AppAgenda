import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './components/Home.jsx';
import AddContact from './components/AddContact.jsx';
import SignUp from './components/SignUp.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditContact from './components/EditContact.jsx';
import Profile from './components/Profile.jsx';


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/home/:id', element: <Home /> },
  { path: '/addConntact/:id', element: <AddContact /> },
  { path: '/Registrarse', element: <SignUp />},
  { path: '/editContact/:id/:idContacto', element: <EditContact /> },
  { path: '/Profile/:id/:idContacto', element: <Profile /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
