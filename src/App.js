// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData, addStudent, deleteStudent } from './api'; // Import các hàm từ tệp api.js

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    ma_sv: '',
    ho_ten: '',
    email: '',
    ngay_sinh: '',
    que: '',
    diem_tong_ket: ''
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Thêm biến showDeleteModal
  const [deleteMaSV, setDeleteMaSV] = useState('');

  useEffect(() => {
    fetchData().then(data => setStudents(data)); // Sử dụng fetchData từ tệp api.js
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const handleDeleteInputChange = event => {
    setDeleteMaSV(event.target.value);
  };

  const handleAddStudent = async () => {
    await addStudent(newStudent); // Sử dụng addStudent từ tệp api.js
    fetchData().then(data => setStudents(data)); // Cập nhật danh sách sinh viên sau khi thêm
    setNewStudent({
      ma_sv: '',
      ho_ten: '',
      email: '',
      ngay_sinh: '',
      que: '',
      diem_tong_ket: ''
    });
    setShowAddModal(false);
  };

  const handleDeleteStudent = async () => {
    await deleteStudent(deleteMaSV); // Sử dụng deleteStudent từ tệp api.js
    fetchData().then(data => setStudents(data)); // Cập nhật danh sách sinh viên sau khi xóa
    setDeleteMaSV('');
    setShowDeleteModal(false); // Đặt showDeleteModal thành false sau khi xóa sinh viên
  };

  return (
    <div>
      <h1>Student Information</h1>
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Total Score</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {students.map(student => (
            <tr key={student.ma_sv}>
              <td>{student.ma_sv}</td>
              <td>{student.ho_ten}</td>
              <td>{student.email}</td>
              <td>{student.ngay_sinh}</td>
              <td>{student.que}</td>
              <td>{student.diem_tong_ket}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
              <label>
                Student ID:
                <input
                  type="text"
                  name="ma_sv"
                  value={newStudent.ma_sv}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Name:
                <input
                  type="text"
                  name="ho_ten"
                  value={newStudent.ho_ten}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Date of Birth:
                <input
                  type="text"
                  name="ngay_sinh"
                  value={newStudent.ngay_sinh}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Address:
                <input
                  type="text"
                  name="que"
                  value={newStudent.que}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Total Score:
                <input
                  type="text"
                  name="diem_tong_ket"
                  value={newStudent.diem_tong_ket}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="button" onClick={handleAddStudent}>Add Student</button>
            </form>
          </div>
        </div>
      )}

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

export default App;
