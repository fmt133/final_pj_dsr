var students = []; // Mảng lưu trữ danh sách sinh viên

function showForm() {
    document.getElementById("form-container").style.display = "block";
}

function cancel() {
    document.getElementById("form-container").style.display = "none";
}

function addStudent() {
    // Lấy thông tin từ form
    var studentId = document.getElementById("studentId").value;
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var hometown = document.getElementById("hometown").value;
    var grade = document.getElementById("grade").value;

    // Thêm sinh viên vào danh sách
    students.push({ studentId: studentId, fullName: fullName, email: email, dob: dob, hometown: hometown, grade: grade });

    // Hiển thị lại danh sách sinh viên
    displayStudents();

    // Đặt lại form
    document.getElementById("studentForm").reset();
    document.getElementById("form-container").style.display = "none";
}

function displayStudents() {
    var tableBody = document.getElementById("studentList");
    tableBody.innerHTML = "";
    students.forEach(function(student) {
        var row = tableBody.insertRow();
        row.insertCell(0).innerHTML = student.studentId;
        row.insertCell(1).innerHTML = student.fullName;
        row.insertCell(2).innerHTML = student.email;
        row.insertCell(3).innerHTML = student.dob;
        row.insertCell(4).innerHTML = student.hometown;
        row.insertCell(5).innerHTML = student.grade;
        var actionsCell = row.insertCell(6);
        actionsCell.innerHTML = '<button onclick="editStudent(' + students.indexOf(student) + ')">Sửa</button> <button onclick="deleteStudent(' + students.indexOf(student) + ')">Xóa</button>';
    });
}

function editStudent(index) {
    var student = students[index];
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("fullName").value = student.fullName;
    document.getElementById("email").value = student.email;
    document.getElementById("dob").value = student.dob;
    document.getElementById("hometown").value = student.hometown;
    document.getElementById("grade").value = student.grade;

    // Hiển thị form và cập nhật nút
    document.getElementById("form-container").style.display = "block";
    document.querySelector("button[type=button]:nth-child(4)").style.display = "none";
    document.querySelector("button[type=button]:nth-child(5)").style.display = "block";
}

function updateStudent() {
    // Lấy thông tin từ form
    var studentId = document.getElementById("studentId").value;
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var hometown = document.getElementById("hometown").value;
    var grade = document.getElementById("grade").value;

    // Cập nhật thông tin sinh viên
    var index = students.findIndex(student => student.studentId === studentId);
    students[index] = { studentId: studentId, fullName: fullName, email: email, dob: dob, hometown: hometown, grade: grade };

    // Hiển thị lại danh sách sinh viên
    displayStudents();

    // Đặt lại form
    document.getElementById("studentForm").reset();
    document.getElementById("form-container").style.display = "none";
    document.querySelector("button[type=button]:nth-child(4)").style.display = "block";
    document.querySelector("button[type=button]:nth-child(5)").style.display = "none";
}

function deleteStudent(index) {
    // Xóa sinh viên khỏi danh sách
    students.splice(index, 1);

    // Hiển thị lại danh sách sinh viên
    displayStudents();
}
