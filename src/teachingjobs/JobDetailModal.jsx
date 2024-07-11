import React from "react";
import Modal from '../Modal'; // Assuming you have a Modal component already

const JobDetailModal = ({ job, open, onClose, onAccept, onReject }) => {
  if (!job) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        <div className="mb-4">
          <strong>Title:</strong> {job.title}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {job.email}
        </div>
        <div className="mb-4">
          <strong>Job Type:</strong> {job.jobType}
        </div>
        <div className="mb-4">
          <strong>Location:</strong> {job.location}
        </div>
        <div className="mb-4">
          <strong>Description:</strong> {job.description}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onReject}
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailModal;
