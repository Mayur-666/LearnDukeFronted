import React, { useState, useEffect } from "react";
import teachingjobs from "../assets/teachingjobs.jpg";
import companies from "../assets/companies.jpg";
import numbers2 from "../assets/numbers2.jpg";
// import Aboutlearnduke from "../assets/Aboutlearnduke.mp4";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../assets/learnDuke.png";



export default function ResponsiveComponent() {
  const [isFixed, setIsFixed] = useState(false);
  const user=JSON.parse(localStorage.getItem("user"));
  const navigator = useNavigate();

  const checkoutHandler = async () => {

    
    
    const { data } = await axios.post("https://learndukeserver.vercel.app/checkout", {
      amount: 999,
    });

    const options = {
      key: "rzp_test_jH3t9W8Up3P2iW",
      amount: 99900 / 100,
      currency: "INR",
      name: user.name ? user.name : "Sample User",
      description: "Tutorial of RazorPay",
      image: image,
      order_id: data.order.id,
      callback_url: `https://learndukeserver.vercel.app/verify/payment/${user.email}`,
      prefill: {
        name: user.name ? user.name : "Sample User",
        email: user.email ? user.email : "Sample@gmail.com",
        contact: user.mobile && user.mobile  ,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };
  const handleAddToCart = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  
    const products = [
      { name: "Product 1", price: 999 },
    ];
  
    if (products.length > 0) {
      navigator("/cart", { state: { products: products } });

    } else {
      console.error("Products array is empty");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center md:space-x-8 mt-10">
      <div className="w-full md:w-1/2 md:relative">
        <img src={teachingjobs} alt="" className="w-full sticky top-20" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center mt-5 md:mt-0 p-5 md:p-0">
        <div className="w-full md:w-2/3">
          <div className="text-xs font-thin tracking-widest ml-2">
            1 YEAR FULL ACCESS MEMBERSHIP
          </div>
          <div className="text-3xl font-semibold tracking-wider text-left m-2">
            Find an authentic remote job for you
          </div>
          <div className="m-2 font-thin leading-loose tracking-wider">
            One year membership with unlimited access to all remote job
            vacancies
          </div>
          <div className="text-left m-2">
            <span className="text-lg font-bold">Rs. 699.00</span>
            <span className="text-white text-sm bg-orange-600 rounded-lg px-2 py-1 ml-2">
              sale
            </span>
          </div>
          <button className="w-full border border-blue-500 py-4 text-blue-500 hover:border-2 my-2"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="w-full text-white bg-blue-500 py-4 hover:scale-105"
            onClick={() => {
              if(user){
                checkoutHandler();
              }
              else{
                alert("Please login to buy the product");
              }
            }}
          >
            Buy it now
          </button>
          <img src={numbers2} alt="" className="w-full mt-5 mb-5" />
          <div className="text-lg font-semibold m-3">
            <span style={{ backgroundColor: "#FDFDAD" }}>
              Here are the top reasons to join LearnDuke Online and Offline jobs
              today.
            </span>
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            1. Access 5,000+ hand-screened Online and Offline job opportunities.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            2. Apply directly to the employer. No middlemen or agencies in
            between.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            3. Thousands of new jobs added every week.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            4. Helpful expert customer service from friendly humans for your job
            search.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            5. Elevating your career journey, we craft custom resumes, apply to
            job opportunities, and offer mentorship in your field. Let us be
            your trusted guide to success.
          </div>
          <div className="text-lg font-semibold m-3">
            <span style={{ backgroundColor: "#FDFDAD" }}>
              Wide range of remote job categories for freshers and experienced
              candidates:
            </span>
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            We offer job listings in various categories such as Accounting &
            Finance, Business & Management, Computer & IT, Content Creation,
            Customer Service, Data Entry, Data Science & Analytics, Design,
            Education & Training, Engineering, Home Tutions & NGO jobs, HR &
            Recruiting, Sales & Marketing, and many more.
          </div>
          <div className="text-lg font-semibold m-3">
            <span style={{ backgroundColor: "#FDFDAD" }}>How it works:</span>
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            Step 1: Complete the checkout process and place your order.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            Step 2: Immediately after placing your order, you will receive an
            email containing a link to access remote job vacancies.
          </div>
          <div className="mt-5 m-3 leading-relaxed tracking-wider">
            Step 3: Browse through the listings, apply for the positions that
            match your skills and interests, and get hired.
          </div>
          <div className="text-lg font-semibold m-3">
            <span style={{ backgroundColor: "#FDFDAD" }}>
              Great employers actively offering Online and Offline jobs:
            </span>
          </div>
          <img src={companies} alt="" className="w-full" />
          <div className="text-lg font-semibold m-3 text-center ">
            <span style={{ backgroundColor: "#FDFDAD" }}>
              And 2000 more companies.{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
