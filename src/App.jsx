import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";


import SingleProductsPage from "./pages/SingleProductsPage";
import CartsPage from "./pages/CartsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/Loginpage";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import QuotationsPage from "./pages/Dashboard/QuotationsPage";
import CheckQuotationsPage from "./pages/admin/CheckQuotationsPage";
import UsersPage from "./pages/admin/UsersPage";
import MainLayout from "./layouts/MainLayout";


const router = createBrowserRouter([

  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:
          <RootLayout />
        ,
        children: [
          {
            index: true,
            element: <LandingPage />
          },

          {
            path: 'products',

            children: [
              {
                index: true,
                element: <ProductPage />
              }
            ]
          },
          {
            path: 'products/:slug',
            element: <SingleProductsPage />
          },
          {
            path: 'cart',
            element:
              <CartsPage />

          },
        ]
      },

      {
        path: 'sign-up',
        element:

          <SignUpPage />

      },
      {
        path: 'login',
        element:
          <LoginPage />

      },
      {
        path: '/user/:user',
        element:

          <DashBoardLayout />
        ,
        children: [
          {
            index: true,
            element: <ProfilePage />
          },
          {
            path: 'quotations',
            element: <QuotationsPage />
          },
          {
            path: 'users',
            element: <UsersPage />
          },
        ]
      },
      {
        path: '/checkQuotation/:id',
        element:
          <CheckQuotationsPage />
      }
    ]
  },

])



export default function App() {
  return (


    <RouterProvider router={router} />

  )
}