import React, { useState, useEffect } from "react";
import {
  FaWallet,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBriefcase,

} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
export default function Tutorial({
  imageLink,
  userName,
  title,
  description,
  minAmountPerHour,
  maxAmountPerHour,
  jobType,
  phoneNumber,
  location,
  whatsappNumber,
  email,
  requirements,
  responsibilities,
  tags,
  id,
}) {
  const navigate = useNavigate();
  const borderColor = "#4D4C5C";
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    JSON.parse(localStorage.getItem("user"))
      ? setIsLogin(true)
      : setIsLogin(false);
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${userData.email}`)
        .then((userResponse) => {
          
          setUser(userResponse.data);
          setIsPremium(userResponse.data.isPremium);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email, isLogin]);

  const handleCallNow = () => {
    if (isLogin) {
      if (isPremium) {
        window.open(`tel:${phoneNumber}`, "blank");
      } else {
        setModalMessage("You need to be a premium user to call the user.");
        setIsModalOpen(true);
      }
    } else {
      setLoginModal(true);
    }
  };

  const handleWhatsApp = () => {
    if (isLogin) {
      if (isPremium) {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${"Hello HR, I have seen your job posting at Learnduke. Can you explain what's the next process?"}`,
          "blank"
        );
      } else {
        setModalMessage("You need to be a premium user to use WhatsApp.");
        setIsModalOpen(true);
      }
    } else {
      setLoginModal(true);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  const handleJobClick = () => {
    navigate("/detailedjob/" + id);
  };

  const closeModal = () => {
    setLoginModal(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className={`rounded-xl border-2 border-slate-300 mt-5 p-5 border-${borderColor} cursor-pointer jobcard `}
      >
        <div onClick={handleJobClick}>
          <div className="flex items-center mb-1">
            <img
              src={
                imageLink ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }
              className="w-10 h-10 rounded-full md:mr-2 mb-2 md:mb-0"
              alt=""
            />
            <div style={{ color: borderColor }} className="ml-2 text-lg">
              {userName}
            </div>
          </div>
          <div className="text-2xl font-semibold">{title}</div>
          <div
            style={{ color: borderColor }}
            className="mt-1 h-12 overflow-hidden"
          >
            {description.length > 150 ? (
              <div>{description.slice(0, 150)}...</div>
            ) : (
              <div>{description}</div>
            )}
          </div>
          <div className="flex flex-wrap mt-1 space-x-1 sm:space-x-3">
            <div
              className={`border-2 border-${borderColor}  rounded-lg bg-gray-100 px-2 text-gray-500 font-semibold mt-3 flex items-center`}
            >
              <FaWallet className="w-4 h-4 mr-1 text-gray-400" />
              <span>
                &#8377;{minAmountPerHour}-&#8377;{maxAmountPerHour}/Month
              </span>
            </div>
            <div
              className={`border-2 border-${borderColor} bg-gray-100 text-gray-500 px-2 font-semibold items-center mt-3  rounded-lg flex text-center`}
            >
              <FaBriefcase className="w-4 h-4 mr-2 text-gray-400" />
              {jobType}
            </div>
            <div className="">
              {jobType !== "Remote" && (
                <div
                  className={`border-2 border-${borderColor} bg-gray-100 text-gray-500 px-2 font-semibold mt-3  rounded-lg flex items-center flex-wrap`}
                >
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                  {location}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex mt-4 space-x-3 md:space-x-8">
          <button
            onClick={handleCallNow}
            className="bg-orange-400 text-white px-2 py-1 rounded-3xl text-center"
          >
            <div className="flex justify-center items-center">
              <FaPhone style={{ transform: "rotateY(180deg)" }} />
              <div className="ml-2">Call Now</div>
            </div>
          </button>
          <button
            onClick={handleWhatsApp}
            className="bg-green-400 text-white px-2 py-1 rounded-3xl text-center"
          >
            <div className="flex justify-center items-center">
              <FaWhatsapp style={{ transform: "rotateY(180deg)" }} />
              <div className="ml-2">WhatsApp</div>
            </div>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col justify-center items-center">
            <p className="font-semibold text-xl">{modalMessage}</p>
            {isLogin && !isPremium && (
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-5 flex"
                onClick={() => {
                  window.location.href = "/subscription";
                }}
              >
                <MdOutlineWorkspacePremium className=" text-xl" />

                <div> Upgrade to Premium</div>
              </button>
            )}
          </div>
        </Modal>
      )}
      {loginModal && (
        <Modal isOpen={loginModal} onClose={closeModal}>
          <div className="flex flex-col justify-center items-center">
            <p>You need to login to connect with the user.</p>
            <button
            className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className=" text-xl mr-2 mt-0.5" />
            <div>Login</div>
          </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
