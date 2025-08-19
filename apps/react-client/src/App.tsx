import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth, AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import Login from './pages/Login';

import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
