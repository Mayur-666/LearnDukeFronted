import React, { useState } from "react";

function Availability({ next, back, handleAvailabilityChange, mentorData }) {
  const [start, setStart] = useState(mentorData.availabilityStartTime);
  const [end, setEnd] = useState(mentorData.availabilityEndTime);

  const handleStartChange = (e) => {
    setStart(e.target.value);
  }
  const handleEndChange = (e) => {
    setEnd(e.target.value);
  }

  const handleNotChange = (e) => {
    e.preventDefault();
    alert("Please enter a valid timings.");
  }
  

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Availability</h1>
      <form onSubmit={start> end ? handleNotChange : next} className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center"> 

          <label htmlFor="start" className=" text-xl ">Start Time</label>
          <input type="time" id="start" name="start" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 m-4" value={start} onChange={handleStartChange} required placeholder="Start Time" />
        </div>
        <div className="flex items-center justify-center"> 
          <label className="text-xl" htmlFor="start">End Time</label><br />
          <input value={end} type="time" id="start" name="start" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 m-4" onChange={handleEndChange} required placeholder="Start Time" />
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
            onClick={() => handleAvailabilityChange([start, end])}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Availability;
