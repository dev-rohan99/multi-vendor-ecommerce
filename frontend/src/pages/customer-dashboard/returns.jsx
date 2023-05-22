import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const Returns = () => {

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
              <div className="h-[300px] flex justify-center flex-col items-center w-[100%]">
                <h3 className="text-center text-[#b8b8b8] font-semibold mb-5 text-[17px]">There are no returns yet</h3>
                <Link href={"/"} className="py-3 px-6 rounded-md border-[2px] border-[#ddd] shadow-md text-[#202020]">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </Sidebar>
      
      </>
    )
  }
}

export default Returns;


Returns.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}


