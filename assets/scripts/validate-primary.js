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
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

document.querySelectorAll('form input').forEach((inputElement) => {
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
    document.querySelectorAll('form input').forEach((input) => {
        const currentValidateItem = VALIDATES.find(
            (item) => item.name === input.name
        );
        if (!input.value) {
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

document.querySelector('form button[type="submit"]').onclick = function (e) {
    e.preventDefault();
    validateInputs();
    const countInputInForm = Array.from(
        document.querySelectorAll('form input')
    ).length;
    const validItemInValidates = VALIDATES.reduce((curr, item) => {
        if (item.isValid) {
            return curr + 1;
        }
        return curr;
    }, 0);
    if (countInputInForm === validItemInValidates) {
        document
            .querySelectorAll('.error-message')
            .forEach((errElement) => (errElement.textContent = ''));
        const data = {};
        document
            .querySelectorAll('form input')
            .forEach((input) => (data[input.name] = input.value));
        console.log(data);
    }
};

// validate custom select
