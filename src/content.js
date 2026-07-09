import stockVisual from "../assets/humanities-ai-bridge.svg";
import adVisual from "../assets/content-workflow.svg";
import agentVisual from "../assets/knowledge-qa.svg";

// 这里是全站文案配置区。
// 以后想改页面文字，优先改这个文件，不需要去改 App.jsx 里的交互代码。

export const siteContent = {
  header: {
    logoPrefix: "G",
    logoText: "Jing",
    logoSuffix: ".",
    homeAriaLabel: "回到首页",
    navAriaLabel: "主导航",
    nav: [
      { label: "关于", href: "#about" },
      { label: "项目地图", href: "#map" },
      { label: "项目", href: "#projects" },
      { label: "联系我", href: "#contact" }
    ],
    badges: ["AI PM", "中"],
    email: "your.email@example.com"
  },

  hero: {
    particleTitleAriaLabel: "AI PRODUCT MANAGER 粒子标题",
    systemTags: [
      "SYSTEM · ONLINE",
      "EVAL LOOP · STABLE",
      "SIGNAL · 04:27",
      "BADCASE TRACE · LOW"
    ],
    introEyebrow: "Quiet digital workspace",
    introName: "高静 · AI 产品经理",
    leftLabel: "Currently",
    leftText: "4 年数据驱动运营 · AI 产品转型",
    rightLabel: "Focus",
    rightText: "Eval · Badcase · Workflow · Agent",
    actions: [
      { label: "View projects", href: "#projects" },
      { label: "Contact me", href: "#contact" }
    ]
  },

  about: {
    cardName: "高静",
    cardMeta: "/ ID · 2026",
    cardRole: "AI 产品经理候选人",
    cardTags: ["evaluator", "operator", "builder", "AI PM"],
    kicker: "/ 关于我",
    title: "产品、数据、评测，都是把复杂问题变清楚的方式。",
    paragraphs: [
      "我有 4 年广告投放与产品运营经验，管理过 2000 万+ 广告预算，长期围绕 CTR、CVR、ROI、用户反馈和转化漏斗做判断。转向 AI 产品后，我把 A/B 测试、归因分析和素材复盘方法迁移到 AI 产品评测，独立完成 AI 辅助投资决策系统与 AI 广告素材诊断工具。",
      "我更关注 AI 产品里的可验证部分：任务是否拆清楚，模型节点是否知道边界，评测集是否能复测，badcase 是否能归因到具体链路。"
    ]
  },

  map: {
    canvasAriaLabel: "可交互 3D 项目地图",
    kicker: "/ 项目地图",
    title: "项目地图",
    description: "点击查看已做项目",
    enterButton: "进入项目 ↗",
    futureProject: {
      id: "winter",
      index: "04",
      title: "下一段 AI 产品现场",
      subtitle: "把新的业务问题，继续做成可评估、可迭代的 AI 产品作品。",
      city: "Next"
    },
    seasons: {
      stock: "01",
      ad: "02",
      agent: "03",
      winter: "04"
    }
  },

  gallery: {
    title: "研究与项目",
    imageAltSuffix: "项目展示图"
  },

  strengths: {
    kicker: "/ 个人优势",
    title: "我能交付的不是一句“会 AI”，而是一套产品判断方法。"
  },

  contact: {
    kicker: "/ 联系",
    title: "聊聊吧。",
    description: "我正在寻找 AI 产品经理机会，尤其关注 AI 应用产品、评测体系、Agent 工作流和数据驱动业务场景。",
    portraitLabel: "AI PM",
    portraitName: "高静",
    links: [
      { type: "email", label: "862127511@qq.com", value: "your.email@example.com" },
      { type: "text", label: "微信：z2573910" },
      { type: "text", label: "不限 · 可远程沟通" }
    ]
  }
};

export const metrics = [
  { value: "4y", label: "数据驱动产品运营" },
  { value: "2000w+", label: "广告投放管理" },
  { value: "50", label: "历史交易日评测样本" },
  { value: "2+", label: "AI 产品项目闭环" }
];

export const projects = [
  {
    id: "stock",
    index: "01",
    season: "01",
    title: "AI 面试训练 Agent",
    subtitle: "JD 解析、面试官、评估官、教练、Judge 复核",
    type: "Agent Team · MECE Rubric",
    image: agentVisual,
    city: "Interview",
    details: [
      "面向转行求职者面试后缺少结构化反馈的痛点。",
      "按内容匹配度、结构清晰度、证据支撑度、表达可信度四维评分。",
      "Judge 检查评估结论与教练建议是否一致，形成可迭代训练闭环。"
    ]
    
  },
  {
    id: "ad",
    index: "02",
    season: "02",
    title: "AI 广告素材诊断工具",
    subtitle: "四维 Prompt Chain + LLM-as-a-Judge 复核",
    type: "Prompt Chain · Judge · Growth",
    image: adVisual,
    city: "Ads AI",
    details: [
      "平台合规、跑量潜力、创意质量、风险疲劳四维拆解素材质量。",
      "通用广告法、平台规则、行业规则三层规则库，按标签动态加载。",
      "用历史素材评测集定位精致素材偏好、跨平台规则混淆、低质高分漏检。"
    ]
  },
  {
    id: "agent",
    index: "03",
    season: "春",
    title: "AI 辅助投资决策系统",
    subtitle: "规则引擎 + LLM 情绪分析 + 数据置信度分级",
    type: "AI Product · Eval · Workflow",
    image: stockVisual,
    city: "Stock AI",
    details: [
      "四层混合评估链路：大盘评分、板块确认、个股技术面、LLM 情绪修正。",
      "live/cache/stale/empty/error 五级数据质量体系，把数据置信度引入建议强度。",
      "50 条历史交易日评测样本，覆盖强势、震荡、弱势、极弱四类市场状态。"
    ]
  }
];

export const strengths = [
  ["AI 产品链路设计", "定义每个 AI 节点的输入、输出、评价标准和失败模式。"],
  ["评测体系搭建", "能从样本、口径、baseline、复测方法构建可解释的 eval。"],
  ["Badcase 归因", "追踪问题发生在哪个链路节点，而不是泛泛优化 prompt。"],
  ["数据归因思维", "从投放漏斗迁移到 AI 产品的输入、检索、生成、输出 tracing。"],
  ["业务场景抽象", "把广告、交易、面试、客服等真实流程抽象成 AI 产品方案。"],
  ["边界与风险意识", "不夸大上线结果，不把个人项目包装成不可证明的商业成果。"]
];
