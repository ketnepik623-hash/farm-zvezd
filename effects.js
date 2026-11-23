/* effects.js — эффекты поверх сайта farm-zvezd. Разметку и тексты не меняет. */
(function () {
  var css = `
@keyframes fxAurora{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
@keyframes fxSpin{to{transform:rotate(360deg)}}
@keyframes fxIn{from{opacity:0;transform:translateY(30px) scale(.97)}to{opacity:1;transform:none}}
/* переливающийся фиолетово-белый фон */
.page::before{content:"";position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:.8;
 background:linear-gradient(115deg,rgba(124,58,237,.4),rgba(255,255,255,.14),rgba(192,132,252,.4),rgba(255,255,255,.12),rgba(124,58,237,.4));
 background-size:300% 300%;animation:fxAurora 14s ease-in-out infinite}
/* переливающиеся заголовки и кнопки */
.shine{background-image:linear-gradient(90deg,#fff,#c4b5fd,#8b5cf6,#fff,#c4b5fd)!important}
.btn{background-image:linear-gradient(110deg,#8b5cf6,#ece3ff,#a78bfa,#fff,#8b5cf6)!important;background-size:250% 100%!important;animation:shimmer 5s linear infinite}
.btn:hover{box-shadow:0 0 0 3px rgba(255,255,255,.25),0 16px 40px -8px rgba(192,132,252,.9)!important}
/* круто светящаяся ава */
.av::before{content:"";position:absolute;inset:-7px;border-radius:50%;background:conic-gradient(#fff,#8b5cf6,#ece3ff,#c026d3,#fff);animation:fxSpin 6s linear infinite}
.av::after{content:"";position:absolute;inset:-7px;border-radius:50%;box-shadow:0 0 40px 6px rgba(192,132,252,.65),0 0 90px rgba(255,255,255,.25);pointer-events:none}
.av div.m{box-shadow:0 0 0 4px #1a0e32}
/* подсветка карточек за курсором */
.perk,.stepc{position:relative;overflow:hidden}
.perk::after,.stepc::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .25s;
 background:radial-gradient(260px circle at var(--mx,50%) var(--my,0%),rgba(255,255,255,.18),transparent 60%)}
.perk:hover::after,.stepc:hover::after{opacity:1}
.fx-h{opacity:0}.fx-in{animation:fxIn .8s cubic-bezier(.2,.7,.2,1) both}
/* новые кнопки */
.fx-g{display:inline-flex;align-items:center;justify-content:center;min-height:52px;padding:0 24px;border-radius:16px;font:700 16px Manrope,system-ui,sans-serif;color:#f4ecff!important;text-decoration:none;cursor:pointer;
 background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:transform .2s,box-shadow .2s,background .2s}
.fx-g:hover{transform:translateY(-3px);background:rgba(255,255,255,.18);box-shadow:0 12px 30px -8px rgba(192,132,252,.8)}
.fx-g:focus-visible,.fx-d:focus-visible{outline:3px solid #fff;outline-offset:3px}
/* прогресс прокрутки и кнопки справа */
#fx-bar{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,#fff,#a78bfa,#f0abfc);z-index:50}
#fx-dock{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;gap:10px;z-index:50}
.fx-d{width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:linear-gradient(135deg,#7c3aed,#c084fc);color:#fff;font-size:22px;cursor:pointer;box-shadow:0 10px 28px -6px rgba(124,58,237,.8);transition:transform .2s}
.fx-d:hover{transform:scale(1.1)}
.fx-d[aria-pressed=true]{background:linear-gradient(135deg,#fff,#c4b5fd);color:#4c1d95}
#fx-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#fff;color:#2b0f6b;font:700 15px Manrope,sans-serif;padding:10px 18px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .3s;z-index:60}
#fx-toast.on{opacity:1}
@media (prefers-reduced-motion:reduce){.fx-h{opacity:1}}
`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function q(s) { return document.querySelector(s); }
  function el(tag, attrs, html) { var e = document.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (html) e.innerHTML = html; return e; }

  // тост
  var toast = el('div', { id: 'fx-toast', role: 'status' }); document.body.appendChild(toast);
  var tt; function say(m) { toast.textContent = m; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, 1800); }

  // дополнительные кнопки в первом экране и у менеджера
  var row = q('.buyrow');
  if (row) {
    row.appendChild(el('a', { class: 'fx-g', href: '#how' }, 'Как купить'));
    row.appendChild(el('a', { class: 'fx-g', href: '#manager' }, 'Менеджер'));
  }
  var acts = document.querySelector('#manager .acts');
  if (acts) {
    var cp = el('button', { class: 'fx-g', type: 'button' }, 'Скопировать @lanehi');
    cp.onclick = function () {
      try { navigator.clipboard.writeText('@lanehi').then(function () { say('Скопировано: @lanehi'); }, function () { say('@lanehi'); }); } catch (e) { say('@lanehi'); }
    };
    acts.appendChild(cp);
    acts.appendChild(el('a', { class: 'fx-g', href: 'https://t.me/lanehi', target: '_blank', rel: 'noopener' }, 'Вопрос по оплате'));
  }

  // правая панель: музыка и «наверх»
  var dock = el('div', { id: 'fx-dock' });
  var mus = el('button', { class: 'fx-d', type: 'button', 'aria-label': 'Включить музыку', 'aria-pressed': 'false' }, '♪');
  var up = el('button', { class: 'fx-d', type: 'button', 'aria-label': 'Наверх' }, '↑');
  up.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  dock.appendChild(up); dock.appendChild(mus); document.body.appendChild(dock);

  // спокойная музыка (генерируется в браузере)
  var ctx, master, on = false, osc = [];
  function play() {
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) { say('Аудио не поддерживается'); return false; }
    ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.connect(master);
    var dl = ctx.createDelay(2); dl.delayTime.value = .9; var fb = ctx.createGain(); fb.gain.value = .45;
    dl.connect(fb); fb.connect(dl); dl.connect(master); lp.connect(dl);
    var ch = [[110, 164.8, 220, 277.2], [87.3, 130.8, 174.6, 220], [98, 146.8, 196, 246.9], [110, 164.8, 207.7, 246.9]];
    osc = [];
    ch.forEach(function (c, ci) {
      c.forEach(function (f, i) {
        var o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 4;
        var g = ctx.createGain(); g.gain.value = 0; o.connect(g); g.connect(lp); o.start(); osc.push(o);
        (function swell() {
          var t = ctx.currentTime + ci * 8;
          g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + 4); g.gain.linearRampToValueAtTime(0, t + 8);
          setTimeout(function () { if (on) swell(); }, 32000);
        })();
      });
    });
    master.gain.linearRampToValueAtTime(.9, ctx.currentTime + 2);
    return true;
  }
  function halt() {
    master.gain.cancelScheduledValues(ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + .6);
    var old = osc; osc = []; setTimeout(function () { old.forEach(function (o) { try { o.stop(); } catch (e) {} }); }, 700);
  }
  mus.onclick = function () {
    if (!on) { if (play() === false) return; on = true; mus.setAttribute('aria-pressed', 'true'); mus.textContent = '❚❚'; mus.setAttribute('aria-label', 'Выключить музыку'); }
    else { on = false; halt(); mus.setAttribute('aria-pressed', 'false'); mus.textContent = '♪'; mus.setAttribute('aria-label', 'Включить музыку'); }
  };

  // прогресс прокрутки
  var bar = el('div', { id: 'fx-bar' }); document.body.appendChild(bar);
  function prog() { var h = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')'; }
  addEventListener('scroll', prog, { passive: true }); prog();

  // подсветка карточек за курсором и искры по клику
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.perk,.stepc'); if (!c) return;
    var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  document.addEventListener('pointerdown', function (e) {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    for (var i = 0; i < 6; i++) {
      var s = el('span', {}, '✦'); var a = Math.random() * 6.28, d = 30 + Math.random() * 40;
      s.style.cssText = 'position:fixed;left:' + e.clientX + 'px;top:' + e.clientY + 'px;color:' + (i % 2 ? '#fff' : '#c4b5fd') + ';font-size:' + (10 + Math.random() * 10) + 'px;pointer-events:none;z-index:70';
      document.body.appendChild(s);
      s.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: 'translate(' + Math.cos(a) * d + 'px,' + Math.sin(a) * d + 'px) scale(.2)', opacity: 0 }], { duration: 700, easing: 'ease-out' }).onfinish = (function (n) { return function () { n.remove(); }; })(s);
    }
  });

  // плавное появление блоков при прокрутке
  var items = document.querySelectorAll('.perk,.stepc,.owner');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('fx-in'); io.unobserve(x.target); } });
    }, { threshold: .15 });
    items.forEach(function (n) { n.classList.add('fx-h'); io.observe(n); });
  }
})();
