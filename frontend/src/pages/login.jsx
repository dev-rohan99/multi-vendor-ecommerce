import Link from 'next/link';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useLoginMutation } from '../redux/api/apiSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import createToast from '../utility/createToast';

const login = () => {

    const router = useRouter();
    const [login] = useLoginMutation();
    const [input, setInput] = useState({
        phoneOrEmail : "",
        password : "",
    });

    const handleInputChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        if(!input.phoneOrEmail || !input.password){
            createToast("warn", "All fields required!");
        }else{
            login(input).unwrap().then((res) => {
                setInput({
                    phoneOrEmail : "",
                    password : "",
                });
                localStorage.setItem("loginUser", JSON.stringify(res.user));
                createToast("success", `Welcome back!`);
                router.push("/customer-dashboard");
                window.location.reload();
            }).catch((error) => {
                createToast("warn", error.message);
            });
        }
    }

    return (
        <>
        
            <div className="py-[120px] flex items-center justify-center flex-col">

                <div className="w-[800px] mx-auto p-6 bg-[#fff] rounded-md shadow-md mb-4">

                    <form onSubmit={handleLoginFormSubmit} className="w-[100%] flex justify-between items-center">
                        <div className="w-[500px]">
                            <div className="mb-4">
                                <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="phoneOrEmail">Enter your phone or email<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                                <input name="phoneOrEmail" value={input.phoneOrEmail} onChange={handleInputChange} id="phoneOrEmail" type="text" className="outline-none p-3 w-[95%] rounded-sm border-[2px] border-[#ccc]" placeholder="Please enter your phone or email"/>
                            </div>

                            <div className="">
                                <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="password">Password<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                                <input name="password" value={input.password} onChange={handleInputChange} id="password" type="password" className="outline-none p-3 w-[95%] rounded-sm border-[2px] border-[#ccc]" placeholder="Please enter your password"/>
                                <div className="flex justify-between w-[95%]">
                                    <Link href="/" className="text-[14px] mt-4 block text-primary hover:underline">Forgot password</Link>

                                    <Link href="/register" className="text-[14px] mt-4 block text-primary hover:underline">Register</Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-[300px]">
                            <button type='submit' className="outline-none p-[10px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[17px] font-semibold text-[#fff] bg-primary mb-3">LOGIN</button>

                            <h6 className="text-[14px] text-lightGray mb-2">OR</h6>

                            <button className="outline-none p-[10px] w-[100%] rounded-md border-[2px] border-[#3B5998] hover:bg-[#5472b3] text-[17px] font-semibold text-[#fff] bg-[#3B5998] mb-3">FACEBOOK</button>

                            <button className="outline-none p-[10px] w-[100%] rounded-md border-[2px] border-[#E94235] hover:bg-[#f55b50] text-[17px] font-semibold text-[#fff] bg-[#E94235]">GOOGLE</button>
                        </div>
                    </form>

                </div>
            </div>
        
        </>
    )
}

export default login


login.getLayout = function getLayout(page) {

    return (
      <>
        <Header />
        {page}
        <Footer />
      </>
    )
}
