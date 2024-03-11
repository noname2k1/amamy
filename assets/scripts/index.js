// validate input
let editAble = false; // editable flag
const editOnBtn = document.querySelector('.edit-on');
const saveBtn = document.querySelector('button#edit-btn');

if (editOnBtn) {
    editOnBtn.onclick = function (e) {
        e.preventDefault();
        editAble = true;
        const inputs = document
            .getElementById('my-account')
            .querySelectorAll('input');
        inputs.forEach((input) => input.removeAttribute('disabled'));
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

document.querySelectorAll('input').forEach((input) => {
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
            console.log('email');
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
            // console.log(addressPattern.test(value));
            // console.log(value);
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
    document.querySelectorAll('input').forEach((input) => {
        const value = input.value.trim();
        if (!value) {
            input.parentNode.querySelector('.error-message').textContent =
                'Dữ liệu không được để trống';
            // console.log(input.name);
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
            console.log('email');
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

// submit btn
saveBtn.onclick = function (e) {
    e.preventDefault();
    // console.log(editAble);
    if (editAble) {
        validateInputs();
        if (myAccountValidates.every((item) => item.isValid)) {
            const data = {};
            document
                .querySelectorAll('input')
                .forEach((input) => (data[input.name] = input.value));
            console.log(data);
        }
    }
};
