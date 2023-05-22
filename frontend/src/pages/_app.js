import "../styles/globals.css";
import "../components/Pagination/Pagination.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "../redux/api/apiSlice.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();
  const allowedRoutes = ['/login', '/register', '/', '/shop', "/[productId]"];
  // const allowedRoutesTwo = ['/customer-dashboard', '/customer-dashboard/reviews', '/customer-dashboard/orders', '/customer-dashboard/address', "/customer-dashboard/address", "/customer-dashboard/payment"];
  const [loginUser, setLoginUser] = useState(null);
  const isLoggedIn = !!Cookies.get('userToken', { domain: 'http://localhost:3000' });
  
  useEffect(() => {
    const token = Cookies.get('userToken', { domain: 'http://localhost:3000' });
    const isRestrictedRoute = !allowedRoutes.includes(router.pathname);
    const storedLoginUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("loginUser")) : null;
    setLoginUser(storedLoginUser);
  
    if (!isLoggedIn && isRestrictedRoute) {
      localStorage.removeItem("loginUser");
      router.replace('/login');
    } else if (isLoggedIn && !storedLoginUser && isRestrictedRoute) {
      router.replace('/customer-dashboard');
    } else if (isLoggedIn && storedLoginUser && (router.pathname === '/login' || router.pathname === '/register')) {
      if (storedLoginUser.role === "user") {
        router.replace('/customer-dashboard');
      } else if (storedLoginUser.role === "seller") {
        router.replace('/seller-dashboard');
      } else if (storedLoginUser.role === "admin") {
        router.replace('/admin-dashboard');
      }
    }
  }, [isLoggedIn, router.pathname]);

  return (
    <>
      <ToastContainer position="bottom-left" className="!z-[9999999999]" />
      <ApiProvider api={apiSlice}>
        {getLayout(<Component {...pageProps} />)}
      </ApiProvider>
    </>
  );
}



