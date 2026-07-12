'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initializeCopyButtons();
    initializeLogoAnimation();
    initializeAccordions();
});

/**
 * Кнопки копіювання.
 */
function initializeCopyButtons() {
    setupCopyButton(
        'copy-email-btn',
        'publicandstatic@gmail.com',
        'Email скопійовано!'
    );

    setupCopyButton(
        'copy-nintendo-btn',
        'SW-4549-5995-6185',
        'Код друга скопійовано!'
    );
}

/**
 * Додає копіювання тексту для кнопки.
 */
function setupCopyButton(buttonId, value, successText) {
    const button = document.getElementById(buttonId);

    if (!button) {
        return;
    }

    const originalHtml = button.innerHTML;
    let resetTimer = null;

    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const copied = await copyText(value);

        if (!copied) {
            return;
        }

        clearTimeout(resetTimer);

        button.textContent = successText;

        resetTimer = window.setTimeout(() => {
            button.innerHTML = originalHtml;
        }, 1000);
    });
}

/**
 * Копіює текст через сучасний Clipboard API.
 * Старий метод використовується як резервний.
 */
async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(value);

            return true;
        } catch (error) {
            console.warn('Clipboard API не спрацював:', error);
        }
    }

    const textarea = document.createElement('textarea');

    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let copied = false;

    try {
        copied = document.execCommand('copy');
    } catch (error) {
        console.error('Не вдалося скопіювати текст:', error);
    }

    textarea.remove();

    return copied;
}

/**
 * Зміна логотипа при наведенні.
 */
function initializeLogoAnimation() {
    const logoElement = document.querySelector('.logo');

    if (!logoElement) {
        return;
    }

    /*
     * Не запускаємо логіку наведення на телефонах
     * і пристроях без миші.
     */
    const canHover = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    ).matches;

    if (!canHover) {
        return;
    }

    const logoChangeElements = document.querySelectorAll('.logo-change');
    const mainLogo = '/links/images/logos/logo_main.png';

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

    const imageCache = new Map();
    let currentRequestId = 0;

    function getRandomImage() {
        const index = Math.floor(Math.random() * images.length);

        return images[index];
    }

    function loadImage(src) {
        if (imageCache.has(src)) {
            return imageCache.get(src);
        }

        const promise = new Promise((resolve) => {
            const image = new Image();

            image.decoding = 'async';
            image.onload = resolve;
            image.onerror = resolve;
            image.src = src;
        });

        imageCache.set(src, promise);

        return promise;
    }

    async function setLogo(src) {
        const requestId = ++currentRequestId;

        await loadImage(src);

        /*
         * Не показуємо стару картинку, якщо користувач
         * уже навів курсор на інший елемент.
         */
        if (requestId !== currentRequestId) {
            return;
        }

        logoElement.style.backgroundImage = `url("${src}")`;
    }

    logoChangeElements.forEach((element) => {
        element.addEventListener('pointerenter', () => {
            setLogo(getRandomImage());
        });

        element.addEventListener('pointerleave', () => {
            setLogo(mainLogo);
        });
    });
}

/**
 * Акордеони.
 */
function initializeAccordions() {
    const names = document.querySelectorAll('.acc-name');

    names.forEach((nameElement) => {
        const bodyId = nameElement.getAttribute('aria-controls');

        if (!bodyId) {
            return;
        }

        const bodyElement = document.getElementById(bodyId);

        if (!bodyElement) {
            return;
        }

        nameElement.setAttribute('role', 'button');
        nameElement.setAttribute('tabindex', '0');

        const toggle = () => {
            const shouldOpen =
                !nameElement.classList.contains('open-name');

            bodyElement.classList.remove('hidden-load');

            nameElement.classList.toggle(
                'open-name',
                shouldOpen
            );

            nameElement.classList.toggle(
                'hidden-name',
                !shouldOpen
            );

            bodyElement.classList.toggle(
                'open-body',
                shouldOpen
            );

            bodyElement.classList.toggle(
                'hidden-body',
                !shouldOpen
            );

            nameElement.setAttribute(
                'aria-expanded',
                shouldOpen ? 'true' : 'false'
            );
        };

        nameElement.setAttribute(
            'aria-expanded',
            nameElement.classList.contains('open-name')
                ? 'true'
                : 'false'
        );

        nameElement.addEventListener('click', toggle);

        nameElement.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            event.preventDefault();
            toggle();
        });
    });
}