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

function showToastMsg(text, duration = 3000) {
    const toast = document.getElementById('toastMsg');
    if (!toast) {
        const newToast = document.createElement('footer');
        newToast.id = 'toastMsg';
        newToast.className = 'toast';
        document.body.appendChild(newToast);
    }
    const toastEl = document.getElementById('toastMsg');
    if (toastEl) {
        toastEl.textContent = text;
        toastEl.classList.add('show');
        setTimeout(() => toastEl.classList.remove('show'), duration);
    }
}

function createCalculator() {
    const oldModal = document.querySelector('.calculator-modal');
    if (oldModal) oldModal.remove();
    
    const modal = document.createElement('article');
    modal.className = 'glass-card calculator-modal';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '340px';
    modal.style.padding = '20px';
    modal.style.zIndex = '1000';
    modal.style.backgroundColor = '#1a2a3a';
    modal.style.borderRadius = '24px';
    modal.style.border = '2px solid #00d4ff';
    
    modal.innerHTML = `
        <h3 style="color: #00d4ff; margin: 0 0 15px 0; text-align: center;">🧮 Калькулятор</h3>
        <input type="text" id="calcDisplay" style="width: 100%; padding: 15px; font-size: 1.5rem; background: #0a1428; color: #00d4ff; border: 1px solid #00d4ff; border-radius: 12px; margin-bottom: 15px; text-align: right; font-family: monospace;" readonly>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
            <button class="calc-key" data-val="7" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">7</button>
            <button class="calc-key" data-val="8" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">8</button>
            <button class="calc-key" data-val="9" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">9</button>
            <button class="calc-key" data-val="/" style="padding: 12px; font-size: 1.2rem; background: #ff8c00; border: none; border-radius: 10px; color: white; cursor: pointer;">÷</button>
            
            <button class="calc-key" data-val="4" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">4</button>
            <button class="calc-key" data-val="5" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">5</button>
            <button class="calc-key" data-val="6" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">6</button>
            <button class="calc-key" data-val="*" style="padding: 12px; font-size: 1.2rem; background: #ff8c00; border: none; border-radius: 10px; color: white; cursor: pointer;">×</button>
            
            <button class="calc-key" data-val="1" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">1</button>
            <button class="calc-key" data-val="2" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">2</button>
            <button class="calc-key" data-val="3" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">3</button>
            <button class="calc-key" data-val="-" style="padding: 12px; font-size: 1.2rem; background: #ff8c00; border: none; border-radius: 10px; color: white; cursor: pointer;">-</button>
            
            <button class="calc-key" data-val="0" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">0</button>
            <button class="calc-key" data-val="." style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">.</button>
            <button class="calc-key" data-val="C" style="padding: 12px; font-size: 1.2rem; background: #e74c3c; border: none; border-radius: 10px; color: white; cursor: pointer;">C</button>
            <button class="calc-key" data-val="+" style="padding: 12px; font-size: 1.2rem; background: #ff8c00; border: none; border-radius: 10px; color: white; cursor: pointer;">+</button>
            
            <button class="calc-key" data-val="(" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">(</button>
            <button class="calc-key" data-val=")" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">)</button>
            <button class="calc-key" data-val="%" style="padding: 12px; font-size: 1.2rem; background: #2a3a4a; border: none; border-radius: 10px; color: white; cursor: pointer;">%</button>
            <button class="calc-key" data-val="=" style="padding: 12px; font-size: 1.2rem; background: #27ae60; border: none; border-radius: 10px; color: white; cursor: pointer;">=</button>
        </div>
        <button id="closeCalcModal" style="margin-top: 15px; width: 100%; padding: 10px; background: #6c9eff; border: none; border-radius: 12px; color: white; cursor: pointer; font-size: 1rem;">✖ Закрыть</button>
    `;
    
    document.body.appendChild(modal);
    
    const display = modal.querySelector('#calcDisplay');
    let expr = '';
    
    function updateDisplay() {
        display.value = expr || '0';
    }
    
    function calculateResult() {
        try {
            let toCalc = expr.replace(/×/g, '*');
            let result = Function('"use strict";return (' + toCalc + ')')();
            expr = String(result);
            updateDisplay();
            showToastMsg(`✅ Результат: ${result}`, 3000);
        } catch(e) {
            showToastMsg('❌ Ошибка в выражении', 2000);
            expr = '';
            updateDisplay();
        }
    }
    
    modal.querySelectorAll('.calc-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            if (val === 'C') {
                expr = '';
            } else if (val === '=') {
                calculateResult();
                return;
            } else {
                expr += val;
            }
            updateDisplay();
        });
    });
    
    modal.querySelector('#closeCalcModal').addEventListener('click', () => {
        modal.remove();
    });
}

function initCalculatorWidget() {
    let calcBtn = document.getElementById('calcWidget');
    if (!calcBtn) {
        const widgets = document.querySelector('.widgets');
        if (widgets) {
            calcBtn = document.createElement('article');
            calcBtn.className = 'widget';
            calcBtn.id = 'calcWidget';
            calcBtn.innerHTML = '<i class="fas fa-calculator"></i><footer>Калькулятор</footer>';
            calcBtn.style.cursor = 'pointer';
            widgets.appendChild(calcBtn);
        }
    }
    if (calcBtn) {
        calcBtn.addEventListener('click', createCalculator);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculatorWidget);
} else {
    initCalculatorWidget();
}