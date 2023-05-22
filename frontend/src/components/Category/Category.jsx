import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Category = () => {
  return (

    <Link href="" className='flex flex-col w-full h-[120px] justify-center items-center bg-white hover:drop-shadow-2xl cursor-pointer'>
      <>
        <Image src="/images/clock.jpg" height={80} width={80} alt="" className='mx-auto'/>
        <span className='text-sm mt-1'>Fashion</span>
      </>
    </Link>
  )
}

export default Category