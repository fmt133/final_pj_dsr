import React, { useState } from 'react';
import { addStudent } from './api';

const AddStudent = ({ fetchData }) => {
  const [studentInfo, setStudentInfo] = useState({
    ma_sv: '',
    ho_ten: '',
    email: '',
    ngay_sinh: '',
    que: '',
    diem_tong_ket: ''
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value
    });
  };

  const handleAddStudent = async () => {
    await addStudent(studentInfo);
    fetchData();
    setStudentInfo({
      ma_sv: '',
      ho_ten: '',
      email: '',
      ngay_sinh: '',
      que: '',
      diem_tong_ket: ''
    });
    setShowAddModal(false);
  };

  return (
    <div>
    {/* Button to show modal for adding student */}
    <button onClick={() => setShowAddModal(true)}>Add Student</button>

    {/* Modal for adding student */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddModal(false)}>
              &times;
            </span>
            <h2>Add Student</h2>
            <form>
              {/* Input fields for new student */}
              <label>Student ID:
                <input
                  type="number"
                  name="ma_sv"
                  min="0"
                  value={studentInfo.ma_sv}
                  onChange={handleInputChange}
                />
              </label>
              <br />
                <label>
                  Name:
                  <input
                    type="text"
                    name="ho_ten"
                    value={studentInfo.ho_ten}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="text"
                    name="email"
                    value={studentInfo.email}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Date of Birth:
                  <input
                    type="date"
                    name="ngay_sinh"
                    value={studentInfo.ngay_sinh}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Address:
                  <input
                    type="text"
                    name="que"
                    value={studentInfo.que}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Total Score:
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    name="diem_tong_ket"
                    value={studentInfo.diem_tong_ket}
                    onChange={handleInputChange}
                  />
                </label>
              <br />
              <button type="button" onClick={handleAddStudent}>Add Student</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
