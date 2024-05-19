<?php
session_start();
include 'DatabaseConnection.php';
$_SESSION['usernameExist'] = false;
$_SESSION['emailExist'] = false;

if($_SERVER["REQUEST_METHOD"]=="POST"){
    $username=$_POST["username"];
    $email=$_POST["email"];
    $age=$_POST["age"];
    $password=$_POST["current_password"];

    $sqlUser="SELECT *
    FROM users
    WHERE username = ?";

    $stmtUser=mysqli_prepare($conn, $sqlUser);
    $stmtUser->bind_param("s", $username);
    $stmtUser->execute();
    $stmtUser->store_result();
    if($stmtUser->num_rows>0){
        $_SESSION['usernameExist'] = true;
        header("location:signUp.php");
        exit();
    }

    $_SESSION['usernameExist'] = false;


    $sqlEmail="SELECT *
    FROM users
    WHERE email = ?";

    $stmtEmail=mysqli_prepare($conn,  $sqlEmail);
    $stmtEmail->bind_param("s",  $email);
    $stmtEmail->execute();
    $stmtEmail->store_result();
    if($stmtEmail->num_rows>0){
        $_SESSION['emailExist'] = true;
        header("location:signUp.php");
        exit();
    }
    $_SESSION['emailExist'] = false;
    
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
