<?php
// Get form data
$username = $_POST["username"];
$password = $_POST["password"];

// Connect to your database
$db = new PDO("mysql:host=localhost;dbname=yourdbname", "username", "password");

// Query the database
$stmt = $db->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password]);

// Check if the credentials are correct
if ($stmt->rowCount() > 0) {
  echo json_encode(["status" => "success"]);
} else {
  echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}
?>
