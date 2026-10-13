import { CHAPTERS, PHASES } from './data.js';
import { createRun, getChapter, choicesFor, advance, rewind, validateRun, nextGame } from './engine.js';
import { basicReview, deepReview, signed, stateText } from './review.js';
import { actionCommentary } from './commentary.js';

const app = document.querySelector('#app');
const modal = document.querySelector('#modal');
const STORAGE = 'lpl-rewrite-v1';
const esc = text => String(text).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const icons = {
  archive: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M9 13h6M7 3h10"/>',
  journey: '<path d="M4 19V5m0 14h16M8 15l4-5 4 2 4-7"/>',
  trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4a2 2 0 002 5h1m8-5h3a2 2 0 01-2 5h-1"/>',
  book: '<path d="M12 6v15M3 4c3-1 6 0 9 2 3-2 6-3 9-2v15c-3-1-6 0-9 2-3-2-6-3-9-2z"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sound: '<path d="m11 5-6 4H2v6h3l6 4zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  rewind: '<path d="m11 6-8 6 8 6zm10 0-8 6 8 6z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12"/><circle cx="12" cy="12" r="3"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
  flag: '<path d="M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
  trophy: '<path d="M8 3h8v5a4 4 0 0 1-8 0zM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 1v6m-4 3h8m-9 0h10"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>'
};
const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const load = () => { try { return JSON.parse(localStorage.getItem(STORAGE)) || {}; } catch { return {}; } };
const saved = load();
let run = validateRun(saved.run) ? saved.run : null;
let completed = Array.isArray(saved.completed) ? saved.completed.filter(x => x && CHAPTERS.some(c => c.id === x.chapterId) && typeof x.won === 'boolean' && typeof x.player === 'string').slice(-100) : [];
let unlockedAchievements = Array.isArray(saved.achievements) ? saved.achievements : [];

const ACHIEVEMENTS = [
  { id:'first_win', icon:'trophy', logo:'./assets/ach-first-win.jpg', name:'你做到了', desc:'赢下任意一局比赛' },
  { id:'rng_first', icon:'flag', logo:'./assets/logo-rng.png', name:'救赎开始', desc:'用 RNG 任意选手赢下 2018 八强战' },
  { id:'rng_all', icon:'star', logo:'./assets/logo-rng.png', name:'全员无憾', desc:'用 RNG 全部五名选手各赢一局' },
  { id:'tes_first', icon:'zap', logo:'./assets/logo-tes.png', name:'破浪前行', desc:'用 TES 任意选手赢下 2020 半决赛' },
  { id:'tes_all', icon:'star', logo:'./assets/logo-tes.png', name:'银河战舰', desc:'用 TES 全部五名选手各赢一局' },
  { id:'jdg_first', icon:'shield', logo:'./assets/logo-jdg.png', name:'复仇之刃', desc:'用 JDG 任意选手赢下 2023 半决赛' },
  { id:'jdg_all', icon:'star', logo:'./assets/logo-jdg.png', name:'黄金之路', desc:'用 JDG 全部五名选手各赢一局' },
  { id:'blg_first', icon:'crown', logo:'./assets/logo-blg.png', name:'新王加冕', desc:'用 BLG 任意选手赢下 2024 决赛' },
  { id:'blg_all', icon:'star', logo:'./assets/logo-blg.png', name:'翻过那座山', desc:'用 BLG 全部五名选手各赢一局' },
  { id:'all_chapters', icon:'trophy', logo:'./assets/ach-league-champ.png', name:'联赛霸主', desc:'四个章节都赢过至少一次' },
  { id:'all_players', icon:'flag', logo:'./assets/ach-legend.png', name:'活着的传奇', desc:'用全部 20 名选手各赢一局' },
  { id:'ten_games', icon:'trophy', logo:'./assets/ach-undefeated.png', name:'永不言败', desc:'累计完成 10 局比赛' },
];

function checkAchievements() {
  const newOnes = [];
  const won = completed.filter(x=>x.won);
  const wonByTeam = team => new Set(won.filter(x=>x.chapterId===team).map(x=>x.player));
  const wonChapters = new Set(won.map(x=>x.chapterId));
  const wonPlayers = new Set(won.map(x=>x.player));
  const has = id => unlockedAchievements.includes(id);
  const grant = id => { if(!has(id)){ unlockedAchievements.push(id); newOnes.push(id); } };

  if(wonByTeam('rng2018').size>=1) grant('rng_first');
  if(wonByTeam('rng2018').size>=5) grant('rng_all');
  if(wonByTeam('tes2020').size>=1) grant('tes_first');
  if(wonByTeam('tes2020').size>=5) grant('tes_all');
  if(wonByTeam('jdg2023').size>=1) grant('jdg_first');
  if(wonByTeam('jdg2023').size>=5) grant('jdg_all');
  if(wonByTeam('blg2024').size>=1) grant('blg_first');
  if(wonByTeam('blg2024').size>=5) grant('blg_all');
  if(wonChapters.size>=4) grant('all_chapters');
  if(wonPlayers.size>=20) grant('all_players');
  if(won.length>=1) grant('first_win');
  if(completed.length>=10) grant('ten_games');

  return newOnes;
}
let scene = 'home';
let showGrid = true;
let chapterId = 'blg2024';
let playerIndex = 2;
let permit = null;
let detailed = false;
let rewindReady = Boolean(run?.finished && !run.won && saved.rewindReady);
let sound = false;
let toastTimer;

function persist() { try { const slim = { ...run, gameHistory: run.gameHistory?.map(g => ({ game: g.game, won: g.won, gold: g.gold })) }; localStorage.setItem(STORAGE, JSON.stringify({ run: slim, completed, rewindReady, achievements: unlockedAchievements })); } catch { toast('浏览器存储不可用；当前对局仍可继续。'); } }
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2000);
}
let bgm = null;
function getBGM() {
  if (!bgm) { bgm = new Audio('assets/bgm.mp3'); bgm.loop = true; bgm.volume = 0.4; }
  return bgm;
}
function cue() {
  if (!sound) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.frequency.value = 440; gain.gain.setValueAtTime(0.025, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + .1);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + .12); osc.onended = () => ctx.close();
  } catch { /* Sound is optional. */ }
}
const championImg = (p, c, cls = '') => { const local = `assets/${c.assetPatch}/${p.championId}.png`; const cdn = `https://ddragon.leagueoflegends.com/cdn/${c.assetPatch}/img/champion/${p.championId}.png`; return `<span class="champion-img ${cls}" data-fallback="${esc(p.champion.slice(0, 1))}"><img src="${local}" data-cdn="${cdn}" onerror="this.onerror=null;this.src=this.dataset.cdn" alt="${esc(p.champion)} · ${c.patch}版本头像" loading="lazy"></span>`; };
const tag = (text, cls = '') => `<span class="tag ${cls}">${text}</span>`;
function shell(content) {
  const nav = (id, name, glyph) => `<button class="nav-item ${scene === id || (id === 'catalog' && ['play','review'].includes(scene)) ? 'active' : ''}" data-action="nav" data-view="${id}">${icon(glyph)}<span>${name}</span>${id === 'catalog' ? '<span class="nav-count">04</span>' : ''}</button>`;
  return `<aside class="sidebar">
    <a href="#" class="brand" data-action="home" aria-label="不再遗憾首页"><span class="brand-mark">↶</span><span>不再遗憾<small>THE SECOND CHANCE</small></span></a>
    <div class="sidebar-label">你的平行赛场</div>
    <nav aria-label="主要导航">${nav('catalog','遗憾档案馆','archive')}${nav('journey','我的改写','journey')}${nav('achievements','成就馆','trophy')}<button class="nav-item" data-action="help">${icon('book')}<span>游玩指南</span></button></nav>
    <div class="sidebar-note"><span class="tiny-dot"></span><span>故事的另一种可能<br><small>真实阵容，属于你的决定。</small></span></div>
    <div class="sidebar-bottom"><span class="version">PLAYABLE BUILD · 0.1</span><button class="text-button" data-action="sources">${icon('info')}历史资料与素材</button></div>
  </aside>
  <div class="workspace"><header class="topbar"><div class="breadcrumb">平行赛场 <span>/</span> ${scene === 'journey' ? '我的改写' : scene === 'achievements' ? '成就馆' : scene === 'play' ? '比赛进行中' : scene === 'review' ? '赛后复盘' : '遗憾档案馆'}</div><div class="top-actions"><button class="sound-button ${sound ? 'on' : ''}" data-action="sound" aria-pressed="${sound}" aria-label="${sound ? '关闭' : '开启'}音乐">${icon('sound')}<span>音乐${sound ? '开' : '关'}</span></button><span class="local-label"><span class="tiny-dot"></span>本地存档</span></div></header>
  <main id="main" tabindex="-1">${content}</main><footer class="page-footer"><span>献给每一个，还记得那场比赛的人。</span><span>真实历史 × 战术推演</span></footer></div>`;
}

function gridView() {
  const bgMap = { blg2024: './assets/blg-worlds-2024.png?v=3', rng2018: './assets/rng-worlds-2018.png?v=3', tes2020: './assets/tes-worlds-2020.png?v=3', jdg2023: './assets/jdg-worlds-2023.png?v=3' };
  const posMap = { blg2024: 'center 25%', rng2018: 'center 30%', tes2020: 'center 35%', jdg2023: 'center 35%' };
  return `<section class="page-heading"><div><div class="eyebrow">THE ARCHIVE / 遗憾档案馆</div><h1>选择你的遗憾<span class="orange">。</span></h1><p>四场比赛，四个转折点。选一场，重新来过。</p></div></section>
  <div class="grid-cards">${CHAPTERS.map(ch => { const bg = bgMap[ch.id]; const pos = posMap[ch.id]; const accentColor = { blg2024:'#d3df9b', rng2018:'#c9a227', tes2020:'#3a6bd8', jdg2023:'#b83a3a' }[ch.id]; return `<button class="grid-card ${{rng2018:'rng-feature',tes2020:'tes-feature',jdg2023:'jdg-feature'}[ch.id]||'blg-feature'}" data-action="chapter" data-id="${ch.id}" ${bg?`style="--card-bg:url('${bg}');background-position:${pos}"`:''}>
    <div class="grid-card-inner" ${bg?'':`style="background:linear-gradient(135deg,${accentColor}22 0%,#191c19 60%)"`}><span class="grid-year">${ch.year}</span><h2>${ch.team} <small>vs</small> ${ch.opponent}</h2><p>${ch.event} · ${ch.stage}</p><div class="grid-score">${ch.startingScore[0]} : ${ch.startingScore[1]}</div><span class="grid-hist">历史：${ch.historicalScore}</span></div>
  </button>`;}).join('')}</div>`;
}

function homeView() {
  return `<section class="home-screen"><div class="home-bg"></div><div class="home-particles"><div class="p1"></div><div class="p2"></div><div class="p3"></div><div class="p4"></div></div><div class="home-content"><span class="home-eyebrow">THE SECOND CHANCE · 遗憾档案馆</span><h1>LPL：不再遗憾</h1><div class="home-divider"></div><p>回到那些年，你放不下的那场比赛。<br>真实阵容，你的决定，另一种结局。</p><button class="home-start" data-action="start-game">开始改写 ${icon('arrow')}</button><div class="home-chapter-preview"><span>2018 RNG</span><span>2020 TES</span><span>2023 JDG</span><span>2024 BLG</span></div><small class="home-note">本地存档 · 无需登录 · 关键决策不限时</small></div></section>`;
}

function catalog() {
  const c = getChapter(chapterId), p = c.players[playerIndex];
  const open = c.unlocked || permit === c.id;
  return `<section class="page-heading"><div><div class="eyebrow">THE ARCHIVE / 遗憾档案馆</div><h1>有些比赛，值得再打一次<span class="orange">。</span></h1><p>回到命运的转折点。这一次，把决定权交给你。</p></div><button class="text-button" data-action="back-grid">← 返回选关</button></section>
    <section class="feature ${{rng2018:'rng-feature',tes2020:'tes-feature',jdg2023:'jdg-feature'}[c.id]||'blg-feature'}" aria-label="${c.year}年${c.team}对${c.opponent}">
      <div class="feature-top"><span class="overline">${c.event} <span> / </span> GAME 0${c.game}</span><span class="edition">${c.year} WORLDS</span></div>
      <div class="feature-body"><div class="feature-copy"><div class="feature-label"><span class="tiny-dot"></span>${c.unlocked ? '免费首章' : '额外体验章节'} <span>·</span> ${c.game === 5 ? '决胜局' : '第' + ['一','二','三','四','五'][c.game-1] + '局'}</div><h2>${c.id === 'blg2024' ? '差的那一步，<br>由你走完。' : c.id === 'rng2018' ? '那一年的梦，<br>再续一局。' : c.id === 'tes2020' ? '上海的半决赛，<br>从第一局改写。' : '大满贯只差一步，<br>从第一局开始。'}</h2><p>${c.description}</p><div class="feature-meta"><span>${icon('clock')}8 次关键决策</span><span>${icon('flag')}5 位真实选手</span></div></div>
      <div class="match-art" aria-label="系列赛比分${c.startingScore[0]}比${c.startingScore[1]}"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><span class="match-location">${c.city} / ${c.date}</span><div class="team-names"><span>${c.team}</span><small>VS</small><span>${c.opponent}</span></div><div class="big-score">${c.startingScore[0]}<span>:</span>${c.startingScore[1]}</div><div class="match-caption">${c.game === 5 ? '一局，决定故事的结尾。' : '系列赛从零开始，赢下这局才能继续。'}</div><span class="match-coordinate">BO5 / ${c.game === 5 ? 'MATCH POINT' : 'GAME ' + c.game}</span></div></div>
      <div class="feature-bottom"><span>${icon('check')}参赛名单与英雄已核对</span><span>PATCH ${c.patch}<i></i>从开局介入 · 后续为推演</span><button class="text-button" data-action="chapter-info">查看比赛档案 ${icon('arrow')}</button></div>
    </section>
    <section class="role-section"><div class="section-heading"><div><span class="section-index">01</span><h2>选择你的选手席</h2><span class="subtle">真实首发 · 锁定当局英雄</span></div><span class="team-label">${c.team} / ${c.year}</span></div>
      <div class="player-grid">${c.players.map((pl, i) => { const portraits={blg2024:{knight:'blg-knight.jpeg',Bin:'blg-bin.jpg',ON:'blg-on.jpeg',Elk:'blg-elk.jpeg',Xun:'blg-xun.jpeg'},rng2018:{Letme:'rng-letme.webp',Mlxg:'rng-mlxg.webp',xiaohu:'rng-xiaohu.webp',Uzi:'rng-uzi.webp',Ming:'rng-ming.webp'},tes2020:{'369':'tes-369.jpg',Karsa:'tes-karsa.jpg',knight:'tes-knight.jpg',JackeyLove:'tes-jackeylove.jpg',yuyanjia:'tes-yuyanjia.jpg'},jdg2023:{'369':'jdg-369.jpg',Kanavi:'jdg-kanavi.jpg',knight:'jdg-knight.jpg',Ruler:'jdg-ruler.jpg',Missing:'jdg-missing.jpg'}};const portrait=portraits[c.id]?portraits[c.id][pl.name]:null;return `<button class="player-card ${portrait?'has-portrait':''} ${i === playerIndex ? 'selected' : ''}" ${portrait?`style="--portrait:url('./assets/${portrait}')"`:''} data-action="player" data-index="${i}" aria-pressed="${i === playerIndex}"><div class="player-card-top"><span>${pl.position}</span><span class="selection-circle">${i === playerIndex ? icon('check') : ''}</span></div><div class="player-visual">${championImg(pl,c)}<span class="player-initial">${pl.name.slice(0,1).toUpperCase()}</span></div><strong>${pl.name}</strong><span class="champion-name">${pl.champion}</span><span class="player-task">${pl.task}</span></button>`;}).join('')}</div>
      <div class="portrait-note">${icon('info')}英雄头像为对应版本图标；选手席背景为历史定妆照，阵容以当局首发为准。</div>
    </section>
    <section class="entry-bar"><div><span class="selected-label">你的身份</span><strong>${c.team} ${p.name}<span> / ${p.champion}</span></strong><p>${c.goal}</p></div><div class="entry-actions">${run && !run.finished ? '<button class="secondary" data-action="continue">继续已保存的对局</button>' : ''}<button class="primary" data-action="${open ? 'briefing' : 'unlock'}">${open ? '进入决胜局' : '观看广告，体验本章'} ${icon(open ? 'arrow' : 'play')}</button>${!open ? '<small>开发版模拟广告 · 解锁一次完整体验</small>' : '<small>全程免费 · 比赛中无广告</small>'}</div></section>
    <section class="how-strip"><div><span>01</span><p>选择真实选手<small>使用当局英雄与身份</small></p></div><div><span>02</span><p>在直播中作决定<small>只掌握角色已知的信息</small></p></div><div><span>03</span><p>写下另一种结局<small>复盘选择带来的改变</small></p></div></section>`;
}

function settledAction(index) {
  const text = actionCommentary(run, index);
  return `<div class="action-reading"><p>${esc(text.context)}</p><p><span>局势变化</span>${esc(text.impact)}</p><details class="reading-details"><summary>为什么会这样？查看依据与下一步</summary><p><span>结算依据</span>${esc(text.reason)}</p><p class="reading-next"><span>下一步</span>${esc(text.next)}</p></details></div>`;
}
function intermissionView() {
  const c = getChapter(run.chapterId);
  const lastGame = run.gameHistory.at(-1);
  const [a, b] = run.seriesScore;
  return `<div class="review-header" style="padding-top:40px"><div class="eyebrow">GAME ${lastGame.game} 结束</div><span class="ending-glyph" style="${lastGame.won?'':'border-color:var(--red)'}">${icon(lastGame.won?'trophy':'flag')}</span><h1>第 ${lastGame.game} 局，${lastGame.won ? '你们拿下了。' : '你们输了。'}</h1><p>${lastGame.won ? '系列赛比分改写。对手回到更衣室调整，你们也需要复盘这一局的关键选择。' : '对手抓住了机会。休息一下，下一局重新来过。'}</p><div class="ending-score"><span>${c.team}</span><strong>${a} : ${b}</strong><span>${c.opponent}</span></div>${tag(lastGame.won?'你领先':'对手领先')}</div>
  <section class="review-actions" style="text-align:center"><div><h3>第 ${run.gameNumber + 1} 局即将开始</h3><p>系列赛是 BO5，先赢三局。当前比分 ${a}:${b}，${a > b ? '你领先，再赢一局就拿到赛点。' : a < b ? '对手领先，再输一局就被淘汰。' : '平局，下一局谁赢谁领先。'}</p><p style="color:var(--muted);font-size:11px;margin-top:8px">后续局次为架空推演，英雄将根据选手擅长与团队需求调整。</p></div><div class="review-action-buttons" style="justify-content:center"><button class="primary" data-action="next-game">进入第 ${run.gameNumber + 1} 局 ${icon('arrow')}</button></div></section>`;
}
function matchView() {
  const c = getChapter(run.chapterId), p = c.players[run.playerIndex], phases = c.phases || PHASES, phase = phases[run.step];
  const choice = choicesFor(run);
  const vision = run.vision >= 3 ? '河道视野较完整' : run.vision >= 1 ? '部分区域可见' : '河道信息不足';
  const formation = run.cohesion >= 3 ? '队友接应良好' : run.cohesion >= 1 ? '需要确认队友距离' : '阵型出现脱节';
  const gold = `${run.gold >= 0 ? '+' : '−'}${(Math.abs(run.gold)/1000).toFixed(2)}k`;
  const last = run.history.at(-1);
  return `<div class="match-heading"><button class="text-button" data-action="leave">${icon('back')} 暂存并返回</button><div class="live-label"><span class="tiny-dot"></span>文字直播 <span>·</span> 游戏推演</div><span class="subtle">${c.year} ${c.event} / G${run.gameNumber}</span></div>
  <section class="scoreboard"><div class="score-team"><strong>${c.team}</strong><small>你的队伍</small></div><div class="score-center"><span class="score-context">系列赛比分 · ${c.stage}</span><strong>${run.seriesScore[0]} <span>:</span> ${run.seriesScore[1]}</strong><span class="match-time">${phase.time} <small>推演时钟</small></span></div><div class="score-team opponent"><strong>${c.opponent}</strong><small>对手</small></div></section>
  <p class="simulation-boundary">你的平行赛况 · 首发与英雄来自真实比赛，以下事件由你的选择推演。${run.rulesVersion===2?'本局采用阶段取舍规则。':'此存档沿用原版规则。'}</p>
  <div class="phase-track" aria-label="第${run.step+1}个决策，共8个">${phases.map((ph,i)=>`<span class="${i<run.step?'done':i===run.step?'current':''}"><i>${i<run.step?'✓':String(i+1).padStart(2,'0')}</i><small>${ph.name}</small></span>`).join('')}</div>
  <div class="match-layout"><section class="broadcast"><div class="panel-title"><div>${icon('archive')}<h2>比赛直播</h2></div><span>你的视角 · ${p.name}</span></div>
    <div class="broadcast-feed" aria-label="比赛直播记录">${run.history.length>1 ? `<details class="past-feed"><summary>查看之前的 ${run.history.length-1} 次决策</summary>${run.history.slice(0,-1).map((h,i)=>`<div class="log-row"><time>${h.time}</time><div><span class="log-kind">你的选择 / ${h.phase}</span>${settledAction(i)}</div></div>`).join('')}</details>` : ''}
    ${last ? `<div class="log-row result-log"><time>${last.time}</time><div><span class="log-kind">行动结算 / ${last.phase}</span>${settledAction(run.history.length-1)}</div></div>` : `<div class="log-row"><time>00:00</time><div><span class="log-kind">真实背景</span><p>${c.game === 5 ? '双方带着 2:2 的比分进入第五局。' : `系列赛比分 ${c.startingScore[0]}:${c.startingScore[1]}，这是第 ${c.game} 局。`}你已经坐上选手席，之后的赛况将因你的决定发生改变。</p></div></div>`}
    <div class="log-row active-log"><time>${phase.time}</time><div><span class="log-kind accent">${phase.name} / 游戏推演</span><p>${phase.copy}</p></div></div><div class="team-signal">${icon('flag')}<div><span>队内沟通 · 游戏模拟（非真实语音记录）</span><p>${phase.signal}</p></div></div>
    <div class="known-info">${icon('eye')}<span>${vision} <i>·</i> ${formation}</span></div></div>
    <div class="decision"><div class="decision-heading"><span class="decision-dot"></span><h3>现在，你会怎么做？</h3><span>${String(run.step+1).padStart(2,'0')} / 08</span></div><p class="decision-hint">没有倒计时。想清楚再行动，每个选择都有代价。</p><div class="choices">${choice.map((ch,i)=>`<button class="choice" data-action="choose" data-index="${i}" ${ch.disabled ? 'disabled' : ''}><span class="choice-letter">${'ABC'[i]}</span><span><strong>${ch.label}</strong><small>${ch.disabled ? '大招冷却中，暂不可执行' : ch.note}</small></span>${icon('arrow')}</button>`).join('')}</div></div>
  </section><aside class="match-sidebar"><section class="identity"><div class="side-overline">YOUR SEAT / 你的选手席</div><div class="identity-main">${championImg(p,c)}<div><h2>${p.name}</h2><span>${c.team} · ${p.position}</span></div></div><div class="hero-name">${p.champion}<span>PATCH ${c.patch}</span></div><p>${p.task}</p><div class="skill-row"><span>闪现</span><strong class="${run.flashReadyAt > phase.seconds ? 'muted' : 'ready'}">${run.flashReadyAt > phase.seconds ? `${run.flashReadyAt-phase.seconds} 秒` : '可用'}</strong></div><div class="skill-row"><span>大招</span><strong class="${phase.seconds<550 || run.ultReadyAt > phase.seconds ? 'muted' : 'ready'}">${phase.seconds<550 ? '未解锁 / 推演阶段' : run.ultReadyAt > phase.seconds ? `${run.ultReadyAt-phase.seconds} 秒` : '可用'}</strong></div></section>
  <section class="state-panel"><h3>地图局势<span>推演数据</span></h3><div class="state-row"><span>团队经济差</span><strong class="${run.gold>=0?'ready':'danger'}">${gold}</strong></div><div class="state-row"><span>击杀</span><strong>${run.kills[0]} <span>:</span> ${run.kills[1]}</strong></div><div class="state-row"><span>防御塔</span><strong>${run.towers[0]} <span>:</span> ${run.towers[1]}</strong></div><div class="state-location">${icon('flag')}${phase.location}</div></section>
  <section class="opponent-panel"><h3>对方首发<span>${c.opponent} / ${c.year}</span></h3>${c.enemies.map(e=>`<div class="enemy-row">${championImg(e,c)}<span>${e.name}<small>${e.champion}</small></span><small>${e.position}</small></div>`).join('')}</section><div class="tactical-note">${icon('info')}<p>${c.threats[run.step % c.threats.length]}</p></div></aside></div>`;
}

function endingType(run) {
  const c = getChapter(run.chapterId);
  const decider = c.game === 5;
  if (run.won) {
    if (c.seriesTotal) return { kind: 'rewritten', label: '改写系列赛', icon: 'trophy',
      title: `你赢下了这个 BO5。`,
      desc: `系列赛比分 ${run.seriesScore[0]}:${run.seriesScore[1]}，${c.team} 晋级。第 1 局为真实 BP，后续局次为架空推演——英雄选择根据选手擅长与团队需求设计。` };
    if (decider) return { kind: 'rewritten', label: '改写终局', icon: 'trophy',
      title: c.id==='blg2024' ? '这一次，金色雨为你而落。' : '这一次，釜山的故事没有结束。',
      desc: c.id==='blg2024' ? '你与 BLG 赢下了决胜局，在这个平行故事中捧起奖杯。' : '你与 RNG 赢下了决胜局，晋级四强。距离冠军，仍有接下来的比赛。' };
  }
  if (c.seriesTotal) return { kind: 'regret', label: '系列赛落败', icon: 'flag',
    title: `系列赛 ${run.seriesScore[0]}:${run.seriesScore[1]}，你们没能翻盘。`,
    desc: `第 1 局为真实 BP，后续局次为架空推演。${run.seriesScore[0] > 0 ? '你改写了其中一些局次，但整体仍未能晋级。' : '每一局都在重新开局，却始终没有找到赢的方法。'}` };
  const checks = [run.gold >= 1800, run.cohesion >= 2, run.tempo >= 1];
  const satisfied = checks.filter(Boolean).length;
  if (satisfied >= 2) return { kind: 'near', label: '改变关键节点', icon: 'flag',
    title: '你改写了局势，但还差一步。',
    desc: '你在多个关键节点拿到了优势，经济或阵型一度接近赢下比赛，但最后的收尾没有兑现。这不是历史上的那个失误，而是新的缺口。' };
  return { kind: 'regret', label: '另一种遗憾', icon: 'flag',
    title: '避开了老路，却走进了另一道坎。',
    desc: '你做了不同的选择，比赛走向了另一条分支，但同样没有转化为胜势。有些差距，换一条路也未必能绕开。' };
}
function seriesScore(run, c) {
  if (c.seriesTotal) return `${run.seriesScore[0]} : ${run.seriesScore[1]}`;
  const [a, b] = c.startingScore;
  return run.won ? `${a+1} : ${b}` : `${a} : ${b+1}`;
}
function reviewView() {
  const c = getChapter(run.chapterId), p = c.players[run.playerIndex];
  const basic = basicReview(run);
  const et = endingType(run);
  const score = seriesScore(run, c);
  return `<div class="review-header"><div class="eyebrow">ANOTHER ENDING / 你的平行结局</div><span class="ending-glyph">${icon(et.icon)}</span>${tag(et.label, run.won?'success':'')}<h1>${et.title}</h1><p>${et.desc}</p><div class="ending-score"><span>${c.team}</span><strong>${score}</strong><span>${c.opponent}</span></div>${tag(c.game===5 ? '游戏推演结局 · 架空分支起点 00:00' : '游戏推演结局 · 第1局为真实BP，后续局次为架空推演')}</div>
  <section class="review-summary"><div class="section-heading"><div><span class="section-index">01</span><h2>免费的基础复盘</h2></div><span class="subtle">${p.name} / ${p.champion}</span></div><div class="history-compare"><div><span class="side-overline">真实历史</span><h3>${c.historicalScore}</h3><p>${c.historicalResult}</p><a href="${c.source}" target="_blank" rel="noopener noreferrer">查看当局比赛记录 ↗</a></div><div><span class="side-overline">你的改写</span><h3>${c.team} ${score} ${c.opponent}</h3><p>${esc(basic.summary)}</p><small>架空分支起点：00:00 你介入之后，全部赛况均为规则推演，不代表真实比赛过程。</small></div></div>
  <details class="basic-events"><summary>展开 8 次选择与数值结算</summary><div class="review-timeline">${run.history.map((h,i)=>`<div class="review-event"><time>${h.time}</time><span class="review-dot ${h.result}"></span><div><strong>${h.phase}</strong><p>${esc(h.action)}</p><small>${esc(basic.events[i])}</small></div></div>`).join('')}</div></details></section>
${detailed ? deepReviewView() : '<section class="deep-preview"><h2>深度复盘会告诉你什么？</h2><p>胜负根因 → 关键转折 → 两种替代选择的终局验证 → 一条最少改动的获胜路线。</p><p>还会判断：只回溯最后一步，究竟能不能挽回本局。</p></section>'}
<section class="review-actions"><div><h3>故事，仍然由你决定。</h3><p>免费重开始终可用，广告不会改变角色属性。</p></div><div class="review-action-buttons"><button class="secondary" data-action="restart">${icon('rewind')}免费重新开局</button>${!run.won?`<button class="primary" data-action="reward-rewind">${icon('play')}${rewindReady?'选择回溯节点（已解锁）':'观看广告，回溯任意节点'}</button>`:''}<button class="secondary" data-action="${detailed?'deep-open':'reward-deep'}">${icon(detailed?'check':'play')}${detailed?'已展开深度复盘':'观看广告，解锁深度复盘'}</button></div><small class="ad-disclosure">激励广告为开发版模拟；关闭不发奖励，完成后才解锁。</small></section><button class="text-button return-archive" data-action="back-grid">${icon('back')}返回档案馆，选择另一场比赛</button>`;
}

function deepReviewView() {
  const r = deepReview(run);
  const turns = r.nodes.map(n => ({ ...n, best: n.alternatives.filter(a=>a.final).sort((a,b)=>Number(b.final.won)-Number(a.final.won)||b.delta-a.delta)[0] }))
    .filter(n=>n.best).sort((a,b)=>Number(b.best.final.won !== run.won)-Number(a.best.final.won !== run.won)||Math.abs(b.best.delta)-Math.abs(a.best.delta)).slice(0,3);
  const result = s => `${s.won ? '获胜' : '未获胜'} · ${stateText(s)}`;
  return `<section id="deep-review" class="deep-review" aria-label="深度复盘报告"><div class="section-heading"><div><span class="section-index">02</span><h2>你的整局因果报告</h2></div>${tag('广告奖励已解锁','success')}</div>
    <article class="repair-card priority-review"><h3>${run.won?'最值得保留的一步':'先看这一处，能否改变结局'}</h3>${turns.length?`<p><strong>${turns[0].time} · ${turns[0].phase}</strong></p><p>你选择了「${esc(turns[0].action)}」。${esc(turns[0].cause)}</p><p>只把这一项换成「${esc(turns[0].best.action)}」，其余选择不变：${esc(result(turns[0].best.final))}。</p>`:''}<p>${run.won?'原路线已经获胜，替代结果用于检验收益与风险。':r.minimumChanges===1?'本局只需改变一项选择即可挽回。':`单点改善不等于挽回本局，至少要改变 ${r.minimumChanges} 项；具体路线在下方。`}</p></article>
    <article class="deep-diagnosis"><span class="side-overline">WHY / 胜负根因</span><h3>${run.won?'优势如何走到终局':'问题从哪里开始'}</h3><p>${esc(r.root)}</p><div class="rewind-verdict"><strong>最后一步还有没有救？</strong><p>${esc(r.rewindVerdict)}</p></div></article>
    <h3 class="deep-heading">关键转折 · 按单点替换对结局的影响排列</h3><p class="deep-caption">只改这一项，其余选择保持原样。经济改善不一定足以获胜，仍需同时满足接应与节奏条件。</p>
    <div class="turn-grid">${turns.map(n=>`<article class="turn-card"><span>${n.time} / ${n.phase}</span><h3>${esc(n.action)}</h3><p>${esc(n.cause)}</p><div class="turn-counter"><strong>如果改为：${esc(n.best.action)}</strong><p>${esc(result(n.best.final))}</p><small>终局经济比原路线 ${signed(n.best.delta)}</small></div></article>`).join('')}</div>
    <article class="repair-card"><h3>${run.won?'保住胜利的路线检查':'一条最少改动的获胜路线'}</h3><p>${run.won?'你的原路线已经满足获胜条件，不需要为了“更激进”而改变决定。':`在当前规则中，至少需要改变 ${r.minimumChanges} 项选择。以下是一条经过整局重算的路线，并非唯一解。`}</p>${r.changes.length?`<ol>${r.changes.map(x=>`<li><strong>${x.time} · ${x.phase}</strong><span>原选择：${esc(x.from)}</span><span class="ready">改为：${esc(x.to)}</span></li>`).join('')}</ol>`:''}<p class="repair-result">改写终局：${esc(result(r.repair))}</p><p>下一局练习：按当前选项检查所需视野与接应；资源窗口中等待也有代价。终局需经济差 ≥ +1,800、接应 ≥ 2、节奏 ≥ 1。</p></article>
    <article class="matchup-review"><h3>把原因放回你的选手席</h3><p>${esc(r.role)}</p><p>${esc(r.matchup)}</p></article>
    <h3 class="deep-heading">逐节点拆解 · 当时的条件、代价与替代结果</h3><p class="deep-caption">展开任意节点，查看两条替代分支。每次对照仅改变该节点，不自动修正后续操作。</p>
    <div class="node-reviews">${r.nodes.map(n=>`<details class="node-review"><summary><time>${n.time}</time><strong>${n.phase}</strong><span>${esc(n.action)}</span></summary><div class="node-body"><p class="node-state">行动前：${esc(stateText(n.before))}<br>行动后：${esc(stateText(n.after))}</p><h4>为什么会这样结算</h4><p>${esc(n.cause)}</p><h4>这一阶段真正要解决的问题</h4><p>${esc(n.lesson)}</p><div class="counter-grid">${n.alternatives.map(a=>`<article><h4>改为：${esc(a.action)}</h4>${a.unavailable?'<p>该选择或后续原操作受技能冷却限制，无法完成固定后续路线的对照。</p>':`<p>当次经济变化 ${signed(a.immediate.gold-n.before.gold)}</p><p>当次结算后：${esc(stateText(a.immediate))}</p><strong class="${a.final.won?'ready':'danger'}">${a.final.won?'最终获胜':'最终仍未获胜'}</strong><p>${esc(stateText(a.final))}</p><small>终局经济比原路线 ${signed(a.delta)}</small>`}</article>`).join('')}</div></div></details>`).join('')}</div>
    <p class="review-scope">${esc(r.scope)}</p></section>`;
}

function journeyView() {
  const wins = completed.filter(x=>x.won).length;
  return `<section class="page-heading"><div><div class="eyebrow">YOUR JOURNEY / 我的改写</div><h1>每一个选择，都留下回声<span class="orange">。</span></h1><p>记录保存在这台设备的浏览器中。</p></div></section><div class="journey-stats"><div><strong>${completed.length}</strong><span>完成对局</span></div><div><strong>${wins}</strong><span>改写结局</span></div><div><strong>${new Set(completed.map(x=>x.player)).size}</strong><span>体验选手</span></div></div>${completed.length ? `<div class="journey-list">${completed.slice().reverse().map(x=>{const c=getChapter(x.chapterId);return `<article class="journey-record"><span class="record-year">${c.year}</span><div><h3>${c.team} vs ${c.opponent}</h3><p>${esc(x.player)} · ${c.event}</p></div>${tag(x.won?'改写终局':'未竟之梦',x.won?'success':'')}<span class="record-date">${new Date(x.date).toLocaleDateString('zh-CN')}</span></article>`;}).join('')}</div>` : `<div class="empty-state">${icon('archive')}<h2>你的第一场改写，还没开始。</h2><p>选一个你念念不忘的瞬间，回到选手席。</p><button class="primary" data-action="home">前往档案馆 ${icon('arrow')}</button></div>`}`;
}

function achievementsView() {
  const pct = Math.round(unlockedAchievements.length / ACHIEVEMENTS.length * 100);
  return `<section class="page-heading"><div><div class="eyebrow">TROPHIES / 成就馆</div><h1>你改写的每一笔，都算数<span class="orange">。</span></h1><p>已解锁 ${unlockedAchievements.length} / ${ACHIEVEMENTS.length}（${pct}%）</p></div></section><div class="ach-grid">${ACHIEVEMENTS.map(a=>{const un=unlockedAchievements.includes(a.id);const iconHtml = un ? (a.logo ? `<img src="${a.logo}" class="ach-logo" alt="${a.name}">` : icon(a.icon,'ach-icon')) : '<span class="ach-icon ach-lock">🔒</span>';return `<div class="ach-card ${un?'unlocked':'locked'}">${iconHtml}<h3>${a.name}</h3><p>${a.desc}</p></div>`}).join('')}</div>`;
}

function render(focus = false) {
  if (scene === 'home') { app.innerHTML = homeView(); }
  else if (scene === 'catalog' && showGrid) { app.innerHTML = shell(gridView()); }
  else app.innerHTML = shell(scene === 'catalog' ? catalog() : scene === 'play' ? (run && run.intermission ? intermissionView() : matchView()) : scene === 'review' ? reviewView() : scene === 'achievements' ? achievementsView() : journeyView());
  app.classList.toggle('catalog-scene', scene === 'catalog');
  if (scene === 'catalog' && !showGrid) {
    const c = getChapter(chapterId), p = c.players[playerIndex], open = c.unlocked || permit === c.id;
    app.insertAdjacentHTML('beforeend', `<div class="mobile-entry"><span>${c.team} · ${p.name}<small>${p.champion} / ${p.position}</small></span><div class="mobile-entry-actions">${run && !run.finished ? '<button class="secondary" data-action="continue">继续已保存的对局</button>' : ''}<button class="primary" data-action="${open?'briefing':'unlock'}">${open?`以 ${p.name} 身份进入`:'观看广告体验本章'}</button></div></div>`);
  }
  if (scene === 'play') app.insertAdjacentHTML('beforeend', '<button class="decision-jump secondary" data-action="decision-jump">前往当前决策 ↓</button>');
  app.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.parentElement.classList.add('missing');},{once:true}));
  if (focus) { const m=document.querySelector('#main'); if(m) m.focus({ preventScroll: true }); window.scrollTo({top:0,behavior:'instant'}); }
}
function showModal(title, body, footer = '') {
  if (modal.open) modal.close();
  modal.innerHTML = `<div class="modal-top"><span class="eyebrow">THE SECOND CHANCE</span><button class="icon-button" data-modal="close" aria-label="关闭弹窗">${icon('close')}</button></div><h2 id="modal-title">${title}</h2>${body}${footer?`<div class="modal-footer">${footer}</div>`:''}`;
  modal.showModal();
}
function briefing() {
  const c = getChapter(chapterId), p = c.players[playerIndex];
  showModal('坐上选手席之前', `<p class="modal-lead">${c.year} · ${c.team} vs ${c.opponent} · 第五局</p><div class="briefing-identity">${championImg(p,c)}<div><strong>${p.name}</strong><span>${p.position} / ${p.champion}</span></div></div><ul class="briefing-list"><li><span>你的目标</span>${c.goal}</li><li><span>介入时刻</span>00:00 开局。真实阵容与英雄保留，此后赛况为战术推演。</li><li><span>比赛方式</span>阅读直播，在 8 个节点选择行动。只控制自己，队友与对手响应局势。</li><li><span>安心游玩</span>关键决策不限时，过程无广告，进度自动保存。</li></ul>${run&&!run.finished?'<p class="warning-note">开始新局会替换当前未完成对局的存档。</p>':''}`, `<button class="secondary" data-modal="close">再想一下</button><button class="primary" data-modal="start">我准备好了 ${icon('arrow')}</button>`);
}
function startRun() {
  const c = getChapter(chapterId);
  if (!c.unlocked && permit !== c.id) { toast('请先解锁本章节体验。'); return; }
  if (!c.unlocked) permit = null;
  run = createRun(c.id, playerIndex, 2); rewindReady=false; detailed=false; scene='play'; modal.close(); persist();render(true);cue();
}

// Replace this provider with a real SDK. Reward is granted ONLY by its completed result.
class DemoAdProvider {
  show(placement) {
    const names = { rewind: ['选择你的转折点','完成后可从本局全部决策节点中选择一处，回到该次选择之前。'], deep: ['看懂这局为什么输赢','完成后解锁胜负根因、关键转折、替代分支验证与最少改动获胜路线。'], chapter: ['再打开一份遗憾档案','完成后解锁一次完整章节体验，比赛中不再插广告。'] };
    const [name, detail] = names[placement];
    return new Promise(resolve=>{
      let settled=false;
      const finish = earned => { if(settled)return;settled=true;modal.removeEventListener('close',onClose);modal.removeEventListener('cancel',onCancel);modal.close();resolve({completed:earned}); };
      const onClose=()=>finish(false);
      const onCancel=()=>finish(false);
      showModal(name, `<div class="demo-ad"><span>广告测试位 / 非真实商业广告</span>${icon('play')}<h3>把故事，留给下一种可能。</h3><p>${detail}</p></div><p class="modal-footnote">这是可测试的开发版广告流程，没有广告扣费、追踪或真实广告请求。</p>`, `<button class="secondary" id="ad-cancel">关闭，不领取</button><button class="primary" id="ad-complete">模拟观看完成 ${icon('check')}</button>`);
      modal.addEventListener('close',onClose);modal.addEventListener('cancel',onCancel);
      modal.querySelector('#ad-cancel').onclick=()=>finish(false);
      modal.querySelector('#ad-complete').onclick=()=>finish(true);
    });
  }
}
const adProvider = new DemoAdProvider();
let adPending = false;
async function reward(placement) {
  if(adPending)return;
  const targetChapter = chapterId, targetRun = run;
  if (placement === 'rewind' && (!run?.finished || run.won)) return;
  if (placement === 'deep' && !run?.finished) return;
  adPending = true;
  try {
    const result = await adProvider.show(placement);
    if (!result.completed) { toast('已关闭广告，未消耗任何机会。'); return; }
    if (placement === 'chapter') { permit=targetChapter;toast('本章已解锁一次完整体验。');render();briefing(); }
    if (placement === 'rewind' && run === targetRun) { rewindReady=true;persist();render();selectRewindNode(); }
    if (placement === 'deep' && run === targetRun) { detailed=true;render();document.querySelector('#deep-review').scrollIntoView({behavior:'smooth'});toast('整局因果报告已解锁。'); }
  } catch { toast('广告暂不可用，没有扣除任何机会。'); }
  finally { adPending=false; }
}

function selectRewindNode() {
  if (!rewindReady || !run?.finished || run.won) return;
  showModal('选择要回溯的节点', `<p class="modal-lead">回到所选节点作决定之前。此前选择与局势保留，该节点及之后的赛况重新推演。</p><div class="rewind-nodes">${run.history.map((h,i)=>`<button class="rewind-node" data-modal="rewind-node" data-index="${i}"><strong>${String(i+1).padStart(2,'0')} · ${h.time} · ${esc(h.phase)}</strong><span>原选择：${esc(h.action)}</span><small>当时局势：${esc(stateText(h.before))}</small></button>`).join('')}</div>`, '<button class="secondary" data-modal="close">稍后选择</button>');
}

function help() {
  showModal('把遗憾，交给下一次选择', `<div class="help-content"><h3>01 · 先选一场，再选一个人</h3><p>锁定真实比赛的首发与英雄。你只控制所选选手，其他九名选手保留当局身份。</p><h3>02 · 读信息，作决定</h3><p>视野与队友接应决定主动进攻能否兑现。持续独自行事会丢失接应；保持阵型也会让出一部分进攻机会。</p><h3>03 · 不靠广告赢比赛</h3><p>免费首章、基础复盘与免费重开始终可用。仅有失败回溯、深度复盘和额外章节三个自愿激励点位，开发版均为模拟。</p><h3>真实与推演</h3><p>参赛名单、英雄、版本、历史结果有比赛来源；开局介入后的时钟、经济、击杀和直播均为简化规则推演，不是录像逐帧复刻，也不是选手真实语音。</p></div>`, '<button class="primary" data-modal="close">明白了</button>');
}
function sources() {
  showModal('历史资料与素材', `<div class="help-content"><p>每个章节绑定自己的年份、参赛名单、英雄和版本，禁止跨章节共用现役选手照片。</p>${CHAPTERS.map(c=>`<h3>${c.year} · ${c.team} vs ${c.opponent} · G${c.game}</h3><p>版本 ${c.patch}${c.historicalDuration ? '，真实本局时长 ' + c.historicalDuration : ''}。<a href="${c.source}" target="_blank" rel="noopener noreferrer">Games of Legends 当局记录 ↗</a></p>`).join('')}<h3>图片使用状态</h3><p>英雄头像来自 Riot Data Dragon 对应版本，本地无图时自动从 CDN 加载。</p><p>选手席背景为历史定妆照，阵容以当局首发为准。</p><h3>推演范围</h3><p>当前为规则驱动的文字决策原型，尚非完整伤害、装备、兵线与寻路模拟器。未冒充历史现场或官方授权游戏。</p></div>`, '<button class="primary" data-modal="close">返回游戏</button>');
}
function chapterInfo() {
  const c = getChapter(chapterId);
  showModal(`${c.year} · ${c.team} vs ${c.opponent}`, `<p class="modal-lead">${c.event} · 第五局 · 版本 ${c.patch}</p><p>${c.description}</p><h3>双方当局首发</h3><div class="roster-table">${c.players.map((p,i)=>`<div><span>${p.position}</span><strong>${p.name}<small>${p.champion}</small></strong><strong>${c.enemies[i].name}<small>${c.enemies[i].champion}</small></strong></div>`).join('')}</div><details class="history-spoiler"><summary>展开真实历史赛果</summary><p>${c.historicalResult} 当局时长 ${c.historicalDuration}。</p></details><a href="${c.source}" target="_blank" rel="noopener noreferrer">核对当局比赛记录 ↗</a>`, '<button class="primary" data-modal="close">返回选手席</button>');
}

app.addEventListener('click', event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  event.preventDefault();
  const action=button.dataset.action;
  if(action==='home'){scene='home';render(true);}
  if(action==='start-game'){scene='catalog';showGrid=true;render(true);}
  if(action==='back-grid'){scene='catalog';showGrid=true;render(true);}
  if(action==='nav'){scene=button.dataset.view;if(scene==='catalog')showGrid=true;render(true);}
  if(action==='chapter'){chapterId=button.dataset.id;playerIndex=chapterId==='blg2024'?2:3;showGrid=false;render();}
  if(action==='player'){playerIndex=Number(button.dataset.index);render();}
  if(action==='briefing')briefing();
  if(action==='unlock')reward('chapter');
  if(action==='continue'){scene='play';render(true);}
  if(action==='choose'){
    try {
      run=advance(run,Number(button.dataset.index));cue();
      if(run.finished){scene='review';detailed=false;completed.push({chapterId:run.chapterId,player:getChapter(run.chapterId).players[run.playerIndex].name,won:run.won,date:new Date().toISOString()});completed=completed.slice(-100);const newAch=checkAchievements();persist();if(newAch.length){setTimeout(()=>{const a=ACHIEVEMENTS.find(x=>x.id===newAch[newAch.length-1]);toast(`🏆 成就解锁：${a.name}`);},800);}}
      persist();render(true);
    } catch { toast('当前行动暂不可用，请重新选择。'); }
  }
  if(action==='leave'){persist();scene='catalog';render(true);toast('对局已暂存，随时可以继续。');}
  if(action==='restart'){chapterId=run.chapterId;playerIndex=run.playerIndex;permit=chapterId;briefing();}
  if(action==='reward-rewind'){if(rewindReady)selectRewindNode();else reward('rewind');}
  if(action==='reward-deep')reward('deep');
  if(action==='deep-open')document.querySelector('#deep-review').scrollIntoView({behavior:'smooth'});
  if(action==='decision-jump')document.querySelector('.decision').scrollIntoView({behavior:'smooth',block:'start'});
  if(action==='next-game'){run=nextGame(run);persist();render(true);cue();}
  if(action==='sound'){sound=!sound;if(sound){getBGM().play().catch(()=>{});}else{getBGM().pause();}render();}
  if(action==='help')help();
  if(action==='sources')sources();
  if(action==='chapter-info')chapterInfo();
});
modal.addEventListener('click',event=>{
  const button=event.target.closest('[data-modal]');
  if(!button)return;
  if(button.dataset.modal==='close')modal.close();
  if(button.dataset.modal==='start')startRun();
  if(button.dataset.modal==='rewind-node' && rewindReady){
    const index=Number(button.dataset.index);
    try {
      const target=run.history[index];
      run=rewind(run,index);rewindReady=false;scene='play';detailed=false;
      modal.close();persist();render(true);toast(`已回到 ${target.time} · ${target.phase}，请重新作出选择。`);
    } catch { toast('该节点不可回溯，请重新选择。'); }
  }
});
render();
