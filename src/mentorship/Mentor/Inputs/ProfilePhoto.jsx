import React, { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import sampleUser from "../../../assets/user.png";
import Modal from "../../../Modal";
import { MdEdit } from "react-icons/md";


function ProfilePhoto({ back, handleProfilePhotoChange, mentorData }) {
  const [avatar, setAvatar] = useState("");
  const [change, setChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (mentorData.profilePhoto !== "" && mentorData.profilePhoto.url) {
      setAvatar(mentorData.profilePhoto.url);
    } else {
      setAvatar("");
    }
  }, [mentorData]);

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
    setAvatar(croppedImage);
    setShowCropper(false);
    setChange(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex flex-col items-center justify-center">
        <label htmlFor="photo" className="text-2xl">
          Profile Photo
        </label>
        <input
          id="photo"
          type="file"
          className="text-lg border-2 border-slate-900 p-2 h-full w-3/4 my-4"
          onChange={handleImageUpload}
          required
        />
        {mentorData.profilePhoto && mentorData.profilePhoto.url && (
          <div className="flex justify-end m-2">
          <button
            className=" bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
            onClick={() => setShowCropper(true)}
          >
            <MdEdit />
          </button>
        </div>
        )}
        <div className="relative border-2 border-slate-700 flex items-center justify-center drop-shadow-xl rounded-full w-40 h-40 mb-5 overflow-hidden">
          {/* button for edit */}

          <img
            className="w-full h-full mt-0 rounded-full"
            src={avatar.length > 0 ? avatar : sampleUser}
            alt="Profile"
          />
        </div>

        {showCropper && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg">
              <button
                onClick={() => setShowCropper(false)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center m-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="m-4">
                <Cropper
                  src={avatar}
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  guides={false}
                  ref={cropperRef}
                  viewMode={1}
                  aspectRatio={1}
                  autoCropArea={1}
                  background={false}
                  responsive={true}
                  checkOrientation={false}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  onClick={handleCrop}
                >
                  Crop Image
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex">
          <button
            className="border-2 mx-4 p-3 rounded-md px-6 border-orange-500 hover:bg-orange-500 hover:text-white transition"
            type="button"
            onClick={back}
          >
            Back
          </button>
          <button
            className="border-2 border-orange-500 mx-4 p-3 rounded-md px-7 bg-orange-500 text-white hover:bg-orange-600 transition"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              avatar
                ? handleProfilePhotoChange({ avatar, change })
                : setShowModal(true);
            }}
          >
            Submit
          </button>
        </div>

        {showModal && (
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <div className="text-xl flex items-center justify-center">
              Please upload a photo
            </div>
          </Modal>
        )}
      </form>
    </div>
  );
}

export default ProfilePhoto;
