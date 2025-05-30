<?php
// filepath: d:/Programs/xampp/htdocs/portfolio/track_visitor.php
require_once __DIR__ . '/config/db_connection.php';

function getUserIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

function getLocation($ip) {
    // Use a free IP geolocation API (ip-api.com)
    $url = "http://ip-api.com/json/" . $ip;
    $response = @file_get_contents($url);
    if ($response !== false) {
        $data = json_decode($response, true);
        if ($data && $data['status'] === 'success') {
            return $data['country'] . ', ' . $data['regionName'] . ', ' . $data['city'];
        }
    }
    return 'Unknown';
}

$ip = getUserIP();
$location = getLocation($ip);

// Check if this IP/location combo already exists for today
$stmt = $pdo->prepare("SELECT COUNT(*) FROM visitors WHERE ip_address = ? AND DATE(visited_at) = CURDATE()");
$stmt->execute([$ip]);
$exists = $stmt->fetchColumn();

if (!$exists) {
    $stmt = $pdo->prepare("INSERT INTO visitors (location, ip_address) VALUES (?, ?)");
    $stmt->execute([$location, $ip]);
}

// Get total unique visitors (by ip)
$stmt = $pdo->query("SELECT COUNT(DISTINCT ip_address) FROM visitors");
$total = $stmt->fetchColumn();

echo json_encode(['count' => (int)$total]);
