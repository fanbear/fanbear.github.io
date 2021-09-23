document.addEventListener('DOMContentLoaded', function () {
    const basketBody = document.querySelector('.form-body');
    const allProductItem = document.querySelectorAll('.form-body__item');

    function productItemSumm() {
        //Сумма для каждого товара в корзине отдельно
        allProductItem.forEach(function (item) {
            const price = Number(item.querySelector('.form-body__item-price').lastElementChild.textContent.replace('₴', ''));
            const input = Number(item.querySelector('.form-body__column-value input').value);
            const summ = item.querySelector('.basket-summ');

            summ.textContent = (price * input).toFixed(2);
        })
        //Общая сума всех товаров в корзине
        const productPriceColection = document.querySelectorAll('.basket-summ');
        const basketAllProductSumm = document.querySelector('.form-action__general-summ span');
        let result = [];

        productPriceColection.forEach(function (item) { result.push(item.textContent) })
        basketAllProductSumm.textContent = result.reduce((prev, current) => Number(prev) + Number(current)).toFixed(2);
    }

    basketBody.addEventListener('click', function (e) {
        const target = e.target.closest('.form-body__btn-count');

        if (e.target === target) {
            const input = target.parentNode.querySelector('input');

            if (target.textContent === '-' && input.value > 1) {
                input.value = Number(input.value) - 1;
                productItemSumm();
            } else if (target.textContent === '+') {
                input.value = 1 + Number(input.value);
                productItemSumm();
            }
        }
    })

    productItemSumm();
})

