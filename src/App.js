import React from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentManagement from './AddStudent';
import StudentInfo from './StudentInfo';

function App() {
  return (
    <div className="App">
      <h1>Thêm và hiển thị dữ liệu sinh viên</h1>
      <StudentForm />
      <StudentList />
      <StudentManagement/>
      <StudentInfo/>
    </div>
  );
}

export default App;