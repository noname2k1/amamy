document.addEventListener('DOMContentLoaded', (event) => {
    // const copy = document.querySelectorAll(
    //     '.content-container .content-wrapper ul li .top .left img'
    // );

    const list = document.querySelector(
        '.content-container .content-wrapper ul'
    );

    list.addEventListener('click', function (event) {
        const targetElement = event.target;
        const copyElement = targetElement.closest(
            '.content-container .content-wrapper ul li .top .left img'
        );

        if (copyElement) {
            const orderCode = copyElement
                .closest('.left')
                .querySelector('span').textContent;
            navigator.clipboard.writeText(orderCode);

            copyElement.nextElementSibling.style.display = 'block';
            copyElement.style.display = 'none';

            setTimeout(() => {
                copyElement.nextElementSibling.style.display = 'none';
                copyElement.style.display = 'block';
            }, 5000);
        }
    });
});

const dynamicMarginLeft = () => {
    if (window.innerWidth > 767) {
        document.querySelector('.main').style.marginLeft = `calc(${
            document.querySelector('.user').clientWidth + 'px'
        } + 2rem)`;
    } else {
        document.querySelector('.main').style.marginLeft = 'unset';
    }
};
dynamicMarginLeft();
window.addEventListener('resize', function () {
    dynamicMarginLeft();
});

const formatResult = (result = 0, currency = 'vnd') => {
    if (!result || result === 'undefined') {
        return '0'.toLocaleString('en-US').replace(/,/g, '.') + 'đ';
    }
    switch (currency) {
        case 'vnd':
            return (
                result.toString().toLocaleString('en-US').replace(/,/g, '.') +
                'đ'
            );

        case 'usd':
            return result
                .toString()
                .toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'usd'
                })
                .replaceAll('.', ',');

        case 'euro':
            return (
                result
                    .toString()
                    .toLocaleString('en-US', { maximumFractionDigits: 2 })
                    .replaceAll('.', ',') + ' EURO'
            );
    }
};

function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const obj = {};

    for (const [key, value] of params) {
        if (obj[key]) {
            if (Array.isArray(obj[key])) {
                obj[key].push(value);
            } else {
                obj[key] = [obj[key], value];
            }
        } else {
            obj[key] = value;
        }
    }

    return obj;
}

const searchParams = parseQueryString(location.search);

const paginationContainer = document.querySelector('#pagination-container');
const limit = 10;
let page = 1;
if (location.search) {
    const searchParams = parseQueryString(location.search);
    if (searchParams?.page) {
        page = searchParams.page;
    }
}
fetch(
    `https://amamy.net/wp-json/custom/v1/don_hang?page=${page}&per_page=${limit}`,
    {
        headers: {
            Authorization: 'Bearer ' + user.token
        }
    }
)
    .then((r) => r.json())
    .then((res) => {
        // console.log(res);
        const listWrapper = document.querySelector('.content-wrapper ul');
        const items = document.querySelectorAll('.content-wrapper ul li');
        if (!res.count) {
            items.forEach((item) => {
                item.style.visibility = 'hidden';
            });
            document.querySelector('.pagination').style.visibility = 'hidden';
        } else {
            if (res.count <= limit) {
                document.querySelector('.pagination').style.visibility =
                    'hidden';
            } else {
                const lastPage = Math.ceil(res.count / limit);
                paginationContainer.innerHTML = '';
                let paginationHtml = '';

                //render prev link
                paginationHtml += `
                        <a ${
                            parseInt(page) > 1
                                ? `href="?page=${parseInt(page) - 1}"`
                                : ''
                        }"><img src="./assets/svgs/prev.svg" alt=""></a>
                        `;

                if (page > lastPage - 2 && page <= lastPage) {
                    paginationHtml += `
                            <a href="?page=1" class="others">1</a>
                            <div class="etc">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            `;
                }

                for (let pageNumber = 1; pageNumber <= lastPage; pageNumber++) {
                    if (page == 1) {
                        paginationHtml += `
                        <a class="current-page" disabled>1</a>
                        <a href="?page=2" class="others">2</a>`;
                        break;
                    } else if (page == lastPage) {
                        paginationHtml += `
                        <a href="?page=${lastPage - 1}" class="others">${
                            lastPage - 1
                        }</a>
                        <a class="current-page" disabled>${lastPage}</a>`;
                        break;
                    } else {
                        paginationHtml += `
                        <a href="?page=${+page - 1}" class="others" >${
                            +page - 1
                        }</a>
                        <a class="current-page" disabled>${+page}</a>
                        <a href="?page=${+page + 1}" class="others">${
                            +page + 1
                        }</a>`;
                        break;
                    }
                }
                // paginationHtml += `
                //         <a href="?page=1" class="current-page">1</a>
                //         <a href="?page=2" class="others">2</a>
                //         <a href="?page=${lastPage}" class="others">${lastPage}</a>`;
                // render [...]
                if (lastPage > 3 && page <= lastPage - 2) {
                    paginationHtml += `
                        <div class="etc">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    `;
                }
                // render last page
                if (page < lastPage - 2) {
                    paginationHtml += `<a href="?page=${lastPage}" class="others">${lastPage}</a>`;
                }
                //render next link
                paginationHtml += `
                        <a ${
                            parseInt(page) < lastPage
                                ? `href="?page=${parseInt(page) + 1}"`
                                : ''
                        }">
                            <img src="./assets/svgs/next.svg" alt="">
                        </a>
                        `;

                paginationContainer.innerHTML = paginationHtml;
                paginationContainer.classList.remove('skeleton');
            }
            let html = '';
            res.item.forEach((item) => {
                html += `
                    <li>
                    <div class="top">
                        <div class="left">
                            <h3>Mã đơn hàng:</h3>
                            <span>#${item.ma_don}</span>
                            <img src="./assets/svgs/fi_copy.svg" alt="">
                            <img class="copied" src="./assets/svgs/check.svg" alt="">
                        </div>
                        <button>Tra cứu đơn</button>
                    </div>
                    <div class="middle">
                        <div class="title">
                            <h3>Người nhận</h3>
                            <h3>Địa chỉ nhận hàng</h3>
                            <h3>Trạng thái đơn hàng</h3>
                        </div>
                        <div class="value">
                            <span>${item.ten_nguoi_nhan}</span>
                            <span>${item.dia_chi_nguoi_nhan}</span>
                            <span class="highlight">${
                                item.trang_thai_don_hang
                            }</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <h3>Khối lượng:</h3>
                            <strong> ${
                                item.khoi_luong_don_hang
                                    ? item.khoi_luong_don_hang
                                    : '0kg'
                            }</strong>
                        </div>
                        <span class="total"><strong>${formatResult(
                            item.gia_don_hang,
                            item.loai_tien_te
                        )}</strong></span>
                    </div>
                </li>`;
            });
            listWrapper.innerHTML = html;
        }
    })
    .catch((err) => console.log(err));
