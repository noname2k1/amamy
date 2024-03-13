// home link change
const env = 'dev';
const host = '/amamy';
// console.log(location);

window.addEventListener('DOMContentLoaded', function () {
    const homeLinks = document.querySelectorAll(
        'header .logo a, .main-section a.come-back.mobile'
    );
    homeLinks.forEach((link) => {
        link.href = env == 'dev' ? '/' : host;
    });
});
