import { CHAPTERS, PHASES, ACTIONS } from './data.js';
import { tacticalChoices } from './tactics.js';
export const getChapter = id => CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
export function createRun(chapterId, playerIndex, rulesVersion = 1) {
  const chapter = getChapter(chapterId);
  if (!Number.isInteger(playerIndex) || !chapter.players[playerIndex]) throw new Error('Unknown player');
  if (![1, 2].includes(rulesVersion)) throw new Error('Unknown rules');
  return { ...(rulesVersion === 2 ? {rulesVersion: 2} : {}), chapterId: chapter.id, playerIndex, step: 0, vision: 1, tempo: 0, cohesion: 1, gold: 0, kills: [0, 0], towers: [0, 0], flashReadyAt: 0, ultReadyAt: 0, history: [], finished: false, won: false };
}
export function choicesFor(run) {
  if (run.rulesVersion === 2) return tacticalChoices(run);
  const chapter = getChapter(run.chapterId), p = chapter.players[run.playerIndex];
  const time = PHASES[run.step].seconds;
  return ACTIONS[p.position][run.step].map((label, index) => {
    let note = ['降低暴露风险，为下一轮行动留出空间。', '争取主动，需要队友位置与视野支持。', '改变资源分配，但可能失去团队接应。'][index];
    if (run.step === 5 || run.step === 6) {
      if (index === 0) note = p.kit.protect + '；等待对方先暴露意图。';
      if (index === 1) note = p.kit.engage + '；大招需要处于可用状态。';
      if (index === 2) note = '路线更激进，对手可以转火或反打。';
    }
    const usesUlt = index === 1 && (run.step === 5 || run.step === 6);
    return { label, note, usesUlt, disabled: usesUlt && run.ultReadyAt > time };
  });
}
export function advance(run, actionIndex) {
  if (run.finished) throw new Error('Match already finished');
  const choice = choicesFor(run)[actionIndex];
  if (!choice || choice.disabled) throw new Error('Action unavailable');
  const next = structuredClone(run), phase = PHASES[run.step];
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
    gold = farm ? 260 : -900;
    next.cohesion = clamp(run.cohesion - 1, 0, 5);
    next.tempo = clamp(run.tempo - 1, -3, 5);
    next.vision = clamp(run.vision - 1, 0, 5);
    outcome = farm ? '你保住了一部分个人发育，但正面暂时少了你的支援。对手利用人数差向前压进，团队需要重新寻找集合位置。' : '你与队友之间出现了距离。对手选择转火落单位置，队伍只能后撤，河道控制权随之丢失。';
    result = farm ? 'trade' : 'risk';
    if (!farm) next.kills[1] += 2;
  }
  if (run.rulesVersion === 2) gold = choice.baseGold;
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
  if (next.step === PHASES.length) {
    next.finished = true;
    next.won = next.gold >= 1800 && next.cohesion >= 2 && next.tempo >= 1;
  }
  return next;
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
    if (!Array.isArray(run.history) || run.history.length > PHASES.length) return false;
    for (const record of run.history) replay = advance(replay, record.actionIndex);
    return JSON.stringify(canonical(replay)) === JSON.stringify(canonical(run));
  } catch { return false; }
}
