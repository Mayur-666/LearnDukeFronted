import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Loader from "../Loader";

export default function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigator = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [userData, setUserData] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [jobAlerts, setJobAlerts] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [openDomainModal, setOpenDomainModal] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [imageChange, setImageChange] = useState(false);
  const [isLinkedinValid, setIsLinkedinValid] = useState(false);
  const [isGithubValid, setIsGithubValid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileUpdate, setProfileUpdate] = useState(false);
  const [IsValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidWhatsappNumber, setIsValidWhatsappNumber] = useState(false);

  const domainOptions = [
    "Information Technology (IT)",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Telecommunications",
    "Construction",
    "Hospitality",
    "Transportation and Logistics",
    "Real Estate",
    "Media and Entertainment",
    "Marketing and Advertising",
    "Energy and Utilities",
    "Government",
    "Non-Profit",
    "Consulting",
    "Legal",
    "Automotive",
    "Pharmaceuticals",
    "Consumer Goods",
    "Agriculture",
    "Aerospace and Defense",
    "Insurance",
    "Human Resources",
    "Research and Development (R&D)",
    "Biotechnology",
    "Food and Beverage",
    "Environmental Services",
    "Sports and Recreation",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${user.email}`)
        .then((response) => {
          if (response.data === "") {
            localStorage.removeItem("user");
            window.location.reload();
            navigator("/");
          }
          setUserData(response.data);
          setJobAlerts(response.data.jobAllerts);
          setIsPremium(response.data.isPremium);
          setSelectedDomains(response.data.jobAllerts);
          axios
            .get(`https://learndukeserver.vercel.app/getJobs/${user.email}`)

            .then((jobsResponse) => {
              setJobs(jobsResponse.data);
            });
          setLoading(false);
        })
        .catch((error) => {
          setError("There was an error fetching the user data.");
          setLoading(false);
        });

      axios
        .get(
          `https://learndukeserver.vercel.app/getSubscriptions/${user.email}`
        )
        .then((response) => {
          setActiveSubscriptions(response.data);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleDelete = (jobId) => {
    axios
      .delete(`https://learndukeserver.vercel.app/deleteJob/${jobId}`)
      .then((response) => {
        setJobs(jobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        console.error("There was an error deleting the job:", error);
      });
  };

  const handleDomainChange = (domain) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleSaveDomains = () => {
    const updatedJobAlerts = selectedDomains;
    // remove duplicates
    const uniqueJobAlerts = [...new Set(updatedJobAlerts)];
    setJobAlerts(updatedJobAlerts);
    setUserData({
      ...userData,
      jobAllerts: uniqueJobAlerts,
    });

    axios
      .post(`https://learndukeserver.vercel.app/jobAlerts/${user.email}`, {
        jobAlerts: uniqueJobAlerts,
      })
      .then((response) => {
        setShowModal(true);
      })
      .catch((error) => {
        alert("Error updating job alerts");
      });
    setOpenDomainModal(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const titleMatch =
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const descriptionMatch = job?.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const locationMatch =
      job?.location?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const jobTypeMatch = !filterOption || job?.jobType === filterOption;

    return (titleMatch || descriptionMatch || locationMatch) && jobTypeMatch;
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData({
          ...userData,
          profilephoto: {
            url: e.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
    setImageChange(true);
  };

  const handleSaveProfile = () => {
    const linkedinRegex = new RegExp(
      "^(https?://)?(www.)?linkedin.com/in/([a-zA-Z0-9-.]+)$"
    );
    const githubRegex = new RegExp(
      "^(https?://)?(www.)?github.com/([a-zA-Z0-9-.]+)$"
    );

    if (userData.linkedin && !linkedinRegex.test(userData.linkedin)) {
      setIsLinkedinValid(true);
      return;
    }

    if (userData.github && !githubRegex.test(userData.github)) {
      setIsGithubValid(true);
      return;
    }

    if (userData.phoneNumber.length !== 10) {
      setIsValidPhoneNumber(true);
      return;
    }

    if (userData.whatsappNumber.length !== 10) {
      setIsValidWhatsappNumber(true);
      return;
    }
    axios
      .post(`https://learndukeserver.vercel.app/editUserData/${user.email}`, {
        userData,
        imageChange,
      })
      .then((response) => {
        setProfileUpdate(true);
        setIsEditEnabled(false);
        setImageChange(false);
      });
  };

  const calculateDaysLeft = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = Math.abs(expiration - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const isSubscriptionActive = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration >= today;
  };
  const renewSubscription = (plan) => {
    navigator("/subscription");
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <>
        {/* loader animation */}

        <div className="w-full flex justify-center h-screen items-center">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
          <p className="text-center text-4xl font-bold">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full flex justify-center h-screen items-center">
        <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
          <p className="text-center text-4xl font-bold">Not Authorized</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full md:w-10/12 lg:w-9/12 flex flex-col px-4">
        <div>
          {isEditEnabled ? (
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between">
                <div className="text-2xl font-semibold">Edit Profile</div>
                <button
                  onClick={() => setIsEditEnabled(false)}
                  className=" bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                >
                  Cancel
                </button>
              </div>
              <div className="flex justify-center m-5">
                <label
                  htmlFor="profilePhotoInput"
                  className="relative cursor-pointer group"
                >
                  <img
                    src={userData.profilephoto.url}
                    alt=""
                    className="w-20 rounded-full"
                  />
                </label>
                <input
                  type="file"
                  id="profilePhotoInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold">LinkedIn</label>
                  <input
                    type="text"
                    value={userData.linkedin}
                    onChange={(e) =>
                      setUserData({ ...userData, linkedin: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  {isLinkedinValid && (
                    <div className="text-red-500">
                      Enter a valid LinkedIn URL
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-semibold">GitHub</label>
                  <input
                    type="text"
                    value={userData.github}
                    onChange={(e) =>
                      setUserData({ ...userData, github: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  {isGithubValid && (
                    <div className="text-red-500">Enter a valid GitHub URL</div>
                  )}
                </div>
                <div>
                  <label className="block font-semibold">Phone Number</label>
                  <input
                    type="number"
                    value={userData.phoneNumber}
                    onChange={(e) => {
                      setUserData({ ...userData, phoneNumber: e.target.value });
                    }}
                    className="w-full p-2 border rounded"
                    // number of digits 10
                  />
                  {IsValidPhoneNumber && (
                    <div className="text-red-500">
                      Enter a valid Phone Number
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-semibold">WhatsApp Number</label>
                  <input
                    type="number"
                    value={userData.whatsappNumber}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        whatsappNumber: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded"
                  />
                  {isValidWhatsappNumber && (
                    <div className="text-red-500">
                      Enter a valid WhatsApp Number
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label className="block font-semibold">Bio</label>
                  <textarea
                    value={userData.bio}
                    onChange={(e) =>
                      setUserData({ ...userData, bio: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    rows={10}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex flex-col items-center bg-orange-50 p-5 rounded-none md:rounded-l-3xl shadow-lg">
                <img
                  src={userData?.profilephoto.url}
                  alt="Profile pic"
                  className="w-2/4 rounded-full my-5"
                />
                <div className="text-2xl font-semibold my-3 text-center flex justify-center items-center">
                  {userData?.name}
                  {userData?.isPremium && (
                    <div className="text-xs text-center items-center flex justify-center  mx-2 border-2 w-1/5 border-orange-500 py-1 px-4 rounded-xl mt-1">
                      PRO
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-2/3 bg-orange-100 p-5 rounded-none md:rounded-r-3xl">
                <div className="flex justify-between">
                  <div className="text-2xl font-semibold my-3 text-orange-500">
                    About Me
                  </div>
                  <button
                    className="text-white bg-orange-500 px-5 h-12  rounded-md"
                    onClick={() => setIsEditEnabled(true)}
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center space-x-5 my-5">
                  {userData.linkedin && (
                    <div
                      className="p-3 rounded-lg cursor-pointer"
                      onClick={() => window.open(userData.linkedin, "_blank")}
                    >
                      <FaLinkedin className="text-3xl text-blue-800" />
                    </div>
                  )}
                  {userData.github && (
                    <div
                      className="p-3 rounded-lg cursor-pointer"
                      onClick={() => window.open(userData.github, "_blank")}
                    >
                      <FaGithub className="text-3xl text-gray-800" />
                    </div>
                  )}
                  {/* {userData.isPremium && (
                    <div className="bg-green-200 border-2 border-green-300 p-2 rounded-lg ">
                      Premium Member
                    </div>
                  )} */}
                </div>
                <div>{userData.bio}</div>
                {userData && (
                  <div>
                    <div className="text-2xl font-semibold my-3 text-orange-600">
                      Contact
                    </div>
                    {userData.phoneNumber && (
                      <div className="text-lg mb-2">
                        <span className="mr-2">Phone:</span>
                        {userData.phoneNumber}
                      </div>
                    )}
                    {userData.whatsappNumber && (
                      <div className="text-lg mb-2">
                        <span className="mr-2">WhatsApp:</span>
                        {userData.whatsappNumber}
                      </div>
                    )}
                    {userData.email && (
                      <div className="text-lg mb-2">
                        <span className="mr-2">Email:</span>
                        {userData.email}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* job allerts */}

        {isPremium && (
          <div className="mt-5">
            <h1 className="text-2xl font-bold mb-4">Job Alerts</h1>
            {jobAlerts.length > 0 && (
              <div className=" p-4 bg-white shadow-md rounded-lg">
                <div className="flex flex-wrap gap-4">
                  {jobAlerts.map((jobAlert, index) => (
                    <div
                      key={index}
                      className=" p-2 mr-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm flex justify-center items-center"
                    >
                      <span>{jobAlert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {jobAlerts.length !== domainOptions.length ? (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setOpenDomainModal(true)}
              >
                Add More Domains
              </button>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setOpenDomainModal(true)}
              >
                No More Domains to Add
              </button>
            )}
          </div>
        )}
        {openDomainModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-96">
              <h3 className="text-xl font-bold mb-4">Select Domains</h3>
              <div className="mb-4 max-h-60 overflow-y-auto p-2">
                {domainOptions.map((domain, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`domain-${index}`}
                      checked={selectedDomains.includes(domain)}
                      onChange={() => handleDomainChange(domain)}
                      className="mr-2"
                    />
                    <label htmlFor={`domain-${index}`}>{domain}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setOpenDomainModal(false);
                    setSelectedDomains(jobAlerts);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDomains}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="text-xl flex items-center justify-center">
              Job alerts updated successfully.
            </div>
          </Modal>
        )}
        {profileUpdate && (
          <Modal isOpen={profileUpdate} onClose={() => setProfileUpdate(false)}>
            <div className="text-xl flex items-center justify-center">
              Profile Updated successfully.
            </div>
          </Modal>
        )}

        {!isPremium && (
          <div className="mt-10 p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Upgrade to Premium</h1>
            <p className="text-lg">
              Get access to premium features like job alerts, priority job
              applications, and more by upgrading to a premium account.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300"
              onClick={() => {
                navigator("/subscription");
              }}
            >
              Upgrade to Premium
            </button>
          </div>
        )}

        {/* Active subscriptions */}

        <div>
          {activeSubscriptions.length > 0 && (
            <div className="mt-10">
              <h1 className="text-2xl font-bold">Active Subscriptions</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {activeSubscriptions.map((subscription) => subscription && (
                  <div
                    key={subscription._id}
                    className="rounded-xl border-2 border-slate-300 p-5"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div>
                      <div className="flex flex-col mb-4">
                        <div className="flex justify-between items-center">
                          <div className="ml-2 text-lg font-semibold">
                            {subscription.plan}
                          </div>
                          {isSubscriptionActive(subscription.expirationDate) ? (
                            <div className="bg-green-200 text-green-800 px-2 py-1 rounded-md">
                              Active
                            </div>
                          ) : (
                            <div className="bg-red-200 text-red-800 px-2 py-1 rounded-md">
                              Expired
                            </div>
                          )}
                        </div>
                        <div className="mt-3 text-gray-700">
                          <span className="font-semibold">Start Date</span>:{" "}
                          {formatDate(subscription.paymentDate)}
                        </div>
                        <div className="mt-3 text-gray-700">
                          <span className="font-semibold">End Date</span>:{" "}
                          {formatDate(subscription.expirationDate)}
                        </div>
                        <div className="flex flex-wrap mt-3 space-x-2">
                          <div className="flex items-center mt-3">
                            <FaWallet className="w-6 h-6 mr-2 text-orange-400" />
                            <span>₹{subscription.amount}</span>
                          </div>
                          {isSubscriptionActive(subscription.expirationDate) ? (
                            <div className="mt-3">
                              Days Left:{" "}
                              {calculateDaysLeft(subscription.expirationDate)}
                            </div>
                          ) : (
                            <button
                              className="mt-3 px-4 py-2 bg-black text-white font-semibold rounded hover:bg-gray-800 transition duration-200"
                              onClick={() =>
                                renewSubscription(subscription.plan)
                              }
                            >
                              Renew Subscription
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mt-10 mb-5">Your Jobs</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 mr-4 w-1/3"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="">Filter by job type...</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div className="w-full">
          {filteredJobs.length === 0 ? (
            <p className="text-lg">No jobs available</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl border-2 border-slate-300 p-5"
                  style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                >
                  <div>
                    <div className="flex flex-col mb-4">
                      <div className="flex justify-between items-center">
                        <div className="ml-2 text-lg font-semibold">
                          {job.title}
                        </div>
                        {job.isReviewed && (
                          <div className="bg-green-200 text-green-800 px-2 py-1 rounded-md">
                            Accepted
                          </div>
                        )}
                        {job.isRejected && (
                          <div className="bg-red-200 text-red-800 px-2 py-1 rounded-md">
                            Rejected
                          </div>
                        )}
                        {!job.isReviewed && !job.isRejected && (
                          <div className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-md">
                            Pending
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-gray-700">
                        {job.description.slice(0, 100) + "...."}
                      </div>
                      <div className="flex flex-wrap mt-3 space-x-2">
                        <div className="flex items-center mt-3 bg-gray-100 px-2 py-1 rounded-lg text-gray-500">
                          <FaWallet className="w-6 h-6 mr-2 " />
                          <span>
                            &#8377;{job.minAmountPerHour}-&#8377;
                            {job.maxAmountPerHour}/Month
                          </span>
                        </div>
                        <div className="bg-gray-100 text-gray-500 items-center mt-3 pl-3 pr-3 rounded-lg flex text-center">
                          {job.jobType}
                        </div>
                        {job.location && (
                          <div className="bg-gray-100 text-gray-500 items-center mt-3 pl-3 pr-3 rounded-lg flex text-center">
                            {job.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setConfirmModal(job._id)}
                      className="bg-red-500 text-white px-4 py-3 rounded-3xl text-center"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {confirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setConfirmModal(false)}
            >
              <span className="text-2xl">&times;</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this job?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
                onClick={() => {
                  setConfirmModal(false);
                  handleDelete(
                    jobs.find((job) => job._id === confirmModal)._id
                  );
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
