(function() {
    const preloader = document.getElementById('preloader');
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1500);

    function showToast(text, duration = 3000) {
        const toast = document.getElementById('toastMsg');
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }

    function setupCopyButton(selector, textToCopy, successMessage) {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(textToCopy);
                showToast(successMessage, 2000);
            });
        }
    }

    setupCopyButton('.copy-email', 'gosha.top2010@gmail.com', '📧 Email скопирован!');
    setupCopyButton('.copy-github', 'https://github.com/dangerofjoe', '🐙 GitHub скопирован!');
    setupCopyButton('.copy-telegram', '@dangerofjoe', '📱 Telegram скопирован!');

    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('gosha.top2010@gmail.com');
            showToast('📧 Email скопирован в буфер обмена!', 2500);
        });
    }

    const calcWidget = document.getElementById('calcWidget');
    if (calcWidget) {
        calcWidget.addEventListener('click', () => {
            let expr = prompt('🧮 Простой калькулятор\nВведите выражение (например, 15 + 30):', '10 + 20');
            if (expr) {
                try {
                    let result = Function('"use strict";return (' + expr + ')')();
                    showToast(`Результат: ${result}`, 5000);
                } catch(e) {
                    showToast('Ошибка в выражении', 2000);
                }
            }
        });
    }

    let audio = null;
    let isPlaying = false;
    const musicWidget = document.getElementById('musicWidget');
    if (musicWidget) {
        musicWidget.addEventListener('click', () => {
            const modal = document.createElement('article');
            modal.className = 'glass-card';
            modal.style.position = 'fixed';
            modal.style.bottom = '50%';
            modal.style.left = '50%';
            modal.style.transform = 'translate(-50%, -50%)';
            modal.style.width = '280px';
            modal.style.padding = '20px';
            modal.style.zIndex = '1000';
            modal.style.textAlign = 'center';
            modal.innerHTML = `
                <section class="music-player">
                    <i class="fas fa-headphones" style="font-size: 2.5rem; color: #00d4ff; margin-bottom: 10px; display: block;"></i>
                    <footer class="music-controls">
                        <button id="playPauseBtn">▶ Воспроизвести</button>
                        <button id="closeMusicBtn">✖ Закрыть</button>
                    </footer>
                </section>
            `;
            document.body.appendChild(modal);
            if (!audio) {
                audio = new Audio('song.mp3');
                audio.loop = true;
            }
            const playBtn = modal.querySelector('#playPauseBtn');
            const closeBtn = modal.querySelector('#closeMusicBtn');
            playBtn.addEventListener('click', () => {
                if (!isPlaying) {
                    audio.play().then(() => {
                        isPlaying = true;
                        playBtn.innerHTML = '⏸ Пауза';
                        showToast('🎵 Музыка играет', 1500);
                    }).catch(() => showToast('Не удалось запустить музыку', 1500));
                } else {
                    audio.pause();
                    isPlaying = false;
                    playBtn.innerHTML = '▶ Воспроизвести';
                    showToast('⏸ Музыка остановлена', 1500);
                }
            });
            closeBtn.addEventListener('click', () => {
                if (audio && isPlaying) audio.pause();
                isPlaying = false;
                modal.remove();
            });
        });
    }

    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        weatherWidget.addEventListener('click', async () => {
            showToast('🌤 Загрузка погоды...', 1500);
            try {
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=58.5214&longitude=31.2755&current_weather=true');
                const data = await response.json();
                if (data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const code = data.current_weather.weathercode;
                    let condition = '';
                    if (code === 0) condition = '☀️ Ясно';
                    else if (code === 1 || code === 2) condition = '⛅ Облачно';
                    else if (code === 3) condition = '☁️ Пасмурно';
                    else if (code >= 51 && code <= 67) condition = '🌧 Дождь';
                    else if (code >= 71 && code <= 77) condition = '❄️ Снег';
                    else condition = '🌡️ ' + temp + '°C';
                    showToast(`📍 Великий Новгород: ${temp}°C, ${condition}`, 5000);
                } else {
                    showToast('Не удалось получить данные', 2000);
                }
            } catch {
                showToast('Ошибка загрузки погоды', 2000);
            }
        });
    }

    const avatar = document.getElementById('mainAvatar');
    if (avatar) {
        avatar.addEventListener('click', () => {
            avatar.classList.add('avatar-click');
            showToast('🚀 Привет! Ты нажал на аватарку!', 1500);
            setTimeout(() => avatar.classList.remove('avatar-click'), 200);
        });
    }

    const bubbleBtn = document.getElementById('bubbleBtn');
    if (bubbleBtn) {
        bubbleBtn.addEventListener('click', () => {
            const messages = ['👾 Привет!', '💻 Крутое портфолио!', '🎨 Отличный дизайн!', '🚀 Жми на фишки!', '✨ Успехов в IT!'];
            const msg = messages[Math.floor(Math.random() * messages.length)];
            showToast(msg, 3000);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const msg = document.getElementById('messageInput')?.value;
            if (msg && msg.trim()) {
                navigator.clipboard.writeText(msg);
                showToast('💬 Сообщение скопировано в буфер обмена!', 3000);
                document.getElementById('messageInput').value = '';
            } else {
                showToast('✏️ Введите сообщение', 2000);
            }
        });
    }

    let isDark = true;
    const themeBtn = document.getElementById('themeToggle');
    function setTheme(theme) {
        if (theme === 'light') {
            document.body.style.background = 'radial-gradient(circle at 10% 20%, #eef2f7 0%, #d9e0e8 100%)';
            document.body.style.color = '#1a2c3e';
            document.querySelectorAll('.glass-card, section, .widget, .project-card').forEach(el => {
                el.style.background = 'rgba(255, 255, 255, 0.75)';
            });
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.style.background = 'radial-gradient(circle at 10% 20%, #0a1428 0%, #050a14 100%)';
            document.body.style.color = '#eef5ff';
            document.querySelectorAll('.glass-card, section, .widget, .project-card').forEach(el => {
                el.style.background = 'rgba(20, 30, 45, 0.55)';
            });
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    }
    const saved = localStorage.getItem('theme');
    if (saved === 'light') setTheme('light');
    else setTheme('dark');
    themeBtn?.addEventListener('click', () => {
        isDark = !isDark;
        setTheme(isDark ? 'dark' : 'light');
    });

    setTimeout(() => showToast('✨ Добро пожаловать! ✨', 2500), 800);
})();
