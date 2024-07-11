import React, { useEffect, useState } from "react";
import Stars from "./Stars";

export default function Reviews() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const reviews = [
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Alice Johnson",
      title: "Great Product!",
      content: "I absolutely love this product. It has made my life so much easier and I can't imagine being without it now.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Bob Smith",
      title: "Good Value",
      content: "This product offers great value for the price. It's durable and works as expected. Highly recommend!",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Carol Williams",
      title: "Satisfied Customer",
      content: "I'm very satisfied with this purchase. The product performs well and the customer service was excellent.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "David Brown",
      title: "High Quality",
      content: "The quality of this product is top-notch. It's well-made and reliable. Would definitely buy again.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Eva Davis",
      title: "Works Perfectly",
      content: "This product works perfectly for my needs. It's easy to use and very effective. Highly recommend to others.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Frank Wilson",
      title: "Exceeded Expectations",
      content: "This product exceeded my expectations. It's even better than described and works flawlessly.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Grace Lee",
      title: "Very Pleased",
      content: "I'm very pleased with this purchase. The product is high quality and performs as advertised.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Henry Walker",
      title: "Highly Recommend",
      content: "I highly recommend this product. It's well-made and does exactly what it's supposed to do.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Isabel Hall",
      title: "Fantastic Product",
      content: "This is a fantastic product. It's reliable, easy to use, and has made my life so much easier.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Jack Allen",
      title: "Great Purchase",
      content: "I'm very happy with this purchase. The product is of great quality and works perfectly.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Karen Young",
      title: "Very Satisfied",
      content: "I'm very satisfied with this product. It works as expected and the quality is excellent.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Liam King",
      title: "Amazing Product",
      content: "This is an amazing product. It's very effective and has exceeded my expectations.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Mia Scott",
      title: "Best Purchase",
      content: "This is the best purchase I've made in a long time. The product is fantastic and works perfectly.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Noah Green",
      title: "Excellent Quality",
      content: "The quality of this product is excellent. It's durable and works exactly as described.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Olivia Adams",
      title: "Love It",
      content: "I love this product. It's made a big difference in my daily routine and I can't imagine being without it.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Paul Baker",
      title: "Very Happy",
      content: "I'm very happy with this product. It works great and the quality is outstanding.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Quinn Carter",
      title: "Works Great",
      content: "This product works great. It's reliable and easy to use. Highly recommend to others.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Ruby Evans",
      title: "Excellent Product",
      content: "This is an excellent product. It's well-made and performs as expected. Very satisfied.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Sam Turner",
      title: "Highly Satisfied",
      content: "I'm highly satisfied with this purchase. The product is of high quality and works perfectly.",
    },
    {
      rating: Math.floor(Math.random() * 5) + 1,
      name: "Tina White",
      title: "Great Quality",
      content: "The quality of this product is great. It's durable and works exactly as described. Very happy with it.",
    },
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const totalReviews = reviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="m-4 sm:m-10 lg:m-20">
      <div className="flex flex-col justify-center items-center mt-10 ">
        <div className="font-semibold text-2xl">Customer Reviews</div>
        <div className="flex flex-col mt-3">
          <div className="flex items-center">
            <Stars number={4.9} />
            <span className="font-thin ml-2">4.64 out of 5</span>
          </div>
          <div className="font-thin">Based on {totalReviews} ratings</div>
        </div>
      </div>
      <div>
        {currentReviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col mt-5 bg-orange-100 hover:bg-orange-200 rounded-lg p-5 hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            <Stars number={review.rating} />
            <div className="font-semibold text-xl text-yellow-500 mt-3">{review.name}</div>
            <div className="font-semibold mt-5 leading-relaxed tracking-wide">{review.title}</div>
            <div className="font-normal leading-relaxed tracking-wide">{review.content}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center m-5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
