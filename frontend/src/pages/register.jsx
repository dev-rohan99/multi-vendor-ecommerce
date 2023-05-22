import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import createToast from '../utility/createToast'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useRegisterMutation } from '../redux/api/apiSlice.js';


const register = () => {

    const router = useRouter();
    const [register] = useRegisterMutation();
    const [input, setInput] = useState({
        firstName : "",
        surName : "",
        email : "",
        phone : "",
        password : "",
        gender : "",
        birthDate : "",
        birthMonth : "",
        birthYear : "",
    });

    const [emailRegister, setEmailRegister] = useState(false);

    const handleEmailForm = (e) => {
        e.preventDefault();
        setEmailRegister(!emailRegister);
    }

    const handleCancelEmailForm = (e) => {
        e.preventDefault();
        setEmailRegister(!emailRegister);
    }

    const handleInputChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    }

    const handleEmailUserRegister = (e) => {

        e.preventDefault()
        if(!input.firstName || !input.surName || !input.phone || !input.password || !input.gender || !input.birthDate || !input.birthMonth || !input.birthYear){
            createToast("warn", "All Fields are required");
        }else{

            register(input).unwrap().then((res) => {
                setInput({
                    firstName : "",
                    surName : "",
                    email : "",
                    phone : "",
                    password : "",
                    gender : "",
                    birthDate : "",
                    birthMonth : "",
                    birthYear : ""
                });
                console.log(res);
                createToast("success", "Thanks for joining us. Please login your account!");
                router.push("/login");
            }).catch((error) => {
                createToast("warn", error.message);
            });

        }

    }


  return (
    <>
    
        { !emailRegister && <div className="py-[120px] flex items-center justify-center flex-col">
            <form onSubmit={handleEmailUserRegister}>
            <div className="w-[800px] mx-auto p-6 bg-[#fff] rounded-md shadow-md flex justify-between">

                <div className="w-[400px]">
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="phoneOrEmail">Enter your phone No.<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input name="phone" value={input.phone} onChange={handleInputChange} id="phoneOrEmail" type="text" className="outline-none p-3 w-[95%] rounded-md border-[2px] border-[#ccc] text-sm" placeholder="Please enter your phone No"/>
                    </div>

                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="password">Password<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input name="password" value={input.password} onChange={handleInputChange} id="password" type="password" className="outline-none text-sm p-3 w-[95%] rounded-md border-[2px] border-[#ccc]" placeholder="Please enter your password"/>
                    </div>

                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Gender<span className="text-[#d40707] text-[17px] mb-1">*</span></label>

                        <div className="flex justify-between w-[95%]">

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] rounded-md border-[#DDDFE2] rounded-r-none">
                                <input value="male" onChange={handleInputChange} className="w-[20%]" name="gender" type="radio" id="male" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="male">Male</label>
                            </div>

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] border-[#DDDFE2]">
                                <input value="female" onChange={handleInputChange} className="w-[20%]" name="gender" type="radio" id="female" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="female">Female</label>
                            </div>

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] rounded-md border-[#DDDFE2] rounded-l-none">
                                <input value="other" onChange={handleInputChange} className="w-[20%]" name="gender" type="radio" id="other" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="other">Other</label>
                            </div>

                        </div>
                    </div>

                    <div className="w-[95%]">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Date of Birth<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <div className="flex">
                            <input name="birthDate" value={input.birthDate} onChange={handleInputChange} type="number" className="rounded-l-md bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Date"/>
                            <input name="birthMonth" value={input.birthMonth} onChange={handleInputChange} type="number" className="rounded-none bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Month"/>
                            <input name="birthYear" value={input.birthYear} onChange={handleInputChange} type="number" className="rounded-r-lg bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Year"/>
                        </div>
                    </div>
                </div>

                <div className="w-[400px]">
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Enter your first name<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input name="firstName" value={input.firstName} onChange={handleInputChange} type="text" className="outline-none p-3 w-[100%] rounded-md text-sm border-[2px] border-[#ccc]" placeholder="Please enter your first name"/>
                    </div>

                    <div className="mb-3">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Enter your sur name<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input name="surName" value={input.surName} onChange={handleInputChange} type="text" className="outline-none p-3 w-[100%] rounded-md text-sm border-[2px] border-[#ccc]" placeholder="Please enter your sur name"/>
                    </div>

                    <button type="submit" className="outline-none p-[9px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[16px] font-semibold text-[#fff] bg-primary mb-3">Sign up</button>
                    
                    <button onClick={handleEmailForm} className="outline-none p-[9px] w-[100%] rounded-md border-[2px] border-secondary hover:bg-[#333333] text-[16px] font-semibold text-[#fff] bg-secondary mb-3">Sign up with email</button>

                    <div className="flex justify-between mt-[8px]">
                        <button className="outline-none p-[9.5px] w-[48%] rounded-md border-[2px] border-[#3B5998] hover:bg-[#5472b3] text-[16px] font-semibold text-[#fff] bg-[#3B5998]">FACEBOOK</button>

                        <button className="outline-none p-[9.5px] w-[48%] rounded-md border-[2px] border-[#E94235] hover:bg-[#f55b50] text-[16px] font-semibold text-[#fff] bg-[#E94235]">GOOGLE</button>
                    </div>
                </div>

            </div>
            </form>
        </div> }
    
        { emailRegister && <div className="h-[100vh] flex items-center justify-center flex-col">

            <div className="w-[800px] mx-auto p-6 bg-[#fff] rounded-md shadow-md flex justify-between">

                <div className="w-[400px]">
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="phoneOrEmail">Enter your email address<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input id="phoneOrEmail" type="text" className="outline-none p-3 w-[95%] rounded-md border-[2px] border-[#ccc] text-sm" placeholder="Please enter your email address"/>
                    </div>

                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="password">Password<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input id="password" type="password" className="outline-none text-sm p-3 w-[95%] rounded-md border-[2px] border-[#ccc]" placeholder="Please enter your password"/>
                    </div>

                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Gender<span className="text-[#d40707] text-[17px] mb-1">*</span></label>

                        <div className="flex justify-between w-[95%]">

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] rounded-md border-[#DDDFE2] rounded-r-none">
                                <input value="male" className="w-[20%]" name="gender" type="radio" id="male" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="male">Male</label>
                            </div>

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] border-[#DDDFE2]">
                                <input value="female" className="w-[20%]" name="gender" type="radio" id="female" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="female">Female</label>
                            </div>

                            <div className="w-[130px] p-3 flex items-center outline-none border-[1px] rounded-md border-[#DDDFE2] rounded-l-none">
                                <input value="other" className="w-[20%]" name="gender" type="radio" id="other" />
                                <label className="w-[80%] font-semibold text-[#2b2b2b]" htmlFor="other">Other</label>
                            </div>

                        </div>
                    </div>

                    <div className="w-[95%]">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="">Date of Birth<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <div className="flex">
                            <input type="number" className="rounded-l-md bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Date"/>
                            <input type="number" className="rounded-none bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Month"/>
                            <input type="number" className="rounded-r-lg bg-[#ddd] text-gray-900 outline-none focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-3 border-[2px] border-[#ccc]" placeholder="Year"/>
                        </div>
                    </div>
                </div>

                <div className="w-[400px]">
                    <div className="mb-4">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="password">Enter your first name<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input id="password" type="text" className="outline-none p-3 w-[95%] rounded-md text-sm border-[2px] border-[#ccc]" placeholder="Please enter your first name"/>
                    </div>

                    <div className="mb-3">
                        <label className="text-[14px] font-semibold text-lightGray cursor-pointer" htmlFor="password">Enter your sur name<span className="text-[#d40707] text-[17px] mb-1">*</span></label>
                        <input id="password" type="text" className="outline-none p-3 w-[95%] rounded-md text-sm border-[2px] border-[#ccc]" placeholder="Please enter your sur name"/>
                    </div>

                    <button type="submit" className="outline-none p-[9px] w-[100%] rounded-md border-[2px] border-primary hover:bg-[#3f86f0] text-[16px] font-semibold text-[#fff] bg-primary mb-3">Sign up</button>
                    
                    <button onClick={handleCancelEmailForm} className="outline-none p-[9px] w-[100%] rounded-md border-[2px] border-secondary hover:bg-[#333333] text-[16px] font-semibold text-[#fff] bg-secondary mb-3">Sign up with phone</button>

                    <div className="flex justify-between mt-[8px]">
                        <button className="outline-none p-[9.5px] w-[48%] rounded-md border-[2px] border-[#3B5998] hover:bg-[#5472b3] text-[16px] font-semibold text-[#fff] bg-[#3B5998]">FACEBOOK</button>

                        <button className="outline-none p-[9.5px] w-[48%] rounded-md border-[2px] border-[#E94235] hover:bg-[#f55b50] text-[16px] font-semibold text-[#fff] bg-[#E94235]">GOOGLE</button>
                    </div>
                </div>

            </div>
        </div> }
    
    </>
  )
}

export default register;

register.getLayout = function getLayout(page) {

    return (
      <>
        <Header />
        {page}
        <Footer />
      </>
    )
}
