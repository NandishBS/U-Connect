import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux'
import store from './app/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withCredentials } from './app/interceptors/requestInterceptors.js';
import { tokenHandlerInterceptor } from './app/interceptors/responseInterceptors.js';

axios.interceptors.request.use(withCredentials)
axios.interceptors.response.use((response)=>{return response}, tokenHandlerInterceptor)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <App />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"/>
    </Provider>
);

