document.getElementById('copy-email-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const email = 'publicandstatic@gmail.com';

    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);

    const link = document.getElementById('copy-email-btn');
    const originalText = link.innerHTML;
    link.innerHTML = 'Email скопійовано!';

    setTimeout(function () {
        link.innerHTML = originalText;
    }, 1000);
});

document.getElementById('copy-nintendo-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const code = 'SW-4549-5995-6185';

    const tempInput = document.createElement('input');
    tempInput.value = code;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);

    const link = document.getElementById('copy-nintendo-btn');
    const originalText = link.innerHTML;
    link.innerHTML = 'Код друга скопійовано!';

    setTimeout(function () {
        link.innerHTML = originalText;
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
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

    images.forEach((image) => {
        const img = new Image();
        img.src = image;
    });

    let isAnimating = false;
    let nextImage = null;

    function getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    function playAnimation(image) {
        isAnimating = true;
        logoElement.style.backgroundImage = `url('${image}')`;
        setTimeout(() => {
            isAnimating = false;
            if (nextImage) {
                const imageToAnimate = nextImage;
                nextImage = null;
                playAnimation(imageToAnimate);
            }
        }, 200);
    }

    logoChangeElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            const newImage = getRandomImage();
            if (!isAnimating) {
                playAnimation(newImage);
            } else {
                nextImage = newImage;
            }
        });

        element.addEventListener('mouseleave', () => {
            if (!isAnimating) {
                playAnimation('/links/images/logos/logo_main.png');
            } else {
                nextImage = '/links/images/logos/logo_main.png';
            }
        });
    });
});

var canvas = document.getElementById('background-сanvas');
var context = canvas.getContext('2d');
var colors = ['#00bfcb', '#18d3bc', '#5b82c8', '#3396cf'];
var fps = 15;
var now;
var then = Date.now();
var num = 2;
var delta;
var tamanho = 50;
var ismobile = false;
var varpi = 2 * Math.PI;
var interval = 1000 / fps;
var objforDraw = new Array();

document.addEventListener('DOMContentLoaded', function () {
    window.requestAnimFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 1000 / fps);
            }
        );
    })();
    window.cancelRequestAnimFrame = (function () {
        return (
            window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout
        );
    })();
    var ShadowObject = function (color) {
        this.x = Math.random() * canvas.width + 10;
        this.y = Math.random() * canvas.height + 10;
        this.color = color;
        this.size = tamanho;
        this.dirX = Math.random() < 0.5 ? -1 : 1;
        this.dirY = Math.random() < 0.5 ? -1 : 1;
        this.checkIsOut = function () {
            if (this.x > canvas.width + this.size / 2 || this.x < 0 - this.size / 2) {
                this.dirX = this.dirX * -1;
            }
            if (this.y > canvas.height + this.size / 2 || this.y < 0 - this.size / 2) {
                this.dirY = this.dirY * -1;
            }
        };
        this.move = function () {
            this.x += this.dirX * 2;
            this.y += this.dirY * 2;
        };
    };

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var len = objforDraw.length;
        for (i = 0; i < len; i++) {
            context.beginPath();
            context.arc(objforDraw[i].x, objforDraw[i].y, objforDraw[i].size, 0, varpi, false);
            context.fillStyle = objforDraw[i].color;
            context.shadowColor = objforDraw[i].color;
            if (ismobile == false) {
                context.shadowBlur = 50;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            context.fill();
            objforDraw[i].checkIsOut();
            objforDraw[i].move();
        }
    }

    function animloop() {
        requestAnimFrame(animloop);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            draw();
            then = now - (delta % interval);
        }
    }
    document.body.onload = function (e) {
        for (i = 0; i < colors.length * num; i++) {
            var color = i >= colors.length ? colors[i - colors.length] : colors[i];
            objforDraw.push(new ShadowObject(color));
        }
        animloop();
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const names = document.querySelectorAll('.acc-name');

    names.forEach((nameEl) => {
        let bodyId = nameEl.getAttribute('aria-controls');
        if (!bodyId) {
            const id = nameEl.id || '';
            if (id && id.endsWith('Name')) bodyId = id.replace(/Name$/, 'Body');
            if (bodyId) nameEl.setAttribute('aria-controls', bodyId);
        }
        const bodyEl = bodyId ? document.getElementById(bodyId) : null;
        if (!bodyEl) return;

        nameEl.setAttribute('role', 'button');
        nameEl.setAttribute('tabindex', '0');
        syncAria(nameEl);

        const toggle = () => {
            nameEl.classList.toggle('hidden-name');
            nameEl.classList.toggle('open-name');

            bodyEl.classList.toggle('hidden-body');
            bodyEl.classList.toggle('open-body');

            syncAria(nameEl);
        };

        nameEl.addEventListener('click', toggle);
        nameEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        });
    });

    function syncAria(nameEl) {
        const expanded = nameEl.classList.contains('open-name');
        nameEl.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }
});

(() => {
    const CONFIG = {
        baseDelay: 200,
        stagger: 120,
        targets: [
            { id: 'mainActivityName', remove: 'hidden-name', add: 'open-name' },
            { id: 'mainActivityBody', remove: 'hidden-body', add: 'open-body' },
            { id: 'supportName', remove: 'hidden-name', add: 'open-name' },
            { id: 'supportBody', remove: 'hidden-body', add: 'open-body' },
            { id: 'contactsName', remove: 'hidden-name', add: 'open-name' },
            { id: 'contactsBody', remove: 'hidden-body', add: 'open-body' },
        ],
    };

    const revealOne = (t) => {
        const el = document.getElementById(t.id);
        if (!el) return;
        el.classList.remove(t.remove);
        el.classList.add(t.add);
    };

    const revealAll = () => {
        CONFIG.targets.forEach((t, i) => {
            setTimeout(() => revealOne(t), CONFIG.baseDelay + i * CONFIG.stagger);
        });
    };

    const handler = (e) => {
        if (e.type === 'pageshow' && !e.persisted) return;
        requestAnimationFrame(() => requestAnimationFrame(revealAll));
    };

    window.addEventListener('load', handler, { once: true });
    window.addEventListener('pageshow', handler);
})();
