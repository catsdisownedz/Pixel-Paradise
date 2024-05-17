<?php
// Start the session
session_start();
include 'DatabaseConnection.php';


// Unset all of the session variables
session_unset();

// Destroy the session
session_destroy();

// Send a success status
echo json_encode(["status" => "success"]);
?>
