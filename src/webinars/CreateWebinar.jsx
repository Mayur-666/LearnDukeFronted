import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

function CreateWebinar() {
  const initialWebinarState = {
    title: "",
    description: "",
    domain: "",
    startTime: "",
    endTime: "",
    isPaid: false,
    price: function () {
      return this.isPaid === true ? 0 : null;
    },
    additionalBenefits: [],
    topics: [{ name: "", descriptions: [""] }],
  };
  const [webinar, setWebinar] = useState({
    title: "",
    description: "",
    domain: "",
    startTime: "",
    endTime: "",
    liveLink: "",
    isPaid: false,
    price: function () {
      return this.isPaid === true ? 0 : null;
    },
    additionalBenefits: [],
    topics: [{ name: "", descriptions: [""] }],
  });
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      navigate("/webinars");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3000/create-webinar", {
      mail: user.email,
      webinar,
    });

    console.log(res.data);
    setWebinar(initialWebinarState);
    if (res.status === 200) {
      // need to open the res.data link

      window.open(res.data, "_blank");
      // setSuccessModal(true)
    }
    // else{
    //   setFailureModal(true)
    // }
  };

  const handleTopicChange = (index, value) => {
    const newTopics = webinar.topics.map((topic, i) =>
      i === index ? { ...topic, name: value } : topic
    );
    setWebinar({ ...webinar, topics: newTopics });
  };

  const handleDescriptionChange = (topicIndex, descIndex, value) => {
    const newTopics = webinar.topics.map((topic, i) =>
      i === topicIndex
        ? {
            ...topic,
            descriptions: topic.descriptions.map((desc, j) =>
              j === descIndex ? value : desc
            ),
          }
        : topic
    );
    setWebinar({ ...webinar, topics: newTopics });
  };

  const addTopic = () => {
    setWebinar((prevState) => ({
      ...prevState,
      topics: [...prevState.topics, { name: "", descriptions: [""] }],
    }));
  };

  const addDescription = (index) => {
    const newTopics = webinar.topics.map((topic, i) =>
      i === index
        ? { ...topic, descriptions: [...topic.descriptions, ""] }
        : topic
    );
    setWebinar({ ...webinar, topics: newTopics });
  };

  console.log(webinar);

  const additionalBenefits = [
    "Live Q&A",
    "Recording of the entire Session",
    "Exciting Quiz sessions",
    "Exclusive Discount on all our 1:1 mentorship programs",
  ];

  return (
    <div className="w-full p-4">
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-semibold my-1">
          Enter details of Webinar
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-10/12 max-w-xl mt-5 text-black"
        >
          <div className="flex flex-col px-4 my-2">
            <label htmlFor="title" className="text-gray-800 font-semibold">
              Title
            </label>
            <input
              value={webinar.title}
              onChange={(e) =>
                setWebinar((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              type="text"
              name="title"
              id="title"
              className="border-b-2 border-slate-500 p-1 outline-none font-normal"
              placeholder="Enter the title of webinar"
              required
            />
          </div>
          <div className="flex flex-col px-4 my-2">
            <label
              htmlFor="description"
              className="text-gray-800 font-semibold"
            >
              Description
            </label>
            <textarea
              value={webinar.description}
              onChange={(e) =>
                setWebinar((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              name="description"
              id="description"
              placeholder="Enter description of webinar"
              className="border-2 border-slate-500 my-2 p-3 outline-none"
              rows={"3"}
              required
            />
          </div>
          <div className="flex px-4 my-2">
            <label
              htmlFor="domain"
              className="text-gray-800 mr-5 font-semibold py-2"
            >
              Domain
            </label>
            <select
              value={webinar.domain}
              onChange={(e) =>
                setWebinar((prevState) => ({
                  ...prevState,
                  domain: e.target.value,
                }))
              }
              name="domain"
              id="domain"
              className="px-1 sm:px-5 py-2 border-2 border-slate-500"
              required
            >
              <option value="">Select any Domain</option>
              <option value="Hiring">Hiring</option>
              <option value="Career">Career</option>
              <option value="Study Abroad">Study Abroad</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row px-4 my-4">
            <div className="flex items-center md:space-y-0 space-y-1">
              <label
                htmlFor="startTime"
                className="text-gray-800 font-semibold mr-0.5"
              >
                Start Time
              </label>
              <input
                value={webinar.startTime}
                onChange={(e) =>
                  setWebinar((prevState) => ({
                    ...prevState,
                    startTime: e.target.value,
                  }))
                }
                type="datetime-local"
                id="startTime"
                name="startTime"
                className="border-2 ml-2 h-10 px-4 mr-4 p-2 border-slate-500"
                required
              />
            </div>
            <div className="flex items-center  md:space-y-0 space-y-4">
              <label htmlFor="endTime" className="text-gray-800 font-semibold ">
                End Time
              </label>
              <input
                value={webinar.endTime}
                onChange={(e) =>
                  setWebinar((prevState) => ({
                    ...prevState,
                    endTime: e.target.value,
                  }))
                }
                type="datetime-local"
                id="endTime"
                name="endTime"
                className="border-2 ml-4 sm:ml-0.5 h-10 p-2 border-slate-500"
                required
              />
            </div>
          </div>
          <div className="my-4 px-4">
            <div className="text-gray-800 mr-5 font-semibold py-2">
              Aditional Benifits
            </div>
            {/* can select multiple and i need them in an array */}
            <div className="flex flex-wrap">
              {additionalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={benefit}
                    name={benefit}
                    className="border-2 p-2 border-slate-500"
                    onClick={() => {
                      if (webinar.additionalBenefits.includes(benefit)) {
                        setWebinar((prev) => ({
                          ...prev,
                          additionalBenefits: prev.additionalBenefits.filter(
                            (item) => item !== benefit
                          ),
                        }));
                      } else {
                        setWebinar((prev) => ({
                          ...prev,
                          additionalBenefits: [
                            ...prev.additionalBenefits,
                            benefit,
                          ],
                        }));
                      }
                    }}
                  />
                  <label
                    htmlFor={benefit}
                    className="text-gray-800 mx-3 font-semibold py-2"
                  >
                    {benefit}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="text-gray-800 mr-5 font-semibold py-2 px-4">
            Topics
          </div>
          {webinar.topics.map((topic, topicIndex) => (
            <div
              key={topicIndex}
              className="border-2 border-gray-300 m-2 rounded-lg"
            >
              <div className="flex flex-col px-4 my-2">
                <div className="flex justify-between">
                  <label
                    htmlFor={`topic-${topicIndex}`}
                    className="text-gray-800 font-semibold"
                  >
                    Topic
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newTopics = webinar.topics.filter(
                        (topic, i) => i !== topicIndex
                      );
                      setWebinar({ ...webinar, topics: newTopics });
                    }}
                    className="text-red-500 text-xl"
                  >
                    <MdDelete />
                  </button>
                </div>
                <input
                  value={topic.name}
                  onChange={(e) =>
                    handleTopicChange(topicIndex, e.target.value)
                  }
                  type="text"
                  name={`topic-${topicIndex}`}
                  id={`topic-${topicIndex}`}
                  className="border-b-2 border-slate-500 p-1 outline-none font-normal"
                  placeholder="Enter the topic of webinar"
                  required
                />
              </div>
              {topic.descriptions.map((desc, descIndex) => (
                <div className="flex flex-col px-4 my-2" key={descIndex}>
                  <label
                    htmlFor={`description-${topicIndex}-${descIndex}`}
                    className="text-gray-800 font-semibold"
                  >
                    Description of Topic
                  </label>
                  <div className="w-full border border-gray-300 flex justify-between p-1 mt-2">
                    <input
                      value={desc}
                      onChange={(e) =>
                        handleDescriptionChange(
                          topicIndex,
                          descIndex,
                          e.target.value
                        )
                      }
                      name={`description-${topicIndex}-${descIndex}`}
                      id={`description-${topicIndex}-${descIndex}`}
                      placeholder="Enter description of topic"
                      className=" my-2  outline-none w-full"
                      required
                    />
                    {/* delete button */}
                    <button
                      type="button"
                      onClick={() => {
                        const newTopics = webinar.topics.map((topic, i) =>
                          i === topicIndex
                            ? {
                                ...topic,
                                descriptions: topic.descriptions.filter(
                                  (desc, j) => j !== descIndex
                                ),
                              }
                            : topic
                        );
                        setWebinar({ ...webinar, topics: newTopics });
                      }}
                      className="text-red-500"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mx-4 my-2">
                <button
                  type="button"
                  onClick={() => addDescription(topicIndex)}
                  className="text-blue-500 text-lg flex items-center"
                >
                  <IoMdAddCircle className="mr-2" /> <span>Description</span>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end mr-2">
            <button
              type="button"
              onClick={addTopic}
              className=" p-2 bg-blue-500 text-white rounded whitespace-nowrap flex items-center space-x-2"
            >
              <IoMdAddCircle className="mr-2" /> Topic
            </button>
          </div>

          <div className="flex items-center  text-center px-4 my-2">
            <div className="flex items-center justify-center">
              <input
                value={webinar.isPaid}
                onClick={() =>
                  setWebinar((prev) => ({
                    ...prev,
                    isPaid: !webinar.isPaid,
                  }))
                }
                type="checkbox"
                id="isPaid"
                name="isPaid"
                className="border-2 p-2 border-slate-500"
              />
              <label
                htmlFor="isPaid"
                className="text-gray-800 mx-3 font-semibold py-2"
              >
                Is Paid
              </label>
            </div>
            {webinar.isPaid && (
              <div className="flex items-center mx-5">
                <label htmlFor="price" className="text-gray-800 font-semibold ">
                  Price
                </label>
                <input
                  value={webinar.price}
                  onChange={(e) =>
                    setWebinar((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }))
                  }
                  type="number"
                  id="price"
                  name="price"
                  className="border-b-2 ml-3 h-10 p-2 border-slate-500"
                  placeholder="Entry price of webinar"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="w-40 py-4 m-2 rounded-xl bg-orange-500 text-white"
              onClick={() => navigate("/webinars")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 w-40 py-3 m-2 rounded-xl border-orange-500 text-black text-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {successModal && (
        <Modal
          isOpen={successModal}
          onClose={() => {
            setSuccessModal(false);
            navigate("/webinars");
          }}
        >
          <div className="flex flex-col items-center justify-center text-lg text-center">
            <h1 className="text-xl">Webinar created successfully!</h1>
            <div>
              <button
                className="p-2 border-orange-500 rounded-xl shadow-md border-2 m-3"
                onClick={() => setSuccessModal(false)}
              >
                Create Another
              </button>
              <button
                className="p-2 shadow-md border-2 border-orange-500 bg-orange-500 text-white rounded-xl m-3"
                onClick={() => navigate("/webinars")}
              >
                Explore Webinars
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default CreateWebinar;
