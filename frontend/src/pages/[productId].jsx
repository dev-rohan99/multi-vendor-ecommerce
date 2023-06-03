import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ProductCard from '../components/Product/ProductCard';
import Rating from '../components/Rating/Rating';
import { useRouter } from 'next/router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useGetSingleProductQuery } from "../redux/api/apiSlice.js";
import Cookies from 'js-cookie';
import createToast from '../utility/createToast';


const SingleProduct = () => {

  const router = useRouter();
  const { productId } = router.query;
  const {data, isLoading, error} = useGetSingleProductQuery(productId);
  const [sliderItem, setSliderItem] = useState(data?.product?.photo);
  const [value, setValue] = useState(1);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [tab, setTab] = useState("description");
  const isLoggedIn = !!Cookies.get('userToken', { domain: 'http://localhost:3000' });

  if(value <= 0){
    setValue(1);
  }else if(value > 15){
    setValue(15);
  }

  const handleChangeQty = (e) => {
    console.log(e.target.value);
  }

  const handleSliderNext = () => {
    if (sliderIndex < data?.product?.photo.length - 1) {
      setSliderIndex(sliderIndex + 1)
    } else {
      setSliderIndex(0)
    }
  }

  const handleSliderPrev = () => {
    if (sliderIndex === 0) {
      setSliderIndex(data?.product?.photo.length - 1)
    } else {
      setSliderIndex(sliderIndex - 1);
    }
  }

  const handleAddToCard = () => {
    if(isLoggedIn){
      const products = JSON.parse(localStorage.getItem("cartItems")) || [];
      const item = products.find(item => item.id === data?.product?._id);
  
      if(!item){
        const newProduct = {
          id : data?.product?._id,
          title : data?.product?.title,
          description : data?.product?.description,
          price : data?.product?.discountPrice ? data?.product?.discountPrice : data?.product?.price,
          size : data?.product?.size ? data?.product?.size : null,
          color : data?.product?.color ? data?.product?.color : null,
          photo : data?.product?.photo[0],
          quantity : value,
          checked: true,
        };
        createToast("success", "Check your cart list and place order!");
        products.push(newProduct);
        localStorage.setItem("cartItems", JSON.stringify(products));
        console.log(JSON.stringify(products));
      }else{
        item.quantity += value;
        localStorage.setItem("cartItems", JSON.stringify(products));
        createToast("success", "Check your cart list and place order!");
        console.log(JSON.stringify(products));
      }
    }else{
      router.replace("/login");
    }
    
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!data || !data.product) {
    return <div>No data available</div>;
  }

  if(data?.product){

    return (
      <section className='py-10'>

        <div className='container mx-auto px-5'>
          <div className="bg-white">
            <div className='flex flex-col md:flex-row gap-10 px-7 py-5 rounded-md'>
              <div className='w-full  md:w-[50%] lg:w-[40%] '>

                <div className="slider sm:text-center">
                  <div className='h-[500px] max-w-[100%] sm:mx-auto md:mx-0 relative'>
                    {data?.product?.discount !== null && <span className=' bg-primary/80 text-sm top-2 left-2 px-2 py-[2px] rounded-full text-white absolute'>{data?.product?.discount}%</span>}
                    <Image className='h-full object-cover w-full' src={data?.product?.photo[sliderIndex]} alt="Image description" width={170} height={170}/>


                    <div className='absolute w-full flex justify-between top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                      <button onClick={handleSliderPrev} className='text-2xl text-secondary bg-white p-[6px] rounded-full'> <FaAngleLeft /> </button>
                      <button onClick={handleSliderNext} className='text-2xl text-secondary bg-white p-[6px] rounded-full'> <FaAngleRight /> </button>
                    </div>


                  </div>
                  <div className='flex gap-2 mt-2 sm:justify-center md:justify-start'>

                    {data?.product?.photo.map((item, index) =>


                      <div key={index} onClick={() => setSliderIndex(index)} className={`w-20 h-24 group overflow-hidden cursor-pointer  border hover:border-gray-400  ${sliderIndex == index ? "border-gray-400" : ""}`}>
                        <Image alt="Image description" width={170} height={170} className='object-cover h-full duration-300 group-hover:-translate-y-1' src={item} />
                      </div>


                    )}

                  </div>

                </div>





              </div>
              <div className=' w-full  md:w-[50%] lg:w-[60%] '>


                <h2 className='font-semibold text-xl text-secondary'>{data?.product?.title}</h2>
                <div className='flex gap2 mb-1 mt-3'>
                  <div className='text-primary flex items-center gap-1 text-sm'>
                    <Rating rate={data?.product?.reviewRating} />
                  </div>
                  <span className='text-sm text-lightGray'> ({data?.product?.totalReview} Reviews)</span>
                </div>

                <div className="divider"></div>

                <span className="text-primary font-semibold text-[29px] leading-[22px] mt-5 block mb-2">${data?.product?.discount === null ? data?.product?.price : data?.product?.discountPrice}</span>
                <div className="mb-4">
                  <span className="text-lightGray text-md leading-3 line-through">${data?.product?.discount === null ? "0" : data?.product?.price}</span>
                  <span className="text-md leading-3 text-secondary ml-2">{data?.product?.discount === null ? "0" : data?.product?.discount}%</span>
                </div>
                <p className='text-lightGray'>{data?.product?.description}</p>

                {data?.product?.color.length !== 0 && <div className='flex items-center gap-x-3 mb-5 mt-5'>
                  <span className='text-lightGray text-sm'>Color: </span>
                    <ul class="grid w-full gap-6 md:grid-cols-3">
                      {
                        data?.product?.color.map((data, index) => (
                          <li>
                            <input type="checkbox" id="react-option" value="" class="hidden peer" required=""/>
                            <label for="react-option" class="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-[3px] border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <Image alt="Image description" src={data} className="rounded-md" width={50} height={50}/>
                                </div>
                            </label>
                          </li>
                        ))
                      }
                    </ul>
                </div>}

                {data?.product?.size.length !== 0 && <div className='flex items-center gap-x-3 mb-5 mt-5'>
                  <span className='text-lightGray text-sm'>Size: </span>
                  <div className='flex items-center gap-2'>
                    <ul class="grid w-full gap-6 md:grid-cols-3">
                      {
                        data?.product?.size.map((data, index) => (
                          <li>
                            <input type="checkbox" id="react-option" value="" class="hidden peer" required=""/>
                            <label for="react-option" class="inline-flex items-center justify-between p-2 text-gray-500 bg-white border-[3px] border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                <div class="block">
                                    <h3 className="text-[16px] font-semibold uppercase">{data}</h3>
                                </div>
                            </label>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>}
                
                <div className='flex items-center gap-x-3 mb-5 mt-5'>
                  <span className='text-lightGray text-sm' >Quantity: </span>
                  <div className='flex items-center gap-3'>
                    <button onClick={() => setValue(value - 1)} className='p-[6px] bg-[#e5e5e5]   rounded-sm text-sm'><AiOutlineMinus /></button>
                    <input onChange={handleChangeQty} type="number" value={value} className="outline-none border-[2px] border-[#ddd] w-[55px] text-center rounded-md shadow-md py-2 px-3 appearance-none" />
                    <button onClick={() => setValue(value + 1)} className='p-[6px] bg-[#e5e5e5] rounded-sm text-sm'><AiOutlinePlus /></button>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <button className='btn bg-[#017ACE] text-white font-semibold shadow-md hover:bg-emerald-600 duration-300 px-7 py-3 rounded-md'>Buy now</button>
                  <button  onClick={handleAddToCard} className='btn hover:bg-primary hover:text-white font-semibold shadow-md duration-300 px-7 py-3 rounded-md'>Add to cart</button>
                </div>


                <div className='flex flex-col mt-7 gap-y-1'>
                  {data?.product?.category.length !== 0 && <span className='text-sm text-lightGray'>Category: {data?.product?.category.map((data, index) => (
                    <span className='text-[#AEDEFF] bg-[#ddd] p-1 rounded border-[2px] border-[#AEDEFF] font-semibold ml-3'>{data}</span>
                  ))}</span>}

                  {data?.product?.tag.length !== 0 && <span className='text-sm text-lightGray'>Tag: {data?.product?.tag.map((data, index) => (
                    <span className='text-[#AEDEFF] bg-[#ddd] p-1 rounded border-[2px] border-[#AEDEFF] font-semibold ml-3'>{data}</span>
                  ))}</span>}
                </div>



              </div>
            </div>




            <div className='px-5 my-10'>
              <div className='flex gap-x-7 pb-1'>
                <button onClick={() => setTab("description")} className={`font-semibold ${tab == "description" ? "text-secondary" : "text-lightGray " }`}>Description</button>
                <button onClick={() => setTab("reviews")} className={`font-semibold ${tab == "reviews" ? "text-secondary" : "text-lightGray " }`}>Reviews</button>
              
              </div>
              <div className="divider"></div>
              <div className='py-3'>

                {tab === "description" && <p>{data?.product?.description}</p>}

                {tab === "reviews" && <>

                  <div>
                    <h2 className='text-xl font-medium text-secondary mb-5'>1 review for Men Black Sports Shoes</h2>

                    <div className='space-y-5'>
                      <div className='flex flex-col gap-2 sm:gap-4 md:gap-5 md:flex-row items-start  md:items-center '>
                        <div className='min-w-[80px]'>
                          <Image src="/images/man.avif" height={500} width={500} alt="" className='rounded-full h-[50px] w-[50px] object-cover' />
                        </div>
                        <div className='bg-[#f5f5f5] p-5 rounded-md '>
                          <div className='flex items-center gap-10 justify-between mb-3'>
                            <div className='flex gap-3 items-center'>
                              <h3 className='font-semibold'>John doe</h3>
                              <span className='text-sm'>12/2/2021</span>
                            </div>
                            <div className='flex gap-1 text-primary text-sm'>
                              <Rating rate={3} />
                            </div>
                          </div>

                          <div>
                            <p className='text-gray-500 text-sm'>comment here </p>
                          </div>

                        </div>
                      </div>

                  

                    </div>

                  </div>


                </>}

              </div>


            </div>


              
            <div className="px-5 my-10">
              <div class="flex items-center mb-3 text-blue-600">
                <Rating rate={3} />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
              
              <div className="flex items-center mt-4 w-[500px]">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500 w-[50px]">5 star</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div className="h-5 bg-[#1B74E4] rounded w-[70%]"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
              </div>

              <div className="flex items-center mt-4 w-[500px]">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500 w-[50px]">4 star</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div className="h-5 bg-[#1B74E4] rounded w-[70%]"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
              </div>

              <div className="flex items-center mt-4 w-[500px]">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500 w-[50px]">3 star</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div className="h-5 bg-[#1B74E4] rounded w-[70%]"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
              </div>

              <div className="flex items-center mt-4 w-[500px]">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500 w-[50px]">2 star</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div className="h-5 bg-[#1B74E4] rounded w-[70%]"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
              </div>

              <div className="flex items-center mt-4 w-[500px]">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500 w-[50px]">1 star</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                      <div className="h-5 bg-[#1B74E4] rounded w-[70%]"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-500">70%</span>
              </div>
            </div>



            <h2 className='text-xl font-semibold px-5 py-2'>Related products</h2>
            <div className="divider mx-5"></div>
            <div className="grid grid-cols-1 px-5 mt-5 pb-5 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />

            </div>
          </div>


        </div>

      </section>
    )

  }
}

export default SingleProduct;


SingleProduct.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}
