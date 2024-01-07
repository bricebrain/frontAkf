import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Provider} from 'react-redux';
import store from './redux/store/store'

import './index.css';

import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Add from './pages/Add';
import Favoris from './pages/Favoris';
import Contact from './pages/Contact';



import Article from './pages/Article';
import Ajouter from './pages/Ajouter';
import History from './pages/History';
import Edit from './pages/Edit';
import EditList from './pages/EditList';
import CheckOut from './pages/CheckOut';
import Form from './pages/Form';

import Details from './pages/Details';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,

  },
  {
    path: "/splash",
    element: <Home/>,

  },
  {
    
    path: "/Products",
    element: <Products/>,
  },
  {
    
    path: "/Favoris",
    element: <Favoris/>,
  },
  {
    
    path: "/admin",
    element: <Admin/>,
  },
  {
    
    path: "/edition",
    element: <Edit/>,
  },
  {
    
    path: "/add",
    element: <Add/>,
  },
  {
    
    path: "/Ajouter",
    element: <Ajouter/>
  },
  {
    
    path: "/Article",
    element: <Article/>,
  },

  {
    
    path: "/Edit",
    element: <Edit/>,
  },
  {
    
    path: "/history",
    element: <History/>,
  },
  {
    
    path: "/EditList",
    element: <EditList/>,
  },
  {
    
    path: "/CheckOut",
    element: <CheckOut/>,
  },
  {
    
    path: "/Form",
    element: <Form/>,
  },
  {
    
    path: "/Contact",
    element: <Contact/>,
  },

  {
    
    path: "/Details",
    element: <Details/>,
  },
  
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);


