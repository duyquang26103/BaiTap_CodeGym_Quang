const DS_HOC_VIEN_KEY = 'dsHocVien'
function readStudentToLocalStorage() {
    let dsHocien = localStorage.getItem(DS_HOC_VIEN_KEY);
    try {
        if (dsHocien === null) {
            return [];
        } else {
            return JSON.parse(dsHocien);
        }
    } catch (e) {
        console.log(e);
        return [];
    }

}

function add() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let score = parseFloat(document.getElementById("score").value);
    let sex = document.getElementById("male").checked;
    if (sex) {
        sex = 'Nam'
    } else {
        sex = 'Nữ'
    }

    let student = { name: name, phone: phone, score: score, sex: sex }
    let students = readStudentToLocalStorage()
    students.push(student);
    localStorage.setItem(DS_HOC_VIEN_KEY, JSON.stringify(students));

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("score").value = "";
    document.getElementById("male").prop('checked', false);;
    document.getElementById("female").prop('checked', false);;
}

function loadStudents() {
    let data = localStorage.getItem(DS_HOC_VIEN_KEY);
    let students = JSON.parse(data);
    let string;
    for (const student of students) {
        string += `<tr>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th>Điểm</th>
        </tr>
        <tr>
            <td> ${student.name}</td>
            <td> ${student.sex}</td>
            <td> ${student.phone}</td>
            <td> ${student.score}</td>
        </tr>`
    }

    document.getElementById("students").innerHTML = string;
}

function clear() {
    localStorage.removeItem(DS_HOC_VIEN_KEY);
}