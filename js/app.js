/* =====================================================================
   宝贝背单词小助手 · 应用逻辑
   学（看+听）→ 读（录音打分）→ 拼（填空 / 组合）
   遗忘曲线复习 + 数字面板 + 词库配对游戏 + 错题库
   ===================================================================== */
(function () {
  'use strict';

  var D = window.PWData;
  var WORDS = D.WORDS, byId = D.byId, LEVEL_META = D.LEVEL_META, BANK_META = D.BANK_META;

  /* ============ 存储 ============ */
  var K = { cfg: 'pw_cfg_v1', prog: 'pw_prog_v1', plan: 'pw_plan_v1', hist: 'pw_hist_v1', wrong: 'pw_wrong_v1' };
  var BANK_IDS = ['c1', 'c2', 'c3', 'ket', 'pet'];
  var DEFAULT_CFG = {
    name: 'Buddy', daily: 8, mode: 'en', voice: '', rate: 0.85, ex: true,
    levels: [2, 3, 4, 5], banks: BANK_IDS.slice(),
    alpha: true, wordfont: 'play', sound: true, spellMode: 'auto'
  };
  function read(key, def) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var S = {
    cfg: Object.assign({}, DEFAULT_CFG, read(K.cfg, {})),
    prog: read(K.prog, {}),
    plan: read(K.plan, null),
    hist: read(K.hist, {}),
    wrong: read(K.wrong, {}),
    tab: 'dash',
    dashDate: todayStr(),
    cal: null,
    lrn: { q: [], i: 0, step: 0, tries: 0, pz: null, rec: null, score: null, transcript: '', srdone: false },
    m: { bank: 'today', game: 'match', left: [], right: [], selL: null, selR: null, done: 0, wrong: 0, total: 0, busy: false, finished: false },
    sp: { q: [], i: 0, pz: null, done: 0, wrong: 0, finished: false },
    eff: 'phone'
  };
  if (!S.cfg.levels || !S.cfg.levels.length) S.cfg.levels = [2, 3, 4, 5];
  if (!S.cfg.banks) S.cfg.banks = BANK_IDS.slice();
  /* 单词 → 所属剑桥词库列表（可能同时属于多个库，如 c1⊂c2⊂c3） */
  var BANK_OF = {}, BANKS_OF = {};
  (function () {
    var BB = window.PWBanks || {};
    BANK_IDS.forEach(function (b) {
      (BB[b] || []).forEach(function (w) {
        (BANKS_OF[w] = BANKS_OF[w] || []).push(b);
      });
    });
    Object.keys(BANKS_OF).forEach(function (w) { BANK_OF[w] = BANKS_OF[w][0]; });
  })();
  /* 这个词归给「第一个已开启」的词库，避免跨库重复 */
  function ownerBank(id) {
    var l = BANKS_OF[id] || [];
    for (var i = 0; i < l.length; i++) if (S.cfg.banks.indexOf(l[i]) >= 0) return l[i];
    return null;
  }

  /* ============ 日期工具 ============ */
  function todayStr(d) {
    var t = d || new Date();
    return t.getFullYear() + '-' + pad(t.getMonth() + 1) + '-' + pad(t.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dateAdd(dateStr, days) {
    var p = dateStr.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + days);
    return todayStr(d);
  }
  function diffDays(a, b) {
    var pa = a.split('-'), pb = b.split('-');
    var da = new Date(+pa[0], +pa[1] - 1, +pa[2]), db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
    return Math.round((db - da) / 86400000);
  }
  var WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var INTERVALS = [1, 2, 4, 7, 15, 30, 60];

  /* ============ 小工具 ============ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = rnd(i + 1); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function disp(ch) { return (S.cfg.alpha && ch === 'a') ? 'ɑ' : ch; }
  function lettersHTML(w, cls) {
    var out = '';
    for (var i = 0; i < w.w.length; i++) {
      var hl = w.h.indexOf(i) >= 0;
      out += '<span class="ltr' + (hl ? ' hl' : '') + '">' + esc(disp(w.w[i])) + '</span>';
    }
    return '<span class="' + (cls || 'word-big') + '">' + out + '</span>';
  }
  var ACCENTS = [
    ['#B6F04A', '#7BE8C6'], ['#FFD84D', '#FFA45C'], ['#7BE8C6', '#22D3EE'],
    ['#FFB3C8', '#FF8FB1'], ['#C9BCFF', '#B39DFF'], ['#A9E8FF', '#7BC8FF'],
    ['#FFE9A8', '#FFC46B'], ['#BDF5E4', '#7BE8C6']
  ];
  function accent(w) { var i = (w && typeof w.i === 'number') ? w.i : 0; return ACCENTS[Math.abs(i) % ACCENTS.length]; }
  /* 少数单词用 emoji 表达不准确（如 lake 没有专用 emoji）→ 用内联小插画代替 */
  var PIC_ART = {
    lake: '<svg class="pic-svg" viewBox="0 0 120 120" aria-hidden="true">' +
      '<rect width="120" height="120" rx="18" fill="#CFEFFF"/>' +
      '<circle cx="89" cy="27" r="12" fill="#FFD84D"/>' +
      '<path d="M2 70 L28 42 L54 70 Z" fill="#8FD98E"/>' +
      '<path d="M44 70 L70 38 L100 70 Z" fill="#5CB76F"/>' +
      '<path d="M0 70 H120 V102 A18 18 0 0 1 102 120 H18 A18 18 0 0 1 0 102 Z" fill="#58C6EF"/>' +
      '<path d="M0 70 q30 8 60 0 t60 0 v9 q-30 8 -60 0 t-60 0 Z" fill="#8FE0FF"/>' +
      '<path d="M20 93 q8 5 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M74 105 q8 5 16 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M48 85 q7 4 14 0" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '</svg>',
    /* curtain 没有对应的 emoji → 手绘一幅小窗帘 */
    curtain: '<svg class="pic-svg" viewBox="0 0 120 120" aria-hidden="true">' +
      '<rect width="120" height="120" rx="18" fill="#FFF7DE"/>' +
      '<rect x="30" y="30" width="60" height="66" rx="6" fill="#BEE9FF"/>' +
      '<circle cx="46" cy="52" r="9" fill="#FFD84D"/>' +
      '<rect x="22" y="22" width="76" height="9" rx="4.5" fill="#8A6B4F"/>' +
      '<circle cx="30" cy="26.5" r="3" fill="#5F4633"/><circle cx="60" cy="26.5" r="3" fill="#5F4633"/><circle cx="90" cy="26.5" r="3" fill="#5F4633"/>' +
      '<path d="M20 31 Q26 60 22 100 L44 100 Q40 62 44 31 Q32 24 20 31 Z" fill="#F26D6D"/>' +
      '<path d="M100 31 Q94 60 98 100 L76 100 Q80 62 76 31 Q88 24 100 31 Z" fill="#F26D6D"/>' +
      '<path d="M28 34 Q32 62 30 96" stroke="#D94F4F" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M92 34 Q88 62 90 96" stroke="#D94F4F" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg>'
  };
  /* 取一个词的“图片”：优先自定义插画 → 自带 emoji → 剑桥词库映射的 emoji（入参可为 word 对象或 id） */
  function picVisual(w) {
    var key = (typeof w === 'string') ? w : ((w && w.w) || '');
    if (key && PIC_ART[key]) return PIC_ART[key];
    var e = (w && typeof w === 'object' && w.e) ? w.e : '';
    if (!e && key && window.PWBanks && window.PWBanks.words[key]) e = window.PWBanks.words[key][2] || '';
    return e || (w && typeof w === 'object' ? '⭐' : '🔤');
  }
  /* 这个词有没有“像样的图片”（没有就别进拼写游戏，免得出现 ABC 占位） */
  function hasPic(id) {
    if (PIC_ART[id]) return true;
    var it = byId[id];
    if (it && it.e) return true;
    var b = window.PWBanks && window.PWBanks.words[id];
    return !!(b && b[2]);
  }
  function picCard(w, extraCls) {
    var a = accent(w);
    return '<div class="pic-card ' + (extraCls || '') + '" style="--a:' + a[0] + ';--b:' + a[1] + '">' +
      '<span class="emo">' + picVisual(w) + '</span>' +
      '<button class="spk" data-act="speak" data-text="' + esc(w.w) + '" aria-label="read">🔊</button>' +
      '</div>';
  }
  function defHTML(w) {
    return '<div class="def-box"><div class="dline"><span class="k">EN</span><span>' + esc(w.d) + '</span></div></div>';
  }
  function exHTML(w) {
    if (!S.cfg.ex || !w.x) return '';
    return '<div class="ex-box">' +
      '<div class="e-en"><button class="spk-line" data-act="speak" data-text="' + esc(w.x) + '">🔊</button><span>' + esc(w.x) + '</span></div></div>';
  }
  function wordCardHTML(w, opts) {
    opts = opts || {};
    return '<div class="wcard">' +
      '<div class="wc-pic" style="--a:' + accent(w)[0] + ';--b:' + accent(w)[1] + '">' + picVisual(w) + '</div>' +
      '<div class="wc-main">' +
        '<div class="wc-word">' + lettersHTML(w, 'wc-big') + '<button class="spk-line" data-act="speak" data-text="' + esc(w.w) + '">🔊</button></div>' +
        '<div class="wc-meta"><span class="pill pos">' + esc(w.ps) + '</span><span class="pill pat">' + esc(w.p) + '</span>' +
          (opts.badge ? '<span class="pill ' + opts.badge.cls + '">' + esc(opts.badge.text) + '</span>' : '') + '</div>' +
        '<div class="wc-def">' + esc(w.d) + '</div>' +
        (S.cfg.ex && w.x ? '<div class="wc-ex">' + esc(w.x) + '</div>' : '') +
      '</div>' +
      (opts.actions || '') +
      '</div>';
  }

  /* ============ 语音 ============ */
  var voices = [], chosen = null;
  var SWEET = ['samantha', 'ava', 'allison', 'nicky', 'karen', 'serena', 'moira', 'tessa',
    'google us english', 'aria', 'jenny', 'michelle', 'zira', 'siri'];
  // 一些平台 (Huawei/Android) 不暴露 SpeechSynthesis, 但 navigator 有时仍会存在空函数；做兜底
  function ttsSupported() {
    if (typeof window === 'undefined') return false;
    if (!('speechSynthesis' in window)) return false;
    try {
      var u = new SpeechSynthesisUtterance(' ');
      return !!(window.speechSynthesis && (window.speechSynthesis.speak || window.speechSynthesis.getVoices));
    } catch (e) { return false; }
  }
  function resolveVoice(name) {
    // 按名字 + 多种匹配策略, 跨平台更稳
    if (!voices.length) return null;
    var n = (name || '').toLowerCase();
    if (n) {
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].name === name) return voices[i];
      }
      for (var j = 0; j < voices.length; j++) {
        if (voices[j].name.toLowerCase().indexOf(n) >= 0) return voices[j];
      }
    }
    // 先挑"甜"音色, 都失败就 en-US, 再失败就任意英文, 最后任意
    for (var k = 0; k < SWEET.length; k++) {
      for (var p = 0; p < voices.length; p++) {
        var nm = voices[p].name.toLowerCase();
        var lg = (voices[p].lang || '').toLowerCase();
        if (nm.indexOf(SWEET[k]) >= 0 && lg.indexOf('en') >= 0) return voices[p];
      }
    }
    for (var q = 0; q < voices.length; q++) {
      if ((voices[q].lang || '').toLowerCase().indexOf('en-us') >= 0) return voices[q];
    }
    for (var r = 0; r < voices.length; r++) {
      if ((voices[r].lang || '').toLowerCase().indexOf('en') >= 0) return voices[r];
    }
    return voices[0];
  }
  function loadVoices() {
    if (!ttsSupported()) return;
    try {
      voices = (window.speechSynthesis.getVoices() || []).filter(function (v) {
        return v && /^en/i.test(v.lang || '');
      });
    } catch (e) { voices = []; }
    if (!voices.length) return;
    chosen = resolveVoice(S.cfg.voice);
    if (S.tab === 'set') {
      var sel = document.getElementById('voiceSel');
      if (sel && sel.options.length < 2 && voices.length) renderSet();
    }
  }
  // Safari / iOS / 某些 Android 浏览器 voiceschanged 不可靠, 多触发几次 + 兜底轮询
  function bindVoices() {
    if (!ttsSupported()) return;
    try { window.speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
    setTimeout(loadVoices, 50);
    setTimeout(loadVoices, 250);
    setTimeout(loadVoices, 800);
    setTimeout(loadVoices, 2000);
  }
  function speak(text, rate) {
    if (!ttsSupported()) {
      toast('This browser can\'t read aloud — try Chrome or Safari');
      return;
    }
    try {
      try { window.speechSynthesis.cancel(); } catch (e) {}
      var u = new SpeechSynthesisUtterance(String(text || ''));
      u.lang = 'en-US';
      var v = chosen || resolveVoice(S.cfg.voice);
      if (v) { try { u.voice = v; if (v.lang) u.lang = v.lang; } catch (e) {} }
      u.rate = rate || S.cfg.rate || 1;
      u.volume = 1;
      // pitch 在部分平台 (Safari 桌面 / 一些 Android) 不支持或行为怪异, 失败就放弃, 不报错
      try { u.pitch = 1.2; } catch (e) {}
      var bigs = document.querySelectorAll('.word-big');
      u.onstart = function () { for (var i = 0; i < bigs.length; i++) bigs[i].classList.add('speaking'); };
      var done = function () {
        for (var i = 0; i < bigs.length; i++) bigs[i].classList.remove('speaking');
      };
      u.onend = done; u.onerror = done;
      try {
        window.speechSynthesis.speak(u);
      } catch (e) {}
      // 兜底: 某些浏览器 (老 Safari) speak 后没触发 onend, 5 秒后强制清状态
      setTimeout(done, 5000);
    } catch (e) {}
  }
  bindVoices();

  /* 音效（WebAudio，无需素材） */
  var AC = null;
  function tone(freq, dur, type, vol) {
    if (!S.cfg.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.value = vol == null ? 0.08 : vol;
      o.connect(g); g.connect(AC.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + dur);
      o.stop(AC.currentTime + dur);
    } catch (e) {}
  }
  function sOk() { tone(880, 0.12); setTimeout(function () { tone(1320, 0.16); }, 110); }
  function sBad() { tone(220, 0.22, 'triangle', 0.07); }
  function sWin() { [660, 880, 1100, 1320].forEach(function (f, i) { setTimeout(function () { tone(f, 0.18); }, i * 110); }); }
  function sTap() { tone(660, 0.06, 'sine', 0.05); }

  /* ============ 界面小件 ============ */
  var toastEl = $('#toast'), toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2200);
  }
  function openModal(title, html) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    $('#modal').hidden = false;
  }
  function closeModal() { $('#modal').hidden = true; }
  function confetti() {
    var box = $('#confetti');
    var colors = ['#FFD84D', '#B6F04A', '#22D3EE', '#FF8FB1', '#B39DFF', '#FFA45C'];
    var html = '';
    for (var i = 0; i < 34; i++) {
      html += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;background:' + colors[i % colors.length] +
        ';animation-duration:' + (1.5 + Math.random() * 1.3).toFixed(2) + 's;animation-delay:' + (Math.random() * 0.4).toFixed(2) + 's"></i>';
    }
    box.innerHTML = html;
    box.hidden = false;
    setTimeout(function () { box.hidden = true; box.innerHTML = ''; }, 3200);
  }
  function celebrate(emoji, title, text, btnHTML) {
    var c = $('#celebrate');
    c.innerHTML = '<div><div class="ce">' + emoji + '</div><h2>' + title + '</h2><p>' + text + '</p>' +
      '<div class="btn-row" style="margin-top:18px">' + (btnHTML || '') + '</div></div>';
    c.hidden = false;
    confetti();
    sWin();
  }
  function hideCelebrate() { $('#celebrate').hidden = true; }

  /* 计划 / 进度 */
  function dueList(dateStr) {
    var t = dateStr || todayStr();
    var out = [];
    Object.keys(S.prog).forEach(function (id) {
      var p = S.prog[id];
      if (!p || !p.due || p.due > t) return;
      if (!inRange(id)) return;
      var w = learnWord(id);
      if (w) out.push(w);
    });
    return out.sort(function (a, b) {
      var x = S.prog[a.w].due, y = S.prog[b.w].due;
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }
  /* 还没学过的词池：先自拼课内顺序，再按剑桥词库顺序（只收有图、能拼的词） */
  function planPool() {
    var seen = {}, out = [];
    WORDS.forEach(function (w) {
      if (seen[w.w] || S.prog[w.w]) return;
      if (S.cfg.levels.indexOf(w.L) < 0) return;
      if (!hasPic(w.w)) return;
      seen[w.w] = 1; out.push(w.w);
    });
    BANK_IDS.forEach(function (b) {
      if (S.cfg.banks.indexOf(b) < 0) return;
      ((window.PWBanks && window.PWBanks[b]) || []).forEach(function (id) {
        if (seen[id] || S.prog[id]) return;
        if (ownerBank(id) !== b) return;
        if (!hasPic(id) || !learnWord(id)) return;
        seen[id] = 1; out.push(id);
      });
    });
    return out;
  }
  /* 某个剑桥词库里「能学」的词数（有图 + 能拼），缓存一次 */
  var BANK_LEARNABLE = null;
  function bankLearnable(b) {
    if (!BANK_LEARNABLE) {
      BANK_LEARNABLE = {};
      BANK_IDS.forEach(function (bk) {
        BANK_LEARNABLE[bk] = ((window.PWBanks && window.PWBanks[bk]) || []).filter(function (id) {
          return hasPic(id) && learnWord(id);
        }).length;
      });
    }
    return BANK_LEARNABLE[b] || 0;
  }
  function ensurePlan() {
    var t = todayStr();
    if (S.plan && S.plan.date === t) return S.plan;
    var pool = planPool();
    var due = dueList(t);
    var N = S.cfg.daily;
    var reviewCount = Math.min(due.length, Math.max(0, N - 3));
    var reviews = due.slice(0, reviewCount);
    var news = pool.slice(0, N - reviews.length);
    if (news.length < N - reviews.length) {
      var need = N - reviews.length - news.length;
      reviews = reviews.concat(due.slice(reviews.length, reviews.length + need));
    }
    S.plan = {
      date: t,
      newIds: news.slice(),
      reviewIds: reviews.map(function (w) { return w.w; }),
      doneNew: [], doneReview: []
    };
    write(K.plan, S.plan);
    return S.plan;
  }
  function recordProg(w, mistakes) {
    var t = todayStr();
    var p = S.prog[w.w] || { box: 0, seen: 0, right: 0, wrong: 0, first: t };
    p.seen++;
    if (mistakes) { p.wrong++; p.box = 1; }
    else { p.right++; p.box = Math.min((p.box || 0) + 1, INTERVALS.length); }
    p.due = dateAdd(t, INTERVALS[Math.min(p.box, INTERVALS.length) - 1]);
    p.last = t;
    S.prog[w.w] = p;
    write(K.prog, S.prog);
  }
  function markToday(w, isNew) {
    var t = todayStr();
    var p = ensurePlan();
    var arr = isNew ? p.doneNew : p.doneReview;
    if (arr.indexOf(w.w) < 0) arr.push(w.w);
    write(K.plan, S.plan);
    var h = S.hist[t] || { new: [], review: [] };
    var ha = isNew ? h.new : h.review;
    if (ha.indexOf(w.w) < 0) ha.push(w.w);
    S.hist[t] = h;
    write(K.hist, S.hist);
  }
  function addWrong(w) {
    var e = S.wrong[w.w] || { n: 0, last: '' };
    e.n++; e.last = todayStr();
    S.wrong[w.w] = e;
    write(K.wrong, S.wrong);
    paintBadge();
  }
  function dropWrong(id) {
    delete S.wrong[id];
    write(K.wrong, S.wrong);
    paintBadge();
  }
  function paintBadge() {
    var n = Object.keys(S.wrong).length;
    var el = $('#navWrong');
    el.textContent = n > 99 ? '99+' : n;
    el.classList.toggle('show', n > 0);
  }
  function streak() {
    var t = todayStr();
    var n = 0;
    if (!S.hist[t] && !S.hist[dateAdd(t, -1)]) return 0;
    var d = S.hist[t] ? t : dateAdd(t, -1);
    while (S.hist[d] && (S.hist[d].new.length || S.hist[d].review.length)) { n++; d = dateAdd(d, -1); }
    return n;
  }

  /* ============ 视图切换 ============ */
  var RENDER = { dash: renderDash, learn: renderLearn, match: renderMatch, wrong: renderWrong, set: renderSet };
  function go(tab) {
    S.tab = tab;
    var btns = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].getAttribute('data-tab') === tab);
    var views = document.querySelectorAll('.view');
    for (var j = 0; j < views.length; j++) views[j].classList.toggle('on', views[j].id === 'v-' + tab);
    RENDER[tab]();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function applyUI() {
    var eff = window.innerWidth >= 900 ? 'pad' : 'phone';
    S.eff = eff;
    document.documentElement.setAttribute('data-ui', eff);
    document.documentElement.setAttribute('data-wordfont', S.cfg.wordfont === 'plain' ? 'plain' : 'play');
    $('#babyName').textContent = S.cfg.name || 'Buddy';
  }
  function paintTop() {
    var t = todayStr();
    var p = t.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    $('#todayLabel').textContent = MONTHS[d.getMonth()] + ' ' + (p[2] * 1) + ' · ' + WEEK[d.getDay()] +
      ' · ' + streak() + '-day streak';
  }

  /* ============ 数据面板 ============ */
  function ring(percent, label) {
    var r = 42, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(1, percent)));
    return '<div class="ring"><svg width="96" height="96">' +
      '<circle cx="48" cy="48" r="' + r + '" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="10"></circle>' +
      '<circle cx="48" cy="48" r="' + r + '" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg>' +
      '<div class="rv">' + label + '</div></div>';
  }
  function renderDash() {
    var t = todayStr();
    var date = S.dashDate || t;
    var isToday = date === t;
    var plan = ensurePlan();
    var rec = S.hist[date] || { new: [], review: [] };
    var ids = (rec.new || []).concat(rec.review || []);
    var doneN = rec.new ? rec.new.length : 0, doneR = rec.review ? rec.review.length : 0;
    var planTotal = plan.newIds.length + plan.reviewIds.length;
    var planDone = plan.doneNew.length + plan.doneReview.length;
    var pct = isToday ? (planTotal ? planDone / planTotal : 0) : (ids.length ? 1 : 0);
    var nowDue = dueList(t).length;
    var learned = Object.keys(S.prog).length;
    var wrongN = Object.keys(S.wrong).length;

    var hero = '<div class="hero">' + ring(pct, Math.round(pct * 100) + '%') +
      '<div><div class="ht">' + (isToday ? (planDone >= planTotal && planTotal ? 'All done for today! 🎉' : 'Words to learn today: ' + planTotal)
        : (date.slice(5) + ' study record')) + '</div>' +
      '<div class="hs">' + (isToday ? 'Done ' + planDone + ' / ' + planTotal + ' · New ' + plan.doneNew.length + ' · Review ' + plan.doneReview.length
        : 'New ' + doneN + ' · Review ' + doneR) + '</div>' +
      '<button class="btn hbtn" data-act="' + (isToday ? 'goLearn' : 'backToday') + '">' +
      (isToday ? (planDone >= planTotal && planTotal ? 'Play a game 🎮' : 'Start learning 📚') : 'Back to today') + '</button></div></div>';

    var tiles = '<div class="dash-tiles">' +
      '<button class="tile-btn new' + (doneN ? '' : ' off') + '" data-act="openList" data-kind="new" data-date="' + date + '">' +
        '<span class="th">🌱</span><div class="tn">' + doneN + '</div><div class="tl">New today</div></button>' +
      '<button class="tile-btn rev' + (doneR ? '' : ' off') + '" data-act="openList" data-kind="review" data-date="' + date + '">' +
        '<span class="th">🔁</span><div class="tn">' + doneR + '</div><div class="tl">Reviewed today</div></button>' +
      '</div>';

    var mini = '<div class="mini">' +
      '<button class="mini-btn' + (learned ? '' : ' off') + '" data-act="openList" data-kind="learned">' +
        '<div class="mn">' + learned + '</div><div class="ml">Learned</div></button>' +
      '<button class="mini-btn' + (nowDue ? '' : ' off') + '" data-act="openList" data-kind="due">' +
        '<div class="mn">' + nowDue + '</div><div class="ml">To review</div></button>' +
      '<button class="mini-btn' + (wrongN ? '' : ' off') + '" data-act="openList" data-kind="wrong">' +
        '<div class="mn">' + wrongN + '</div><div class="ml">Mistakes</div></button>' +
      '</div>';

    /* 近 7 天柱状图 */
    var days = [], maxV = 1;
    for (var i = 6; i >= 0; i--) {
      var ds = dateAdd(t, -i);
      var h = S.hist[ds] || { new: [], review: [] };
      var v = { d: ds, n: (h.new || []).length, r: (h.review || []).length };
      maxV = Math.max(maxV, v.n + v.r);
      days.push(v);
    }
    var bars = '<div class="bars">' + days.map(function (v) {
      var hn = Math.round(v.n / maxV * 100), hr = Math.round(v.r / maxV * 100);
      return '<div class="bar-i' + (v.d === t ? ' today' : '') + '">' +
        '<div class="bar-stack">' +
        (v.n ? '<div class="bar-new" style="height:' + Math.max(6, hn) + '%"></div>' : '') +
        (v.r ? '<div class="bar-rev" style="height:' + Math.max(6, hr) + '%"></div>' : '') +
        '</div><div class="bar-lab">' + (v.d.slice(8) * 1) + '</div></div>';
    }).join('') + '</div>' +
      '<div class="legend"><span><i style="background:#A6E63A"></i>New</span><span><i style="background:#7C9BFF"></i>Review</span></div>';

    /* 日历 */
    if (!S.cal) { S.cal = { y: new Date().getFullYear(), m: new Date().getMonth() }; }
    var y = S.cal.y, m = S.cal.m;
    var first = new Date(y, m, 1), start = first.getDay();
    var dim = new Date(y, m + 1, 0).getDate();
    var cells = '', wd = '';
    for (var w = 0; w < 7; w++) wd += '<div class="cal-w">' + WEEK[w] + '</div>';
    for (var b = 0; b < start; b++) cells += '<div class="cal-cell mute"></div>';
    for (var day = 1; day <= dim; day++) {
      var ds2 = y + '-' + pad(m + 1) + '-' + pad(day);
      var hh = S.hist[ds2];
      var has = hh && ((hh.new || []).length + (hh.review || []).length) > 0;
      var cls = 'cal-cell' + (has ? ' has' : '') + (ds2 === t ? ' today' : '') + (ds2 === date ? ' sel' : '');
      cells += '<button class="' + cls + '" data-act="calDay" data-d="' + ds2 + '">' + day + '</button>';
    }
    var cal = '<div class="cal-head"><button class="icon-btn" data-act="calPrev">‹</button>' +
      '<b>' + MONTHS[m] + ' ' + y + '</b>' +
      '<button class="icon-btn" data-act="calNext">›</button></div>' +
      '<div class="cal-grid">' + wd + cells + '</div>' +
      '<div style="font-size:12px;color:var(--ink3);font-weight:800;text-align:center;margin-top:8px">Tap a date to see its words · green dot = studied</div>';

    var mistakesCard = (wrongN ? '<div class="card mcard-mistakes" style="display:flex;align-items:center;gap:12px">' +
        '<div style="font-size:34px">💡</div><div style="flex:1"><b>' + wrongN + ' words need another look</b>' +
        '<div style="font-size:12px;color:var(--ink3);font-weight:700">Words missed in the games are saved here</div></div>' +
        '<button class="btn sm soft" data-act="goWrong">Review</button></div>'
        : '<div class="card mcard-mistakes"><div class="empty"><span class="big">🎉</span>No mistakes yet — great job!</div></div>');
    var barsPanel = '<div class="sec-title"><span class="em">📈</span>Last 7 days</div><div class="card">' + bars + '</div>';
    var calPanel = '<div class="sec-title"><span class="em">🗓</span>Study calendar</div><div class="card">' + cal + '</div>';
    // 顺序：今日进度 → 今日统计 → 总览 → 错题 → 历史图表/日历（放最后）
    $('#v-dash').innerHTML =
      '<div class="p-hero">' + hero + '</div>' +
      '<div class="p-tiles">' + tiles + '</div>' +
      '<div class="p-mini">' + mini + '</div>' +
      '<div class="p-mistakes">' + mistakesCard + '</div>' +
      '<div class="p-bars">' + barsPanel + '</div>' +
      '<div class="p-cal">' + calPanel + '</div>';
  }

  /* ============ 单词列表弹层 ============ */
  /* 列表统一转成 id 字符串（dueList 返回的是 word 对象） */
  function idsOf(list) {
    return (list || []).map(function (x) { return (x && typeof x === 'object') ? x.w : x; }).filter(Boolean);
  }
  function listWords(kind, date) {
    date = date || todayStr();
    if (kind === 'new' || kind === 'review') {
      var rec = S.hist[date] || { new: [], review: [] };
      var ids = (kind === 'new' ? rec.new : rec.review) || [];
      return { ids: idsOf(ids), label: 'New words' };
    }
    if (kind === 'review-today' || kind === 'due') {
      return { ids: idsOf(dueList(todayStr())), label: 'Words to review' };
    }
    if (kind === 'learned' || kind === 'total') {
      return { ids: idsOf(Object.keys(S.prog)), label: 'All learned words' };
    }
    if (kind === 'wrong' || kind === 'mistakes') {
      return { ids: idsOf(Object.keys(S.wrong)), label: 'Mistake box' };
    }
    return { ids: [], label: '' };
  }
  function wordObjFor(id) {
    var w = learnWord(id);
    if (w) return w;
    var b = (window.PWBanks && window.PWBanks.words) || {};
    var info = b[id];
    if (info) return { w: id, d: info[0], ps: info[1] || '', e: info[2] || '', p: '', x: '', chunks: [], h: [] };
    return null;
  }
  function openList(kind, date) {
    var L = listWords(kind, date);
    var ids = L.ids, label = L.label;
    var t = date || todayStr();
    var title;
    if (kind === 'new' || kind === 'review') {
      title = (kind === 'new' ? '🌱 New' : '🔁 Reviewed') + ' · ' + t.slice(5) + ' (' + ids.length + ')';
    } else {
      title = label + ' (' + ids.length + ')';
    }
    if (!ids.length) {
      return openModal(title, '<div class="empty"><span class="big">🍃</span>Nothing here yet</div>');
    }
    var html = '<div class="wlist">' + ids.map(function (id) {
      var w = wordObjFor(id);
      if (!w) return '';
      var badge = null;
      if (kind === 'new') badge = { cls: 'news', text: 'New' };
      else if (kind === 'review') badge = { cls: 'rev', text: 'Review' };
      else if (kind === 'wrong' || kind === 'mistakes') badge = { cls: 'bad', text: 'Mistake' };
      else if (kind === 'due' || kind === 'review-today') badge = { cls: 'rev', text: 'Due' };
      return wordCardHTML(w, { badge: badge });
    }).join('') + '</div>';
    openModal(title, html);
  }

  /* ============ 今日学习 ============ */
  function buildQueue() {
    var p = ensurePlan();
    var restN = p.newIds.filter(function (id) { return p.doneNew.indexOf(id) < 0; });
    var restR = p.reviewIds.filter(function (id) { return p.doneReview.indexOf(id) < 0; });
    var out = [], i = 0, j = 0;
    while (i < restN.length || j < restR.length) {
      if (i < restN.length) out.push({ id: restN[i++], isNew: true });
      if (j < restR.length) out.push({ id: restR[j++], isNew: false });
    }
    return out;
  }
  function startSession() {
    S.lrn = { q: buildQueue(), i: 0, step: 0, tries: 0, pz: null, rec: null, score: null, transcript: '', srdone: false };
    go('learn');
  }
  function curItem() {
    var q = S.lrn.q;
    if (S.lrn.i >= q.length) return null;
    return q[S.lrn.i];
  }
  function curWord() {
    var it = curItem();
    return it ? learnWord(it.id) : null;
  }
  function renderLearn() {
    puzCtx = 'learn';
    var v = $('#v-learn');
    var plan = ensurePlan();
    var planTotal = plan.newIds.length + plan.reviewIds.length;
    if (!S.lrn.q.length) {
      if (!planTotal && !Object.keys(S.prog).length) {
        v.innerHTML = '<div class="card"><div class="empty"><span class="big">📚</span>No words to learn yet<br>Pick a study range in Settings</div></div>';
        return;
      }
      var p = ensurePlan();
      if (p.doneNew.length + p.doneReview.length >= p.newIds.length + p.reviewIds.length) {
        v.innerHTML = doneHTML();
        return;
      }
      v.innerHTML = startHTML();
      return;
    }
    var it = curItem();
    if (!it) { v.innerHTML = doneHTML(); return; }
    var w = learnWord(it.id);
    if (!w) { S.lrn.i++; renderLearn(); return; }
    var doneCount = S.lrn.q.length - S.lrn.i;
    var head = '<div class="learn-head"><div><div class="lh-t">' + (it.isNew ? '🌱 New word' : '🔁 Review') + '</div>' +
      '<div class="lh-s">' + doneCount + ' more to finish today</div></div>' +
      '<div class="dots">' + S.lrn.q.map(function (q, idx) {
        return '<i class="' + (idx < S.lrn.i ? 'done' : idx === S.lrn.i ? 'cur' : '') + '"></i>';
      }).join('') + '</div></div>';

    var steps = '<div class="steps">' +
      stepHTML(0, 'Learn', 'See · Hear') + stepHTML(1, 'Read', 'Record & Score') + stepHTML(2, 'Spell', 'Spell it') + '</div>';

    var body = S.lrn.step === 0 ? stepLearn(w) : S.lrn.step === 1 ? stepRead(w) : stepSpell(w);
    v.innerHTML = head + steps + body;
    if (S.lrn.step === 1 && S.lrn.score != null) paintScore(w);
  }
  function stepHTML(n, t, s) {
    var cls = S.lrn.step === n ? 'step on' : (S.lrn.step > n ? 'step done' : 'step');
    return '<button class="' + cls + '" data-act="step" data-step="' + n + '"><span class="sn">' + (S.lrn.step > n ? '✓' : n + 1) + '</span>' + t + '</button>';
  }
  function startHTML() {
    var plan = ensurePlan();
    var n = plan.newIds.length, r = plan.reviewIds.length;
    return '<div class="card" style="text-align:center">' +
      '<div style="font-size:64px">🚀</div>' +
      '<h2 style="font-size:23px;font-weight:900;margin-top:6px">' + (n + r) + ' words to learn today</h2>' +
      '<p style="color:var(--ink2);font-weight:700;margin-top:8px">🌱 ' + n + ' new　🔁 ' + r + ' review</p>' +
      '<p style="color:var(--ink3);font-weight:700;font-size:13px;margin-top:6px">Each word goes through 3 steps: Learn → Read → Spell</p>' +
      '<div class="btn-row" style="margin-top:18px"><button class="btn" data-act="start">Start learning</button>' +
      '<button class="btn ghost" data-act="goMatch">Play match first</button></div></div>';
  }
  function doneHTML() {
    var h = S.hist[todayStr()] || { new: [], review: [] };
    return '<div class="card" style="text-align:center">' +
      '<div style="font-size:64px">🏆</div>' +
      '<h2 style="font-size:23px;font-weight:900;margin-top:6px">All done for today!</h2>' +
      '<p style="color:var(--ink2);font-weight:700;margin-top:8px">' + h.new.length + ' new · ' + h.review.length + ' reviewed</p>' +
      '<div class="btn-row" style="margin-top:18px">' +
      '<button class="btn" data-act="goMatch">Play a game 🎮</button>' +
      '<button class="btn ghost" data-act="openList" data-kind="new" data-date="' + todayStr() + '">See today\'s cards</button></div></div>';
  }
  /* --- 第一步：学 --- */
  function stepLearn(w) {
    var it = curItem();
    return '<div class="stage">' + picCard(w) +
      '<div class="word-row">' + lettersHTML(w, 'word-big') +
        '<span class="pat-badge">' + esc(w.p) + '</span>' +
        '<span class="pill pos">' + esc(w.ps) + '</span>' +
        (it && !it.isNew ? '<span class="pill rev">Review</span>' : '<span class="pill news">New</span>') + '</div>' +
      '<div style="font-size:15px;color:var(--ink2);font-weight:800;margin:2px 2px 0">💡 ' + esc(w.pTip) + '</div>' +
      defHTML(w) + exHTML(w) +
      '<div class="btn-row" style="margin-top:16px"><button class="btn wide" data-act="step" data-step="1">I got it, let\'s read →</button></div>' +
      '</div>';
  }
  /* --- 第二步：读 --- */
  function stepRead(w) {
    var hasSR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    var body = '';
    if (S.lrn.score == null && !S.lrn.srdone) {
      body = '<div class="mic-wrap">' +
        '<button class="mic' + (S.lrn.recording ? ' rec' : '') + '" data-act="mic">🎤</button>' +
        '<div class="mic-tip">' + (S.lrn.recording ? 'Listening… tap to stop when done' : 'Tap the mic and say the word aloud') + '</div>' +
        '<div style="font-size:13.5px;color:var(--ink3);font-weight:700">' + (hasSR ? 'Speak clearly and I\'ll score you' : 'This browser can\'t auto-score — just rate yourself') + '</div>' +
        (S.lrn.lastRecordURL ? '<button class="btn sm ghost" data-act="replay">▶ Hear my last recording</button>' : '') +
        '</div>' +
        (!hasSR ? '<div class="btn-row" style="margin-top:8px">' +
          '<button class="btn soft" data-act="selfOK">I read it right 👍</button>' +
          '<button class="btn ghost" data-act="selfAgain">Read again 🔄</button></div>' : '');
    } else {
      body = '<div class="mic-wrap"><div id="scoreBox"></div>' +
        '<div class="heard no" id="heardBox">No recording heard yet</div>' +
        '<div class="btn-row" style="margin-top:12px">' +
        '<button class="btn ghost" data-act="mic">🎤 Read again</button>' +
        (S.lrn.lastRecordURL ? '<button class="btn soft" data-act="replay">▶ My recording</button>' : '') +
        '</div>' +
        '<div class="btn-row" style="margin-top:12px"><button class="btn wide" data-act="step" data-step="2">Let\'s spell →</button></div></div>';
    }
    return '<div class="stage">' +
      '<div style="display:flex;justify-content:center">' + lettersHTML(w, 'word-big') + '</div>' +
      '<div style="display:flex;justify-content:center;gap:8px;margin-top:8px">' +
        '<button class="btn sm soft" data-act="speak" data-text="' + esc(w.w) + '">🔊 Listen</button>' +
        '<button class="btn sm ghost" data-act="speak" data-text="' + esc(w.w) + '" data-rate="0.62">🐢 Slow</button>' +
      '</div>' +
      '<div style="text-align:center;font-size:15px;color:var(--ink3);font-weight:800;margin-top:10px">' + esc(w.d) + '</div>' +
      body + '</div>';
  }
  function paintScore(w) {
    var sc = S.lrn.score, box = $('#scoreBox');
    if (!box) return;
    var stars = sc >= 88 ? 3 : sc >= 72 ? 2 : sc >= 50 ? 1 : 0;
    var r = 42, c = 2 * Math.PI * r, off = c * (1 - sc / 100);
    var col = sc >= 88 ? '#8BC42A' : sc >= 72 ? '#FFB020' : '#FF6B6B';
    box.innerHTML = '<div class="score">' +
      '<div class="sc-ring"><svg width="104" height="104">' +
      '<circle cx="52" cy="52" r="' + r + '" fill="none" stroke="#EAF5F8" stroke-width="11"></circle>' +
      '<circle cx="52" cy="52" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="11" stroke-linecap="round" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '"></circle></svg>' +
      '<b style="color:' + col + '">' + sc + '</b></div>' +
      '<div><div class="stars">' + '★★★'.slice(0, stars) + '<span style="color:#DCE9EE">' + '★★★'.slice(0, 3 - stars) + '</span></div>' +
      '<div style="font-size:14px;font-weight:800;color:var(--ink2);margin-top:4px">' +
      (sc >= 88 ? 'Awesome, that was perfect!' : sc >= 72 ? 'Nice! Just a little more!' : 'A bit soft — try once more?') + '</div></div></div>' +
      '<button class="btn wide" data-act="playWord" style="margin-top:6px">🔊 Hear the correct sound</button>';
    var hb = $('#heardBox');
    if (hb) {
      hb.className = 'heard';
      hb.textContent = 'I heard: "' + (S.lrn.transcript || '(could not catch that)') + '"';
    }
  }
  /* 录音 + 识别 */
  var sr = null, mr = null, mstream = null, mchunks = [], recTimer = null;
  function scoreAgainst(said, target) {
    function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z]/g, ''); }
    var a = norm(said), b = norm(target);
    if (!a) return 0;
    if (a === b) return 100;
    var words = String(said || '').toLowerCase().split(/\s+/);
    for (var i = 0; i < words.length; i++) if (norm(words[i]) === b) return 96;
    var m = a.length, n = b.length, dp = [];
    for (var x = 0; x <= m; x++) { dp[x] = [x]; }
    for (var y = 0; y <= n; y++) { dp[0][y] = y; }
    for (var p = 1; p <= m; p++) for (var q = 1; q <= n; q++) {
      dp[p][q] = Math.min(dp[p - 1][q] + 1, dp[p][q - 1] + 1, dp[p - 1][q - 1] + (a[p - 1] === b[q - 1] ? 0 : 1));
    }
    var sim = 1 - dp[m][n] / Math.max(m, n);
    var score = Math.round(sim * 100);
    if (a.indexOf(b) >= 0 || b.indexOf(a) >= 0) score = Math.max(score, 80);
    return Math.max(5, Math.min(99, score));
  }
  function startRec() {
    var w = curWord();
    if (!w) return;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    S.lrn.recording = true;
    S.lrn.score = null;
    S.lrn.srdone = false;
    S.lrn.transcript = '';
    mchunks = [];
    if (SR) {
      try {
        sr = new SR();
        sr.lang = 'en-US';
        sr.interimResults = true;
        sr.maxAlternatives = 3;
        sr.continuous = false;
        sr.onresult = function (e) {
          var best = '';
          for (var i = 0; i < e.results.length; i++) {
            for (var j = 0; j < e.results[i].length; j++) {
              var t = (e.results[i][j].transcript || '').trim();
              if (t.length > best.length) best = t;
            }
          }
          if (best) S.lrn.transcript = best;
        };
        sr.onerror = function () { finishRec(); };
        sr.onend = function () { finishRec(); };
        sr.start();
      } catch (e) { sr = null; }
    }
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
          mstream = st; mr = new MediaRecorder(st);
          mr.ondataavailable = function (e) { if (e.data && e.data.size) mchunks.push(e.data); };
          mr.onstop = function () {
            try {
              if (mchunks.length) {
                if (S.lrn.lastRecordURL) URL.revokeObjectURL(S.lrn.lastRecordURL);
                S.lrn.lastRecordURL = URL.createObjectURL(new Blob(mchunks, { type: mchunks[0].type || 'audio/webm' }));
              }
            } catch (e) {}
            if (mstream) { mstream.getTracks().forEach(function (t) { t.stop(); }); mstream = null; }
          };
          mr.start();
        }).catch(function () {});
      }
    } catch (e) {}
    paintRecState();
    clearTimeout(recTimer);
    recTimer = setTimeout(function () { if (S.lrn.recording) finishRec(); }, 7000);
  }
  function paintRecState() {
    var m = $('.mic');
    if (m) m.classList.toggle('rec', !!S.lrn.recording);
    var tip = $('.mic-tip');
    if (tip) tip.textContent = S.lrn.recording ? 'I’m listening… tap to stop when you’re done' : 'Tap the mic and say the word loudly';
  }
  function finishRec() {
    if (!S.lrn.recording) return;
    S.lrn.recording = false;
    clearTimeout(recTimer);
    try { if (sr) sr.stop(); } catch (e) {}
    try { if (mr && mr.state !== 'inactive') mr.stop(); } catch (e) {}
    setTimeout(function () {
      var w = curWord();
      S.lrn.srdone = true;
      if (S.lrn.transcript && w) {
        S.lrn.score = scoreAgainst(S.lrn.transcript, w.w);
        if (S.lrn.score >= 72) sOk(); else sBad();
      } else {
        S.lrn.score = null;
      }
      renderLearn();
    }, 420);
  }
  /* --- 拼写引擎（今日学习·第三步 与 拼写游戏 共用） --- */
  var LETTER_POOL = 'bcdfghjklmnprstvwz'.split('');
  var puzCtx = 'learn';                       // 当前拼图属于哪个视图：'learn' | 'spell'
  function getPz() { return puzCtx === 'spell' ? S.sp.pz : S.lrn.pz; }
  function setPz(v) { if (puzCtx === 'spell') S.sp.pz = v; else S.lrn.pz = v; }
  function puzRender() { if (puzCtx === 'spell') renderSpell(); else renderLearn(); }

  /* 能否用「组合拼写」：字母块里有长度 > 1 的块（如 ay / ee / igh） */
  function canCombine(w) { return !!(w && w.chunks && w.chunks.some(function (c) { return c.length > 1; })); }
  /* 实际生效的拼写模式：auto = 按单词本身，否则尊重用户选择（不能组合的词回落填空） */
  function resolveMode(w) {
    var m = S.cfg.spellMode || 'auto';
    if (m === 'combine') return canCombine(w) ? 'combine' : 'fill';
    if (m === 'fill') return 'fill';
    return (w && w.mode === 'combine') ? 'combine' : 'fill';
  }
  /* 把单词切成字母块：优先匹配常见字母组合（ai/ay/ee/ow/sh/ch...），否则单字母 */
  var SPELL_TEAMS = ['igh', 'air', 'ear', 'ure', 'our', 'ous', 'tch', 'dge', 'are',
    'ai', 'ay', 'ee', 'ea', 'oa', 'ow', 'oo', 'ou', 'oi', 'oy', 'au', 'aw', 'al', 'ar', 'or',
    'er', 'ir', 'ur', 'sh', 'ch', 'th', 'wh', 'ph', 'ck', 'ng', 'nk', 'qu', 'gh',
    'bl', 'br', 'cl', 'cr', 'dr', 'fl', 'fr', 'gl', 'gr', 'pl', 'pr', 'sc', 'sk', 'sl',
    'sm', 'sn', 'sp', 'st', 'sw', 'tr', 'tw'];
  function chunkWord(s) {
    var out = [], i = 0;
    while (i < s.length) {
      var m = null;
      for (var k = 0; k < SPELL_TEAMS.length; k++) {
        var t = SPELL_TEAMS[k];
        if (s.substr(i, t.length) === t) { m = t; break; }
      }
      if (m) { out.push(m); i += m.length; } else { out.push(s.charAt(i)); i++; }
    }
    return out;
  }
  /* 剑桥词库的词现场构造可学习对象（切字母块、定拼写模式、取释义/词性/图片） */
  function bankWord(id) {
    var info = (window.PWBanks && window.PWBanks.words[id]) || null;
    if (!info) return null;
    var letters = String(id).toLowerCase();
    var chunks = chunkWord(letters);
    var hasTeam = chunks.some(function (c) { return c.length > 1; });
    var h = [];
    for (var i = 0; i < letters.length; i++) if (i === 0 || 'aeiou'.indexOf(letters.charAt(i)) >= 0) h.push(i);
    if (h.length >= letters.length) h = [0];
    var pat = chunks.length <= 5 ? chunks.join('·') : chunks.length + ' blocks';
    var tip = chunks.length <= 6
      ? 'Blend the letter blocks: ' + chunks.join(' - ')
      : 'Say it slowly, one block at a time';
    return {
      i: 0, w: letters, cn: '', e: info[2] || '⭐', L: BANK_OF[id] || 'c1',
      p: pat, pTip: tip,
      chunks: chunks, hc: [], h: h, pat: '', mode: hasTeam ? 'combine' : 'fill',
      ps: info[1] || '', d: info[0] || '', x: '', z: '', banks: []
    };
  }
  /* 学习 / 拼写通用取词：自拼词库直接返回，剑桥词库现场构造，取不到返回 null */
  function learnWord(id) {
    var w = byId[id];
    if (w) return /^[a-z]+$/i.test(w.w) ? w : null;
    if (!/^[a-z]+$/i.test(String(id || ''))) return null;
    return bankWord(id);
  }
  function spellWord(id) { return learnWord(id); }
  /* 这个词是否在「学习范围」内（自拼词库看等级，剑桥词库看词库开关） */
  function inRange(id) {
    var w = byId[id];
    if (w) return S.cfg.levels.indexOf(w.L) >= 0;
    var b = BANK_OF[id];
    return !!b && S.cfg.banks.indexOf(b) >= 0;
  }
  /* 调试/自检入口（headless 验证用） */
  window.__PW = {
    cfg: function () { return S.cfg; },
    prog: function () { return S.prog; },
    bankOf: function (id) { return BANK_OF[id]; },
    learnWord: learnWord, inRange: inRange, planPool: planPool,
    dueList: dueList, bankLearnable: bankLearnable,
    stats: function () {
      var pool = planPool();
      return {
        pool: pool.length,
        first10: pool.slice(0, 10),
        bySource: pool.reduce(function (a, id) {
          var k = byId[id] ? ('L' + byId[id].L) : (BANK_OF[id] || '?');
          a[k] = (a[k] || 0) + 1; return a;
        }, {})
      };
    }
  };
  function buildPuzzle(w) {
    var mode = resolveMode(w);
    var slots = [], tiles = [], isChunk = (mode === 'combine');
    if (isChunk) {
      slots = w.chunks.map(function (c) { return { ans: c, given: false, filled: null, isChunk: true }; });
      /* 组合模式不给干扰块：只放这个单词自己的几个部分，考的是顺序 */
      tiles = w.chunks.slice();
    } else {
      for (var i = 0; i < w.w.length; i++) {
        var given = w.h.indexOf(i) >= 0;
        slots.push({ ans: w.w[i], given: given, filled: given ? { ch: w.w[i], fixed: true } : null });
        if (!given) tiles.push(w.w[i]);
      }
      var ex = shuffle(LETTER_POOL.filter(function (c) { return w.w.indexOf(c) < 0; })).slice(0, 4);
      tiles = tiles.concat(ex);
    }
    return {
      w: w, mode: mode, slots: slots,
      tiles: shuffle(tiles).map(function (ch) { return { ch: ch, used: false, isChunk: isChunk }; }),
      tries: 0, solved: false, bad: [], okAll: false, wrongMarked: false
    };
  }
  /* 拼写题面：图片 + 英英释义 + 发音按钮 */
  function spellPromptHTML(w) {
    return '<div class="sp-top">' +
      '<div class="sp-pic">' + picCard(w, 'small-pic') + '</div>' +
      '<div class="sp-info">' +
        '<div class="def-box" style="margin-top:0"><div class="dline"><span class="k">EN</span>' +
        '<span>' + esc(w.d) + '</span></div></div>' +
        '<div class="btn-row" style="margin-top:10px;justify-content:flex-start">' +
          '<button class="btn sm soft" data-act="speak" data-text="' + esc(w.w) + '">🔊 Listen</button>' +
          '<button class="btn sm ghost" data-act="speak" data-text="' + esc(w.w) + '" data-rate="0.6">🐢 Slow</button>' +
        '</div>' +
      '</div></div>';
  }
  function spellBoardHTML(pz) {
    var w = pz.w;
    var tip = pz.mode === 'combine'
      ? 'Put the letter blocks in order (' + w.chunks.length + ' blocks)'
      : 'Fill in the missing letters (dashed = empty space)';
    var slots = pz.slots.map(function (s, i) {
      var cls = 'slot';
      if (s.given) cls += ' given';
      else if (s.filled) cls += ' filled';
      if (pz.bad.indexOf(i) >= 0) cls += ' bad';
      if (pz.okAll) cls += ' ok';
      var txt = s.given ? disp(s.ans) : (s.filled ? (s.isChunk ? esc(s.filled.ch) : esc(disp(s.filled.ch))) : '');
      return '<button class="' + cls + '" data-act="slot" data-i="' + i + '">' + txt + '</button>';
    }).join('');
    var tiles = pz.tiles.map(function (t, i) {
      var cls = 'tile' + (t.used ? ' used' : '') + (t.used && t.ok ? ' ok' : '');
      return '<button class="' + cls + '" data-act="tile" data-i="' + i + '">' + esc(t.isChunk ? t.ch : disp(t.ch)) + '</button>';
    }).join('');
    return spellPromptHTML(w) +
      '<div class="fill-hint">' + tip + '</div>' +
      '<div class="slots">' + slots + '</div>' +
      '<div class="tiles">' + tiles + '</div>';
  }
  function stepSpell(w) {
    if (!S.lrn.pz || S.lrn.pz.w.w !== w.w) { S.lrn.pz = buildPuzzle(w); S.lrn.badFlash = false; }
    var pz = S.lrn.pz;
    return '<div class="stage">' + spellBoardHTML(pz) +
      (pz.okAll ? '<div class="btn-row" style="margin-top:16px"><button class="btn" data-act="nextWord">Great, next →</button></div>' : '') +
      '<div class="btn-row" style="margin-top:16px">' +
        '<button class="btn ghost sm" data-act="hint">Give me a hint 💡</button>' +
        '<button class="btn ghost sm" data-act="resetPz">Reset 🔄</button>' +
      '</div>' +
      '</div>';
  }
  function tapTile(i) {
    var pz = getPz();
    if (!pz || pz.solved) return;
    var t = pz.tiles[i];
    if (!t || t.used) return;
    var target = -1;
    for (var k = 0; k < pz.slots.length; k++) if (!pz.slots[k].given && !pz.slots[k].filled) { target = k; break; }
    if (target < 0) return;
    pz.slots[target].filled = { ch: t.ch, tile: i };
    t.used = true;
    sTap();
    checkPuzzle();
  }
  function tapSlot(i) {
    var pz = getPz();
    if (!pz || pz.solved) return;
    var s = pz.slots[i];
    if (s.given || !s.filled) return;
    pz.tiles[s.filled.tile].used = false;
    s.filled = null;
    pz.bad = [];
    puzRender();
  }
  function checkPuzzle() {
    var pz = getPz();
    if (!pz) return;
    var w = pz.w;
    var empty = pz.slots.some(function (s) { return !s.given && !s.filled; });
    if (empty) { puzRender(); return; }
    var bad = [];
    pz.slots.forEach(function (s, i) {
      if (s.given) return;
      if (String(s.filled.ch).toLowerCase() !== String(s.ans).toLowerCase()) bad.push(i);
    });
    if (!bad.length) {
      pz.solved = true;
      pz.okAll = true;
      pz.tiles.forEach(function (t) { if (t.used) t.ok = true; });
      sWin();
      confetti();
      puzRender();
      // 自动进入下一题；若孩子自己点了「Next」按钮，靠 handled 标记避免重复推进
      pz._t = setTimeout(function () { advanceSolved(pz); }, 1150);
      return;
    }
    pz.bad = bad;
    pz.tries++;
    sBad();
    if (puzCtx === 'spell' && pz.tries >= 2 && !pz.wrongMarked) { pz.wrongMarked = true; addWrong(w); S.sp.wrong++; }
    puzRender();
    setTimeout(function () {
      var p = getPz();
      if (!p || p !== pz) return;
      p.bad.forEach(function (i) { if (p.slots[i].filled && !p.slots[i].given) { p.tiles[p.slots[i].filled.tile].used = false; p.slots[i].filled = null; } });
      p.bad = [];
      if (p.tries >= 2) {
        var first = -1;
        for (var k = 0; k < p.slots.length; k++) if (!p.slots[k].given && !p.slots[k].filled) { first = k; break; }
        if (first >= 0) {
          p.slots[first].filled = { ch: p.slots[first].ans, fixed: true };
          p.slots[first].given = true;
          toast('No rush — look at this letter block: ' + p.slots[first].ans);
        }
      }
      puzRender();
    }, 750);
  }
  /* 拼图完成后推进：自动定时 或 点击 Next，二者只生效一次 */
  function advanceSolved(pz) {
    if (!pz || pz.handled) return;
    pz.handled = true;
    if (pz === S.sp.pz) { spellAdvance(); return; }
    if (pz === S.lrn.pz) { finishWord(false); return; }
    // 已被替换（例如中途切换了游戏/词库）→ 什么也不做
  }
  function hintPuzzle() {
    var pz = getPz();
    if (!pz || pz.solved) return;
    var k = -1;
    for (var i = 0; i < pz.slots.length; i++) if (!pz.slots[i].given && !pz.slots[i].filled) { k = i; break; }
    if (k < 0) { toast('All filled — tap Check to see'); return; }
    var s = pz.slots[k];
    if (s.isChunk || pz.mode === 'combine') {
      for (var j = 0; j < pz.tiles.length; j++) if (!pz.tiles[j].used && pz.tiles[j].ch === s.ans) { pz.tiles[j].used = true; s.filled = { ch: s.ans, tile: j }; break; }
    } else {
      s.filled = { ch: s.ans, fixed: true };
      s.given = true;
    }
    checkPuzzle();
  }
  function finishWord(mistakes) {
    var it = curItem();
    if (!it) return;
    var w = learnWord(it.id);
    if (!w) { S.lrn.i++; S.lrn.step = 0; renderLearn(); return; }
    var pz = S.lrn.pz;
    var bad = mistakes || (pz && pz.tries >= 2);
    if (bad) addWrong(w);
    if (it.isNew) markToday(w, true); else markToday(w, false);
    recordProg(w, bad);
    S.lrn.i++;
    S.lrn.step = 0;
    S.lrn.tries = 0;
    S.lrn.pz = null;
    S.lrn.score = null;
    S.lrn.transcript = '';
    S.lrn.srdone = false;
    if (S.lrn.i >= S.lrn.q.length) {
      var h = S.hist[todayStr()] || { new: [], review: [] };
      celebrate('🏆', 'All words done for today!', h.new.length + ' new · ' + h.review.length + ' reviewed<br>Come back tomorrow to review!',
        '<button class="btn" data-act="goMatch">Play a game 🎮</button>' +
        '<button class="btn ghost" data-act="closeCelebrate">All done</button>');
      renderLearn();
    } else {
      renderLearn();
      var nw = curWord();
      if (nw) setTimeout(function () { speak(nw.w); }, 320);
    }
  }

  /* ============ 配对游戏 ============ */
  function listForBank(bank) {
    if (bank === 'today') {
      var p = ensurePlan();
      var ids = p.doneNew.concat(p.doneReview);
      if (!ids.length) ids = p.newIds.concat(p.reviewIds);
      return ids.slice();
    }
    if (bank === 'wrong') {
      return Object.keys(S.wrong).slice();
    }
    if (window.PWBanks && window.PWBanks[bank]) return window.PWBanks[bank].slice();
    return [];
  }
  function matchInfo(id) {
    var it = byId[id];
    var d = (it && it.d) ? it.d : ((window.PWBanks && window.PWBanks.words[id] && window.PWBanks.words[id][0]) || '');
    return { w: id, d: d };
  }
  function matchDef(id) {
    var it = byId[id];
    if (it && it.d) return it.d;
    if (window.PWBanks && window.PWBanks.words[id]) return window.PWBanks.words[id][0] || '';
    return '';
  }
  function startRound() {
    var pool = listForBank(S.m.bank);
    var n = S.eff === 'pad' ? 5 : 4;
    S.m.done = 0; S.m.wrong = 0; S.m.selL = null; S.m.selR = null;
    S.m.busy = false; S.m.finished = false; S.m.badL = null; S.m.badR = null;
    if (pool.length < 2) {
      S.m.left = []; S.m.right = []; S.m.total = 0;
      renderMatch();
      return;
    }
    var pick = shuffle(pool).slice(0, Math.min(n, pool.length));
    S.m.left = shuffle(pick.map(matchInfo));
    S.m.right = shuffle(pick.map(matchInfo));
    S.m.total = pick.length;
    S.m.pair = {};
    pick.forEach(function (w) { S.m.pair[w] = true; });
    renderMatch();
  }
  function bankChipsHTML() {
    return '<div class="bank-chips">' + BANK_META.map(function (b) {
      var n = listForBank(b.id).length;
      return '<button class="chip' + (S.m.bank === b.id ? ' on' : '') + '" data-act="bank" data-b="' + b.id + '">' +
        b.icon + ' ' + b.name + ' <span style="opacity:.7">' + n + '</span></button>';
    }).join('') + '</div>';
  }
  function gameSeg() {
    return '<div class="game-seg">' +
      '<button class="' + (S.m.game === 'match' ? 'on' : '') + '" data-act="game" data-v="match">🧩 Match</button>' +
      '<button class="' + (S.m.game === 'spell' ? 'on' : '') + '" data-act="game" data-v="spell">✏️ Spell</button>' +
      '</div>';
  }
  function renderMatch() {
    if (S.m.game === 'spell') return renderSpell();
    var top = gameSeg() + bankChipsHTML();
    var pool = listForBank(S.m.bank);
    if (pool.length < 2) {
      $('#v-match').innerHTML = top + '<div class="card"><div class="empty"><span class="big">🧩</span>' +
        (S.m.bank === 'wrong' ? 'Your mistake box is empty — you\'re doing great!' : 'This word bank has no words yet') + '</div></div>';
      return;
    }
    if (!S.m.left.length) {
      $('#v-match').innerHTML = top + '<div class="card" style="text-align:center">' +
        '<div style="font-size:56px">🧩</div><h3 style="font-size:19px;font-weight:900">Match words with their meanings</h3>' +
        '<p style="color:var(--ink2);font-weight:700;font-size:14px;margin-top:8px">Tap a word on the left, then its definition on the right.<br>Wrong answers go to your mistake box for later review.</p>' +
        '<div class="btn-row" style="margin-top:16px"><button class="btn" data-act="newRound">Start a round</button></div></div>';
      return;
    }
    var head = '<div class="match-head"><span>🧩 Pair ' + (S.m.done + 1) + ' / ' + S.m.total + '</span>' +
      '<span style="color:#8BC42A">✓ ' + S.m.done + '</span>' +
      '<span style="color:#E96C92">✗ ' + S.m.wrong + '</span>' +
      '<div class="mh-r"><button class="btn sm ghost" data-act="newRound">Shuffle</button></div></div>';
    var left = S.m.left.map(function (w, i) {
      var cls = 'mcard word' + (S.m.selL === i ? ' sel' : '') + (w._ok ? ' ok' : '') + (S.m.badL === i ? ' bad' : '');
      return '<button class="' + cls + '" data-act="pickL" data-i="' + i + '"' + (w._ok ? ' disabled' : '') + '>' +
        '<span class="mw">' + esc(disp2(w.w)) + '</span></button>';
    }).join('');
    var right = S.m.right.map(function (w, i) {
      var cls = 'mcard def' + (S.m.selR === i ? ' sel' : '') + (w._ok ? ' ok' : '') + (S.m.badR === i ? ' bad' : '');
      return '<button class="' + cls + '" data-act="pickR" data-i="' + i + '"' + (w._ok ? ' disabled' : '') + '>' + esc(w.d) + '</button>';
    }).join('');
    $('#v-match').innerHTML = top + head + '<div class="board"><div class="col">' + left + '</div><div class="col">' + right + '</div></div>' +
      (S.m.finished ? '<div class="match-foot"><button class="btn" data-act="newRound">Play again 🎉</button>' +
        '<button class="btn ghost" data-act="goWrong">See mistakes 💡</button></div>' : '') +
      '<div style="font-size:12px;color:var(--ink3);font-weight:800;text-align:center;margin-top:12px">Tap a word card to hear it 🔊</div>';
  }

  /* ============ 拼写游戏 ============ */
  function spellPool() {
    return listForBank(S.m.bank).filter(function (id) { return !!spellWord(id) && hasPic(id); });
  }
  function startSpellRound() {
    var pool = spellPool();
    var n = S.eff === 'pad' ? 6 : 5;
    S.sp.q = shuffle(pool).slice(0, Math.min(n, pool.length));
    S.sp.i = 0; S.sp.done = 0; S.sp.wrong = 0; S.sp.finished = false;
    S.sp.pz = S.sp.q.length ? buildPuzzle(spellWord(S.sp.q[0])) : null;
    renderSpell();
  }
  function spellAdvance() {
    S.sp.done++;
    S.sp.i++;
    S.sp.pz = null;
    if (S.sp.i >= S.sp.q.length) {
      S.sp.finished = true;
      S.sp.pz = null;
      renderSpell();
      setTimeout(function () {
        celebrate('🏆', 'All spelled!', S.sp.done + ' words spelled · ' + S.sp.wrong + ' mistakes',
          '<button class="btn" data-act="spNew">Play again</button>' +
          '<button class="btn ghost" data-act="closeCelebrate">Back</button>');
      }, 360);
    } else {
      S.sp.pz = buildPuzzle(spellWord(S.sp.q[S.sp.i]));
      renderSpell();
      setTimeout(function () { var cw = S.sp.pz && S.sp.pz.w; if (cw) speak(cw.w); }, 300);
    }
  }
  function renderSpell() {
    puzCtx = 'spell';
    var top = gameSeg() + bankChipsHTML();
    var pool = spellPool();
    if (!pool.length) {
      $('#v-match').innerHTML = top + '<div class="card"><div class="empty"><span class="big">✏️</span>' +
        (S.m.bank === 'wrong' ? 'Your mistake box is empty — you\'re doing great!' : 'No spellable words in this bank yet') + '</div></div>';
      return;
    }
    if (!S.sp.pz) {
      var startBtn = S.sp.finished ? 'Play again' : 'Start spelling';
      $('#v-match').innerHTML = top + '<div class="card" style="text-align:center">' +
        '<div style="font-size:56px">✏️</div><h3 style="font-size:19px;font-weight:900">Spell the word</h3>' +
        '<p style="color:var(--ink2);font-weight:700;font-size:14px;margin-top:8px">Look at the picture and the meaning, tap 🔊 to listen,<br>then build the word from the letter tiles.<br>Wrong answers go to your mistake box.</p>' +
        '<div class="btn-row" style="margin-top:16px"><button class="btn" data-act="spNew">' + startBtn + '</button></div></div>';
      return;
    }
    var pz = S.sp.pz, w = pz.w;
    var head = '<div class="match-head"><span>✏️ Word ' + (S.sp.i + 1) + ' / ' + S.sp.q.length + '</span>' +
      '<span style="color:#8BC42A">✓ ' + S.sp.done + '</span>' +
      '<span style="color:#E96C92">✗ ' + S.sp.wrong + '</span>' +
      '<div class="mh-r"><button class="btn sm ghost" data-act="spNew">Shuffle</button></div></div>';
    $('#v-match').innerHTML = top + head +
      '<div class="sp-board' + (pz.okAll ? ' ok' : '') + '"><div class="stage">' + spellBoardHTML(pz) +
      (pz.okAll ? '<div class="btn-row" style="margin-top:16px"><button class="btn" data-act="spNext">Great, next →</button></div>' : '') +
      '<div class="btn-row" style="margin-top:16px">' +
        '<button class="btn ghost sm" data-act="hint">Give me a hint 💡</button>' +
        '<button class="btn ghost sm" data-act="resetPz">Reset 🔄</button>' +
      '</div></div></div>' +
      '<div style="font-size:12px;color:var(--ink3);font-weight:800;text-align:center;margin-top:12px">Tap a tile, then fill the spaces in order</div>';
  }
  function disp2(s) {
    if (!S.cfg.alpha) return s;
    return s.replace(/a/g, 'ɑ');
  }
  function pickL(i) {
    if (S.m.busy) return;
    var w = S.m.left[i];
    if (!w || w._ok) return;
    S.m.selL = i;
    speak(w.w);
    sTap();
    if (S.m.selR != null) return judge();
    renderMatch();
  }
  function pickR(i) {
    if (S.m.busy) return;
    var w = S.m.right[i];
    if (!w || w._ok) return;
    if (S.m.selL == null) { S.m.selR = i; toast('Tap a word on the left first'); renderMatch(); return; }
    S.m.selR = i;
    judge();
  }
  function judge() {
    var L = S.m.left[S.m.selL], R = S.m.right[S.m.selR];
    if (!L || !R) return;
    S.m.busy = true;
    if (L.w === R.w) {
      L._ok = true; R._ok = true;
      S.m.done++;
      sOk();
      confetti();
      speak(L.w);
      S.m.selL = S.m.selR = null;
      S.m.busy = false;
      if (S.m.done >= S.m.total) S.m.finished = true;
      renderMatch();
      if (S.m.finished) {
        setTimeout(function () {
          celebrate('🎉', 'All matched!', S.m.done + ' pairs right · ' + S.m.wrong + ' wrong',
            '<button class="btn" data-act="newRound">Play again</button>' +
            '<button class="btn ghost" data-act="closeCelebrate">Back</button>');
        }, 420);
      }
    } else {
      S.m.wrong++;
      S.m.badL = S.m.selL; S.m.badR = S.m.selR;
      addWrong(L);
      addWrong(R);
      sBad();
      renderMatch();
      setTimeout(function () {
        S.m.badL = null; S.m.badR = null;
        S.m.selL = null; S.m.selR = null;
        S.m.busy = false;
        renderMatch();
      }, 620);
    }
  }

  /* ============ 错题本 ============ */
  function wrongCardHTML(id) {
    var e = S.wrong[id] || { n: 1 };
    var it = byId[id];
    if (it) return wordCardHTML(it, { badge: { cls: 'rev', text: 'Wrong ' + (e.n || 1) + '×' } });
    var d = matchDef(id);
    return '<div class="wcard">' +
      '<div class="wc-pic" style="--a:#EAF5F8;--b:#DCEEF4">' + picVisual(id) + '</div>' +
      '<div class="wc-main">' +
        '<div class="wc-word"><span class="ltr">' + esc(disp2(id)) + '</span>' +
          '<button class="spk-line" data-act="speak" data-text="' + esc(id) + '">🔊</button></div>' +
        '<div class="wc-meta"><span class="pill rev">Wrong ' + (e.n || 1) + '×</span></div>' +
        (d ? '<div class="wc-def">' + esc(d) + '</div>' : '') +
      '</div>' +
      '<div class="wc-act">' +
        '<button class="tagbtn" data-act="speak" data-text="' + esc(id) + '">🔊</button>' +
        '<button class="tagbtn gray" data-act="dropWrong" data-w="' + esc(id) + '">Got it</button>' +
      '</div></div>';
  }
  function renderWrong() {
    var ids = Object.keys(S.wrong).sort(function (a, b) { return (S.wrong[b].n || 0) - (S.wrong[a].n || 0); });
    var head = '<div class="sec-title"><span class="em">💡</span>Mistake box (' + ids.length + ')' +
      (ids.length ? '<button class="btn sm soft more" style="pointer-events:auto" data-act="goMatchWrong">Practice →</button>' : '') + '</div>';
    if (!ids.length) {
      $('#v-wrong').innerHTML = head + '<div class="card"><div class="empty"><span class="big">🎉</span>' +
        'Your mistake box is empty — amazing!<br><span style="font-size:13px">Words you miss in the games show up here</span></div></div>';
      return;
    }
    var list = '<div class="wlist">' + ids.map(function (id) { return wrongCardHTML(id); }).join('') + '</div>';
    $('#v-wrong').innerHTML = head + list;
  }

  /* ============ 设置 ============ */
  function renderSet() {
    var v = $('#v-set');
    var c = S.cfg;
    var voiceOpts = voices.map(function (vo) {
      return '<option value="' + esc(vo.name) + '"' + (chosen && chosen.name === vo.name ? ' selected' : '') + '>' +
        esc(vo.name) + ' · ' + esc(vo.lang) + '</option>';
    }).join('');
    var lvlChips = [2, 3, 4, 5].map(function (L) {
      var on = c.levels.indexOf(L) >= 0;
      var nm = S.eff === 'pad' ? LEVEL_META[L].name : ('L' + L + ' · ' + LEVEL_META[L].short);
      return '<button class="chip' + (on ? ' on' : '') + '" data-act="toggleLevel" data-v="' + L + '">' +
        nm + '</button>';
    }).join('');
    var bankChips = BANK_IDS.map(function (b) {
      var meta = BANK_META.filter(function (x) { return x.id === b; })[0] || { name: b, icon: '' };
      return '<button class="chip' + (c.banks.indexOf(b) >= 0 ? ' on' : '') + '" data-act="toggleBank" data-v="' + b + '">' +
        meta.icon + ' ' + meta.name + ' <span style="opacity:.65">' + bankLearnable(b) + '</span></button>';
    }).join('');
    var bankStat = BANK_META.filter(function (b) { return b.id !== 'today' && b.id !== 'wrong'; }).map(function (b) {
      var cnt = (window.PWBanks && window.PWBanks[b.id]) ? window.PWBanks[b.id].length : (D.bankWords[b.id] || []).length;
      return '<div><div class="sn">' + cnt + '</div><div class="sl2">' + b.name + '</div></div>';
    }).join('');
    v.innerHTML =
      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">👧</span>About your child</div>' +
        '<div class="set-row" style="display:block"><div class="sl" style="margin-bottom:8px"><b>Child\'s name</b><span>Shown in the welcome message</span></div>' +
        '<input class="inp" id="nameInput" value="' + esc(c.name) + '" maxlength="10" placeholder="e.g. Hahan"></div>' +
        '<div class="set-row"><div class="sl"><b>Words per day</b><span>New + review words total (5-15)</span></div>' +
        '<div class="stepper"><button data-act="daily" data-v="-1">−</button><b>' + c.daily + '</b><button data-act="daily" data-v="1">＋</button></div></div>' +
        '<div class="set-row"><div class="sl"><b>Example sentences</b><span>Show a sample sentence for each word</span></div>' +
        '<div class="seg"><button class="' + (c.ex ? 'on' : '') + '" data-act="toggleEx" data-v="1">On</button>' +
        '<button class="' + (!c.ex ? 'on' : '') + '" data-act="toggleEx" data-v="0">Off</button></div></div>' +
      '</div>' +

      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">🔤</span>Word display</div>' +
        '<div class="set-row"><div class="sl"><b>Show a as ɑ</b><span>Easier-to-read shape for kids (sound unchanged)</span></div>' +
        '<div class="seg"><button class="' + (c.alpha ? 'on' : '') + '" data-act="setAlpha" data-v="1">On</button>' +
        '<button class="' + (!c.alpha ? 'on' : '') + '" data-act="setAlpha" data-v="0">Off</button></div></div>' +
        '<div class="set-row"><div class="sl"><b>Spelling mode</b><span>Auto picks per word · Fill = blank letters · Combine = build from blocks</span></div>' +
        '<div class="seg">' +
          '<button class="' + ((c.spellMode || 'auto') === 'auto' ? 'on' : '') + '" data-act="setSpellMode" data-v="auto">Auto</button>' +
          '<button class="' + (c.spellMode === 'fill' ? 'on' : '') + '" data-act="setSpellMode" data-v="fill">Fill</button>' +
          '<button class="' + (c.spellMode === 'combine' ? 'on' : '') + '" data-act="setSpellMode" data-v="combine">Combine</button>' +
        '</div></div>' +
        '<div class="set-row"><div class="sl"><b>Letter font</b><span>Playful handwriting suits early learning</span></div>' +
        '<div class="seg"><button class="' + (c.wordfont !== 'plain' ? 'on' : '') + '" data-act="wordfont" data-v="play">Playful</button>' +
        '<button class="' + (c.wordfont === 'plain' ? 'on' : '') + '" data-act="wordfont" data-v="plain">Plain</button></div></div>' +
      '</div>' +

      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">🔊</span>Pronunciation</div>' +
        '<div class="set-row" style="display:block"><div class="sl" style="margin-bottom:8px"><b>Voice</b><span>Auto-picks a sweet American female voice</span></div>' +
        '<select class="inp" id="voiceSel">' + (voiceOpts || '<option>No voice available</option>') + '</select></div>' +
        '<div class="set-row"><div class="sl"><b>Speed</b><span>Slower is friendlier for kids</span></div>' +
        '<input type="range" id="rateRange" min="0.5" max="1.1" step="0.05" value="' + c.rate + '"></div>' +
        '<div class="btn-row" style="margin-top:12px"><button class="btn sm soft" data-act="testVoice">Try "cake"</button>' +
        '<button class="btn sm ghost" data-act="testVoice2">Try a sentence</button></div>' +
      '</div>' +

      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">🎯</span>Study range</div>' +
        '<div class="sr-lab">Oxford Phonics World</div>' +
        '<div class="chips">' + lvlChips + '</div>' +
        '<div class="sr-lab">Cambridge word banks</div>' +
        '<div class="chips">' + bankChips + '</div>' +
        '<div class="sr-note">Numbers show how many words in each bank have a picture and can be studied. Daily new words come in this order: Phonics → Starters → Movers → Flyers → KET → PET.</div></div>' +

      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">📚</span>Word bank stats</div>' +
        '<div class="stat-grid"><div><div class="sn">' + WORDS.length + '</div><div class="sl2">Total words</div></div>' + bankStat + '</div>' +
        '<div style="font-size:12px;color:var(--ink3);font-weight:700;margin-top:10px">By level: ' +
        [2, 3, 4, 5].map(function (L) { return 'L' + L + ' ' + (D.stats.byLevel[L] || 0); }).join(' · ') + '</div></div>' +

      '<div class="card"><div class="sec-title" style="margin-top:0"><span class="em">🗂</span>Data</div>' +
        '<div class="set-row"><div class="sl"><b>Restart today</b><span>Clear today\'s record and reshuffle</span></div>' +
        '<button class="btn sm ghost" data-act="resetToday">Reset today</button></div>' +
        '<div class="set-row"><div class="sl"><b>Reset everything</b><span>All progress and mistakes will be cleared</span></div>' +
        '<button class="btn sm danger" data-act="resetAll">Clear all</button></div>' +
        '<div class="set-row"><div class="sl"><b>App version</b><span>' + (window.__SW_VER || 'v1') + ' · tap to load the latest version</span></div>' +
        '<button class="btn sm ghost" data-act="forceUpdate">Check for update</button></div>' +
      '</div>' +
      '<div style="text-align:center;font-size:12px;color:var(--ink3);font-weight:700;padding:16px 0 4px">' +
        '💚 Word lists from Oxford Phonics World Levels 2-5<br>A little each day makes blending easier</div>';

    var ni = $('#nameInput');
    if (ni) ni.oninput = function () { S.cfg.name = this.value.trim() || 'Buddy'; write(K.cfg, S.cfg); applyUI(); };
    var vs = $('#voiceSel');
    if (vs) vs.onchange = function () { S.cfg.voice = this.value; chosen = null; loadVoices(); write(K.cfg, S.cfg); toast('Voice updated'); };
    var rr = $('#rateRange');
    if (rr) rr.onchange = function () { S.cfg.rate = +this.value; write(K.cfg, S.cfg); speak('cake'); };
  }
  function forceUpdate() {
    toast('Updating…');
    (function () {
      var ps = [];
      if (window.caches) ps.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); }));
      if (navigator.serviceWorker) ps.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); }));
      Promise.all(ps).then(function () { location.reload(true); }).catch(function () { location.reload(true); });
    })();
  }

  /* ============ 事件 ============ */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var a = t.getAttribute('data-act');
    if (a === 'speak') {
      e.preventDefault();
      speak(t.getAttribute('data-text') || '', parseFloat(t.getAttribute('data-rate') || '0') || 0);
      return;
    }
    if (a === 'start') { startSession(); return; }
    if (a === 'goLearn') { startSession(); return; }
    if (a === 'goMatch') {
      hideCelebrate();
      if (S.m.game === 'spell') startSpellRound(); else startRound();
      go('match');
      return;
    }
    if (a === 'goMatchWrong') {
      S.m.bank = 'wrong';
      if (S.m.game === 'spell') startSpellRound(); else startRound();
      go('match');
      return;
    }
    if (a === 'goWrong') { hideCelebrate(); go('wrong'); return; }
    if (a === 'closeCelebrate') { hideCelebrate(); RENDER[S.tab](); return; }
    if (a === 'step') {
      var n = +t.getAttribute('data-step');
      if (n > S.lrn.step + 1) { toast('Finish this step first'); return; }
      S.lrn.step = n;
      if (n === 1 && !S.lrn.readSpokenOnce) { S.lrn.readSpokenOnce = true; var w0 = curWord(); if (w0) setTimeout(function () { speak(w0.w); }, 240); }
      renderLearn();
      return;
    }
    if (a === 'nextWord') { advanceSolved(S.lrn.pz); return; }
    if (a === 'spNext') { advanceSolved(S.sp.pz); return; }
    if (a === 'spNew') { startSpellRound(); return; }
    if (a === 'game') {
      var g = t.getAttribute('data-v');
      if (g !== S.m.game) {
        S.m.game = g;
        S.m.left = []; S.m.right = []; S.m.done = 0; S.m.wrong = 0; S.m.selL = S.m.selR = null; S.m.finished = false;
        S.sp.q = []; S.sp.i = 0; S.sp.pz = null; S.sp.done = 0; S.sp.wrong = 0; S.sp.finished = false;
      }
      renderMatch();
      return;
    }
    if (a === 'mic') {
      if (S.lrn.recording) { finishRec(); return; }
      // "Read again" 路径: 重置评分/识别结果, 启动录音, 并切回大话筒视图
      S.lrn.score = null; S.lrn.srdone = false; S.lrn.transcript = '';
      startRec();
      renderLearn();
      return;
    }
    if (a === 'replay') {
      if (S.lrn.lastRecordURL) { var au = new Audio(S.lrn.lastRecordURL); au.play().catch(function () { toast('Could not play it — try recording again'); }); }
      else toast('No recording yet');
      return;
    }
    if (a === 'playWord') { var w1 = curWord(); if (w1) speak(w1.w); return; }
    if (a === 'selfOK') { S.lrn.srdone = true; S.lrn.score = 90; sOk(); renderLearn(); return; }
    if (a === 'selfAgain') { S.lrn.score = null; S.lrn.srdone = false; startRec(); renderLearn(); return; }
    if (a === 'tile') { tapTile(+t.getAttribute('data-i')); return; }
    if (a === 'slot') { tapSlot(+t.getAttribute('data-i')); return; }
    if (a === 'hint') { hintPuzzle(); return; }
    if (a === 'resetPz') { var pzr = getPz(); if (pzr) setPz(buildPuzzle(pzr.w)); puzRender(); return; }
    if (a === 'openList') { openList(t.getAttribute('data-kind'), t.getAttribute('data-date')); return; }
    if (a === 'calPrev') { S.cal.m--; if (S.cal.m < 0) { S.cal.m = 11; S.cal.y--; } renderDash(); return; }
    if (a === 'calNext') { S.cal.m++; if (S.cal.m > 11) { S.cal.m = 0; S.cal.y++; } renderDash(); return; }
    if (a === 'calDay') { S.dashDate = t.getAttribute('data-d'); renderDash(); return; }
    if (a === 'backToday') { S.dashDate = todayStr(); renderDash(); return; }
    if (a === 'bank') {
      var b = t.getAttribute('data-b');
      if (b !== S.m.bank) {
        S.m.bank = b;
        S.m.left = []; S.m.right = []; S.m.done = 0; S.m.wrong = 0; S.m.selL = S.m.selR = null; S.m.finished = false;
        S.sp.q = []; S.sp.i = 0; S.sp.pz = null; S.sp.done = 0; S.sp.wrong = 0; S.sp.finished = false;
      }
      renderMatch();
      return;
    }
    if (a === 'newRound') { startRound(); return; }
    if (a === 'pickL') { pickL(+t.getAttribute('data-i')); return; }
    if (a === 'pickR') { pickR(+t.getAttribute('data-i')); return; }
    if (a === 'dropWrong') { dropWrong(t.getAttribute('data-w')); renderWrong(); toast('Mastered — great job!'); return; }
    if (a === 'daily') {
      S.cfg.daily = Math.max(5, Math.min(15, S.cfg.daily + (+t.getAttribute('data-v'))));
      S.plan = null; write(K.cfg, S.cfg); renderSet();
      return;
    }
    if (a === 'mode') { S.cfg.mode = t.getAttribute('data-v'); write(K.cfg, S.cfg); renderSet(); return; }
    if (a === 'setAlpha') { S.cfg.alpha = t.getAttribute('data-v') === '1'; write(K.cfg, S.cfg); applyUI(); renderSet(); return; }
    if (a === 'setSpellMode') {
      S.cfg.spellMode = t.getAttribute('data-v') || 'auto';
      write(K.cfg, S.cfg);
      S.lrn.pz = null; S.sp.pz = null;      // 重建拼图，让新模式下次生效
      renderSet();
      return;
    }
    if (a === 'wordfont') { S.cfg.wordfont = t.getAttribute('data-v'); write(K.cfg, S.cfg); applyUI(); renderSet(); return; }
    if (a === 'toggleLevel') {
      var L2 = +t.getAttribute('data-v');
      var ix = S.cfg.levels.indexOf(L2);
      if (ix >= 0) { if (S.cfg.levels.length + S.cfg.banks.length <= 1) { toast('Keep at least one range on'); return; } S.cfg.levels.splice(ix, 1); }
      else S.cfg.levels.push(L2);
      S.cfg.levels.sort();
      S.plan = null;
      write(K.cfg, S.cfg);
      renderSet();
      return;
    }
    if (a === 'toggleBank') {
      var bk = t.getAttribute('data-v');
      var bx = S.cfg.banks.indexOf(bk);
      if (bx >= 0) { if (S.cfg.levels.length + S.cfg.banks.length <= 1) { toast('Keep at least one range on'); return; } S.cfg.banks.splice(bx, 1); }
      else S.cfg.banks.push(bk);
      S.cfg.banks.sort(function (x, y) { return BANK_IDS.indexOf(x) - BANK_IDS.indexOf(y); });
      S.plan = null;
      write(K.cfg, S.cfg);
      renderSet();
      return;
    }
    if (a === 'testVoice') { speak('cake'); return; }
    if (a === 'testVoice2') { speak('I want a cake for my birthday.'); return; }
    if (a === 'resetToday') {
      if (!confirm('Clear today’s record and reshuffle the words?')) return;
      S.plan = null; delete S.hist[todayStr()];
      write(K.plan, S.plan); write(K.hist, S.hist);
      S.lrn = { q: [], i: 0, step: 0, pz: null, score: null, transcript: '' };
      renderSet(); paintBadge(); toast('Today’s tasks reset');
      return;
    }
    if (a === 'resetAll') {
      if (!confirm('Clear ALL progress and the mistake box? This cannot be undone.')) return;
      S.prog = {}; S.hist = {}; S.wrong = {}; S.plan = null;
      write(K.prog, S.prog); write(K.hist, S.hist); write(K.wrong, S.wrong); write(K.plan, null);
      S.lrn = { q: [], i: 0, step: 0, pz: null, score: null, transcript: '' };
      paintBadge(); renderSet(); toast('Everything cleared — starting fresh');
      return;
    }
    if (a === 'forceUpdate') { forceUpdate(); return; }
    if (a === 'closeModal') { closeModal(); return; }
  });
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-close]');
    if (c) closeModal();
  });
  document.addEventListener('click', function (e) {
    var nb = e.target.closest('.nav-btn');
    if (nb) go(nb.getAttribute('data-tab'));
  });
  window.addEventListener('resize', function () {
    var eff = window.innerWidth >= 900 ? 'pad' : 'phone';
    if (eff !== S.eff) { applyUI(); RENDER[S.tab](); }
  });

  /* ============ 启动 ============ */
  function parseQS() {
    var q = {};
    (location.search || '').replace(/^\?/, '').split('&').forEach(function (kv) {
      if (!kv) return;
      var p = kv.split('=');
      q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || '');
    });
    return q;
  }
  /* 演示数据（只在 ?demo=1 时使用，仅存内存，不写入本机记录） */
  function seedDemo() {
    var t = todayStr();
    var newIds = [], revIds = [];
    for (var i = 0; i < 5; i++) newIds.push(WORDS[i].w);
    for (var j = 0; j < 4; j++) revIds.push(WORDS[60 + j].w);
    S.plan = { date: t, newIds: newIds, reviewIds: revIds, doneNew: newIds.slice(0, 3), doneReview: revIds.slice(0, 2) };
    S.hist[t] = { new: newIds.slice(0, 3), review: revIds.slice(0, 2) };
    for (var k = 1; k <= 6; k++) {
      var d = dateAdd(t, -k);
      var a = [], b = [];
      for (var x = 0; x < (k % 4) + 1; x++) a.push(WORDS[(k * 7 + x) % 120].w);
      for (var y = 0; y < (k % 3) + 1; y++) b.push(WORDS[(k * 5 + y + 30) % 120].w);
      S.hist[d] = { new: a, review: b };
    }
    [0, 1, 2, 3, 4, 5, 6, 7, 60, 61, 62, 130].forEach(function (n) {
      var w = WORDS[n];
      if (w) S.prog[w.w] = { box: 2, seen: 2, right: 1, wrong: 1, due: dateAdd(t, 2), last: t, first: t };
    });
    if (S.prog[WORDS[60].w]) S.prog[WORDS[60].w].due = t;
    if (S.prog[WORDS[61].w]) S.prog[WORDS[61].w].due = t;
    ['dragon', 'whistle', 'mountain'].forEach(function (id, i) {
      if (byId[id]) S.wrong[id] = { n: 3 - i, last: t };
    });
  }
  function boot() {
    try {
      applyUI();
      paintTop();
      ensurePlan();
      var q = parseQS();
      if (q.demo === '1') seedDemo();
      paintBadge();
      $('#versionTag').textContent = window.__SW_VER || 'v1';
    var tab = q.tab || (location.hash || '').replace('#', '');
    if (q.word && byId[q.word]) {                 // ?word=bay 可直接看某个单词
      S.lrn = { q: [{ id: q.word, isNew: true }], i: 0, step: 0, tries: 0, pz: null, rec: null, score: null, transcript: '', srdone: false };
      go('learn');
    } else if (RENDER[tab] && tab !== 'dash') {
        if (tab === 'learn' && q.start === '1') startSession(); else go(tab);
      } else {
        go('dash');
      }
      if (D.problems && D.problems.length) console.warn('词库问题：', D.problems);
      if (q.probe === '1') {
        var bad = [];
        var all = document.querySelectorAll('#app *');
        for (var pi = 0; pi < all.length; pi++) {
          var rc = all[pi].getBoundingClientRect();
          if (rc.right > window.innerWidth + 1 || rc.left < -1) bad.push((all[pi].className || all[pi].tagName) + '@' + Math.round(rc.left) + '-' + Math.round(rc.right));
        }
        document.title = 'P:' + window.innerWidth + ' D:' + document.documentElement.scrollWidth + ' BAD:' + bad.slice(0, 10).join(' | ');
      }
    } catch (err) {
      var d = document.getElementById('v-dash');
      if (d) {
        d.classList.add('on');
        d.innerHTML = '<div class="card" style="border-color:#FFD9D9"><b>😢 Something went wrong</b>' +
          '<pre style="white-space:pre-wrap;font-size:12px;color:#E04C4C;margin-top:8px">' +
          ((err && (err.stack || err.message)) || err) + '</pre>' +
          '<div class="btn-row" style="margin-top:10px"><button class="btn sm soft" data-act="forceUpdate">Reload</button></div></div>';
      }
      if (window.console) console.error(err);
    }
  }
  boot();
})();
