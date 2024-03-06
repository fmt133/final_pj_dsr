import React, { useState, useEffect } from 'react';

const StudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    ma_sv: '',
    ho_ten: '',
    email: '',
    ngay_sinh: '',
    que: '',
    diem_tong_ket: ''
  });

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/df'); // Đảm bảo rằng URL endpoint của API plumber đã được cung cấp đúng
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value
    });
  };

  const addStudent = async () => {
    try {
      const response = await fetch('http://localhost:8000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });
      const data = await response.json();
      console.log(data);
      fetchData(); // Refresh data after adding new student
      // Reset form fields after successful addition
      setNewStudent({
        ma_sv: '',
        ho_ten: '',
        email: '',
        ngay_sinh: '',
        que: '',
        diem_tong_ket: ''
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
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

      {/* Form to add new student */}
      <h2>Add Student</h2>
      <form>
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
        <button type="button" onClick={addStudent}>Add Student</button>
      </form>
    </div>
  );
};

export default StudentInfo;
