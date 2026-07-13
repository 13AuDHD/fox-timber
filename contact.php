<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

$siteName = 'Fox & Timber';
$ownerEmail = 'hello@foxandtimber.com';
$fromEmail = 'no-reply@foxandtimber.com';

function fail(string $message, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['success' => false, 'message' => $message]);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('Method not allowed.', 405);
if (!empty($_POST['website'] ?? '')) fail('Submission rejected.');

$name = trim((string)($_POST['name'] ?? ''));
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$organization = trim((string)($_POST['organization'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$interest = trim((string)($_POST['interest'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$consent = isset($_POST['consent']);

if ($name === '' || !$email || $message === '' || !$consent) fail('Please complete all required fields.');
if (mb_strlen($name) > 120 || mb_strlen($message) > 10000) fail('One or more fields are too long.');

$clean = fn(string $value): string => str_replace(["\r", "\n"], ' ', $value);
$subject = 'New consultation request from ' . $clean($name);
$body = "New Fox & Timber website inquiry\n\n"
      . "Name: {$name}\nEmail: {$email}\nOrganization: {$organization}\nPhone: {$phone}\nInterest: {$interest}\n\nMessage:\n{$message}\n";
$headers = [
    'From: ' . $siteName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $clean((string)$email),
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

$confirmSubject = 'We received your message | Fox & Timber';
$confirmBody = "Hi {$name},\n\n"
             . "We received your message and should be responding back within 24–48 hours.\n\n"
             . "Your message:\n{$message}\n\n"
             . "Fox & Timber\nDurango, Colorado\n";
$confirmHeaders = [
    'From: ' . $siteName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $ownerEmail,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

$sentToOwner = mail($ownerEmail, $subject, $body, implode("\r\n", $headers));
$sentConfirmation = mail((string)$email, $confirmSubject, $confirmBody, implode("\r\n", $confirmHeaders));

if (!$sentToOwner || !$sentConfirmation) {
    fail('The server could not send the email. Confirm that outbound mail, SPF, and DKIM are configured for foxandtimber.com.', 500);
}
echo json_encode(['success' => true]);
