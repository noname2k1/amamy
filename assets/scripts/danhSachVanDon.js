const copy = document.querySelectorAll(
    '.content-container .content-wrapper ul li .top .left img'
);

copy.forEach((el) => {
    el.addEventListener('click', function (e) {
        // Copy the text
        const orderCode = el.closest('.left').querySelector('span').textContent;
        navigator.clipboard.writeText(orderCode);

        el.nextElementSibling.style.display = 'block';
        el.style.display = 'none';

        setTimeout(() => {
            el.nextElementSibling.style.display = 'none';
            el.style.display = 'block';
        }, 5000);
    });
});
