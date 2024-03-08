const customSelects = document.querySelectorAll('form .select-group');
const menus = document.querySelectorAll('form .select-group ul');

customSelects.forEach((select) => {
    select.onclick = function (e) {
        select.querySelector('ul').classList.toggle('active');
    };
});

menus.forEach((menu) => {
    menu.querySelectorAll('li').forEach((li) => {
        li.onclick = function (e) {
            const value = li.dataset.value;
            const displayTitle = li.textContent;
            const input = li
                .closest('.select-group')
                .querySelector('input[type="hidden"]');
            input.value = value;
            const placeholder = input
                .closest('.select-group')
                .querySelector('.core span');
            placeholder.textContent = displayTitle;
        };
    });
});

document.querySelector('form button').onclick = function (e) {
    e.preventDefault();
};

window.addEventListener('click', function (e) {
    if (e.target.id == 'root') {
        menus.forEach((menu) => menu.classList.remove('active'));
    }
});
