import { requestResetPassword } from './fetch.js';

const resendResetCodeBtn = document.querySelector('.code-resend');
const emailForgot = localStorage.getItem('amamy_forgot');
const loader = resendResetCodeBtn.querySelector('.loader');

const formData = new FormData();
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
resendResetCodeBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    loader.classList.add('show');
    formData.append('email', emailForgot);
    const errorMessage = document.querySelector('.error-message.for-2');
    try {
        // gửi request yêu cầu reset password
        const REQUEST_RESET_PASSWORD = await requestResetPassword(formData);
        if (REQUEST_RESET_PASSWORD.data.status !== 200) {
            errorMessage.textContent = 'Email người dùng không tồn tại';
            loader.classList.remove('show');
            return;
        }
        loader.classList.remove('show');

        Toastify({
            text: 'Đã gửi lại mã đặt lại mặt khẩu đến email của bạn',
            duration: 5000,
            newWindow: false,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: toastStyle,
            onClick: function () {} // Callback after click
        }).showToast();

        setTimeout(function () {
            location.reload();
        }, 2000);
    } catch (error) {
        // console.log(error);
    }
});
