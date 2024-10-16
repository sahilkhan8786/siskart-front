import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import ProductsPageLayout from "./layouts/ProductsPageLayout";

import SingleProductsPage from "./pages/SingleProductsPage";
import { ProductsPageViewContextProvider } from "./context/ProductsPageViewContext";
import CartsPage from "./pages/CartsPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/Loginpage";
import { AuthContextProvider } from "./context/AuthContext";
import DashBoardLayout from "./layouts/DashBoardLayout";
import ProfilePage from "./pages/Dashboard/ProfilePage";
import QuotationsPage from "./pages/Dashboard/QuotationsPage";
import CheckQuotationsPage from "./pages/admin/CheckQuotationsPage";
import UsersPage from "./pages/admin/UsersPage";
import { CartContextProvider } from "./context/CartContext";


const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AuthContextProvider>
        <ProductsPageViewContextProvider>
          <RootLayout />
        </ProductsPageViewContextProvider>
      </AuthContextProvider>


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
        element: <CartsPage />
      },


    ]
  },
  {
    path: 'sign-up',
    element:
      <AuthContextProvider>
        <CartContextProvider>

          <SignUpPage />
        </CartContextProvider>
      </AuthContextProvider>
  },
  {
    path: 'login',
    element: <AuthContextProvider>
      <CartContextProvider>

        <LoginPage />
      </CartContextProvider>
    </AuthContextProvider>
  },
  {
    path: '/user/:user',
    element:
      <AuthContextProvider>
        <DashBoardLayout />
      </AuthContextProvider >,
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
      <AuthContextProvider>
        <CheckQuotationsPage />
      </AuthContextProvider>
  }
])



export default function App() {
  return (
    <RouterProvider router={router} />
  )
}