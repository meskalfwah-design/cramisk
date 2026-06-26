/* ============================================
   CARAMISC - Main JS (Particles + Shared)
   ============================================ */

(function() {
    'use strict';

    // ============ Particles ============
    var particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        var ctx = particleCanvas.getContext('2d');
        var particles = [];
        var animId = null;

        function resizeCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function Particle() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = Math.random() * 0.25 + 0.12;
            this.alpha = Math.random() * 0.35 + 0.08;
        }
        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y > particleCanvas.height) { this.y = -8; this.x = Math.random() * particleCanvas.width; }
            if (this.x < 0) this.x = particleCanvas.width;
            if (this.x > particleCanvas.width) this.x = 0;
        };
        Particle.prototype.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212,175,55,' + this.alpha + ')';
            ctx.fill();
        };

        for (var i = 0; i < 55; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            particles.forEach(function(p) { p.update(); p.draw(); });
            animId = requestAnimationFrame(animateParticles);
        }

        document.addEventListener('visibilitychange', function() {
            if (document.hidden && animId) {
                cancelAnimationFrame(animId);
                animId = null;
            } else if (!document.hidden && !animId) {
                animateParticles();
            }
        });
        animateParticles();
    }

    console.log('✅ CARAMISC Main JS loaded');
})();
