import React, { useState } from "react";
import Modal from "../../../Modal";

function Description({ next, back, handleDescriptionChange, mentorData }) {
  const [desc, setDesc] = useState(mentorData.description)
  const [showModal, setShowModal] = useState(false)
  const handleChange = (e) => {
    setDesc(e.target.value);
  }
  const handleNotChange = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  return (
    <div className=" w-full items-center justify-center flex flex-col">
      <form className="flex flex-col items-center" onSubmit={desc.split(" ").length > 12 ? next : handleNotChange}>
        <label htmlFor="desc" className="text-2xl ">
          Description
        </label>
        <textarea
          id="desc"
          className="section text-lg border-2 border-slate-900 rounded-lg p-2 w-3/4 my-4 "
          rows={10}
          cols={50}
          value={desc}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit"  onClick={()=> 
            handleDescriptionChange(desc)}>
            Next
          </button>
        </div>
        {
        showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}> 
          <div className="text-xl flex items-center justify-center">
            Please enter atleast 12 words.
          </div>
          </Modal>
        )
      }
      </form>
    </div>
  );
}
export default Description;
