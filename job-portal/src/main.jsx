import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './router/Router.jsx';
import { reduxStore } from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <Provider store={reduxStore}>
  <RouterProvider router={router} />
</Provider>
 
  
)
