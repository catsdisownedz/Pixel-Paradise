<?php
session_start();
include("DatabaseConnection.php");
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data["score"]) && isset($data["game"])) {
        $score = $data["score"];
        $game = $data["game"];
        $username = isset($_SESSION["username"]) ? $_SESSION["username"] : "guest123";
        echo "hellooooo";
        echo "Username: " . $username;
        $id;
        if (isset($_SESSION["username"])) {
            $sql = "SELECT ID FROM users WHERE USERNAME= ? LIMIT 1";
            $stmt = mysqli_prepare($conn, $sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $id = $row['ID'];
            $stmt->close();
        } else {
            $id = 1;
        }
        $sql = "INSERT INTO HighScores (game, score, UID) VALUES (?, ?, ?)";
        $stmt2 = mysqli_prepare($conn, $sql);
        $stmt2->bind_param("sii", $game, $score, $id);
        if ($stmt2->execute()) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
        }
        $stmt2->close();
    }
}
$conn->close();
?>