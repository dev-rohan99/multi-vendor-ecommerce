import Link from "next/link"
import Image from "next/image"


const Footer = () => {
  return (
    <footer className="bg-[#017ACE] text-white py-10">
      <div className="container mx-auto gap-x-10 px-3 sm:px-5">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          <div>
            <h3 className="text-lg font-normal">Customer care</h3>
            <div className="flex flex-col space-y-1 mt-2">
              <Link href="/" className=" text-xs leading-[18px]  inline-block max-w-max  hover:underline">Help Center </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >How to Buy </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" > Returns & Refunds</Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Contact Us </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Terms & Conditions </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-normal">Earn with Modarn</h3>
            <div className="flex flex-col space-y-1 mt-2">
              <Link href="/" className=" text-xs leading-[18px]  inline-block max-w-max  hover:underline">Help Center </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >How to Buy </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" > Returns & Refunds</Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Contact Us </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Terms & Conditions </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-normal">Modarn</h3>
            <div className="flex flex-col space-y-1 mt-2">
              <Link href="/" className=" text-xs leading-[18px]  inline-block max-w-max  hover:underline">Help Center </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >How to Buy </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" > Returns & Refunds</Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Contact Us </Link>
              <Link href="/" className=" text-xs leading-[18px] inline-block max-w-max  hover:underline" >Terms & Conditions </Link>
            </div>
          </div>
        <div>
          <div className="flex gap-x-4 items-end">
            <Image src="/images/barcode.png" height={100} width={100} alt="barcode" className="rounded-[10px] w-20" />

              <div>
                <Image src="/images/barcode.png" height={45} width={45} alt="barcode" className="rounded-[10px] w-10" />
                <span className="text-sm sm:text-[15px]  font-normal">Download App</span>
            </div>
          </div>
          <div className="flex gap-2 mt-5 flex-wrap">
            <Image src="/images/app-store.png" height={40} width={120} alt="app store" className="border border-gray-800 rounded-md" />
              <Image src="/images/play-store.png" height={40} width={120} alt="play store" className="border border-gray-600 rounded-md" />
          </div>
        </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;


