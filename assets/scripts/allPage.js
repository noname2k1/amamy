// home link change
env = 'dev';
host = '/amamy';
// console.log(location);

window.addEventListener('DOMContentLoaded', function () {
    const homeLinks = document.querySelectorAll(
        'header .logo a, .main-section a.come-back.mobile'
    );
    homeLinks.forEach((link) => {
        link.href = env == 'dev' ? '/' : host;
    });
});
