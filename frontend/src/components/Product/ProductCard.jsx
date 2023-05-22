import Image from "next/image";
import Link from "next/link";
import Rating from "../Rating/Rating";

const ProductCard = ({productData}) => {

  return (
    <>
      <div className="bg-white rounded-md border border-gray-200 overflow-hidden duration-150 hover:shadow-lg ">
        <Link href={`${productData?._id}`}>
          <>
            <div className="w-full min-h-[230px]">
              <Image src={productData?.photo[0]} height={100} width={230} alt="glass" className="mx-auto object-cover max-w-full" />
            </div>
            <div className="px-3 py-3">
              <h2 className="text-sm leading-[18px] text-secondary line-clamp-2">{productData?.title}</h2>
              <span className="text-primary font-semibold text-lg leading-[22px] pt-2 block">${productData?.discount === null ? productData?.price : productData?.discountPrice}</span>
              <div>
                <span className="text-lightGray text-xs leading-3 line-through">${productData?.discount === null ? "0" : productData?.price}</span>
                <span className="text-xs leading-3 text-secondary ml-2">{productData?.discount === null ? "0" : productData?.discount}%</span>
              </div>
              <div className="flex gap-1 mt-1">
                <div className="text-primary flex gap-1 text-sm">
                <Rating rate={productData?.reviewRating}/>
                </div>
                <span className="text-lightGray text-xs">{"("}{productData?.totalReview}{")"}</span>
              </div>
            </div>
          </>
        </Link>
      </div>
    
    </>


  )
}



export default ProductCard
