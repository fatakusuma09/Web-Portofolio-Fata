<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fatacio Naja - Portfolio</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" rel="stylesheet">

    <!-- Memanggil CSS dan JS menggunakan Vite -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <!-- Latar Belakang & Efek Blur Organik -->
    <div class="background-fx">
        <div class="blue-blob"></div>
    </div>

    <!-- Container WebGL (Three.js) -->
    <div id="canvas-container"></div>

    <!-- UI Overlay Layer -->
    <div id="ui-layer">
        
        <!-- Navbar Sesuai Referensi -->
        <nav class="navbar">
            <div class="logo">Fatacio Naja</div>
            <ul class="nav-links">
                <li><a href="#home" class="active">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#works">Works</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>

        <!-- Hero Section Sesuai Referensi -->
        <div class="hero-container">
            <div class="text-content">
                <h1 class="title">
                    Hi,<br>
                    I'm <span class="highlight">Fatacio</span><br>
                    Web Designer
                </h1>
                <button class="btn-cta">Contact</button>
                
                <div class="social-icons">
                    <a href="#">in</a>
                    <a href="#">Be</a>
                    <a href="#">GH</a>
                </div>
            </div>
        </div>

    </div>

    <!-- Section Skill Leveling -->
    <section id="skills-section">
        <div class="skills-container">
            <h2 class="section-title">My Skills</h2>
            <p class="section-subtitle">Here are some of the tools and software I specialize in.</p>

            <div class="skills-list">
                @php 
                    $skills = [
                        ['name' => 'Adobe Premiere', 'level' => 90], 
                        ['name' => 'Blender 3D', 'level' => 85], 
                        ['name' => 'UI/UX Figma', 'level' => 80],
                        ['name' => 'HTML & CSS', 'level' => 85]
                    ]; 
                @endphp

                @foreach($skills as $skill)
                <div class="skill-item">
                    <div class="skill-info">
                        <span class="skill-name">{{ $skill['name'] }}</span>
                        <span class="skill-percent">{{ $skill['level'] }}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: {{ $skill['level'] }}%;"></div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </section>
</body>
</html>
