<?php
    session_start();
    include 'DatabaseConnection.php';

    
    $usernamesLeaderbaord= array();
     $scoreLeaderBoard= array();
   
    if (!isset($_SESSION['game'])){
        $sql=" SELECT users.username , HighScores.score FROM HighScores
            INNER JOIN users ON HighScores.UID= users.ID
            ORDER BY HighScores.score DESC
            LIMIT 3";
            
        $result= $conn->query($sql);

        // echo "ezyk 3amel eh";

        if($result){
        while($row =$result->fetch_assoc()){
            // echo "usrname:" .$row["username"]. "score:" .$row["score"]. "<br>";
            array_push($usernamesLeaderbaord,$row["username"]);
            array_push($scoreLeaderBoard,$row["score"]);
            }   
        }   
        // else echo "nothing";
    }
    
    else {
        $sql2 = "SELECT users.username, HighScores.score FROM HighScores
                 INNER JOIN users ON HighScores.UID = users.ID  
                 WHERE HighScores.game=?
                 ORDER BY HighScores.score DESC
                 LIMIT 3";
    
        $stmt = mysqli_prepare($conn, $sql2);
        mysqli_stmt_bind_param($stmt, "s", $_SESSION["game"]);
    
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_bind_result($stmt, $username, $score);
            while (mysqli_stmt_fetch($stmt)) {
                array_push($usernamesLeaderbaord, $username);
                array_push($scoreLeaderBoard, $score);
            }
            mysqli_stmt_close($stmt);
        }
        //  else {
        //    // echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
        // }
    
        // echo "yalhwy 3lya ";

        
    }
    

    /* else{
        $sql2=" SELECT users.username , HighScores.score FROM HighScores
        INNER JOIN users ON HighScores.UID= users.ID  
        WHERE HighScores.game=?
        ORDER BY HighScores.score DESC
        LIMIT 3";

        // $usernamesLeaderbaordGame= array();
        // $scoreLeaderBoardGame= array();
        
        $stmt=mysqli_prepare($conn,$sql2);
        $stmt->bind_param("s", $_SESSION["game"]);
        if($stmt->execute()){
            while($row=$stmt->fetch_assoc()){
                array_push($usernamesLeaderbaord,$row["username"]);
                array_push($scoreLeaderBoard,$row["score"]);
            }
            $stmt->close();
        }
        else{
            echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
        }

        echo "yalhwy 3lya ";
    }*/
       
      
?> 
