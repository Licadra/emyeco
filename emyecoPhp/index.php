<?php
// define variables and set to empty values
$firstnameErr = $usernameErr = $emailErr = $passwordErr = $confirmpasswordErr = $addressErr = $cityErr = "";
$firstname = $username = $email = $password =  $confirmpassword = $address = $city =  "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["firstname"])) {
    $firstnameErr = "first name is required";
  } else {
    $firstname = test_input($_POST["firstname"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$firstname)) {
      $firstnameErr = "Only letters and white space allowed";
    }
  }

  if (empty($_POST["username"])) {
    $usernameErr = "username is required";
  } else {
    $username = test_input($_POST["username"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$username)) {
      $usernameErr = "Only letters and white space allowed";
    }
  }
  
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }

  if (empty($_POST["password"])) {
    $passwordErr = "password is required";
  } else {
    $password = test_input($_POST["password"]);
   
  }

  if (empty($_POST["confirmpassword"])) {
    $confirmpasswordErr = "confirm password is required";
  } else {
    $confirmpassword = test_input($_POST["confirmpassword"]);
    // check if name only contains letters and whitespace
    if (!preg_match($confirmpassword,$password)) {
      $confirmpasswordErr = "Password do not match!";
    }
  }

  if (empty($_POST["address"])) {
    $addressErr = "address is required";
  } else {
    $address = test_input($_POST["address"]);    
  }

  if (empty($_POST["city"])) {
    $cityErr = "city is required";
  } else {
    $city = test_input($_POST["city"]);
    
  }
    
  
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>


<?php
$myfile = fopen("registerFile.txt", "w") or die("Unable to open file!");

$txt =$email . "\n";
fwrite($myfile, $txt);
$txt =$password  ."\n";
fwrite($myfile, $txt);
$txt =$firstname . "\n";
fwrite($myfile, $txt);
$txt =$username . "\n";
fwrite($myfile, $txt);
$txt =$address . "\n";
fwrite($myfile, $txt);
$txt =$city . "\n";
fwrite($myfile, $txt);

fclose($myfile);
?>




<!DOCTYPE HTML>  
<html>
<head>
<style>
.error {color: #FF0000;}
</style>
</head>
<body>

<h2>PHP Form Validation Example</h2>
<p><span class="error">* required field.</span></p>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
          
          First Name: <input type="text" name="firstname" value="<?php echo $firstname;?>">
          <span class="error">* <?php echo $firstnameErr;?></span> 
          <br><br>
          Username: <input type="text" name="username" value="<?php echo $username;?>">   
          <span class="error">* <?php echo $usernameErr;?></span>
          <br><br>
          E-mail: <input type="text" name="email" value="<?php echo $email;?>">   
          <span class="error">* <?php echo $emailErr;?></span>
          <br><br>
          Password: <input type="text" name="password" value="<?php echo $password;?>">   
          <span class="error">* <?php echo $passwordErr;?></span>
          <br><br>
          Confirm password: <input type="text" name="confirmpassword" value="<?php echo $confirmpassword;?>">   
          <span class="error">* <?php echo $confirmpasswordErr;?></span>
          <br><br>
          Address: <input type="text" name="address" value="<?php echo $address;?>">   
          <span class="error">* <?php echo $addressErr;?></span>
          <br><br>
          City: <input type="text" name="city" value="<?php echo $city;?>">
          <span class="error">* <?php echo $cityErr;?></span>   
          <br><br>
         
          <input type="submit" name="submit" value="Submit">  
        </form>



<?php
echo "<h2>Your Input:</h2>";
echo $firstname;
echo "<br>";
echo $username;
echo "<br>";
echo $email;
echo "<br>";
echo $password;
echo "<br>";
echo $confirmpassword;
echo "<br>";
echo $address;
echo "<br>";
echo $city;
?>
<ul>
          <li class="li nav-ul-li nav-ul-li-bl">
            <a class="navbar-header navbar-brand nav-ul-li-a nav-ul-li-a-no"
               
                 href="http://localhost:8080/emyecoWebApplication/Sign_in">Login
            
            </a>
          </li>
          <li class="li nav-ul-li nav-ul-li-bl">
            <a class="navbar-header navbar-brand nav-ul-li-a nav-ul-li-a-no"
               
                 href="http://localhost:8080/emyecoWebApplication/Sign_up">Register
            
            </a>
          </li>
        </ul>
</body>
</html>