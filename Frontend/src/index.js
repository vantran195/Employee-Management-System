import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import ActiveAccount from './page/ActiveAccount';
import ChangePassword from './page/ChangePassword';
import Login from './page/Login';
import Profile from './page/Profile';
import Register from './page/Register';
import ResetPassword from './page/ResetPassword';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ResetPassword />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/active-account" element={<ActiveAccount />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
  </Provider>
);

reportWebVitals();
