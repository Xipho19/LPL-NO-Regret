import { CHAPTERS, PHASES, ACTIONS } from './data.js';
import { tacticalChoices } from './tactics.js';
export const getChapter = id => CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
const getPhases = c => c.phases || PHASES;
const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export function createRun(chapterId, playerIndex, rulesVersion = 1) {
  const chapter = getChapter(chapterId);
  if (!Number.isInteger(playerIndex) || !chapter.players[playerIndex]) throw new Error('Unknown player');
  if (![1, 2].includes(rulesVersion)) throw new Error('Unknown rules');
  return { ...(rulesVersion === 2 ? {rulesVersion: 2} : {}), chapterId: chapter.id, playerIndex, step: 0, vision: 1, tempo: 0, cohesion: 1, gold: 0, kills: [0, 0], towers: [0, 0], flashReadyAt: 0, ultReadyAt: 0, history: [], finished: false, won: false, seriesScore: [0, 0], gameNumber: 1, gameHistory: [], intermission: false };
}
export function choicesFor(run) {
  if (run.rulesVersion === 2) return tacticalChoices(run);
  const chapter = getChapter(run.chapterId), p = chapter.players[run.playerIndex], phases = getPhases(chapter);
  const time = phases[run.step].seconds;
  return ACTIONS[p.position][run.step].map((label, index) => {
    let note = ['降低暴露风险，为下一轮行动留出空间。', '争取主动，需要队友位置与视野支持。', '高风险操作：35% 概率成功拿大优势，65% 失败送掉节奏。'][index];
    if (run.step === 5 || run.step === 6) {
      if (index === 0) note = p.kit.protect + '；等待对方先暴露意图。';
      if (index === 1) note = p.kit.engage + '；大招需要处于可用状态。';
      if (index === 2) note = '关键操作窗口：35% 概率打掉对方核心赢下团战，65% 自己先被秒。';
    }
    const usesUlt = index === 1 && (run.step === 5 || run.step === 6);
    return { label, note, usesUlt, disabled: usesUlt && run.ultReadyAt > time };
  });
}
export function advance(run, actionIndex) {
  if (run.finished) throw new Error('Match already finished');
  const choice = choicesFor(run)[actionIndex];
  if (!choice || choice.disabled) throw new Error('Action unavailable');
  const next = structuredClone(run), chapter = getChapter(run.chapterId), phases = getPhases(chapter), phase = phases[run.step];
  const before = structuredClone(run);
  delete before.history;
  let gold = 0, outcome = '', result = 'neutral';
  const early = run.step < 5;
  if (actionIndex === 0) {
    next.vision = clamp(run.vision + 1, 0, 5);
    next.cohesion = clamp(run.cohesion + 1, 0, 5);
    next.tempo = clamp(run.tempo + (early ? 0 : 1), -3, 5);
    gold = early ? 140 : (run.cohesion >= 2 ? 650 : 180);
    outcome = early ? '你保持与队友的接应距离，对手没有获得直接突破口。安全的处理为下一轮行动保留了空间，但也让出了立即交战的机会。' : '阵型没有脱节。对手的第一轮进攻被接住，你与队友获得了反打和处理兵线的时间。';
    result = 'stable';
    if (!early && run.cohesion >= 2) next.kills[0] += 2;
  } else if (actionIndex === 1) {
    const supported = run.rulesVersion === 2 ? choice.supported : run.vision >= 2 && run.cohesion >= 2;
    gold = supported ? 850 : -650;
    next.tempo = clamp(run.tempo + (supported ? 2 : -1), -3, 5);
    next.vision = clamp(run.vision - 1, 0, 5);
    next.cohesion = clamp(run.cohesion - (supported ? 0 : 1), 0, 5);
    outcome = supported ? '此前建立的视野让这次行动有了接应。队友及时跟上，你们争到主动，对手被迫后退并让出一部分地图空间。' : '缺少视野与接应，对手从未被确认的位置反打。队伍没能同时到场，这次主动尝试付出了代价。';
    result = supported ? 'good' : 'risk';
    if (supported) next.kills[0] += 2; else next.kills[1] += 2;
  } else {
    const farm = [1, 2, 3, 7].includes(run.step);
    // 高风险操作：35% 概率成功（高回报），65% 失败（惩罚）
    const gamble = Math.random() < 0.35;
    if (gamble) {
      gold = farm ? 900 : 1200;
      next.cohesion = clamp(run.cohesion + 1, 0, 5);
      next.tempo = clamp(run.tempo + 2, -3, 5);
      next.vision = clamp(run.vision - 1, 0, 5);
      next.kills[0] += farm ? 2 : 3;
      outcome = farm ? '你冒险压线寻找机会，抓到对手走位失误，一套打退对方并拿到线杀。这次赌博成功了，经济和线权都到手。' : '你抓住对手技能真空期果断上前！关键输出拉满，对方ADC被瞬间融化，团战打赢了。这波冒险值了。';
      result = 'good';
    } else {
      gold = farm ? -200 : -900;
      next.cohesion = clamp(run.cohesion - 1, 0, 5);
      next.tempo = clamp(run.tempo - 1, -3, 5);
      next.vision = clamp(run.vision - 1, 0, 5);
      next.kills[1] += farm ? 1 : 2;
      outcome = farm ? '你冒险压线，但对手早有埋伏。被抓掉一波，经济反而落后了。' : '你冲得太深了，对手集火你先被秒。团战少了核心输出，队伍只能后撤。';
      result = 'risk';
    }
  }
  if (run.rulesVersion === 2) {
    if (choice.gamble != null) {
      const win = Math.random() < choice.gamble;
      if (win) {
        gold = choice.baseGold > 0 ? choice.baseGold + 400 : 1200;
        next.cohesion = clamp(run.cohesion + 1, 0, 5);
        next.tempo = clamp(run.tempo + 2, -3, 5);
        next.kills[0] += choice.baseGold > 0 ? 2 : 3;
        outcome = choice.baseGold > 0 ? '你冒险压线寻找机会，抓到对手走位失误，一套打退对方并拿到线杀。这次赌博成功了，经济和线权都到手。' : '你抓住对手技能真空期果断上前！关键输出拉满，对方核心被瞬间融化，团战打赢了。这波冒险值了。';
        result = 'good';
      } else {
        gold = choice.baseGold;
        next.cohesion = clamp(run.cohesion - 1, 0, 5);
        next.tempo = clamp(run.tempo - 1, -3, 5);
        next.vision = clamp(run.vision - 1, 0, 5);
        next.kills[1] += choice.baseGold > 0 ? 1 : 2;
        outcome = choice.baseGold > 0 ? '你冒险压线，但对手早有埋伏。被抓掉一波，经济反而落后了。' : '你冲得太深了，对手集火你先被秒。团战少了核心输出，队伍只能后撤。';
        result = 'risk';
      }
    } else {
      gold = choice.baseGold;
    }
  }
  if (choice.usesUlt) next.ultReadyAt = phase.seconds + 120;
  if (result === 'risk') {
    if (next.flashReadyAt <= phase.seconds) {
      next.flashReadyAt = phase.seconds + 300;
      outcome += ' 你交出闪现尝试脱离，接下来需要重新计算安全距离。';
    } else { gold -= 300; outcome += ' 闪现尚未转好，撤离空间进一步缩小。'; }
  }
  next.gold += gold;
  if (run.step >= 3 && result === 'good') next.towers[0] = Math.min(11, next.towers[0] + 1);
  if (run.step >= 3 && result === 'risk') next.towers[1] = Math.min(11, next.towers[1] + 1);
  next.history.push({ step: run.step, time: phase.time, phase: phase.name, actionIndex, action: choice.label, note: choice.note, outcome, result, gold, before });
  next.step += 1;
  if (next.step === getPhases(getChapter(next.chapterId)).length) {
    const gameWon = next.gold >= 1800 && next.cohesion >= 2 && next.tempo >= 1;
    const chapter = getChapter(next.chapterId);
    if (chapter.seriesTotal) {
      next.seriesScore = [next.seriesScore[0] + (gameWon ? 1 : 0), next.seriesScore[1] + (gameWon ? 0 : 1)];
      next.gameHistory.push({ game: next.gameNumber, won: gameWon, gold: next.gold, cohesion: next.cohesion, tempo: next.tempo, history: next.history });
      if (next.seriesScore[0] >= 3 || next.seriesScore[1] >= 3) {
        next.finished = true;
        next.won = next.seriesScore[0] >= 3;
      } else {
        next.intermission = true;
      }
    } else {
      next.finished = true;
      next.won = gameWon;
    }
  }
  return next;
}
export function nextGame(run) {
  if (!run.intermission) throw new Error('Not in intermission');
  const next = structuredClone(run);
  next.intermission = false;
  next.gameNumber += 1;
  next.step = 0;
  next.vision = 1; next.tempo = 0; next.cohesion = 1; next.gold = 0;
  next.kills = [0, 0]; next.towers = [0, 0];
  next.flashReadyAt = 0; next.ultReadyAt = 0;
  next.history = [];
  return next;
}
export function getChampionForGame(run, playerIndex) {
  const chapter = getChapter(run.chapterId);
  const p = chapter.players[playerIndex];
  if (!p.heroPool || p.heroPool.length <= 1) return { champion: p.champion, championId: p.championId };
  const idx = (run.gameNumber - 1) % p.heroPool.length;
  return p.heroPool[idx];
}
export function rewind(run, nodeIndex = run.history.length - 1) {
  if (!run.finished || !run.history.length) throw new Error('Rewind is available after a completed match');
  if (!Number.isInteger(nodeIndex) || nodeIndex < 0 || nodeIndex >= run.history.length) throw new Error('Invalid rewind node');
  const record = run.history[nodeIndex];
  return { ...structuredClone(record.before), history: structuredClone(run.history.slice(0, nodeIndex)), finished: false, won: false };
}
export function validateRun(run) {
  try {
    if (!run || typeof run !== 'object' || !CHAPTERS.some(c => c.id === run.chapterId)) return false;
    let replay = createRun(run.chapterId, run.playerIndex, run.rulesVersion ?? 1);
    if (!Array.isArray(run.history) || run.history.length > getPhases(getChapter(run.chapterId)).length) return false;
    for (const record of run.history) replay = advance(replay, record.actionIndex);
    return JSON.stringify(canonical(replay)) === JSON.stringify(canonical(run));
  } catch { return false; }
}
