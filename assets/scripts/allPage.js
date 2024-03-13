// home link change
const env = 'prod';
const host = '/amamy';
// console.log(location);

window.addEventListener('DOMContentLoaded', function () {
    const homeLink = document.querySelector(
        'header .logo a, .main-content a.come-back.mobile'
    );
    homeLink.href = env == 'dev' ? '/' : host;
});
