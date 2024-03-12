import React, { useState } from 'react';
import { updateStudent } from './api';

const UpdateStudent = ({ fetchData }) => {
  const [studentInfo, setStudentInfo] = useState({
    ma_sv: '',
    ho_ten: '',
    email: '',
    ngay_sinh: '',
    que: '',
    diem_tong_ket: ''
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setStudentInfo({
      ...studentInfo,
      [name]: value
    });
  };

  const handleUpdateStudent = async () => {
    await updateStudent(studentInfo);
    fetchData();
    setStudentInfo({
      ma_sv: '',
      ho_ten: '',
      email: '',
      ngay_sinh: '',
      que: '',
      diem_tong_ket: ''  
    });
    setShowUpdateModal(false);
  };

  return (
    <div>
      {/* Button to show modal for updating student */}
      <button onClick={() => setShowUpdateModal(true)}>Update Student</button>

      {/* Modal for updating student */}
      {showUpdateModal && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
          <h2>Update Student</h2>
          <form>
            {/* Input fields for updating student */}
            <label>
              Student ID:
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
            <button type="button" onClick={handleUpdateStudent}>Update Student</button>
          </form>
        </div>
      </div>
            )}
    </div>
  );
};

export default UpdateStudent;
