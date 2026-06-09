<?php
include 'db_config.php';
header('Content-Type: application/json');

// Mesaj tablosunu oluştur (yoksa)
$conn->query("CREATE TABLE IF NOT EXISTS messages (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL,
    phone      VARCHAR(20),
    type       VARCHAR(30)  NOT NULL,
    subject    VARCHAR(200) NOT NULL,
    message    TEXT         NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

$method = $_SERVER["REQUEST_METHOD"];

// ========= MESAJ EKLE =========
if ($method === "POST") {
    $name    = trim($_POST['name']    ?? '');
    $email   = trim($_POST['email']   ?? '');
    $phone   = trim($_POST['phone']   ?? '');
    $type    = trim($_POST['type']    ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($type) || empty($subject) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Zorunlu alanlar eksik."]);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Geçersiz e-posta."]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO messages (name, email, phone, type, subject, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $phone, $type, $subject, $message);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Mesajınız başarıyla gönderildi!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Mesaj gönderilemedi: " . $stmt->error]);
    }
    $stmt->close();
}

// ========= MESAJLARI LİSTELE =========
elseif ($method === "GET") {
    $result = $conn->query("SELECT id, name, email, type, subject, message, created_at FROM messages ORDER BY created_at DESC LIMIT 20");
    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode(["success" => true, "data" => $messages]);
}

else {
    echo json_encode(["success" => false, "message" => "Geçersiz istek metodu."]);
}

$conn->close();
?>
