if (window.innerWidth <= 767) {
    // let priceView = false;

    const total = document.querySelector('.total');
    total.onclick = function (e) {
        total.querySelector('.benefit').classList.toggle('d-none');
        total
            .querySelectorAll('.bar p')
            .forEach((p) => p.classList.toggle('d-none'));
    };
}
