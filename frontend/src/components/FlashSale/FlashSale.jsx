import Link from 'next/link'
import React from 'react'
import ProductCard from '../Product/ProductCard'

const FlashSale = () => {
  return (
    <>


      <h2 className="text-[22px] leading-7 text-secondary mb-3">Flash sale</h2>
      <div className="bg-white px-5 pt-2 pb-5">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-y-2 sm:gap-y-0 sm:items-center pb-2">
          <div className="flex  gap-10 items-center">
            <span className="capitalize text-primary text-sm hidden sm:block"> on sale now </span>
            <div className='flex gap-3 items-center'>
              <span className='text-sm'>Ending in </span>
              <div className='flex gap-2 items-center'>

                <span className=' w-7 h-7 sm:w-8 sm:h-8 text-center flex items-center justify-center rounded-sm  bg-primary text-white text-sm'>12</span>
                <span>:</span>
                <span className=' w-7 h-7 sm:w-8 sm:h-8 text-center flex items-center justify-center rounded-sm  bg-primary text-white text-sm'>12</span>
                <span>:</span>
                <span className=' w-7 h-7 sm:w-8 sm:h-8 text-center flex items-center justify-center rounded-sm  bg-primary text-white text-sm'>12</span>

              </div>
            </div>
          </div>
          <Link href="" className="border border-primary text-primary px-3 text-sm text-center sm:px-5 py-[6px]">Shop more</Link>
        </div>
        <div className="divider"></div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

      </div>


    </>
  )
}

export default FlashSale