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

// loading
// displayRanks.forEach((element) => {
//     element.classList.add('skeleton');
// });

// inputGroups.forEach((inputGroup) => {
//     inputGroup.classList.add('skeleton');
// });

if (user) {
    if (user.token) {
        const renderUserUI = (res) => {
            if (!avatarLink || avatarLink == 'undefined') {
                // get avatar
                avatarWrappers.forEach((wrapper) => {
                    wrapper.classList.add('skeleton');
                    wrapper.classList.add('rounded');
                });
                fetch('https://amamy.net/wp-json/custom/v1/avatar', {
                    headers: {
                        Authorization: 'Bearer ' + user.token
                    }
                })
                    .then((raw) => raw.json())
                    .then((res) => {
                        if (res.success) {
                            const img = new Image();
                            img.src = res.author_pic;
                            img.onload = function () {
                                // console.log('Đường dẫn hợp lệ');
                                localStorage.setItem(
                                    'amamy_avatar',
                                    res.author_pic
                                );
                                avatars.forEach((imgELement) => {
                                    imgELement.src = res.author_pic;
                                });
                            };

                            img.onerror = function () {
                                // console.log('Đường dẫn không hợp lệ');
                            };
                        }
                    })
                    .catch((err) => {
                        // console.log(err);
                    })
                    .finally(() => {
                        avatarWrappers.forEach((wrapper) => {
                            wrapper.classList.remove('skeleton');
                            wrapper.classList.remove('rounded');
                        });
                    });
            } else {
                avatars.forEach((imgELement) => {
                    imgELement.src = avatarLink;
                });
            }

            // render % discount
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

            displayNames.forEach((el) => {
                el.textContent = user.user_display_name;
            });

            if (userInfor?.user_name && inputFullName) {
                inputFullName.placeholder = userInfor.user_name;
            }
            if (userInfor?.user_phone && inputPhone)
                inputPhone.placeholder = userInfor.user_phone;
            if (userInfor?.user_email && inputEmail)
                inputEmail.placeholder = userInfor?.user_email;
            if (userInfor?.user_dcvn && inputAddressVi)
                inputAddressVi.placeholder = userInfor.user_dcvn;
            if (userInfor?.user_dcng && inputAddressForeign)
                inputAddressForeign.placeholder = userInfor.user_dcng;

            displayRanks.forEach((element) => {
                element.classList.remove('skeleton');
            });

            // inputGroups.forEach((input) => {
            //     input.classList.remove('skeleton');
            // });
        };
        if (!userInfor) {
            inputGroups.forEach((input) => {
                input.classList.add('skeleton');
            });
            //  get user infor
            fetch('https://amamy.net/wp-json/custom/v1/info', {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            })
                .then((raw) => raw.json())
                .then((res) => {
                    if (res.success) {
                        const { success, ...rest } = res;
                        renderUserUI(res);
                        localStorage.setItem(
                            'amamy_user-infor',
                            JSON.stringify({ ...rest })
                        );
                        if (rest?.user_name) {
                            inputFullName.placeholder = rest.user_name;
                        }
                        if (rest?.user_phone)
                            inputPhone.placeholder = rest.user_phone;
                        if (rest?.user_email)
                            inputEmail.placeholder = rest?.user_email;
                        if (rest?.user_dcvn)
                            inputAddressVi.placeholder = rest.user_dcvn;
                        if (rest?.user_dcng)
                            inputAddressForeign.placeholder = rest.user_dcng;
                    }
                })
                .catch((err) => {
                    // console.log(err);
                })
                .finally(() => {
                    inputGroups.forEach((input) => {
                        input.classList.remove('skeleton');
                    });
                });
        } else {
            renderUserUI(userInfor);
        }
    }
}

// displayRanks.forEach((element) => {
//     element.classList.remove('skeleton');
// });

// inputGroups.forEach((input) => {
//     input.classList.remove('skeleton');
// });

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

// show dialog avatar selection & upload avatar

// convert file to base64
function convertToBase64() {
    const fileInput = document.querySelector("input[name='avatar']");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64String = reader.result;
            // console.log(base64String);
            const formData = new FormData();
            formData.append('avatar', base64String);
            // edit avatar
            avatarWrappers.forEach((wrapper) => {
                wrapper.classList.add('skeleton');
                wrapper.classList.add('rounded');
            });
            fetch('https://amamy.net/wp-json/custom/v1/avatar', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.token
                },
                body: formData
            })
                .then((r) => r.json())
                .then((res) => {
                    if (res.success) {
                        const img = new Image();
                        img.src = res.author_pic;
                        img.onload = function () {
                            // console.log('Đường dẫn hợp lệ');
                            localStorage.setItem(
                                'amamy_avatar',
                                res.author_pic
                            );

                            avatarImgs.forEach((imgELement) => {
                                imgELement.src = res.author_pic;
                            });
                        };

                        img.onerror = function () {
                            // console.log('Đường dẫn không hợp lệ');
                        };
                    }
                })
                .catch((err) => {
                    // console.log(err)
                })
                .finally(() => {
                    avatarWrappers.forEach((wrapper) => {
                        wrapper.classList.remove('skeleton');
                        wrapper.classList.remove('rounded');
                    });
                });
        };
        reader.readAsDataURL(file);
    }
}

document.querySelectorAll('.avatar-wrapper, .avatar').forEach((el) => {
    el.onclick = function () {
        const inputAvatar = el.querySelector("input[name='avatar']");
        inputAvatar.click();
    };
});

const inputAvatar = document.querySelector("input[name='avatar']");

inputAvatar?.addEventListener('click', function () {
    if (inputAvatar.value) {
        inputAvatar.value = null;
    }
});

inputAvatar?.addEventListener('input', function () {
    convertToBase64();
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
