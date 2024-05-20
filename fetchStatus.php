<?php
session_start();
if (isset($_SESSION["logged-in"])) {
    echo $_SESSION["logged-in"];
} else {
    echo "false";
}
