import React, { useEffect, useState } from 'react'
import Modal from '../../../Modal'

function Number({next, back, handleNumberChange, mentorData}) {

  const [same, setSame] = useState(false);
  const [number, setNumber] = useState(mentorData.phoneNumber)
  const [wNum, setWNum] = useState(mentorData.whatsAppNumber)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    setNumber(e.target.value)
  }
  const handleWhatsappChange = (e) => {
    setWNum(e.target.value)
  }

  const handleNotChange = (e) => {
    e.preventDefault();
    setShowModal(true)
  }

  useEffect(()=>{
    if(same){
      setWNum(number)
    }
  }, [same])

  return (
    <div className='flex flex-col items-center justify-center'>
      <form onSubmit={(number?.length!==10 && wNum?.length!==10 ) ? handleNotChange : next} className="flex flex-col items-center justify-center">
        <label htmlFor='phone' className='text-2xl'>Phone Number</label>
        <input value={number} id="phone" type="tel" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 my-4" onChange={handleChange} required placeholder='Enter your phone no.'/>
        <br />
        <div className='flex text-center items-center justify-center'> 

        <input checked={same} id="same" className='mx-2' name="same" type='checkbox' onChange={()=>{setSame(!same)}} />
        <label htmlFor='same' className='text-md mt-1'>Is this your Whatsapp number</label>
        </div>
        <br/>
        {!same && <>
        <label htmlFor='wa' className='text-2xl'>Whatsapp Number</label>
        <input id="wa" value={wNum} type="tel" className="text-lg border-2 border-slate-900 rounded-lg p-2 w-4/4 my-4" onChange={handleWhatsappChange} required placeholder='Enter your whatsapp no.'/>
        </>
        }
      <div className="flex">
          <button className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500" type="button" onClick={back}>
            Back
          </button>
          <button className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white" type="submit" onClick={() => handleNumberChange([number, wNum])}>
            Next
          </button>
        </div>
        {
        showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}> 
          <div className="text-xl flex items-center justify-center">
            Please enter a valid number
          </div>
          </Modal>
        )
      }
      </form>
    </div>
  )
}

export default Number