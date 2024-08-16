document.getElementById('copy-email-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Зупиняємо відкриття поштового клієнта

    // Текст для копіювання
    const email = 'publicandstatic@gmail.com';

    // Створюємо тимчасовий текстовий елемент для копіювання
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);

    // Виділяємо та копіюємо текст
    tempInput.select();
    document.execCommand('copy');

    // Видаляємо тимчасовий текстовий елемент
    document.body.removeChild(tempInput);

    // Змінюємо текст посилання
    const link = document.getElementById('copy-email-btn');
    const originalText = link.innerHTML;
    link.innerHTML = 'Email скопійовано!';

    // Повертаємо оригінальний текст через 2 секунди
    setTimeout(function() {
        link.innerHTML = originalText;
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const logoElement = document.querySelector('.logo');
    const logoChangeElements = document.querySelectorAll('.logo-change');
    const images = [
        '/links/images/logos/logo_crazy.png',
        '/links/images/logos/logo_good.png',
        '/links/images/logos/logo_hm.png',
        '/links/images/logos/logo_nice.png',
        '/links/images/logos/logo_ohmy.png',
        '/links/images/logos/logo_ok.png',
        '/links/images/logos/logo_oyy.png',
        '/links/images/logos/logo_sad.png',
        '/links/images/logos/logo_serios.png',
        '/links/images/logos/logo_smile.png',
        '/links/images/logos/logo_yea.png',
        '/links/images/logos/logo_yyy.png',
    ];

    function getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    logoChangeElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            logoElement.style.backgroundImage = `url('${getRandomImage()}')`;
        });

        element.addEventListener('mouseleave', () => {
            logoElement.style.backgroundImage = `url('/links/images/logos/logo_main.png')`;
        });
    });
});