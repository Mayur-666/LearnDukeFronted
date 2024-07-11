import React, { useEffect } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import TeachingNavbar from "./TeachingNavbar";
import Footer from "./Footer";

export default function Contactus() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  return (
    <div>
      <div className="mt-5 flex justify-center">
        <div className="w-2/3 flex flex-col justify-center items-center">
          <div className="text-6xl font-semibold">Contact</div>
          <div style={{ color: "#404040" }} className="mt-10 text-center">
            Your message is important to us and will be addressed within the
            next 24 business hours. For any inquiries, feel free to email us at{" "}
            <span className="font-bold">ycyclasscom@gmail.com</span>.
          </div>
          <div style={{ color: "#404040" }} className="mt-10 text-center">
            soa University Bhubaneswar incubation center soa
          </div>
          <div style={{ color: "#404040" }} className="mt-10 text-center">
            If you are an existing customer, please use your dashboard access
            link to visit the help center for priority support.
          </div>
        </div>
      </div>
      
    </div>
  );
}
