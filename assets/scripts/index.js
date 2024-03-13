// validate input
let editAble = false; // editable flag
const editOnBtn = document.querySelector('.edit-on');
const saveBtn = document.querySelector('button#edit-btn');
const myUser = JSON.parse(localStorage.getItem('amamy_user'));
const myUserInfor = JSON.parse(localStorage.getItem('amamy_user-infor'));

if (myUserInfor?.user_name) {
    document.querySelector("input[name='fullName']").placeholder =
        myUserInfor?.user_name;
} else {
    document.querySelector("input[name='fullName']").placeholder =
        myUser?.user_display_name;
}
if (myUserInfor?.user_phone)
    document.querySelector("input[name='phone']").placeholder =
        myUserInfor?.user_phone;
if (myUserInfor?.user_email)
    document.querySelector("input[name='email']").placeholder =
        myUserInfor?.user_email;
if (myUserInfor?.user_dcvn)
    document.querySelector("input[name='address-vi']").placeholder =
        myUserInfor?.user_dcvn;
if (myUserInfor?.user_dcng)
    document.querySelector("input[name='address-foreign']").placeholder =
        myUserInfor?.user_dcng;

if (editOnBtn) {
    editOnBtn.onclick = function (e) {
        e.preventDefault();
        editAble = true;
        const inputs = document
            .getElementById('my-account')
            .querySelectorAll('input:not([type="file"])');
        inputs.forEach((input) => input.removeAttribute('disabled'));
        document.querySelector("input[name='email']").value =
            userInfor.user_email;
        document
            .querySelector("input[name='email']")
            .setAttribute('disabled', true);
        inputs[0].focus();
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
    },
    {
        name: 'address-vi',
        isValid: false
    },
    {
        name: 'address-foreign',
        isValid: false
    }
];

document.querySelectorAll('input:not([type="file"])').forEach((input) => {
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
    document.querySelectorAll('input:not([type="file"])').forEach((input) => {
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

// submit btn for edit user infor
saveBtn.onclick = function (e) {
    e.preventDefault();
    if (editAble) {
        validateInputs();
        if (myAccountValidates.every((item) => item.isValid)) {
            const loader = document.querySelector('.loader');
            loader.classList.add('show');
            const data = {};
            document
                .querySelectorAll('input:not([type="file"])')
                .forEach((input) => (data[input.name] = input.value));

            const formData = new FormData();
            formData.append('username', data.fullName);
            formData.append('phone', data.phone);
            formData.append('email', userInfor.user_email);
            formData.append('dcvn', data['address-vi']);
            formData.append('dcng', data['address-foreign']);
            fetch('https://amamy.net/wp-json/custom/v1/edit_info', {
                method: 'POST',
                headers: {
                    Authorization:
                        'Bearer ' +
                        JSON.parse(localStorage.getItem('amamy_user'))?.token
                },
                body: formData
            })
                .then((r) => r.json())
                .then((res) => {
                    if (!res.success) {
                        document.querySelector(
                            '.error-message.for-2'
                        ).textContent = res?.message;
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
                            fontSize: '1.25rem',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            borderRadius: '0.5rem'
                        },
                        onClick: function () {} // Callback after click
                    }).showToast();
                    editAble = false;
                    const inputs = document
                        .getElementById('my-account')
                        .querySelectorAll('input:not([type="file"])');
                    inputs.forEach((input) =>
                        input.setAttribute('disabled', true)
                    );
                    document
                        .getElementById('edit-btn')
                        .setAttribute('disabled', true);
                    editOnBtn.style.display = 'flex';
                    saveBtn.style.display = 'none';

                    document.querySelector(
                        "input[name='fullName']"
                    ).placeholder = res?.user_name;

                    document.querySelector("input[name='phone']").placeholder =
                        res?.user_phone;

                    document.querySelector("input[name='email']").placeholder =
                        res?.user_email;

                    document.querySelector(
                        "input[name='address-vi']"
                    ).placeholder = res?.user_dcvn;

                    document.querySelector(
                        "input[name='address-foreign']"
                    ).placeholder = res?.user_dcng;

                    const { success, message, ...restData } = res;
                    localStorage.setItem(
                        'user-infor',
                        JSON.stringify({
                            ...restData,
                            ...myUserInfor.user_rank
                        })
                    );
                    document.getElementById('my-account').reset();
                })
                .catch((err) => {
                    // console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }
    }
};
