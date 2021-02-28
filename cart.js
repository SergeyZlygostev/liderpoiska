'use strict'

var cart = {};

document.addEventListener("DOMContentLoaded", ready);
function ready() {
    getJSON();
    checkCart();
    cartCounter();
};

function getJSON(data) {
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

        showCart ();

        function showCart () {
            var output = '';
            for (var key in cart) {
                output += '<div class=\"cart__item\">';
                output += '<div class=\"item__image\">';
                output += '<img class=\"responsive\" src=\"'+data[key]['image']+'\" alt=\"'+data[key]['description']+'\"></div>';
                output += '<div class=\"item__description\">'+data[key]['description']+'</div>';
                output += '<div class=\"controls\">';
                output += '<button class=\"minus-btn\" data-art=\"'+key+'\">-</button>';
                output += '<div class="controls__value\">'+cart[key]+'</div>';
                output +=  '<button class=\"plus-btn\" data-art=\"'+key+'\">+</button></div>';
                output +=  '<div class=\"item__price\">'+cart[key]*data[key]['price']+' ₽</div>';
                output +=  '<button class=\"item__delete\" data-art=\"'+key+'\">&#10006;<span>Удалить</span></button></div><div></div>';
            }
            document.querySelector('.cart__items').innerHTML = output;

            var minusButton = document.querySelectorAll('.minus-btn');
            var plusButton = document.querySelectorAll('.plus-btn');
            var deleteButton = document.querySelectorAll('.item__delete');
        
            for (let i = 0; i < minusButton.length; i++) {
                minusButton[i].addEventListener('click', minusGoods);
            }
            for (let i = 0; i < plusButton.length; i++) {
                plusButton[i].addEventListener('click', plusGoods);
            }
            for (let i = 0; i < deleteButton.length; i++) {
                deleteButton[i].addEventListener('click', deleteGoods);
            }
            

            // подсчет итоговой суммы товаров в корзине
                var allCost = document.querySelector('.all-cost');
                var itemPrices = document.querySelectorAll('.item__price');
                var sum = 0;
                for(var i = 0; i < itemPrices.length; i++) {
                    sum+=parseInt(itemPrices[i].innerHTML);
                }
                allCost.innerHTML = sum;
        }
    };
}

function minusGoods() {
    // минусуем товары в корзине
            var articul = this.getAttribute('data-art');
            if(cart[articul] > 1) {
                cart[articul]--; 
            }
            localStorage.setItem( 'cart', JSON.stringify(cart) );
            cartCounter();
            getJSON();
}

function plusGoods() {
    // плюсуем товары в корзине
            var articul = this.getAttribute('data-art');
            if(cart[articul] < 10) {
                cart[articul]++; 
            }
            localStorage.setItem( 'cart', JSON.stringify(cart) );
            cartCounter();
            getJSON();
}

function deleteGoods() {
    // удаляем товары из корзины
            var articul = this.getAttribute('data-art');
            delete cart[articul]; 
            localStorage.setItem( 'cart', JSON.stringify(cart) );
            cartCounter();
            getJSON();
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
        document.querySelector('.value-number').innerHTML = output;
    }
}

function ValidMail() {
    // проверка поля email
    var reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = document.getElementById('email');
    var valid = reg.test(myMail.value);
    var output;
    if (valid) {
        orderConfirm();
        myMail.style.border = 'none';
        output = '';
    } else {
        myMail.style.border = '1px solid red';
        output = 'Поле заполнено неверно';
    }
    document.querySelector('.message').innerHTML = output;
    return valid;
}

function setCursor(pos, elem) {
    // Маска телефона
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}
    function mask(event) {
    var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
        if (this.value.length == 2) this.value = ""
    } else setCursor(this.value.length, this)
};
var input = document.querySelector('input[name="clientPhone"]');
input.addEventListener("input", mask, false);
input.addEventListener("focus", mask, false);
input.addEventListener("blur", mask, false);
 

function orderConfirm() {
    // Модалка заказ
    var myModal = document.getElementById('myModal');
    var btnOrder = document.querySelector('.send-form');
    var spanOrder = document.querySelector('.close-btn');

    btnOrder.onclick = function() {
        myModal.style.display = "flex";
        myModal.style.justifyContent = "center";
        myModal.style.alignItems = "center";
    }
    spanOrder.onclick = function() {
        myModal.style.display = "none";
    }

    var form = document.forms[0];
    var clientNameInput = form.querySelector('input[name="clientName"]').value;
    var clientPhoneInput = form.querySelector('input[name="clientPhone"]').value;

    var clientPhoneOutput = document.querySelector('.clientPhone');
    var clientNameOutput = document.querySelector('.clientName');
    var p1 = clientNameInput;
    clientNameOutput.innerHTML = p1;
    var p2 = clientPhoneInput;
    clientPhoneOutput.innerHTML = p2;
}

