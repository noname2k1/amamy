const customSelects = document.querySelectorAll('form .select-group');
const menus = document.querySelectorAll('form .select-group .list-wrapper');

customSelects.forEach((select) => {
    select.onclick = function (e) {
        customSelects.forEach((element) => {
            // console.log(element);
            if (element !== select) {
                element.querySelector('.core').style.zIndex = 1;
                element
                    .querySelector('.list-wrapper')
                    ?.classList.remove('active');
            }
        });
        if (
            !select.querySelector('.core > img').style.transform ||
            select.querySelector('.core > img').style.transform === 'scaleY(1)'
        ) {
            select.querySelector('.core > img').style.transform = 'scaleY(-1)';
        } else {
            select.querySelector('.core > img').style.transform = 'scaleY(1)';
        }
        select.querySelector('.core').style.zIndex = 15;
        select.querySelector('.list-wrapper').classList.toggle('active');
    };
});

document.querySelector('.weight-wrapper').onclick = function () {
    customSelects.forEach((element) => {
        // console.log(element);
        element.querySelector('.core').style.zIndex = 1;
        element.querySelector('.list-wrapper')?.classList.remove('active');
    });
};

menus.forEach((menu) => {
    menu.querySelectorAll('li').forEach((li) => {
        li.onclick = function (e) {
            const value = li.dataset.value;
            const content = li.innerHTML;
            const input = li
                .closest('.select-group')
                .querySelector('input[type="hidden"]');
            input.value = value;
            const event = new Event('change');
            input.dispatchEvent(event);
            const placeholder = input
                .closest('.select-group')
                .querySelector('.core span');
            if (input.name === 'currency') {
                placeholder.innerHTML = `<span class="color">${content}</span>`;
            } else placeholder.innerHTML = content;
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
