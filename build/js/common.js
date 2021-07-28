document.addEventListener('DOMContentLoaded', function() {
    //Верхная часть шапки
    const address = document.querySelector('.top__line-text__hover');
    const addressBtn = document.querySelector('.top__line-button__open');
    
    // шапка сайта
    const searchList = document.querySelector('.header-search__category .dropdown-menu');
    const searchBtn = document.querySelector('.header-search__open-category');

    //Табы
    const tabsHeader = document.querySelectorAll('.product-tabs__header-title');
    const tabsContent = document.querySelectorAll('.product-tabs__content-wrapper');




    // elem - элемент который нужно скрыть/отобразить
    // btn - кнопка (img) которой нужно задать действие при открытии
    // вложеность для кнопки например: <span><img src="arrow"></span>
    function toggleSelector(elem, btn) {
        if (elem.classList.contains('open-selector')) {
            elem.classList.remove('open-selector');
            btn.querySelector('img').style.transform = 'rotate(' + 0 + 'deg)';
        } else {
            elem.classList.add('open-selector');
            btn.querySelector('img').style.transform = 'rotate(' + 180 + 'deg)';
        }
    }


    //Модуль табов
    if (tabsHeader) {

        // Удаление класса из псевдомасива
        // array - колекция DOM елементов
        // selectro - имя класса для удаления
        function deactiveTabs( array, selector ) {
            array.forEach( function ( item ){
                item.classList.remove(selector);
            })
        }

        //Изменение табов по нажатию
        tabsHeader.forEach( function(item, i) {

            item.addEventListener('click', function() {

                deactiveTabs(tabsHeader, 'product-tabs__header-active')
                deactiveTabs(tabsContent, 'product-tabs__content-active')
                this.classList.add('product-tabs__header-active');
                tabsContent[i].classList.add('product-tabs__content-active')
                
            })
        })
    }
    



    //Открытие адерса в шапке
    addressBtn.addEventListener('click', function() {
        toggleSelector(address, addressBtn)
    })

    //Открытие категорий в поиске
    searchBtn.addEventListener('click', function() {
        toggleSelector(searchList, searchBtn)
    })
})