const dimensions = [
  { key: "action" },
  { key: "insight" },
  { key: "empathy" },
  { key: "order" },
  { key: "adapt" },
  { key: "aura" },
];

const fateLines = [
  "序章刚翻开，主角光还没打到你脸上。",
  "你已经摸到第一条支线，旁白开始认真看你。",
  "命运齿轮轻轻一响，反派名单多看了你一眼。",
  "主角团正在靠近，队友缘分开始冒泡。",
  "你的隐藏身份有点眉目了，马甲柜正在加载。",
  "副本难度上调，奖励看起来也更香了。",
  "第一个名场面快到了，请保持坐姿。",
  "剧情开始偏航，作者可能也没想到你这么选。",
  "强敌提前入场，弹幕已经开始刷屏。",
  "日常回合结束，下一章大概率不太日常。",
  "终局选项亮起，你的角色底色快藏不住了。",
  "卷末彩页生成中，准备揭晓你的本命角色。",
];

const characters = [
  {
    id: "klein",
    name: "克莱恩·莫雷蒂",
    work: "《诡秘之主》",
    gender: "男角色",
    mark: "愚",
    color: "#31495f",
    imageUrl: "assets/characters-ai/klein.webp",
    imagePosition: "center 14%",
    profile: { action: 4, insight: 10, empathy: 7, order: 8, adapt: 7, aura: 8 },
    tags: ["谨慎布局", "神秘学", "背负感"],
    copy: "你习惯先看清世界规则，再决定如何落子。外表克制，内里一直在承担更多，越到危局越像真正的主心骨。",
    intro: "克莱恩·莫雷蒂从陌生世界的普通人开局，一步步卷入神秘学、教会、非凡者与时代暗流。他的魅力在于谨慎、善良和孤独感并存，越是接近真相，越能看见他身上那种不肯丢下普通人的底色。",
    hook: "适合被“神秘、悬疑、隐忍成长、群像羁绊”击中的读者。",
  },
  {
    id: "xu-qian",
    name: "许七安",
    work: "《大奉打更人》",
    gender: "男角色",
    mark: "更",
    color: "#b6753b",
    imageUrl: "assets/characters-ai/xu-qian.webp",
    imagePosition: "center 14%",
    profile: { action: 8, insight: 8, empathy: 6, order: 4, adapt: 10, aura: 7 },
    tags: ["破案行动", "嘴强王者", "人间烟火"],
    copy: "你不怕局面乱，甚至越乱越能找到突破口。该讲道理时讲道理，该掀桌时也绝不手软。",
    intro: "许七安是那种一进场就会让剧情变热闹的人：会破案、会吐槽、会在人情世故里穿梭，也会在关键时刻扛住大局。他的爽感不只来自变强，也来自用现代脑回路撞进古代权力场。",
    hook: "适合喜欢“探案、轻喜剧、权谋推进、爽点密集”的读者。",
  },
  {
    id: "ye-xiu",
    name: "叶修",
    work: "《全职高手》",
    gender: "男角色",
    mark: "荣",
    color: "#486b57",
    imageUrl: "assets/characters-ai/ye-xiu.webp",
    imagePosition: "center 15%",
    profile: { action: 7, insight: 9, empathy: 5, order: 7, adapt: 8, aura: 8 },
    tags: ["战术大师", "低调王者", "团队核心"],
    copy: "你对胜负有很强的理解，但不需要靠高调证明自己。真正进入战场时，你会用经验、判断和节奏掌控全局。",
    intro: "叶修是站在荣耀顶端又重新出发的职业选手。他最迷人的地方不是单纯强，而是对游戏、团队和胜利方式的理解足够深，哪怕从零开始，也能把旧经验打成新传奇。",
    hook: "适合喜欢“电竞热血、团队成长、老将归来、技术流”的读者。",
  },
  {
    id: "han-li",
    name: "韩立",
    work: "《凡人修仙传》",
    gender: "男角色",
    mark: "凡",
    color: "#66725f",
    imageUrl: "assets/characters-ai/han-li.webp",
    imagePosition: "center 16%",
    profile: { action: 4, insight: 8, empathy: 4, order: 10, adapt: 6, aura: 6 },
    tags: ["谨慎发育", "资源管理", "稳到最后"],
    copy: "你的强项不是一时爆发，而是长期主义。你会给自己留退路，也会在别人忽略的地方慢慢攒出胜势。",
    intro: "韩立是凡人流修仙的代表人物，出身普通，却靠谨慎、自律和对风险的判断一步步走远。他不是天生站在聚光灯下的人，但正因为足够稳，才让每一次突破都显得扎实有分量。",
    hook: "适合喜欢“谨慎修仙、长期发育、资源经营、稳健逆袭”的读者。",
  },
  {
    id: "xiao-yan",
    name: "萧炎",
    work: "《斗破苍穹》",
    gender: "男角色",
    mark: "炎",
    color: "#b95b63",
    imageUrl: "assets/characters-ai/xiao-yan.webp",
    imagePosition: "center 14%",
    profile: { action: 10, insight: 5, empathy: 7, order: 5, adapt: 7, aura: 8 },
    tags: ["逆袭升级", "热血担当", "承诺感"],
    copy: "你身上有很强的逆风翻盘气质。被质疑不会让你停下，反而会成为你升级、证明、守护的燃料。",
    intro: "萧炎从低谷开局，却始终保留着不服输的火。他的故事是典型的热血逆袭：失去、被看轻、重新修炼、一路打穿质疑，也一路守住承诺和少年心气。",
    hook: "适合喜欢“废柴逆袭、热血升级、异火体系、少年燃感”的读者。",
  },
  {
    id: "ning-que",
    name: "宁缺",
    work: "《将夜》",
    gender: "男角色",
    mark: "夜",
    color: "#2f5369",
    imageUrl: "assets/characters-ai/ning-que.webp",
    imagePosition: "center 15%",
    profile: { action: 8, insight: 7, empathy: 6, order: 5, adapt: 8, aura: 7 },
    tags: ["荒野生存", "锋利现实", "守护执念"],
    copy: "你很清楚世界并不总是讲道理，所以你会把柔软藏得很深，把锋利留给必须出手的时候。",
    intro: "宁缺身上有很强的现实感和生存感。他不是完美无瑕的主角，却极有生命力，能在命运和荒野里咬牙前行，也能为了重要的人把自己磨成锋利的刀。",
    hook: "适合喜欢“命运感、书院群像、现实锋芒、相互守护”的读者。",
  },
  {
    id: "audrey",
    name: "奥黛丽·霍尔",
    work: "《诡秘之主》",
    gender: "女角色",
    mark: "观",
    color: "#6e638f",
    imageUrl: "assets/characters-ai/audrey.webp",
    imagePosition: "center 14%",
    profile: { action: 5, insight: 9, empathy: 10, order: 7, adapt: 5, aura: 7 },
    tags: ["社交读心", "情绪雷达", "优雅成长"],
    copy: "你擅长读懂情绪和关系里的暗流。温和不是你的弱点，而是你理解世界、影响世界的方式。",
    intro: "奥黛丽·霍尔从明亮优雅的贵族少女起步，在塔罗会和非凡世界中不断成长。她最动人的地方，是能读懂他人的细微变化，也能在迷雾里慢慢看清自己。",
    hook: "适合喜欢“女性成长、读心名场面、优雅社交、神秘组织”的读者。",
  },
  {
    id: "huai-qing",
    name: "怀庆",
    work: "《大奉打更人》",
    gender: "女角色",
    mark: "庆",
    color: "#8d6a42",
    imageUrl: "assets/characters-ai/huai-qing.webp",
    imagePosition: "center 13%",
    profile: { action: 6, insight: 9, empathy: 5, order: 10, adapt: 5, aura: 9 },
    tags: ["理性权谋", "清醒掌局", "公主压场"],
    copy: "你习惯站在更高处看问题，判断清醒，表达克制。越是复杂的局，你越能分清轻重缓急。",
    intro: "怀庆是清醒、克制、极有政治判断力的角色。她不靠情绪推动自己，而是靠格局、谋断和定力在权力场中站稳，冷静感本身就是她的压迫力。",
    hook: "适合喜欢“古代权谋、强女性、理性判断、朝堂博弈”的读者。",
  },
  {
    id: "tang-rou",
    name: "唐柔",
    work: "《全职高手》",
    gender: "女角色",
    mark: "柔",
    color: "#9a4f5a",
    imageUrl: "assets/characters-ai/tang-rou.webp",
    imagePosition: "center 14%",
    profile: { action: 10, insight: 5, empathy: 5, order: 6, adapt: 7, aura: 8 },
    tags: ["硬核进攻", "越战越勇", "天赋觉醒"],
    copy: "你遇强则强，不太愿意被别人定义上限。真正吸引你的不是轻松赢，而是把难题打穿。",
    intro: "唐柔的角色气质很直接：敢打、敢输、敢继续。她不是靠退让获得成长，而是在不断挑战里把天赋兑现出来，越难的局越能激起她的胜负欲。",
    hook: "适合喜欢“竞技成长、正面硬刚、挑战精神、爽快战斗”的读者。",
  },
  {
    id: "xun-er",
    name: "萧薰儿",
    work: "《斗破苍穹》",
    gender: "女角色",
    mark: "薰",
    color: "#8aa08b",
    imageUrl: "assets/characters-ai/xun-er.webp",
    imagePosition: "center 14%",
    profile: { action: 6, insight: 6, empathy: 9, order: 7, adapt: 5, aura: 8 },
    tags: ["稳定守护", "天赋底牌", "温柔锋芒"],
    copy: "你给人的第一感受是稳定可靠，但这不代表你没有锋芒。你会把真正的实力留给最重要的时刻。",
    intro: "萧薰儿有温柔、坚定和隐藏实力并存的气质。她不是喧哗型角色，却能在漫长成长线里给人稳定感，也能在关键时刻展现属于自己的锋芒。",
    hook: "适合喜欢“温柔守护、天赋底牌、玄幻成长、长线陪伴”的读者。",
  },
  {
    id: "medusa",
    name: "美杜莎女王",
    work: "《斗破苍穹》",
    gender: "女角色",
    mark: "蛇",
    color: "#7a4358",
    imageUrl: "assets/characters-ai/medusa.webp",
    imagePosition: "center 13%",
    profile: { action: 8, insight: 6, empathy: 3, order: 8, adapt: 6, aura: 10 },
    tags: ["女王压迫", "果断决策", "危险魅力"],
    copy: "你自带强烈边界感和压场能力。你不轻易示弱，也不需要讨好，选择权通常在你手里。",
    intro: "美杜莎女王的关键词是强势、危险、决断和高压魅力。她天然带有统治者的压迫感，不靠解释获取存在感，出场本身就能改变局势的温度。",
    hook: "适合喜欢“女王人设、强强拉扯、玄幻大场面、高压场角色”的读者。",
  },
  {
    id: "sang-sang",
    name: "桑桑",
    work: "《将夜》",
    gender: "女角色",
    mark: "桑",
    color: "#6f7f8c",
    imageUrl: "assets/characters-ai/sang-sang.webp",
    imagePosition: "center 13%",
    profile: { action: 5, insight: 6, empathy: 9, order: 8, adapt: 4, aura: 7 },
    tags: ["日常守护", "命运感", "沉默坚韧"],
    copy: "你不一定最张扬，却常常是别人故事里的定心石。你的力量藏在日复一日的陪伴和坚持里。",
    intro: "桑桑看起来安静、日常，却和整部故事的命运感紧紧相连。她的力量不总是外放的，却藏在陪伴、秩序和不可替代的羁绊里。",
    hook: "适合喜欢“宿命羁绊、日常陪伴、玄幻史诗、安静但重要的角色”的读者。",
  },
];

const questions = [
  {
    chapter: "第一章",
    mood: "开局选择",
    title: "你醒在一本陌生小说的第一章，窗外已经有人敲门。你会先做什么？",
    options: [
      { text: "观察房间、身份线索和危险等级", scores: { insight: 3, order: 2 } },
      { text: "开门套话，先把可用信息骗出来", scores: { adapt: 3, insight: 2 } },
      { text: "直接出门找主线，早行动早掌握主动权", scores: { action: 3, aura: 2 } },
      { text: "先确认身边有没有可以信任的人", scores: { empathy: 3, order: 1 } },
    ],
  },
  {
    chapter: "第二章",
    mood: "危机反应",
    title: "反派把锅扣到你头上，围观群众已经开始起哄。你的第一反应是？",
    options: [
      { text: "抓住逻辑漏洞，当场反推真相", scores: { insight: 3, aura: 2 } },
      { text: "先稳住现场，再找证据一锤定音", scores: { order: 3, insight: 2 } },
      { text: "顺势演一段，让反派自己露破绽", scores: { adapt: 3, action: 2 } },
      { text: "保护被牵连的人，别让局面继续扩大", scores: { empathy: 3, action: 1 } },
    ],
  },
  {
    chapter: "第三章",
    mood: "升级路线",
    title: "你拿到一个成长型金手指，但前期很弱。你会怎么养它？",
    options: [
      { text: "低调试错，先摸清副作用和边界", scores: { insight: 2, order: 3 } },
      { text: "找高压实战，边打边升级", scores: { action: 3, adapt: 2 } },
      { text: "和队友共享部分能力，换取长期合作", scores: { empathy: 3, order: 1 } },
      { text: "用它制造一次大场面，迅速打出名声", scores: { aura: 3, action: 2 } },
    ],
  },
  {
    chapter: "第四章",
    mood: "队友关系",
    title: "主角团出现分歧，所有人都等你表态。你更可能站在哪边？",
    options: [
      { text: "站事实和胜率，先别被情绪带跑", scores: { insight: 3, order: 2 } },
      { text: "站弱势那方，至少先保证没人掉队", scores: { empathy: 3, action: 1 } },
      { text: "把两边都拉进一个新方案", scores: { adapt: 3, empathy: 2 } },
      { text: "直接定方向，拖下去只会错过窗口", scores: { aura: 3, action: 2 } },
    ],
  },
  {
    chapter: "第五章",
    mood: "隐藏身份",
    title: "你发现自己有一个不能公开的身份。你会如何处理？",
    options: [
      { text: "建立多层马甲，身份之间互相隔离", scores: { insight: 3, order: 3 } },
      { text: "只告诉最信任的人，换来真实支持", scores: { empathy: 3, order: 1 } },
      { text: "把秘密包装成传闻，让敌人判断失误", scores: { adapt: 3, aura: 2 } },
      { text: "尽快变强，强到秘密暴露也无所谓", scores: { action: 3, aura: 2 } },
    ],
  },
  {
    chapter: "第六章",
    mood: "资源分配",
    title: "你手上只有一份稀缺资源，所有人都想要。你会怎么分？",
    options: [
      { text: "给最能改变战局的人", scores: { insight: 3, order: 2 } },
      { text: "给最需要救命的人", scores: { empathy: 3, action: 1 } },
      { text: "拆成几份，换情报、人情和后续资源", scores: { adapt: 3, insight: 2 } },
      { text: "自己留着，先保证核心战力在线", scores: { order: 2, aura: 2 } },
    ],
  },
  {
    chapter: "第七章",
    mood: "名场面",
    title: "如果要给你安排一个出圈名场面，你希望是哪种？",
    options: [
      { text: "平静说出真相，全场忽然沉默", scores: { insight: 3, aura: 2 } },
      { text: "逆风翻盘，一招把质疑打回去", scores: { action: 3, aura: 3 } },
      { text: "在所有人崩溃前，把局面稳住", scores: { order: 3, empathy: 2 } },
      { text: "用一个离谱办法解决死局", scores: { adapt: 3, action: 2 } },
    ],
  },
  {
    chapter: "第八章",
    mood: "情感表达",
    title: "面对重要的人，你更常用哪种方式表达在意？",
    options: [
      { text: "嘴上不多说，但会把退路安排好", scores: { order: 3, empathy: 2 } },
      { text: "直接陪对方冲，把危险一起扛", scores: { action: 3, empathy: 2 } },
      { text: "先理解对方真正害怕什么", scores: { empathy: 3, insight: 2 } },
      { text: "保持距离，但关键时刻一定出现", scores: { aura: 2, order: 2 } },
    ],
  },
  {
    chapter: "第九章",
    mood: "对手压迫",
    title: "强敌提前登场，你还没准备好。你会怎么处理？",
    options: [
      { text: "认清差距，先撤一步换发育时间", scores: { insight: 2, order: 3 } },
      { text: "拖住对方，给队友争取机会", scores: { action: 3, empathy: 2 } },
      { text: "用误导和话术逼对方露底牌", scores: { adapt: 3, insight: 2 } },
      { text: "正面顶住，气势不能先输", scores: { aura: 3, action: 2 } },
    ],
  },
  {
    chapter: "第十章",
    mood: "日常侧写",
    title: "没有主线任务的一天，你会把时间花在哪里？",
    options: [
      { text: "整理情报、复盘得失、更新计划", scores: { order: 3, insight: 2 } },
      { text: "训练手感，直到身体形成记忆", scores: { action: 3, order: 1 } },
      { text: "和朋友吃饭聊天，补一点人间烟火", scores: { empathy: 3, adapt: 1 } },
      { text: "去没人去的地方看看，说不定有支线", scores: { adapt: 3, insight: 1 } },
    ],
  },
  {
    chapter: "第十一章",
    mood: "最终抉择",
    title: "结局前，你必须牺牲一样东西换胜利。你最可能牺牲什么？",
    options: [
      { text: "名声。只要事情能成，被误解也可以", scores: { insight: 2, empathy: 2 } },
      { text: "安全感。该冒险的时候就要压上去", scores: { action: 3, aura: 2 } },
      { text: "自由度。为了大局可以接受规则束缚", scores: { order: 3, empathy: 1 } },
      { text: "确定性。赌一条别人想不到的路", scores: { adapt: 3, aura: 1 } },
    ],
  },
  {
    chapter: "终章",
    mood: "角色底色",
    title: "如果别人用一句话概括你在故事里的作用，你希望是？",
    options: [
      { text: "那个总能看见真相的人", scores: { insight: 4 } },
      { text: "那个把不可能打成可能的人", scores: { action: 3, aura: 2 } },
      { text: "那个让大家还能继续走下去的人", scores: { empathy: 4 } },
      { text: "那个把烂摊子收拾干净的人", scores: { order: 3, adapt: 1 } },
    ],
  },
];

const els = {
  quizView: document.querySelector("#quizView"),
  resultView: document.querySelector("#resultView"),
  progressText: document.querySelector("#progressText"),
  progressFill: document.querySelector("#progressFill"),
  fatePreview: document.querySelector("#fatePreview"),
  questionChapter: document.querySelector("#questionChapter"),
  questionMood: document.querySelector("#questionMood"),
  questionTitle: document.querySelector("#questionTitle"),
  optionGrid: document.querySelector("#optionGrid"),
  backButton: document.querySelector("#backButton"),
  restartButton: document.querySelector("#restartButton"),
  characterCover: document.querySelector("#characterCover"),
  characterCoverArt: document.querySelector("#characterCoverArt"),
  characterMark: document.querySelector("#characterMark"),
  characterWork: document.querySelector("#characterWork"),
  characterName: document.querySelector("#characterName"),
  resultName: document.querySelector("#resultName"),
  resultWork: document.querySelector("#resultWork"),
  scoreValue: document.querySelector("#scoreValue"),
  scoreFill: document.querySelector("#scoreFill"),
  characterReason: document.querySelector("#characterReason"),
  tagRow: document.querySelector("#tagRow"),
  storyGrid: document.querySelector("#storyGrid"),
  profileIllustration: document.querySelector("#profileIllustration"),
  profileName: document.querySelector("#profileName"),
  profileWork: document.querySelector("#profileWork"),
  profileIntro: document.querySelector("#profileIntro"),
  profileHook: document.querySelector("#profileHook"),
  againButton: document.querySelector("#againButton"),
  posterButton: document.querySelector("#posterButton"),
  posterSection: document.querySelector("#posterSection"),
  posterCanvas: document.querySelector("#posterCanvas"),
  downloadPoster: document.querySelector("#downloadPoster"),
};

let currentIndex = 0;
let answers = [];
let latestResult = null;

const maxScores = questions.reduce((totals, question) => {
  dimensions.forEach(({ key }) => {
    const maxForQuestion = Math.max(...question.options.map((option) => option.scores[key] || 0));
    totals[key] += maxForQuestion;
  });
  return totals;
}, Object.fromEntries(dimensions.map(({ key }) => [key, 0])));

function renderQuestion() {
  const question = questions[currentIndex];
  els.progressText.textContent = `${currentIndex + 1} / ${questions.length}`;
  els.progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  els.questionChapter.textContent = question.chapter;
  els.questionMood.textContent = question.mood;
  els.questionTitle.textContent = question.title;
  els.backButton.disabled = currentIndex === 0;

  els.optionGrid.innerHTML = question.options
    .map((option, index) => {
      const active = answers[currentIndex] === index ? " active" : "";
      return `
        <button class="option-button${active}" type="button" data-index="${index}">
          <span>${String.fromCharCode(65 + index)}</span>
          <strong>${option.text}</strong>
        </button>
      `;
    })
    .join("");

  els.optionGrid.querySelectorAll(".option-button").forEach((button) => {
    button.addEventListener("click", () => chooseOption(Number(button.dataset.index)));
  });

  renderFatePreview();
}

function chooseOption(optionIndex) {
  answers[currentIndex] = optionIndex;
  if (currentIndex === questions.length - 1) {
    window.setTimeout(showResult, 220);
    return;
  }
  currentIndex += 1;
  window.setTimeout(renderQuestion, 160);
}

function getCurrentScores() {
  return answers.reduce((scores, optionIndex, questionIndex) => {
    if (optionIndex === undefined) return scores;
    const option = questions[questionIndex].options[optionIndex];
    dimensions.forEach(({ key }) => {
      scores[key] += option.scores[key] || 0;
    });
    return scores;
  }, Object.fromEntries(dimensions.map(({ key }) => [key, 0])));
}

function normalizeScores(scores) {
  return Object.fromEntries(
    dimensions.map(({ key }) => {
      const max = maxScores[key] || 1;
      return [key, Math.round((scores[key] / max) * 10)];
    }),
  );
}

function renderFatePreview() {
  const answered = answers.filter((answer) => answer !== undefined).length;
  const currentLine = fateLines[Math.min(answered, fateLines.length - 1)];
  const nextLine = fateLines[Math.min(answered + 1, fateLines.length - 1)];
  els.fatePreview.innerHTML = `
    <article class="fate-card">
      <span>本章弹幕</span>
      <p>${currentLine}</p>
    </article>
    <article class="fate-card muted">
      <span>下一幕预告</span>
      <p>${nextLine}</p>
    </article>
  `;
}

function getResult() {
  const scores = getCurrentScores();
  const profile = normalizeScores(scores);
  const scored = characters
    .map((character) => {
      const distance = dimensions.reduce((total, { key }) => {
        return total + (profile[key] - character.profile[key]) ** 2;
      }, 0);
      const similarity = 1 - Math.sqrt(distance) / Math.sqrt(dimensions.length * 100);
      return { character, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity);

  const score = Math.max(82, Math.min(99, Math.round(78 + scored[0].similarity * 22)));
  return {
    character: scored[0].character,
    score,
    profile,
  };
}

function showResult() {
  latestResult = getResult();
  els.quizView.hidden = true;
  els.resultView.hidden = false;
  els.posterSection.hidden = true;
  renderResult(latestResult);
  scrollToTop();
}

function renderResult(result) {
  const { character, profile, score } = result;
  const coverSrc = character.imageUrl || createFanArtDataUri(character);
  els.characterCover.style.setProperty("--cover", character.color);
  els.characterCover.style.setProperty("--cover-art-position", character.imagePosition || "center center");
  if (els.characterCoverArt) {
    els.characterCoverArt.src = coverSrc;
    els.characterCoverArt.alt = `${character.name}角色插图`;
  }
  els.characterMark.textContent = "";
  els.characterWork.textContent = character.work;
  els.characterName.textContent = character.name;
  els.resultName.textContent = character.name;
  els.resultWork.textContent = `${character.work} · ${character.gender}`;
  els.scoreValue.textContent = `${score}%`;
  els.scoreFill.style.width = `${score}%`;
  els.characterReason.textContent = character.copy;
  els.tagRow.innerHTML = character.tags.map((tag) => `<span>${tag}</span>`).join("");
  if (els.profileIllustration) {
    els.profileIllustration.style.setProperty("--cover", character.color);
    els.profileIllustration.innerHTML = renderProfileIllustration(character);
  }
  els.profileName.textContent = character.name;
  els.profileWork.textContent = `${character.work} · ${character.gender}`;
  els.profileIntro.textContent = character.intro;
  els.profileHook.textContent = character.hook;
  els.storyGrid.innerHTML = getStoryCards(character, profile)
    .map(
      (item) => `
        <div class="story-item">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
          <p>${item.copy}</p>
        </div>
      `,
    )
    .join("");
}

function getStoryCards(character, profile) {
  const topKey = Object.entries(profile).sort((a, b) => b[1] - a[1])[0][0];
  const openingMap = {
    action: ["开局姿势", "先冲再说", "剧情刚抛球，你已经准备接招。"],
    insight: ["开局姿势", "先看剧本", "你会先摸清规则，再决定站位。"],
    empathy: ["开局姿势", "先找同伴", "你更在意谁能一起走到下一章。"],
    order: ["开局姿势", "先留退路", "你不急着出风头，先把底牌放稳。"],
    adapt: ["开局姿势", "先整活", "常规路线走不通，你会换条路。"],
    aura: ["开局姿势", "先压住场", "一出场就要让局面记住你。"],
  };
  const sceneMap = {
    action: ["上榜名场面", "逆风开打", "越难的战局，越容易触发你的高光。"],
    insight: ["上榜名场面", "一眼破局", "别人还在吵，你已经看到关键线索。"],
    empathy: ["上榜名场面", "把人拉住", "故事快散场时，你会让大家继续往前走。"],
    order: ["上榜名场面", "稳到翻盘", "你会把每一步都垫实，然后等机会成熟。"],
    adapt: ["上榜名场面", "离谱解法", "你总能拿出让旁白愣一下的办法。"],
    aura: ["上榜名场面", "全场静音", "你的关键发言常常能让局面突然降噪。"],
  };
  const readerMap = {
    action: "热血升级党",
    insight: "伏笔考据党",
    empathy: "羁绊守护党",
    order: "稳健发育党",
    adapt: "反套路整活党",
    aura: "名场面收藏党",
  };
  return [
    { label: openingMap[topKey][0], value: openingMap[topKey][1], copy: openingMap[topKey][2] },
    { label: sceneMap[topKey][0], value: sceneMap[topKey][1], copy: sceneMap[topKey][2] },
    { label: "入坑口味", value: readerMap[topKey], copy: `和${character.name}同频的人，通常会被这种阅读爽点击中。` },
    { label: "角色关键词", value: character.tags[0], copy: character.tags.slice(1).join(" / ") },
  ];
}

function renderProfileIllustration(character) {
  const src = character.imageUrl || createFanArtDataUri(character);
  const position = character.imagePosition || "center center";
  return `
    <img class="fan-art" src="${src}" alt="${character.name}角色插图" loading="lazy" style="object-position: ${position}" />
  `;
}

function createFanArtDataUri(character) {
  const isFemale = character.gender === "女角色";
  const hairShape = isFemale
    ? "M188 160 C176 92 224 54 300 56 C382 58 432 100 418 174 L396 344 C378 288 356 252 336 226 L312 284 L288 226 C266 252 246 288 224 344 Z"
    : "M204 148 L250 88 L340 108 L386 154 L360 256 L316 204 L286 264 L250 204 L214 256 Z";
  const bodyShape = isFemale
    ? "M210 430 L252 286 L348 286 L392 430 Z"
    : "M202 430 L230 278 L370 278 L398 430 Z";
  const extra = isFemale
    ? "<path d='M225 326 C260 360 340 360 375 326' fill='none' stroke='%23fffdf7' stroke-width='10' stroke-linecap='round' opacity='.72'/>"
    : "<path d='M226 292 L300 344 L374 292 L354 430 L246 430 Z' fill='%2317201a' opacity='.86'/>";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 760">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${character.color}"/>
          <stop offset="1" stop-color="#17201a"/>
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="42%" r="50%">
          <stop offset="0" stop-color="#fffdf7" stop-opacity=".34"/>
          <stop offset="1" stop-color="#fffdf7" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="760" fill="url(#bg)"/>
      <g opacity=".16">
        <rect x="0" width="42" height="760" fill="#fffdf7"/>
        <rect x="84" width="42" height="760" fill="#fffdf7"/>
        <rect x="168" width="42" height="760" fill="#fffdf7"/>
        <rect x="252" width="42" height="760" fill="#fffdf7"/>
        <rect x="336" width="42" height="760" fill="#fffdf7"/>
        <rect x="420" width="42" height="760" fill="#fffdf7"/>
        <rect x="504" width="42" height="760" fill="#fffdf7"/>
      </g>
      <circle cx="300" cy="330" r="248" fill="url(#halo)"/>
      <circle cx="452" cy="156" r="64" fill="none" stroke="#fffdf7" stroke-width="4" opacity=".55"/>
      <path d="${bodyShape}" fill="#fffdf7"/>
      ${extra}
      <ellipse cx="300" cy="226" rx="72" ry="82" fill="#f2d3b8"/>
      <path d="${hairShape}" fill="#111d17"/>
      <rect x="72" y="520" width="118" height="150" fill="#fffdf7" opacity=".92"/>
      <text x="92" y="642" fill="${character.color}" font-size="118" font-weight="900" font-family="Arial, sans-serif">${character.mark}</text>
      <text x="528" y="656" fill="#fffdf7" font-size="34" font-weight="900" font-family="Arial, sans-serif" text-anchor="end">${character.name}</text>
      <text x="528" y="704" fill="#fffdf7" font-size="24" font-weight="700" font-family="Arial, sans-serif" text-anchor="end" opacity=".82">${character.work}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function resetQuiz() {
  currentIndex = 0;
  answers = [];
  latestResult = null;
  els.quizView.hidden = false;
  els.resultView.hidden = true;
  els.posterSection.hidden = true;
  renderQuestion();
  scrollToTop();
}

function scrollToTop() {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

function drawPoster() {
  if (!latestResult) return;

  const { character, profile, score } = latestResult;
  const canvas = els.posterCanvas;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#f7f1e5";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = character.color;
  ctx.fillRect(0, 0, w, 420);
  ctx.fillStyle = "rgba(255, 253, 247, 0.08)";
  for (let x = -120; x < w; x += 120) {
    ctx.fillRect(x, 0, 52, h);
  }

  ctx.fillStyle = "rgba(255, 253, 247, 0.92)";
  ctx.fillRect(86, 112, 728, 456);
  ctx.fillStyle = character.color;
  ctx.fillRect(118, 144, 220, 360);
  ctx.fillStyle = "#fffdf7";
  ctx.font = "900 168px Arial, sans-serif";
  ctx.fillText(character.mark, 154, 398);

  ctx.fillStyle = "#17201a";
  ctx.font = "900 42px Arial, sans-serif";
  ctx.fillText("我的起点角色人格", 384, 242);
  ctx.font = "900 70px Arial, sans-serif";
  wrapCanvasText(ctx, character.name, 384, 334, 360, 76);
  ctx.font = "700 32px Arial, sans-serif";
  ctx.fillStyle = "#68726d";
  ctx.fillText(`${character.work} · 相似度 ${score}%`, 384, 490);

  ctx.fillStyle = "#17201a";
  ctx.font = "900 44px Arial, sans-serif";
  ctx.fillText("上榜理由", 86, 668);
  ctx.font = "400 30px Arial, sans-serif";
  ctx.fillStyle = "#3c4640";
  wrapCanvasText(ctx, character.copy, 86, 724, 728, 44);

  ctx.fillStyle = "#17201a";
  ctx.font = "900 34px Arial, sans-serif";
  ctx.fillText("上榜名片", 86, 880);
  drawPosterStory(ctx, character, profile, 86, 928);

  ctx.fillStyle = character.color;
  ctx.fillRect(86, 1130, 728, 2);
  ctx.fillStyle = "#17201a";
  ctx.font = "900 28px Arial, sans-serif";
  ctx.fillText("起点角色人格测试", 86, 1172);
  ctx.font = "400 24px Arial, sans-serif";
  ctx.fillText("12题测出你的小说人物灵魂", 346, 1172);

  els.posterSection.hidden = false;
  els.downloadPoster.href = canvas.toDataURL("image/png");
  els.posterSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function drawPosterStory(ctx, character, profile, x, y) {
  getStoryCards(character, profile).slice(0, 3).forEach((item, index) => {
    const rowY = y + index * 58;
    ctx.fillStyle = index === 0 ? character.color : "#b95b63";
    ctx.fillRect(x, rowY - 26, 8, 34);
    ctx.fillStyle = "#68726d";
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText(item.label, x + 24, rowY - 2);
    ctx.fillStyle = "#17201a";
    ctx.font = "900 26px Arial, sans-serif";
    ctx.fillText(item.value, x + 170, rowY - 2);
  });
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const chars = Array.from(text);
  let line = "";
  let cursorY = y;
  chars.forEach((char, index) => {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = char;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
    if (index === chars.length - 1) ctx.fillText(line, x, cursorY);
  });
}

els.backButton.addEventListener("click", () => {
  if (currentIndex === 0) return;
  currentIndex -= 1;
  renderQuestion();
});

els.restartButton.addEventListener("click", resetQuiz);
els.againButton.addEventListener("click", resetQuiz);
els.posterButton.addEventListener("click", drawPoster);

renderQuestion();
