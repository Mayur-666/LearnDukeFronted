import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ number }) => {
  const generateStars = (num) => {
    const stars = [];
    const wholeStars = Math.floor(num); // Get the integer part
    const hasHalfStar = num - wholeStars >= 0.25; // Check if there's a half star
    const totalStars = Math.min(5, wholeStars + (hasHalfStar ? 1 : 0)); // Cap at 5 stars

    // Render whole stars
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <div key={i} className="flex items-center">
          {i <= wholeStars ? (
            <AiFillStar className="text-yellow-500" />
          ) : (
            hasHalfStar && i === wholeStars + 1 ? (
              <FaStarHalfAlt className="text-yellow-500" />
            ) : (
              <AiOutlineStar className="text-gray-300" />
            )
          )}
        </div>
      );
    }

    // Add empty stars if needed
    if (totalStars < 5) {
      const emptyStars = 5 - totalStars;
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <div key={`empty-${i}`} className="flex items-center">
            <AiOutlineStar className="text-gray-300" />
          </div>
        );
      }
    }

    return stars;
  };

  return <div className="flex">{generateStars(number)}</div>;
};

export default Stars;
