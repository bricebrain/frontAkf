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

import Favoris from './pages/Favoris';
import Contact from './pages/Contact';



import Article from './pages/Article';



import CheckOut from './pages/CheckOut';

import Details from './pages/Details';
import AddOrEdit from './pages/AddOrEdit';
import Connexion from './pages/SignIn';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Commande from './pages/Commande';
import Stock from './pages/Stock';
import Analyse from './pages/Analyse';





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
    
    path: "/signin",
    element: <SignIn/>,
  },
  {
    
    path: "/commande",
    element: <Commande/>,
  },
  {
    
    path: "/signup",
    element: <SignUp/>,
  },
  {
    
    path: "/stock",
    element: <Stock/>,
  },

  {
    
    path: "/AddOrEdit",
    element: <AddOrEdit/>
  },
  {
    
    path: "/Article",
    element: <Article/>,
  },

  
  {
    
    path: "/CheckOut",
    element: <CheckOut/>,
  },

  {
    
    path: "/Contact",
    element: <Contact/>,
  },

  {
    
    path: "/Details",
    element: <Details/>,
  },
  {
    
    path: "/analyse",
    element: <Analyse/>,
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


