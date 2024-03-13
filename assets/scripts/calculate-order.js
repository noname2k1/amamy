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

const defaultDiscountPecentage = 0; // khách
// const defaultDiscountPecentage = 1.5; // newbie
// const defaultDiscountPecentage = 3; // copper
// const defaultDiscountPecentage = 4; // silver
// const defaultDiscountPecentage = 5; // gold

const formatResult = (result, currency) => {
    switch (currency) {
        case 'vnd':
            return result.toLocaleString('en-US').replace(/,/g, '.') + ' VND';

        case 'usd':
            return result
                .toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'usd'
                })
                .replaceAll('.', ',');

        case 'euro':
            return (
                result
                    .toLocaleString('en-US', { maximumFractionDigits: 2 })
                    .replaceAll('.', ',') + ' EURO'
            );
    }
};

const calculateOrder = (from, to, currency, weight, discountPecentage = 0) => {
    const FEES = [
        {
            from: 'vi',
            to: {
                en: {
                    default: {
                        vnd: 240000,
                        usd: 10,
                        euro: 9.23
                    },
                    vnd: 276000,
                    usd: 11.5,
                    euro: 10.62
                },
                vi: {
                    default: {
                        vnd: 240000,
                        usd: 10,
                        euro: 9.23
                    },
                    vnd: 144000,
                    usd: 6,
                    euro: 5.54
                }
            }
        },
        {
            from: 'ger',
            to: {
                vi: {
                    default: {
                        vnd: 0,
                        usd: 0,
                        euro: 0
                    },
                    vnd: 252000,
                    usd: 10.5,
                    euro: 9.69
                },
                en: {
                    default: {
                        vnd: 240000,
                        usd: 10,
                        euro: 9.23
                    },
                    vnd: 24000,
                    usd: 1,
                    euro: 1.02
                }
            }
        }
    ];
    const myFee = FEES.find((fee) => fee.from === from);
    const sum =
        myFee.to[to].default[currency] + myFee.to[to][currency] * weight;
    const discount = sum * (discountPecentage / 100);

    return {
        sum: formatResult(sum, inputCurrency.value),
        discount: formatResult(discount, inputCurrency.value),
        total: formatResult(sum - discount, inputCurrency.value)
    };
};

const inputFrom = document.querySelector("form input[name='from']");
const inputTo = document.querySelector("form input[name='to']");
const inputCurrency = document.querySelector("form input[name='currency']");
const inputWeight = document.querySelector("form input[name='weight']");

const oldPrice = document.querySelectorAll('span.old-price');
const price = document.querySelectorAll('span.price');
const benefit = document.querySelector('.benefit.large');
const benefitNoti = document.querySelectorAll('.benefit-noti');

const exec = () => {
    if (
        inputFrom.value &&
        inputTo.value &&
        inputCurrency.value &&
        inputWeight.value
    ) {
        const result = calculateOrder(
            inputFrom.value,
            inputTo.value,
            inputCurrency.value,
            inputWeight.value,
            defaultDiscountPecentage
        );

        oldPrice.forEach((el) => {
            el.textContent = result.sum;
        });
        price.forEach((el) => {
            el.textContent = result.total;
        });
        if (defaultDiscountPecentage) {
            benefit.style.display = 'flex';
            document.querySelectorAll('.discount').forEach((el) => {
                el.textContent = result.discount;
            });
            document.querySelectorAll('.discount-percentage').forEach((el) => {
                el.textContent = defaultDiscountPecentage;
            });
            document.querySelector('.total .benefit').style.display = 'flex';
        } else {
            oldPrice.forEach((el) => {
                el.style.display = 'none';
            });
        }
    }
};

inputFrom.addEventListener('change', exec);
inputTo.addEventListener('change', exec);
inputCurrency.addEventListener('change', exec);
inputWeight.addEventListener('change', exec);
