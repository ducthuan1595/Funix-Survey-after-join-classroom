const LINK_URL = 'https://portal-staging.funix.edu.vn';
const urlParams = new URLSearchParams(window.location.search);
const sessionInput = urlParams.get('oa_uid');

if (sessionInput) {
    // getInfoAfterClass(atob(sessionInput));
    window.addEventListener('DOMContentLoaded', renderContent);
}


function renderContent () {
    
    const submitBtn = document.querySelector('#btn-submit');
    const usernameEl = document.querySelector('input[name=username]');
    const phoneEl = document.querySelector('input[name=phone-number]');
    const errorMessageEl = document.querySelector('.error-message');
    
    // Submit form
    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if(!usernameEl.value.trim()) {
            return errorMessageEl.innerHTML = 'Họ và tên là bắc buộc.';
        }

        if(!checkInputName(usernameEl.value)) {
            errorMessageEl.innerHTML = 'Họ và tên không hợp lệ vui lòng nhập lại.';
            return;
        }

        if(!phoneEl.value) {
            return errorMessageEl.innerHTML = 'Số điện thoại là bắt buộc.';
        }

        if (!checkInputNumber(phoneEl.value)) {
            errorMessageEl.innerHTML = 'Vui lòng nhập số điện thoại hợp lệ.';
            return;
        }

        const data = {
            name: usernameEl.value,
            phone_number: phoneEl.value,
            oa_uid: sessionInput
        }

        console.log({data});
        try{
            const res = await fetch(`${LINK_URL}/api/v1/zalo/link_account`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: data
            });
            const result = await res.json();
            if(result.code !== 201) {
                errorMessageEl.innerHTML = result.message;
                return;
            }
            clearForm();
            console.log('OK');
        }catch(err) {
            console.error(err);
        }
    })


    /////////////////////
    function checkInputName(input) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(input);
    }

    function checkInputNumber(input) {
        const phoneRegex = /^(84|0)\d{9}$/;
        return phoneRegex.test(input);
    }

    function clearForm () {
        errorMessageEl.innerHTML = '';
        phoneEl.value = '',
        usernameEl = '';
    }
}