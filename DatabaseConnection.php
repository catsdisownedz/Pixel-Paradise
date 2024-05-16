<?php
$host="trivia-game2.clsy2siwoygw.eu-north-1.rds.amazonaws.com";
$username="admin";
$password="yahood123";
$database="PixelParadise";
$conn=mysqli_connect($host,$username,$password,$database);

if(!$conn){
    die("Connection Failed". mysqli_connect_error());
}
echo "Connected Successfuly";
flush();
