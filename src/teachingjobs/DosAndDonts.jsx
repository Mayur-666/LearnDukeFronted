import React from "react";
import Correct from "../assets/Correct-tick.svg";
import Wrong from "../assets/Wrong-cross.svg";
import "./teaching.css";

export default function DosAndDonts() {
  return (
    <div className="w-full border border-black ">
      <div
        className="flex justify-between  border-b border-black"
        style={{ backgroundColor: "#FFF4E8" }}
      >
        <div className="w-1/3 text-center border-r border-black p-2 text-sm font-semibold"></div>
        <div className="w-1/3 text-center border-r border-black p-2 text-sm font-semibold text-orange-400 flex flex-col md:flex-row justify-center items-center">
          <div>LearnDuke Platform</div>
          <span
            className="py-0.5 px-1 rounded-lg text-white ml-0 md:ml-3"
            style={{
              backgroundColor: "#2AB7CA",
              position: "relative",
              overflow: "hidden",
            }}
          >
            Recommended
            <span className="shine-animation"></span>
          </span>
        </div>
        <div className="w-1/3 text-center  p-2 text-sm font-semibold text-orange-400">
          Other Platform
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4 border-r border-black text-sm font-semibold">
          Mentorship
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
        <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center">
        <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          Resume Building
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          100% Job Assurance
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          Upskilling Program
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          Personalised mentorship support
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          Direct contact to HR's
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3  p-4  border-r border-black text-sm font-semibold">
          Refund Policy
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center border-r border-black">
          <img src={Correct} alt="Correct" className="max-w-2rem max-h-2rem " />
        </div>
        <div className="w-1/3 p-4 flex justify-center items-center ">
          <img src={Wrong} alt="Wrong" className="max-w-2rem max-h-2rem" />
        </div>
      </div>
      
    </div>
  );
}
