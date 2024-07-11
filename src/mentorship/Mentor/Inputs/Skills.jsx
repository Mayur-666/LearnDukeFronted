import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import Modal from "../../../Modal";

function Skills({ next, back, handleSkillsChange, mentorData }) {
  const [selectedSkills, setSelectedSkills] = useState(mentorData.skills);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [visible, setVisible] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      if (selectedSkills.includes(newSkill)) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 3000);
      } else {
        setSelectedSkills((prevSkills) => [newSkill, ...prevSkills]);
        setNewSkill("");
      }
    }
  };

  const handleRemoveSkill = (index) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.filter((_, i) => i !== index)
    );
  };

  const handleNotChecked = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="w-full md:w-11/12  flex sm:flex-col items-center flex-col justify-center text-center">
      <div className="mb-4">
        <h1
          className="block text-gray-700 font-semibold mb-2 text-2xl"
        >
          Add Skills
        </h1>
        <div className="flex items-center m-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="border rounded py-2 px-3 w-full text-black border-orange-300 focus:border-orange-200 focus:ring-2 focus:ring-orange-200 outline-none"
            placeholder="Enter a skill"
            onKeyDown={(e)=> {
              if(e.key==="Enter"){
                handleAddSkill()
              }
            }}
            />
          <button
            type="button"
            onClick={handleAddSkill}
            className="bg-orange-500 text-white rounded py-2 px-4 ml-2"
            >
            <IoIosAdd className="text-2xl"/>
          </button>
        </div>
        <div className={visible ? "flex items-center justify-center text-red-500" : "hidden"}>Skill already added!</div>
      </div>
      <div className="flex px-4 section w md:w-10/12 max-h-60 overflow-y-scroll items-center md:justify-center flex-col md:flex-row md:flex-wrap mx-auto">
          {selectedSkills.map((skill, index) => (
            <div key={index} className="relative min-w-40  m-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const updatedSkills = [...selectedSkills];
                  updatedSkills[index] = e.target.value;
                  setSelectedSkills(updatedSkills);
                }}
                className={`border border-gray-400 rounded py-2 px-3 pr-10 w-full text-black  outline-none`}
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <TfiClose className="text-lg"/>
              </button>
            </div>
          ))}
        </div>
      <div className="flex items-center justify-center">
        <button
          className="border-orange-500 border-2 py-3 px-5 rounded-lg m-4"
          onClick={back}
        >
          Back
        </button>
        <button
          className="bg-orange-500 text-white py-3 px-5 rounded-lg m-4"
          onClick={(e) => {
            handleSkillsChange(selectedSkills);
            selectedSkills.length >= 5 ? next(e) : handleNotChecked(e);
          }}
        >
          Next
        </button>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-xl flex items-center justify-center">
            Please enter at least 5 skills.
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Skills;