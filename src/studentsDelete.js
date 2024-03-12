import React, { useState } from 'react';
import { deleteStudent } from './api';

const DeleteStudent = ({ fetchData }) => {
  const [deleteMaSV, setDeleteMaSV] = useState('');

  const handleDeleteInputChange = event => {
    setDeleteMaSV(event.target.value);
  };

  const handleDeleteStudent = async () => {
    await deleteStudent(deleteMaSV);
    fetchData();
    setDeleteMaSV('');
    setShowDeleteModal(false)
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div>
      {/* Button to show modal for deleting student */}
      <button onClick={() => setShowDeleteModal(true)}>Delete Student</button>

      {/* Modal for deleting student */}
      {showDeleteModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowDeleteModal(false)}>
            &times;
          </span>
          <h2>Delete Student</h2>
          <form>
            {/* Input field for student ID */}
            <label>
              Student ID to delete:
              <input
                type="text"
                value={deleteMaSV}
                onChange={handleDeleteInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleDeleteStudent}>Delete Student</button>
          </form>
        </div>
      </div>
    )}
    </div>
  );
};

export default DeleteStudent;
