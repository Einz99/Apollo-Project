<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Management - Apollo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        .form-section {
            background-color: #f4f4f4;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .btn {
            display: inline-block;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
        }
        .btn-update {
            background-color: gold;
            color: white;
            border: none;
        }
        .btn-delete {
            background-color: #f44336;
            color: white;
            border: none;
        }
        .error-message {
            color: red;
            margin-bottom: 15px;
        }
        .success-message {
            color: green;
            margin-bottom: 15px;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .modal-content {
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 500px;
        }
        body {
            background-color: black;
        }
    </style>
</head>
<body>
    <?php
    session_start();
    
    // Check if user is logged in
    if (!isset($_SESSION['user_id'])) {
        header('Location: login.php');
        exit();
    }

    // Include the user management script
    require_once 'user_management.php'; // Assuming previous script is saved as this

    // Handle success and error messages
    if (isset($_SESSION['message'])) {
        echo '<div class="success-message">' . htmlspecialchars($_SESSION['message']) . '</div>';
        unset($_SESSION['message']);
    }

    if (isset($_SESSION['errors'])) {
        echo '<div class="error-message">';
        foreach ($_SESSION['errors'] as $error) {
            echo '<p>' . htmlspecialchars($error) . '</p>';
        }
        echo '</div>';
        unset($_SESSION['errors']);
    }
    ?>

    <div class="form-section">
        <h2>Update Profile</h2>
        <form method="POST" action="user_management.php" id="update-profile-form">
            <input type="hidden" name="action" value="update_profile">
            
            <div class="form-group">
                <label>Current Password (required to make changes):</label>
                <input type="password" name="current_password" required>
            </div>

            <div class="form-group">
                <label>New Email:</label>
                <input type="email" name="new_email" value="<?php echo htmlspecialchars($_SESSION['email'] ?? ''); ?>">
            </div>

            <div class="form-group">
                <label>New Username:</label>
                <input type="text" name="new_username" value="<?php echo htmlspecialchars($_SESSION['username'] ?? ''); ?>">
            </div>

            <div class="form-group">
                <label>New Password (optional):</label>
                <input type="password" name="new_password" minlength="12">
            </div>

            <div class="form-group">
                <label>Confirm New Password:</label>
                <input type="password" name="confirm_password" minlength="12">
            </div>

            <button type="submit" class="btn btn-update">Update Profile</button>
        </form>
    </div>

    <div class="form-section">
        <h2>Delete Account</h2>
        <p><strong>Warning:</strong> Deleting your account is permanent and cannot be undone.</p>
        
        <button onclick="openDeleteModal()" class="btn btn-delete">Delete My Account</button>

        <!-- Delete Account Modal -->
        <div id="delete-modal" class="modal">
            <div class="modal-content">
                <h3>Confirm Account Deletion</h3>
                <form method="POST" action="user_management.php" id="delete-account-form">
                    <input type="hidden" name="action" value="delete_account">
                    
                    <div class="form-group">
                        <label>Enter your password to confirm deletion:</label>
                        <input type="password" name="confirm_password" required>
                    </div>

                    <div class="form-group">
                        <input type="checkbox" id="confirm-delete" required>
                        <label for="confirm-delete">I understand this will permanently delete my account</label>
                    </div>

                    <button type="submit" class="btn btn-delete">Permanently Delete Account</button>
                    <button type="button" onclick="closeDeleteModal()" class="btn" style="background-color: #ddd; color: black;">Cancel</button>
                </form>
            </div>
        </div>
    </div>

    <script>
    function openDeleteModal() {
        document.getElementById('delete-modal').style.display = 'block';
    }

    function closeDeleteModal() {
        document.getElementById('delete-modal').style.display = 'none';
    }

    // Form validation
    document.getElementById('update-profile-form').addEventListener('submit', function(e) {
        const newPassword = document.querySelector('input[name="new_password"]').value;
        const confirmPassword = document.querySelector('input[name="confirm_password"]').value;

        if (newPassword !== confirmPassword) {
            e.preventDefault();
            alert('New passwords do not match');
            return false;
        }

        // Optional: Additional client-side validation
        if (newPassword && newPassword.length < 12) {
            e.preventDefault();
            alert('Password must be at least 12 characters long');
            return false;
        }
    });

    // Account deletion confirmation
    document.getElementById('delete-account-form').addEventListener('submit', function(e) {
        const confirmCheckbox = document.getElementById('confirm-delete');
        
        if (!confirmCheckbox.checked) {
            e.preventDefault();
            alert('Please check the confirmation box to proceed');
            return false;
        }

        // Additional confirmation dialog
        if (!confirm('ARE YOU ABSOLUTELY SURE? This will permanently delete your account and CANNOT be undone.')) {
            e.preventDefault();
            return false;
        }
    });
    </script>
</body>
</html>