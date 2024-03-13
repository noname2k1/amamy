// home link change
const env = 'prod';
const host = '/amamy';
// console.log(location);
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector(
        'header .logo a, .main-content a.come-back.mobile'
    ).href = env == 'dev' ? '/' : host;
});
