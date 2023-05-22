import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const Sidebar = (props) => {

    const router = useRouter();


    return (
        <>
        
            <div className="py-[70px]">
                <div className="container mx-auto flex justify-between items-start">
                
                <div className="w-[270px] bg-[#fff] rounded-md p-3 px-5 shadow-md mr-5">

                    <div className="">
                        <h2 className="text-[17px] font-semibold leading-7 text-secondary mb-2">Manage My Account</h2>

                        <ul className="pb-3 pl-4">
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard"}>Dashboard</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/profile" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/profile"}>My Profile</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/address" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/address"}>Address Book</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/payment" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/payment"}>My Payment Options</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/vouchers" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/vouchers"}>Vouchers</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/orders" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/orders"}>My Orders</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/returns" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/returns"}>My Returns</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/cancellations" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/cancellations"}>My Cancellations</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/reviews" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/reviews"}>My Reviews</Link></li>
                            <li className="leading-6"><Link className={`text-[15px] text-secondary ${router.pathname === "/customer-dashboard/wishlist-followed-stores" ? "font-semibold text-[#017ACE]" : ""}`} href={"/customer-dashboard/wishlist-followed-stores"}>Wishlist & Followed Stores</Link></li>
                            <li className="leading-6 mt-4 w-[90%] text-center border-[2px] border-[#c5c5c5] rounded shadow-md"><Link className="text-[15px] font-semibold text-secondary block py-2 px-4" href={"/"}>Sell On Modern</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="w-[80%]">
                    {props.children}
                </div>

                </div>
            </div>
        
        </>
    )
}

export default Sidebar;
