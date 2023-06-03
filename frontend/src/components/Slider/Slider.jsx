import { useEffect, useState } from "react";
import { sliderData } from "../../faker/sliderData";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Slider = () => {
  const [sliderItem, setSliderItem] = useState(sliderData);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
   const timeout = setTimeout(() => {
      if (sliderIndex < sliderItem.length - 1) {
        setSliderIndex(sliderIndex + 1);
      } else {
        setSliderIndex(0);
      }
    }, 3000);
    return () =>  clearTimeout(timeout);
  }, [sliderIndex, sliderItem.length]);


  const handleSliderNext = () => {
    if (sliderIndex < sliderItem.length - 1) {
      setSliderIndex(sliderIndex + 1)
    } else {
      setSliderIndex(0)
    }
  }
  const handleSliderPrev = () => {
    if (sliderIndex === 0) {
      setSliderIndex(sliderItem.length - 1)
    } else {
      setSliderIndex(sliderIndex - 1)
    }
  }


  return (
    <div className="relative group" >
      <img className='max-h-[600px] h-[100%] object-top object-cover duration-300 w-full cursor-pointer' src={sliderItem[sliderIndex].photo} alt="" />
      <div className="absolute w-full text-center bottom-3 space-x-2">
        {sliderItem.map((item, index) =>
          <button onClick={() => setSliderIndex(index)} key={index} className={`h-4 w-4 rounded-full ${sliderIndex === index ? "bg-primary" : "bg-red-400"}`}></button>
        )}

      </div>
      <div className='absolute w-full flex justify-between px-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 duration-300 group-hover:opacity-100 '>
        <button onClick={handleSliderPrev} className='text-2xl text-secondary bg-white p-[6px] rounded-full'> <FaAngleLeft /> </button>
        <button onClick={handleSliderNext} className='text-2xl text-secondary bg-white p-[6px] rounded-full'> <FaAngleRight /> </button>
      </div>


    </div>
  );
}

export default Slider;