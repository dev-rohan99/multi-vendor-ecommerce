import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rate }) => {
  if (rate === 0) {
    return (
      <>
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
      </>
    );
  }

  if (rate === 1) {
    return (
      <>
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
      </>
    );
  }

  if (rate === 2) {
    return (
      <>
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
      </>
    );
  }

  if (rate === 3) {
    return (
      <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
        <AiOutlineStar />
      </>
    );
  }
  if (rate === 4) {
    return (
      <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiOutlineStar />
      </>
    );
  }
  if (rate === 5) {
    return (
      <>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
      </>
    );
  }
};

export default Rating;
