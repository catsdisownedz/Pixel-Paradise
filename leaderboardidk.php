<?php
include 'DatabaseConnection.php';

$leaderboardData = getTopScorers();

if ($leaderboardData) {
  //generaIatg html content is amazing
  //i am ded fr this needs some DEBUGGING
  $htmlContent = "<table>";
  $htmlContent .= "<thead>";
  $htmlContent .= "<tr><th>Rank</th><th>Username</th></tr>";
  $htmlContent .= "</thead>";
  $htmlContent .= "<tbody>";
  $rank = 1;
  foreach ($leaderboardData as $data) {
    $htmlContent .= "<tr>";
    $htmlContent .= "<td class='rank rank-$rank'><h2>#$rank</h2></td>";
    $htmlContent .= "<td>" . $data['username'] . "</td>";
    $htmlContent .= "</tr>";
    $rank++;
  }
  $htmlContent .= "</tbody>";
  $htmlContent .= "</table>";
  echo $htmlContent;
} else {
  echo "Error: Could not retrieve leaderboard data.";
}
?>
