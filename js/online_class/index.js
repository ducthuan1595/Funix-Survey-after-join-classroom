
const LINK_URL = 'https://portal-staging.funix.edu.vn';
const urlParams = new URLSearchParams(window.location.search);
const sessionInput = urlParams.get('session_input');

if (sessionInput) {
    const sessionId = atob(sessionInput)
    async function getInfoAfterClass () {
        try{
            const res = await fetch(`${LINK_URL}/api/v1/private_teacher/session_evaluation?session_input=${+sessionId}`);
            const data = await res.json();
            renderContent(data.data)
        }catch(err) {
            console.error(err);
        }
    };
    getInfoAfterClass();
}

function renderContent (data) {
    const tableEl = document.getElementById('data_table');
    tableEl.innerHTML = `
        <div class="info-class__table-data">
            <div>
                <div class="title">Học viên</div>
                <div class="value">${data.student_id}</div>
            </div>
            <div>
                <div class="title">Môn học</div>
                <div class="value">${data.course_id}</div>
            </div>
            <div>
                <div class="title">Mentor/Giảng viên</div>
                <div class="value">${data.mentor_id}</div>
            </div>
            <div>
                <div class="title">Thời gian diễn ra</div>
                <div class="value">${data.start_time}</div>
            </div>
            <div>
                <div class="title">Tến độ buổi học</div>
                <div class="value">${data.progress}</div>
            </div>
            <div>
                <div class="title">Nội dung buổi học</div>
                <div class="value">${data.course_content}</div>
            </div>
            <div>
                <div class="title">Nhận xét từ Mentor/Giảng viên</div>
                <div class="value">${data.mentor_evaluation}</div>
            </div>
            <div>
                <div class="title">Nội dung tiếp theo/dặn dò</div>
                <div class="value">${data.next_note}</div>
            </div>
        </div>
    `;
}

const descEl = document.querySelector('textarea[name="description"]');
const formEl = document.querySelector('.form-survey');
const ratingFaceEl = document.querySelectorAll('.e-rating__face');
const contentNoteEl = document.getElementById('content-noted');
const errorMessageEl = document.querySelector('.error-message');
let rating = '';
let ratingEl = null;


function handleChose (e,value) {
    errorMessageEl.innerText = '';
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
        "parent_evaluation": rating,
        "parent_explanation": descEl.value,
        "session_input": +atob(sessionInput)
    });

    try {
        fetch(`${LINK_URL}/api/v1/private_teacher/parent_evaluation`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: data
            }
        )
        .then(response => response.json())
        .then((data) => {
            if(data.code !== 201) {
                errorMessageEl.innerText = data.message
                return;
            }
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
    }catch(err) {
        console.log(err);
    }

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