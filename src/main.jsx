import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root';
import ErrorPage from './error-page';
import Books, {loader as booksLoader} from './routes/books';
import Authors, {loader as authorsLoader} from './routes/authors';
import Home , {loader as homeLoader} from './routes/home';
import Signup from './routes/signup';
import Login from './routes/login';
import Book, {loader as bookLoader} from './routes/book';
import Author, {loader as authorLoader} from './routes/author';
import { UserProvider } from './UserContext';
import Cart from './routes/cart';
import { ProductProvider } from './productContext';
import UserProfile from './routes/userProfile';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: homeLoader
      },
      {
        path: "/books",
        element: <Books />,
        errorElement: <ErrorPage />,
        loader : booksLoader
      },
      {
        path: "/books/book/:id",
        element: <Book />,
        errorElement: <ErrorPage />,
        loader: bookLoader
      },
      {
        path: "/authors",
        element: <Authors />,
        errorElement: <ErrorPage />,
        loader :authorsLoader
      },
      {
        path: "/authors/author/:id",
        element: <Author />,
        errorElement: <ErrorPage />,
        loader : authorLoader
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/userProfile",
        element: <UserProfile />,
        errorElement: <ErrorPage />,
      },
      
    ]
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
      <RouterProvider router={router} />
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>,
)
