'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initializeCopyButtons();
    initializeLogoAnimation();
});

/**
 * Copy buttons: elements with data-copy="value" and data-copied="message".
 */
function initializeCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach((button) => {
        const value = button.dataset.copy;
        const successText = button.dataset.copied || 'Скопійовано!';
        const originalHtml = button.innerHTML;
        let resetTimer = null;

        button.addEventListener('click', async (event) => {
            event.preventDefault();

            if (!(await copyText(value))) {
                // Fall back to the link itself (e.g. mailto:) if copying fails.
                if (button.href) {
                    window.location.href = button.href;
                }
                return;
            }

            clearTimeout(resetTimer);
            button.textContent = successText;

            resetTimer = window.setTimeout(() => {
                button.innerHTML = originalHtml;
            }, 1000);
        });
    });
}

/**
 * Copies text with the Clipboard API, falls back to execCommand.
 */
async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(value);
            return true;
        } catch (error) {
            console.warn('Clipboard API failed:', error);
        }
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;left:-9999px;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();

    let copied = false;
    try {
        copied = document.execCommand('copy');
    } catch (error) {
        console.error('Copy failed:', error);
    }

    textarea.remove();
    return copied;
}

/**
 * Swaps the logo to a random emotion on hover (mouse devices only).
 */
function initializeLogoAnimation() {
    const logo = document.querySelector('.logo');

    if (!logo || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const base = 'images/logos/';
    const mainLogo = logo.getAttribute('src');
    const images = ['crazy', 'good', 'hm', 'nice', 'ohmy', 'ok', 'oyy', 'sad', 'serios', 'smile', 'yea', 'yyy'].map(
        (name) => `${base}logo_${name}.webp`
    );

    const cache = new Map();
    let requestId = 0;

    const load = (src) => {
        if (!cache.has(src)) {
            const image = new Image();
            image.src = src;
            cache.set(src, image.decode().catch(() => {}));
        }
        return cache.get(src);
    };

    const setLogo = async (src) => {
        const id = ++requestId;
        await load(src);

        // Ignore stale requests if the pointer already moved on.
        if (id === requestId) {
            logo.src = src;
        }
    };

    document.querySelectorAll('.btn, .acc > summary').forEach((element) => {
        element.addEventListener('pointerenter', () => {
            setLogo(images[Math.floor(Math.random() * images.length)]);
        });
        element.addEventListener('pointerleave', () => setLogo(mainLogo));
    });
}
