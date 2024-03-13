// home link change
const env = 'prod';
const host = '/amamy';
// console.log(location);
document.querySelector('header .logo a').href =
    '/' + (env == 'dev' ? '' : host);
