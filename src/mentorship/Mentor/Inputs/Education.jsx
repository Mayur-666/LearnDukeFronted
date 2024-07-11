import React from 'react'

function Education({next, back, handleEducationChange, mentorData}) {

  const educationOptions = [
    'High School',
    'Diploma',
    "Associate Degree",
    "Post Graduate",
    "Graduate",
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Professional Certification',
    'Vocational Training',
    "Postdoctoral Research"
  ]

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={next} className="flex flex-col items-center justify-center">
        <label htmlFor='education' className='text-2xl mb-3'>Education</label>
        {/* <input id="education" type="text" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 my-4" onChange={handleEducationChange} required placeholder='Add your education details'/> */}
        <select value={mentorData.education} id="education" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-full mb-5" onChange={handleEducationChange} required>
          <option value="">Select Education</option>
         {educationOptions.map((education, index) => (
            <option key={index} value={education}>{education}</option>
          ))}
        </select>

      <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default Education