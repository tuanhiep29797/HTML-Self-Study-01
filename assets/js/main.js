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

//tạo mảng staffs rỗng
let staffs = [];

//tạo 1 biến là editingId để biết là mình đang edit hay thêm mới
let editingId = null;

//lấy các element
const form = document.querySelector('#staffForm');
const btn = document.querySelector('#formBtn');


const nameIp = document.querySelector('#name');
const ageIp = document.querySelector('#age');
const genderIp = document.querySelector('input[name="gender"]:checked');
const positionIp = document.querySelector('#position');
const noteIp = document.querySelector('#note');


//hàm add or update để dùng khi thực hiện sự kiện bấm nút
const addOrUpdate = () => {

    //lấy giá trị của các ô input
    const name = nameIp.value.trim();
    const age = ageIp.value.trim();
    const gender = genderIp.value;
    const position = positionIp.value;
    const note = noteIp.value.trim();
    

    //kiểm tra
    if (!name || !age){
        alert('Input full information of staff!');
        return
    }
    

    //tạo object staffData gồm các giá trị vừa nhập vào
    const staffData = {
        id: editingId ?? Date.now(),
        name,
        age,
        gender,
        position,
        note,
    }


    
    if(editingId === null) {
        staffs.push(staffData);  //nếu edittingId = null tức là thêm mới thì push staffData vừa nhập vào mảng staffs
    } else {
        staffs = staffs.map((s) => (s.id === editingId ? staffData : s));  //nếu có editingId thì sẽ map để thay thế thằng có s.id là editingId bằng thằng staffData còn lại giữ nguyên, đây là toán tử ba ngôi, lên mạng search, giống if else nhưng ngắn hơn
        editingId = null; //sau khi edit xong thì đưa editingId về lại null
    }
    form.reset(); //Sau khi xong việc thì xóa hết những gì đang ghi trên form
    render();
}

const render = () => {
    const tbody = document.querySelector('#staffTable tbody');   //select tbody
    tbody.innerHTML = '';    // cho tbody thành rỗng


    //chạy qua từng phần tử của mảng staffs, mỗi phần tử thì tạo 1 row
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

        // sau đó thêm vào tbody
        tbody.innerHTML += row;
    })
    btn.textContent = 'Add';
}

const editStaff = (id) => {

    //tìm thằng staff có id ở chỗ bấm nút edit
    const staff = staffs.find((s) => s.id === id);
    btn.textContent = 'Update';

    // ghi các thông tin của thằng vừa tìm được lên trên form để sửa
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

        //tạo lại mảng staffs mà không bao gồm phần tử có id này
        staffs = staffs.filter((s) => s.id !== id);
        if (editingId === id){
            editingId = null;
            form.reset();
        }
        render();
    }
}

//sự kiện bấm nút ở form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdate();
})


