import Link from "next/link";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useGetAllProductQuery } from "../redux/api/apiSlice.js";
import ProductCard from "../components/Product/ProductCard";
import { useRouter } from "next/router";
import { useState } from "react";

const Shop = () => {

  const router = useRouter();
  const [input, setInput] = useState({
    minPrice : "",
    maxPrice : ""
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const {data, isLoading, error} = useGetAllProductQuery({
    title : router.query.title, 
    minPrice : input.minPrice,
    maxPrice : input.maxPrice 
  });


  return (
    <>
    
      <section>
        <div className="container mx-auto flex justify-between py-[70px]">
          <div className="w-[250px] mr-5">
            <h2 className="text-[16px] leading-7 text-secondary mb-2">Category</h2>

            <ul className="pb-3 border-b-[3px] border-[#ddd]">
              <li className="leading-6"><Link className="text-[15px] text-secondary" href={"/"}>Security Software</Link></li>
              <li className="leading-6"><Link className="text-[15px] text-secondary" href={"/"}>Security Software</Link></li>
            </ul>

            <h2 className="text-[16px] leading-7 text-secondary mb-2 mt-3">Brand</h2>

            <ul className="pb-3 border-b-[3px] border-[#ddd]">
              <li class="flex items-center pl-4 border border-[#AEDEFF] rounded dark:border-gray-700 mt-2">
                  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="bordered-checkbox-1" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
              </li>
              <li class="flex items-center pl-4 border border-[#AEDEFF] rounded dark:border-gray-700 mt-2">
                  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="bordered-checkbox-1" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
              </li>

              <button class="bg-[#AEDEFF] text-[#017ACE] active:bg-[#87cbf8] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-3" type="button">See more</button>
            </ul>

            <ul className="pb-4 border-b-[3px] border-[#ddd] mt-4">
              <li class="flex items-center pl-4 border border-[#AEDEFF] rounded dark:border-gray-700 mt-2">
                  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="bordered-checkbox-1" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">In stock</label>
              </li>
              <li class="flex items-center pl-4 border border-[#AEDEFF] rounded dark:border-gray-700 mt-2">
                  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="bordered-checkbox-1" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Out of stock</label>
              </li>
            </ul>

            <h2 className="text-[16px] leading-7 text-secondary mb-2 mt-3">Price range</h2>

            <div className="flex justify-between items-center pb-4 border-b-[3px] border-[#ddd]">
              <input onChange={handleInputChange} value={input.minPrice} type="number" placeholder="min" name="minPrice" className="w-[47%] px-2 h-[35px] rounded text-blue-600 bg-gray-100 border-gray-300 outline-none border-[3px]"/>
              <input onChange={handleInputChange} value={input.maxPrice} type="number" placeholder="max" name="maxPrice" className="w-[47%] px-2 h-[35px] rounded text-blue-600 bg-gray-100 border-gray-300 outline-none border-[3px]"/>
              {/* <button onClick={handlePriceRangeSearch} className="bg-[#AEDEFF] text-[#017ACE] active:bg-[#87cbf8] font-bold uppercase text-sm px-3 py-[6.5px] rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150" type="button">GO</button> */}
            </div>

            <h2 className="text-[16px] leading-7 text-secondary mb-2 mt-3">Warranty Type</h2>

            <ul className="pb-4">
              <li class="flex items-center pl-4 border border-[#AEDEFF] rounded dark:border-gray-700 mt-2">
                  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                  <label for="bordered-checkbox-1" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No warranty</label>
              </li>
            </ul>
          </div>

          <div className="w-[100%]">
            <h2 className="text-[22px] leading-7 text-secondary mb-3">Just For You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

              {
                data?.product?.map((data, index) => (
                  <ProductCard key={index} productData={data} />
                ))
              }

            </div>
          </div>
        </div>
      </section>
    
    </>
  )
}


Shop.getLayout = function getLayout(page){

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}

export default Shop;

