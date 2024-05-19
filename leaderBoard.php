<?php
    session_Start();
    if($_SERVER["REQUEST_METHOD"]=="POST"){
        $data=file_get_contents("php://input");
        $gameName=json_decode($data,true);
        // echo "koko";
        if (isset($gameName['game'])) {
            $_SESSION["game"] = $gameName['game'];
            // echo json_encode(["status" => "success", "game" => $gameName['game']]);
        } 
        // else {
        //     echo json_encode(["status" => "error", "message" => "Invalid game data"]);
        // }
    }
    include 'retreivehighscore.php';
    //unset($_SESSION['game']);
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Website Leaderboard</title>
    <link rel="stylesheet" href="leaderBoard_style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Jacquarda+Bastarda+9&family=Micro+5&family=Ojuju:wght@200..800&family=Satisfy&family=Whisper&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia" />
  <link rel="stylesheet" href="https://fonts.google.com/specimen/Dancing+Script" />
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Sofia&effect=neon|outline|emboss|shadow-multiple" />
    <link href="https://fonts.googleapis.com/css2?family=Jersey+25+Charted&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Jersey+25+Charted&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">

</head>
<body>
    <h1>Our best players!</h1>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Scores</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="rank rank-1"><h2>#1</h2></td>
                <td>
                    <?php  include_once 'retreivehighscore.php';
                    echo $usernamesLeaderbaord[0] ?>
                </td>
                <td>
                    <?php echo $scoreLeaderBoard[0] ?>
                </td>
            </tr>
            <tr>
                <td class="rank rank-2"><h2>#2</h2></td>
                <td> <?php 
                         echo $usernamesLeaderbaord[1] 
                    ?><
                    /td>
                <td>
                    <?php echo $scoreLeaderBoard[1] ?>
                </td>
            </tr>
            <tr>
                <td class="rank rank-3"><h2>#3</h2></td>
                <td> <?php echo $usernamesLeaderbaord[2] ?></td>
                <td>
                    <?php echo $scoreLeaderBoard[2] ?>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>


