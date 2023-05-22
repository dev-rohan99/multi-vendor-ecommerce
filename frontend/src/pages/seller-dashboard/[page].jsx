import { useRouter } from 'next/router';


const Index = () => {
  const { query } = useRouter();
  const page = query.page;

  return (
    <>
      <div className="flex min-h-screen bg-gray-600">
        <div className="w-[260px] ">
          ggg
        </div>
        <div className="w-[calc(104%-260px)]">
          ggg
          <div className="p-5">
            {page === "product" && <Product />}
            {page === "add-product" && <AddProduct />}
            {page === "add-category" && <AddCategory />}
            {page === "category" && <Category />}
            {page === "tag" && <Tag />}
            {page === "color" && <Color />}
            {page === "brand" && <Brand />}
         </div>
        </div>
      </div>
    </>
  )
}



export default Index;