import Link from "next/link";
import Image from "next/image";
import { AiFillHeart } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

const cart = () => {

    const [products, setProducts] = useState([]);
    const [checkCart, setcheckCart] = useState(false);

    const total = () => {
        let total = 0;
        products?.forEach(item => {
            if (item.checked) {
                total += item.quantity * item.price;
            }
        });
        return total;
    }

    const handleCartCheck = (e, index) => {
        const updatedProducts = [...products];
        updatedProducts[index] = {
            ...updatedProducts[index],
            checked: e.target.checked,
        };
        setProducts(updatedProducts);
    }

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
        const productsWithCheck = storedProducts.map((product) => ({
            ...product,
            checked: false,
        }));
        setProducts(productsWithCheck);
    }, []);

    return (
        <>
        
            <div className="py-[70px]">
                <div className="container mx-auto flex justify-between items-start">
                    
                    <div className="w-[864px]">
                        
                        <div className="p-4 rounded-md bg-[#fff] shadow-md mb-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <input className="w-[20px] h-[20px] rounded-md overflow-hidden" type="checkbox" id="selectAll" />
                                <label className="text-[15px] font-semibold text-lightGray ml-4" htmlFor="selectAll">Select All {`(103 item(s))`}</label>
                            </div>

                            <Link href="/" className="font-semibold px-3 rounded-md text-primary text-[15px]">DELETE ALL</Link>
                        </div>

                        <div className="bg-[#fff] rounded-md shadow-md">
                            {
                                products?.map((item, index) => (
                                    <div className="flex justify-between items-center p-3 mb-4">
                                        <input onChange={(e) => handleCartCheck(e, index)} className="w-[20px] h-[20px] rounded-md overflow-hidden" type="checkbox" id={"abcde" + index} checked={item.checked} />

                                        <label className="text-[15px] font-semibold text-lightGray ml-4" htmlFor={"abcde" + index}>
                                            <div className="w-[460px] flex items-center justify-start">
                                                <Image className="rounded-md sahdow-md overflow-hidden" width={100} height={100} src={item.photo} alt="productImage" />
                                                <Link href={`/${item.id}`} className="" target="_blank"><h1 className="text-[15px] ml-[20px] font-[500] text-lightGray w-[100%] cursor-pointer">{item.title}</h1></Link>
                                            </div>
                                        </label>

                                        <div className="w-[150px] text-left">
                                            <h1 className="text-[17px] font-[500] text-primary w-[100%] cursor-pointer mb-2">${item.price}</h1>
                                            <div className="flex justify-start">
                                                <Link className="w-[25px] h-[25px] rounded-md bg-primary text-[#fff] flex items-center justify-center" href="/"><AiFillHeart className="w-[17px] h-[17px]"/></Link>

                                                <Link className="w-[25px] h-[25px] rounded-md bg-primary text-[#fff] ml-2 flex items-center justify-center" href="/"><RiDeleteBin5Fill className="w-[17px] h-[17px]"/></Link>
                                            </div>
                                        </div>

                                        <div className="flex w-[170px]">
                                            <span className="rounded-l-md inline-flex items-center px-3 text-[20px] font-semibold text-[#fff] w-[50px] justify-center bg-primary cursor-pointer">-</span>

                                            <input name={"asdfg" + index} type="number" className="rounded-none text-center bg-[#0077ff80] text-[#1f1f1f] outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-[15px] px-3 py-3 font-semibold" placeholder="" value={item.quantity}/>

                                            <span className="inline-flex items-center px-3 text-[20px] font-semibold text-[#fff] w-[50px] justify-center bg-primary rounded-r-md cursor-pointer">+</span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        
                    </div>

                    <div className="w-[400px]">

                        <div className="p-4 bg-[#fff] rounded-md shadow-md">
                            <h1 className="text-[20px] mb-3 font-semibold text-lighGray">Order Summary</h1>

                            <div className="flex mb-3">
                                <input type="text" className="rounded-none rounded-l-md bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="Enter voucher code"/>

                                <Link href="/" className="inline-flex items-center px-3 text-sm font-semibold text-[#fff] w-[100px] justify-center bg-primary rounded-r-md">Apply</Link>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[16px] font-semibold text-lightGray">Total</h3>
                                <h3 className="text-[16px] font-semibold text-primary">${total()}</h3>
                            </div>

                            <Link href={"checkout"} className="outline-none p-[8px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[17px] font-semibold block text-[#fff] bg-primary mb-1 text-center">Process to checkout</Link>
                        </div>

                    </div>

                </div>
            </div>
        
        </>
    )
}

export default cart;


cart.getLayout = function getLayout(page) {

    return (
      <>
        <Header />
        {page}
        <Footer />
      </>
    )
}
