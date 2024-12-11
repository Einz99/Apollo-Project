<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apollo+ Apply Now</title>
    <link rel="icon" type="image" href="../../assets/favicon.ico">
    <link rel="stylesheet" href="../../css/apply.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
<body>
    <section>
        <div class="container">
            <h2>Registration Form</h2>
            <form onsubmit="emailSend(); reset(); return false">
                <div class="user_details">
                    <div class="input_box">
                        <span class="title">Full Name</span>
                        <div class="icon">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" placeholder="Your Full Name" id="name" required>
                        </div>
                    </div>
    
                    <div class="input_box">
                        <span class="title">Email</span>
                        <div class="icon">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="text" placeholder="Your Email" id="email" required>
                        </div>
                    </div>
    
                    <div class="input_box">
                        <span class="title">Phone Number</span>
                        <div class="icon">
                            <i class="fa-solid fa-phone"></i>
                            <input type="text" placeholder="Your Phone Number" id="phone" required>
                        </div>
                    </div>
    
                    <div class="input_box">
                        <span class="title">Birth Date</span>
                        <div class="icon">
                            <i class="fa-solid fa-calendar-week"></i>
                            <input type="date" placeholder="Your Phone Number" id="bday" required>
                        </div>
                    </div>
    
                    <div class="input_box">
                        <span class="title">Address</span>
                        <div class="icon">
                            <i class="fa-solid fa-house-user"></i>
                            <input type="text" placeholder="Your Current Address" id="address" required>
                        </div>
                    </div>
    
                    <div class="input_box">
                        <span class="title">Postal Code</span>
                        <div class="icon">
                            <i class="fa-solid fa-envelopes-bulk"></i>
                            <input type="text" placeholder="Your Address Postal Code" id="postal" required>
                        </div>
                    </div>
                </div>
    
                <div class="user_gender">
                    <span class="title">Gender</span>
                    <div class="gender_category">
                        <label for="male">
                            <span>Male</span>
                            <input type="radio" name="gender" id="male" value="Male">
                        </label>
                        <label for="female">
                            <span>Female</span>
                            <input type="radio" name="gender" id="female" value="Female">
                        </label>
                        <label for="other">
                            <span>Other</span>
                            <input type="radio" name="gender" id="other" value="Other">
                        </label>
                    </div>
                </div>


                <div class="input_box">
                    <span class="title">Upload CV (PDF)</span>
                    <div class="icon">
                        <i class="fa-solid fa-upload"></i>
                        <input type="file" id="fileInput" accept=".pdf" required>
                    </div>
                </div>
                
    
                <div class="terms_policy">
                    <p>By clicking Sign Up, you agree to our <a href="#">Terms, Privacy Policy</a> and <a href="#">Cookies Policy.</a> You may receive SMS notification from us and can opt out at any time.</p>
                </div>
    
                <div class="button">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
        <div class="backbtn">
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        <script src="https://smtpjs.com/v3/smtp.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="../../js/apply.js"></script>
    </section>
    
    <footer>
        <hr>
        <p>©️ 2024 Apollo+ Entertainment, Inc. All Rights Reserved.</p>
    </footer>
</body>
</html>