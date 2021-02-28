'use strict'

var cart = {};

document.addEventListener("DOMContentLoaded", ready);
function ready() {
    loadGoods();
    checkCart();
    cartCounter();
};

var addToCart;
var data;

function loadGoods() {
    // загружает товары на страницу из goods.json
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/goods.json');
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function () {
            if (xhr.status != 200) {
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
                data = xhr.response;
            }
            var output = '';
            for (var key in data) {
                output+='<div class=\"goods__item\"><div class=\"goods__image\"><img class=\"responsive\" src='+data[key]['image']+' alt=\"'+data[key]['description']+'\"></div><div class=\"goods__description\">'+data[key]['description']+'</div><div class=\"goods__price\">'+data[key]['price']+' ₽</div><button data-art=\"'+key+'\" class=\"goods__btn\">добавить в корзину</button></div>';
            }
            document.querySelector('.goods').innerHTML = output;

            var addBtns = document.querySelectorAll('.goods__btn');
            for(var i = 0; i < addBtns.length; i++) {
                addBtns[i].addEventListener('click', addToCart);
            }
        };
};

function addToCart() {
    // добавляет товар в корзину при нажатии на button
    var articul = this.getAttribute('data-art');
    if(cart[articul] != undefined) {
        cart[articul]++;
    } else {
        cart [articul] = 1;
    }
    localStorage.setItem( 'cart', JSON.stringify(cart) );
    cartCounter();
}

function checkCart() {
    // запоминает состояние корзины (проверка наличия в localStorage)
    if( localStorage.getItem('cart') != null ) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function cartCounter() {
    // счетчик количества товаров в корзине
    var output = '';
    var sum = 0;

    for(var key in cart) {
        sum+=cart[key];
        output = sum;
    }
    document.querySelector('.value-number').innerHTML = output;
}

( function showAddButton() {
    // состояние кнопки добавить в корзину
    var goodsItem = document.querySelector('.goods__item');
    if(!goodsItem) return setTimeout(showAddButton, 100);
        
    let goodsItems = document.querySelectorAll('.goods__item');
    let buttons = document.querySelectorAll('.goods__btn');
    let goodsImages = document.querySelectorAll('.goods__image');
        
    for (let i = 0; i < goodsItems.length; i++) {
        if (document.documentElement.clientWidth > 690) {
            goodsItems[i].addEventListener('mouseenter', function() {
                buttons[i].setAttribute('class', 'goods__btn btn--add');
                goodsImages[i].setAttribute('style', 'margin-bottom: 4px;');
            })
            goodsItems[i].addEventListener('mouseleave', function() {
                buttons[i].setAttribute('class', 'goods__btn');
                goodsImages[i].removeAttribute('style');
            })
        }
        
        buttons[i].addEventListener('click', function() {
            buttons[i].setAttribute('style', 'background-color: #00A82D;');
            if (buttons[i].innerHTML != 'в корзине') {
            buttons[i].innerHTML = 'в корзине';
            }
        })
    }
}() );
    