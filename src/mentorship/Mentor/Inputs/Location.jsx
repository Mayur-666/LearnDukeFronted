import React, { useState } from 'react';
import Modal from '../../../Modal';

function Location({next, back, handleLocationChange, mentorData}) {
  const allLocations = ["Online","At Home", "In Person"];
  const [selectedLocations, setSelectedLocations] = React.useState(mentorData.locationType);
  const [showModal, setShowModal] = useState(false);

  const handleChecked = (e) => {
    if (e.target.checked) {
      setSelectedLocations([...selectedLocations, e.target.value]);
    } else {
      setSelectedLocations(selectedLocations.filter((location) => location !== e.target.value));
    }
  }
  const handleNotChecked = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <form onSubmit={selectedLocations.length>0 ? next : handleNotChecked} className="flex flex-col justify-center">
      <label className="text-2xl">
        Choose Your Preferred Location 
        </label>
        <br />
        {
          allLocations.map((loc) => {
            return (
              <div key={loc} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={loc}
                  name={loc}
                  value={loc}
                  checked={selectedLocations.includes(loc)}
                  onChange={handleChecked}
                  className="mx-3 cursor-pointer"
                />
                <label className="text-lg p-2 cursor-pointer" htmlFor={loc}>{loc}</label>
              </div>
            );
          })
        }
      <br />
      <div className="flex">
      <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>Back</button>
      <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" onClick= {()=> handleLocationChange(selectedLocations)}>Next</button>
      </div>
      {
        showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}> 
          <div className="text-xl flex items-center justify-center">
            Please select atleast one location
          </div>
          </Modal>
        )
      }
    </form>
  )
}

export default Location