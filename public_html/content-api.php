<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$content_file = 'content.json';

// Default content structure
$default_content = [
    'hero' => [
        'title' => 'Master the <span class="text-amber-500">Old World</span> with Expert Coaching',
        'subtitle' => 'Transform your gameplay from novice to champion with personalized coaching from a master judge and competitive veteran',
        'cta_text' => 'Book Coaching Session'
    ],
    'about' => [
        'name' => 'Shayne Hall',
        'title' => 'About Your <span class="text-amber-500">Coach</span>',
        'description' => 'With years of experience as both a competitive player and official judge at major Canadian Warhammer events, I bring a unique dual perspective to coaching that sets me apart from other instructors.',
        'extended_description' => 'My deep understanding of the rules comes from countless hours adjudicating complex interactions at tournament level, while my competitive experience ensures I understand what it takes to succeed under pressure.',
        'discord' => 'auce'
    ],
    'services' => [
        'title' => 'Coaching <span class="text-amber-500">Services</span>',
        'beginner_title' => 'New to the Old World?',
        'beginner_subtitle' => 'Build a strong foundation for lasting success',
        'competitive_title' => 'Ready to Compete?',
        'competitive_subtitle' => 'Elevate your game to tournament level',
        'additional_info' => 'Additional services include mental game preparation, multi-round event strategies, and avoiding common mistakes that cost games.'
    ],
    'approach' => [
        'title' => 'Coaching <span class="text-amber-500">Approach</span>',
        'intro' => 'My coaching philosophy combines technical expertise with personalized mentorship, ensuring you not only improve your gameplay but understand the fundamental concepts that drive long-term success.'
    ],
    'contact' => [
        'title' => 'Get <span class="text-amber-500">Started</span>',
        'subtitle' => 'Ready to elevate your game? Let\'s discuss your goals and create a personalized coaching plan.',
        'discord' => 'auce',
        'form_title' => 'Send Me a Message'
    ]
];

try {
    // Check if content file exists and is readable
    if (file_exists($content_file) && is_readable($content_file)) {
        $file_content = file_get_contents($content_file);
        $content = json_decode($file_content, true);
        
        // If JSON is invalid or empty, use default content
        if (json_last_error() !== JSON_ERROR_NONE || empty($content)) {
            $content = $default_content;
        } else {
            // Replace defaults with loaded content, keeping defaults for missing fields only
            foreach ($default_content as $section => $fields) {
                if (isset($content[$section]) && is_array($content[$section])) {
                    // Use loaded content for this section, but fill in any missing fields with defaults
                    $content[$section] = array_merge($fields, $content[$section]);
                } else {
                    // Section doesn't exist in loaded content, use defaults
                    $content[$section] = $fields;
                }
            }
        }
    } else {
        // File doesn't exist, use default content
        $content = $default_content;
    }
    
    // Return the content as JSON
    echo json_encode($content, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // On any error, return default content
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to load content',
        'message' => $e->getMessage(),
        'content' => $default_content
    ]);
}
?>