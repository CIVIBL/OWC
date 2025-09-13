<?php
session_start();

// Configuration
$admin_password = 'oldworld2024'; // Change this to a secure password
$content_file = '../content.json';

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['password'] === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $login_error = 'Invalid password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle content save
if (isset($_POST['save_content']) && isset($_SESSION['admin_logged_in'])) {
    $content = [
        'hero' => [
            'title' => $_POST['hero_title'] ?? '',
            'subtitle' => $_POST['hero_subtitle'] ?? '',
            'cta_text' => $_POST['hero_cta_text'] ?? ''
        ],
        'about' => [
            'name' => $_POST['about_name'] ?? '',
            'title' => $_POST['about_title'] ?? '',
            'description' => $_POST['about_description'] ?? '',
            'extended_description' => $_POST['about_extended_description'] ?? '',
            'discord' => $_POST['about_discord'] ?? ''
        ],
        'services' => [
            'title' => $_POST['services_title'] ?? '',
            'beginner_title' => $_POST['services_beginner_title'] ?? '',
            'beginner_subtitle' => $_POST['services_beginner_subtitle'] ?? '',
            'competitive_title' => $_POST['services_competitive_title'] ?? '',
            'competitive_subtitle' => $_POST['services_competitive_subtitle'] ?? '',
            'additional_info' => $_POST['services_additional_info'] ?? ''
        ],
        'approach' => [
            'title' => $_POST['approach_title'] ?? '',
            'intro' => $_POST['approach_intro'] ?? ''
        ],
        'contact' => [
            'title' => $_POST['contact_title'] ?? '',
            'subtitle' => $_POST['contact_subtitle'] ?? '',
            'discord' => $_POST['contact_discord'] ?? '',
            'form_title' => $_POST['contact_form_title'] ?? ''
        ]
    ];
    
    if (file_put_contents($content_file, json_encode($content, JSON_PRETTY_PRINT))) {
        $save_success = 'Content saved successfully!';
        // Update current_content with the newly saved data
        $current_content = $content;
    } else {
        $save_error = 'Failed to save content. Check file permissions.';
    }
}

// Load existing content
$current_content = [];
if (file_exists($content_file)) {
    $current_content = json_decode(file_get_contents($content_file), true) ?? [];
}

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

// Merge with defaults to ensure all fields exist
$content = array_merge_recursive($default_content, $current_content);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Old World Coach - Admin Panel</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            color: #f9fafb;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: bold;
            color: #f59e0b;
            margin-bottom: 0.5rem;
        }

        .header p {
            color: #d1d5db;
            font-size: 1.1rem;
        }

        .login-form {
            max-width: 400px;
            margin: 0 auto;
            background: #374151;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .admin-panel {
            background: #374151;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #f59e0b;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            background: #4b5563;
            border: 1px solid #6b7280;
            border-radius: 0.5rem;
            color: #f9fafb;
            font-size: 1rem;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #f59e0b;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }

        .btn {
            background: #dc2626;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.5rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn:hover {
            background: #b91c1c;
            transform: translateY(-1px);
        }

        .btn-secondary {
            background: #6b7280;
            margin-left: 1rem;
        }

        .btn-secondary:hover {
            background: #4b5563;
        }

        .section {
            margin-bottom: 3rem;
            padding: 1.5rem;
            background: #4b5563;
            border-radius: 0.75rem;
            border-left: 4px solid #f59e0b;
        }

        .section h3 {
            color: #f59e0b;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        .alert {
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }

        .alert-success {
            background: #065f46;
            border: 1px solid #10b981;
            color: #d1fae5;
        }

        .alert-error {
            background: #7f1d1d;
            border: 1px solid #ef4444;
            color: #fecaca;
        }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #6b7280;
        }

        .preview-btn {
            background: #f59e0b;
            color: #1f2937;
        }

        .preview-btn:hover {
            background: #d97706;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 1rem;
            }
            
            .top-bar {
                flex-direction: column;
                gap: 1rem;
            }
        }

        .help-text {
            font-size: 0.875rem;
            color: #9ca3af;
            margin-top: 0.25rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Old World Coach</h1>
            <p>Content Management System</p>
        </div>

        <?php if (!isset($_SESSION['admin_logged_in'])): ?>
            <!-- Login Form -->
            <div class="login-form">
                <h2 style="text-align: center; margin-bottom: 1.5rem; color: #f59e0b;">Admin Login</h2>
                
                <?php if (isset($login_error)): ?>
                    <div class="alert alert-error"><?php echo htmlspecialchars($login_error); ?></div>
                <?php endif; ?>
                
                <form method="POST">
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" name="login" class="btn" style="width: 100%;">Login</button>
                </form>
            </div>
        <?php else: ?>
            <!-- Admin Panel -->
            <div class="admin-panel">
                <div class="top-bar">
                    <h2 style="color: #f59e0b;">Content Management</h2>
                    <div>
                        <a href="../" target="_blank" class="btn preview-btn">Preview Website</a>
                        <a href="?logout=1" class="btn btn-secondary">Logout</a>
                    </div>
                </div>

                <?php if (isset($save_success)): ?>
                    <div class="alert alert-success"><?php echo htmlspecialchars($save_success); ?></div>
                <?php endif; ?>
                
                <?php if (isset($save_error)): ?>
                    <div class="alert alert-error"><?php echo htmlspecialchars($save_error); ?></div>
                <?php endif; ?>

                <form method="POST">
                    <!-- Hero Section -->
                    <div class="section">
                        <h3>Hero Section</h3>
                        <div class="form-group">
                            <label for="hero_title">Main Title:</label>
                            <input type="text" id="hero_title" name="hero_title" value="<?php echo htmlspecialchars($content['hero']['title']); ?>">
                            <div class="help-text">Use HTML like &lt;span class="text-amber-500"&gt;Old World&lt;/span&gt; for styling</div>
                        </div>
                        <div class="form-group">
                            <label for="hero_subtitle">Subtitle:</label>
                            <textarea id="hero_subtitle" name="hero_subtitle"><?php echo htmlspecialchars($content['hero']['subtitle']); ?></textarea>
                        </div>
                        <div class="form-group">
                            <label for="hero_cta_text">CTA Button Text:</label>
                            <input type="text" id="hero_cta_text" name="hero_cta_text" value="<?php echo htmlspecialchars($content['hero']['cta_text']); ?>">
                        </div>
                    </div>

                    <!-- About Section -->
                    <div class="section">
                        <h3>About Section</h3>
                        <div class="grid">
                            <div class="form-group">
                                <label for="about_name">Coach Name:</label>
                                <input type="text" id="about_name" name="about_name" value="<?php echo htmlspecialchars($content['about']['name']); ?>">
                            </div>
                            <div class="form-group">
                                <label for="about_discord">Discord Username:</label>
                                <input type="text" id="about_discord" name="about_discord" value="<?php echo htmlspecialchars($content['about']['discord']); ?>">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="about_title">Section Title:</label>
                            <input type="text" id="about_title" name="about_title" value="<?php echo htmlspecialchars($content['about']['title']); ?>">
                            <div class="help-text">Use HTML for styling like &lt;span class="text-amber-500"&gt;Coach&lt;/span&gt;</div>
                        </div>
                        <div class="form-group">
                            <label for="about_description">Main Description:</label>
                            <textarea id="about_description" name="about_description"><?php echo htmlspecialchars($content['about']['description']); ?></textarea>
                        </div>
                        <div class="form-group">
                            <label for="about_extended_description">Extended Description:</label>
                            <textarea id="about_extended_description" name="about_extended_description"><?php echo htmlspecialchars($content['about']['extended_description']); ?></textarea>
                        </div>
                    </div>

                    <!-- Services Section -->
                    <div class="section">
                        <h3>Services Section</h3>
                        <div class="form-group">
                            <label for="services_title">Section Title:</label>
                            <input type="text" id="services_title" name="services_title" value="<?php echo htmlspecialchars($content['services']['title']); ?>">
                        </div>
                        <div class="grid">
                            <div>
                                <div class="form-group">
                                    <label for="services_beginner_title">Beginner Column Title:</label>
                                    <input type="text" id="services_beginner_title" name="services_beginner_title" value="<?php echo htmlspecialchars($content['services']['beginner_title']); ?>">
                                </div>
                                <div class="form-group">
                                    <label for="services_beginner_subtitle">Beginner Subtitle:</label>
                                    <input type="text" id="services_beginner_subtitle" name="services_beginner_subtitle" value="<?php echo htmlspecialchars($content['services']['beginner_subtitle']); ?>">
                                </div>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label for="services_competitive_title">Competitive Column Title:</label>
                                    <input type="text" id="services_competitive_title" name="services_competitive_title" value="<?php echo htmlspecialchars($content['services']['competitive_title']); ?>">
                                </div>
                                <div class="form-group">
                                    <label for="services_competitive_subtitle">Competitive Subtitle:</label>
                                    <input type="text" id="services_competitive_subtitle" name="services_competitive_subtitle" value="<?php echo htmlspecialchars($content['services']['competitive_subtitle']); ?>">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="services_additional_info">Additional Services Info:</label>
                            <textarea id="services_additional_info" name="services_additional_info"><?php echo htmlspecialchars($content['services']['additional_info']); ?></textarea>
                        </div>
                    </div>

                    <!-- Approach Section -->
                    <div class="section">
                        <h3>Coaching Approach</h3>
                        <div class="form-group">
                            <label for="approach_title">Section Title:</label>
                            <input type="text" id="approach_title" name="approach_title" value="<?php echo htmlspecialchars($content['approach']['title']); ?>">
                        </div>
                        <div class="form-group">
                            <label for="approach_intro">Introduction Text:</label>
                            <textarea id="approach_intro" name="approach_intro"><?php echo htmlspecialchars($content['approach']['intro']); ?></textarea>
                        </div>
                    </div>

                    <!-- Contact Section -->
                    <div class="section">
                        <h3>Contact Section</h3>
                        <div class="grid">
                            <div class="form-group">
                                <label for="contact_title">Section Title:</label>
                                <input type="text" id="contact_title" name="contact_title" value="<?php echo htmlspecialchars($content['contact']['title']); ?>">
                            </div>
                            <div class="form-group">
                                <label for="contact_discord">Discord Username:</label>
                                <input type="text" id="contact_discord" name="contact_discord" value="<?php echo htmlspecialchars($content['contact']['discord']); ?>">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="contact_subtitle">Subtitle:</label>
                            <textarea id="contact_subtitle" name="contact_subtitle"><?php echo htmlspecialchars($content['contact']['subtitle']); ?></textarea>
                        </div>
                        <div class="form-group">
                            <label for="contact_form_title">Contact Form Title:</label>
                            <input type="text" id="contact_form_title" name="contact_form_title" value="<?php echo htmlspecialchars($content['contact']['form_title']); ?>">
                        </div>
                    </div>

                    <div style="text-align: center; padding-top: 2rem; border-top: 1px solid #6b7280;">
                        <button type="submit" name="save_content" class="btn" style="font-size: 1.1rem; padding: 1rem 2rem;">
                            Save All Changes
                        </button>
                    </div>
                </form>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>