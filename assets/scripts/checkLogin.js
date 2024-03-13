if (!localStorage.getItem('amamy_user')) {
    location.href = (env == 'dev' ? '' : host) + '/dang-nhap.html';
}
