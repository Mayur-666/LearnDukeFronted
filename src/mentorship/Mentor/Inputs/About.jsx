import {useState} from "react";
import Modal from "../../../Modal";

function About({ next, handleAboutChange, back, mentorData }) {

  const [about, setAbout] = useState(mentorData.about)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setAbout(e.target.value);
  }
  const handleNotChange = (e) => {
    e.preventDefault();
    setShowModal(true)
  }


  return (
    <div className=" w-full items-center justify-center flex flex-col">
      <form className="flex flex-col items-center" onSubmit={about.split(" ").length > 12 ? next : handleNotChange}>
        <label htmlFor="about" className="text-2xl ">
          About You
        </label>
        <textarea
          id="about"
          className="text-lg border-2 border-slate-900 rounded-lg p-2 w-3/4 my-4 "
          rows={10}
          cols={50}
          value={about}
          onChange={handleChange}
          required
        ></textarea>
        <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit"  onClick={()=> 
            handleAboutChange(about)}>
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

export default About;
