import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Modal";

function Domain({ handleDomainChange, next, mentorData }) {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(
    mentorData?.domain || []
  );
  useEffect(() => {
    setSelectedDomain(mentorData?.domain || []);
  }, [mentorData]);
  const [showModal, setShowModal] = useState(false);
  const inputDomains = [
    "Engineering",
    "Data Science",
    "Career Counselling",
    "Product",
    "Schooling",
    "Govt. Exams",
    "College",
    "JEE / NEET",
    "Extra Class",
    "Interview Prep",
    "Business",
  ];

  const handleChecked = (e) => {
    let updatedDomain;
    if (e.target.checked) {
      updatedDomain = [...selectedDomain, e.target.value];
    } else {
      updatedDomain = selectedDomain.filter(
        (value) => value !== e.target.value
      );
    }
    setSelectedDomain(updatedDomain);
  };

  const handleNotChecked = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <form
      onSubmit={selectedDomain.length > 0 ? next : handleNotChecked}
      className="flex flex-col lg:w-5/12 items-center justify-center"
    >
      <label className="text-2xl my-3 ">Choose Your Domains</label>
      <div className="max-h-80 w-full overflow-scroll section">
        {inputDomains.map((dom) => {
          return (
            <div key={dom} className="flex p-2 text-lg">
              <input
                type="checkbox"
                id={dom}
                name={dom}
                value={dom}
                onChange={handleChecked}
                className="mx-3 cursor-pointer"
                checked={selectedDomain.includes(dom)}
              />
              <label className="cursor-pointer" htmlFor={dom}>
                {dom}
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <button
          className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500"
          type="button"
          onClick={() => navigate("/mentorship")}
        >
          Cancel
        </button>
        <button
          className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white"
          type="submit"
          onClick={() => handleDomainChange(selectedDomain)}
        >
          Next
        </button>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-xl flex items-center justify-center">
            Please select atleast one domain
          </div>
        </Modal>
      )}
    </form>
  );
}

export default Domain;
