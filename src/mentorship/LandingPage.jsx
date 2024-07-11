import "./LandingPage.css";
import bgImg from "../assets/teachingjobs.jpg";
import mentor1 from "../assets/mentors/mentor1.jpg";
import mentor2 from "../assets/mentors/mentor21.jpg";
import mentor3 from "../assets/mentors/mentor3.jpg";
import mentor4 from "../assets/mentors/mentor4.jpg";
import mentor5 from "../assets/mentors/mentor5.jpg";
import mentor6 from "../assets/mentors/mentor61.jpg";
import mentor7 from "../assets/mentors/mentor7.jpg";
import mentor8 from "../assets/mentors/mentor8.jpg";
import mentor9 from "../assets/mentors/mentor9.jpg";
import mentor10 from "../assets/mentors/mentor101.jpg";
import mentor11 from "../assets/mentors/mentor111.jpg";
import guru from "../assets/guru.jpg";
import success from "../assets/success.jpg";
import success2 from "../assets/success2.jpg";
import start from "../assets/start.png";
import Lines from "./TsParticles/Lines";
import together from "../assets/together.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connectingLines } from "./TsParticles/options.js";
import axios from "axios";
import { useState } from "react";
import Modal from "../Modal.jsx";
import { CiEdit } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

function LandingPage() {
  const qualities = [
    {
      title1: "Worthy of the ",
      title2: '"Guru” title.',
      img: guru,
    },
    {
      title1: "Whom people can trust ",
      title2: "with their dreams.",
      img: success2,
    },
    {
      title1: "An Inspiration & ",
      title2: "example to follow",
      img: success,
    },
  ];

  const imagesUpper = [mentor10, mentor1, mentor2, mentor3, mentor4, mentor5];
  const imagesLower = [mentor6, mentor7, mentor8, mentor9, mentor10, mentor11];
  const navigate = useNavigate();
  const [isAlreadyMentor, setIsAlreadyMentor] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAlreadyMentorModal, setIsAlreadyMentorModal] = useState(false);
  const [user,setUser] = useState("")
  const [mentorData, setMentorData] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleClick = () => {
    if (isAlreadyMentor) {
      setIsAlreadyMentorModal(true);
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        navigate("/become-a-mentor");
      } else {
        setShowModal(true);
      }
    }
  };
  const togetherText = [
    "Help others to achieve their dreams",
    "Reach, influence & inspire masses",
    "Earn a second income",
    "Grow your network",
    "Enhance your skills",
    "Be known & respected",
  ];
  async function fetchData() {
    const u = JSON.parse(localStorage.getItem("user"));
  setUser(u)
  if (u && u.email) {
    await axios
      .get("https://learndukeserver.vercel.app/isAlreadyMentor/" + u.email)
      .then((res) => {
        if (res.data.success === true) {
          setIsAlreadyMentor(true);
          setMentorData(res.data.mentor);
        }
      }).then(setDisabled(false))
  }
}
  useEffect(() => {
    window.scrollTo(0, 0);
    
fetchData();
}, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  }
  return (
    <div className="relative flex items-center justify-center flex-col  py-2">
      <div className="absolute top-0 w-full h-8 flex items-center  justify-center bg-gradient-to-r from-yellow-300 to-orange-300">
        <p className="whitespace-nowrap text-sm md:text-base lg:text-base font-light">
          Early bird offer{" "}
          <span className="font-semibold">lifetime validity</span> for first{" "}
          <span className="font-semibold">20,000</span> mentors!!
        </p>
      </div>
      <div
        style={{ height: "81vh" }}
        className=" flex flex-col w-full items-center justify-center mt-5 sm:mt-0"
      >
        <p className="mb-10 text-black lg:text-6xl text-4xl mx-3 text-center">
          Can you bring people's
          <br />
          career dreams to reality?
        </p>
        <h1 className="pb-2 m-2 text-black text-3xl text-center">
          “Yes. 100%”
        </h1>
        <p className="px-10 lg:text-xl mx-4 lg:mx-20 py-5 text-center">
          If this is what your heart responded, you have a super power.
          <br /> <span className="font-semibold">LearnDuke</span> platform will
          do every bit to help you realise and exercise this power.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="cursor-pointer p-2 text-center border-2 mx-4 px-4 border-orange-400 rounded-xl hover:bg-orange-400 hover:text-white"
            onClick={() => {
              navigate("/explorementors");
            }}
          >
            Find a Mentor
          </button>
          <button
            className={`cursor-pointer p-2 text-center rounded-xl mx-4 px-4 text-white bg-orange-400
                 hover:bg-white hover:text-black border-2 border-orange-400 
                   ${isAlreadyMentor ? "cursor-not-allowed " : "cursor-pointer"}`}
            onClick={handleClick}
          >
            Become a Mentor
          </button>
        </div>
        <div className="-z-10 absolute" style={{ height: "81vh" }}>
          <Lines particle={connectingLines} />
        </div>
      </div>
      <p className="w-11/12 border-orange-300 border-y-2 mt-10 "></p>
      <div className="my-10 flex items-center justify-center flex-col w-full">
        <p className="px-4 text-center font-semibold text-3xl mb-10">
          What makes a LearnDuke mentor A LearnDuke Mentor?
        </p>
        {qualities.map((quality, index) => (
          <div
            key={index}
            className="border-2 border-slate-400 mx-10 m-6 p-4 rounded-3xl w-4/5 min-h-64 h-96 flex justify-center items-center backdrop-blur-sm shadow-lg shadow-gray-400"
          >
            <p className="text-2xl text-slate-700 lg:text-5xl w-3/6 text-center font-bold p-4">
              {quality.title1}
              <br /> {quality.title2}
            </p>
            <img className="w-3/6 max-w-80 max-h-80 lg:w-3/12" src={quality.img} alt="Img" />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="lg:text-3xl text-center text-2xl text-slate-700 mb-5">
          Blueprint to start making your impact on the world.
        </h1>
        <p className="text-xl p-4 text-center mb-4">
          Set up your long-term mentorship offering
        </p>
        <div className="w-11/12 p-10 border-2 border-b-0 rounded-t-lg border-slate-400 backdrop-blur-sm">
          <h1 className="font-semibold text-xl my-2">
            <i>a. </i>Mentorship Style
          </h1>
          <h3 className="text-slate-600 px-6">
            Describe your unique mentorship style i.e.: Goals & topics you would
            cover, frequency of sessions & follow-ups, etc.
          </h3>
        </div>
        <div className="w-11/12 border-slate-400 p-10 border-2 border-b-0 backdrop-blur-sm">
          <h1 className="font-semibold text-xl my-2">
            <i>b.</i> Pricing
          </h1>
          <h3 className="text-slate-600 px-6">
            Set your own monthly pricing. Edit anytime.
          </h3>
        </div>
        <div className="w-11/12 border-slate-400 p-10 border-2 border-b-0 backdrop-blur-sm">
          <h1 className="font-semibold text-xl my-2">
            <i>c. </i> Direct Communication
          </h1>
          <h3 className="text-slate-600 px-6">
            Direct communication to the student.
          </h3>
        </div>
        <div className="w-11/12 border-slate-400 p-10 border-2 border-b-0 backdrop-blur-sm">
          <h1 className="font-semibold text-xl my-2">
            <i>d. </i> Payment Transparency
          </h1>
          <h3 className="text-slate-600 px-6">
            See your earnings, student feedback & ratings.
          </h3>
        </div>
        <div className="w-11/12 border-slate-400 p-10 border-2 rounded-b-lg flex items-center justify-center backdrop-blur-sm shadow-gray-500">
          <img className="w-8/12" src={start} alt="SampleImage" />
        </div>
      </div>
      <p className="w-11/12 border-orange-300 border-y-2 mt-10 "></p>
      <div className=" flex mt-4 min-h-96 relative item-center flex-col">
        <h1 className="text-2xl backdrop-blur-3xl w-full mb-4 font-semibold text-center mx-auto py-2">
          Mentorship on LearnDuke is rewarding in more ways than one.
        </h1>
        <img
          src={together}
          className="absolute top-1/2 -z-10 max-h-96 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className=" together_container flex items-center flex-wrap justify-center mx-auto">
          {togetherText.map((item, index) => (
            <div
              key={index}
              className="border-2 together border-slate-500 flex items-center justify-center m-3 p-2 text-center rounded-2xl together_obj h-36 text-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <p className="w-11/12 border-orange-300 border-y-2 mt-10 "></p>
      <div className="w-full mt-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl px-10 mx-4 text-center font-bold">
          Join the 1Lakh+ Mentor Army. Be a part of the next edtech revolution.
        </h1>
        <div className="w-full relative m-4 mb-0 flex items-center justify-center flex-col p-4 scroll-container overflow-hidden">
          <div className="flex">
            <div className=" mx-5 flex carousel-primary">
              {imagesUpper.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Mentor"
                  className="w-40 h-40 lg:h-60 lg:w-60 rounded-lg m-2 lg:m-4 shadow-lg shadow-slate-700"
                />
              ))}
            </div>
            <div className=" mx-5 flex carousel-secondary">
              {imagesUpper.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Mentor"
                  className="w-40 h-40 lg:h-60 lg:w-60 rounded-lg m-2 lg:m-4 shadow-lg shadow-slate-700"
                />
              ))}
            </div>
          </div>
          <div className="flex">
            <div className=" mx-5 flex carousel-primary-1">
              {imagesLower.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Mentor"
                  className="w-40 h-40 lg:h-60 lg:w-60 rounded-lg m-2 lg:m-4 shadow-lg shadow-slate-700"
                />
              ))}
            </div>
            <div className=" mx-5 flex carousel-secondary-1">
              {imagesLower.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Mentor"
                  className="w-40 h-40 lg:h-60 lg:w-60 rounded-lg m-2 lg:m-4 shadow-lg shadow-slate-700"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-xl flex flex-col space-y-3 items-center justify-center">
            <div>Please login to become a mentor</div>
            <div>
            <button
            className="bg-black hover:text-black hover:bg-white text-white px-5 py-2 rounded-2xl flex items-center transform hover:scale-105 duration-300 m-2"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className=" text-xl mr-2 mt-0.5" />
            <div>Login</div>
          </button>
            </div>
          </div>
        </Modal>
      )}

      {isAlreadyMentorModal && (
        <Modal
          isOpen={isAlreadyMentorModal}
          onClose={() => setIsAlreadyMentorModal(false)}
        >
          <div className="text-lg flex flex-col space-y-3 items-center justify-center">
            <div className="text-center">
                <img src={mentorData.profilePhoto.url} alt="profile photo" className="rounded-lg max-w-52 max-h-52 md:max-w-60 md:max-h-60 aspect-square object-cover" 
                  style={{boxShadow: "0 0 20px 10px rgba(0,0,0,0.2)"}}
                />
              <h1 className="text-xl font-semibold mt-2">{user.name}</h1>
            </div>
            <div className="text-center">You are already a mentor and 
              <br/>Your profile is 
             {mentorData.isPremium && <span className="text-green-600 text-center border border-green-700 bg-green-200 px-1 mx-2 rounded-md font-semibold">Active</span>}
              {!mentorData.isPremium && <span className="text-red-600 text-center border border-red-700 bg-red-200 px-1 mx-2 rounded-md font-semibold">Inactive</span>}
            </div>
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-center space-y-3 md:space-y-0">
              {/* edit mentor */}
              <button
                className="px-3 py-1 bg-gradient-to-l from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
                onClick={() => {
                  navigate("/become-a-mentor",{state:{mentorData, newData:false }});
                }}
              >
                <CiEdit className="w-5 h-5 mr-2" />
                Edit Mentor
              </button>
              {!mentorData.isPremium && (
                <button
                  className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap flex items-center justify-center space-x-1"
                  onClick={() => {
                    navigate("/mentor/payment",{state:{mentorData, newData:false, modified: false}});
                  }}
                >
                  <MdPayment className="w-5 h-5 mr-2" />
                  Pay to Activate
                </button>
              
              )}
            </div>
          </div>
          
        </Modal>
      
      )}
    </div>
  );
}

export default LandingPage;
