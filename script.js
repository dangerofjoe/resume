document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight - 10;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const contactBtn = document.getElementById('contactBtn');
const contactBtnBottom = document.getElementById('contactBtnBottom');
const modal = document.getElementById('contactModal');
const closeModalBtn = document.getElementById('closeModal');

function openModal() {
    modal.showModal();
}
if (contactBtn) contactBtn.addEventListener('click', openModal);
if (contactBtnBottom) contactBtnBottom.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Отправка...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            alert('Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
            form.reset();
            modal.close();
        } else {
            alert('Ошибка при отправке. Пожалуйста, попробуйте позже.');
        }
    } catch (error) {
        alert('Ошибка сети. Проверьте соединение.');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
});

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.closest('li');
        const textSpan = parent.querySelector('.copy-text');
        if (textSpan) {
            const textToCopy = textSpan.getAttribute('data-copy') || textSpan.innerText;
            navigator.clipboard.writeText(textToCopy);
            alert('Скопировано: ' + textToCopy);
        }
    });
});