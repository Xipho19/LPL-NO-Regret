import { CHAPTERS, PHASES, ACTIONS } from './data.js';
const getPhases = c => c.phases || PHASES;

const specialties = { 上单: 3, 打野: 4, 中单: 2, ADC: 5, 辅助: 6 };
const pressure = ['入口尚未确认', '兵线与河道需要取舍', '支援窗口正在收窄', '对手正在交换地图资源', '资源区入口承压', '正面接触开始', '对手重新争夺河道', '推进窗口即将结束'];
export function tacticalChoices(run) {
  const c = CHAPTERS.find(c => c.id === run.chapterId), p = c.players[run.playerIndex], i = run.step;
  const visionNeed = [4, 6].includes(i) ? 3 : 2;
  const supported = run.vision >= visionNeed && run.cohesion >= 2;
  const bonus = specialties[p.position] === i ? 150 : 0;
  const phases = getPhases(c), ph = phases[i];
  const kind = ph.kind;
  const hold = i === 3 || i === 6;
  const safeGold = i < 5 ? (hold ? -360 : 140) : hold ? (run.cohesion >= 2 ? 150 : -320) : (run.cohesion >= 2 ? 650 : 180);

  // 根据局势类型生成匹配的选项
  const position = p.position;
  let labels, notes;
  if (kind === 'setup') {
    labels = [`跟随队伍落位，确认防守入口`, `提前布置视野，抢占先手位置`, `独自深入野区，提前反蹲`];
    notes = [
      `保守开局：和队伍一起落位，不冒被入侵风险。经济+${safeGold}，视野和接应提升。`,
      `主动开局：提前站好位置，需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'条件已具备。':'条件不足，可能被抓。'}`,
      `高风险：35% 概率反蹲成功拿一血，65% 被入侵送掉开局节奏。`
    ];
  } else if (kind === 'lane') {
    labels = [`稳线发育，等待队友支援`, `主动换血，压制对手`, `打得凶一点，35% 单杀成功`];
    notes = [
      `保守对线：稳住补刀，不冒险。经济+${safeGold}，视野提升。`,
      `主动对线：压制对手，需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'压制有效。':'可能被反蹲。'}`,
      `单杀赌博：35% 概率单杀拿300经济，65% 被打野抓掉。`
    ];
  } else if (kind === 'rotate') {
    labels = [`推完线再支援，不冒被蹲风险`, `走河道近路，抢先到场`, `放弃兵线直接游走，35% 抓到人`];
    notes = [
      `安全支援：推完线再走，不被蹲。经济+${safeGold}。`,
      `快速支援：近路到场，需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'抢先到位。':'可能半路被抓。'}`,
      `赌博游走：35% 概率抓到人拿击杀，65% 亏线又被反蹲。`
    ];
  } else if (kind === 'trade') {
    labels = [`放掉这个资源，换另一侧塔/资源`, `集合打这个资源，需要队友到位`, `不等队友，强行抢资源，35% 成功`];
    notes = [
      `资源交换：放掉这个，换另一边。经济+${safeGold}，但对手拿了这个。`,
      `集合打资源：需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'能拿下。':'可能被抢。'}`,
      `赌博抢资源：35% 成功拿到，65% 被抢还送人头。`
    ];
  } else if (kind === 'vision') {
    labels = [`和队友一起排视野，安全推进`, `先做视野再靠近，逐步压缩空间`, `独自探草，35% 没被蹲`];
    notes = [
      `保守排眼：和队友一起，安全。经济+${safeGold}，视野提升。`,
      `逐步推进：需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'视野干净。':'草里有人。'}`,
      `赌博探草：35% 安全通过，65% 被蹲先被秒。`
    ];
  } else if (kind === 'fight') {
    labels = [`${p.kit.protect}，保后排接团`, `${p.kit.engage}，找机会开团`, `不等队友直接上，35% 打掉对方核心`];
    notes = [
      `保守接团：保护后排，等对手先交技能。经济+${safeGold}。`,
      `主动开团：需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'开团时机好。':'队友跟不上。'}`,
      `赌博进场：35% 成功切到对方后排，65% 自己先被集火秒掉。`
    ];
  } else if (kind === 'decisive') {
    labels = [`等对手先交技能再反打`, `${p.kit.engage}，主动找关键目标`, `强行开对方后排，35% 一波团灭`];
    notes = [
      `后手反打：等对手交完技能再上，最稳。经济+${safeGold}。`,
      `主动找机会：需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'能找到破绽。':'可能空大。'}`,
      `赌博开团：35% 一波团灭对手赢下比赛，65% 被反一波。`
    ];
  } else {
    labels = [`稳步推进，等对手失误`, `集体压上，强拆高地`, `独自前压逼水晶，35% 一波结束`];
    notes = [
      `稳推：慢慢磨，不给机会。经济+${safeGold}。`,
      `强推：需要视野${visionNeed}接应2（当前${run.vision}/${run.cohesion}）。${supported?'能推掉。':'可能被反打。'}`,
      `赌博一波：35% 推掉水晶赢下比赛，65% 被反一波翻盘。`
    ];
  }

  return labels.map((label, a) => ({
    label, usesUlt: a === 1 && [5, 6].includes(i),
    disabled: a === 1 && [5, 6].includes(i) && run.ultReadyAt > phases[i].seconds,
    supported, visionNeed,
    baseGold: a === 0 ? safeGold : a === 1 ? (supported ? 850 + bonus : -650) : 540,
    gamble: a === 2 ? 0.35 : null,
    note: notes[a]
  }));
}
export function tacticalReading(run, index) {
  const h = run.history[index], b = h.before, after = run.history[index + 1]?.before || run;
  const c = CHAPTERS.find(c => c.id === run.chapterId), p = c.players[run.playerIndex];
  const ch = tacticalChoices(b)[h.actionIndex];
  const gain = after.kills[0] - b.kills[0], loss = after.kills[1] - b.kills[1];
  const event = h.actionIndex === 0 ? `你选择${h.action}，视野从 ${b.vision} 提升到 ${after.vision}，队伍接应从 ${b.cohesion} 提升到 ${after.cohesion}。${[3,6].includes(index) ? '对手趁你方整理阵型交换地图空间，本轮扣除 500 机会成本；没有结算敌方大龙击杀。' : '队伍保留了下一次同步行动的条件。'}`
    : h.actionIndex === 1 ? ch.supported ? `你以${h.action}发起行动，已有信息与接应支撑队伍跟进；本轮新增 ${gain} 次团队击杀${after.towers[0]>b.towers[0] ? '，并转化为一座防御塔' : ''}。` : `你以${h.action}抢先接触，但${b.vision<ch.visionNeed?'入口信息不足':'队友接应不足'}，行动未形成有效联动，对手本轮新增 ${loss} 次击杀。`
    : h.result === 'trade' ? `你选择${h.action}，用正面协同交换资源。经济到账，但接应降至 ${after.cohesion}、节奏降至 ${after.tempo}，下一轮不能沿用之前的进场判断。` : `你选择${h.action}，与团队支援范围脱节；对手本轮新增 ${loss} 次击杀，你方在河道视野上落后了，需要重新做视野才能安全推进。`;
  const c2 = c, phases = getPhases(c2);
  return {
    context: `${phases[index].name}：${pressure[index]}。${p.name} · ${p.champion}：${event}`,
    reason: `${ch.note} 本次基础经济 ${ch.baseGold >= 0 ? '+' : ''}${ch.baseGold}。${h.result==='risk' && b.flashReadyAt>phases[index].seconds ? '闪现未转好，额外损失 300。' : ''}`,
    next: index === 7 ? `终局检查：经济 ${after.gold}/1800，接应 ${after.cohesion}/2，节奏 ${after.tempo}/1。${after.won?'推进条件全部满足。':'需要从更早的取舍中补足未达标条件。'}` : `下一轮 ${phases[index+1].time}：${pressure[index+1]}。${tacticalChoices(after)[1].note} ${[3,6].includes(index+1)?'继续等待会付出 500 机会成本，需比较当前窗口与准备收益。':''}`
  };
}
