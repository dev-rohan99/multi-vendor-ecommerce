import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const Payment = () => {

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

            

            <div className="bg-white rounded-md shadow-md">
              <div className="py-[100px] text-center text-[#b8b8b8] font-semibold text-[17px] w-[100%]">There are no payment options yet</div>
            </div>
          </div>
        </Sidebar>
      
      </>
    )
  }
}

export default Payment;


Payment.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}


