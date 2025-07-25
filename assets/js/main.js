// Xây dựng 1 trang HTML cho phép quản lý danh sách nhân viên với các chức năng CRUD:

// 🎯 Chức năng yêu cầu:

// Thêm nhân viên mới
// Hiển thị danh sách nhân viên trong bảng
// Sửa thông tin nhân viên
// Xoá nhân viên khỏi danh sách
// 📋 Trường dữ liệu nhân viên:

// Trường	Kiểu dữ liệu	Ràng buộc
// Mã nhân viên (id)	Tự sinh (số tăng dần, hoặc timestamp)	
// Họ tên (name)	text, bắt buộc, tối đa 255 ký tự	
// Tuổi (age)	number, tối thiểu 18, tối đa 65	
// Giới tính (gender)	radio: Nam / Nữ	
// Vị trí (position)	select, ví dụ: Kế toán, Lập trình viên, Quản lý	
// Ghi chú (note)	textarea, không bắt buộc, tối đa 300 ký tự	
// 📌 Yêu cầu kỹ thuật:
// Viết toàn bộ bằng HTML + CSS (cơ bản) + JavaScript thuần
// Không cần kết nối backend hoặc database, dữ liệu lưu tạm trong biến array
// Có xác nhận khi xóa nhân viên
// Reset form sau khi thêm / sửa
// Danh sách hiển thị trong bảng có các cột:

// STT | Mã NV | Họ tên | Tuổi | Giới tính | Vị trí | Ghi chú | Hành động (Sửa / Xoá)

let staffs = [];
let editingId = null;

const form = document.querySelector('#staffForm');
const btn = document.querySelector('#formBtn');


const nameIp = document.querySelector('#name');
const ageIp = document.querySelector('#age');
const genderIp = document.querySelector('input[name="gender"]:checked');
const positionIp = document.querySelector('#position');
const noteIp = document.querySelector('#note');

const addOrUpdate = () => {
    const name = nameIp.value.trim();
    const age = ageIp.value.trim();
    const gender = genderIp.value;
    const position = positionIp.value;
    const note = noteIp.value.trim();
    
    if (!name || !age){
        alert('Input full information of staff!');
        return
    }
    
    const staffData = {
        id: editingId ?? Date.now(),
        name,
        age,
        gender,
        position,
        note,
    }

    if(editingId === null) {
        staffs.push(staffData);
    } else {
        staffs = staffs.map((s) => (s.id === editingId ? staffData : s));
        editingId = null;
    }
    form.reset();
    render();
}

const render = () => {
    const tbody = document.querySelector('#staffTable tbody');
    tbody.innerHTML = '';

    staffs.forEach((item,index) => {
        const row = `
            <tr>
                <td>${index+1}</td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.gender}</td>
                <td>${item.position}</td>
                <td>${item.note}</td>
                <td>
                    <button onclick="editStaff(${item.id})" class="btn">Edit</button>
                    <button onclick="deleteStaff(${item.id})" class="btn">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    })
    btn.textContent = 'Add';
}

const editStaff = (id) => {
    const staff = staffs.find((s) => s.id === id);
    btn.textContent = 'Update';
    if(staff) {
        editingId = staff.id;
        nameIp.value = staff.name;
        ageIp.value = staff.age;
        genderIp.value = staff.gender;
        positionIp.value = staff.position;
        noteIp.value = staff.note;
    }
}

const deleteStaff = (id) => {
    if (confirm('Delete this staff?')) {
        staffs = staffs.filter((s) => s.id !== id);
        if (editingId === id){
            editingId = null;
            form.reset();
        }
        render();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdate();
})


