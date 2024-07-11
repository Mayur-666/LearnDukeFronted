import React, { useEffect } from "react";
import Findteachingjobsbody from "./Findteachingjobsbody";
import Reviews from "./Reviews";
import Footer from "./Footer";

export default function Findteachingjobs() {
  useEffect(() => {
    // Scroll to the top of the page smoothly when the component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex justify-center ">
          <Findteachingjobsbody />
        </div>
      </div>
      <div className="w-full flex justify-center p-5">
        <div className="w-full md:w-10/12 lg:w-9/12">
          <Reviews />
        </div>
      </div>
    </div>
  );
}
