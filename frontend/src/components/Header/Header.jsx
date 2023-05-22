import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Logo from "../../assets/images/logo3.svg";
import { AiOutlineHeart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { useGetAllProductQuery } from '../../redux/api/apiSlice';


const Header = () => {

    const router = useRouter();
    const [categoryShow, setCategoryShow] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const [loginUser, setLoginUser] = useState();
    const [searchTitle, setSearchTitle] = useState("");

    const handleCategoryMenu = (event) => {
        event.preventDefault();
        setCategoryShow(!categoryShow);
    }

    const handleMenuClick = (event) => {
        event.preventDefault();
        setUserMenu(!userMenu);
    }

    const handleLogOut = () => {
        localStorage.removeItem("loginUser");
        Cookies.remove("userToken");
        router.push("/shop");
        window.location.reload();
    }

    const handleInputChange = (e) => {
        setSearchTitle(e.target.value);
    }

    const handleSearch = () => {
        router.push(`/shop?title=${searchTitle}`);
    }

    useEffect(() => {
        setLoginUser(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("loginUser")) : null);
    }, []);
    

    return (
        <div className="shadow-md">
            
            <div className="bg-white border-b-[2px] border-[#eaeaea]">
                <ul className="flex items-center justify-center p-[.3rem]">
                    <li><Link href="/" className="topBarMenuItem mr-5">SAVE MORE FROM THE APP</Link></li>
                    <li><Link href="/" className="topBarMenuItem mr-5">DARAZ DONATES</Link></li>
                    <li><Link href="/" className="topBarMenuItem mr-5">CELL IN THE DRAWER</Link></li>
                    <li><Link href="/" className="topBarMenuItem mr-5">CUSTOMER SERVICE</Link></li>
                    <li><Link href="/" className="topBarMenuItem mr-5">ORDER TRACKING</Link></li>
                    {!loginUser && <li><Link href="/login" className="topBarMenuItem">SIGN UP / LOGIN</Link></li>}
                    {loginUser && <li className='relative cursor-pointer'>
                        <span onClick={handleMenuClick} className="topBarMenuItem uppercase">{loginUser.firstName + " " + loginUser.surName}'s Account</span>

                        {userMenu && <ul className="absolute z-50 rounded-b-md left-0 top-[30px] bg-white  py-3 shadow-lg w-[250px] mb-0">
                            <li><Link href="/customer-dashboard" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Manage my account</Link></li>
                            <li><Link href="/customer-dashboard/orders" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">My Orders</Link></li>
                            <li><Link href="/customer-dashboard/wishlist-followed-stores" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">My Wishlist & Followed Stores </Link></li>
                            <li><Link href="/customer-dashboard/reviews" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">My Reviews </Link></li>
                            <li><Link href="/customer-dashboard/returns" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">My Returns </Link></li>
                            <li><Link href="/customer-dashboard/cancellations" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">My Cancellations </Link></li>
                            <li onClick={handleLogOut}><span className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Logout</span></li>
                        </ul>}
                    </li>}
                </ul>
            </div>

            <div className="bg-white">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="w-[200px]">
                        <Link href="/" className="flex items-center justify-start py-1">
                            <Image width={60} height={60} src={Logo} className="w-[60px] h-[60px] object-fill" alt="" />
                            <h6 className="text-[30px] ml-2 font-semibold">MODERN</h6>
                        </Link>
                    </div>

                    <div className="w-[450px]">
                        <div className="flex">
                            <input type="text" onChange={handleInputChange} value={searchTitle} className="rounded-none rounded-l-lg bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="Search"/>

                            <span onClick={handleSearch} className="inline-flex cursor-pointer items-center px-3 text-sm text-white bg-primary rounded-r-md"><BsSearch className="w-[25px] h-[25px]"/></span>
                        </div>
                    </div>

                    <div className="w-[200px]">
                        <div className="flex items-center justify-end">
                            
                            <Link href="/wishlist" className="flex justify-center items-center mr-3 py-5 "><AiOutlineHeart className="w-[30px] h-[30px] mr-4" /></Link>
                            
                            <Link href="/cart" className="relative flex justify-center items-center mr-3 text-dark">
                                <>
                                    <FaShoppingCart className="w-[30px] h-[30px]"/>
                                    <span className=' absolute  -top-3 -right-2 bg-primary text-white  h-5 w-5 flex justify-center items-center rounded-full text-xs '>2</span> 
                                </>
                            </Link>

                            <Link onClick={handleCategoryMenu} href="/" className="py-5 ml-5 relative">
                                <span className="flex justify-center items-center">Categores <MdKeyboardArrowDown className="w-[20px] ml-1 h-[20px]"/></span>
                            
                                { categoryShow && <ul className="absolute z-50 rounded-b-md right-0 top-[67px] bg-white  py-3 shadow-lg w-[250px] mb-0">
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Boys Fashion</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Health</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Watches, Bags and Jewelry</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Baby and Toys</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Electronics</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Accessories</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Home and Lifestyle</Link></li>
                                    <li><Link href="/" className="text-[14px] py-1 px-5 hover:bg-[#ddd] w-[100%] block">Sports and outdoor activities</Link></li>
                                </ul> }
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
    
}

export default Header;
