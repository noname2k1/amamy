if (!localStorage.getItem('amamy_user')) {
    // console.log('redirect');
    location.href = (env == 'dev' ? '' : host) + '/dang-nhap.html';
}
