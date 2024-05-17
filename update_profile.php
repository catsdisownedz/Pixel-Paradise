<?php
session_start();
include 'DatabaseConnection.php';

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $username=$_POST["username"];
    $email=$_POST["email"];
    $age=$_POST["age"];
    $password=$_POST["current_password"];

    $sql="INSERT INTO users(username, email, age, password) VALUES( ?, ?, ?, ?)";
    $stmt=mysqli_prepare($conn, $sql);
    $stmt->bind_param("ssis", $username, $email, $age, $password);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    $_SESSION["logged-in"]=true;
    $_SESSION["username"]=$username;
    header("Location: /Pixel-Paradise/index.php");
    exit();
}
