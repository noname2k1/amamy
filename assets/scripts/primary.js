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

// edit avatar
document.querySelectorAll('.avatar-wrapper, .avatar').forEach((el) => {
    el.onclick = function () {
        // console.log(el);
        el.querySelector("input[name='avatar']").click();
    };
});

// calculate progress by data-percent
