import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FaUserAlt, FaUserEdit } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import Cookies from 'js-cookie';

const Profile = () => {

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
                
                <div className="w-full px-4 mx-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                    <div className="px-6 mt-10">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                          <div className="relative">
                            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#AEDEFF] flex justify-center items-center">
                              <FaUserAlt className="text-4xl"/>
                            </div>
                          </div>
                        </div>
                        <div className="w-full px-4 text-center mt-5">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                22
                              </span>
                              <span className="text-sm text-blueGray-400">Orders</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                10
                              </span>
                              <span className="text-sm text-blueGray-400">Wishlist</span>
                            </div>
                            <div className="p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                89
                              </span>
                              <span className="text-sm text-blueGray-400">Reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-1">
                          {loginUser.firstName} {loginUser.surName}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          Los Angeles, California
                        </div>
                        {loginUser.phone && <div className="mb-1 text-blueGray-600 mt-3">
                          {loginUser.phone}
                        </div>}
                        {loginUser.email && <div className="mb-2 text-blueGray-600">
                          {loginUser.email}
                        </div>}
                      </div>
                      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                              <FaUserEdit className="text-2xl mr-3"/>
                              Edit your details
                            </button>

                            <button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mb-2">
                              <RiLockPasswordFill className="text-2xl mr-3"/>
                              Reset your password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Sidebar>
      
      </>
    )
  }

}

export default Profile;


Profile.getLayout = function getLayout(page) {

    return (
      <>
        <Header />
        {page}
        <Footer />
      </>
    )
  }

