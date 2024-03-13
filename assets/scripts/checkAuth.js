if (localStorage.getItem('amamy_user')) {
    location.href = (env == 'dev' ? '' : host) + '/tai-khoan-cua-toi.html';
}
