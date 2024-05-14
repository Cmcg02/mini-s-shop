import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<>
      <h1>Root</h1>
      <nav>
        <Link to={"products"}>Products</Link><br/>
        <Link to={"user"}>User</Link><br/>
        <Link to={"checkout"}>Checkout</Link><br/>
      </nav>
      </>),
  },
  {
    path: "products",
    element: (<>
      <h1>Products</h1>
      <nav>
        <Link to={"/"}>Root</Link><br/>
        <Link to={"user"}>User</Link><br/>
        <Link to={"checkout"}>Checkout</Link><br/>
      </nav>
      </>),
  },
  {
    path: "user",
    element: (<>
      <h1>User</h1>
      <nav>
        <Link to={"products"}>Products</Link><br/>
        <Link to={"/"}>Root</Link><br/>
        <Link to={"checkout"}>Checkout</Link><br/>
      </nav>
      </>),
  },
  {
    path: "checkout",
    element: (<>
      <h1>Checkout</h1>
      <nav>
        <Link to={"products"}>Products</Link><br/>
        <Link to={"user"}>User</Link><br/>
        <Link to={"/"}>Root</Link><br/>
      </nav>
      </>),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>  
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
