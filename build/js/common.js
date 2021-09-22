'use strict';

document.addEventListener('DOMContentLoaded', function () {

    //Верхная часть шапки
    //-----------------------------------------------------------------------
    const address = document.querySelector('.top__line-text__hover');
    const addressBtn = document.querySelector('.top__line-button__open');

    // Шапка сайта
    //------------------------------------------------------------------------
    const searchList = document.querySelector('.header-search__category .dropdown-menu');
    const searchBtn = document.querySelector('.header-search__open-category');
    const basketBtn = document.querySelector('.header-shop__basket');
    const basketPopUpWrapper = document.querySelector('.header-shop__basket-wrapper');

    //Табы
    //------------------------------------------------------------------------
    const tabsHeader = document.querySelectorAll('.product-tabs__header-title');
    const tabsContent = document.querySelectorAll('.product-tabs__content-wrapper');

    //Фильтр открытие и скрытие
    //------------------------------------------------------------------------
    const filterBtnOpen = document.querySelector('.category-sort__filter');
    const filterBtnClose = document.querySelector('.filter-module__header-close');
    const filter = document.querySelector('.modules');

    //Сортировка в категориях
    //------------------------------------------------------------------------
    const sortBtn = document.querySelector('.category-sort__arrow');
    const sortList = document.querySelector('.category-sort__list');


    //Меню сайта
    //------------------------------------------------------------------------
    const nav = document.querySelector('.menu-nav');
    const navBtnPC = nav.querySelector('.menu-nav__title i');
    const navMainList = nav.querySelector('.menu-nav__list');
    const navMobBtn = document.querySelector('.mobile-menu');
    const navTabMenu = document.querySelector('.table-menu');

    function addMobMenuCloseBtn(selector) {

        if (!navMainList.querySelector('.nav-menu__close-mobile')) {
            navMainList.insertAdjacentHTML('afterbegin', `<div class="nav-menu__close-mobile hide-desktop flex-center"><i class="fas fa-times"></i></div>`);
        }
        const closeMobileMenu = document.querySelector('.menu-nav__list-active');

        closeMobileMenu.addEventListener('click', function (e) {

            if (e.target.closest(selector)) {
                document.querySelector('.menu').style.display = 'none';
                document.querySelector('.menu-nav').style.display = 'none';
                document.querySelector('.menu-list').style.display = 'flex'
                navMainList.classList.remove('menu-nav__list-active');
            }
        })


    }

    //Основное меню
    //------------------------------------------------------------------------
    //Открытие основного меню по клику
    //------------------------------------------------------------------------
    if (navBtnPC) {

        const homeBanner = document.querySelector('.home-banner ');

        if (homeBanner) {
            navMainList.classList.add('menu-nav__list-active');
        }

        navBtnPC.addEventListener('click', function () {
            navMainList.classList.toggle('menu-nav__list-active');

        })
    }

    //Закрыть все активные подменю и убрать фон у елемента li в основном меню
    //------------------------------------------------------------------------
    function closeAllSubmenu(current = null) {
        const navList = document.querySelectorAll('.menu-nav__list ul');
        let parents = [];

        if (current) {
            let parentNode = current.parentNode

            while (parentNode) {
                if (parentNode.classList.contains('menu-nav__list')) {
                    break;
                }
                if (parentNode.nodeName === 'UL') {
                    parents.push(parentNode)
                }
                parentNode = parentNode.parentNode;
            }
        }

        Array.from(navList).forEach(item => {
            if (item != current && !parents.includes(item)) {
                item.classList.remove('submenu-active');
                item.classList.remove('submenu-open');
                item.parentNode.classList.remove('submenu-open');

            }
        })
    }

    //открыть подменю
    //добавить класс елементу li (li->backgorund)
    //------------------------------------------------------------------------
    function openAllSubmenu(el, selector) {
        if (!el.classList.contains('no-submenu')) {
            el.classList.toggle('submenu-open');
        }

        if (el.querySelector('ul')) {
            el.querySelector('ul').classList.toggle(selector)
        }


    }

    if (navMainList) {
        navMainList.addEventListener('click', function (e) {

            const submenu = e.target.closest('li');

            if (submenu && e.target.tagName.toLowerCase() !== 'a') {
                closeAllSubmenu(submenu.querySelector('ul'));
                openAllSubmenu(submenu, 'submenu-active');
            }
        })
    }

    // elem - элемент который нужно скрыть/отобразить
    // btn - кнопка (img) которой нужно задать действие при открытии
    // вложеность для кнопки например: <span><img src="arrow"></span>
    //------------------------------------------------------------------------
    function toggleSelector(elem, btn) {
        if (elem.classList.contains('open-selector')) {
            elem.classList.remove('open-selector');
            btn.querySelector('img').style.transform = 'rotate(' + 0 + 'deg)';
        } else {
            elem.classList.add('open-selector');
            btn.querySelector('img').style.transform = 'rotate(' + 180 + 'deg)';
        }
    }


    //Функция изменения позиции меню и фильтра
    //selector = doc.qS('selector')
    //active = 'active-menu / active-filter'
    //Открыть
    //------------------------------------------------------------------------
    function openHideElement(selector) {
        return (active) => selector.classList.add(active);
    }


    //Закрыть
    //------------------------------------------------------------------------
    function closeHideElement(selector) {
        return (active) => selector.classList.remove(active);
    }

    //Меню моб версия
    //------------------------------------------------------------------------
    navMobBtn.addEventListener('click', function () {
        document.querySelector('.menu').style.display = 'block';
        document.querySelector('.menu-nav').style.display = 'block';
        document.querySelector('.menu-list').style.display = 'none'
        navMainList.classList.add('menu-nav__list-active');
        addMobMenuCloseBtn('.nav-menu__close-mobile');
    })
    navTabMenu.addEventListener('click', function () {
        document.querySelector('.menu').style.display = 'block';
        document.querySelector('.menu-nav').style.display = 'block';
        document.querySelector('.menu-list').style.display = 'none'
        navMainList.classList.add('menu-nav__list-active');
        addMobMenuCloseBtn('.nav-menu__close-mobile');
    })


    //************************* */ 
    //**** */   События  //**** */
    //************************* */

    //Открытие адерса в шапке
    //--------------------------------------------------------------
    if (addressBtn) {
        addressBtn.addEventListener('click', function () {
            toggleSelector(address, addressBtn)
        })
    }


    //Открытие всплывающей корзины
    //--------------------------------------------------------------
    if (basketBtn) {
        basketBtn.addEventListener('click', function (e) {

            if (e.target.nodeName == 'I') {
                basketPopUpWrapper.classList.toggle('basket-wrapper__active');
            }
        })
    }


    //Открытие категорий в поиске
    //--------------------------------------------------------------
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            toggleSelector(searchList, searchBtn)
        })
    }


    //Открытие фильтра для моб и пк версии
    //--------------------------------------------------------------
    if (filterBtnOpen) {
        filterBtnOpen.addEventListener('click', function () {
            openHideElement(filter)('open-filter');
        })
    }
    if (filterBtnClose) {
        filterBtnClose.addEventListener('click', function () {
            closeHideElement(filter)('open-filter')
        })
    }


    //Сортировка в категориях
    //-------------------------------------------------------------
    if (window.innerWidth < 478 && sortBtn) {
        sortBtn.addEventListener('click', function () {
            sortList.classList.toggle('category-sort__list-active');
            this.style.marginLeft = 'auto'
        })

    }


    //Модуль табов  на главной
    //-------------------------------------------------------------
    if (tabsHeader) {

        // Удаление класса из псевдомасива
        // array - колекция DOM елементов
        // selectro - имя класса для удаления
        function deactiveTabs(array, selector) {
            array.forEach(function (item) {
                item.classList.remove(selector);
            })
        }

        //Изменение табов по нажатию
        tabsHeader.forEach(function (item, i) {

            item.addEventListener('click', function () {

                deactiveTabs(tabsHeader, 'product-tabs__header-active')
                deactiveTabs(tabsContent, 'product-tabs__content-active')
                this.classList.add('product-tabs__header-active');
                tabsContent[i].classList.add('product-tabs__content-active')

            })
        })
    }

})