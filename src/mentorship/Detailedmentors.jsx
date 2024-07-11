import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaUser,
  FaClock,
  FaMoneyBillAlt,
  FaComments,
  FaLanguage,
  FaStar,
  FaTools,
  FaChalkboardTeacher,
  FaWhatsapp,
} from "react-icons/fa";
import "./mentors.css";
import { MdDomain } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { PiBuildingsLight } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../Modal";
import { FcGoogle } from "react-icons/fc";
import Loader from "../Loader";


function Detailedmentors() {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const reviewsSectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMentorData = async () => {
      try {
        const response = await axios.get(
          `https://learndukeserver.vercel.app/getMentor/${mentorId}`
        );
        if (isMounted) {
          setMentor(response.data);
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMentorData();

    const timeout = setTimeout(() => {
      if (!mentor && isMounted) {
        setNoData(true);
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [mentorId]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  const handleScrollToReviews = () => {
    reviewsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const calculateAverageRating = () => {
    if (!mentor || !mentor.reviews.length) return 0;
    const totalRating = mentor.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (totalRating / mentor.reviews.length).toFixed(1);
  };

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="flex flex-col items-center justify-center min-h-screen montserrat ">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}
      {!loading && noData && !mentor && (
        <p className="text-red-500 text-xl">
          No data available for this mentor.
        </p>
      )}
      {!loading && mentor && (
        <div className="w-full lg:w-10/12">
          {/* back option */}
          <div className="m-3 fixed top-20 lg:-left-0">
            <button className=" bg-orange-500 p-2 rounded-lg"
            onClick={() => window.history.back()}
            >
              <FaArrowLeft className="text-white"  />
            </button>
          </div>
          <div className=" mx-auto flex flex-col-reverse md:flex-row  bg-white rounded-lg mt-8">
            <div className="md:w-2/3 p-4">
              <div className="text-2xl md:text-4xl font-bold tracking-wide mb-6 leading-snug">
                {mentor.description}
              </div>
              <div className="mt-10 text-2xl font-bold">
                <div className="flex items-center space-x-2">
                  <FaChalkboardTeacher />
                  <span>Class Location Type</span>
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  {mentor.locationType.map((location, index) => (
                    <div
                      key={index}
                      className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2 flex items-center"
                    >
                      {location === "Online" && <FaGlobe className="mr-2" />}
                      {location === "At Home" && (
                        <FaMapMarkerAlt className="mr-2" />
                      )}
                      {location === "In Person" && <FaUser className="mr-2" />}
                      {location}
                    </div>
                  ))}
                </div>
                {/* location */}
                <div className="flex items-center space-x-2 mt-3">
                  {" "}
                  <IoLocation />
                  <span className="">Location</span>
                </div>
                <div className="w-fit mt-5 border border-gray-300 px-3 py-1 rounded-3xl">
                  {mentor.location}
                </div>
              </div>
              <div className="mt-16">
                <div className="text-2xl font-semibold mb-4">
                  About {mentor.name}
                </div>
                <div className="text-lg tracking-wide">{mentor.about}</div>
              </div>
              <div className="mt-16">
                <div className="text-2xl font-semibold mb-4">
                  About the class
                </div>
                <div className="text-lg font-semibold flex items-center">
                  <FaLanguage className="mr-2" /> Languages
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  {mentor.languages.map((language, index) => (
                    <div
                      key={index}
                      className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2"
                    >
                      {language}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-semibold flex items-center mt-5">
                  <FaTools className="mr-2" /> Skills
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  {mentor.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-semibold flex items-center mt-5">
                  <FaClock className="mr-2" /> Class Timings
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  <div className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2">
                    {mentor.availabilityStartTime} -{" "}
                    {mentor.availabilityEndTime}
                  </div>
                </div>
                <div className="text-lg font-semibold flex items-center mt-5">
                  <MdDomain className="mr-2" />
                  Domains
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  {mentor.domain.map((domain, index) => (
                    <div
                      key={index}
                      className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2"
                    >
                      {domain}
                    </div>
                  ))}
                </div>
                <div className="text-lg font-semibold flex items-center mt-5">
                  <PiBuildingsLight className="mr-2" />
                  Sub Domains
                </div>
                <div className="flex flex-wrap space-x-3 mt-5">
                  {mentor.subDomain.map((subDomain, index) => (
                    <div
                      key={index}
                      className="text-lg font-semibold border border-gray-300 px-3 py-1 rounded-3xl mb-2"
                    >
                      {subDomain}
                    </div>
                  ))}
                </div>
                <div
                  className="text-lg tracking-wide mt-8"
                  ref={reviewsSectionRef}
                >
                  {mentor.description}
                </div>
              </div>
              {mentor.reviews.length > 0 && (
                <div className="mt-16">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center text-xl font-semibold">
                      <FaComments className="mr-2" /> Reviews
                    </div>
                    <div className="border border-gray-300 px-2 py-1 rounded-2xl">
                      {mentor.reviews.length} Reviews
                    </div>
                  </div>
                  <div className="flex flex-col overflow-x-auto hide-scrollbar">
                    {mentor.reviews.map((review, index) => (
                      <div
                        key={index}
                        className="w-full mb-4"
                        onClick={() => handleReviewClick(review)}
                      >
                        <div className="border border-gray-300 rounded-2xl p-4">
                          <div className="flex justify-between items-center ">
                            <div className="flex items-center">
                              <img
                                src={mentor.profilePhoto.url}
                                className="w-10 h-10 rounded-full mr-3"
                                alt="Mentor"
                              />
                              <div className="font-semibold">{review.user}</div>
                            </div>
                            <div className="font-bold flex items-center space-x-1">
                              {" "}
                              <span>
                                <FaStar className="text-orange-500" />
                              </span>{" "}
                              <span>{review.rating}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            {isMobile ? (
                              <div>
                                {review.review.split(".").slice(0, 5).join(".")}
                                .
                              </div>
                            ) : (
                              <div>{review.review}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end items-center">
                          {review.reply && (
                            <div
                              className={`mt-4 w-2/3 hidden md:flex flex-col ${
                                review.reply ? " pt-4" : ""
                              }`}
                            >
                              <span className="font-semibold flex items-center space-x-3">
                                <img
                                  src={mentor.profilePhoto.url}
                                  className="w-10 rounded-full"
                                  alt=""
                                />
                                <span>{mentor.name}'s response:</span>
                              </span>{" "}
                              <span className="mt-3">{review.reply}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedReview && isMobile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white rounded-lg p-4 m-5 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-bold">Review</h3>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                        </div>
                        <div className="mb-4">
                          <p>{selectedReview.review}</p>
                        </div>
                        {selectedReview.reply && (
                          <div>
                            <h4 className="font-bold">
                              Response from {mentor.name}:
                            </h4>
                            <p>{selectedReview.reply}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* {mentor.reviews.length <= 0 && (
                <div className="text-center text-3xl font-semibold">
                  No Reviews
                </div>
            )} */}
              <div className="mt-16">
                <div className="flex items-center text-xl font-semibold mb-4">
                  <FaMoneyBillAlt className="mr-2" /> Fees
                </div>
                <div className="flex flex-col md:flex-row border border-gray-300 p-5 rounded-lg md:space-x-5 bg-blue-50">
                  <div className="flex flex-col">
                    <div className="font-semibold">Hourly fee</div>
                    <div className="text-sm">₹{mentor.hourlyFees}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold">Free classes</div>
                    <div className="text-sm">30mins</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4 md:p-8 rounded-lg shadow-md md:sticky md:top-20 self-start bg-gray-50 mb-5 ">
              <div className="flex justify-center">
                <img
                  src={mentor.profilePhoto.url}
                  alt="Profile"
                  className="w-1/2 rounded-3xl mb-4 shadow-lg"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {mentor.name}
              </h2>
              {mentor.reviews.length > 0 && (
                <div className="text-center mb-6">
                  <div className="flex justify-center items-center space-x-1">
                    <FaStar className="text-orange-500" />
                    <span className="text-lg font-bold">
                      {calculateAverageRating()}
                    </span>
                    <span className="text-sm">
                      ({mentor.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              )}
              <div className="flex md:flex-col space-y-1 md:space-y-4 overflow-x-auto hide-scrollbar">
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 p-1.5 w-full">
                  <span className="font-semibold flex items-center whitespace-nowrap">
                    <FaMoneyBillAlt className="mr-2" /> Hourly fees
                  </span>
                  <span className="font-bold">₹{mentor.hourlyFees}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 p-1.5 w-full">
                  <span className="font-semibold flex items-center whitespace-nowrap">
                    <FaClock className="mr-2" /> Start time
                  </span>
                  <span className="font-bold">
                    {mentor.availabilityStartTime}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 p-1.5 w-full">
                  <span className="font-semibold flex items-center whitespace-nowrap">
                    <FaClock className="mr-2" /> End time
                  </span>
                  <span className="font-bold">
                    {mentor.availabilityEndTime}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 p-1.5 w-full">
                  <span className="font-semibold flex items-center whitespace-nowrap">
                    <FaUser className="mr-2" /> Number of Students
                  </span>
                  <span className="font-bold">{mentor.numberOfStudents}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col space-y-3 justify-evenly">
                <button
                  className="bg-orange-400  px-3 py-2 rounded-lg font-semibold text-white flex justify-center space-x-3 items-center"
                  onClick={() => user ? window.open(`tel:${mentor.phoneNumber}`, "blank") : setShowModal(true)}
                >
                  <MdAddCall /> <span>Call Mentor</span>
                </button>
                <button
                  className="bg-green-400  px-3 py-2 rounded-lg font-semibold text-white  justify-center space-x-3 flex items-center"
                  onClick={() => user ?
                    window.open(`https://wa.me/${mentor.whatsappNumber}?text=${"Hello Mentor! I saw your profile on Learnduke. Can I take a free class  for "}`, 'blank') : setShowModal(true)
                  }
                >
                  <FaWhatsapp /> <span>WhatsApp Mentor</span>
                </button>
              </div>
              <div className="text-center font-semibold mt-4">1st class free</div>
            </div>
            {
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="flex flex-col items-center justify-center text-lg">Please login to connect with mentor
                <button
            className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className=" text-xl mr-2 mt-0.5" />
            <div>Login</div>
          </button>
                </div>
              </Modal>
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Detailedmentors;
