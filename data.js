const player = (name, position, champion, championId, task, kit, heroPool) => ({ name, position, champion, championId, task, kit, heroPool: heroPool || [{champion, championId}] });
export const CHAPTERS = [
  {
    id: 'blg2024', year: '2024', team: 'BLG', opponent: 'T1', title: '距冠军，只差最后一局', short: '伦敦的最后一夜', event: '全球总决赛 · 决赛', city: 'LONDON', date: '2024.11.02', stage: '决赛', patch: '14.18', assetPatch: '14.18.1', game: 5, historicalDuration: '32:13', historicalScore: 'BLG 2 : 3 T1', historicalResult: 'BLG 在第五局落败，T1 以 3:2 赢得冠军。', goal: '赢下决胜局，捧起召唤师奖杯。', unlocked: true, startingScore: [2, 2],
    description: '从成都到伦敦，从春天到深秋。四局鏖战之后，比分来到 2:2。现在，你坐在第五局的选手席上。',
    players: [
      player('Bin', '上单', '贾克斯', 'Jax', '边线牵制 · 传送进场', { engage: '跳斩接反击风暴', protect: '反击风暴限制突进', escape: '跳斩撤回队友身边' }),
      player('Xun', '打野', '嘉文四世', 'JarvanIV', '资源控制 · 团战先手', { engage: '德邦军旗接巨龙撞击', protect: '保留 EQ 打断突进', escape: '用 EQ 脱离战场' }),
      player('knight', '中单', '阿狸', 'Ahri', '线权支援 · 魅惑找机会', { engage: '灵魄突袭调整角度，接魅惑', protect: '保留魅惑限制突进', escape: '保留灵魄突袭撤出' }),
      player('Elk', 'ADC', '卡莎', 'Kaisa', '持续输出 · 进场时机', { engage: '等待队友标记，再用猎手本能跟进', protect: '贴近队友持续输出', escape: '用极限超载拉开距离' }),
      player('ON', '辅助', '芮尔', 'Rell', '视野建立 · 开团保护', { engage: '驭铁术进场衔接极涌', protect: '保留控制保护后排', escape: '与队友同步撤出' })
    ],
    enemies: [player('Zeus', '上单', '古拉加斯', 'Gragas'), player('Oner', '打野', '赵信', 'XinZhao'), player('Faker', '中单', '加里奥', 'Galio'), player('Gumayusi', 'ADC', '霞', 'Xayah'), player('Keria', '辅助', '波比', 'Poppy')],
    threats: ['注意波比的坚定风采，位移进场需要留意其位置。', '霞能够用暴风羽刃规避第一轮进攻，别把所有技能同时交出。', '加里奥可以通过英雄登场支援队友，追击前需要考虑其反打。'],
    source: 'https://gol.gg/game/stats/62820/page-game/',
    phases: [
      { time: '00:00', seconds: 0, name: '决胜局开局', location: '己方野区入口', copy: '伦敦决赛第五局，2:2 载入。Bin 贾克斯走上，Xun 嘉文四世的开野路线决定前期节奏。Zeus 古拉加斯在上方等待——T1 一级可能在河道做入侵视野。你决定第一轮落位。', signal: '队友 ping 蓝buff入口，问你要不要先帮打。', kind: 'setup' },
      { time: '04:00', seconds: 240, name: '上路对线', location: '上路河道', copy: 'Bin 贾克斯正在和 Zeus 古拉加斯对线。Zeus 已经把兵线推过来了——Oner 赵信可能在附近蹲伏。Bin 的血量还有 70%，这波来不来上？', signal: '队友 ping 上路河道，Zeus 往那边靠了。', kind: 'lane' },
      { time: '08:00', seconds: 480, name: '中路第一次联动', location: '中路河道入口', copy: 'knight 阿狸推完线消失了——她要么游走下路，要么在蹲 Faker。Faker 加里奥也不见了，他的大招全图支援随时可能落地。中野这波是谁在找谁？', signal: '队友 ping 下路三角草，问你要不要跟。', kind: 'rotate' },
      { time: '12:00', seconds: 720, name: '峡谷先锋', location: '上半区先锋坑', copy: '峡谷先锋刷新了。T1 下路 Gumayusi 霞已经推过线来支援。Keria 波比在先锋坑口做视野——他的坚定风采可以把人撞走。先打先锋还是先打人？', signal: '队友 ping 先锋坑，上路已经就位。', kind: 'trade' },
      { time: '18:00', seconds: 1080, name: '小龙团', location: '龙坑入口', copy: '火龙刷新。Elk 卡莎刚出完羊刀，装备开始成型。但 Keria 波比已经在龙坑旁边放好了视野——T1 想接这波团。Faker 加里奥的大招位置是关键。', signal: '队友 ping 龙坑，ADC 还在收线。', kind: 'vision' },
      { time: '23:00', seconds: 1380, name: '大龙前对峙', location: '大龙坑外', copy: '大龙还有 1 分钟刷新。Faker 加里奥站在中路侧翼，Oner 赵信在龙坑口做视野。Keria 波比不见了——他大概率在某个草里蹲着等机会。这波视野怎么补？', signal: '队友 ping 河道草，请求一起排。', kind: 'fight' },
      { time: '28:00', seconds: 1680, name: '大龙决胜团', location: '大龙坑', copy: 'T1 先手动龙了。Zeus 古拉加斯在前面顶酒桶，Oner 赵信准备开团。Faker 加里奥的大招还没交——你猜他会落向哪里？这波是抢龙还是接团？', signal: '队友 ping 大龙血量，问你能不能进。', kind: 'decisive' },
      { time: '33:00', seconds: 1980, name: '冠军点推进', location: '中路高地', copy: '你拿下了大龙 buff。兵线压到 T1 高地塔下。Elk 卡莎的装备已经完全成型，但 Faker 加里奥和 Gumayusi 霞在高地上架好了防守。这波推高是捧杯还是被反一波？', signal: '队友 ping 高地塔，等你最后开团。', kind: 'finish' }
    ]
  },
  {
    id: 'rng2018', year: '2018', team: 'RNG', opponent: 'G2', title: '把那一年的梦，再续一局', short: '釜山，未完的金色雨', event: '全球总决赛 · 四分之一决赛', city: 'BUSAN', date: '2018.10.20', stage: '八强', patch: '8.19', assetPatch: '8.19.1', game: 5, historicalDuration: '38:38', historicalScore: 'RNG 2 : 3 G2', historicalResult: 'RNG 在第五局落败，G2 以 3:2 晋级四强。', goal: '赢下决胜局，晋级四强。此章胜利不等于夺冠。', unlocked: false, startingScore: [2, 2],
    description: '春夏双冠、MSI 冠军。曾经以为会一直赢下去的那一年，在釜山迎来了决胜局。把时间拨回开局，这一次，故事还没结束。',
    players: [
      player('Letme', '上单', '赛恩', 'Sion', '前排承伤 · 边线处理', { engage: '蛮横冲撞寻找进场角度', protect: '蓄力残虐猛击阻挡突进', escape: '掩护队友后退' }),
      player('Mlxg', '打野', '魔腾', 'Nocturne', '切入后排 · 资源争夺', { engage: '鬼影重重切入已暴露的目标', protect: '用无言恐惧限制近身目标', escape: '保留黑暗庇护规避控制' }),
      player('xiaohu', '中单', '瑞兹', 'Ryze', '推线转线 · 持续输出', { engage: '符文禁锢配合队友集火', protect: '保留符文禁锢保护后排', escape: '寻找安全位置引导曲境折跃' }),
      player('Uzi', 'ADC', '希维尔', 'Sivir', '推线发育 · 团队拉扯', { engage: '开启狩猎，跟随前排推进', protect: '弹射输出，保留法术护盾', escape: '开启狩猎带队拉开' }),
      player('Ming', '辅助', '锤石', 'Thresh', '视野控制 · 灯笼救援', { engage: '死亡判决命中后等待队友接应', protect: '保留魂引之灯接回队友', escape: '用厄运钟摆阻挡追击' })
    ],
    enemies: [player('Wunder', '上单', '亚托克斯', 'Aatrox'), player('Jankos', '打野', '奥拉夫', 'Olaf'), player('Perkz', '中单', '乐芙兰', 'Leblanc'), player('Hjarnan', 'ADC', '烬', 'Jhin'), player('Wadid', '辅助', '布隆', 'Braum')],
    threats: ['乐芙兰有很强的侧翼威胁，不要把敌方中单消失视为安全。', '奥拉夫开启诸神黄昏时不能依赖控制技能阻止他。', '布隆的坚不可摧会影响正面输出，需要调整集火角度。'],
    source: 'https://gol.gg/game/stats/14513/page-game/',
    phases: [
      { time: '00:00', seconds: 0, name: '釜山决胜局', location: '己方下半区', copy: '釜山，八强赛第五局，2:2。Mlxg 魔腾的开野路线是 RNG 的招牌——他总是能在 3 分钟内找到节奏。Jankos 奥拉夫的开野方向尚未确认，G2 可能一级在河道做入侵。', signal: '队友 ping 对方红buff，问你要不要先蹲。', kind: 'setup' },
      { time: '04:00', seconds: 240, name: '下路推线', location: '下路', copy: 'Uzi 希维尔已经把兵线推过去了。Ming 锤石的死亡判决还没命中过——Wadid 布隆一直站在兵线后面保护。Hjarnan 烬的子弹在第四发时伤害最高，你需要在他装填时找机会。', signal: '队友 ping 下路塔，问你能不能压。', kind: 'lane' },
      { time: '08:00', seconds: 480, name: '中路压力', location: '中路河道', copy: 'Perkz 乐芙兰在中路把 xiaohu 瑞兹压在塔下。乐芙兰已经消失了 15 秒——她要么去下路 gank Uzi，要么在蹲 Mlxg。这波中野谁在找谁？', signal: '队友 ping 中路信号，Perkz 不见了。', kind: 'rotate' },
      { time: '13:00', seconds: 780, name: '第一条小龙', location: '龙坑入口', copy: '风龙刷新。Uzi 希维尔的推塔节奏很快，但 Jankos 奥拉夫已经在龙坑旁边站视野了。Wunder 亚托克斯在上路推塔——拿龙还是放龙换塔？', signal: '队友 ping 龙坑，ADC 已经到了。', kind: 'trade' },
      { time: '19:00', seconds: 1140, name: '峡谷先锋', location: '上半区先锋坑', copy: 'Letme 赛恩在上路带线。G2 全员靠近先锋坑——Wunder 亚托克斯从上路消失了。这波先锋团接不接？乐芙兰的侧翼位置是最大的未知数。', signal: '队友 ping 河道草，请求排眼。', kind: 'vision' },
      { time: '24:00', seconds: 1440, name: '大龙前', location: '大龙坑外', copy: '大龙即将刷新。Jankos 奥拉夫在野区入侵——他的诸神黄昏不怕你的控制。Perkz 乐芙兰又不见了。这波视野差怎么补？谁去探那个黑暗的草丛？', signal: '队友 ping 河道入口，问你要不要一起探。', kind: 'fight' },
      { time: '30:00', seconds: 1800, name: '大龙团', location: '大龙坑', copy: 'G2 先手动龙了。Jankos 奥拉夫在龙坑里，Wunder 亚托克斯从侧翼绕后。Perkz 乐芙兰的位置还是没看到。Uzi 希维尔在后排——你的站位决定这波团怎么保他。', signal: '队友 ping 大龙血量，问你能不能进。', kind: 'decisive' },
      { time: '36:00', seconds: 2160, name: '四强门槛', location: '中路高地', copy: '你拿下了大龙 buff。兵线压到 G2 高地塔下。Uzi 希维尔的弹射在狭窄地形里伤害极高，但 Wadid 布隆的坚不可摧可以挡。这波推高是进四强还是梦碎釜山？', signal: '队友 ping 高地塔，等你最后开团。', kind: 'finish' }
    ]
  },
  {
    id: 'tes2020', year: '2020', team: 'TES', opponent: 'SN', title: '上海半决赛，差一步进决赛', short: '2020 秋冬的金色雨没有落下', event: '全球总决赛 · 半决赛', city: 'SHANGHAI', date: '2020.10.25', stage: '半决赛', patch: '10.19', assetPatch: '10.19.1', game: 1, seriesTotal: 3, historicalScore: 'TES 1 : 3 SN', historicalResult: 'SN 以 3:1 战胜 TES，晋级决赛。', goal: '赢下第一局，改写系列赛走向。此章胜利不等于晋级。', unlocked: true, startingScore: [0, 0],
    description: 'MSC 冠军、春夏常规赛第一。所有人都在等 TES 进决赛。但第一场比赛，你们就输了。这一次，从第一局开始。',
    players: [
      player('369', '上单', '杰斯', 'Jayce', '线上压制 · 传送支援', { engage: '开启闪电冲刺，电能震荡接加速之门消耗', protect: '切换锤形态，雷霆一击击退突进', escape: '开启加速之门，切换锤形态快速撤离' }, [{champion:'杰斯',championId:'Jayce'},{champion:'鳄鱼',championId:'Renekton'},{champion:'纳尔',championId:'Gnar'},{champion:'卢锡安',championId:'Lucian'}]),
      player('Karsa', '打野', '潘森', 'Pantheon', '前期节奏 · 入侵反蹲', { engage: '贯星长枪起跳，接盾跃晕住目标', protect: '保留神枪盾阵格挡敌方爆发', escape: '用盾跃跳离战场，脱离集火范围' }, [{champion:'潘森',championId:'Pantheon'},{champion:'豹女',championId:'Nidalee'},{champion:'盲僧',championId:'LeeSin'},{champion:'男枪',championId:'Graves'}]),
      player('knight', '中单', '奥莉安娜', 'Orianna', '推线团战 · 大招位置', { engage: '指令：冲击波拉回集中目标', protect: '指令：保护套住被突进的队友', escape: '用指令：冲击波调整位置后后撤' }, [{champion:'奥莉安娜',championId:'Orianna'},{champion:'塞拉斯',championId:'Sylas'},{champion:'妖姬',championId:'Leblanc'},{champion:'卡牌',championId:'TwistedFate'}]),
      player('JackeyLove', 'ADC', '烬', 'Jhin', '远程狙击 · 残局收割', { engage: '完美审判远程狙击暴露目标', protect: '保留束缚手雷保护自身安全', escape: '用队友位置作掩护，装填后后撤' }, [{champion:'烬',championId:'Jhin'},{champion:'卡莎',championId:'Kaisa'},{champion:' ez',championId:'Ezreal'},{champion:'寒冰',championId:'Ashe'}]),
      player('yuyanjia', '辅助', '腕豪', 'Sett', '对线压制 · 开团保护', { engage: '叹为观止抱回敌方关键人物', protect: '刻意挥拳击退突进者', escape: '强手裂颅晕眩后拉开距离' }, [{champion:'腕豪',championId:'Sett'},{champion:'锤石',championId:'Thresh'},{champion:'洛',championId:'Rakan'},{champion:'蕾欧娜',championId:'Leona'}])
    ],
    enemies: [player('Bin', '上单', '悟空', 'MonkeyKing', '', {}, [{champion:'悟空',championId:'MonkeyKing'},{champion:'格温',championId:'Gwen'},{champion:'纳尔',championId:'Gnar'},{champion:'剑姬',championId:'Fiora'}]), player('SofM', '打野', '李青', 'LeeSin', '', {}, [{champion:'李青',championId:'LeeSin'},{champion:'豹女',championId:'Nidalee'},{champion:'男枪',championId:'Graves'},{champion:'皇子',championId:'JarvanIV'}]), player('Angel', '中单', '阿兹尔', 'Azir', '', {}, [{champion:'阿兹尔',championId:'Azir'},{champion:'发条',championId:'Orianna'},{champion:'辛德拉',championId:'Syndra'},{champion:'卡牌',championId:'TwistedFate'}]), player('huanfeng', 'ADC', '伊泽瑞尔', 'Ezreal', '', {}, [{champion:'伊泽瑞尔',championId:'Ezreal'},{champion:'烬',championId:'Jhin'},{champion:'卡莎',championId:'Kaisa'},{champion:'寒冰',championId:'Ashe'}]), player('SwordArt', '辅助', '洛', 'Rakan', '', {}, [{champion:'洛',championId:'Rakan'},{champion:'锤石',championId:'Thresh'},{champion:'巴德',championId:'Bard'},{champion:'蕾欧娜',championId:'Leona'}])],
    threats: ['Bin 的悟空配合 SofM 有极快的上路启动速度，369 需要保持安全距离。', 'Angel 的沙皇在中路有极强的推线和区域控制，游走前先确认他的位置。', 'huanfeng 的伊泽瑞尔poke距离很远，团战前需要维持血量优势。'],
    source: 'https://gol.gg/game/stats/27130/page-summary/',
    phases: [
      { time: '00:00', seconds: 0, name: '开局入侵路线', location: '己方下半区野区入口', copy: 'Karsa 潘森一级入侵是 TES 的招牌开局。SofM 李青的开野路线尚未确认——他可能在红buff野区反蹲，也可能直接放下半区。你决定第一轮往哪边走。', signal: '队友标记对方红buff入口，问你要不要跟。', kind: 'setup' },
      { time: '03:15', seconds: 195, name: '上路第一波', location: '上路河道入口', copy: '369 杰斯已经把 Bin 悟空压在塔下。SofM 李青在下半区消失了 20 秒——他是在刷野，还是偷偷摸上来了？上路这波你必须做出判断。', signal: '队友 ping 了河道入口，请求你靠近。', kind: 'lane' },
      { time: '06:40', seconds: 400, name: '下河蟹争夺', location: '下半区河道', copy: 'JackeyLove 烬和 yuyanjia 腕豪已经把线推过去。SwordArt 洛往河道走了——他在和你抢下河蟹，还是在等 SofM 李青就位？这波 2v2 接不接由你定。', signal: '队友标记河蟹位置，等你到场。', kind: 'rotate' },
      { time: '10:20', seconds: 620, name: '第一条小龙', location: '龙坑入口', copy: '火龙即将刷新。TES 前期有阵容强势期，但 SofM 李青已经在旁边露过头了。Angel 沙皇刚推完中线——他随时可以支援龙坑。拿龙还是放龙换先锋？', signal: '队友标记龙坑，问你这波接不接。', kind: 'trade' },
      { time: '15:00', seconds: 900, name: '一血塔与资源互换', location: '上路一塔', copy: '369 杰斯已经把上路一塔磨到半血。SN 下路 huanfeng 伊泽瑞尔在推你的下路一塔。推上塔换掉下塔，还是全员转下保塔？时间差只有 20 秒。', signal: '队友 ping 上路塔，对方辅助在下路消失了。', kind: 'vision' },
      { time: '20:30', seconds: 1230, name: '大龙刷新前', location: '上半区河道', copy: '大龙还有 30 秒刷新。SofM 李青在视野里消失了——他大概率在藏。Angel 沙皇站在中路侧翼，随时可以大招推人。这波视野怎么做？', signal: '队友标记河道草丛，请求一起排眼。', kind: 'fight' },
      { time: '25:00', seconds: 1500, name: '大龙团战', location: '大龙坑外', copy: 'SN 主动开龙了。SofM 李青在龙坑内，Bin 悟空从侧翼绕后。你的位置决定这波团怎么接——是正面逼龙，还是等他们打完龙再收割？', signal: '队友 ping 大龙血量，问你能不能进。', kind: 'decisive' },
      { time: '30:00', seconds: 1800, name: '高地推进', location: '中路高地前', copy: '你拿下了大龙 buff。兵线到了高地塔下。但 Angel 沙皇的沙兵阵地和 huanfeng 伊泽瑞尔的 poke 已经在高地上架好了。这波推进是一波结束，还是被反一波？', signal: '队友标记高地塔，等你最后决定。', kind: 'finish' }
    ]
  },
  {
    id: 'jdg2023', year: '2023', team: 'JDG', opponent: 'T1', title: '全年大满贯，差最后一步', short: '首尔的那座山', event: '全球总决赛 · 半决赛', city: 'SEOUL', date: '2023.11.12', stage: '半决赛', patch: '13.19', assetPatch: '13.19.1', game: 1, seriesTotal: 3, historicalScore: 'JDG 1 : 3 T1', historicalResult: 'T1 以 3:1 战胜 JDG，晋级决赛。', goal: '赢下第一局，改写系列赛走向。此章胜利不等于晋级。', unlocked: false, startingScore: [0, 0],
    description: '春冠、夏冠、MSI 冠军。全年大满贯只差最后一步。半决赛面对 T1，第一场就输了。这一次，从第一局开始。',
    players: [
      player('369', '上单', '兰博', 'Rumble', '对线压制 · 团战分割', { engage: '恒温灼烧封锁敌方走位，火焰散射补伤害', protect: '火焰散射减速突进者，为后排争取空间', escape: '用火焰屏障掩护自己和队友后撤' }, [{champion:'兰博',championId:'Rumble'},{champion:'杰斯',championId:'Jayce'},{champion:'鳄鱼',championId:'Renekton'},{champion:'武器',championId:'Jax'}]),
      player('Kanavi', '打野', '蔚', 'Vi', '前期节奏 · 野区对抗', { engage: '爆气冲冲撞墙接强能冲拳击飞目标', protect: '保留金属壁垒保护被开的队友', escape: '用爆气冲穿墙撤离战场' }, [{champion:'蔚',championId:'Vi'},{champion:'蜘蛛',championId:'Elise'},{champion:'盲僧',championId:'LeeSin'},{champion:'蝎子',championId:'Skarner'}]),
      player('knight', '中单', '阿卡丽', 'Akali', '刺客切入 · 边线单带', { engage: '我流奥义：隼舞突进，接寒影打伤害', protect: '保留霞阵在被集火时隐身脱战', escape: '用隼舞位移到安全位置后后撤' }, [{champion:'阿卡丽',championId:'Akali'},{champion:'阿狸',championId:'Ahri'},{champion:'塞拉斯',championId:'Sylas'},{champion:'沙皇',championId:'Azir'}]),
      player('Ruler', 'ADC', '霞', 'Xayah', '持续输出 · 团战拉扯', { engage: '羽翼利刃铺场，倒钩拉回集中目标', protect: '保留倒钩限制突进者靠近', escape: '用暴风羽刃拉开与敌人的距离' }, [{champion:'霞',championId:'Xayah'},{champion:'厄斐琉斯',championId:'Aphelios'},{champion:'卡莎',championId:'Kaisa'},{champion:'韦鲁斯',championId:'Varus'}]),
      player('Missing', '辅助', '阿利斯塔', 'Alistar', '视野控制 · 开团保护', { engage: '粉碎技能接大地震撼，眩晕敌方前排', protect: '用坚定意志保护后排不被秒', escape: '用冲锋接粉碎技能将敌人顶开后撤退' }, [{champion:'阿利斯塔',championId:'Alistar'},{champion:'锤石',championId:'Thresh'},{champion:'璐璐',championId:'Lulu'},{champion:'米利欧',championId:'Milio'}])
    ],
    enemies: [player('Zeus', '上单', '亚托克斯', 'Aatrox', '', {}, [{champion:'亚托克斯',championId:'Aatrox'},{champion:'杰斯',championId:'Jayce'},{champion:'奎桑提',championId:'K\'Sante'},{champion:'鳄鱼',championId:'Renekton'}]), player('Oner', '打野', '芮尔', 'Rell', '', {}, [{champion:'芮尔',championId:'Rell'},{champion:'猪妹',championId:'Sejuani'},{champion:'蝎子',championId:'Skarner'},{champion:'盲僧',championId:'LeeSin'}]), player('Faker', '中单', '奥莉安娜', 'Orianna', '', {}, [{champion:'奥莉安娜',championId:'Orianna'},{champion:'阿狸',championId:'Ahri'},{champion:'塞拉斯',championId:'Sylas'},{champion:'沙皇',championId:'Azir'}]), player('Gumayusi', 'ADC', '烬', 'Jhin', '', {}, [{champion:'烬',championId:'Jhin'},{champion:'艾希',championId:'Ashe'},{champion:'泽丽',championId:'Zeri'},{champion:'卡莎',championId:'Kaisa'}]), player('Keria', '辅助', '巴德', 'Bard', '', {}, [{champion:'巴德',championId:'Bard'},{champion:'锤石',championId:'Thresh'},{champion:'芮尔',championId:'Rell'},{champion:'洛',championId:'Rakan'}])],
    threats: ['Zeus 的亚托克斯在对线期压制力极强，369 需要稳住塔下。', 'Faker 的发条团战大招位置极为关键，注意分散站位不被拉满。', 'Keria 的巴德有全图大招，任何位置的开战都可能被反手大招反制。'],
    source: 'https://gol.gg/game/stats/53618/page-summary/',
    phases: [
      { time: '00:00', seconds: 0, name: '开野路线', location: '己方上半区野区', copy: 'Kanavi 蔚一级入侵是 JDG 的常规起手。Oner 芮尔大概率从下半区开野，但 Keria 巴德可能一级就去上半区做视野。你决定第一轮刷野路线。', signal: '队友 ping 对方红buff，问你要不要一起进。', kind: 'setup' },
      { time: '04:00', seconds: 240, name: '上路对线压力', location: '上路河道', copy: '369 兰博在和 Zeus 亚托克斯对线。Zeus 已经把兵线推过来了——他在等 Oner 芮尔 gank。369 的血量只有 60%，你这波来不来上？', signal: '队友 ping 上路河道，Zeus 往那边靠了。', kind: 'lane' },
      { time: '08:00', seconds: 480, name: '中路第一次联动', location: '中路河道入口', copy: 'knight 阿卡丽推完线消失了——她要么去游走下路，要么在蹲 Faker。Faker 发条也不见了。中野这波是谁在找谁？你的路线决定这次联动的结果。', signal: '队友 ping 下路三角草，问你要不要跟。', kind: 'rotate' },
      { time: '12:00', seconds: 720, name: '峡谷先锋', location: '上半区先锋坑', copy: '峡谷先锋刷新了。JDG 上路有优势，369 兰博可以先到。但 Oner 芮尔已经在先锋坑旁边站视野了——他在等 Keria 巴德到场。先打先锋还是先打人？', signal: '队友 ping 先锋坑，上路已经就位。', kind: 'trade' },
      { time: '17:00', seconds: 1020, name: '第二条小龙团', location: '龙坑入口', copy: '水龙刷新。Ruler 霞刚补完女神泪，还没到强势期。Keria 巴德已经在野区放了一个通道——他可能从任何位置绕后。这波团接不接？', signal: '队友 ping 龙坑，ADC 还在中路收线。', kind: 'vision' },
      { time: '22:00', seconds: 1320, name: '大龙前对峙', location: '大龙坑外', copy: '大龙还有 1 分钟刷新。Faker 发条站在中路侧翼，Oner 芮尔在龙坑口做视野。Keria 巴德不见了——他大概率在某个草里蹲着等机会。这波视野差怎么补？', signal: '队友 ping 河道草，请求一起排。', kind: 'fight' },
      { time: '27:00', seconds: 1620, name: '大龙决胜团', location: '大龙坑', copy: 'T1 先手动龙了。Zeus 亚托克斯在前面顶，Oner 芮尔准备开团。Faker 发条的球在后排——你猜他会拉谁？这波是抢龙还是接团？', signal: '队友 ping 大龙血量，问你能不能进。', kind: 'decisive' },
      { time: '32:00', seconds: 1920, name: '高地推进', location: '中路高地', copy: '你拿下了大龙 buff。兵线压到高地塔下。Ruler 霞的装备已经成型，但 Faker 发条和 Gumayusi 烬在高地上架好了防守。这波推高是一波结束，还是被 T1 反打？', signal: '队友 ping 高地塔，等你最后开团。', kind: 'finish' }
    ]
  }
];

// Every live event after the 00:00 entry is fictional simulation, not a VOD transcript.
export const PHASES = [
  { time: '00:00', seconds: 0, name: '开局落位', location: '己方野区入口', copy: '决胜局载入。双方都还没有暴露完整开局路线。你可以决定第一轮落位，但无法看到战争迷雾后的对手。', signal: '队友发出防守信号，等待你的落位。', kind: 'setup' },
  { time: '04:20', seconds: 260, name: '第一轮线权', location: '线上与河道入口', copy: '兵线交汇，河道外的敌方打野尚未露面。向前一步可以争取主动，也可能让你失去安全距离。', signal: '打野标记河道入口，请求留意支援。', kind: 'lane' },
  { time: '09:10', seconds: 550, name: '第一次联动', location: '下半区河道', copy: '双方开始靠近下半区。敌方中单离开了最后可见的位置。一次快速联动的机会出现，但你并不知道所有人的位置。', signal: '队友请求靠近；撤退信号同样有效。', kind: 'rotate' },
  { time: '14:30', seconds: 870, name: '换线与取舍', location: '边线与中路', copy: '比赛进入转线阶段。防御塔、兵线和中立资源无法同时兼顾，你需要为下一轮碰撞留下空间。', signal: '队友标记中路，等待你的换线回应。', kind: 'trade' },
  { time: '20:40', seconds: 1240, name: '大龙区域', location: '上半区河道', copy: '大龙已经出生。对手开始争夺河道位置，黑暗的入口并不意味着里面没有人。视野和阵型将决定谁先拥有选择权。', signal: '辅助标记河道草丛，请求协同排眼。', kind: 'vision' },
  { time: '25:10', seconds: 1510, name: '正面交锋', location: '中路河道侧翼', copy: '前排发生接触，双方后排仍在寻找输出位置。你拥有一个行动窗口，贸然前压也可能把自己暴露给第二轮控制。', signal: '队友标记敌方前排；侧翼仍需警戒。', kind: 'fight' },
  { time: '29:40', seconds: 1780, name: '胜负手', location: '大龙坑外', copy: '对手重新靠近大龙区域。可以制造进攻机会，也可以让他们先暴露意图。此前积累的视野和技能储备现在开始兑现。', signal: '队友请求同步行动，避免各自进场。', kind: 'decisive' },
  { time: '34:20', seconds: 2060, name: '最后的推进', location: '中路高地前', copy: '兵线来到高地附近。最后一次决定，关系到你能否把局势优势转化为水晶的碎裂声。', signal: '队友标记防御塔，等待最终行动。', kind: 'finish' }
];

export const ACTIONS = {
  上单: [
    ['守住上半区入口', '提前上线路争线', '跟随队友深入河道'],
    ['控住兵线，留意打野位置', '主动换血争线权', '放弃兵线，赶往河道'],
    ['处理兵线后靠近队友', '放弃兵线立即绕后', '继续边线发育'],
    ['带线牵制并保持支援距离', '正面集合压中路', '孤身深入推进边线'],
    ['先压边线，再沿视野靠近', '提前集合排眼', '从无视野的侧翼包抄'],
    ['盯住后排，限制敌方突进', '使用进场连招寻找后排', '向前压迫敌方前排'],
    ['等待侧翼信息再进场', '利用已有视野主动开团', '不等队友，直接突进'],
    ['跟随兵线推进，留意回防', '抓住机会强行越塔', '退回边线继续带线']
  ],
  打野: [
    ['防守入口，确认开野路线', '优先规划快速刷野', '邀请队友入侵野区'],
    ['先扫视野，再靠近线上', '直接绕后尝试抓人', '继续刷野等待机会'],
    ['确认中路线权再控资源', '抢先进入河道开资源', '放弃河道，交换野区'],
    ['与有线权的队友联动', '蹲守对方落单选手', '独自深入敌方野区'],
    ['和辅助一起建立视野', '趁对手未集合尝试大龙', '一个人深入河道探路'],
    ['保留控制保护己方输出', '使用进场连招先手', '直奔敌方后排'],
    ['确认队友位置，控制入口', '抓住视野优势主动开团', '直接开龙逼对手接战'],
    ['随兵线推进，保留反打技能', '越过前排强开后排', '转身刷野补充发育']
  ],
  中单: [
    ['配合防守，保留安全距离', '提前上线准备推线', '独自前探寻找对手'],
    ['推线后沿安全路线观察', '向前换血争取单杀', '放弃兵线立即游走'],
    ['处理兵线后从视野内支援', '走河道近路抢先到场', '留在线上发育并发撤退信号'],
    ['推线后与打野一起转线', '独自去边路寻找抓单', '继续中路施压'],
    ['推线后协同队友排眼', '藏在已知安全的侧翼', '进入黑暗草丛寻找机会'],
    ['保留控制，限制对方突进', '使用进场连招找关键目标', '跟进前排全力输出'],
    ['等待对手关键技能后反打', '利用视野主动寻找控制', '直接越过前排追击'],
    ['保护兵线，稳步压进高地', '交位移追击残血目标', '回城等待下一次机会']
  ],
  ADC: [
    ['跟随辅助防守野区入口', '提前到线上准备补刀', '独自压进河道侦察'],
    ['保持安全距离处理兵线', '前压换血争取线权', '离开兵线跟随河道信号'],
    ['跟随辅助从安全路线靠近', '确认接应后抢占输出位置', '清线发育并提醒队友撤退'],
    ['转中路，与辅助同步推进', '留在边线独自吃线', '跟随打野寻找交战'],
    ['在队友视野后处理兵线', '跟随辅助提前靠近河道', '独自走进河道抢位置'],
    ['保持距离，攻击安全目标', '使用进场方式跟进集火', '向前追击敌方后排'],
    ['等待对手突进技能后输出', '借助队友先手主动跟进', '独自绕侧翼寻找击杀'],
    ['站在前排身后持续点塔', '追击残血，尝试结束战斗', '暂缓推进，回城补充装备']
  ],
  辅助: [
    ['守住入口，与队友保持距离', '帮助下路提前占线', '独自深入放置进攻眼位'],
    ['与 ADC 同步处理兵线', '寻找控制命中机会', '离开下路，独自游走'],
    ['等待队友靠近再进入河道', '先手探路抢占位置', '留在下路保护发育'],
    ['配合 ADC 转中建立视野', '与打野一起寻找抓单', '单独深入野区布眼'],
    ['与打野成对推进视野', '守住现有视野等待对手', '独自进入黑暗草丛'],
    ['保留控制，保护己方输出', '使用进场连招开团', '越过前排追击后排'],
    ['确认队友位置再接触', '在已有视野处主动先手', '发现目标立即独自开团'],
    ['守在输出身边，掩护点塔', '强行先手塔下目标', '离开队伍寻找绕后位置']
  ]
};
