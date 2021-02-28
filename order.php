<?php 

    $clientName = $_POST['clientName'];
    $clientPhone = $_POST['clientPhone'];
    $clientMail = $_POST['clientMail'];

    $to = '......';
    $subject = 'Тестовое задание, заказ №';
    $message = "заказ № сформирован. В ближайшее время наш специалист свяжется с вами по телефону";
    $headers = "From: $clientName" . "\r\n";

    mail($to, $subject, $message, $headers); 
?>