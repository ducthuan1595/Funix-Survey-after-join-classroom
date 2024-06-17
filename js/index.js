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
        <div class="info-class__table-data">
            <div>
                <div class="title">Học viên</div>
                <div class="value">${data.username}</div>
            </div>
            <div>
                <div class="title">Môn học</div>
                <div class="value">${data.subject_name}</div>
            </div>
            <div>
                <div class="title">Mentor/Giảng viên</div>
                <div class="value">${data.mentor_info}</div>
            </div>
            <div>
                <div class="title">Thời gian diễn ra</div>
                <div class="value">${data.duration}</div>
            </div>
            <div>
                <div class="title">Tến độ buổi học</div>
                <div class="value">${data.subject_progress}</div>
            </div>
            <div>
                <div class="title">Nội dung buổi học</div>
                <div class="value">${data.subject_content}</div>
            </div>
            <div>
                <div class="title">Nhận xét từ Mentor/Giảng viên</div>
                <div class="value">${data.mentor_review}</div>
            </div>
            <div>
                <div class="title">Nội dung tiếp theo/dặn dò</div>
                <div class="value">${data.next_subject_note}</div>
            </div>
        </div>
    `
})

const descEl = document.querySelector('textarea[name="description"]');
const formEl = document.querySelector('.form-survey');
const ratingFaceEl = document.querySelectorAll('.e-rating__face');
const contentNoteEl = document.getElementById('content-noted');
const errorMessageEl = document.querySelector('.error-message');
let rating = '';
let ratingEl = null;

function handleChose (e,value) {
    let parentsEl = e.target.closest('.e-rating__face');
    ratingFaceEl.forEach(i => {
        i.style.transform  = ""
    })
    // parentsEl.addEventListener('mouseenter', handleParentHover);
    // parentsEl.addEventListener('mouseleave', handleParentHover);
    ratingEl = parentsEl;
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

    fetch(true, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: data
        }
    ).then(() => {
        if(descEl.value.trim().length > 0) {
            contentNoteEl.innerHTML = descEl.value;
            contentNoteEl.parentElement.classList.remove('display-none');
        }
        if(ratingEl) {
            ratingFaceEl.forEach(i => {
                if(i === ratingEl) {
                    console.log({i});
                } else {
                    i.style.transform  = "";
                    i.style.backgroundColor = '#cac9c3';
                    i.style.pointerEvents = 'none';
                    i.style.cursor = 'none';
                }
            })
        }
        formEl.classList.add('display-none');
        clearForm();
    }).catch((err) => {
        errorMessageEl.innerText = err.message;
    })

}

window.document.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        handleSubmit()
    }
})

function clearForm () {
    rating = '';
    descEl.value = '';
    errorMessageEl.innerText = '';
}