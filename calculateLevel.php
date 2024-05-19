<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


include "DatabaseConnection.php";

if(isset($_SESSION["username"])){
    $username = $_SESSION["username"];
    $total=0;
    $sql="SELECT ID FROM users WHERE username= ? LIMIT 1";
    $stmt=mysqli_prepare($conn, $sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $userID= $row["ID"];
    }
    $stmt->close();
    $sql="SELECT score FROM HighScores WHERE UID =?";
    $stmt=mysqli_prepare($conn, $sql);
    $stmt->bind_param("s",$userID);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_assoc()){
        $total+= $row["score"];
    }
    $stmt->close();
    if ($total < 1000) {
        echo "Lv. 1 Lazy Panda";
        return;
    } elseif ($total < 2000) {
        echo "Lv. 2 Grasshopper";
        return;
    } elseif ($total < 3000) {
        echo "Lv. 3 Dragon Warrior";
        return;
    } elseif ($total < 4000) {
        echo "Lv. 4 Mantis";
        return;
    } elseif ($total < 5000) {
        echo "Lv. 5 Viper";
        return;
    } elseif ($total < 6000) {
        echo "Lv. 6 Monkey";
        return;
    } elseif ($total < 7000) {
        echo "Lv. 7 Tigress";
        return;
    } elseif ($total < 8000) {
        echo "Lv. 8 Crane";
        return;
    } elseif ($total < 9000) {
        echo "Lv. 9 Po";
        return;
    } elseif ($total < 10000) {
        echo "Lv. 10 Shifu";
        return;
    } elseif ($total < 20000) {
        echo "Lv. 11 Master Oogway";
        return;
    } else {
        echo "Lv. 12 Dragon Warrior";
        return;
    }
}

else{
    echo "Lv. 1 Beginner";
}

/*const levels = [
  { name: "Lv. 1 Lazy Panda", threshold: 0 },
  { name: "Lv. 2 Grasshopper", threshold: 1000 },
  { name: "Lv. 3 Dragon Warrior", threshold: 2000 },
  { name: "Lv. 4 Mantis", threshold: 3000 },
  { name: "Lv. 5 Viper", threshold: 4000 },
  { name: "Lv. 6 Monkey", threshold: 5000 },
  { name: "Lv. 7 Tigress", threshold: 6000 },
  { name: "Lv. 8 Crane", threshold: 7000 },
  { name: "Lv. 9 Po", threshold: 8000 },
  { name: "Lv. 10 Shifu", threshold: 9000 },
  { name: "Lv. 11 Master Oogway", threshold: 10000 },
  { name: "Lv. 12 Dragon Warrior", threshold: 20000 },*/
