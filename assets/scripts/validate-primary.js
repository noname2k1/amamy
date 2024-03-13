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
        pattern: /^[\w]{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'current-password',
        isValid: false,
        pattern: /^[\w]{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'new-password',
        isValid: false,
        pattern: /^[\w]{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    },
    {
        name: 'confirm-password',
        isValid: false,
        pattern: /^[\w]{8,}$/u,
        customRequiredMessage: 'Mật khẩu không được để trống',
        message: 'Mật khẩu không hợp lệ, phải ít nhất 8 ký tự, không có dấu'
    }
];

document
    .querySelectorAll('form input:not([type="file"])')
    .forEach((inputElement) => {
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    document.querySelector('input[name="current-password"]')
                        ?.value
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
    document
        .querySelectorAll('form input:not([type="file"])')
        .forEach((input) => {
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    input.parentNode.querySelector(
                        '.error-message'
                    ).textContent = 'Dữ liệu nhập không hợp lệ';
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
                    document.querySelector('input[name="current-password"]')
                        ?.value
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
    fontSize: '1.25rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
    borderRadius: '0.5rem'
};

const form = document.querySelector('form');
const submitBtn = document.querySelector('form button[type="submit"]');
const loader = submitBtn.querySelector('.loader');
submitBtn.onclick = function (e) {
    e.preventDefault();
    validateInputs();
    const countInputInForm = Array.from(
        document.querySelectorAll('form input:not([type="file"])')
    ).length;
    const validItemInValidates = VALIDATES.reduce((curr, item) => {
        if (item.isValid) {
            return curr + 1;
        }
        return curr;
    }, 0);
    // console.log({ countInputInForm, validItemInValidates });
    if (countInputInForm === validItemInValidates) {
        loader.classList.add('show');
        document
            .querySelectorAll('.error-message')
            .forEach((errElement) => (errElement.textContent = ''));
        const data = {};
        document
            .querySelectorAll('form input:not([type="file"])')
            .forEach((input) => (data[input.name] = input.value));

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
                .then((res) => {
                    // console.log(res);
                    if (res.data?.status) {
                        document.querySelector(
                            '.text-wrapper .error-message'
                        ).textContent = res.message;
                        return;
                    }
                    localStorage.setItem('amamy_user', JSON.stringify(res));
                    location.href =
                        (env == 'dev' ? '' : host) + '/tai-khoan-cua-toi.html';
                })
                .catch((err) => {
                    console.log(err);
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

        // forgot password
        if (form.id === 'forgot-password-form') {
            console.log(data);
            formData.append('email', data.email);
        }
    }
};

// Toastify({
//     text: 'Đăng ký tài khoản thành công',
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
//         fontSize: '1.25rem',
//         fontStyle: 'normal',
//         fontWeight: 700,
//         lineHeight: 'normal',
//         borderRadius: '0.5rem'
//     },
//     onClick: function () {} // Callback after click
// }).showToast();
