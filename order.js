// Отправка формы заказа
var formOrder = document.querySelector('.introduce__form');
var modalOrder = document.getElementById('myModal');

formOrder.addEventListener('submit', function(e) {
  e.preventDefault();
  
    var formData = {
      clientName: document.querySelector('input[name="clientName"]').value,
      clientPhone: document.querySelector('input[name="clientPhone"]').value,
      clientMail: document.querySelector('input[name="clientMail"]').value
    };
    
    var request = new XMLHttpRequest();
    request.open('POST', '/order.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('&clientName='  + encodeURIComponent(formData.clientName) + '&clientPhone='  + encodeURIComponent(formData.clientPhone) + '&clientMail='  + encodeURIComponent(formData.clientMail));
  });


