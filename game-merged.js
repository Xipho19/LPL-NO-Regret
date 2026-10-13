
/* === data.js === */
const player = (name, position, champion, championId, task, kit, heroPool) => ({ name, position, champion, championId, task, kit, heroPool: heroPool || [{champion, championId}] });
const CHAPTERS = [
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
    source: '',
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
    source: '',
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
      player('369', '上单', '杰斯', 'Jayce', '线上压制 · 传送支援', { engage: '开启闪电冲刺，电能震荡接加速之门消耗', protect: '切换锤形态，雷霆一击击退突进', escape: '开启加速之门，切换锤形态快速撤离' }, [{champion:'杰斯',championId:'Jayce'},{champion:'鳄鱼',championId:'Renekton'},{champion:'纳尔',championId:'Gnar'},{champion:'卢锡安',championId:'Lucian'},{champion:'奎因',championId:'Quinn'}]),
      player('Karsa', '打野', '潘森', 'Pantheon', '前期节奏 · 入侵反蹲', { engage: '贯星长枪起跳，接盾跃晕住目标', protect: '保留神枪盾阵格挡敌方爆发', escape: '用盾跃跳离战场，脱离集火范围' }, [{champion:'潘森',championId:'Pantheon'},{champion:'豹女',championId:'Nidalee'},{champion:'盲僧',championId:'LeeSin'},{champion:'男枪',championId:'Graves'},{champion:'皇子',championId:'JarvanIV'}]),
      player('knight', '中单', '奥莉安娜', 'Orianna', '推线团战 · 大招位置', { engage: '指令：冲击波拉回集中目标', protect: '指令：保护套住被突进的队友', escape: '用指令：冲击波调整位置后后撤' }, [{champion:'奥莉安娜',championId:'Orianna'},{champion:'塞拉斯',championId:'Sylas'},{champion:'妖姬',championId:'Leblanc'},{champion:'卡牌',championId:'TwistedFate'},{champion:'阿狸',championId:'Ahri'}]),
      player('JackeyLove', 'ADC', '烬', 'Jhin', '远程狙击 · 残局收割', { engage: '完美审判远程狙击暴露目标', protect: '保留束缚手雷保护自身安全', escape: '用队友位置作掩护，装填后后撤' }, [{champion:'烬',championId:'Jhin'},{champion:'卡莎',championId:'Kaisa'},{champion:'伊泽瑞尔',championId:'Ezreal'},{champion:'寒冰',championId:'Ashe'},{champion:'韦鲁斯',championId:'Varus'}]),
      player('yuyanjia', '辅助', '腕豪', 'Sett', '对线压制 · 开团保护', { engage: '叹为观止抱回敌方关键人物', protect: '刻意挥拳击退突进者', escape: '强手裂颅晕眩后拉开距离' }, [{champion:'腕豪',championId:'Sett'},{champion:'锤石',championId:'Thresh'},{champion:'洛',championId:'Rakan'},{champion:'蕾欧娜',championId:'Leona'},{champion:'巴德',championId:'Bard'}])
    ],
    enemies: [player('Bin', '上单', '悟空', 'MonkeyKing', '', {}, [{champion:'悟空',championId:'MonkeyKing'},{champion:'剑姬',championId:'Fiora'},{champion:'纳尔',championId:'Gnar'},{champion:'青钢影',championId:'Camille'}]), player('SofM', '打野', '李青', 'LeeSin', '', {}, [{champion:'李青',championId:'LeeSin'},{champion:'豹女',championId:'Nidalee'},{champion:'男枪',championId:'Graves'},{champion:'皇子',championId:'JarvanIV'},{champion:'死歌',championId:'Karthus'}]), player('Angel', '中单', '阿兹尔', 'Azir', '', {}, [{champion:'阿兹尔',championId:'Azir'},{champion:'发条',championId:'Orianna'},{champion:'辛德拉',championId:'Syndra'},{champion:'卡牌',championId:'TwistedFate'},{champion:'佐伊',championId:'Zoe'}]), player('huanfeng', 'ADC', '伊泽瑞尔', 'Ezreal', '', {}, [{champion:'伊泽瑞尔',championId:'Ezreal'},{champion:'烬',championId:'Jhin'},{champion:'卡莎',championId:'Kaisa'},{champion:'寒冰',championId:'Ashe'},{champion:'女枪',championId:'MissFortune'}]), player('SwordArt', '辅助', '洛', 'Rakan', '', {}, [{champion:'洛',championId:'Rakan'},{champion:'锤石',championId:'Thresh'},{champion:'巴德',championId:'Bard'},{champion:'蕾欧娜',championId:'Leona'},{champion:'泰坦',championId:'Nautilus'}])],
    threats: ['Bin 的悟空配合 SofM 有极快的上路启动速度，369 需要保持安全距离。', 'Angel 的沙皇在中路有极强的推线和区域控制，游走前先确认他的位置。', 'huanfeng 的伊泽瑞尔poke距离很远，团战前需要维持血量优势。'],
    source: '',
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
      player('369', '上单', '兰博', 'Rumble', '对线压制 · 团战分割', { engage: '恒温灼烧封锁敌方走位，火焰散射补伤害', protect: '火焰散射减速突进者，为后排争取空间', escape: '用火焰屏障掩护自己和队友后撤' }, [{champion:'兰博',championId:'Rumble'},{champion:'杰斯',championId:'Jayce'},{champion:'鳄鱼',championId:'Renekton'},{champion:'武器',championId:'Jax'},{champion:'奎桑提',championId:'KSante'}]),
      player('Kanavi', '打野', '蔚', 'Vi', '前期节奏 · 野区对抗', { engage: '爆气冲冲撞墙接强能冲拳击飞目标', protect: '保留金属壁垒保护被开的队友', escape: '用爆气冲穿墙撤离战场' }, [{champion:'蔚',championId:'Vi'},{champion:'蜘蛛',championId:'Elise'},{champion:'盲僧',championId:'LeeSin'},{champion:'蝎子',championId:'Skarner'},{champion:'大树',championId:'Maokai'}]),
      player('knight', '中单', '阿卡丽', 'Akali', '刺客切入 · 边线单带', { engage: '我流奥义：隼舞突进，接寒影打伤害', protect: '保留霞阵在被集火时隐身脱战', escape: '用隼舞位移到安全位置后后撤' }, [{champion:'阿卡丽',championId:'Akali'},{champion:'阿狸',championId:'Ahri'},{champion:'塞拉斯',championId:'Sylas'},{champion:'沙皇',championId:'Azir'},{champion:'妖姬',championId:'Leblanc'}]),
      player('Ruler', 'ADC', '霞', 'Xayah', '持续输出 · 团战拉扯', { engage: '羽翼利刃铺场，倒钩拉回集中目标', protect: '保留倒钩限制突进者靠近', escape: '用暴风羽刃拉开与敌人的距离' }, [{champion:'霞',championId:'Xayah'},{champion:'厄斐琉斯',championId:'Aphelios'},{champion:'卡莎',championId:'Kaisa'},{champion:'韦鲁斯',championId:'Varus'},{champion:'泽丽',championId:'Zeri'}]),
      player('Missing', '辅助', '阿利斯塔', 'Alistar', '视野控制 · 开团保护', { engage: '粉碎技能接大地震撼，眩晕敌方前排', protect: '用坚定意志保护后排不被秒', escape: '用冲锋接粉碎技能将敌人顶开后撤退' }, [{champion:'阿利斯塔',championId:'Alistar'},{champion:'锤石',championId:'Thresh'},{champion:'璐璐',championId:'Lulu'},{champion:'米利欧',championId:'Milio'},{champion:'泰坦',championId:'Nautilus'}])
    ],
    enemies: [player('Zeus', '上单', '亚托克斯', 'Aatrox', '', {}, [{champion:'亚托克斯',championId:'Aatrox'},{champion:'杰斯',championId:'Jayce'},{champion:'奎桑提',championId:'KSante'},{champion:'鳄鱼',championId:'Renekton'},{champion:'武器',championId:'Jax'}]), player('Oner', '打野', '芮尔', 'Rell', '', {}, [{champion:'芮尔',championId:'Rell'},{champion:'猪妹',championId:'Sejuani'},{champion:'蝎子',championId:'Skarner'},{champion:'盲僧',championId:'LeeSin'},{champion:'皇子',championId:'JarvanIV'}]), player('Faker', '中单', '奥莉安娜', 'Orianna', '', {}, [{champion:'奥莉安娜',championId:'Orianna'},{champion:'阿狸',championId:'Ahri'},{champion:'塞拉斯',championId:'Sylas'},{champion:'沙皇',championId:'Azir'},{champion:'瑞兹',championId:'Ryze'}]), player('Gumayusi', 'ADC', '烬', 'Jhin', '', {}, [{champion:'烬',championId:'Jhin'},{champion:'艾希',championId:'Ashe'},{champion:'泽丽',championId:'Zeri'},{champion:'卡莎',championId:'Kaisa'},{champion:'韦鲁斯',championId:'Varus'}]), player('Keria', '辅助', '巴德', 'Bard', '', {}, [{champion:'巴德',championId:'Bard'},{champion:'锤石',championId:'Thresh'},{champion:'芮尔',championId:'Rell'},{champion:'洛',championId:'Rakan'},{champion:'阿利斯塔',championId:'Alistar'}])],
    threats: ['Zeus 的亚托克斯在对线期压制力极强，369 需要稳住塔下。', 'Faker 的发条团战大招位置极为关键，注意分散站位不被拉满。', 'Keria 的巴德有全图大招，任何位置的开战都可能被反手大招反制。'],
    source: '',
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
const PHASES = [
  { time: '00:00', seconds: 0, name: '开局落位', location: '己方野区入口', copy: '决胜局载入。双方都还没有暴露完整开局路线。你可以决定第一轮落位，但无法看到战争迷雾后的对手。', signal: '队友发出防守信号，等待你的落位。', kind: 'setup' },
  { time: '04:20', seconds: 260, name: '第一轮线权', location: '线上与河道入口', copy: '兵线交汇，河道外的敌方打野尚未露面。向前一步可以争取主动，也可能让你失去安全距离。', signal: '打野标记河道入口，请求留意支援。', kind: 'lane' },
  { time: '09:10', seconds: 550, name: '第一次联动', location: '下半区河道', copy: '双方开始靠近下半区。敌方中单离开了最后可见的位置。一次快速联动的机会出现，但你并不知道所有人的位置。', signal: '队友请求靠近；撤退信号同样有效。', kind: 'rotate' },
  { time: '14:30', seconds: 870, name: '换线与取舍', location: '边线与中路', copy: '比赛进入转线阶段。防御塔、兵线和中立资源无法同时兼顾，你需要为下一轮碰撞留下空间。', signal: '队友标记中路，等待你的换线回应。', kind: 'trade' },
  { time: '20:40', seconds: 1240, name: '大龙区域', location: '上半区河道', copy: '大龙已经出生。对手开始争夺河道位置，黑暗的入口并不意味着里面没有人。视野和阵型将决定谁先拥有选择权。', signal: '辅助标记河道草丛，请求协同排眼。', kind: 'vision' },
  { time: '25:10', seconds: 1510, name: '正面交锋', location: '中路河道侧翼', copy: '前排发生接触，双方后排仍在寻找输出位置。你拥有一个行动窗口，贸然前压也可能把自己暴露给第二轮控制。', signal: '队友标记敌方前排；侧翼仍需警戒。', kind: 'fight' },
  { time: '29:40', seconds: 1780, name: '胜负手', location: '大龙坑外', copy: '对手重新靠近大龙区域。可以制造进攻机会，也可以让他们先暴露意图。此前积累的视野和技能储备现在开始兑现。', signal: '队友请求同步行动，避免各自进场。', kind: 'decisive' },
  { time: '34:20', seconds: 2060, name: '最后的推进', location: '中路高地前', copy: '兵线来到高地附近。最后一次决定，关系到你能否把局势优势转化为水晶的碎裂声。', signal: '队友标记防御塔，等待最终行动。', kind: 'finish' }
];

const ACTIONS = {
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

/* === engine.js === */
const getChapter = id => CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
const getPhases = c => c.phases || PHASES;
const clamp = (x, min, max = Infinity) => Math.max(min, Math.min(max, x));
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;
function createRun(chapterId, playerIndex, rulesVersion = 1) {
  const chapter = getChapter(chapterId);
  if (!Number.isInteger(playerIndex) || !chapter.players[playerIndex]) throw new Error('Unknown player');
  if (![1, 2].includes(rulesVersion)) throw new Error('Unknown rules');
  const laningMap = { 'Bin': 3, 'Xun': 2, 'knight': 4, 'Elk': 3, 'ON': 2, 'Letme': 3, 'Mlxg': 3, 'xiaohu': 2, 'Uzi': 4, 'Ming': 2, '369': 3, 'Karsa': 2, 'Knight': 4, 'JackeyLove': 4, 'yuyanjia': 2, 'Ruler': 4, 'Kanavi': 3, 'missing': 2 };
  const initLaning = laningMap[chapter.players[playerIndex].name] || 2;
  return { ...(rulesVersion === 2 ? {rulesVersion: 2} : {}), chapterId: chapter.id, playerIndex, step: 0, vision: 2, tempo: 2, cohesion: 2, laning: initLaning, gold: 0, kills: [0, 0], towers: [0, 0], flashReadyAt: 0, ultReadyAt: 0, history: [], finished: false, won: false, seriesScore: chapter.startingScore || [0, 0], gameNumber: chapter.game || 1, gameHistory: [], intermission: false };
}
function choicesFor(run) {
  if (run.rulesVersion === 2) return tacticalChoices(run);
  const chapter = getChapter(run.chapterId), p = chapter.players[run.playerIndex], phases = getPhases(chapter);
  const time = phases[run.step].seconds;
  return ACTIONS[p.position][run.step].map((label, index) => {
    let note = ['90% 成功：视野+1，配合+1，经济+150\n10% 失败：经济-100', '50% 成功：经济+500，节奏+1\n50% 失败：经济-400，节奏-1', '30% 成功：经济+900，配合+2，对线+2\n70% 失败：经济-600，对线-2，节奏-1'][index];
    if (run.step === 5 || run.step === 6) {
      if (index === 0) note = '90% 成功：视野+1，配合+1，经济+200\n10% 失败：经济-150';
      if (index === 1) note = '50% 成功：经济+800，节奏+2\n50% 失败：经济-600，节奏-1';
      if (index === 2) note = '30% 成功：经济+1200，配合+2，对线+2\n70% 失败：经济-900，对线-2，节奏-2';
    }
    const usesUlt = index === 1 && (run.step === 5 || run.step === 6);
    return { label, note, usesUlt, disabled: usesUlt && run.ultReadyAt > time };
  });
}
function advance(run, actionIndex) {
  if (run.finished) throw new Error('Match already finished');
  const choice = choicesFor(run)[actionIndex];
  if (!choice || choice.disabled) throw new Error('Action unavailable');
  const next = structuredClone(run), chapter = getChapter(run.chapterId), phases = getPhases(chapter), phase = phases[run.step];
  const kind = phase.kind;
  const before = structuredClone(run);
  delete before.history;
  let gold = 0, outcome = '', result = 'neutral';
  const early = run.step < 5;
  if (actionIndex === 0) {
    // A: 90% 成功，稳健路线，只加经济不加评分
    const success = Math.random() < 0.9;
    if (success) {
      gold = early ? 150 : 200;
      outcome = '你保持稳健站位，安全积累了经济。但过于保守，队伍没有拿到评分优势。';
      result = 'stable';
    } else {
      gold = -100;
      outcome = '虽然稳健，但对手抓住你过于保守的破绽，拿下了一波资源。';
      result = 'risk';
    }
  } else if (actionIndex === 1) {
    // B: 50% 成功，常规操作
    const success = Math.random() < 0.5;
    if (success) {
      gold = early ? 500 : 800;
      next.tempo = clamp(run.tempo + 1, 0);
      next.vision = clamp(run.vision - 1, 0);
      outcome = '你主动寻找机会，队友配合到位，争到了地图主动权。';
      result = 'good';
      next.kills[0] += 2;
    } else {
      gold = early ? -400 : -600;
      next.tempo = clamp(run.tempo - 1, 0);
      next.cohesion = clamp(run.cohesion - 1, 0);
      outcome = '主动出击但时机不对，对手反打成功，队伍节奏被打断。';
      result = 'risk';
      next.kills[1] += 2;
    }
  } else {
    // C: 30% 成功，高风险操作
    const success = Math.random() < 0.3;
    if (success) {
      gold = early ? 900 : 1200;
      next.cohesion = clamp(run.cohesion + 2, 0);
      next.tempo = clamp(run.tempo + 2, 0);
      next.laning = clamp(run.laning + 2, 0);
      outcome = '你抓住对手致命失误！关键操作拉满，这波冒险直接打崩对面节奏。';
      result = 'good';
      next.kills[0] += 3;
    } else {
      gold = early ? -600 : -900;
      next.laning = clamp(run.laning - 2, 0);
      next.tempo = clamp(run.tempo - (early ? 1 : 2), 0);
      next.cohesion = clamp(run.cohesion - 1, 0);
      outcome = '你冲得太深，对手集火你先被秒。团战少了核心，队伍只能后撤。';
      result = 'risk';
      next.kills[1] += 2;
    }
  }
  if (run.rulesVersion === 2) {
    if (choice.gamble != null) {
      const win = Math.random() < choice.gamble;
      // 根据节点类型决定加哪个评分维度
      const statMap = { setup: 'tempo', lane: 'laning', rotate: 'cohesion', trade: 'tempo', vision: 'vision', fight: 'cohesion', decisive: 'tempo', finish: 'cohesion' };
      const winStat = statMap[kind] || 'tempo';
      if (win) {
        gold = choice.baseGold;
        if (choice.gamble < 0.8) {
          next[winStat] = clamp(run[winStat] + (choice.gamble > 0.5 ? 1 : 2), 0);
          if (choice.gamble < 0.5) {
            if (winStat !== 'cohesion') next.cohesion = clamp(run.cohesion + 1, 0);
            if (winStat !== 'tempo') next.tempo = clamp(run.tempo + 1, 0);
          }
        }
        outcome = choice.gamble >= 0.8 ? '你保持稳健站位，安全积累了经济。但过于保守，队伍没有拿到评分优势。' : `这波${winStat === 'tempo' ? '节奏' : winStat === 'laning' ? '对线' : winStat === 'cohesion' ? '配合' : '视野'}拿到优势，局面打开了。`;
        result = choice.gamble >= 0.8 ? 'stable' : 'good';
        next.kills[0] += choice.gamble > 0.5 ? 1 : 3;
      } else {
        gold = choice.baseGold > 0 ? -choice.baseGold * 0.8 : choice.baseGold;
        if (choice.gamble < 0.8) {
          next[winStat] = clamp(run[winStat] - 1, 0);
          next.vision = clamp(run.vision - 1, 0);
        }
        outcome = '时机不对，对手反打成功，队伍节奏被打断。';
        result = 'risk';
        next.kills[1] += 2;
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
    // 新评分公式：经济25% + 视野15% + 配合20% + 节奏20% + 对线20%
    const score = (next.gold / 1000) * 0.25 
                + next.vision * 0.15 
                + next.cohesion * 0.20 
                + next.tempo * 0.20 
                + next.laning * 0.20;
    const gameWon = score > 2.5;
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
function nextGame(run) {
  if (!run.intermission) throw new Error('Not in intermission');
  const next = structuredClone(run);
  next.intermission = false;
  next.gameNumber += 1;
  next.step = 0;
  next.vision = 2; next.tempo = 2; next.cohesion = 2; next.gold = 0;
  const chapter = getChapter(next.chapterId);
  const laningMap = { 'Bin': 3, 'Xun': 2, 'knight': 4, 'Elk': 3, 'ON': 2, 'Letme': 3, 'Mlxg': 3, 'xiaohu': 2, 'Uzi': 4, 'Ming': 2, '369': 3, 'Karsa': 2, 'Knight': 4, 'JackeyLove': 4, 'yuyanjia': 2, 'Ruler': 4, 'Kanavi': 3, 'missing': 2 };
  next.laning = laningMap[chapter.players[next.playerIndex].name] || 2;
  next.kills = [0, 0]; next.towers = [0, 0];
  next.flashReadyAt = 0; next.ultReadyAt = 0;
  next.history = [];
  return next;
}
function getChampionForGame(run, playerIndex) {
  const chapter = getChapter(run.chapterId);
  const p = chapter.players[playerIndex];
  if (!p.heroPool || p.heroPool.length <= 1) return { champion: p.champion, championId: p.championId };
  const idx = (run.gameNumber - 1) % p.heroPool.length;
  return p.heroPool[idx];
}
function rewind(run, nodeIndex = run.history.length - 1) {
  if (!run.finished || !run.history.length) throw new Error('Rewind is available after a completed match');
  if (!Number.isInteger(nodeIndex) || nodeIndex < 0 || nodeIndex >= run.history.length) throw new Error('Invalid rewind node');
  const record = run.history[nodeIndex];
  return { ...structuredClone(record.before), history: structuredClone(run.history.slice(0, nodeIndex)), finished: false, won: false };
}
function validateRun(run) {
  try {
    if (!run || typeof run !== 'object' || !CHAPTERS.some(c => c.id === run.chapterId)) return false;
    let replay = createRun(run.chapterId, run.playerIndex, run.rulesVersion ?? 1);
    if (!Array.isArray(run.history) || run.history.length > getPhases(getChapter(run.chapterId)).length) return false;
    for (const record of run.history) replay = advance(replay, record.actionIndex);
    return JSON.stringify(canonical(replay)) === JSON.stringify(canonical(run));
  } catch { return false; }
}

/* === tactics.js === */

const specialties = { 上单: 3, 打野: 4, 中单: 2, ADC: 5, 辅助: 6 };
const pressure = ['入口尚未确认', '兵线与河道需要取舍', '支援窗口正在收窄', '对手正在交换地图资源', '资源区入口承压', '正面接触开始', '对手重新争夺河道', '推进窗口即将结束'];
function tacticalChoices(run) {
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
  const successColor = (text) => `<span style="color:#7ee787">${text}</span>`;
  const failColor = (text) => `<span style="color:#ff7b72">${text}</span>`;
  // 每个节点加不同的评分维度
  const statByKind = { setup: '节奏', lane: '对线', rotate: '配合', trade: '节奏', vision: '视野', fight: '配合', decisive: '节奏', finish: '配合' };
  const statKeyByKind = { setup: 'tempo', lane: 'laning', rotate: 'cohesion', trade: 'tempo', vision: 'vision', fight: 'cohesion', decisive: 'tempo', finish: 'cohesion' };
  const winStat = statByKind[kind] || '节奏';
  const winStatKey = statKeyByKind[kind] || 'tempo';
  const bSuccess = `${winStat}+1，经济+500`;
  const bFail = `${winStat}-1，经济-400`;
  const cSuccess = winStat === '配合' ? `${winStat}+3，经济+900` : `${winStat}+2，配合+1，经济+900`;
  const cFail = `${winStat}-2，视野-1，经济-600`;
  if (kind === 'setup') {
    labels = [`跟随队伍落位，确认防守入口`, `提前布置视野，抢占先手位置`, `独自深入野区，提前反蹲`];
  } else if (kind === 'lane') {
    labels = [`稳线发育，等待队友支援`, `主动换血，压制对手`, `打得凶一点，尝试单杀`];
  } else if (kind === 'rotate') {
    labels = [`推完线再支援，不冒被蹲风险`, `走河道近路，抢先到场`, `放弃兵线直接游走，尝试抓单`];
  } else if (kind === 'trade') {
    labels = [`放掉这个资源，换另一侧塔/资源`, `集合打这个资源，需要队友到位`, `不等队友，强行抢资源`];
  } else if (kind === 'vision') {
    labels = [`和队友一起排视野，安全推进`, `先做视野再靠近，逐步压缩空间`, `独自探草，尝试冒险`];
  } else if (kind === 'fight') {
    labels = [`${p.kit.protect}，保后排接团`, `${p.kit.engage}，找机会开团`, `不等队友直接上，尝试切后排`];
  } else if (kind === 'decisive') {
    labels = [`等对手先交技能再反打`, `${p.kit.engage}，主动找关键目标`, `强行开对方后排，尝试一波`];
  } else {
    labels = [`稳步推进，等对手失误`, `集体压上，强拆高地`, `独自前压逼水晶，尝试一波结束`];
  }
  notes = [
    `${successColor('90% 成功：经济+150')}\n${failColor('10% 失败：经济-100')}`,
    `${successColor(`50% 成功：${bSuccess}`)}\n${failColor(`50% 失败：${bFail}`)}`,
    `${successColor(`30% 成功：${cSuccess}`)}\n${failColor(`70% 失败：${cFail}`)}`
  ];

  return labels.map((label, a) => ({
    label, usesUlt: a === 1 && [5, 6].includes(i),
    disabled: a === 1 && [5, 6].includes(i) && run.ultReadyAt > phases[i].seconds,
    supported, visionNeed,
    baseGold: a === 0 ? 150 : a === 1 ? 500 : 900,
    gamble: a === 2 ? 0.3 : (a === 1 ? 0.5 : 0.9),
    note: notes[a]
  }));
}
function tacticalReading(run, index) {
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

/* === review.js === */

const signed = n => `${n >= 0 ? '+' : '−'}${Math.abs(n).toLocaleString('zh-CN')}`;
const stateText = s => `经济差 ${signed(s.gold)}；视野 ${s.vision}/5；接应 ${s.cohesion}/5；节奏 ${s.tempo}`;
const cache = new WeakMap();
const gaps = s => [s.gold < 1800 && `经济还差 ${1800 - s.gold}`, s.cohesion < 2 && `接应还差 ${2 - s.cohesion} 级`, s.tempo < 1 && `节奏还差 ${1 - s.tempo} 级`].filter(Boolean);
function statesFor(run) {
  const states = [createRun(run.chapterId, run.playerIndex, run.rulesVersion ?? 1)];
  for (const h of run.history) states.push(advance(states.at(-1), h.actionIndex));
  return states;
}
function basicReview(run) {
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

function deepReview(run) {
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

/* === commentary.js === */

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

function actionCommentary(run, index) {
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

/* === app.js === */

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

function persist() { try { const slim = { ...run, history: run.history?.map(h => ({ actionIndex: h.actionIndex, time: h.time, phase: h.phase })), gameHistory: run.gameHistory?.map(g => ({ game: g.game, won: g.won, gold: g.gold })) }; localStorage.setItem(STORAGE, JSON.stringify({ run: slim, completed: completed.slice(-20), rewindReady, achievements: unlockedAchievements })); } catch { toast('存储已满，已自动清理旧记录。'); try { localStorage.removeItem(STORAGE); } catch {} } }
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
const championImg = (p, c, cls = '') => { const local = `assets/${c.assetPatch}/${p.championId}.png`; return `<span class="champion-img ${cls}" data-fallback="${esc(p.champion.slice(0, 1))}"><img src="${local}" onerror="this.style.display='none'" alt="${esc(p.champion)}" loading="lazy"></span>`; };
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
  return `<section class="home-screen"><div class="home-bg"></div><div class="home-particles"><div class="p1"></div><div class="p2"></div><div class="p3"></div><div class="p4"></div></div><div class="home-content"><span class="home-eyebrow">THE SECOND CHANCE · 遗憾档案馆</span><h1>LPL：不留遗憾</h1><div class="home-divider"></div><p>回到那些年，你放不下的那场比赛。<br>真实阵容，你的决定，另一种结局。</p><button class="home-start" data-action="start-game">开始改写 ${icon('arrow')}</button><div class="home-chapter-preview"><span>2018 RNG</span><span>2020 TES</span><span>2023 JDG</span><span>2024 BLG</span></div><small class="home-note">本地存档 · 无需登录 · 关键决策不限时</small></div></section>`;
}

function catalog() {
  const c = getChapter(chapterId), p = c.players[playerIndex];
  const open = c.unlocked || permit === c.id;
  return `<section class="page-heading"><div><div class="eyebrow">THE ARCHIVE / 遗憾档案馆</div><h1>有些比赛，值得再打一次<span class="orange">。</span></h1><p>回到命运的转折点。这一次，把决定权交给你。</p></div><button class="secondary" data-action="back-grid">← 返回选关</button></section>
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
  // 双方英雄去重
  const used = new Set();
  c.players.forEach((pp,i)=>{ const g = getChampionForGame(run, i); pp.champion = g.champion; pp.championId = g.championId; used.add(g.championId); });
  c.enemies.forEach((e,i)=>{ let g = getChampionForGame(run, i); let pool = e.heroPool || [{champion:e.champion,championId:e.championId}]; let idx = (run.gameNumber - 1) % pool.length; while(used.has(pool[idx].championId) && used.size < 10) { idx = (idx+1) % pool.length; } e.champion = pool[idx].champion; e.championId = pool[idx].championId; used.add(e.championId); });
  p.champion = c.players[run.playerIndex].champion; p.championId = c.players[run.playerIndex].championId;
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
  </section><aside class="match-sidebar"><section class="identity"><div style="display:flex;justify-content:space-between;align-items:center"><div class="side-overline">YOUR SEAT / 你的选手席</div><button class="ad-boost-btn" data-action="ad-boost">📺 广告强化 +1</button></div><div class="identity-main">${championImg(p,c)}<div><h2>${p.name}</h2><span>${c.team} · ${p.position}</span></div></div><div class="hero-name">${p.champion}<span>PATCH ${c.patch}</span></div><p>${p.task}</p><div class="stat-row"><span>经济</span><strong class="${run.gold>=0?'ready':'danger'}">${signed(run.gold)}</strong></div><div class="stat-row"><span>视野</span><strong>${run.vision}</strong></div><div class="stat-row"><span>配合</span><strong>${run.cohesion}</strong></div><div class="stat-row"><span>节奏</span><strong>${run.tempo}</strong></div><div class="stat-row"><span>对线</span><strong>${run.laning}</strong></div><div class="skill-row"><span>闪现</span><strong class="${run.flashReadyAt > phase.seconds ? 'muted' : 'ready'}">${run.flashReadyAt > phase.seconds ? `${run.flashReadyAt-phase.seconds} 秒` : '可用'}</strong></div><div class="skill-row"><span>大招</span><strong class="${phase.seconds<550 || run.ultReadyAt > phase.seconds ? 'muted' : 'ready'}">${phase.seconds<550 ? '未解锁 / 推演阶段' : run.ultReadyAt > phase.seconds ? `${run.ultReadyAt-phase.seconds} 秒` : '可用'}</strong></div></section>
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
  <section class="review-summary"><div class="section-heading"><div><span class="section-index">01</span><h2>免费的基础复盘</h2></div><span class="subtle">${p.name} / ${p.champion}</span></div><div class="history-compare"><div><span class="side-overline">真实历史</span><h3>${c.historicalScore}</h3><p>${c.historicalResult}</p><small>比赛数据来源：历史赛事记录</small></div><div><span class="side-overline">你的改写</span><h3>${c.team} ${score} ${c.opponent}</h3><p>${esc(basic.summary)}</p><small>架空分支起点：00:00 你介入之后，全部赛况均为规则推演，不代表真实比赛过程。</small></div></div>
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
  document.body.classList.toggle('scene-play', scene === 'play' && !run?.intermission);
  document.body.classList.toggle('scene-chapter', scene === 'catalog' && !showGrid);
  document.body.classList.toggle('scene-review', scene === 'review');
  if (scene === 'home') { app.innerHTML = homeView(); }
  else if (scene === 'catalog' && showGrid) { app.innerHTML = shell(gridView()); }
  else app.innerHTML = shell(scene === 'catalog' ? catalog() : scene === 'play' ? (run && run.intermission ? intermissionView() : matchView()) : scene === 'review' ? reviewView() : scene === 'achievements' ? achievementsView() : journeyView());
  app.classList.toggle('catalog-scene', scene === 'catalog');
  if (scene === 'catalog' && !showGrid) {
    const c = getChapter(chapterId), p = c.players[playerIndex], open = c.unlocked || permit === c.id;
    app.insertAdjacentHTML('beforeend', `<div class="mobile-entry"><span>${c.team} · ${p.name}<small>${p.champion} / ${p.position}</small></span><div class="mobile-entry-actions">${run && !run.finished ? '<button class="secondary" data-action="continue">继续已保存的对局</button>' : ''}<button class="primary" data-action="${open?'briefing':'unlock'}">${open?`以 ${p.name} 身份进入`:'观看广告后解锁'}</button></div></div>`);
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
class LampsAdProvider {
  show(placement) {
    if (window.LampsPlatform && typeof window.LampsPlatform.showRewardedVideo === 'function') {
      return window.LampsPlatform.showRewardedVideo({ source: placement }).then(res => ({ completed: res.ok, message: res.message }));
    }
    return Promise.resolve({ completed: false, message: '广告不可用' });
  }
}
const adProvider = new LampsAdProvider();
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
  showModal('历史资料与素材', `<div class="help-content"><p>每个章节绑定自己的年份、参赛名单、英雄和版本，禁止跨章节共用现役选手照片。</p>${CHAPTERS.map(c=>`<h3>${c.year} · ${c.team} vs ${c.opponent} · G${c.game}</h3><p>版本 ${c.patch}${c.historicalDuration ? '，真实本局时长 ' + c.historicalDuration : ''}。比赛记录来源：历史赛事记录</p>`).join('')}<h3>图片使用状态</h3><p>英雄头像来自 Riot Data Dragon 对应版本本地资源。</p><p>选手席背景为历史定妆照，阵容以当局首发为准。</p><h3>推演范围</h3><p>当前为规则驱动的文字决策原型，尚非完整伤害、装备、兵线与寻路模拟器。未冒充历史现场或官方授权游戏。</p></div>`, '<button class="primary" data-modal="close">返回游戏</button>');
}
function chapterInfo() {
  const c = getChapter(chapterId);
  showModal(`${c.year} · ${c.team} vs ${c.opponent}`, `<p class="modal-lead">${c.event} · 第五局 · 版本 ${c.patch}</p><p>${c.description}</p><h3>双方当局首发</h3><div class="roster-table">${c.players.map((p,i)=>`<div><span>${p.position}</span><strong>${p.name}<small>${p.champion}</small></strong><strong>${c.enemies[i].name}<small>${c.enemies[i].champion}</small></strong></div>`).join('')}</div><details class="history-spoiler"><summary>展开真实历史赛果</summary><p>${c.historicalResult} 当局时长 ${c.historicalDuration}。</p></details><small>比赛数据来源：历史赛事记录</small>`, '<button class="primary" data-modal="close">返回选手席</button>');
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
  if(action==='ad-boost'){
    window.LampsPlatform.showRewardedVideo({source:'boost'}).then(res=>{
      if(res.ok){
        const stats = ['vision','cohesion','tempo','laning'];
        for(let i=0;i<2;i++){const s=stats[Math.floor(Math.random()*stats.length)];run[s]=run[s]+1;}
        toast('📺 广告完成，随机两项评分+1！');
        persist();render(true);
      }else{toast(res.message||'广告未完成');}
    });
  }
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
