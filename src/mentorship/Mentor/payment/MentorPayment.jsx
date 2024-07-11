import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import sampleUser from "../../../assets/user.png";
import Modal from "../../../Modal.jsx";
import Loader from "../../../Loader.jsx";

function MentorPayment() {
  const [mentorData, setMentorData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [updatedModal, setUpdatedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userPresent = JSON.parse(localStorage.getItem("user"));
    if (!userPresent) {
      navigate("/mentorship");
    }

    axios
      .get("https://learndukeserver.vercel.app/getUser/" + userPresent.email)
      .then((response) => {
        if (response.data === "") {
          localStorage.removeItem("user");
          window.location.reload();
          navigate("/mentorship");
        }

        setUserData(response.data);
      });
    setUser(userPresent);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function getMentorData() {
      setLoading(true);
      let data = await location.state?.mentorData;
      if (!data) {
        navigate("/mentorship");
      }
      let newData = await location.state?.newData;
      setMentorData(data);
      if (newData === true && location.state?.modified === false) {
        setPhoto(data.profilePhoto);
      }
      if (location.state?.modified === false && newData == false) {
        setPhoto(data.profilePhoto?.url);
      }
    }
    getMentorData();
    setLoading(false);
    if (
      location.state?.newData === true &&
      location.state?.modified === false
    ) {
      sendData();
      window.history.replaceState(null, "");
    } else if (
      location.state?.modified === true &&
      location.state?.newData === false
    ) {
      updateData();
      window.history.replaceState(null, "");
    }
  }, [mentorData]);

  async function sendData() {
    setLoading(true);
    if (Object.keys(mentorData).length > 0 && !updatedModal) {
      const u = JSON.parse(localStorage.getItem("user"));
      await axios
        .post(
          `https://learndukeserver.vercel.app/addMentor/${u.email}`,
          mentorData
        )
        .then((res) => {
          setPhoto(res.data.profilePhoto.url);
        });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  async function updateData() {
    setLoading(true);
    if (Object.keys(mentorData).length > 0 && !updatedModal) {
      const u = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `https://learndukeserver.vercel.app/updateMentor/${u.email}`,
        mentorData
      );
      setPhoto(res.data.profilePhoto.url);
      setMentorData(res.data);
      if (res.status === 200) {
        setUpdatedModal(true);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  const plans = [
    {
      name: "Basic",
      price: 99, // in INR
      benefits: [
        "30 Days Validity",
        "Student can connect directly",
        "Minimum earning 10k/month",
        "24/7 Support",
      ],
      days: 30,
    },
    {
      name: "Advance",
      price: 199, // in INR
      benefits: [
        "100 Days Validity",
        "Student can connect directly",
        "Minimum earning 15k/month",
        "5 Personalized Ads",
        "24/7 Support",
      ],
      days: 100,
    },
    {
      name: "Premium",
      price: 499,
      benefits: [
        "Lifetime membership for first 3000 members",
        "365 Days Validity",
        "Student can connect directly",
        "Minimum earning 30k/month",
        "Unlimited Personalized Ads",
        "Personal Training Sessions",
        "24/7 Support",
      ],
      days: 365,
    },
  ];

  const handlePayment = (name) => {
    const isMentor = true;
    if(userData){
      window.location.href = `https://learndukeserver.vercel.app/pay/${name}/${userData.email}/${isMentor}`;
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleNavigate = () => {
    setUpdatedModal(false);
    if (mentorData.isPremium == true) {
      navigate("/mentorship");
    }
  };

  return user ? (
    !loading ? (
      <div className=" flex item-center justify-center flex-col relative">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-col flex-1 flex items-center w-full">
            <div className="flex w-9/12 h-72 items-center justify-center  rounded-xl mt-10 p-1 shodow-lg flex-col">
              {photo  ? (
                <img
                  src={photo || sampleUser}
                  alt={user?.name}
                  className="h-40 border-2 border-slate-300 rounded-2xl"
                />
              ) : (
                // skeliton loader
                <div className="animate-pulse h-40 w-40 bg-gray-300 rounded-full"></div>
              )}
              <div className="mt-4 text-2xl font-serif">{user?.name}</div>
            </div>

            <h1 className="text-lg sm:10/12 lg:w-10/12 md:w-11/12 font-semibold text-center mx-4 -mt-5 p-3">
              Your mentor profile has been created.
              <br /> Make a purchase in order to make it visible to the users.
            </h1>
          </div>
          <p className="w-11/12 border-orange-300 border-y-2 mx-auto lg:hidden"></p>
          <div className="flex-1 m-5 flex-col flex items-center mt-9">
            <div className=" border-2 bg-orange-500 text-white flex flex-col items-center rounded-lg border-slate-500 w-10/12">
              <h1 className="text-3xl mx-auto my-3 px-3 text-center font-semibold">
                Benefits of Teacher Pass
              </h1>
              <ul className="list-disc list-inside font-normal">
                <li className="ml-2 p-2 text-lg">
                  Better Profile Visibility. You can get Home Tututions, Online
                  Tututions and even Job opportunity from Education Section.
                </li>
                <li className="m-2 p-2 text-lg">
                  Networking Opportunity. Connect with large number of users.
                </li>
                <li className="m-2 p-2 text-lg">
                  Earn a side income of 10 to 30k per month.
                </li>
                <li className="m-2 p-2 text-lg">
                  Help millions of students grow by mentoring them.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="w-11/12 border-orange-300 border-y-2 mx-auto "></p>
        <div className="w-full p-4 flex items-center flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Mentor Plans
          </h1>
          <div className="w-full flex flex-wrap items-center justify-center ">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="border-2 relative w-80 p-4 bg-white rounded-lg m-4 flex flex-col min-h-80"
                style={{ boxShadow: "0 0 10px 0 rgba(249, 115, 22, 0.5)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold">{plan.name}</div>
                  <div className="text-xl font-semibold">₹{plan.price}</div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    {plan.benefits.map((benefit, i) => (
                      <div key={i} className="mb-2 flex ">
                        <FaCheck className="text-green-500 mr-2 mt-1.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <button
                      className="px-4 py-2 border-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white border-2  transition duration-200 absolute bottom-3 right-3"
                      onClick={() => openModal(plan)}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal onClose={() => setShowModal(false)} isOpen={showModal}>
          <div className="relative">
            <h3 className="text-3xl font-semibold">{selectedPlan?.name}</h3>
            <p className="text-xl my-1">Price: ₹{selectedPlan?.price}</p>
            <ul className="list-disc list-inside mb-4">
              {selectedPlan?.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 absolute bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200 bottom-0 right-1"
                onClick={() => {
                  setShowModal(false);
                  handlePayment(
                    selectedPlan?.name,
                  );
                }}
              >
                Pay
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={updatedModal} onClose={handleNavigate}>
          <div className="text-xl flex items-center justify-center">
            Your profile has been updated successfully
          </div>
        </Modal>
      </div>
    ) : (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  ) : (
    <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-500">
      Please login to view mentor plans
    </div>
  );
}

export default MentorPayment;
