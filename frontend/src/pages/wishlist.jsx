import Image from 'next/image';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { RxCross2 } from 'react-icons/rx'

const Wishlist = () => {
  return (
    <section className='bg-white py-10 my-10'>
      <div className='container mx-auto'>
        <h2 className='font-bold text-2xl text-secondary'>My wishlist on Modern</h2>
        <div className='mt-4'>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 ">
              <thead class="text-sm text-gray-700 uppercase ">
                <tr>
                  <th scope="col" class="px-6 py-3 w-[500px]">
                    Product
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Stock Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y'>
                <tr class="bg-white border-b">

                  <td class="px-6 py-4 flex items-center gap-x-5 ">
                    <div className='relative'>
                      <Image src="/images/clock.jpg" height={500} width={500} alt='' className='w-20' />
                      <button className='bg-white p-1 drop-shadow-lg rounded-full text-secondary absolute top-0 right-0 group hover:text-primary'>
                        <RxCross2 />
                        <span className='bg-gray-700 -top-7 left-0 text-white text-xs absolute min-w-max px-1 py-1 rounded-sm font-extralight opacity-0 duration-300 group-hover:opacity-100'>Remove product</span>
                      </button>
                    </div>
                    <span>Stylish clock for men</span>
                  </td>
                  <td class="px-6 py-4">
                    Sliver
                  </td>
                  <td class="px-6 py-4">
                    Laptop
                  </td>
                  <td class="px-6 py-4">
                    <div className='flex gap-x-2'>
                      <button className='btn bg-bgPrimary text-secondary font-medium'>Quick view</button>
                      <button className='btn  font-medium'>Add to cart</button>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  )
}




Wishlist.getLayout = function getLayout(page) {

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}




export default Wishlist;