// home link change
const host = 'amamy';
console.log(location);
document.querySelector('header .logo a').href = location.origin + '/' + host;
