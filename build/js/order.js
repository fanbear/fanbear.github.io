document.addEventListener('DOMContentLoaded', function () {

    const btnNext = document.querySelector('.next-order');
    const btnPrev = document.querySelector('.prev-order');
    const tabsHeader = document.querySelectorAll('.tabs__header-item');
    const tabsBody = document.querySelectorAll('.tabs__body-item')

    function CheckInput() {
        let triger = 1;
        const CurrentTabsInput = document.querySelectorAll('.tabs__body-item__active');

        CurrentTabsInput.forEach(tab => {
            const inputs = tab.querySelectorAll('input');

            inputs.forEach(item => {
                if (item.value == '') {
                    item.classList.add('order-danger');
                    triger = 0;
                } else {
                    item.classList.add('order-success');
                }
            })

        })
        return triger;
    }

    //Текущая позиция tabs__header-item
    function tabPosition(selector) {
        let count = 0;

        selector.forEach(function (item) {
            if (item.classList.contains('tabs__header-item__active')) {
                count += 1;
            }
        })
        return count;
    }

    //Следующий таб tabs__body-item
    function tabBodyChange(selector, position) {
        selector.forEach(function (item) {
            item.classList.remove('tabs__body-item__active');
        })
        selector[position].classList.add('tabs__body-item__active');
    }

    //Изменение формы в зависимости от нажатия на Дале или Назад
    function tabNextPrev(selector, position, active) {
        if (active == 'next') {
            selector[position].classList.add('tabs__header-item__active');
            selector[position - 1].querySelector('.tabs-item__arrow').style.display = 'none';
        }
        if (active == 'prev') {
            selector.forEach(item => item.classList.remove('tabs__header-item__active'));
            selector.forEach((item, i) => {
                if (i < position - 1) {
                    item.classList.add('tabs__header-item__active')
                }
            })
            tabBodyChange(tabsBody, position - 2);
            selector[position - 2].querySelector('.tabs-item__arrow').style.display = 'block';
        }
    }

    //Следующий шаг в оформлении
    btnNext.addEventListener('click', function () {

        CheckInput();

        if (CheckInput() != 0) {
            let position = tabPosition(tabsHeader);

            if (tabPosition(tabsHeader) < 3) {

                tabNextPrev(tabsHeader, position, 'next');
                tabBodyChange(tabsBody, position)
                btnPrev.style.display = "block";

                if (tabPosition(tabsHeader) == 3) {
                    btnNext.style.display = "none";
                    btnPrev.insertAdjacentHTML('afterend', `<button type="submit" class="flex-center order-form">Оформити</button>`);
                    document.querySelector('.form-action__general').style.display = "flex";
                }
            }
        }

    })

    //Возвращение на шаг назад
    btnPrev.addEventListener('click', function () {

        tabNextPrev(tabsHeader, tabPosition(tabsHeader), 'prev')

        if (tabPosition(tabsHeader) < 3) {
            btnNext.style.display = "flex";
            if (document.querySelector('.order-form')) {
                document.querySelector('.order-form').remove();
            }
            document.querySelector('.form-action__general').style.display = "none";
        }

        if (tabPosition(tabsHeader) == 1) {
            btnPrev.style.display = "none";
        }
    })


    //3 Таб, оформление заказа
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
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
        const basketAllProductSumm = document.querySelectorAll('.form-action__general-summ span');
        let result = [];

        productPriceColection.forEach(function (item) { result.push(item.textContent) })
        basketAllProductSumm.forEach(function (item) {
            item.textContent = result.reduce((prev, current) => Number(prev) + Number(current)).toFixed(2);
        })
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

    //Выбор оплаты, только один чекбокс
    //-------------------------------------------------------------------
    const payment = document.querySelector('.paument-detail__options');
    const checkboxs = payment.querySelectorAll('input')

    payment.addEventListener('click', function (e) {
        checkboxs.forEach(item => {
            if (item.checked) {
                item.checked = false;
            }
        })
        const target = e.target.closest('label')
        if (!target.querySelector('input').checked) {
            target.querySelector('input').checked = true;
        }
    })

})