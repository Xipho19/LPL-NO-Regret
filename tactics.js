import { CHAPTERS, PHASES, ACTIONS } from './data.js';
const getPhases = c => c.phases || PHASES;

const specialties = { 上单: 3, 打野: 4, 中单: 2, ADC: 5, 辅助: 6 };
const pressure = ['入口尚未确认', '兵线与河道需要取舍', '支援窗口正在收窄', '对手正在交换地图资源', '资源区入口承压', '正面接触开始', '对手重新争夺河道', '推进窗口即将结束'];
export function tacticalChoices(run) {
  const c = CHAPTERS.find(c => c.id === run.chapterId), p = c.players[run.playerIndex], i = run.step;
  const visionNeed = [4, 6].includes(i) ? 3 : 2;
  const supported = run.vision >= visionNeed && run.cohesion >= 2;
  const bonus = specialties[p.position] === i ? 150 : 0;
  const labels = [...ACTIONS[p.position][i]];
  if (i === 5 || i === 6) { labels[0] = `${p.kit.protect}，与队伍同步`; labels[1] = `${p.kit.engage}，争取主动`; }
  const hold = i === 3 || i === 6;
  const safeGold = i < 5 ? (hold ? -360 : 140) : hold ? (run.cohesion >= 2 ? 150 : -320) : (run.cohesion >= 2 ? 650 : 180);
  return labels.map((label, a) => ({
    label, usesUlt: a === 1 && [5, 6].includes(i),
    disabled: a === 1 && [5, 6].includes(i) && run.ultReadyAt > getPhases(c)[i].seconds,
    supported, visionNeed,
    baseGold: a === 0 ? safeGold : a === 1 ? (supported ? 850 + bonus : -650) : [1, 2, 3, 7].includes(i) ? 540 : -900,
    gamble: a === 2 ? 0.35 : null,
    note: a === 0 ? `补充视野与接应；${hold ? '让出当前资源窗口，经济收益减少 500。' : i < 5 ? '经济收益较小，保留下一轮联动条件。' : '接应达到 2 才能兑现完整反打收益。'}`
      : a === 1 ? `需要视野 ${visionNeed}、接应 2（当前 ${run.vision}/${run.cohesion}）；${supported ? '已具备条件，行动消耗 1 级视野。' : '条件不足，可能被反打。'}${bonus ? `这是${p.position}的职责窗口，成功额外收益 150。` : ''}`
      : [1, 2, 3, 7].includes(i) ? '高风险压线：35% 概率拿到线杀+900经济，65% 被反蹲送掉节奏。' : '关键操作：35% 概率打掉对方核心赢下团战，65% 自己先被秒。'
  }));
}
export function tacticalReading(run, index) {
  const h = run.history[index], b = h.before, after = run.history[index + 1]?.before || run;
  const c = CHAPTERS.find(c => c.id === run.chapterId), p = c.players[run.playerIndex];
  const ch = tacticalChoices(b)[h.actionIndex];
  const gain = after.kills[0] - b.kills[0], loss = after.kills[1] - b.kills[1];
  const event = h.actionIndex === 0 ? `你选择${h.action}，视野从 ${b.vision} 提升到 ${after.vision}，队伍接应从 ${b.cohesion} 提升到 ${after.cohesion}。${[3,6].includes(index) ? '对手趁你方整理阵型交换地图空间，本轮扣除 500 机会成本；没有结算敌方大龙击杀。' : '队伍保留了下一次同步行动的条件。'}`
    : h.actionIndex === 1 ? ch.supported ? `你以${h.action}发起行动，已有信息与接应支撑队伍跟进；本轮新增 ${gain} 次团队击杀${after.towers[0]>b.towers[0] ? '，并转化为一座防御塔' : ''}。` : `你以${h.action}抢先接触，但${b.vision<ch.visionNeed?'入口信息不足':'队友接应不足'}，行动未形成有效联动，对手本轮新增 ${loss} 次击杀。`
    : h.result === 'trade' ? `你选择${h.action}，用正面协同交换资源。经济到账，但接应降至 ${after.cohesion}、节奏降至 ${after.tempo}，下一轮不能沿用之前的进场判断。` : `你选择${h.action}，与团队支援范围脱节；对手本轮新增 ${loss} 次击杀，你方需要重建入口信息。`;
  const c2 = c, phases = getPhases(c2);
  return {
    context: `${phases[index].name}：${pressure[index]}。${p.name} · ${p.champion}：${event}`,
    reason: `${ch.note} 本次基础经济 ${ch.baseGold >= 0 ? '+' : ''}${ch.baseGold}。${h.result==='risk' && b.flashReadyAt>phases[index].seconds ? '闪现未转好，额外损失 300。' : ''}`,
    next: index === 7 ? `终局检查：经济 ${after.gold}/1800，接应 ${after.cohesion}/2，节奏 ${after.tempo}/1。${after.won?'推进条件全部满足。':'需要从更早的取舍中补足未达标条件。'}` : `下一轮 ${phases[index+1].time}：${pressure[index+1]}。${tacticalChoices(after)[1].note} ${[3,6].includes(index+1)?'继续等待会付出 500 机会成本，需比较当前窗口与准备收益。':''}`
  };
}
