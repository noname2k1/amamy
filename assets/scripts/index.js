import { editUserInfor } from './fetch.js';

let editAble = false; // editable flag
const editOnBtn = document.querySelector('.edit-on');
const saveBtn = document.querySelector('button#edit-btn');
const myUser = JSON.parse(localStorage.getItem('amamy_user'));
const myUserInfor = JSON.parse(localStorage.getItem('amamy_user-infor'));

const displayNames = document.querySelectorAll(
    '.rank-infor h1 .display-name, .user-editable p'
);
const inputsInForm = document
    .getElementById('my-account')
    .querySelectorAll('input:not([type="file"])');
const inputsMustValidate = document
    .getElementById('my-account')
    .querySelectorAll(
        'input:not([type="file"]):not([name="address-vi"]):not([name="address-foreign"])'
    );

const inputFullName = document.querySelector("input[name='fullName']");
const inputPhone = document.querySelector("input[name='phone']");
const inputEmail = document.querySelector("input[name='email']");

// enabled edit user infor
if (editOnBtn) {
    editOnBtn.onclick = function (e) {
        e.preventDefault();
        editAble = true;
        inputsInForm.forEach((input) => input.removeAttribute('disabled'));
        document.querySelector("input[name='email']").value =
            myUser?.user_email;
        document
            .querySelector("input[name='email']")
            .setAttribute('disabled', true);
        inputsInForm[0].focus();
        document.getElementById('edit-btn').removeAttribute('disabled');
        editOnBtn.style.display = 'none';
        saveBtn.style.display = 'flex';
    };
}

const namePattern =
    /^(?![\d\s!@#$%^&*()\-=_+[\]{};':"\\|,.<>?`~])[^\d!@#$%^&*()\-=_+[\]{};':"\/\\|,.<>?`~]{1,100}$/u;
const phonePattern = /^\d{7,}$/;
const emailPattern = /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/;
const addressPattern = /^[\p{L}\d\s.,-]+$/u;

const myAccountValidates = [
    {
        name: 'fullName',
        isValid: false
    },
    {
        name: 'phone',
        isValid: false
    },
    {
        name: 'email',
        isValid: false
    }
];

inputsMustValidate.forEach((input) => {
    input.onblur = function (e) {
        const inputElement = e.target;
        const value = inputElement.value.trim();
        if (!value) {
            inputElement.parentNode.querySelector(
                '.error-message'
            ).textContent = 'Dữ liệu không được để trống';
            myAccountValidates.find(
                (item) => item.name === inputElement.name
            ).isValid = false;
            return;
        }

        if (input.name === 'fullName') {
            if (!namePattern.test(value)) {
                inputElement.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = true;
            }
        }

        if (input.name === 'phone') {
            if (!phonePattern.test(value)) {
                inputElement.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = true;
            }
        }
        if (input.name === 'email') {
            if (!emailPattern.test(value)) {
                inputElement.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = true;
            }
        }
        if (input.name === 'address-vi') {
            if (!addressPattern.test(value)) {
                inputElement.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = true;
            }
        }

        if (input.name === 'address-foreign') {
            if (!addressPattern.test(value)) {
                inputElement.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === inputElement.name
                ).isValid = true;
            }
        }
    };

    input.onfocus = function (e) {
        e.target.parentNode.querySelector('.error-message').textContent = '';
    };
});
const validateInputs = () => {
    inputsMustValidate.forEach((input) => {
        const value = input.value.trim();
        if (!value) {
            input.parentNode.querySelector('.error-message').textContent =
                'Dữ liệu không được để trống';
            return;
        }

        if (input.name === 'fullName') {
            if (!namePattern.test(value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }

        if (input.name === 'phone') {
            if (!phonePattern.test(value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'email') {
            if (!emailPattern.test(value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'address-vi') {
            if (!addressPattern.test(value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }

        if (input.name === 'address-foreign') {
            if (!addressPattern.test(value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                myAccountValidates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
    });
};

if (myUserInfor) {
    if (myUserInfor?.user_name) {
        inputFullName.placeholder = myUserInfor.user_name;
    } else {
        inputFullName.placeholder = myUser.user_display_name;
    }
    if (myUserInfor?.user_phone)
        inputPhone.placeholder = myUserInfor.user_phone;
    if (myUserInfor?.user_email)
        inputEmail.placeholder = myUserInfor?.user_email;
}

// submit btn for edit user infor
saveBtn.onclick = async function (e) {
    e.preventDefault();
    if (editAble) {
        validateInputs();
        if (myAccountValidates.every((item) => item.isValid)) {
            const loader = document.querySelector('.loader');
            loader.classList.add('show');
            const data = {};
            inputsInForm.forEach((input) => (data[input.name] = input.value));

            const formData = new FormData();
            formData.append('username', data.fullName);
            formData.append('phone', data.phone);
            formData.append('email', myUser.user_email);
            formData.append(
                'dcvn',
                data['address-vi'] ? data['address-vi'] : ''
            );
            formData.append(
                'dcng',
                data['address-foreign'] ? data['address-foreign'] : ''
            );

            // edit user infor
            try {
                const EDIT_USER_INFOR = await editUserInfor(
                    JSON.parse(localStorage.getItem('amamy_user'))?.token,
                    formData
                );

                if (!EDIT_USER_INFOR.success) {
                    document.querySelector('.error-message.for-2').textContent =
                        EDIT_USER_INFOR?.message;
                    return;
                }
                Toastify({
                    text: 'Cập nhật thông tin tài khoản thành công',
                    duration: 3000,
                    newWindow: false,
                    close: true,
                    gravity: 'top', // `top` or `bottom`
                    position: 'right', // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: '#38b6ff',
                        color: '#fff',
                        fontFamily: 'Montserrat',
                        fontSize: '2rem',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        borderRadius: '0.5rem',
                        maxWidth: 'unset',
                        whiteSpace: 'nowrap'
                    },
                    onClick: function () {} // Callback after click
                }).showToast();
                editAble = false;
                inputsInForm.forEach((input) => {
                    input.setAttribute('disabled', true);
                    input.value = '';
                });
                document
                    .getElementById('edit-btn')
                    .setAttribute('disabled', true);
                editOnBtn.style.display = 'flex';
                saveBtn.style.display = 'none';

                document.querySelector("input[name='fullName']").placeholder =
                    EDIT_USER_INFOR.user_name;

                document.querySelector("input[name='phone']").placeholder =
                    EDIT_USER_INFOR.user_phone;

                document.querySelector("input[name='email']").placeholder =
                    EDIT_USER_INFOR.user_email;

                displayNames.forEach((el) => {
                    el.textContent = EDIT_USER_INFOR.user_name;
                });
                // document.querySelector(
                //     "input[name='address-vi']"
                // ).placeholder = res.user_dcvn;

                // document.querySelector(
                //     "input[name='address-foreign']"
                // ).placeholder = res.user_dcng;

                const { success, message, ...restData } = EDIT_USER_INFOR;
                localStorage.setItem(
                    'amamy_user-infor',
                    JSON.stringify({
                        ...restData,
                        user_rank: myUserInfor.user_rank
                    })
                );
            } catch (error) {
                console.log(error);
            }
            loader.classList.remove('show');
        }
    }
};
