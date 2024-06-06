const data = {
    username: 'Ten Hoc Vien',
    subject_name: 'Ten mon hoc',
    mentor_info: 'Ten mentor - Ma mentor',
    duration: 'Thoi gian dien ra',
    subject_progress: 'Level đang sẽ (Áp dụng với SCR, CSP) Level (Áp dụng với lớp SCR,CSP)',
    subject_content: 'Ghi chú chung (bắt buộc): <span>Ghi chú chung</span>',
    mentor_review: 'Độ tính trong tác: Tốt/ Tổng đội/Cần cố gắng» (Nếu có) Nắm bắt kiến thức: Tương đối/Cần cố gắng> (Nếu có) Nắm bắt kiến thức: Tốt Tương đối/Cần cố gắng> (Nếu có)',
    next_subject_note: 'Năm bắt quyết thúc. Tbv Tuong ddMCần có găng» (Nếu có)'
}

window.addEventListener('DOMContentLoaded', () => {
    const tableEl = document.getElementById('data_table');
    tableEl.innerHTML = `
        <table>
            <tr>
                <td class="title">Học viên</td>
                <td>${data.username}</td>
            </tr>
            <tr>
                <td class="title">Môn học</td>
                <td>${data.subject_name}</td>
            </tr>
            <tr>
                <td class="title">Mentor/Giảng viên</td>
                <td>${data.mentor_info}</td>
            </tr>
            <tr>
                <td class="title">Thời gian diễn ra</td>
                <td>${data.duration}</td>
            </tr>
            <tr>
                <td class="title">Tến độ buổi học</td>
                <td>${data.subject_progress}</td>
            </tr>
            <tr>
                <td class="title">Nội dung buổi học</td>
                <td>${data.subject_content}</td>
            </tr>
            <tr>
                <td class="title">Nhận xét từ Mentor/Giảng viên</td>
                <td>${data.mentor_review}</td>
            </tr>
            <tr>
                <td class="title">Nội dung tiếp theo/dặn dò</td>
                <td>${data.next_subject_note}</td>
            </tr>
        </table>
    `
})

const descEl = document.querySelector('textarea[name="description"]');
const formEl = document.querySelector('.form-survey');
const ratingFaceEl = document.querySelectorAll('.e-rating__face');
const errorMessageEl = document.querySelector('.error-message');
let rating = '';

function handleChose (e,value) {
    let parentsEl = e.target.closest('.e-rating__face');
    ratingFaceEl.forEach(i => {
        i.style.transform  = ""
    })
    // parentsEl.addEventListener('mouseenter', handleParentHover);
    // parentsEl.addEventListener('mouseleave', handleParentHover);
    parentsEl.style.transform = "translateY(-1em)"
    rating = value;
}

function handleParentHover(event) {
    const parentsEl = event.currentTarget;
    if (event.type === 'mouseenter') {
        parentsEl.style.transform = 'translateY(2em) scale(1)';
    } else {
        parentsEl.style.transform = '';
    }
}

async function handleSubmit () {
    if(!rating) {
        errorMessageEl.innerText = 'Vui lòng đánh giá mức độ hài lòng!';
        return;
    }
  
    let data = JSON.stringify({
        "rating": rating,
        "description": descEl.value
    });
    console.log({data});

    fetch('http://example.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: data
    }).then(() => {
        clearForm();
        formEl.classList.add('display-none');
    }).catch((err) => {
        errorMessageEl.innerText = err.message;
    })

}

function clearForm () {
    rating = '';
    descEl.value = '';
    errorMessageEl.innerText = '';
}