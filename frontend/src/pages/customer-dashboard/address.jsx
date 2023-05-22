import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const Address = () => {

  const token = Cookies.get("userToken");
  const [loginUser, setLoginUser] = useState();

  useEffect(() => {
      setLoginUser(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("loginUser")) : null);
  }, []);

  if(loginUser && token){
    return (
      <>

        <Sidebar>
          <div className="w-[100%]">
            <div className="">

            </div>
          </div>
        </Sidebar>
      
      </>
    )
  }
}

export default Address;


Address.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}


