'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const $days = document.querySelector('.wrapper-item__days');
    const $hours = document.querySelector('.wrapper-item__hours');
    const $minuts = document.querySelector('.wrapper-item__minuts');
    const $seconds = document.querySelector('.wrapper-item__seconds');
    const $timerWrapper = document.querySelector('.discont-timer__wrapper');

    const lastDate = document.querySelector('.last-day').textContent.split('.').reverse().join('-');
    const firstDate = document.querySelector('.first-day').textContent.split('.').reverse().join('-');

    // Таймер акции
    //---------------------------------------------------------------------------
    if (Date.parse(new Date()) < Date.parse(firstDate)) {
        document.querySelector('.timer-wrapper__text').remove();
        $timerWrapper.innerHTML = '<div class="timer-wrapper_end">Акцiя ще не почалась</div>';
    }

    function getTimeRemaining(lastDate) {
        const time = Date.parse(lastDate) - Date.parse(Date.parse(new Date()) < Date.parse(firstDate) ? null : new Date());
        const day = Math.floor(time / (1000 * 60 * 60) / 24);
        const hour = Math.floor(time / (1000 * 60 * 60) % 24);
        const minut = Math.floor(time / (1000 * 60) % 60);
        const second = Math.floor((time / 1000) % 60);

        return {
            day,
            hour,
            minut,
            second
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    updateTimer();

    function updateTimer() {
        const timer = getTimeRemaining(lastDate);

        if (timer.day < 0) {
            const $timerWrapper = document.querySelector('.discont-timer__wrapper');
            document.querySelector('.timer-wrapper__text').remove();
            $timerWrapper.innerHTML = '<div class="timer-wrapper_end">Акцiя вже закiнчiлась</div>';
            clearInterval(timerInterval);
        }

        $days.textContent = timer.day < 10 ? '0' + timer.day : timer.day;
        $hours.textContent = timer.hour < 10 ? '0' + timer.hour : timer.hour;
        $minuts.textContent = timer.minut < 10 ? '0' + timer.minut : timer.minut;
        $seconds.textContent = timer.second < 10 ? '0' + timer.second : timer.second;
    }


    //Табы описания товара, отзывов, характеристик
    //------------------------------------------------------------------------------
    const headerTabs = document.querySelector('.product-info__header');
    const bodyTabs = document.querySelector('.product-info__body');

    if (headerTabs) {
        headerTabs.addEventListener('click', (e) => {
            const target = e.target.closest('.product-info__header-item');
            const list = headerTabs.querySelectorAll('.product-info__header-item');


            list.forEach(item => {
                item.classList.remove('header-item__active')
            });
            target.classList.add('header-item__active');

            const active = Array.from(headerTabs.querySelectorAll('.product-info__header-item')).indexOf(target)

            const body = Array.from(bodyTabs.querySelectorAll('.product-info__body-item'));
            body.forEach(item => {
                item.classList.remove('body-item__active')
            })
            body[active].classList.add('body-item__active')

        })
    }

})