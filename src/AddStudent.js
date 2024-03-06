import React, { useState } from 'react';
import StudentList from './StudentList';

const AddStudentPopup = ({ isOpen, onClose, onAddStudent }) => {
    const [formData, setFormData] = useState({
      ma_sv: '',
      ho_ten: '',
      email: '',
      ngay_sinh: '',
      que: '',
      diem_tong_ket: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseData = await response.json();
        console.log('API response:', responseData);
  
        // Gọi hàm callback để thông báo thành công và đóng popup
        onAddStudent();
        onClose();
      } catch (error) {
        console.error('There was an error!', error);
        // Xử lý lỗi hoặc hiển thị thông báo cho người dùng
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Thêm Sinh Viên</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="ma_sv">Mã Sinh Viên:</label>
              <input type="text" id="ma_sv" name="ma_sv" value={formData.ma_sv} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="ho_ten">Họ Tên:</label>
              <input type="text" id="ho_ten" name="ho_ten" value={formData.ho_ten} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="ngay_sinh">Ngày Sinh:</label>
              <input type="text" id="ngay_sinh" name="ngay_sinh" value={formData.ngay_sinh} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="que">Quê Quán:</label>
              <input type="text" id="que" name="que" value={formData.que} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="diem_tong_ket">Điểm Tổng Kết:</label>
              <input type="text" id="diem_tong_ket" name="diem_tong_ket" value={formData.diem_tong_ket} onChange={handleChange} />
            </div>
            <button type="submit">Thêm</button>
            <button type="button" onClick={onClose}>Đóng</button>
          </form>
        </div>
      </div>
    );
  };

const StudentManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddStudent = (studentData) => {
    // Gọi hàm API để thêm sinh viên mới
    console.log('Thêm sinh viên:', studentData);
    // Để đơn giản, chúng ta chỉ log dữ liệu sinh viên ra console
  };

  return (
    <div>
      <h1>Quản Lý Sinh Viên</h1>
      <button onClick={togglePopup}>Thêm Sinh Viên</button>
      <AddStudentPopup isOpen={isPopupOpen} onClose={togglePopup} onAddStudent={handleAddStudent} />
      <StudentList />
    </div>
    
  );
};

export default StudentManagement;