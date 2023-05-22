import Link from "next/link";
import Category from "../components/Category/Category";
import FlashSale from "../components/FlashSale/FlashSale";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import ProductCard from "../components/Product/ProductCard";
import Slider from "../components/Slider/Slider";
import { useGetAllProductQuery } from "../redux/api/apiSlice.js"


export default function Home() {

  const {data, isLoading, error} = useGetAllProductQuery();

  const handleProductShow = () => {

  }
  

  return (
    <>
      
      <Slider/>
      
      <section className=" bg-bgPrimary py-14">


        <div className="container mx-auto  px-3 sm:px-5">

          <FlashSale />


          <h2 className="text-[22px] leading-7 text-secondary mb-3 mt-10">Categories</h2>
          <div className="grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 divide-x divide-y">
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
            <Category />
          </div>


          <h2 className="text-[22px] leading-7 text-secondary mb-3 mt-10">Just For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

            {
              data?.product?.map((data, index) => (
                <ProductCard key={index} productData={data} />
              ))
            }

          </div>

          <div className="flex justify-center mt-[35px]">
            <div onClick={handleProductShow} className="cursor-pointer px-10 py-3 rounded-md text-[16px] block font-semibold text-[#017ACE] bg-[#AEDEFF] hover:bg-[#7ccafe] duration-500">Load More...</div>
          </div>
        </div>
      </section>

    </>
  )
}



Home.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}





