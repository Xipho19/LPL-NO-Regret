import { CHAPTERS, PHASES } from './data.js';
import { tacticalReading } from './tactics.js';

const signed = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toLocaleString('zh-CN')}`;
// Phase-specific interpretation; these describe the simplified game, not VOD events.
const contexts = [
  ['入口落位先解决队伍如何互相支援。本次防守增加了信息与接应储备，还没有转化成交战节奏。', '提前争线把准备重心转向主动权；能否兑现收益，仍取决于落位时的信息和接应。', '开局向河道或敌方区域前探，暴露风险早于队伍建立支援路线，后续线上阶段需要先修复落位损失。'],
  ['第一轮兵线阶段，你把线上处理与河道支援连接起来，增加了下一轮联动的准备条件。', '这轮换血、抓人或控制尝试，要同时检查线上收益与队友到场条件；向前站位本身不保证优势。', '这轮资源取舍获得了短期经济，但降低了视野与接应。下一轮河道行动不能直接沿用之前的安全判断。'],
  ['下半区联动先确认路线与队伍同步，增加了接应储备；收益主要留给下一次接触。', '这一轮争的是河道接触的先后手。敌方中单离开最后可见位置时，主动接触尤其依赖之前准备好的信息。', '这轮不采用同步联动路线，获得短期资源收益，却付出了团队条件的代价；撤退信号也不会自动补回接应。'],
  ['换线阶段保留了边线处理与正面支援的衔接，增加团队准备条件；当下经济收益较小。', '转线后的主动尝试把已有条件用于抓机会。若支援路线没接上，先到场也会变成一次脱节接触。', '换线取舍带来经济补充，但队伍的视野、接应和节奏被削减；下一轮大龙区域行动因此承担组织成本。'],
  ['大龙出生后的入口处理补充了视野与接应。本次没有结算大龙击杀，收益是为之后交锋建立进入河道的条件。', '本次在大龙区域争主动，结果由行动前的信息与接应决定；主动收益不等于已经拿下大龙。', '黑暗入口或侧翼的脱节尝试付出高额代价；对手的资源区压力开始转化成你方的撤离负担。'],
  ['正面交锋采用保护或反打路线，收益取决于接触发生前，队伍是否已经能互相支援。', '这轮主动进场使用了大招窗口。先手能否接上后续输出，要看进场前的准备，而不是只看英雄拥有开团技能。', '这轮向前追击或压迫没有保住团队距离，输出意图没有转成有效收益；阵型代价会带到下一次大龙区接触。'],
  ['大龙坑外的胜负手选择先稳住入口或等待信息。它与上一轮保护不同：这次是在兑现积累，争取推进所需的节奏。', '本次主动制造决胜机会，并使用大招。是否值得先动，由当时视野与接应共同决定，无法仅凭“这是胜负手”判断。', '独自进场或直接开资源让队伍被迫跟随你的节奏；在这一轮失去接应，会直接压缩最后推进的处理空间。'],
  ['高地前的同步推进或保护选择，按此前接应状态兑现收益；结局还要同时检查经济与节奏。', '最后一轮主动追击或强开是放大收益的尝试。即使本次成功，也必须结合整局积累判断能否结束比赛。', '暂缓推进、离队或转向其他资源虽然补充了经济，却削减终局接应与节奏；不能把资源到账等同于水晶可拆。']
];
const duties = {
  上单: ['把边线位置与队友支援路线接起来', '兼顾兵线处理与到场距离', '让侧翼接触与正面行动同步', '保持边线牵制与正面之间的连接', '避免让侧翼路线脱离团队视野'],
  打野: ['确认入口信息与第一轮行动路线', '先看线上能否支援你的靠近', '把中路线权转化为资源区接应', '选择队友能跟进的联动路线', '与队友共同进入资源区'],
  中单: ['让落位保持与队伍相连', '把兵线处理转化为支援条件', '避免只追求到场速度而忽略路线', '让转线与队友行动对齐', '处理兵线后确认侧翼信息'],
  ADC: ['保持与辅助的保护距离', '比较补刀收益与前压风险', '让输出位置处于队友保护范围', '让转线后输出与保护一起到场', '在队伍能接应的位置处理资源区压力'],
  辅助: ['避免布眼路线超过队伍支援范围', '保持下路处理与游走节奏同步', '先确认队友能否共同进入河道', '让转线与视野推进同时得到接应', '避免用单人探路代替团队排眼']
};

export function actionCommentary(run, index) {
  const h = run.history[index];
  if (!h) throw new Error('No settled decision at this index');
  const c = CHAPTERS.find(c=>c.id===run.chapterId), p = c.players[run.playerIndex];
  const b = h.before, after = run.history[index+1]?.before || run;
  const missing = [b.vision < 2 && '视野', b.cohesion < 2 && '接应'].filter(Boolean);
  let reason;
  if (h.actionIndex === 1) reason = missing.length
    ? `进场前视野 ${b.vision}/5、接应 ${b.cohesion}/5，${missing.join('与')}未达到 2 的联动门槛。因此主动尝试结算为 −650 基础经济与对手 2 次击杀，而不是成功先手。`
    : `进场前视野 ${b.vision}/5、接应 ${b.cohesion}/5，都达到联动门槛。本次兑现 +850 经济、己方 2 次击杀，同时消耗 1 级视野。`;
  else if (h.actionIndex === 0) reason = index < 5
    ? `本次结算 +140 经济；视野 ${b.vision} → ${after.vision}、接应 ${b.cohesion} → ${after.cohesion}（上限均为 5）。本阶段没有增加节奏或击杀，主要价值是为后续行动准备条件。`
    : b.cohesion >= 2
      ? `行动前接应为 ${b.cohesion}/5，达到反打收益条件，因此获得 +650 经济与己方 2 次击杀。节奏 ${b.tempo} → ${after.tempo}，这次保护已经兑现收益。`
      : `行动前接应仅 ${b.cohesion}/5，队伍还无法兑现完整反打收益，所以只获得 +180 经济，没有增加己方击杀。接应 ${b.cohesion} → ${after.cohesion}，修复发生在本次收益判断之后。`;
  else reason = h.result === 'trade'
    ? `本阶段的资源取舍获得 +260 经济，但视野 ${b.vision} → ${after.vision}、接应 ${b.cohesion} → ${after.cohesion}、节奏 ${b.tempo} → ${after.tempo}。收益与团队条件分别结算，不能只看经济为正。`
    : `本阶段这条脱节路线结算为 −900 基础经济，对手增加 2 次击杀。视野 ${b.vision} → ${after.vision}、接应 ${b.cohesion} → ${after.cohesion}，说明之后的恢复还要补团队条件。`;

  const previous = run.history[index-1];
  if (previous) reason += ` 上一轮 ${previous.time}「${previous.action}」留下的视野 ${b.vision}、接应 ${b.cohesion}，就是本轮的起点。`;
  let skills = '';
  if(h.result==='risk') skills = b.flashReadyAt > PHASES[index].seconds
    ? `闪现尚余 ${b.flashReadyAt-PHASES[index].seconds} 秒，撤离额外损失 300 经济，已计入本次结算。`
    : '本次交掉闪现，未来 300 秒内仍未转好；下一轮若提前接触，需要考虑撤离手段不足。';
  if(index===5 || index===6) {
    skills += h.actionIndex===1 ? ` 本次消耗大招，冷却至 ${Math.floor(after.ultReadyAt/60)}:${String(after.ultReadyAt%60).padStart(2,'0')}。` : ` 本次没有消耗大招；行动时${b.ultReadyAt>PHASES[index].seconds?'大招尚在冷却':'大招可用'}。`;
  }
  const role = index<5 ? duties[p.position][index] : `${h.actionIndex===0 ? p.kit.protect : h.actionIndex===1 ? p.kit.engage : p.kit.escape}，需要与队友到场距离一起考虑`;
  const threat = index===0 ? '' : ` 阵容提醒：${c.threats[(index-1)%c.threats.length]}这是后续风险参考，不表示本轮已发生该技能命中。`;
  const economy = after.gold >= 0 ? `目前领先 ${after.gold.toLocaleString('zh-CN')}` : `目前落后 ${Math.abs(after.gold).toLocaleString('zh-CN')}`;
  const impact = `本次经济 ${signed(h.gold)}，${c.team} ${economy}；击杀 ${after.kills[0]}:${after.kills[1]}，防御塔 ${after.towers[0]}:${after.towers[1]}，节奏 ${b.tempo} → ${after.tempo}。${skills}`;
  let next;
  if(index===7) {
    const gaps=[after.gold<1800&&`经济差还需增加 ${1800-after.gold}`,after.cohesion<2&&`接应还差 ${2-after.cohesion}`,after.tempo<1&&`节奏还差 ${1-after.tempo}`].filter(Boolean);
    next = gaps.length ? `终局未完成推进条件：${gaps.join('、')}。这不是单看最后一次交战即可判断的结局。` : '经济差、接应与节奏均达到推进要求，本局获胜；各节点如何累积到这里，可以在赛后复盘继续查看。';
  } else {
    const need = [after.vision<2&&'视野',after.cohesion<2&&'接应'].filter(Boolean);
    next = `下一轮 ${PHASES[index+1].time}「${PHASES[index+1].name}」：${need.length ? `${need.join('与')}仍低于 2，直接选择主动路线尚不具备联动条件，先修复准备更有依据。` : `目前具备主动联动门槛，但下一次主动行动会消耗视野；也可保留条件，${index<4?'继续准备后续接触':'等待保护或反打收益'}。`}`;
    if(after.flashReadyAt>PHASES[index+1].seconds) next += ` 届时闪现仍余 ${after.flashReadyAt-PHASES[index+1].seconds} 秒；高风险行动会额外损失 300 经济。`;
  }
  if (run.rulesVersion === 2) return { ...tacticalReading(run,index), impact };
  return { context: `${p.name} · ${p.champion}选择「${h.action}」。${contexts[index][h.actionIndex]} 你的职责是${role}。${threat}`, reason, impact, next };
}
