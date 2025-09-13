<?php
session_start();

// Simple admin password
$admin_password = 'oldworld2024';
$content_file = '../content.json';

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['password'] === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
    } else {
        $error = 'Invalid password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

// Handle save
$success = '';
if (isset($_POST['save']) && isset($_SESSION['admin_logged_in'])) {
    $content = array(
        'hero' => array(
            'title' => $_POST['hero_title'],
            'subtitle' => $_POST['hero_subtitle'],
            'cta_text' => $_POST['hero_cta']
        ),
        'about' => array(
            'name' => $_POST['about_name'],
            'title' => $_POST['about_title'],
            'description' => $_POST['about_desc'],
            'extended_description' => $_POST['about_extended'],
            'discord' => $_POST['about_discord']
        ),
        'services' => array(
            'title' => $_POST['services_title'],
            'beginner_title' => $_POST['services_beginner_title'],
            'beginner_subtitle' => $_POST['services_beginner_sub'],
            'competitive_title' => $_POST['services_comp_title'],
            'competitive_subtitle' => $_POST['services_comp_sub'],
            'additional_info' => $_POST['services_additional']
        ),
        'approach' => array(
            'title' => $_POST['approach_title'],
            'intro' => $_POST['approach_intro']
        ),
        'contact' => array(
            'title' => $_POST['contact_title'],
            'subtitle' => $_POST['contact_subtitle'],
            'discord' => $_POST['contact_discord'],
            'form_title' => $_POST['contact_form_title']
        )
    );
    
    if (file_put_contents($content_file, json_encode($content, JSON_PRETTY_PRINT))) {
        $success = 'Content saved successfully!';
    } else {
        $error = 'Failed to save content';
    }
}

// Load current content
$current = array(
    'hero' => array(
        'title' => 'Master the <span class="text-amber-500">Old World</span> with Expert Coaching',
        'subtitle' => 'Transform your gameplay from novice to champion with personalized coaching from a master judge and competitive veteran',
        'cta_text' => 'Book Coaching Session'
    ),
    'about' => array(
        'name' => 'Shayne Hall',
        'title' => 'About Your <span class="text-amber-500">Coach</span>',
        'description' => 'With years of experience as both a competitive player and official judge at major Canadian Warhammer events, I bring a unique dual perspective to coaching that sets me apart from other instructors.',
        'extended_description' => 'My deep understanding of the rules comes from countless hours adjudicating complex interactions at tournament level, while my competitive experience ensures I understand what it takes to succeed under pressure.',
        'discord' => 'auce'
    ),
    'services' => array(
        'title' => 'Coaching <span class="text-amber-500">Services</span>',
        'beginner_title' => 'New to the Old World?',
        'beginner_subtitle' => 'Build a strong foundation for lasting success',
        'competitive_title' => 'Ready to Compete?',
        'competitive_subtitle' => 'Elevate your game to tournament level',
        'additional_info' => 'Additional services include mental game preparation, multi-round event strategies, and avoiding common mistakes that cost games.'
    ),
    'approach' => array(
        'title' => 'Coaching <span class="text-amber-500">Approach</span>',
        'intro' => 'My coaching philosophy combines technical expertise with personalized mentorship, ensuring you not only improve your gameplay but understand the fundamental concepts that drive long-term success.'
    ),
    'contact' => array(
        'title' => 'Get <span class="text-amber-500">Started</span>',
        'subtitle' => 'Ready to elevate your game? Let\'s discuss your goals and create a personalized coaching plan.',
        'discord' => 'auce',
        'form_title' => 'Send Me a Message'
    )
);

// Try to load existing content
if (file_exists($content_file)) {
    $json = file_get_contents($content_file);
    if ($json) {
        $loaded = json_decode($json, true);
        if ($loaded) {
            $current = $loaded;
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Old World Coach - Admin</title>
    <style>
        body { font-family: Arial, sans-serif; background: #1f2937; color: white; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { color: #f59e0b; text-align: center; }
        .login-box { background: #374151; padding: 30px; border-radius: 10px; max-width: 400px; margin: 50px auto; }
        .admin-panel { background: #374151; padding: 30px; border-radius: 10px; }
        .section { margin: 30px 0; padding: 20px; background: #4b5563; border-radius: 8px; }
        .section h3 { color: #f59e0b; margin-top: 0; }
        label { display: block; margin: 10px 0 5px 0; color: #f59e0b; font-weight: bold; }
        input, textarea { width: 100%; padding: 10px; background: #6b7280; border: 1px solid #9ca3af; border-radius: 5px; color: white; box-sizing: border-box; }
        input:focus, textarea:focus { border-color: #f59e0b; outline: none; }
        textarea { height: 80px; resize: vertical; }
        .btn { background: #dc2626; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; }
        .btn:hover { background: #b91c1c; }
        .btn-secondary { background: #6b7280; margin-left: 10px; }
        .btn-secondary:hover { background: #4b5563; }
        .success { background: #065f46; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .error { background: #7f1d1d; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="container">
        <h1>Old World Coach - Admin Panel</h1>
        
        <?php if (!isset($_SESSION['admin_logged_in'])): ?>
            <div class="login-box">
                <h2 style="text-align: center; margin-bottom: 20px;">Login</h2>
                <?php if (isset($error)): ?>
                    <div class="error"><?php echo $error; ?></div>
                <?php endif; ?>
                <form method="POST">
                    <label>Password:</label>
                    <input type="password" name="password" required>
                    <br><br>
                    <button type="submit" name="login" class="btn" style="width: 100%;">Login</button>
                </form>
            </div>
        <?php else: ?>
            <div class="admin-panel">
                <div class="top-bar">
                    <h2>Content Management</h2>
                    <div>
                        <a href="../" target="_blank" class="btn" style="background: #f59e0b; color: #1f2937;">Preview Site</a>
                        <a href="?logout=1" class="btn btn-secondary">Logout</a>
                    </div>
                </div>
                
                <?php if ($success): ?>
                    <div class="success"><?php echo $success; ?></div>
                <?php endif; ?>
                <?php if (isset($error)): ?>
                    <div class="error"><?php echo $error; ?></div>
                <?php endif; ?>
                
                <form method="POST">
                    <div class="section">
                        <h3>Hero Section</h3>
                        <label>Main Title:</label>
                        <input type="text" name="hero_title" value="<?php echo htmlspecialchars($current['hero']['title']); ?>">
                        
                        <label>Subtitle:</label>
                        <textarea name="hero_subtitle"><?php echo htmlspecialchars($current['hero']['subtitle']); ?></textarea>
                        
                        <label>Button Text:</label>
                        <input type="text" name="hero_cta" value="<?php echo htmlspecialchars($current['hero']['cta_text']); ?>">
                    </div>
                    
                    <div class="section">
                        <h3>About Section</h3>
                        <div class="grid">
                            <div>
                                <label>Coach Name:</label>
                                <input type="text" name="about_name" value="<?php echo htmlspecialchars($current['about']['name']); ?>">
                            </div>
                            <div>
                                <label>Discord:</label>
                                <input type="text" name="about_discord" value="<?php echo htmlspecialchars($current['about']['discord']); ?>">
                            </div>
                        </div>
                        
                        <label>Section Title:</label>
                        <input type="text" name="about_title" value="<?php echo htmlspecialchars($current['about']['title']); ?>">
                        
                        <label>Description:</label>
                        <textarea name="about_desc"><?php echo htmlspecialchars($current['about']['description']); ?></textarea>
                        
                        <label>Extended Description:</label>
                        <textarea name="about_extended"><?php echo htmlspecialchars($current['about']['extended_description']); ?></textarea>
                    </div>
                    
                    <div class="section">
                        <h3>Services Section</h3>
                        <label>Section Title:</label>
                        <input type="text" name="services_title" value="<?php echo htmlspecialchars($current['services']['title']); ?>">
                        
                        <div class="grid">
                            <div>
                                <label>Beginner Title:</label>
                                <input type="text" name="services_beginner_title" value="<?php echo htmlspecialchars($current['services']['beginner_title']); ?>">
                                
                                <label>Beginner Subtitle:</label>
                                <input type="text" name="services_beginner_sub" value="<?php echo htmlspecialchars($current['services']['beginner_subtitle']); ?>">
                            </div>
                            <div>
                                <label>Competitive Title:</label>
                                <input type="text" name="services_comp_title" value="<?php echo htmlspecialchars($current['services']['competitive_title']); ?>">
                                
                                <label>Competitive Subtitle:</label>
                                <input type="text" name="services_comp_sub" value="<?php echo htmlspecialchars($current['services']['competitive_subtitle']); ?>">
                            </div>
                        </div>
                        
                        <label>Additional Info:</label>
                        <textarea name="services_additional"><?php echo htmlspecialchars($current['services']['additional_info']); ?></textarea>
                    </div>
                    
                    <div class="section">
                        <h3>Approach Section</h3>
                        <label>Section Title:</label>
                        <input type="text" name="approach_title" value="<?php echo htmlspecialchars($current['approach']['title']); ?>">
                        
                        <label>Introduction:</label>
                        <textarea name="approach_intro"><?php echo htmlspecialchars($current['approach']['intro']); ?></textarea>
                    </div>
                    
                    <div class="section">
                        <h3>Contact Section</h3>
                        <div class="grid">
                            <div>
                                <label>Section Title:</label>
                                <input type="text" name="contact_title" value="<?php echo htmlspecialchars($current['contact']['title']); ?>">
                            </div>
                            <div>
                                <label>Discord:</label>
                                <input type="text" name="contact_discord" value="<?php echo htmlspecialchars($current['contact']['discord']); ?>">
                            </div>
                        </div>
                        
                        <label>Subtitle:</label>
                        <textarea name="contact_subtitle"><?php echo htmlspecialchars($current['contact']['subtitle']); ?></textarea>
                        
                        <label>Form Title:</label>
                        <input type="text" name="contact_form_title" value="<?php echo htmlspecialchars($current['contact']['form_title']); ?>">
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <button type="submit" name="save" class="btn" style="font-size: 18px; padding: 15px 30px;">Save All Changes</button>
                    </div>
                </form>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>