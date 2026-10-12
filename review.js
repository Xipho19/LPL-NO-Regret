import { createRun, advance, choicesFor, getChapter } from './engine.js';
import { PHASES } from './data.js';
import { tacticalReading } from './tactics.js';

export const signed = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toLocaleString('zh-CN')}`;
export const stateText = s => `经济差 ${signed(s.gold)}；视野 ${s.vision}/5；接应 ${s.cohesion}/5；节奏 ${s.tempo}`;
const cache = new WeakMap();
const gaps = s => [s.gold < 1800 && `经济还差 ${1800 - s.gold}`, s.cohesion < 2 && `接应还差 ${2 - s.cohesion} 级`, s.tempo < 1 && `节奏还差 ${1 - s.tempo} 级`].filter(Boolean);
function statesFor(run) {
  const states = [createRun(run.chapterId, run.playerIndex, run.rulesVersion ?? 1)];
  for (const h of run.history) states.push(advance(states.at(-1), h.actionIndex));
  return states;
}
export function basicReview(run) {
  const risk = run.history.filter(h => h.result === 'risk').length;
  const good = run.history.filter(h => h.result === 'good').length;
  return {
    summary: run.won ? `终局经济差 ${signed(run.gold)}，接应 ${run.cohesion}/5，节奏 ${run.tempo}；三项推进条件均达标。` : `终局未达标：${gaps(run).join('、')}。本局有 ${risk} 次高风险行动、${good} 次有接应的主动行动。`,
    events: run.history.map((h, i) => {
      const after = run.history[i + 1]?.before || run;
      return `经济变化 ${signed(h.gold)} · 接应 ${h.before.cohesion} → ${after.cohesion} · 视野 ${h.before.vision} → ${after.vision}`;
    })
  };
}

// Exact search over this eight-decision ruleset, minimizing changes to the player's route.
// Branches are replayed with the same engine; no guessed win probabilities or hidden bonuses.
function minimumRepair(run) {
  let best = null, count = Infinity;
  function visit(s, changes) {
    if (changes >= count) return;
    if (s.finished) { if (s.won) { best = s; count = changes; } return; }
    const original = run.history[s.step].actionIndex;
    const order = [original, ...[0, 1, 2].filter(a => a !== original)];
    const choices = choicesFor(s);
    for (const a of order) if (!choices[a].disabled) visit(advance(s, a), changes + Number(a !== original));
  }
  visit(createRun(run.chapterId, run.playerIndex, run.rulesVersion ?? 1), 0);
  return { count, run: best };
}

const phaseLessons = [
  '开局的价值在于为下一轮行动保留信息与队友距离。这里没有直接结束比赛的机会，提前失去接应会把代价带到第一轮线权。',
  '这一轮要区分线上收益与可支援状态。经济暂时增加，不代表河道更安全；离开团队之后，下一次联动需要重新补足信息。',
  '联动能否兑现取决于到场条件。先看队友距离和可见路线，再决定是否抢先接触；只有个人到得快，并不能保证形成有效人数优势。',
  '转线是在分配下一轮行动的人数。独享资源可能增加当下经济，却减少随后排眼与交战时的接应；收益与组织成本需要一起比较。',
  '大龙区域的核心是进场前的信息成本。先让队友能共同进入入口，再争取主动；未经确认的路线会同时消耗视野、阵型和撤离手段。',
  '团战要把进场条件与技能用途一起看。保护可以等待对手先交技能，主动进攻则需要现成接应；此前的准备决定这次技能能否兑现收益。',
  '胜负手并不是必须先动。前一轮积累的接应决定反打收益，视野决定主动尝试能否获得支持；落单追击可能把已有优势拆散。',
  '最后推进同时检查经济、接应和节奏。补足某一项不等于同时补足全部条件；结局必须结合整条路线判断，不能只看最后一项操作。'
];
const roleLessons = {
  上单: '你的责任是让边线压力与正面支援衔接。带线收益需要与队友接触时间匹配，不能用个人前压替代团队同步。',
  打野: '你的责任是把线权与资源行动衔接。先确认谁能跟进，再决定开资源或切入；资源目标本身不会替你补足队友距离。',
  中单: '你的责任是把兵线处理转化为安全支援。控制或位移提供机会，但无法补偿缺少信息的路线和脱节的进场。',
  ADC: '你的责任是保持能持续输出的位置。追击收益要与保护距离比较；队友能接应时，输出才更容易延续到推进。',
  辅助: '你的责任是组织信息与接应。布眼和先手都需要队友能一起进入，不应把发现目标直接当作可以开团的信号。'
};

export function deepReview(run) {
  if (!run.finished) throw new Error('Review requires a completed match');
  if (cache.has(run)) return cache.get(run);
  const states = statesFor(run), c = getChapter(run.chapterId), p = c.players[run.playerIndex], phases = c.phases || PHASES;
  const repair = minimumRepair(run);
  const nodes = run.history.map((h, i) => {
    const before = states[i], after = states[i + 1];
    const missing = [before.vision < 2 && '视野', before.cohesion < 2 && '接应'].filter(Boolean);
    let cause;
    if (h.actionIndex === 1) cause = missing.length
      ? `主动行动前，${missing.join('与')}低于有效联动条件，所以本次基础经济代价为 −650，节奏 ${before.tempo} → ${after.tempo}。问题出在进攻前的准备条件，不是“选择进攻”本身。`
      : `主动行动前视野 ${before.vision}、接应 ${before.cohesion}，两项均满足联动条件，因此兑现 +850 经济；节奏 ${before.tempo} → ${after.tempo}（上限 5），视野消耗 1 级，需要为下一轮重新补充。`;
    else if (h.actionIndex === 0) cause = i < 5
      ? `本次只获得 +140 经济，但视野与接应从 ${before.vision}/${before.cohesion} 变成 ${after.vision}/${after.cohesion}。它的主要收益是准备下一次联动，而非立刻打出击杀。`
      : `反打收益取决于行动前的接应。此时接应为 ${before.cohesion}，所以兑现 ${signed(h.gold)} 经济；${before.cohesion >= 2 ? '满足接应条件，也获得了两次团队击杀。' : '尚未满足接应条件，只有 +180，而非完整的 +650 收益。'}节奏 ${before.tempo} → ${after.tempo}。`;
    else cause = [1, 2, 3, 7].includes(i)
      ? `当下获得 +260 经济，但接应 ${before.cohesion} → ${after.cohesion}、视野 ${before.vision} → ${after.vision}、节奏 ${before.tempo} → ${after.tempo}。这解释了为什么个人收益为正，整局仍可能更难结束。`
      : `本次脱节带来 −900 基础经济代价，并削减视野、接应和节奏（到达下限后不再降低）。行动前的团队条件会影响后续恢复速度，不只是一次经济损失。`;
    if (h.result === 'risk') cause += before.flashReadyAt > phases[i].seconds
      ? `闪现还差 ${before.flashReadyAt - phases[i].seconds} 秒，因此额外损失 300 经济，最终本次变化 ${signed(h.gold)}。`
      : '本次还交掉闪现，使接下来 300 秒内的高风险行动失去这一撤离手段。';
    if (run.rulesVersion === 2) cause = tacticalReading(run,i).reason;
    const alternatives = choicesFor(before).map((choice, a) => {
      if (a === h.actionIndex) return null;
      if (choice.disabled) return { action: choice.label, unavailable: true };
      let branch = advance(before, a);
      const immediate = branch;
      for (let j = i + 1; j < run.history.length; j++) {
        const action = run.history[j].actionIndex;
        if (choicesFor(branch)[action].disabled) return { action: choice.label, unavailable: true };
        branch = advance(branch, action);
      }
      return { action: choice.label, immediate, final: branch, delta: branch.gold - run.gold };
    }).filter(Boolean);
    return { time: h.time, phase: h.phase, action: h.action, before, after, cause, lesson: phaseLessons[i], alternatives };
  });
  const unsupported = run.history.find(h => h.actionIndex === 1 && h.result === 'risk');
  const splits = run.history.filter(h => h.actionIndex === 2);
  const root = run.won
    ? `胜利靠的是三项条件共同成立：经济比推进要求多 ${run.gold - 1800}，接应 ${run.cohesion}/5，节奏 ${run.tempo}。${run.history.some(h => h.result === 'good') ? '有准备的主动行动把先前的信息和接应转成了经济与节奏。' : '本局没有依靠主动抓机会，前期建立条件、后期反打同样完成了推进。'}`
    : `直接原因是${gaps(run).join('、')}。${unsupported ? `更早的根由出现在 ${unsupported.time}：在视野 ${unsupported.before.vision}、接应 ${unsupported.before.cohesion} 的状态下主动接触，准备条件不够，随后必须先修复局势。` : splits.length ? `整局有 ${splits.length} 次选择牺牲接应，其中 ${splits.filter(h => h.result === 'trade').length} 次虽然获得经济，却持续压低协同与节奏，不能只用经济收益评价这些决定。` : '需要比较各节点对终局经济和协同的累积影响。'}`;
  const last = nodes.at(-1);
  const canLastSave = last.alternatives.some(a => a.final?.won);
  const changes = repair.run.history.flatMap((h, i) => h.actionIndex === run.history[i].actionIndex ? [] : [{ time: h.time, phase: h.phase, from: run.history[i].action, to: h.action }]);
  const report = {
    root, nodes, changes, repair: repair.run, minimumChanges: repair.count,
    rewindVerdict: run.won ? '本局已经胜利。下面的对照用于检查替代选择是否会保住优势。' : canLastSave ? '只改变最后一项选择，存在获胜分支。可选择最后节点回溯，具体结果见下方对照；也可选择更早的节点重新推演。' : '只改变最后一项选择，两条替代分支仍会失败。建议从下方最少改动路线中的最早节点回溯，再调整后续选择；此前的局势可以保留。',
    role: `${p.name} · ${p.champion}：${roleLessons[p.position]} 当局英雄职责：${p.task} 可用思路：${p.kit.protect}；${p.kit.engage}。`,
    matchup: c.id === 'blg2024' ? '阵容阅读：Keria 的波比会限制位移进场，Gumayusi 的霞有规避首轮进攻的手段，Faker 的加里奥可以支援反打。你需要先确认相关位置与技能，再考虑主动接触。' : '阵容阅读：Perkz 的乐芙兰可以威胁侧翼，Jankos 的奥拉夫开启大招后不能依赖控制阻止，Wadid 的布隆会影响正面输出。选位置和组织接应时，需要考虑这些应对方式。',
    scope: '分支数值由本局规则重新计算：单点对照固定其余选择，改写路线则寻找获胜所需的最少改动。这是当前游戏模型的结果，不代表真实比赛胜率。阵容阅读为战术参考，当前引擎尚未计算射程、伤害和敌方技能冷却，不能据此断言某位选手导致真实失利。'
  };
  cache.set(run, report);
  return report;
}
