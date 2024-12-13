<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php"); // Redirect to login if not logged in
    exit();
}

$username = $_SESSION['username'];
$email = $_SESSION['email'];
?>

<!DOCTYPE html>
<html lang="en">
<title>About Apollo+ Ent</title>
    <link rel="stylesheet" href="../../css/headerfooter.css?v=<?php echo time(); ?>">
    <link rel="stylesheet" href="../../css/dashboard.css?v=<?php echo time(); ?>">
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
        <a href="change.php">Account Settings</a>
            <a href="logout.php">Log out</a>
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
    <section class="carts">
        <H1>Welcome <?php echo $username?></H1>
        <div class="cart1"></div>
        <div class="cart2"></div>
        <div class="cart3">
            <div class="items">
                    <h1>Orders</h1>
            </div>
            <div class="payment">
                <h1>PAYMENT</h1>
                <form action="" class="PaymentForm">
                  <div class="name">
                    <label for="Name">Name</label>
                    <input type="text" name="Name" id="Name" required>
                  </div>
                  <div class="address">
                    <label for="Address">Adress</label>
                    <input type="text" name="Address" id="Address" required>
                  </div>
                  <div class="EToD">
                    <label for="Estimated Time of Delivery">Estimated Time of Delivery</label>
                    <p>7-10days</p>
                  </div>
                  <div class="lastchilds">
                    <div class="PaymentMethod">
                      <label for="Payment">Payment Method</label><br>
                        <input type="radio" name="Payment" id="Payment">GCash<br>
                        <input type="radio" name="Payment" id="Payment">Cash On Delivery (COD)
                    </div>
                    <input type="submit" value="Submit" class="submit">
                  </div>
                </form>
            </div>
        </div>
    </section>
    <script src="../../js/dashboard.js?v=<?php echo time(); ?>"></script>
</body>
</html>