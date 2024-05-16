import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import ProductsPage from './pages/Products';
import UserPage from './pages/User';
import CheckoutPage from './pages/Checkout';
import store from './state/store.js'

const router = createBrowserRouter([
  {
    path: "/",
      element: (<ProductsPage/>),
  },
  {
    path: "products",
    element: (<ProductsPage/>),
  },
  {
    path: "user",
    element: (<UserPage/>),
  },
  {
    path: "checkout",
    element: (<CheckoutPage/>),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);