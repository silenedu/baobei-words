/* ===========================================================
   宝贝背单词小助手 · 数据装配层
   把 W23 / W45 组装成可直接使用的 WORDS，并自动推导：
   chunks（字母块数组）、h（需要高亮的字母下标）、
   mode（拼写模式：fill 填空 / combine 组合）、banks（词库归属）
   =========================================================== */
(function (global) {
  'use strict';

  /* Oxford Phonics levels */
  var LEVEL_META = {
    2: { name: 'Level 2 · Short Vowels', short: 'Short Vowels' },
    3: { name: 'Level 3 · Long Vowels', short: 'Long Vowels' },
    4: { name: 'Level 4 · Consonant Teams', short: 'Consonant Teams' },
    5: { name: 'Level 5 · Letter Teams', short: 'Letter Teams' }
  };

  /* Word banks (matching game / filters) */
  var BANK_META = [
    { id: 'today', name: 'Today', icon: '📅' },
    { id: 'c1', name: 'Starters', icon: '1️⃣' },
    { id: 'c2', name: 'Movers', icon: '2️⃣' },
    { id: 'c3', name: 'Flyers', icon: '3️⃣' },
    { id: 'ket', name: 'KET', icon: '🎯' },
    { id: 'pet', name: 'PET', icon: '🏅' },
    { id: 'wrong', name: 'Mistakes', icon: '💡' }
  ];

  /* 每级默认归属的词库 */
  var DEFAULT_BANKS = { 2: ['c1'], 3: ['c1', 'c2'], 4: ['c2', 'c3'], 5: ['c3'] };

  /* Phonics tips (natural spelling hints) */
  var PATTERN_SOUND = {
    a: 'Short a says /æ/ — open your mouth wide',
    e: 'Short e says /e/ — smile a little',
    i: 'Short i says /ɪ/ — quick and light',
    o: 'Short o says /ɒ/ — round your lips',
    u: 'Short u says /ʌ/ — short and soft',
    a_e: 'Magic e: a says its name /eɪ/, the e at the end is silent',
    i_e: 'Magic e: i says its name /aɪ/, the e at the end is silent',
    o_e: 'Magic e: o says its name /əʊ/, the e at the end is silent',
    u_e: 'Magic e: u says /juː/, the e at the end is silent',
    ai: 'ai together says /eɪ/',
    ay: 'ay at the end says /eɪ/',
    ee: 'ee together says /iː/',
    ea: 'ea often says /iː/, sometimes short /e/',
    y: 'y at the end often says /i/ or /aɪ/',
    igh: 'igh together says /aɪ/, gh is silent',
    ie: 'ie together says /aɪ/',
    oa: 'oa together says /əʊ/',
    ow: 'ow says /əʊ/ (snow) or /aʊ/ (cow)',
    ue: 'ue together says /uː/',
    ui: 'ui together says /uː/',
    ew: 'ew together says /uː/',
    oo: 'oo says /uː/ (moon) or short /ʊ/ (book)',
    ou: 'ou together says /aʊ/ (house)',
    oi: 'oi together says /ɔɪ/',
    oy: 'oy at the end says /ɔɪ/',
    au: 'au together says /ɔː/',
    aw: 'aw together says /ɔː/',
    al: 'al often says /ɔː/ (ball)',
    ar: 'ar together says /ɑː/',
    or: 'or together says /ɔː/',
    our: 'our often says /ɔː/ (journey)',
    ous: 'ous at the end says /əs/',
    er: 'er at the end says the soft sound /ə/',
    ir: 'ir together says /ɜː/',
    ur: 'ur together says /ɜː/',
    ear: 'ear says /ɪə/ (ear)',
    air: 'air says /eə/ (hair)',
    are: 'are says /eə/ (square)',
    ure: 'ure says /ə/ or /tʃə/ (picture)',
    nd: 'nd at the end blends: han-d',
    nt: 'nt at the end blends: ten-t',
    mp: 'mp at the end blends: jum-p',
    nk: 'nk at the end blends: pin-k',
    ng: 'ng together says /ŋ/ (king)',
    lk: 'lk at the end blends: mil-k',
    sk: 'sk together (skate / desk)'
  };
  var CONSONANT_TIP = ' blend: two letters read together';

  function tipFor(p) {
    if (PATTERN_SOUND[p]) return PATTERN_SOUND[p];
    if (p && p.length > 1) return p + CONSONANT_TIP;
    return 'Say the letter sound';
  }

  var WORDS = [];
  var byId = {};
  var problems = [];

  function addAll(list, file) {
    list.forEach(function (raw) {
      var w = raw.w;
      if (!w) { problems.push(file + ': 缺 w 字段'); return; }
      if (byId[w]) { problems.push(file + ': 单词重复 ' + w); return; }
      var chunks = String(raw.c || '').split('/');
      if (chunks.join('') !== w) {
        problems.push(w + '（' + file + '）字母块拼接不符：' + raw.c + ' ≠ ' + w);
        return;
      }
      var hc = raw.hc || [];
      var h = [];
      var at = 0;
      chunks.forEach(function (ch, ci) {
        for (var k = 0; k < ch.length; k++) { if (hc.indexOf(ci) >= 0) h.push(at + k); }
        at += ch.length;
      });
      if (!h.length) problems.push(w + ' 没有高亮字母');
      var banks = (DEFAULT_BANKS[raw.L] || []).slice();
      (raw.b || []).forEach(function (b) { if (banks.indexOf(b) < 0) banks.push(b); });

      var item = {
        i: WORDS.length,
        w: w,
        cn: raw.cn || '',
        e: raw.e || '⭐',
        L: raw.L || 2,
        p: raw.p || '',
        pTip: tipFor(raw.p),
        chunks: chunks,
        hc: hc,
        h: h,
        pat: h.map(function (n) { return w[n]; }).join(''),
        mode: chunks.some(function (c) { return c.length > 1; }) ? 'combine' : 'fill',
        ps: raw.ps || 'n.',
        d: raw.d || '',
        x: raw.x || '',
        z: raw.z || '',
        banks: banks
      };
      WORDS.push(item);
      byId[w] = item;
    });
  }

  addAll(typeof W23 !== 'undefined' ? W23 : [], 'data-l23.js');
  addAll(typeof W45 !== 'undefined' ? W45 : [], 'data-l45.js');

  /* 统计各词库数量 */
  var bankWords = {};
  BANK_META.forEach(function (b) { bankWords[b.id] = []; });
  WORDS.forEach(function (it) {
    it.banks.forEach(function (b) { if (bankWords[b]) bankWords[b].push(it); });
  });

  var stats = {
    total: WORDS.length,
    byLevel: {},
    byBank: {}
  };
  WORDS.forEach(function (it) { stats.byLevel[it.L] = (stats.byLevel[it.L] || 0) + 1; });
  Object.keys(bankWords).forEach(function (k) { stats.byBank[k] = bankWords[k].length; });

  global.PWData = {
    WORDS: WORDS,
    byId: byId,
    LEVEL_META: LEVEL_META,
    BANK_META: BANK_META,
    bankWords: bankWords,
    stats: stats,
    problems: problems,
    tipFor: tipFor
  };
})(typeof window !== 'undefined' ? window : globalThis);
