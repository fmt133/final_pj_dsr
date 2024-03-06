import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function StudentForm() {
  const [sinhVienDuLieu, setSinhVienDuLieu] = useState([]);
  const hoTenInputRef = useRef(null);
  const maSvInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const ngaySinhInputRef = useRef(null);
  const queInputRef = useRef(null);
  const diemTongKetInputRef = useRef(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sinhVienDuLieu"));
    if (data) setSinhVienDuLieu(data);
  }, []);
  const handleThemSinhVien = () => {
    const hoTen = hoTenInputRef.current.value.trim();
    const maSv = maSvInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const ngaySinh = ngaySinhInputRef.current.value.trim();
    const que = queInputRef.current.value.trim();
    const diemTongKet = parseFloat(diemTongKetInputRef.current.value.trim());
    const maSvTonTai = sinhVienDuLieu.map(sinhVien => sinhVien.maSv).includes(maSv);
    if (maSvTonTai) {
      alert("Mã sinh viên đã tồn tại. Vui lòng nhập mã sinh viên khác.");
      return;
    }
    // Kiểm tra các trường rỗng
    if (!hoTen || !maSv || !email || !ngaySinh || !que || !diemTongKet) {
      alert("Vui lòng nhập đầy đủ các trường.");
      return;
    }
    const sinhVienMoi = { hoTen, maSv, email, ngaySinh, que, diemTongKet };
    setSinhVienDuLieu([...sinhVienDuLieu, sinhVienMoi]);
    localStorage.setItem("sinhVienDuLieu", JSON.stringify([...sinhVienDuLieu, sinhVienMoi]));
    hoTenInputRef.current.value = '';
    maSvInputRef.current.value = '';
    emailInputRef.current.value = '';
    ngaySinhInputRef.current.value = '';
    queInputRef.current.value = '';
    diemTongKetInputRef.current.value = '';
  };
  const handleXoaSinhVien = (maSv) => {
    const newSinhVienDuLieu = sinhVienDuLieu.filter((sinhVien) => sinhVien.maSv !== maSv);
    setSinhVienDuLieu(newSinhVienDuLieu);
    localStorage.setItem("sinhVienDuLieu", JSON.stringify(newSinhVienDuLieu));
  };
  return (
    <div className="App">
      <h1>Danh sách sinh viên</h1>
      <div className="input-container"> {/* Wrapper cho các ô nhập */}
        <input type="text" placeholder="Họ tên" ref={hoTenInputRef} required />
        <input type="text" placeholder="Mã sinh viên" ref={maSvInputRef} required />
        <input type="email" placeholder="Email" ref={emailInputRef} required />
        <input type="date" placeholder="Ngày sinh" ref={ngaySinhInputRef} required />
        <input type="text" placeholder="Quê" ref={queInputRef} required />
        <input type="number" placeholder="Điểm tổng kết" ref={diemTongKetInputRef} min="0" max="10" required />
        <button id="btn-them-sinh-vien" onClick={handleThemSinhVien}>
          Thêm
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Mã sinh viên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Quê</th>
            <th>Điểm tổng kết</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sinhVienDuLieu.map((sinhVien) => (
            <tr key={sinhVien.maSv}>
              <td>{sinhVien.hoTen}</td>
              <td>{sinhVien.maSv}</td>
              <td>{sinhVien.email}</td>
              <td>{sinhVien.ngaySinh}</td>
              <td>{sinhVien.que}</td>
              <td>{sinhVien.diemTongKet}</td>
              <td>
                <button onClick={() => handleXoaSinhVien(sinhVien.maSv)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default StudentForm;