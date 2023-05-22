import Link from "next/link";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaAddressCard, FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const userDashboard = () => {

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
            <div className="grid grid-cols-3 gap-5">
              
              <div className="w-[317px] shadow-md py-[30px] rounded-lg bg-[#fff] p-4 pl-5 flex justify-center flex-col items-center text-white">
                  <div className="flex justify-between items-start w-[100%]">
                    <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-r from-[#81b8fb] flex justify-center items-center mb-4">
                        <FaUserCircle className="text-4xl"/>
                    </div>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[12px] px-4 py-[3px] pt-[5px] text-center mt-[-15px]">change</button>
                  </div>
                  <div className="w-[100%]">
                    <h3 className="text-[20px] block text-[#202020] font-semibold">{loginUser.firstName} {loginUser.surName}</h3>
                    <h3 className="text-[14px] text-[#202020] font-normal">{loginUser.email ? loginUser.email : loginUser.phone}</h3>
                  </div>
              </div>

              <div className="w-[317px] shadow-md py-[30px] rounded-lg bg-[#fff] p-4 pl-5 flex justify-center items-center text-white">
                  <div className="">
                    <div className="flex justify-between items-start w-[100%]">
                      <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-r from-[#81b8fb] flex justify-center items-center mb-4">
                          <FaAddressCard className="text-4xl"/>
                      </div>
                      <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[12px] px-4 py-[3px] pt-[5px] text-center mt-[-15px]">change</button>
                    </div>
                    <h3 className="text-[20px] block text-[#202020] font-semibold">{loginUser.firstName} {loginUser.surName}</h3>
                    <h3 className="text-[14px] text-[#202020] font-normal">Chanchuri bazar, Kalia, Narail, Khulna</h3>
                    <h3 className="text-[14px] text-[#202020] font-normal">{loginUser.email ? loginUser.email : loginUser.phone}</h3>
                  </div>
              </div>

              <div className="w-[317px] shadow-md py-[30px] rounded-lg bg-[#fff] p-4 pl-5 flex justify-center items-center text-white">
                  {/* <div className="">
                    <div className="flex justify-between items-start w-[100%]">
                      <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-r from-[#81b8fb] flex justify-center items-center mb-4">
                          <FaAddressCard className="text-4xl"/>
                      </div>
                      <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-[12px] px-4 py-[3px] pt-[5px] text-center mt-[-15px]">change</button>
                    </div>
                    <h3 className="text-[18px] text-[#202020] font-semibold">Rohan Mostofa</h3>
                    <h3 className="text-[14px] text-[#202020] font-normal">Chanchuri bazar, Kalia, Narail, Khulna</h3>
                    <h3 className="text-[14px] text-[#202020] font-normal">(+880) 1631699535</h3>
                  </div> */}
                  <Link href={"/"} className="py-3 px-6 rounded-md border-[2px] border-[#ddd] shadow-md text-[#202020]">Continue Shopping</Link>
              </div>

            </div>

            <div className="mt-5 p-5 bg-white rounded-md shadow-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                ORDER#
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    PLACE ON
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    ITEMS
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <div class="flex items-center">
                                    Price
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></a>
                                </div>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17
                            </th>
                            <td class="px-6 py-4">
                                <Image className="rounded-md overflow-hidden" src={"https://res.cloudinary.com/db31ne0yv/image/upload/v1683905513/rfk0lsjgfdevmbfzvjtf.webp"} alt="modern" width={50} height={50}/>
                            </td>
                            <td class="px-6 py-4">
                                Laptop
                            </td>
                            <td class="px-6 py-4">
                                $2999
                            </td>
                            <td class="px-6 py-4 text-right">
                                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Manage</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sidebar>
      
      </>
    )
  }
}

export default userDashboard;


userDashboard.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}


