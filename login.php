<?php
include 'db_config.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Geçersiz istek."]);
    exit;
}

$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "E-posta ve şifre zorunludur."]);
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Bu e-posta ile kayıtlı kullanıcı bulunamadı."]);
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->bind_result($id, $username, $hashed_password);
$stmt->fetch();

if (password_verify($password, $hashed_password)) {
    $_SESSION['user_id']   = $id;
    $_SESSION['username']  = $username;
    $_SESSION['logged_in'] = true;
    echo json_encode([
        "success"  => true,
        "message"  => "Hoş geldiniz, " . htmlspecialchars($username) . "! Giriş başarılı.",
        "username" => $username
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Şifre hatalı."]);
}

$stmt->close();
$conn->close();
?>
