import React, { useEffect, useState } from "react";
import sample from "../assets/user.png";
import { useNavigate } from "react-router-dom";
import "./Webinar.css";
import notFound from "../assets/crying.gif";
import Modal from "../Modal";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { MdPayment } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Loader from "../assets/Loader.gif";
import { FaPlus } from "react-icons/fa";
function Webinars() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [upcomingWebinars, setUpcomingWebinars] = useState(null);
  const [liveWebinars, setLiveWebinars] = useState(null);
  const [pastWebinars, setPastWebinars] = useState(null);
  const [liveLoading, setLiveLoading] = useState(true);
  const [pastLoading, setPastLoading] = useState(true);
  const [upLoading, setUpLoading] = useState(true);
 
  const [livePageNumber, setLivePageNumber] = useState(1);

  const [showLiveLoadmore, setShowLiveLoadmore] = useState(true);

  const [upcomingPageNumber, setUpcomingPageNumber] = useState(1);

  const [showUpcomingLoadmore, setShowUpcomingLoadmore] = useState(true);

  const [showPastLoadmore, setShowPastLoadmore] = useState(true);

  const [pastPageNumber, setPastPageNumber] = useState(1);

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // window.scroll(0,0)
    setDisabled(true);
    async function isMentor() {
      let res = await axios.get(
        `https://learndukeserver.vercel.app/isAlreadyMentor/${user.email}`
      );
      setMentorData(res.data.mentor);
      setDisabled(false);
    }
    isMentor();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  useEffect(() => {
    setUpLoading(true);
    async function getUpcoming() {
      const res = await axios.get(
        `http://localhost:3000/upcoming-webinars?page=${upcomingPageNumber}`
      );
      console.log(res.data);
      setUpcomingWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });
      setUpLoading(false);
      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowUpcomingLoadmore(false);
      }
    }
    getUpcoming();
  }, [upcomingPageNumber]);

  useEffect(() => {
    setLiveLoading(true);
    async function getLive() {
      console.log(livePageNumber);

      const res = await axios.get(
        `http://localhost:3000/live-webinars?page=${livePageNumber}`
      );
      console.log(res.data);
      setLiveWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });

      setLiveLoading(false);
      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowLiveLoadmore(false);
      }
    }

    getLive();
  }, [livePageNumber]);

  useEffect(() => {
    setPastLoading(true);

    async function getPast() {
      const res = await axios.get(
        `http://localhost:3000/past-webinars?page=${pastPageNumber}`
      );

      console.log(res.data);

      setPastWebinars((prev) => {
        return prev ? [...prev, ...res.data.webinars] : res.data.webinars;
      });

      setPastLoading(false);

      if (
        res.data.currentPage == res.data.totalPages ||
        res.data.webinars.length == 0
      ) {
        setShowPastLoadmore(false);
      }
    }

    getPast();
  }, [pastPageNumber]);

  return (
    <div className="w-full p-4 flex relative">
      <div className="p-2 my-2  w-full xl:w-4/6">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-center w-full ">
            <div className="w-full">
              <h1 className="text-3xl mt-4 ml-2 md:px-4 font-semibold">
                Live Webinars
              </h1>
              <p className="px-4 my-2 -ml-1">
                Level up your career with live and exclusive webinars from top
                mentors.
              </p>
            </div>
          </div>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full lg:p-3 ">
            {/* live webinar cards */}
            {liveLoading ? (
              <DataFetchLoading />
            ) : liveWebinars && liveWebinars.length > 0 ? (
              liveWebinars.map((webinar, index) => (
                <WebinarCard key={index} webinar={webinar} />
              ))
            ) : (
              <div
                className="flex-col flex items-center
            justify-center text-lg p-4"
              >
                <img src={notFound} className="max-w-40" />
                There are currently no live webinars!
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {showLiveLoadmore && (
              <button
                className="bg-gray-600 text-white rounded-lg p-1 my-2 text-sm"
                onClick={() => {
                  setLivePageNumber(livePageNumber + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
          
        </div>
        <div className="flex items-center justify-center xl:hidden">
          <p className="w-11/12 my-3 border-2 border-orange-100"></p>
        </div>
        <div className="w-full xl:hidden">
          <div className="flex flex-col sm:flex-row justify-center md:justify-between w-full ">
            <div className="w-full">
              <h1 className="text-3xl mt-4 ml-2 md:px-4 font-semibold">
                Upcoming Webinars
              </h1>
              <p className="px-4 my-2 -ml-1">
                Level up your career with live and exclusive webinars from top
                mentors.
              </p>
            </div>
          </div>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full lg:p-3 ">
            {/* live webinar cards */}
            {!upcomingWebinars ? (
              <DataFetchLoading />
            ) : upcomingWebinars && upcomingWebinars.length > 0 ? (
              upcomingWebinars.map((webinar, index) => (
                <WebinarCard key={index} webinar={webinar} />
              ))
            ) : (
              <div
                className="flex-col flex items-center
            justify-center text-lg p-4"
              >
                <img src={notFound} className="max-w-40" />
                There are currently no upcoming webinars!
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {showUpcomingLoadmore && (
              <button
                className="bg-gray-600 text-white rounded-lg p-1 my-2 text-sm"
                onClick={() => {
                  setUpcomingPageNumber(upcomingPageNumber + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-11/12 my-3 border-2 border-orange-100"></p>
        </div>
        <div className="w-full">
          <h1 className="text-3xl mt-4 ml-5 px-4 font-semibold">
            Past Webinars
          </h1>
          <p className="px-4 my-2 ml-5">
            Level up your career with live and exclusive webinars from top
            mentors.
          </p>
          <div className="webinarGrid grid grid-cols-1 3xl:grid-cols-2 xl:w-full lg:p-3">
            {/* live webinar cards */}
            {pastLoading ? (
              <DataFetchLoading />
            ) : pastWebinars && pastWebinars.length > 0 ? (
              pastWebinars.map((webinar, index) => (
                <WebinarCard key={index} webinar={webinar} />
              ))
            ) : (
              <div
                className="flex-col flex items-center
            justify-center text-lg p-4"
              >
                <img src={notFound} className="max-w-40" />
                No Past webinars found!
              </div>
            )}
          </div>
          <div className="flex justify-end">
            {showPastLoadmore && (
              <button
                className="bg-gray-600 text-white rounded-lg p-1 my-2 text-sm"
                onClick={() => {
                  setPastPageNumber(pastPageNumber + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="top-28 h-fit z-0 border-none w-2/6 p-3 sticky hidden xl:flex"
        style={{
          maxHeight: "80vh",
        }}
      >
        <div className="w-full p-2">
          <h1 className="text-xl my-2 font-semibold text-center">
            Mentors with upcoming webinars
          </h1>
          {upLoading ? (
            <DataFetchLoading />
          ) : upcomingWebinars && upcomingWebinars.length > 0 ? (
            upcomingWebinars.map((webinar, index) => (
              <div
                key={index}
                className="border border-slate-300 rounded-lg flex p-2 my-2 items-center justify-between"
              >
                <div className="flex flex-col w-9/12">
                  <h1 className="font-semibold p-1">{webinar.title}</h1>
                  <div className="flex items-center p-1">
                    <img
                      src={webinar.creator.photo}
                      className="max-w-8 rounded-full mr-3"
                    />
                    <p>{webinar.creator.name}</p>
                  </div>
                </div>
                <button
                  className="rounded-xl text-blue-500 px-2"
                  onClick={() => navigate(`/detailedWebinar/${webinar._id}`)}
                >
                  See details {">"}
                </button>
              </div>
            ))
          ) : (
            <div
              className="flex-col flex items-center
          justify-center text-lg p-4"
            >
              <img src={notFound} className="max-w-40" />
              No Upcoming Webinars!
            </div>
          )}
          <div className="flex justify-end">
            {showUpcomingLoadmore && (
              <button
                className="bg-gray-600 text-white rounded-lg p-1 my-2 text-sm"
                onClick={() => {
                  setUpcomingPageNumber(upcomingPageNumber + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
        
      </div>
      {showLoginModal && (
        <Modal
          isOpen={setShowLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <div className="flex flex-col justify-center space-y-4 items-center">
            <p className="font-semibold text-lg">
              Please login to create a Webinar!
            </p>
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
      {showMentorModal && (
        <Modal
          isOpen={showMentorModal}
          onClose={() => setShowMentorModal(false)}
        >
          <div className="flex flex-col justify-center space-y-4 items-center">
            <p className="font-semibold text-lg">You are not a Mentor.</p>
            <button
              className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
              onClick={() => user && navigate("/become-a-mentor")}
            >
              <div>Create Mentor Profile</div>
            </button>
          </div>
        </Modal>
      )}
      {showPremiumModal && (
        <Modal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
        >
          <div className="text-lg flex flex-col space-y-3 items-center justify-center">
            <div className="text-center">
              <img
                src={mentorData.profilePhoto.url}
                alt="profile photo"
                className="rounded-lg max-w-52 max-h-52 md:max-w-60 md:max-h-60 aspect-square object-cover"
                style={{ boxShadow: "0 0 20px 10px rgba(0,0,0,0.2)" }}
              />
              <h1 className="text-xl font-semibold mt-2">{user.name}</h1>
            </div>
            <div className="mb-4">
              Your profile is{" "}
              <span className="text-red-500 font-semibold">Inactive</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-x-3 items-center justify-center mt-2">
            {/* edit mentor */}
            <button
              className="px-3 py-1 bg-gradient-to-l from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={() => {
                navigate("/become-a-mentor", {
                  state: { mentorData, newData: false },
                });
              }}
            >
              <CiEdit className="w-5 h-5 mr-2" />
              Edit Mentor
            </button>
            <button
              className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
              onClick={() => {
                navigate("/mentor/payment", {
                  state: { mentorData, newData: false, modified: false },
                });
              }}
            >
              <MdPayment className="w-5 h-5 mr-2" />
              Pay to Activate
            </button>
          </div>
        </Modal>
      )}
      {mentorData && (
        <div
          className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-600 hover:scale-105 transition-transform duration-300"
          onClick={() =>
            user
              ? mentorData
                ? mentorData.isPremium
                  ? navigate("/create-webinar")
                  : setShowPremiumModal(true)
                : setShowMentorModal(true)
              : setShowLoginModal(true)
          }
          disabled={disabled}
        >
          <FaPlus className="text-xl" />
        </div>
      )}
    </div>
  );
}

function WebinarCard({ webinar }) {
  const navigate = useNavigate();

  const calculate = (date) => {
    let newDate = new Date(date);
    return `${newDate.toDateString()} ${newDate.toLocaleTimeString()}`;
  };

  return (
    <div className="flex border rounded-xl border-slate-400 shadow-lg p-5 lg:mx-auto my-5 lg:m-2 flex-col md:flex-row lg:w-10/12 xl:w-11/12">
      <div className="flex items-center justify-center px-1 w-full md:w-6/12 lg:max-w-96">
        <img
          src={webinar.photo.url}
          className="rounded-lg w-full 3xl:w-10/12"
          alt="webinar"
        />
      </div>
      <div className="p-4 flex md:w-1/2 justify-center flex-col ">
        <p className="text-orange-600 font-semibold">
          {calculate(webinar.startTime)}
        </p>
        <h1 className="font-semibold text-2xl whitespace-break-spaces">
          {webinar.title}
        </h1>
        <div className="flex items-center my-2">
          <img
            src={webinar.creator.photo}
            className="max-w-8 rounded-full mr-3"
          />
          <p>{webinar.creator.name}</p>
        </div>
        <div className="flex flex-col md:flex-row ">
          {webinar.status === "Past" ? (
            <button
              className="p-3 mt-3 lg:p-2 md:mr-5 border-orange-500 border-2 rounded-xl md:w-2/5 lg:w-48"
              onClick={() => navigate(`/detailedWebinar/${webinar._id}`)}
            >
              See Details
            </button>
          ) : (
            <>
              <button
                className="p-3 mt-3 lg:p-2 lg:mr-5 border-orange-500 border-2 rounded-xl md:w-3/5 lg:w-48"
                onClick={() => navigate(`/detailedWebinar/${webinar._id}`)}
              >
                Register for Webinar
              </button>
              <button className="p-3 mt-3 border-orange-500 border-2 bg-orange-500 text-white rounded-xl md:w-3/5 lg:w-48">
                Book a Free Trial
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function DataFetchLoading() {
  return (
    <div
      className="flex-col flex items-center
          justify-center text-lg p-4"
    >
      <img src={Loader} className="max-w-80" />
    </div>
  );
}

export default Webinars;
