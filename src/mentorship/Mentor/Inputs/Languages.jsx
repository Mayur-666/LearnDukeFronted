import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import Modal from "../../../Modal";

function Languages({ handleLanguageChange, next, back, mentorData }) {
  //indian languages
  const allLanguages = [
    "English",
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punj",
    "Sindhi",
    "Assamese",
    "Maithili",
    "Santali",
    "Kashmiri",
    "Nepali",
    "Konkani",
    "Dogri",
    "Manipuri",
    "Bodo",
    "Santhali",
    "Khasi",
    "Mizo",
    "Garo",
    "Ao",
    "Angami",
    "Chakhesang",
    "Chang",
    "Konyak",
    "Lotha",
    "Phom",
    "Pochury",
    "Rengma",
    "Sangtam",
    "Sumi",
    "Yimchunger",
    "Zeliang",
  ];
  const [selectedLanguages, setSelectedLanguages] = useState(mentorData.languages);
  const [mainLanguages, setMainLanguages] = useState(allLanguages)
  const [showModal, setShowModal] = useState(false);

  // const handleChecked = (e) => {
  //   let updatedLanguages;
  //   if (e.target.checked) {
  //     updatedLanguages = [...allLanguages, e.target.value];
  //   } else {
  //     updatedLanguages = allLanguages.filter(
  //       (value) => value !== e.target.value
  //     );
  //   }
  //   setSelectedLanguages(updatedLanguages);
  // };
  useEffect(() => {
    setMainLanguages(
      mainLanguages.filter((i) => !(selectedLanguages.includes(i)))
    )
  }, [])

  const handleNotChecked = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const handleLanguageSelect = (lang) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
    setMainLanguages(
      mainLanguages.filter((i) => i !== lang)
    );
  };

  const handleLanguageRemove = (lang) => {
    setSelectedLanguages(
      selectedLanguages.filter((i) => i !== lang)
    );
    if (!mainLanguages.includes(lang)) {
      setMainLanguages([lang, ...mainLanguages]);
    }
  };

  const handleSubmit = (e) => {
    handleLanguageChange(selectedLanguages);
    next(e);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex w-11/12 flex-col items-center flex-1">
        <h3 className="text-2xl my-4 text-center">Selected Languages</h3>
        <ul className=" max-h-32 overflow-y-scroll section justify-center flex-col w-11/12 lg:w-6/12">
          {selectedLanguages.map((lang) => (
            <div
              key={lang}
              className="flex flex-1 item-center  text-center cursor-pointer relative"
              onClick={() => handleLanguageRemove(lang)}
            >
              <li className="m-1 p-1"> {lang} </li>
              <TfiClose className="text-lg absolute right-2 top-3" />
            </div>
          ))}
        </ul>
      </div>
      <div className="flex w-11/12 flex-1 flex-col items-center">
        <h3 className="text-2xl m-4">All Languages</h3>
        <ul className=" max-h-40 w-full mb-5 lg:w-6/12 overflow-y-scroll section flex-1 justify-center flex-col">
          {mainLanguages.length>0 &&mainLanguages.map((lang) => (
            <div 
            key={lang}
            className="flex flex-1 item-center  text-center cursor-pointer relative"
            onClick={() => handleLanguageSelect(lang)}>
            <li className="m-1 p-1">
              {lang}
            </li>
            <IoIosAdd className="text-2xl absolute right-2 top-2" />
                </div>
          ))}
        </ul>
      </div>
        <div className="flex">
          <button
            className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500"
            type="button"
            onClick={back}
          >
            Back
          </button>
          <button
            className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white"
            type="submit"
            onClick={(e) => {
              selectedLanguages.length<=0 ? handleNotChecked(e) : 
              handleSubmit(e) 
            }}   
          >
            Next
          </button>
        </div>
        {
        showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}> 
          <div className="text-xl flex items-center justify-center">
            Please select atleast one language.
          </div>
          </Modal>
        )
      }
    </div>
  );
}

export default Languages;
