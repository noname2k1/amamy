import { fetchUserInfor, fetchAvatar, editAvatar } from './fetch.js';
// show infor of user
const user = JSON.parse(localStorage.getItem('amamy_user'));
const userInfor = JSON.parse(localStorage.getItem('amamy_user-infor'));
const avatarLink = localStorage.getItem('amamy_avatar');

const displayRanks = document.querySelectorAll('.rank-infor');
const avatars = document.querySelectorAll(
    '.avatar-wrapper img:first-child, .avatar img:first-child'
);

const discountPecentages = document.querySelectorAll(
    'span.discount-percent, .user-rank .infor p:nth-child(3) .discount-percent'
);

const displayRankNames = document.querySelectorAll(
    '.main-section .main .user .rank-infor .text p:nth-child(2), .user-rank .infor h2'
);

const displayNames = document.querySelectorAll(
    '.rank-infor h1 .display-name, .user-editable p'
);

const inputGroups = document.querySelectorAll('form .input-group');
const inputFullName = document.querySelector("input[name='fullName']");
const inputPhone = document.querySelector("input[name='phone']");
const inputEmail = document.querySelector("input[name='email']");
const inputAddressVi = document.querySelector("input[name='address-vi']");
const inputAddressForeign = document.querySelector(
    "input[name='address-foreign']"
);

const avatarWrappers = document.querySelectorAll('.avatar-wrapper, .avatar');
const avatarImgs = document.querySelectorAll(
    '.avatar-wrapper img:first-child, .avatar img:first-child'
);

if (user) {
    if (user.token) {
        if (!avatarLink || avatarLink == 'undefined') {
            // get avatar
            avatarWrappers.forEach((wrapper) => {
                wrapper.classList.add('skeleton');
                wrapper.classList.add('skeleton-avatar');
            });
            try {
                const GET_AVATAR = await fetchAvatar(user.token);
                if (GET_AVATAR.success) {
                    const img = new Image();
                    img.src = GET_AVATAR.author_pic;
                    img.onload = function () {
                        // console.log('Đường dẫn hợp lệ');
                        localStorage.setItem(
                            'amamy_avatar',
                            GET_AVATAR.author_pic
                        );
                        avatars.forEach((imgELement) => {
                            imgELement.src = GET_AVATAR.author_pic;
                        });
                    };
                    img.onerror = function () {
                        // console.log('Đường dẫn không hợp lệ');
                    };
                }
                avatarWrappers.forEach((wrapper) => {
                    wrapper.classList.remove('skeleton');
                    wrapper.classList.remove('skeleton-avatar');
                });
            } catch (error) {
                // console.log(error)
                avatarWrappers.forEach((wrapper) => {
                    wrapper.classList.remove('skeleton');
                    wrapper.classList.remove('skeleton-avatar');
                });
            }
        } else {
            avatars.forEach((imgELement) => {
                imgELement.src = avatarLink;
            });
        }

        // render placeholder of required field smilar to existed data
        if (userInfor?.user_name && inputFullName) {
            inputFullName.placeholder = userInfor.user_name;
        }
        if (userInfor?.user_phone && inputPhone)
            inputPhone.placeholder = userInfor.user_phone;
        if (userInfor?.user_email && inputEmail)
            inputEmail.placeholder = userInfor?.user_email;

        displayRanks.forEach((element) => {
            element.classList.remove('skeleton');
        });

        // inputGroups.forEach((input) => {
        //     input.classList.remove('skeleton');
        // });
    }
}
const renderUserUI = async (res) => {
    // render % discount
    // render user_name
    displayNames.forEach((el) => {
        el.textContent = res.user_name ? res.user_name : user.user_display_name;
    });

    discountPecentages.forEach((el) => {
        el.textContent =
            res.user_rank === 'Đồng'
                ? '3'
                : res.user_rank === 'Bạc'
                ? '4'
                : res.user_rank === 'Vàng'
                ? '5'
                : '1.5';
    });

    // render rank names
    displayRankNames.forEach((el) => {
        el.textContent =
            res.user_rank === 'Thành viên mới'
                ? 'Thành viên mới'
                : 'Hạng ' + res.user_rank;
    });

    // render bg color of rank
    document.querySelectorAll('.user-rank, .infor').forEach((el) => {
        el.classList.add(
            res.user_rank === 'Đồng'
                ? 'copper'
                : res.user_rank === 'Bạc'
                ? 'silver'
                : res.user_rank === 'Vàng'
                ? 'gold'
                : 'newbie'
        );
    });

    if (res?.user_name) {
        inputFullName.placeholder = res.user_name;
    } else {
        inputFullName.placeholder = user.user_display_name;
    }
    if (res?.user_phone) inputPhone.placeholder = res.user_phone;
    if (res?.user_email) inputEmail.placeholder = res?.user_email;
};
if (!userInfor) {
    inputGroups.forEach((input) => {
        input.classList.add('skeleton');
    });
    //  get user infor
    try {
        const FETCH_USER_INFOR = await fetchUserInfor(user.token);
        if (FETCH_USER_INFOR.success) {
            const { success, ...rest } = FETCH_USER_INFOR;

            // render UI
            renderUserUI(FETCH_USER_INFOR);
            // save user infor
            localStorage.setItem(
                'amamy_user-infor',
                JSON.stringify({ ...rest })
            );
            // if (rest?.user_dcvn)
            //     inputAddressVi.placeholder = rest.user_dcvn;
            // if (rest?.user_dcng)
            //     inputAddressForeign.placeholder = rest.user_dcng;
        }
    } catch (error) {
        // console.log(error);
    }
    inputGroups.forEach((input) => {
        input.classList.remove('skeleton');
    });
} else {
    renderUserUI(userInfor);
}

// show password
document.querySelectorAll('.show-pwd').forEach((element) => {
    element.onclick = function () {
        const input = element.parentNode.querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            element.parentNode.querySelector('.hide-pwd').style.display =
                'block';
            element.parentNode.querySelector('.show-pwd').style.display =
                'none';
        } else {
            input.type = 'password';
            element.parentNode.querySelector('.hide-pwd').style.display =
                'none';
            element.parentNode.querySelector('.show-pwd').style.display =
                'block';
        }
    };
});
// hide password
document.querySelectorAll('.hide-pwd').forEach((element) => {
    element.onclick = function () {
        const input = element.parentNode.querySelector('input');
        if (input.type === 'text') {
            input.type = 'password';
            element.parentNode.querySelector('.hide-pwd').style.display =
                'none';
            element.parentNode.querySelector('.show-pwd').style.display =
                'block';
        } else {
            input.type = 'text';
            element.parentNode.querySelector('.hide-pwd').style.display =
                'block';
            element.parentNode.querySelector('.show-pwd').style.display =
                'none';
        }
    };
});

// convert file to base64 & upload avatar
function convertToBase64(inputAvatar) {
    const file = inputAvatar.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = async function () {
            const base64String = reader.result;
            // console.log(base64String);
            const formData = new FormData();
            formData.append('avatar', base64String);
            // edit avatar
            avatarWrappers.forEach((wrapper) => {
                wrapper.classList.add('skeleton');
                wrapper.classList.add('skeleton-avatar');
            });
            try {
                // edit avatar
                const EDIT_AVATAR = await editAvatar(user.token, formData);
                if (EDIT_AVATAR.success) {
                    const img = new Image();
                    img.src = EDIT_AVATAR.author_pic;
                    img.onload = function () {
                        // console.log('Đường dẫn hợp lệ');
                        localStorage.setItem(
                            'amamy_avatar',
                            EDIT_AVATAR.author_pic
                        );
                        avatarImgs.forEach((imgELement) => {
                            imgELement.src = EDIT_AVATAR.author_pic;
                        });
                    };
                    img.onerror = function () {
                        // console.log('Đường dẫn không hợp lệ');
                    };
                }
            } catch (error) {
                // console.log(error)
            }
            avatarWrappers.forEach((wrapper) => {
                wrapper.classList.remove('skeleton');
                wrapper.classList.remove('skeleton-avatar');
            });
        };
        reader.readAsDataURL(file);
    }
}

// show dialog avatar selection
document.querySelectorAll('.avatar-wrapper, .avatar').forEach((el) => {
    el.onclick = function () {
        const inputAvatar = el.querySelector("input[name='avatar']");
        inputAvatar.click();
    };
});

const inputAvatars = document.querySelectorAll("input[name='avatar']");

inputAvatars.forEach((inputAvatar) => {
    inputAvatar?.addEventListener('click', function () {
        if (inputAvatar.value) {
            inputAvatar.value = null;
        }
    });
});

inputAvatars.forEach((inputAvatar) => {
    inputAvatar?.addEventListener('input', function () {
        convertToBase64(inputAvatar);
    });
});

// logout
const logout = document.getElementById('log-out');
logout?.addEventListener('click', function () {
    // delete user data in localStorage
    localStorage.removeItem('amamy_user');
    localStorage.removeItem('amamy_user-infor');
    localStorage.removeItem('amamy_avatar');
    //redirect to login page
    location.href = (env == 'dev' ? '' : host) + '/dang-nhap.html';
});

// fake thêm đơn vận chuyển
// for (let i = 0; i < 20; i++) {
//     fetch('https://amamy.net/wp-json/custom/v1/gui_don', {
//         method: 'POST',
//         headers: {
//             Authorization: 'Bearer ' + user.token
//         },
//         body: {
//             title: 'DE6283A',
//             ma_don: 'mh370' + new Date().toDateString() + i,
//             ten_nguoi_gui: 'SPAMMER',
//             ten_nguoi_nhan: 'SENDER',
//             trang_thai_don_hang: 'Đang vận chuyển',
//             dia_chi_nguoi_gui: '',
//             dia_chi_nguoi_nhan: 'Hà Nội',
//             tien_trinh_giao_hang: '',
//             link_tracking_thu_ba: '',
//             ma_van_don_thu_ba: '',
//             gia_don_hang: '200000',
//             khoi_luong_don_hang: '30kg',
//             loai_tien_te: 'vnd'
//         }
//     });
// }
