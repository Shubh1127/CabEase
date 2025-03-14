import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import CaptainAuthProvider from './context/CaptainContext.jsx';
import UserProvider from './context/UserContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SocketProvider>
        <CaptainAuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CaptainAuthProvider>
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
