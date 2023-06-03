import Link from "next/link";
import Image from "next/image";
import {RxCross1} from "react-icons/rx";
import {FaCheckCircle} from "react-icons/fa";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useUpdateUserMutation } from "../redux/api/apiSlice.js";
import createToast from "../utility/createToast";

const Checkout = () => {

    const [location, setLocation] = useState(false);
    const [loginUser, setLoginUser] = useState();
    const [updateUser] = useUpdateUserMutation();
    const [products, setProducts] = useState([]);

    const [input, setInput] = useState({
        phone : "",
        city : "",
        area : "",
        address : "",
        deliveryZone : ""
    });

    const total = () => {
        let total = 0;
        products?.forEach(item => {
            if (item.checked) {
                total = item.quantity * item.price;
            }
        });
        return total;
    }

    const handleLocation = (e) => {
        e.preventDefault();
        setLocation(true);
    }

    const handleClose = (e) => {
        e.preventDefault();
        setLocation(false);
    }

    useEffect(() => {
        setLoginUser(typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("loginUser")) : null);
        if (loginUser) {
            setInput({
              phone : loginUser.phone || "",
              city : loginUser.city || "",
              area : loginUser.area || "",
              address : loginUser.address || ""
            });
        }

        const storedProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
        const productsWithCheck = storedProducts.map((product) => ({
            ...product,
            checked: false,
        }));
        setProducts(productsWithCheck);

    }, [loginUser, products]);

    const handleInputChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!input.phone || !input.city || !input.area || !input.address || !input.deliveryZone){
            createToast("warn", `All fields are required!`);
        }else{
            updateUser(input, loginUser?._id).unwrap().then((res) => {
                localStorage.setItem("loginUser", JSON.stringify(res.user));
                createToast("success", `Updated!`);
            }).catch((error) => {
                createToast("warn", error.message);
            });
        }
    }


    return (
        <>
        
            <div className="py-[70px]">
                <div className="container mx-auto flex justify-between items-start">
                    
                    <div className="w-[864px]">
                        
                        <div className="p-5 bg-[#fff] shadow-md mb-4 rounded-md">
                            <h3 className="text-[15px] font-semibold">Delivery to <span className="text-primary">{loginUser?.firstName} {loginUser?.surName}</span></h3>

                            <div className="mt-2 flex justify-between w-[100%]">
                                <div className="w-[80%]">
                                    {loginUser?.deliveryZone ? <button className="py-[3px] px-2 rounded-md text-[#fff] text-[14px] font-semibold bg-[#3292ff]">{loginUser?.deliveryZone} Delivery</button> : ""}

                                    {loginUser?.phone && <button className="py-[3px] px-2 rounded-md text-[#fff] text-[14px] font-semibold bg-lightGray ml-3">{loginUser?.phone}</button>}

                                    { loginUser?.area && loginUser?.address && loginUser?.city && <button className="py-[3px] px-2 rounded-md text-[#fff] text-[14px] font-semibold bg-lightGray ml-3">{loginUser?.area}, {loginUser?.address}, {loginUser?.city}</button>}

                                    <br/>

                                    {loginUser?.email && <button className="py-[3px] mt-3 px-2 rounded-md text-[#fff] text-[14px] font-semibold bg-lightGray">{loginUser?.email}</button>}
                                </div>

                                <div className="w-[10%] text-right">
                                    <Link onClick={handleLocation} href="/" className="py-[3px] px-2 rounded-md text-[#fff] text-[14px] font-semibold bg-[#222222] ml-2 cursor-pointer active:bg-[#3292ff] block">Change</Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#fff] shadow-md rounded-md p-5">
                            {products.map((item) => (<div className="flex justify-between items-center py-2 border-y-[2px] border-[#ccc]">

                                <div className="w-[460px] flex items-center justify-start">
                                    <Image className="rounded-md sahdow-md overflow-hidden" width={100} height={100} src={item.photo} alt="productImage" />
                                    <Link target="_blank" href={item.id}><h1 className="text-[15px] ml-[15px] font-[500] text-lightGray w-[100%] cursor-pointer">{item.title}</h1></Link>
                                </div>

                                <div className="w-[150px] text-left">
                                    <h1 className="text-[17px] font-[500] text-primary w-[100%] cursor-pointer">QTY{`(${item.quantity})`}</h1>
                                </div>

                                <div className="w-[150px] text-right">
                                    <h1 className="text-[17px] font-[500] text-primary w-[100%] cursor-pointer">${item.quantity * item.price}</h1>
                                </div>

                            </div>))}

                            <div className="w-[250px] border-t-[1px] shadow-md mt-6 rounded-lg border-x-[4px] border-primary p-3">
                                <h1 className="flex justify-between items-center text-[14px] font-semibold text-primary mb-1">Standard Delivery <span>$85</span></h1>
                                <p className="text-[14px] font-semibold text-lightGray">Receive by 9 Feb - 12 Feb</p>
                            </div>
                        </div>
                        
                    </div>

                    <div className="w-[400px]">

                        <div className="p-5 bg-[#fff] shadow-md rounded-md">
                            <h1 className="text-[18px] mb-3 font-semibold text-lighGray">Discount and Payment</h1>

                            <div className="flex mb-3">
                                <input type="text" className="rounded-none rounded-l-md bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="Enter store/modern code"/>

                                <Link href="/" className="inline-flex items-center px-3 text-sm font-semibold text-[#fff] w-[100px] justify-center bg-primary rounded-r-md">Confirm</Link>
                            </div>

                            <h1 className="text-[18px] mb-3 font-semibold text-lighGray">Oder Summary</h1>

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[16px] font-semibold text-lightGray">Items Total</h3>
                                <h3 className="text-[16px] font-semibold text-primary">${total()}</h3>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[16px] font-semibold text-lightGray">Delivery Fee</h3>
                                <h3 className="text-[16px] font-semibold text-primary">$85</h3>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-[16px] font-semibold text-lightGray">Total Payment</h3>
                                <h3 className="text-[16px] font-semibold text-primary">$385</h3>
                            </div>

                            <Link href={"user-dashboard"} className="outline-none p-[8px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[17px] font-semibold text-[#fff] block text-center bg-primary mb-1">Place order</Link>
                        </div>

                    </div>

                </div>
            </div>

            {location && <div className="w-[100%] h-[100vh] bg-[#ffffffa6] flex items-center justify-center fixed left-0 top-0 bottom-0 right-0">

                <div className="w-[700px] h-auto rounded-md shadow-lg bg-[#fff] p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 border-b-[2px] border-[#ccc]">
                        <h1 className="text-[20px] font-semibold">My Delivery Address</h1>
                        <Link onClick={handleClose} href={""} className="w-[40px] h-[40px] hover:bg-[#bdbdbd] rounded-full bg-[#d3d3d3] flex items-center justify-center"><RxCross1 className="w-[25px] h-[25px]"/></Link>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div className="flex justify-between">
                            <div className="w-[50%] pr-2">

                                <div className="mb-3">
                                    <label className="text-[14px] font-semibold text-secondary mb-2" htmlFor="phone">Phone number</label>
                                    <input onChange={handleInputChange} name="phone" value={input.phone} id="phone" type="text" className="rounded-md bg-bgPrimary text-secondary outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="Phone number"/>
                                </div>

                                <div className="mb-3">
                                    <label className="text-[14px] font-semibold text-secondary mb-2" htmlFor="divition">City</label>
                                    <input onChange={handleInputChange} name="city" value={input.city} id="divition" type="text" className="rounded-md bg-bgPrimary text-secondary outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="City"/>
                                </div>

                                <div className="mb-3">
                                    <label className="text-[14px] font-semibold text-secondary mb-2" htmlFor="address">Address</label>
                                    <input onChange={handleInputChange} name="address" value={input.address} id="address" type="text" className="rounded-md bg-bgPrimary text-secondary outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="Address"/>
                                </div>

                                <div className="mb-3">
                                    <label className="text-[14px] font-semibold text-secondary mb-2" htmlFor="area">Area</label>
                                    <input onChange={handleInputChange} name="area" value={input.area} id="area" type="text" className="rounded-md bg-bgPrimary text-secondary outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm px-3 py-3" placeholder="area"/>
                                </div>
                            </div>

                            <div className="w-[50%] pl-2">

                                <div className="mb-3">
                                    <label className="text-[14px] font-semibold text-secondary mb-2" htmlFor="">Select delivery zone</label>

                                    <div className="flex justify-between mt-3">

                                        <label className="w-[50%] mr-2 ml-2 deliveryZoneBlock">
                                            <input onChange={handleInputChange} name="deliveryZone" value={"Home"} type="radio" className="hidden"/>
                                            <div className="w-[100%] rounded-md bg-bgPrimary outline-none focus:border-blue-500 block flex-1 min-w-0 py-5 shadow-lg relative deliveryZoneChecked">
                                                <h3 className="text-center font-semibold text-[16px] text-[#2b2b2b]">Home</h3>
                                                <FaCheckCircle className="text-[25px] absolute left-[-7px] top-[-7px] z-5 checkIcon"/>
                                            </div>
                                        </label>

                                        <label className="w-[50%] ml-4 deliveryZoneBlock">
                                            <input onChange={handleInputChange} name="deliveryZone" value={"Office"} type="radio" className="hidden"/>
                                            <div className="relative w-[100%] rounded-md bg-bgPrimary outline-none focus:border-blue-500 block flex-1 min-w-0 py-5 shadow-lg deliveryZoneChecked">
                                                <h3 className="text-center font-semibold text-[16px] text-[#2b2b2b]">Office</h3>
                                                <FaCheckCircle className="text-[25px] absolute left-[-7px] top-[-7px] z-5 checkIcon"/>
                                            </div>
                                        </label>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="outline-none p-[8px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[17px] font-semibold text-[#fff] bg-primary">SAVE LOCATION</button>
                    </form>
                </div>

            </div>}
        
        </>
    )
}

export default Checkout;

Checkout.getLayout = function getLayout(page) {

    return (
      <>
        <Header />
        {page}
        <Footer />
      </>
    )
}
