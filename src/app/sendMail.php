<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: Content-Type");
        exit;
        case("POST"): //Send the email;
            header("Access-Control-Allow-Origin: *");
            // Payload is not send to $_POST Variable,
            // is send to php:input as a text
            $json = file_get_contents('php://input');
            //parse the Payload from text format to Object
            $params = json_decode($json);
    
            // Ensure correct type
            $email   = isset($params->email) ? (string)$params->email : '';
            $name    = isset($params->name) ? (string)$params->name : '';
            $message = isset($params->message) ? (string)$params->message : '';

            // Header Injection Protection
            $email = str_replace(["\r", "\n"], '', $email);
            $name  = str_replace(["\r", "\n"], '', $name);
    
            // Email validation: send back bad request if invalid
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid email format']);
                exit; 
            }

            // Escape user input for HTML mail
            $safeName    = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $safeEmail   = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

            $recipient = 'contact@simon-fuchs.net';  
            $subject = "Contact form submission";
            $body = "From: {$safeName} &lt;{$safeEmail}&gt;<br><br>{$safeMessage}";
    
            $headers   = array();
            $headers[] = 'MIME-Version: 1.0';
            $headers[] = 'Content-type: text/html; charset=utf-8';

            // From stays on your domain (SPF/DMARC friendly)
            $headers[] = "From: contact@simon-fuchs.net";

            // Reply-To set to sender's email
            $headers[] = "Reply-To: {$safeEmail}";
            $headers[] = 'X-Mailer: PHP/' . phpversion();
            
            mail($recipient, $subject, $body, implode("\r\n", $headers));
            break;
        default: //Reject any non POST or OPTIONS requests.
            header("Allow: POST", true, 405);
            exit;
    } 
