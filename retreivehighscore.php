<?php
    session_start();
    include 'DatabaseConnection.php';

    $sql=" SELECT users.username , HighScores.score FROM HighScores
            INNER JOIN users ON HighScores.UID= users.ID
            ORDER BY HighScores.score DESC
            LIMIT 3";

    $result= $conn->query($sql);
    
    $usernamesLeaderbaord= array();

    if($result){
        while($row =$result->fetch_assoc()){
            // echo "usrname:" .$row["username"]. "score:" .$row["score"]. "<br>";
            array_push($usernamesLeaderbaord,$row["username"]);
        }   
    }   
    else echo "nothing";
    // echo $usernamesLeaderbaord[0];
    // echo $usernamesLeaderbaord[1];
    // echo $usernamesLeaderbaord[2];

?> 