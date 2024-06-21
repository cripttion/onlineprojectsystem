import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { UserManagement } from './StateManagement/UserManagement';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './../src/NewVersion/Redux/Store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <UserManagement>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserManagement>
    </Provider>
);


