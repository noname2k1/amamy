// home link change
const env = 'prod';
const host = '/amamy';
// console.log(location);
window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('header .logo a').href = env == 'dev' ? '/' : host;
});
