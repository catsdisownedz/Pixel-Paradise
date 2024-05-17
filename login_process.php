<?php

session_start();
include 'DatabaseConnection.php';
// Get form data
$username = $_POST["username"];
$password = $_POST["password"];

// Start the session

$sql = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}
?>
