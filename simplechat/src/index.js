import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/authContext'
import { ChatProvider } from './contexts/chatContext'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ChatProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ChatProvider>
    </BrowserRouter>
);
