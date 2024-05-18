<?php

$host = "trivia-game2.clsy2siwoygw.eu-north-1.rds.amazonaws.com";
$username = "admin";
$password = "yahood123";
$database = "PixelParadise";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
  die("Connection Failed: " . mysqli_connect_error());
}


// function getTopScorers() {
//     global $conn; 
  
//     $sql = "SELECT username, SUM(game1 + game2 + game3 + game4) AS total_score
//             FROM GameScores
//             GROUP BY username
//             ORDER BY total_score DESC
//             LIMIT 3;"; // limit to first 3
//     $stmt = mysqli_prepare($conn, $sql);
//     $stmt->execute();
//     $leaderboardData = [];
//     while ($row = mysqli_fetch_assoc($stmt)) {
//       $leaderboardData[] = $row;
//     }
//     mysqli_stmt_close($stmt); 
//     return $leaderboardData;
//   }
  

?>
