import {
    changePassword,
    fetchAvatar,
    fetchOrder,
    fetchUserInfor,
    login,
    register,
    requestResetPassword,
    setPassword,
    validateResetCode
} from './fetch.js';

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

        // code
        if (input.name === 'code') {
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
        // code
        if (input.name === 'code') {
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
submitBtn.onclick = async function (e) {
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
            try {
                const LOGIN = await login(formData);
                // console.log(res);
                if (LOGIN.data?.status) {
                    document.querySelector(
                        '.text-wrapper .error-message'
                    ).textContent = LOGIN.message;
                    loader.classList.remove('show');
                    return;
                }
                try {
                    const orders = await fetchOrder(LOGIN.token);
                    const { success, ...restUserInfor } = await fetchUserInfor(
                        LOGIN.token
                    );
                    const AVATAR = await fetchAvatar(LOGIN.token);
                    localStorage.setItem('amamy_user', JSON.stringify(LOGIN));
                    localStorage.setItem(
                        'amamy_orders',
                        JSON.stringify(orders)
                    );
                    localStorage.setItem(
                        'amamy_user-infor',
                        JSON.stringify(restUserInfor)
                    );
                    localStorage.setItem(
                        'amamy_avatar',
                        JSON.stringify(AVATAR.author_pic)
                    );
                    // redirect to home page
                    location.href = (env == 'dev' ? '' : host) + '/';
                } catch (error) {
                    // console.log(error);
                }

                loader.classList.remove('show');
            } catch (error) {
                // console.log(error);
            }
        }
        // register
        if (form.id === 'register-form') {
            formData.append('username', data.fullName);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('password', data['new-password']);
            try {
                const REGISTER = await register(formData);
                if (REGISTER.data?.status) {
                    document.querySelector(
                        '.confirm-password .error-message'
                    ).textContent = REGISTER.message;
                    loader.classList.remove('show');
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
                }, 1000);
            } catch (error) {
                // console.log(error);
            }
            loader.classList.remove('show');
        }

        // change password
        if (form.id === 'change-password-form') {
            formData.append('password', data['current-password']);
            formData.append('new_password', data['new-password']);
            try {
                const CHANGE_PASSWORD = await changePassword(
                    user.token,
                    formData
                );

                // console.log(res);
                if (!CHANGE_PASSWORD.status) {
                    document.querySelector('.error-message.for-2').textContent =
                        CHANGE_PASSWORD.message;
                    loader.classList.remove('show');
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

                loader.classList.remove('show');
            } catch (error) {
                // console.log(error)
            }
        }

        // forgot password step 1 (send reset code to own email)
        if (form.id === 'forgot-password-form') {
            formData.append('email', data.email);

            try {
                // gửi request yêu cầu reset password
                const REQUEST_RESET_PASSWORD = await requestResetPassword(
                    formData
                );
                if (REQUEST_RESET_PASSWORD.data.status !== 200) {
                    document.querySelector('.error-message.for-2').textContent =
                        REQUEST_RESET_PASSWORD.message;
                    loader.classList.remove('show');
                    return;
                }
                loader.classList.remove('show');
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
                loader.classList.remove('show');
                localStorage.setItem('amamy_forgot', data.email);
                setTimeout(function () {
                    location.href =
                        (env == 'dev' ? '' : host) +
                        '/xac-thuc-reset-code.html';
                }, 2000);
            } catch (error) {
                // console.log(error);
            }
        }

        // forgot password step 2 (validation reset code)
        if (form.id === 'validate-reset-code-form') {
            const errorMessage = document.querySelector('.error-message.for-2');
            const emailForgot = localStorage.getItem('amamy_forgot');

            formData.append('email', emailForgot);
            formData.append('code', data.code);

            // gửi request validate code
            try {
                const VALIDATE_RESET_CODE = await validateResetCode(formData);

                console.log(VALIDATE_RESET_CODE);
                if (VALIDATE_RESET_CODE.data.status !== 200) {
                    errorMessage.textContent = VALIDATE_RESET_CODE.message;
                    loader.classList.remove('show');
                    return;
                }
                localStorage.setItem(
                    'amamy_forgot',
                    JSON.stringify({
                        email: emailForgot,
                        code: data.code
                    })
                );
                Toastify({
                    text: 'Mã đặt lại mật khẩu hợp lệ',
                    duration: 3000,
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
                        (env == 'dev' ? '' : host) + '/dat-mat-khau.html';
                }, 2000);
            } catch (error) {
                // console.log(error);
            }
            loader.classList.remove('show');
        }

        // forgot password final step (set password)
        if (form.id === 'set-password-form') {
            const errorMessage = document.querySelector('.error-message.for-2');
            const { email, code } = JSON.parse(
                localStorage.getItem('amamy_forgot')
            );
            formData.append('email', email);
            formData.append('code', code);
            formData.append('password', data.password);

            // set password
            try {
                const SET_PASSWORD = await setPassword(formData);

                console.log(SET_PASSWORD);
                if (SET_PASSWORD.data.status !== 200) {
                    errorMessage.textContent = SET_PASSWORD.message;
                    loader.classList.remove('show');
                    return;
                }
                localStorage.removeItem('amamy_forgot');
                Toastify({
                    text: 'Đặt lại mật khẩu thành công',
                    duration: 3000,
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
                }, 2000);
            } catch (error) {
                // console.log(error);
            }
            loader.classList.remove('show');
        }
    }
};
