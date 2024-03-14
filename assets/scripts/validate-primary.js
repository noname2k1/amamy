import { fetchOrder, fetchUserInfor } from './fetch.js';

const user = JSON.parse(localStorage.getItem('amamy_user'));

const DEFAULT_MESSAGE_FOR_REQUIRED_FIELD = 'Dữ liệu không được để trống';
const VALIDATES = [
    {
        name: 'fullName',
        isValid: false,
        pattern:
            /^(?![\d\s!@#$%^&*()\-=_+[\]{};':"\\|,.<>?`~])[^\d!@#$%^&*()\-=_+[\]{};':"\/\\|,.<>?`~]{1,100}$/u
    },
    {
        name: 'phone',
        isValid: false,
        pattern: /^\d{7,}$/
    },
    {
        name: 'email',
        isValid: false,
        pattern: /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+\.[a-zA-Z]{2,4}$/,
        customRequiredMessage: 'Email không được để trống'
    },
    {
        name: 'password',
        isValid: false,
        pattern: /^.{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'current-password',
        isValid: false,
        pattern: /^.{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'new-password',
        isValid: false,
        pattern: /^.{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'confirm-password',
        isValid: false,
        pattern: /^.{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'code',
        isValid: false,
        pattern: /^.{4,}$/u,
        customRequiredMessage: 'Mã không được để trống',
        message: 'Mã không hợp lệ'
    }
];

const inputs = document.querySelectorAll(
    'form input:not([type="file"]):not([disabled].d-none)'
);

inputs.forEach((inputElement) => {
    const currentValidateItem = VALIDATES.find(
        (item) => item.name === inputElement.name
    );
    inputElement.onblur = function (e) {
        const input = e.target;
        if (!input.value) {
            input
                .closest('.input-group')
                .querySelector('.error-message').textContent =
                currentValidateItem?.customRequiredMessage
                    ? currentValidateItem.customRequiredMessage
                    : DEFAULT_MESSAGE_FOR_REQUIRED_FIELD;
            return;
        }
        // fullname
        if (input.name === 'fullName') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // phone
        if (input.name === 'phone') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // email
        if (input.name === 'email') {
            // console.log('email');
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // password
        if (input.name === 'password') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'current-password') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'new-password') {
            if (
                input.value ===
                document.querySelector('input[name="current-password"]')?.value
            ) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    'Mật khẩu mới và mật khẩu cũ không được trùng nhau';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'confirm-password') {
            if (
                input.value !==
                document.querySelector('input[name="new-password"]').value
            ) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    'Mật khẩu xác nhận không trùng khớp';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
    };
    inputElement.onfocus = function () {
        inputElement
            .closest('.input-group')
            .querySelector('.error-message').textContent = '';
    };
});

const validateInputs = () => {
    inputs.forEach((input) => {
        const currentValidateItem = VALIDATES.find(
            (item) => item.name === input.name
        );
        if (!input.value) {
            // console.log(input);
            input
                .closest('.input-group')
                .querySelector('.error-message').textContent =
                currentValidateItem?.customRequiredMessage
                    ? currentValidateItem.customRequiredMessage
                    : DEFAULT_MESSAGE_FOR_REQUIRED_FIELD;
            return;
        } // fullname
        if (input.name === 'fullName') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // phone
        if (input.name === 'phone') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // email
        if (input.name === 'email') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input.parentNode.querySelector('.error-message').textContent =
                    'Dữ liệu nhập không hợp lệ';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        // password
        if (input.name === 'password') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'current-password') {
            if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'new-password') {
            if (
                input.value ===
                document.querySelector('input[name="current-password"]')?.value
            ) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    'Mật khẩu mới và mật khẩu cũ không được trùng nhau';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'confirm-password') {
            if (
                input.value !==
                document.querySelector('input[name="new-password"]').value
            ) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    'Mật khẩu xác nhận không trùng khớp';
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!currentValidateItem.pattern.test(input.value)) {
                input
                    .closest('.input-group')
                    .querySelector('.error-message').textContent =
                    currentValidateItem.message;
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                VALIDATES.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
    });
};

const toastStyle = {
    background: '#38b6ff',
    color: '#fff',
    fontFamily: 'Montserrat',
    fontSize: '2rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    borderRadius: '0.5rem',
    whiteSpace: 'nowrap',
    maxWidth: 'unset'
};

const form = document.querySelector('form');
const submitBtn = document.querySelector('form button[type="submit"]');
const loader = submitBtn.querySelector('.loader');
const errorMessages = document.querySelectorAll('.error-message');
submitBtn.onclick = function (e) {
    e.preventDefault();
    validateInputs();
    const countInputInForm = Array.from(inputs).length;
    const validItemInValidates = VALIDATES.reduce((curr, item) => {
        if (item.isValid) {
            return curr + 1;
        }
        return curr;
    }, 0);
    // console.log({ countInputInForm, validItemInValidates });
    if (countInputInForm === validItemInValidates) {
        loader.classList.add('show');
        errorMessages.forEach((errElement) => (errElement.textContent = ''));
        const data = {};
        inputs.forEach((input) => (data[input.name] = input.value));

        const formData = new FormData();
        // login
        if (form.id === 'login-form') {
            formData.append('username', data.email);
            formData.append('password', data.password);
            fetch('https://amamy.net/wp-json/jwt-auth/v1/token', {
                method: 'POST',
                body: formData
            })
                .then((raw) => raw.json())
                .then(async (res) => {
                    // console.log(res);
                    if (res.data?.status) {
                        document.querySelector(
                            '.text-wrapper .error-message'
                        ).textContent = res.message;
                        return;
                    }
                    try {
                        const orders = await fetchOrder(res.token);
                        const { success, ...restUserInfor } =
                            await fetchUserInfor(res.token);
                        localStorage.setItem('amamy_user', JSON.stringify(res));
                        localStorage.setItem(
                            'amamy_orders',
                            JSON.stringify(orders)
                        );
                        localStorage.setItem(
                            'amamy_user-infor',
                            JSON.stringify(restUserInfor)
                        );
                        // redirect to home page
                        location.href = (env == 'dev' ? '' : host) + '/';
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((err) => {
                    // console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }
        // register
        if (form.id === 'register-form') {
            console.log(data);
            formData.append('username', data.fullName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('password', data['new-password']);
            fetch('https://amamy.net/wp-json/custom/v1/register', {
                method: 'POST',
                body: formData
            })
                .then((raw) => raw.json())
                .then((res) => {
                    console.log(res);
                    if (res.data?.status) {
                        document.querySelector(
                            '.confirm-password .error-message'
                        ).textContent = res.message;
                        return;
                    }
                    Toastify({
                        text: 'Đăng ký tài khoản thành công',
                        duration: 3000,
                        destination: '/dang-nhap.html',
                        newWindow: false,
                        close: true,
                        gravity: 'top', // `top` or `bottom`
                        position: 'right', // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: toastStyle,
                        onClick: function () {} // Callback after click
                    }).showToast();
                    setTimeout(function () {
                        location.href =
                            (env == 'dev' ? '' : host) + '/dang-nhap.html';
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }

        // change password
        if (form.id === 'change-password-form') {
            console.log(data);
            formData.append('password', data['current-password']);
            formData.append('new_password', data['new-password']);
            fetch('https://amamy.net/wp-json/custom/v1/update_password', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
                .then((raw) => raw.json())
                .then((res) => {
                    // console.log(res);
                    if (!res.status) {
                        document.querySelector(
                            '.error-message.for-2'
                        ).textContent = res.message;
                        return;
                    }
                    Toastify({
                        text: 'Đổi mật khẩu thành công',
                        duration: 3000,
                        newWindow: false,
                        close: true,
                        gravity: 'top', // `top` or `bottom`
                        position: 'right', // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: toastStyle,
                        onClick: function () {} // Callback after click
                    }).showToast();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }

        // forgot password step 1 (send reset code to own email)
        if (form.id === 'forgot-password-form') {
            const inputResetCodeGroup = form.querySelector(
                '.input-group.reset-code'
            );
            const inputResetCode = form.querySelector(
                '.input-group.reset-code input'
            );
            console.log(data);
            formData.append('email', data.email);

            // gửi request yêu cầu reset password
            fetch('https://amamy.net/wp-json/bdpwr/v1/reset-password', {
                method: 'POST',
                body: formData
            })
                .then((raw) => raw.json())
                .then((res) => {
                    console.log(res);
                    if (res.data.status !== 200) {
                        document.querySelector(
                            '.error-message.for-2'
                        ).textContent = res.message;
                        return;
                    }
                    Toastify({
                        text: 'Mã đặt lại mật khẩu đã được gửi đến e-mail của bạn',
                        duration: 5000,
                        newWindow: false,
                        close: true,
                        gravity: 'top', // `top` or `bottom`
                        position: 'right', // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: toastStyle,
                        onClick: function () {} // Callback after click
                    }).showToast();
                    // show reset code input
                    inputResetCodeGroup.classList.remove('d-none');
                    inputResetCode.classList.remove('d-none');
                    inputResetCode.removeAttribute('disabled');
                    inputResetCode.focus();
                    form.id = 'validation-reset-code';
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }

        // forgot password step 2 (validation reset code)
        if (form.id === 'validation-reset-code') {
            const inputResetCodeGroup = form.querySelector(
                '.input-group.reset-code'
            );
            const inputResetCode = form.querySelector(
                '.input-group.reset-code input'
            );

            const resetCodeErrorMessage = inputResetCodeGroup.querySelector(
                '.error-message.for-3'
            );

            loader.classList.add('show');

            const currentValidateItem = VALIDATES.find(
                (validateItem) => validateItem.name === inputResetCode.name
            );
            if (!inputResetCode.value) {
                resetCodeErrorMessage.textContent =
                    currentValidateItem?.customRequiredMessage
                        ? currentValidateItem.customRequiredMessage
                        : DEFAULT_MESSAGE_FOR_REQUIRED_FIELD;
                return;
            }
            if (!currentValidateItem.pattern.test(inputResetCode.value)) {
                resetCodeErrorMessage.textContent = currentValidateItem.message;
                return;
            }
            console.log(data);
            formData.append('email', data.email);
            formData.append('code', data.code);

            // gửi request validate code
            fetch('https://amamy.net/wp-json/bdpwr/v1/validate-code', {
                method: 'POST',
                body: formData
            })
                .then((raw) => raw.json())
                .then((res) => {
                    console.log(res);
                    if (res.data.status !== 200) {
                        resetCodeErrorMessage.textContent = res.message;
                        return;
                    }
                    // Toastify({
                    //     text: 'Mã đặt lại mật khẩu đã được gửi đến e-mail của bạn',
                    //     duration: 5000,
                    //     newWindow: false,
                    //     close: true,
                    //     gravity: 'top', // `top` or `bottom`
                    //     position: 'right', // `left`, `center` or `right`
                    //     stopOnFocus: true, // Prevents dismissing of toast on hover
                    //     style: toastStyle,
                    //     onClick: function () {} // Callback after click
                    // }).showToast();
                    // // show reset code input
                    // inputResetCodeGroup.classList.remove('d-none');
                    // inputResetCode.classList.remove('d-none');
                    // inputResetCode.removeAttribute('disabled');
                    // inputResetCode.focus();
                    // form.id = 'validation reset code';
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    loader.classList.remove('show');
                });
        }
    }
};

// Toastify({
//     text: 'Một mã đặt lại mật khẩu đã được gửi đến e-mail của bạn',
//     duration: 100000,
//     destination: '/dang-nhap.html',
//     newWindow: false,
//     close: true,
//     gravity: 'top', // `top` or `bottom`
//     position: 'right', // `left`, `center` or `right`
//     stopOnFocus: true, // Prevents dismissing of toast on hover
//     style: {
//         background: '#38b6ff',
//         color: '#fff',
//         fontFamily: 'Montserrat',
//         fontSize: '2rem',
//         fontStyle: 'normal',
//         fontWeight: 700,
//         lineHeight: 'normal',
//         borderRadius: '0.5rem',
//         whiteSpace: 'nowrap',
//         maxWidth: 'unset'
//     },
//     onClick: function () {} // Callback after click
// }).showToast();
