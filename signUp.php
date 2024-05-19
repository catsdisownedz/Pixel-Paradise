<?php session_start();?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="passwordValidation.js"></script>
  <title>Edit Profile</title>
  <link rel="stylesheet" href="signUp_style.css">
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
  <h1>Edit Profile</h1>
  <form action="update_profile.php" method="post"> <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" name="username" id="username" required>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" name="email" id="email" required>
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input type="number" name="age" id="age" min="13"> </div>
    <div class="form-group">
      <label for="current_password">Current Password:</label>
      <input type="password" name="current_password" id="current_password" 
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
      required>
      <small>Required to update profile information.</small>
    </div>
    <div class="form-group">
      <label for="new_password">New Password (Optional):</label>
      <input type="password" name="new_password" id="new_password">
      <small>Leave blank if you don't want to change your password.</small>
    </div>
    <div class="form-group">

      <button type="submit" > Update Profile </button>
      
    </div>
  </form>
  <?php if(isset($_SESSION['usernameExist']) && $_SESSION['usernameExist']): ?>
  <label>Username exists</label>
<?php endif; ?>

<?php if(isset($_SESSION['emailExist']) && $_SESSION['emailExist']): ?>
  <label>emaill exists</label>
<?php endif; ?>
</body>
</html>
