<?php
include 'db_connect.php';
?>
<!DOCTYPE html>
<html lang="en">
<title>About Apollo+ Ent</title>
    <link rel="stylesheet" href="../../css/login.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="../../css/headerfooter.css?v=<?php echo time(); ?>">
    <script
      src="https://kit.fontawesome.com/d9e96eb9b3.js"
      crossorigin="anonymous"
    ></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="icon" type="image" href="../../assets/favicon.ico">
</head>
<body> 
    <header>
        <a href="../../index.php" class="brand"
          ><img src="../../assets/APOLLO+ LOGO VER2.png" class="logo"
        /></a>
        <div class="rightmost">
          <div class="menu-btn"></div>
          <div class="navigation">
            <div class="navigation-items">
              <a href="/index.php">Home</a>
              <a href="pages/artists/artist.php" class="active">Artists</a>
              <a href="shop.php">Shop</a>
              <a href="../about.php">About</a>
              <a href="../contact/contact.php">Contact</a>
              <div class="reserved">
                <p>©️ <i>2024 Apollo+ Entertainment, Inc. All Rights Reserved.</i></p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <script type="text/javascript" src="../../js/header.js"></script>

      <section class="login">
        <div class="login1"></div>
        <div class="login2"></div>
        <div class="login3">
          <H1>Register</H1>
          <form method="POST" action="register_process.php">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="user">User:</label>
            <input type="text" id="user" name="user" required>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <label for="Confirmpassword">Confirm Password:</label>
            <input type="password" id="Confirmpassword" name="Confirmpassword" required>
            <button type="submit">Register</button>
          </form>
          <a href="login.php">Already Have Account?</a>
        </div>
        <div class="icons">
        <a href="https://www.facebook.com/ribnan.sangalang.1?mibextid=ZbWKwL"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a
            href="https://www.instagram.com/san.rayyy?igsh=MWpwamw0OTNocmViZQ=="
            ><i class="fab fa-instagram"></i
          ></a>
          <a href="https://x.com/positiviSTAY?t=OBzg7zTppq4kQvGMYVfbtQ&s=09"
            ><i class="fa-brands fa-x-twitter"></i
          ></a>
        </div>
      </section>
      <footer>
        <br><br>
      <div class="footHeader">
        <div class="foot1">
          <img src="../../assets/APOLLO+ LOGO VER2.png" class="logo"/>
        </div>
        <div class="foot2">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
            eum, totam perspiciatis eius doloribus consequatur consequuntur quas
            consectetur non adipisci provident qui pariatur ducimus corrupti
            officia mollitia est minima bea...
            <a href="#">&lt;read more&gt;</a>
          </p>
        </div>
      </div>
      <div class="footcontact">
        <div class="footiii">
          <p class="heading">CONTACT US</p>
          <p>For more info about booking, inquiries and audition</p>
          <a href="pages/contact/contact.php" class="contact"><i>Click here</i></a>
          <br>
          <a href="https://www.facebook.com/ribnan.sangalang.1?mibextid=ZbWKwL"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a
            href="https://www.instagram.com/san.rayyy?igsh=MWpwamw0OTNocmViZQ=="
            ><i class="fab fa-instagram"></i
          ></a>
          <a href="https://x.com/positiviSTAY?t=OBzg7zTppq4kQvGMYVfbtQ&s=09"
            ><i class="fa-brands fa-x-twitter"></i
          ></a>
        </div>
        <div class="foot4">
            <div class="foot41">
                <p><i class="fa-solid fa-location-dot"></i><br><br></p>
                <br>
                <p><i class="fa-solid fa-phone"></i></p>
                <br>
                <p></p><i class="fa-solid fa-envelope"></i></p>
            </div>
            <div class="foot42">
                <p>MXV9+GJF, Maysan Rd <br>Valenzuela, Metro Manila</p>
                <br>
                <p>6391234567890</p>
                <br>
                <p>apolloentertainment@gmail.com</p>
            </div>
        </div>
      </div>
      <div class="license">
        <p>©️ <i>2024 Apollo+ Entertainment, Inc. All Rights Reserved.</i></p>
      </div>
    </footer>
</body>
</html>