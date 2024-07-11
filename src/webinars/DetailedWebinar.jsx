import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import { MdLiveTv } from "react-icons/md";
import { MdEmergencyRecording } from "react-icons/md";
import { IoDocumentSharp } from "react-icons/io5";
import { BsFillTagsFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { GiSandsOfTime } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { IoMdUndo } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import Modal from "../Modal";

function Detailedwebinar() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [copy, setCopy] = useState(false);
  const [user, setUser] = useState(null);
  const [registerModal, setRegisterModal] = useState(false);

  const handleClickcopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  {/* /* --------------------------changed------------------------------- */}
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.get(`http://localhost:3000/getUser/${user.email}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
    }).then(() => {

      
      if (id) {
        axios.get(`http://localhost:3000/getWebinar/${id}`).then((res) => {
        console.log(res.data);
        setWebinar(res.data.webinar);
        setMentor(res.data.mentor);
      });
    }
  })
  }, [id]);

  if (!webinar) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const additionalBenefits = [
    {
      name: "Live Q&A",
      description:
        "Join the mentor's live Q&A to ask questions, learn from others, and clear up any confusion.",
      icon: <MdLiveTv />,
    },
    {
      name: "Recording of the entire Session",
      description:
        "Once the session is done, we'll provide you with a recording of the entire thing.",
      icon: <MdEmergencyRecording />,
    },
    {
      name: "Exciting Quiz sessions",
      description:
        "Participate in the mentor's quiz for a good time and to clarify any doubts you may have.",
      icon: <IoDocumentSharp />,
    },
    {
      name: "Exclusive Discount on all our 1:1 mentorship programs",
      description:
        "Receive an exclusive participant-only discount coupon for any mentorship plan.",
      icon: <BsFillTagsFill />,
    },
  ];

  {/* /* --------------------------changed------------------------------- */}

  const handleUnregister = async() => {
    await axios.post("http://localhost:3000/unregister-for-webinar", {
      mail: user.email,
      webinarId: id
    }).then((res)=> {
      console.log(res.data)
      setWebinar((prev) => ({
        ...prev,
          participants: webinar.participants.filter((obj) => obj !== user._id),
        }));
      });
    console.log(webinar);
  };

  {/* /* --------------------------changed------------------------------- */}

  const handleRegister = async() => {
    if(webinar.isPaid){
      setRegisterModal(true)
    }else{
      await axios
      .post("http://localhost:3000/register-for-webinar", {
        mail: user.email,
        webinarId: webinar._id,
      })
      .then((res) => {
        console.log(res.data);
        setWebinar((prevWebinar) => ({
          ...prevWebinar,
          participants: [...prevWebinar.participants, user._id],
        }));
      });
    }
  };

  return (
    <div className="flex justify-center" style={{ backgroundColor: "#fafafa" }}>
      <div className="w-full lg:w-10/12 pt-5 md:pt-10 p-2">
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full md:w-4/6">
            <div
              className="font-bold tracking-normal leading-relaxed p-2 text-lg md:text-2xl"
              style={{ color: "#1a1a1a" }}
            >
              {webinar.title}
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white">
              <img src={webinar.photo.url} alt="webinar" className="w-full h-auto" />
              <hr className="my-4" />
              <div className="flex justify-between">
                <div className="flex items-center space-x-5">
                  <img
                    src={mentor.profilePhoto.url}
                    alt=""
                    className="h-14 rounded-full"
                  />
                  <div className="flex space-x-2">
                    <div>{mentor.name}</div>
                    <div className="text-sm border border-blue-400 text-blue-400 px-2 rounded-xl">
                      Mentor
                    </div>
                  </div>
                </div>
                <div>
                  <button className="bg-black text-white p-3 rounded-lg">
                    Book a FREE 1:1 Trial Session
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">About the Webinar</div>
              <hr className="my-4" />
              <div className="py-5">{webinar.description}</div>
              <div className="py-5">During the session, we'll cover:</div>
              {webinar.topics &&
                webinar.topics.map((topic, index) => (
                  <div key={index} className="mb-7">
                    <div className="font-semibold">{topic.name}</div>
                    <ul className="list-disc pl-5 text-gray-300 mt-3">
                      {topic.description.map((desc, i) => (
                        <li
                          key={i}
                          style={{ color: "#3B4152" }}
                          className="m-2"
                        >
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              <hr className="my-4" />
              <div className="flex justify-between mt-5">
                <div className="flex items-center space-x-5">
                  <img
                    src={mentor.profilePhoto.url}
                    alt=""
                    className="h-14 rounded-full"
                  />
                  <div className="flex space-x-2">
                    <div>{mentor.name}</div>
                    <div className="text-sm border border-blue-400 text-blue-400 px-2 rounded-xl">
                      Mentor
                    </div>
                  </div>
                </div>
                <div>
                  <button className="bg-black text-white p-3 rounded-lg">
                    Book a FREE 1:1 Trial Session
                  </button>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 p-6 rounded-xl bg-white mt-10">
              <div className="text-xl font-bold">Additional Benefits</div>
              <hr className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {webinar.additionalBenefits &&
                  webinar.additionalBenefits.map((benefitName, index) => {
                    const benefit = additionalBenefits.find(
                      (b) => b.name === benefitName
                    );
                    return (
                      benefit && (
                        <div
                          key={index}
                          className="flex items-start rounded-lg border border-gray-300 p-3"
                        >
                          <div className="mr-2 mt-1 text-gray-500 text-2xl">
                            {benefit.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{benefit.name}</div>
                            <div className="text-gray-700">
                              {benefit.description}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/6 mt-7 ">
            <div className="bg-white p-5 m-5 rounded-lg border border-gray-300 flex flex-col space-y-3">
              {/* /* --------------------------changed------------------------------- */}
              {
                webinar.status !== "Past" && 
                <div className="text-sm font-semibold text-green-500">
                Register for FREE Live Webinar
              </div>
              }
              <div className="flex items-center text-lg">
                <SlCalender />
                <div className="ml-2">
                  <div className=" font-semibold">
                    {/* /* --------------------------changed------------------------------- */}
                    {months[new Date(webinar.startTime).getMonth()]}{" "}
                    {new Date(webinar.startTime).getDate()} ,
                    {new Date(webinar.startTime).getFullYear()}{" | "}
                    {
                      new Date(webinar.startTime)
                        .toLocaleString().substring(11)// Safely get the timezone part
                    }
                  </div>
                </div>
              </div>
              <div>
                {/* /* --------------------------changed------------------------------- */}
                {webinar.status === "Past" ? 
                <div className="text-lg font-semibold">
                  Webinar has already ended!
                </div> : 
                <div>
                  {webinar.participants.includes(user._id) ? (
                    webinar.status === "Live" ? (
                      <button
                        className="bg-blue-400 text-white p-3 rounded-lg w-full"
                        onClick={() => window.open(webinar.liveLink, "_blank")}
                      >
                        Join Webinar
                      </button>
                    ) : (
                      <div className="flex md:flex-col flex-row">
                        <button className="bg-green-200 text-green-600 border border-green-600 cursor-default p-3 rounded-lg w-10/12 md:w-full mx-1 md:my-2 md:mx-0">
                          Registered
                        </button>
                        <button
                          className="bg-red-200 text-red-700 border border-red-700 cursor-pointer py-3 rounded-lg w-2/12 md:w-full text-center flex items-center justify-center"
                          onClick={handleUnregister}
                        >
                          Undo
                          <span className="mx-1">
                            <IoMdUndo />
                          </span>
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      className="bg-black text-white p-3 rounded-lg w-full"
                      onClick={handleRegister}
                    >
                      Register Now
                    </button>
                  )}
                </div>
                }
                {/* /* --------------------------changed------------------------------- */}
              </div>
              {webinar.status !== "Past" && <>
                <hr className="my-4" />
                <div className="flex justify-between">
                <div></div>
                <div className="flex items-center space-x-2 text-orange-400">
                  <GiSandsOfTime
                    style={{
                      animation: "spin 2s linear infinite",
                    }}
                    className=""
                    />
                  <span>Only Few Seats Left</span>
                </div>
              </div></>}
            </div>

            <div className="bg-white p-5 m-5 rounded-lg border border-gray-300 flex flex-col space-y-3">
              <div className="flex space-x-3">
                <img
                  src={mentor.profilePhoto.url}
                  className="w-24 rounded-lg"
                  alt=""
                />
                <div>{mentor.name}</div>
              </div>
              <div className="text-sm leading-tight text-gray-400">
                "{mentor.description}"
              </div>
              <hr className="my-4" />
              <div className="flex flex-wrap">
                {mentor.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-500 px-2 py-1 rounded-lg m-1"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              {/* /* --------------------------changed------------------------------- */}
              {
                webinar.isPaid && 
                <div className="flex space-x-3 items-center">
                <div className="flex items-center space-x-2">
                Price of Webinar : <span className="text-lg font-bold"> ₹{webinar.price} /-</span>
                </div>
              </div>
              }
              <div>
                <button className="text-black border border-gray-300 p-3 rounded-lg w-full">
                  View Profile
                </button>
              </div>

              <div>
                <div className="text-white bg-blue-500 p-2 text-center rounded-t-xl font-semibold">
                  Book a Free Trial
                </div>
                <div className="text-center text-sm border border-blue-500 p-2 rounded-b-xl bg-blue-100">
                  <span>
                    Next available:{" "}
                    <span className="text-green-500">Tomorrow</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-5 m-5 rounded-lg border border-gray-300 flex flex-col space-y-3">
              <div>
                <div>Spread the word</div>
                <hr className="my-4" />
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={window.location.href}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    contentEditable={false}
                  />

                  {copy ? (
                    <div className="text-green-500 mt-2 text-3xl">
                      <TiTick />
                    </div>
                  ) : (
                    <button
                      className="text-gray-500 p-2 rounded-lg"
                      onClick={handleClickcopy}
                    >
                      <IoCopyOutline />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /* --------------------------changed------------------------------- */}
      {
        <Modal isOpen={registerModal} onClose={() => setRegisterModal(false)}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-2xl mb-2">
              This is a paid webinar.
            </h1>
            <p className="text-center text-lg mb-1">
              You have to pay ₹{webinar.price}/- <br />
            </p>
            <button className="px-6 py-2 mt-1 rounded-lg border-2 border-green-500 bg-green-100 text-green-600"
            onClick={() => 
               window.location.href = `http://localhost:3000/pay/webinar?webinarId=${webinar._id}&mail=${user.email}`
            }
            >Pay Now</button>
          </div>
        </Modal>
      }
    </div>
  );
}

export default Detailedwebinar;
