const changePWD_validates = [
    { name: 'current-password', isValid: false },
    { name: 'new-password', isValid: false },
    { name: 'confirm-password', isValid: false }
];
// const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
const passwordPattern = /^[\w]{6,}$/u;
document.querySelectorAll('form input').forEach((input) => {
    input.onblur = function () {
        if (!input.value) {
            input.parentNode.parentNode.querySelector(
                '.error-message'
            ).textContent = 'Mật khẩu không được để trống';
            return;
        }
        if (input.name === 'current-password') {
            if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'new-password') {
            if (
                input.value ===
                document.querySelector('input[name="current-password"]').value
            ) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu mới và mật khẩu cũ không được trùng nhau';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'confirm-password') {
            if (
                input.value !==
                document.querySelector('input[name="new-password"]').value
            ) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Mật khẩu xác nhận không trùng khớp';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
    };
    input.onfocus = function () {
        input.parentNode.parentNode.querySelector(
            '.error-message'
        ).textContent = '';
    };
});

const validateInputs = () => {
    document.querySelectorAll('form input').forEach((input) => {
        if (!input.value) {
            input.parentNode.parentNode.querySelector(
                '.error-message'
            ).textContent = 'Mật khẩu không được để trống';
            return;
        }
        if (input.name === 'current-password') {
            if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'new-password') {
            if (
                input.value ===
                document.querySelector('input[name="current-password"]').value
            ) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu mới và mật khẩu cũ không được trùng nhau';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
        if (input.name === 'confirm-password') {
            if (
                input.value !==
                document.querySelector('input[name="new-password"]').value
            ) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent = 'Mật khẩu xác nhận không trùng khớp';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
            } else if (!passwordPattern.test(input.value)) {
                input.parentNode.parentNode.querySelector(
                    '.error-message'
                ).textContent =
                    'Mật khẩu không hợp lệ, phải ít nhất 6 ký tự, không có dấu';
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = false;
                return;
            } else {
                changePWD_validates.find(
                    (item) => item.name === input.name
                ).isValid = true;
            }
        }
    });
};

document.querySelector('form button[type="submit"]').onclick = function (e) {
    e.preventDefault();
    validateInputs();
    if (changePWD_validates.every((item) => item.isValid)) {
        document
            .querySelectorAll('.error-message')
            .forEach((errElement) => (errElement.textContent = ''));
        const data = {};
        document
            .querySelectorAll('form input')
            .forEach((input) => (data[input.name] = input.value));
        // console.log(data);
    }
};
