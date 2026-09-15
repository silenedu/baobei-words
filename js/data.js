/* ===========================================================
   宝贝背单词小助手 · 数据装配层
   把 W23 / W45 组装成可直接使用的 WORDS，并自动推导：
   chunks（字母块数组）、h（需要高亮的字母下标）、
   mode（拼写模式：fill 填空 / combine 组合）、banks（词库归属）
   =========================================================== */
(function (global) {
  'use strict';

  /* 牛津自拼级别 */
  var LEVEL_META = {
    2: { name: '2 级 · 短元音', short: '短元音' },
    3: { name: '3 级 · 长元音', short: '长元音' },
    4: { name: '4 级 · 辅音组合', short: '辅音组合' },
    5: { name: '5 级 · 字母组合', short: '字母组合' }
  };

  /* 词库（配对游戏/筛选用） */
  var BANK_META = [
    { id: 'today', name: '今日单词', icon: '📅' },
    { id: 'c1', name: '剑桥一级', icon: '1️⃣' },
    { id: 'c2', name: '剑桥二级', icon: '2️⃣' },
    { id: 'c3', name: '剑桥三级', icon: '3️⃣' },
    { id: 'ket', name: 'KET', icon: '🎯' },
    { id: 'pet', name: 'PET', icon: '🏅' },
    { id: 'wrong', name: '错题库', icon: '💡' }
  ];

  /* 每级默认归属的词库 */
  var DEFAULT_BANKS = { 2: ['c1'], 3: ['c1', 'c2'], 4: ['c2', 'c3'], 5: ['c3'] };

  /* 自拼规律的自然拼读提示 */
  var PATTERN_SOUND = {
    a: '短元音 a，读 /æ/，嘴巴张大',
    e: '短元音 e，读 /e/，嘴巴扁扁',
    i: '短元音 i，读 /ɪ/，短促轻快',
    o: '短元音 o，读 /ɒ/，嘴巴圆圆',
    u: '短元音 u，读 /ʌ/，轻轻短短',
    a_e: '魔法 e：a 读字母音 /eɪ/，结尾 e 不发音',
    i_e: '魔法 e：i 读字母音 /aɪ/，结尾 e 不发音',
    o_e: '魔法 e：o 读字母音 /əʊ/，结尾 e 不发音',
    u_e: '魔法 e：u 读字母音 /juː/，结尾 e 不发音',
    ai: 'ai 一起读长音 /eɪ/',
    ay: 'ay 在词尾读长音 /eɪ/',
    ee: 'ee 一起读长音 /iː/',
    ea: 'ea 多数读长音 /iː/，有时读短音 /e/',
    y: '词尾 y 常读 /i/ 或 /aɪ/',
    igh: 'igh 一起读 /aɪ/，gh 不发音',
    ie: 'ie 一起读长音 /aɪ/',
    oa: 'oa 一起读长音 /əʊ/',
    ow: 'ow 读 /əʊ/（snow）或 /aʊ/（cow）',
    ue: 'ue 一起读长音 /uː/',
    ui: 'ui 一起读长音 /uː/',
    ew: 'ew 一起读长音 /uː/',
    oo: 'oo 读长音 /uː/（moon）或短音 /ʊ/（book）',
    ou: 'ou 一起读 /aʊ/（house）',
    oi: 'oi 一起读 /ɔɪ/',
    oy: 'oy 在词尾读 /ɔɪ/',
    au: 'au 一起读 /ɔː/',
    aw: 'aw 一起读 /ɔː/',
    al: 'al 常读 /ɔː/（ball）',
    ar: 'ar 一起读 /ɑː/',
    or: 'or 一起读 /ɔː/',
    our: 'our 常读 /ɔː/（journey）',
    ous: 'ous 在词尾读 /əs/',
    er: 'er 在词尾读轻声 /ə/',
    ir: 'ir 一起读 /ɜː/',
    ur: 'ur 一起读 /ɜː/',
    ear: 'ear 读 /ɪə/（ear）',
    air: 'air 读 /eə/（hair）',
    are: 'are 读 /eə/（square）',
    ure: 'ure 读 /ə/ 或 /tʃə/（picture）',
    nd: '结尾 nd 连读，像 han-d',
    nt: '结尾 nt 连读，像 ten-t',
    mp: '结尾 mp 连读，像 jum-p',
    nk: '结尾 nk 连读，像 pin-k',
    ng: '结尾 ng 一起读 /ŋ/（king）',
    lk: '结尾 lk 连读，像 mil-k',
    sk: 'sk 一起读（skate / desk）'
  };
  var CONSONANT_TIP = ' 组合：两个字母连着读';

  function tipFor(p) {
    if (PATTERN_SOUND[p]) return PATTERN_SOUND[p];
    if (p && p.length > 1) return p + CONSONANT_TIP;
    return '读出这个字母的字母音';
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
