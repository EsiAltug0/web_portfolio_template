<?php
include 'db_config.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Geçersiz istek."]);
    exit;
}

$username = trim($_POST['username'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

// Basit doğrulama
if (empty($username) || empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Tüm alanlar zorunludur."]);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Geçersiz e-posta adresi."]);
    exit;
}
if (strlen($password) < 6) {
    echo json_encode(["success" => false, "message" => "Şifre en az 6 karakter olmalıdır."]);
    exit;
}

// Kullanıcı tablosunu oluştur (yoksa)
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username     VARCHAR(50)  NOT NULL UNIQUE,
    email        VARCHAR(100) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

// E-posta veya kullanıcı adı mevcut mu?
$check = $conn->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
$check->bind_param("ss", $email, $username);
$check->execute();
$check->store_result();
if ($check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Bu e-posta veya kullanıcı adı zaten kullanılıyor."]);
    $check->close();
    $conn->close();
    exit;
}
$check->close();

// Kayıt et
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Kayıt başarıyla oluşturuldu! Giriş yapabilirsiniz."]);
} else {
    echo json_encode(["success" => false, "message" => "Kayıt sırasında hata: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
