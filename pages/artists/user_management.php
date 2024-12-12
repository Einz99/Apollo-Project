<?php
// Database connection
$servername = "localhost";
$username = "root";  // default XAMPP username
$password = "";      // default XAMPP password
$dbname = "apollo";  // Specified database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

class UserProfileManager {
    private $conn;

    public function __construct($database_connection) {
        $this->conn = $database_connection;
    }

    // Enhanced password hashing method
    private function hashPassword($password) {
        // Use strong hashing with modern options
        $options = [
            'cost' => 12, // Increased computational cost for better security
            'memory_cost' => 1024 * 1024, // 1MB memory cost
            'time_cost' => 3 // Increased time cost for hashing
        ];

        // Use Argon2id - considered more secure than bcrypt
        return password_hash($password, PASSWORD_ARGON2ID, $options);
    }

    // Sanitize input
    private function cleanInput($input) {
        $input = trim($input);
        $input = stripslashes($input);
        $input = htmlspecialchars($input);
        return $input;
    }

    // Validate email
    private function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    // Check if username exists
    private function isUsernameTaken($username) {
        $stmt = $this->conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();
        $exists = $stmt->num_rows > 0;
        $stmt->close();
        return $exists;
    }

    // Update User Profile with Enhanced Password Hashing
    public function updateProfile($user_id, $new_email, $new_username, $current_password, $new_password, $confirm_password) {
        // Sanitize inputs
        $new_email = $this->cleanInput($new_email);
        $new_username = $this->cleanInput($new_username);
        
        $errors = [];

        // Verify current user
        $stmt = $this->conn->prepare("SELECT email, username, password FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        // Verify current password
        if (!password_verify($current_password, $user['password'])) {
            $errors[] = "Current password is incorrect";
        }

        // Validate email
        if (!$this->validateEmail($new_email)) {
            $errors[] = "Invalid email format";
        }

        // Check username uniqueness
        if ($new_username !== $user['username'] && $this->isUsernameTaken($new_username)) {
            $errors[] = "Username is already taken";
        }

        // Validate new password if provided
        if (!empty($new_password)) {
            // Enhanced password complexity checks
            if (strlen($new_password) < 12) {
                $errors[] = "Password must be at least 12 characters long";
            }
            
            if (!preg_match("/[A-Z]/", $new_password)) {
                $errors[] = "Password must contain at least one uppercase letter";
            }
            
            if (!preg_match("/[a-z]/", $new_password)) {
                $errors[] = "Password must contain at least one lowercase letter";
            }
            
            if (!preg_match("/[0-9]/", $new_password)) {
                $errors[] = "Password must contain at least one number";
            }
            
            if (!preg_match("/[^a-zA-Z0-9]/", $new_password)) {
                $errors[] = "Password must contain at least one special character";
            }
            
            if ($new_password !== $confirm_password) {
                $errors[] = "New passwords do not match";
            }
        }

        // If no errors, proceed with update
        if (empty($errors)) {
            $update_fields = [];
            $param_types = '';
            $params = [];

            // Prepare dynamic update
            if ($new_email !== $user['email']) {
                $update_fields[] = "email = ?";
                $param_types .= 's';
                $params[] = &$new_email;
            }

            if ($new_username !== $user['username']) {
                $update_fields[] = "username = ?";
                $param_types .= 's';
                $params[] = &$new_username;
            }

            // Always hash and update password if new password provided
            if (!empty($new_password)) {
                $hashed_password = $this->hashPassword($new_password);
                $update_fields[] = "password = ?";
                $param_types .= 's';
                $params[] = &$hashed_password;
            }

            // Execute update if there are changes
            if (!empty($update_fields)) {
                $param_types .= 'i';
                $params[] = &$user_id;

                $query = "UPDATE users SET " . implode(', ', $update_fields) . " WHERE id = ?";
                
                $stmt = $this->conn->prepare($query);
                $stmt->bind_param($param_types, ...$params);
                
                if ($stmt->execute()) {
                    $stmt->close();
                    return ['success' => true, 'message' => 'Profile updated successfully'];
                } else {
                    $stmt->close();
                    return ['success' => false, 'message' => 'Database error occurred'];
                }
            }

            return ['success' => true, 'message' => 'No changes made'];
        }

        return ['success' => false, 'errors' => $errors];
    }

    public function deleteAccount($user_id, $password) {
        $errors = [];

        // Verify current user and password
        $stmt = $this->conn->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        // Verify password
        if (!password_verify($password, $user['password'])) {
            $errors[] = "Incorrect password. Account deletion cancelled.";
            return ['success' => false, 'errors' => $errors];
        }

        // Begin transaction
        $this->conn->begin_transaction();

        try {
            // Delete related records (customize based on your Apollo database schema)
            $tables_to_delete = ['user_details', 'user_posts', 'user_comments'];
            
            foreach ($tables_to_delete as $table) {
                $delete_stmt = $this->conn->prepare("DELETE FROM $table WHERE user_id = ?");
                $delete_stmt->bind_param("i", $user_id);
                $delete_stmt->execute();
                $delete_stmt->close();
            }

            // Delete main user record
            $delete_user_stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
            $delete_user_stmt->bind_param("i", $user_id);
            $delete_user_stmt->execute();
            $delete_user_stmt->close();

            // Commit transaction
            $this->conn->commit();

            // Destroy session
            session_unset();
            session_destroy();

            return [
                'success' => true, 
                'message' => 'Your account has been permanently deleted.',
                'redirect' => 'index.php'
            ];
        } catch (Exception $e) {
            // Rollback transaction
            $this->conn->rollback();
            
            // Log error (implement proper logging in production)
            error_log("Account deletion error for user $user_id: " . $e->getMessage());

            return [
                'success' => false, 
                'errors' => ['An error occurred while deleting your account.']
            ];
        }
    }
}

// Handle Profile Update
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'update_profile') {
    $profileManager = new UserProfileManager($conn);

    $result = $profileManager->updateProfile(
        $_SESSION['user_id'],
        $_POST['new_email'],
        $_POST['new_username'],
        $_POST['current_password'],
        $_POST['new_password'],
        $_POST['confirm_password']
    );

    if ($result['success']) {
        $_SESSION['message'] = $result['message'];
        header('Location: shop.php');
        exit();
    } else {
        $_SESSION['errors'] = $result['errors'];
        header('Location: shop.php');
        exit();
    }
}

// Handle Account Deletion
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'delete_account') {
    $profileManager = new UserProfileManager($conn);

    $result = $profileManager->deleteAccount(
        $_SESSION['user_id'], 
        $_POST['confirm_password']
    );

    if ($result['success']) {
        header('Location: ' . $result['redirect']);
        exit();
    } else {
        $_SESSION['deletion_errors'] = $result['errors'];
        header('Location: shop.php');
        exit();
    }
}
?>
}

// [Remaining code from the previous script]
?>