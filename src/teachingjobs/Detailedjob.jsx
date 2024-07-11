import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMoneyBillWave,
  FaBriefcase,
  FaMapMarkerAlt,
  FaShareAlt,
  FaTag,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Modal from "../Modal";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Loader from "../Loader";

export default function Detailedjob() {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [isPremium, setIsPremium] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [setModal, setIsModal] = useState(false);
  const [setLoginModal, setIsLoginModal] = useState(false);
  const [noJobs, setNoJobs] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
   async function isPremiumCheck() {
    if (user) {
      await axios
        .get(`https://learndukeserver.vercel.app/premiumCheck/${user.email}`)
        .then((response) => {
          setIsPremium(response.data);
          setIsLogin(true);
        })
        .catch((error) => {
          setIsLogin(false);
        });
    }
   }
   isPremiumCheck()
  }, [isLogin, user]);

  useEffect(() => {
    // when ever this page renders i need to scroll up
    window.scrollTo(0, 0);
    const jobId = window.location.pathname.split("/").pop();

    axios
      .get(`https://learndukeserver.vercel.app/getJobById/${jobId}`)
      .then((response) => {
        if (response.status === 200) {
          setPhoto(response.data.imageLink);
          setUser(response.data.userName);
          setJob(response.data);
          setIsLoadingJobs(false);
        }
      })
      .catch((error) => {
        setIsLoadingJobs(false);
        setNoJobs(true);
      });

      axios
        .get(`https://learndukeserver.vercel.app/getSimilarJobs/${jobId}`)
        .then((response) => {
          setSimilarJobs(response.data);
          // Check if there are similar jobs
          if (response.data.length === 0 || response.data.length > 0) {
            setIsLoading(false); // Stop loading if there are no similar jobs
          }
        })
        .catch((error) => {
          // Handle error and stop loading
          setIsLoading(false);
        });
  }, []);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const handleShare = () => {
    if (navigator.share && isLogin) {
      navigator
        .share({
          title: job.title,
          text: `Check out this job: ${job.title}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback mechanism
      const fallbackShare = () => {
        const shareUrl = window.location.href;
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = shareUrl;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("Link copied to clipboard. You can now share it manually.");
      };
      fallbackShare();
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  const splitTextIntoBullets = (text) => {
    return text.split(".").filter((sentence) => sentence.trim().length > 0);
  };

  if (isLoadingJobs) {
    return (
      <div className="h-screen items-center flex justify-center">
        {/* loading circle with animatin */}
        <Loader />
      </div>
    );
  }

  if(!job) {
    return (
      <div className="h-screen items-center flex justify-center">
        <div>No job details available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse w-full p-5 justify-start text-gray-800  md:flex-row">
      {job && (
        <div className="w-full md:w-1/2 mb-5 md:mb-0 animate-fade-in-left">
        <div className="mt-5">
          {isLoading &&  <div className="text-lg text-gray-600">Loading...</div>}
          {similarJobs.length === 0 && !isLoading && (
            <div className="text-lg sm:mt-14 text-center text-gray-600">
              No similar jobs found
            </div>
          )}
          {similarJobs.length > 0 && !isLoading && (
            <div className="text-lg text-gray-600 font-semibold mb-5 md:hidden">
              Similar Jobs
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            {similarJobs.map((job, index) => (
              <div
                key={index}
                className=" rounded-lg shadow-md p-4 bg-gray-50 w-full hover:bg-gray-100 transition-colors cursor-pointer transform  transition-300 "
                onClick={() => {
                  window.location.href = `/detailedjob/${job._id}`;
                }}
              >
                <div className="text-xl font-bold text-gray-700 mb-2">
                  {job.title}
                </div>
                <div className="flex space-x-5">
                  <div className="flex items-center mb-1 text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBriefcase className="mr-2 text-gray-500" />
                    {job.jobType}
                  </div>
                </div>
                <div className="flex flex-wrap mb-2">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="border border-gray-400 px-2 py-1 rounded-2xl m-1 text-sm text-gray-600 flex items-center"
                    >
                      <FaTag className="mr-1" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      {job && (
        <div className="w-full md:m-3">
          <div className="w-full flex flex-col  rounded-lg p-5 bg-gray-50  animate-fade-in-right md:mt-0 md:ml-5 relative">
            <div className="absolute top-4 right-4">
              <button
                className="bg-gray-500 hover:bg-grat-600 text-white p-2 rounded-full flex items-center transform hover:scale-105 duration-300"
                onClick={handleShare}
              >
                <FaShareAlt />
              </button>
            </div>

          <div className="flex items-center py-2 -mx-1 rounded-lg">
            <img src={photo} alt="" className="w-12 h-12 rounded-full" />
            <div className="text-lg font-semibold text-gray-800 ml-3">
              {user}
            </div>
          </div>

            <div className="text-2xl font-semibold text-gray-800 mb-3">
              {job.title}
            </div>

            <div className="mb-5">
              <div className="text-lg font-semibold text-gray-800 mb-2">
                Job Details
              </div>
              <hr className="border-t-2 border-gray-200" />

              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center font-bold text-xl text-gray-800 mb-2">
                  <FaMoneyBillWave className="mr-2 text-gray-500" />
                  <div>Pay</div>
                </div>
                <div className="flex items-center text-gray-700 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                  <span className="text-gray-600 mr-1">&#8377;</span>
                  {formatNumber(job.minAmountPerHour)}
                  <span className="mx-1">-</span>
                  <span className="text-gray-600 mr-1">&#8377;</span>
                  {formatNumber(job.maxAmountPerHour)}
                </div>
              </div>

              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center font-bold text-xl text-gray-800 mb-2">
                  <FaBriefcase className="mr-2 text-gray-500" />
                  <div>Job Type</div>
                </div>
                <div className="text-gray-700 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                  {job.jobType}
                </div>
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Location
              </div>
              <hr className="border-t-2 border-gray-200" />
              <div className="w-full p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  <span className="text-base">{job.location}</span>
                </div>
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Languages
              </div>
              <hr className="border-t-2 border-gray-200 " />
              <div className="w-full p-4 bg-gray-50 rounded-lg ">
                {job.languages.map((language, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <span className="text-base">&#8226;</span>
                    <span className="text-base ml-2">{language}</span>
                  </div>
                ))}
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Education
              </div>
              <hr className="border-t-2 border-gray-200 " />
              <div className="w-full p-4 bg-gray-50 rounded-lg ">
                <div>{job.education}</div>
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Benefits
              </div>
              <hr className="border-t-2 border-gray-200" />
              <div className="w-full p-4 bg-gray-50 rounded-lg mb-4">
                {job.benifits.map((benefit, index) => (
                  <div key={index} className="flex  text-gray-700">
                    <span className="text-base">&#8226;</span>
                    <span className="text-base ml-2">{benefit}</span>.
                  </div>
                ))}
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Full Job Description
              </div>
              <hr className="border-t-2 border-gray-200 mb-4" />
              <div className="text-gray-700 tracking-wide mb-4">
                {job.description}
              </div>

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Responsibilities
              </div>
              {splitTextIntoBullets(job.responsibilities).map(
                (bullet, index) => (
                  <div key={index} className="flex  text-gray-700 mb-1">
                    <span className="text-base">&#8226;</span>
                    <span className="text-base ml-2">{bullet}</span>
                  </div>
                )
              )}

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Requirements
              </div>
              {splitTextIntoBullets(job.requirements).map((bullet, index) => (
                <div key={index} className="flex  text-gray-700 mb-1">
                  <span className="text-base">&#8226;</span>
                  <span className="text-base ml-2">{bullet}</span>
                </div>
              ))}

              <div className="text-lg font-semibold text-gray-800 mb-2">
                Tags
              </div>
              <div className="flex flex-wrap mb-4">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="border border-gray-400 w-fit px-2 py-1 rounded-2xl m-1 text-sm text-gray-600 flex items-center"
                  >
                    <FaTag className="mr-1" /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col md:flex-row  md:space-x-3 mt-3">
                <button
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg flex items-center  m-2"
                  onClick={() => {
                    if (isLogin) {
                      if (isPremium) {
                        window.open(`tel:${job.phoneNumber}`, "blank");
                      } else {
                        setIsModal(true);
                      }
                    } else {
                      setIsLoginModal(true);
                    }
                  }}
                >
                  <FaPhoneAlt className="mr-2" />
                  Call Employeer
                </button>
                <button
                  className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg flex items-center m-2"
                  onClick={() => {
                    if (isLogin) {
                      if (isPremium) {
                        window.open(
                          `https://wa.me/${job.whatsappNumber}?text=${"Hello HR, I have seen your job posting at Learnduke. Can you explain what's the next process?"}`,
                          "blank"
                        );
                      } else {
                        setIsModal(true);
                      }
                    } else {
                      setIsLoginModal(true);
                    }
                  }}
                >
                  <FaWhatsapp className="mr-2 text-xl" />
                  WhatsApp Employeer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    
      <Modal isOpen={setModal} onClose={() => setIsModal(false)}>
        <div className="flex flex-col justify-center items-center">
          <div className="text-lg text-gray-700 mt-3 mb-3">
            You need to be a premium user to access this feature
          </div>
          {/* button to upgrade to premiumuser */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={() => {
              navigate("/subscription");
            }}
          >
            <MdOutlineWorkspacePremium className=" text-xl" />
            <div>Upgrade to Premium</div>
          </button>
        </div>
      </Modal>
      <Modal isOpen={setLoginModal} onClose={() => setIsLoginModal(false)}>
        <div className="flex flex-col justify-center items-center ">
          <div className="text-lg text-gray-700 mt-3 mb-3">
            You need to login to access this feature
          </div>
          {/* button to login */}
          <button
            className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className=" text-xl mr-2 mt-0.5" />
            <div>Login</div>
          </button>
        </div>
      </Modal>
    </div>
  );
}
