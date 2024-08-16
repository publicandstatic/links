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


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var colors = ["#00bfcb", "#18d3bc", "#5b82c8", "#3396cf"];
var fps = 15;
var now;
var then = Date.now();
var num = 2;
var delta;
var tamanho = 50;
var ismobile = false;
var varpi = 2 * Math.PI;
var interval = 1000/fps;
var objforDraw = new Array();

document.addEventListener("DOMContentLoaded", function() {
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window
                .webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback,
                    1000 / fps)
            }
    })();
    window.cancelRequestAnimFrame = (function() {
        return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout
    })();
    var ShadowObject = function(color) {
        this.x = ((Math.random() * canvas.width) + 10);
        this.y = ((Math.random() * canvas.height) + 10);
        this.color = color;
        this.size = tamanho;
        this.dirX = Math.random() < 0.5 ? -1 : 1;
        this.dirY = Math.random() < 0.5 ? -1 : 1;
        this.checkIsOut = function() {
            if ((this.x > canvas.width + (this.size /
                2)) || (this.x < 0 - (this.size /
                2))) {
                this.dirX = this.dirX * -1
            };
            if ((this.y > canvas.height + (this.size /
                2)) || (this.y < 0 - (this.size /
                2))) {
                this.dirY = this.dirY * -1
            }
        };
        this.move = function() {

            this.x += this.dirX*2;
            this.y += this.dirY*2

        }
    };

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var len = objforDraw.length;
        for (i = 0; i < len; i++) {
            context.beginPath();
            context.arc(objforDraw[i].x, objforDraw[i].y, objforDraw[i].size, 0, varpi, false);
            context.fillStyle = objforDraw[i].color;
            context.shadowColor = objforDraw[i].color;
            if(ismobile == false){
                context.shadowBlur = 50;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
            context.fill();
            objforDraw[i].checkIsOut();
            objforDraw[i].move()
        }
    };

    function animloop() {
        requestAnimFrame(animloop);
        now = Date.now();
        delta = now - then;
        if (delta > interval) {
            draw();
            then = now - (delta % interval)
        }
    };
    document.body.onload = function(e) {
        for (i = 0; i < colors.length * num; i++) {
            var color = ((i >= colors.length) ? colors[(i -
                colors.length)] : colors[i]);
            objforDraw.push(new ShadowObject(color))
        };
        animloop()
    };
});