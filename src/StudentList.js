import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/df');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('There was an error!', error);
        // Xử lý lỗi hoặc hiển thị thông báo cho người dùng
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>Mã Sinh Viên</th>
            <th>Họ và Tên</th>
            <th>Email</th>
            <th>Ngày Sinh</th>
            <th>Quê Quán</th>
            <th>Điểm Tổng Kết</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(student => (
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
    </div>
  );
};

export default StudentTable;
