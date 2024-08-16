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
    link.innerHTML = 'Email скопійовано';

    // Повертаємо оригінальний текст через 2 секунди
    setTimeout(function() {
        link.innerHTML = originalText;
    }, 1000);
});