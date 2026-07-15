import interviewVisual from "../assets/project-ai-interview-training.png";
import evalLabVisual from "../assets/project-llm-eval-lab.png";
import echoMindVisual from "../assets/project-echomind.png";
import bearVisual from "../assets/project-bear-agent.png";

// 全站文案配置区。
// 以后修改个人信息、经历、项目、联系方式，优先改这个文件。

export const siteContent = {
  header: {
    logoPrefix: "G",
    logoText: "ao Jing",
    logoSuffix: ".",
    homeAriaLabel: "回到首页",
    navAriaLabel: "主导航",
    nav: [
      { label: "关于", href: "#about" },
      { label: "项目地图", href: "#map" },
      { label: "项目", href: "#map" },
      { label: "联系我", href: "#contact" }
    ],
    badges: ["AI PM", "南京"],
    email: "862127511@qq.com"
  },

  hero: {
    particleTitleAriaLabel: "AI PRODUCT MANAGER 粒子标题",
    systemTags: [
      "AI PRODUCT · SEEKING",
      "EVAL LOOP · READY",
      "PROMPT / RAG / AGENT",
      "BADCASE TRACE · ACTIVE"
    ],
    introEyebrow: "Hello! I'm Gao Jing",
    introName: "高静 · AI 产品经理候选人",
    leftLabel: "Background",
    leftText: "4 年数据驱动运营 · 2000万+ 广告投放管理",
    rightLabel: "Focus",
    rightText: "AI 产品链路 · 评测体系 · Badcase 归因 · Agent 工作流",
    actions: [
      { label: "View projects", href: "#map" },
      { label: "Contact me", href: "#contact" }
    ]
  },

  about: {
    cardName: "高静",
    cardMeta: "/ AI PM · 2026",
    cardRole: "AI 产品经理｜数据驱动运营转型",
    cardTags: ["AI Product", "Evaluation", "Prompt", "Growth"],
    kicker: "/ 关于我",
    title: "用数据与评测，把复杂业务做成 AI 产品。",
    paragraphs: [
      "我有 4 年数据驱动运营经验，曾管理 2000 万+ 广告投放预算，长期围绕 CTR、CVR、ROI、用户反馈和转化漏斗做判断。转向 AI 产品后，我把 A/B 测试、归因分析、指标体系和素材复盘方法迁移到 AI 产品评测与迭代中。",
      "我独立完成「AI 辅助投资决策系统」与「AI 广告素材诊断工具」两个 AI 产品项目，覆盖需求定义、AI 技术方案选型、产品链路设计、评测体系搭建与 badcase 驱动迭代。我的优势不是单纯会用工具，而是能定义每个 AI 节点的输入、输出、评价标准和失败模式。"
    ]
  },

  map: {
    canvasAriaLabel: "可交互项目地图",
    kicker: "/ 项目地图",
    title: "AI 产品项目地图",
    description: "点击查看我的 AI 产品项目、评测链路与业务迁移能力。",
    enterButton: "进入项目 ↗",
    futureProject: {
      id: "winter",
      index: "04",
      title: "下一段 AI 产品现场",
      subtitle: "继续把真实业务问题，做成可验证、可迭代、边界清晰的 AI 产品作品。",
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
    title: "AI 产品项目",
    imageAltSuffix: "项目展示图"
  },

  strengths: {
    kicker: "/ 经历与能力",
    title: "业务、数据与评测，是我的产品底座。"
  },

  contact: {
    kicker: "/ 联系",
    title: "聊聊 AI 产品经理机会。",
    description: "我正在寻找 AI 产品经理岗位，重点关注 AI 应用产品、评测体系、Agent 工作流、Prompt Chain、RAG 与数据驱动业务场景。",
    portraitLabel: "AI PM",
    links: [
      { type: "email", label: "862127511@qq.com", value: "862127511@qq.com" },
      { type: "text", label: "微信：z2573910" },
      { type: "text", label: "南京 · 28岁 · 可远程沟通" },
      { type: "text", label: "求职意向：AI 产品经理｜期望薪资：10-15K" }
    ]
  }
};

export const metrics = [
  { value: "4y", label: "数据驱动运营经验" },
  { value: "2000w+", label: "广告投放预算管理" },
  { value: "50+", label: "AI 项目评测样本" },
  { value: "2+", label: "AI 产品项目闭环" }
];

export const projects = [
  {
    id: "interview",
    index: "01",
    season: "01",
    title: "AI 面试训练 Agent",
    subtitle: "6 Agent 协作 · 四维 MECE Rubric · 动态追问",
    type: "Agent Team · MECE Rubric · Interview Coach",
    image: interviewVisual,
    city: "Interview AI",
    details: [
      "6 Agent 协作系统——JD 解析 → 多轮追问面试 → 四维打分（内容/结构/证据/可信度）→ 教练改进建议 → Judge 质量复核。",
      "选 Agent Team 架构而非单一模型，因为面试官追问、评估官打分、教练给建议是三套完全不同的 prompt 目标，拆开后各自独立迭代，加 Judge 做一致性校验。",
      "JD 输入 → 模拟面试对话（AI 根据回答质量动态追问最多 4 层）→ 诊断报告（雷达图 + 逐题扣分点 + 改进建议 + 示例回答）。",
      "自建四维 MECE Rubric（每档 0-3 分有锚定标准），30 条人工标注评测集，三人交叉标注拉齐 Golden 分。",
      "发现「评估笼统不指扣分点」「教练建议与评估脱节」两类系统性 Badcase，通过 Prompt 正反例锚定 + severity 三级分层修复。"
    ],
    sections: {
      vision: {
        title: "做一个会追问、会打分、会告诉你怎么改的 AI 面试教练",
        body: "面试最大的痛点不是被拒，是不知道为什么被拒。做一个会追问、会打分、会告诉你怎么改的 AI 面试教练，让每次面试都成为可复盘、可改进的学习闭环。",
        points: ["多轮追问模拟：AI 根据回答质量动态追问最多 4 层", "四维打分体系：内容 / 结构 / 证据 / 可信度", "教练改进建议：具体到逐题扣分点和示例回答", "Judge 质量复核：独立校验评分一致性和建议可执行性"]
      },
      intro: {
        title: "6 Agent 协作系统",
        body: "JD 解析 → 多轮追问面试 → 四维打分 → 教练改进建议 → Judge 质量复核。拆开三套 prompt 目标独立迭代，加 Judge 做一致性校验。",
        points: ["JD 解析 Agent：提取岗位画像、关键能力和面试路径", "面试官 Agent：根据回答质量动态追问（最多 4 层）", "评估官 Agent：四维 MECE Rubric 打分（内容/结构/证据/可信度）", "教练 Agent：给出逐题扣分点 + 改进建议 + 示例回答", "Judge Agent：独立复核评分一致性，防止评估漂移", "选 Agent Team 而非单一模型：三套完全不同的 prompt 目标，拆开后各自独立迭代"]
      },
      ui: {
        title: "JD 输入 → 模拟面试对话 → 诊断报告",
        body: "JD 输入后进入模拟面试对话，AI 根据回答质量动态追问（最多 4 层深挖），完成后生成诊断报告：雷达图 + 逐题扣分点 + 改进建议 + 示例回答。",
        points: ["JD 输入区：粘贴岗位描述，自动解析关键能力维度", "模拟面试对话区：AI 追问最多 4 层，模拟真实面试官追问深度", "诊断报告：四维雷达图可视化", "逐题扣分点：精确到具体回答段落的改进建议", "示例回答：提供高质量参考答案对比"]
      },
      eval: {
        title: "自建四维 MECE Rubric + 30 条人工标注评测集",
        body: "自建四维 MECE Rubric（每档 0-3 分有锚定标准），30 条人工标注评测集，三人交叉标注拉齐 Golden 分。发现两类系统性 Badcase 并修复。",
        points: ["四维 MECE Rubric：0-3 分每档有明确锚定标准", "30 条人工标注评测集，三人交叉标注拉齐 Golden 分", "发现「评估笼统不指扣分点」「教练建议与评估脱节」两类 Badcase", "Prompt 正反例锚定 + severity 三级分层修复", "复测指标明确，评估一致性显著提升"]
      }
    }
  },
  {
    id: "evallab",
    index: "02",
    season: "02",
    title: "LLM Eval Lab",
    subtitle: "测试集管理 · A/B 对比实验 · Judge 可靠性自检",
    type: "Prompt Evaluation · A/B Testing · CLI + Web",
    image: evalLabVisual,
    city: "Eval Lab",
    details: [
      "通用 Prompt 评估工具。支持测试集管理、单版本评测、A/B 对比实验（维度级差异 + 自动标回归 case）、Judge 可靠性自检（同一 case 跑 3 次算一致性 σ、位置偏差检测、分数分布异常检测）、覆盖度分析（主动提醒评测集盲区）。",
      "CLI + Web 双模式。CSV 拖拽导入测试集 → 配置 Prompt 版本和 Judge 模型 → 一键跑评 → 双列对比报告（绿涨红跌，回归 case 高亮）→ Judge 可靠性仪表盘。",
      "Judge Engine 内建三重自检：评分一致性、位置偏差、分数异常。覆盖度分析模块自动检测评测集的维度盲区并输出「下一步建议」。",
      "工具自己先被评测——实验记录含 Prompt 哈希固化，任意历史实验可复现。"
    ],
    sections: {
      vision: {
        title: "给 Prompt 加上回归测试",
        body: "软件工程有单元测试和 CI/CD，AI 产品凭什么没有？给 Prompt 加上回归测试，让每次改动都有据可查、有指标可衡量、有回归 case 可追溯。",
        points: ["Prompt 回归测试：像软件工程一样管理 AI 产品迭代", "每次 Prompt 改动都有指标衡量和回归 case 追溯", "让 AI 产品评测从「感觉变好了」走向「指标证明了」"]
      },
      intro: {
        title: "通用 Prompt 评估工具，CLI + Web 双模式",
        body: "支持测试集管理、单版本评测、A/B 对比实验（维度级差异 + 自动标回归 case）、Judge 可靠性自检、覆盖度分析。",
        points: ["测试集管理：CSV 导入、版本管理、标注协作", "单版本评测：一键跑评，输出多维度评分报告", "A/B 对比实验：维度级差异对比，自动标记回归 case", "Judge 可靠性自检：一致性 σ / 位置偏差 / 分数分布异常", "覆盖度分析：主动提醒评测集维度盲区，输出下一步建议", "CLI + Web 双模式：命令行高效跑评，Web 可视化分析"]
      },
      ui: {
        title: "CSV 拖拽导入 → 配置 → 一键跑评 → 双列对比报告",
        body: "CSV 拖拽导入测试集 → 配置 Prompt 版本和 Judge 模型 → 一键跑评 → 双列对比报告（绿涨红跌，回归 case 高亮）→ Judge 可靠性仪表盘。",
        points: ["CSV 拖拽导入测试集，支持批量管理", "Prompt 版本与 Judge 模型灵活配置", "一键跑评：自动执行全量测试集", "双列对比报告：绿涨红跌，回归 case 高亮提醒", "Judge 可靠性仪表盘：一致性 / 偏差 / 异常三项指标"]
      },
      eval: {
        title: "Judge Engine 三重自检 + 实验可复现",
        body: "工具自己先被评测。Judge Engine 内建三重自检：评分一致性、位置偏差、分数异常。覆盖度分析自动检测盲区。实验记录含 Prompt 哈希固化，任意历史实验可复现。",
        points: ["评分一致性检测：同一 case 跑 3 次计算一致性 σ", "位置偏差检测：答案位置是否影响 Judge 评分", "分数分布异常检测：评分是否过度集中或离散", "覆盖度分析：自动检测评测集维度盲区 + 下一步建议", "Prompt 哈希固化：任意历史实验可完整复现"]
      }
    }
  },
  {
    id: "echomind",
    index: "03",
    season: "03",
    title: "EchoMind",
    subtitle: "多 Agent 协作 · ChromaDB RAG · 双后端架构",
    type: "Multi-Agent · RAG · Customer Service AI",
    image: echoMindVisual,
    city: "EchoMind AI",
    details: [
      "多 Agent 智能客服——意图识别 → Orchestrator 路由到 General/Technical/Billing 三个专业 Agent → ChromaDB RAG 检索 → LLM 生成回复。",
      "Redis 管理短期对话记忆 + 用户画像持久化，MCP 工具层做查询改写/重排/熔断/缓存/降级。Java 和 Python 双后端版本，同一前端切换调试。",
      "Vue 3 控制台，左右分栏。左侧：双后端一键切换 + 实时健康状态 + 知识库统计。右侧：对话调试面板（消息气泡标注意图/Agent/RAG/转人工）、知识库检索（含相似度分数）、知识导入。",
      "端到端评测模块 + Agent 性能监控（响应延迟/工具成功率/知识命中率/转人工率）+ RAG 引用溯源。评分低于阈值的查询触发降级策略。"
    ],
    sections: {
      vision: {
        title: "一个有记忆、会判断、能协作的 AI 客服团队",
        body: "企业客服不只是回答问题——它需要记住用户是谁、买过什么、上次聊到哪、当前情绪如何。做的是一个有记忆、会判断、能协作的 AI 客服团队，不是一个 chatbot。",
        points: ["有记忆：Redis 短期对话记忆 + 用户画像持久化", "会判断：意图识别 + Orchestrator 智能路由", "能协作：General / Technical / Billing 三个专业 Agent 分工"]
      },
      intro: {
        title: "多 Agent 智能客服系统，Java + Python 双后端",
        body: "意图识别 → Orchestrator 路由到三个专业 Agent → ChromaDB RAG 检索 → LLM 生成回复。MCP 工具层做查询改写/重排/熔断/缓存/降级，保障生产级稳定性。",
        points: ["意图识别 Agent：判断用户问题类型和紧急程度", "Orchestrator 路由：动态分发到 General / Technical / Billing 三个专业 Agent", "ChromaDB RAG 检索增强生成：知识库精准召回", "Redis 短期对话记忆 + 用户画像持久化", "MCP 工具层：查询改写 / 重排 / 熔断 / 缓存 / 降级", "Java + Python 双后端版本：同一前端一键切换调试"]
      },
      ui: {
        title: "Vue 3 控制台，左右分栏，全链路可观测",
        body: "左侧：双后端一键切换 + 实时健康状态 + 知识库统计。右侧：对话调试面板（消息气泡标注意图/Agent/RAG/转人工）、知识库检索（含相似度分数）、知识导入（文本+文件上传）。",
        points: ["双后端一键切换：Java / Python 实时切换调试", "实时健康状态监控：各 Agent 和服务运行状态", "知识库统计：文档数、chunk 数、命中率趋势", "对话调试面板：消息气泡标注意图 / Agent / RAG / 转人工", "知识库检索：含相似度分数，可追踪每条知识的召回路径", "知识导入：支持文本粘贴和文件上传两种方式"]
      },
      eval: {
        title: "端到端评测 + Agent 性能监控 + RAG 引用溯源",
        body: "端到端评测模块覆盖常规问题、边界 case 和对抗样本。Agent 性能监控追踪响应延迟、工具成功率、知识命中率、转人工率。评分低于阈值的查询触发降级策略。",
        points: ["端到端评测模块：覆盖常规问题 / 边界 case / 对抗样本", "Agent 性能监控：响应延迟 / 工具成功率 / 知识命中率 / 转人工率", "RAG 引用溯源：每条回答可追溯到具体知识 chunk", "评分阈值触发降级：低质量回答自动降级到转人工或保守回复", "支持回归评测：Prompt 改动后可一键跑全量评测集"]
      }
    }
  },
  {
    id: "bear",
    index: "04",
    season: "04",
    title: "Bear Agent",
    subtitle: "Agent Runtime · Skill 自进化 · 多协议支持",
    type: "Agent Runtime · Skill Evolution · Open Source",
    image: bearVisual,
    city: "Bear Agent",
    details: [
      "Python 实现的自主编程 Agent Runtime。完整 Agent Loop（模型调用 → 权限检查 → 工具执行 → 结果回写 → 会话压缩）。支持 OpenAI/Anthropic 双协议、文件精准编辑、Shell 执行、子 Agent 调度、MCP 外部工具接入、持久记忆。",
      "核心差异化：Skill 自进化机制——Agent 从多轮对话中自动提取可复用规则，经合并/弃用判断后写入 SKILL.md，形成持续进化的行为规范库。",
      "终端 REPL 交互——输入自然语言任务，Agent 自主规划、执行、反馈。支持 Plan Mode（先出计划再执行）、会话恢复和对话压缩。",
      "权限细粒度控制（文件/Shell/Skill/MCP/子Agent 独立授权），Skill 进化全链路可追溯（每次增改记录溯源和使用统计）。"
    ],
    sections: {
      vision: {
        title: "从零实现一个最小版 Claude Code，理解 Agent 底层运行机制",
        body: "不满足于用 AI 编程工具，要搞清楚它凭什么能拆任务、调工具、写文件、记偏好。从零实现一个最小版 Claude Code，理解 Agent 的底层运行机制。",
        points: ["从零实现 Agent Runtime，理解底层运行机制", "拆解 Claude Code：模型调用 → 权限 → 工具 → 结果回写", "核心差异化：Skill 自进化机制，从对话中自动提取可复用规则"]
      },
      intro: {
        title: "Python 实现的自主编程 Agent Runtime",
        body: "完整 Agent Loop（模型调用 → 权限检查 → 工具执行 → 结果回写 → 会话压缩），支持 OpenAI/Anthropic 双协议。核心差异化：Skill 自进化机制——Agent 从多轮对话中自动提取可复用规则，经合并/弃用判断后写入 SKILL.md。",
        points: ["完整 Agent Loop：模型调用 → 权限检查 → 工具执行 → 结果回写 → 会话压缩", "OpenAI / Anthropic 双协议支持", "文件精准编辑：只改目标行，不重写整个文件", "Shell 执行：安全沙箱内运行命令", "子 Agent 调度：独立 Agent 执行子任务", "MCP 外部工具接入：扩展 Agent 能力边界", "持久记忆：跨会话保留用户偏好和项目上下文", "Skill 自进化机制：自动提取可复用规则 → 合并/弃用判断 → 写入 SKILL.md"]
      },
      ui: {
        title: "终端 REPL 交互，自然语言驱动",
        body: "输入自然语言任务，Agent 自主规划、执行、反馈。支持 Plan Mode（先出计划再执行）、会话恢复和对话压缩。交互方式简洁但能力完整。",
        points: ["自然语言任务输入：用中文描述需求即可", "Agent 自主规划与执行：自动拆解任务、调用工具", "Plan Mode：先出计划等待确认再执行", "会话恢复：中断后可继续之前的工作", "对话压缩：长对话自动总结，保持上下文高效"]
      },
      eval: {
        title: "权限细粒度控制 + Skill 进化全链路可追溯",
        body: "权限细粒度控制（文件/Shell/Skill/MCP/子Agent 独立授权），Skill 进化全链路可追溯（每次增改记录溯源和使用统计）。通过拆解和复现 Claude Code 的多工具协同机制，验证了对 Agent 架构底层设计的理解。",
        points: ["权限细粒度控制：文件 / Shell / Skill / MCP / 子Agent 独立授权", "Skill 进化全链路可追溯：每次增改记录溯源和使用统计", "拆解和复现 Claude Code 多工具协同机制", "验证 Agent Loop 设计的合理性和扩展性"]
      }
    }
  }
];

export const strengths = [
  [
    "南京杰度信息技术有限公司｜产品运营（AI 通信产品方向）",
    "2025.02 - 2026.05｜利用 AI 工具分析核心业务路径数据，推动设置流程简化和功能分类优化，C 端用户设置转化率提升 25%。"
  ],
  [
    "江苏初见信息科技有限公司｜信息流运营（高级）",
    "2024.05 - 2025.02｜主导腾讯广告信息流投放，月耗 500 万+；通过定向和素材优化实现 CTR 提升 25%、转化成本降低 18%、ROI 稳定 6-8。"
  ],
  [
    "杭州聚光品牌管理有限公司｜抖音运营",
    "2022.08 - 2024.05｜负责直播间运营与短视频投放策略优化，日均 GMV 10 万+、月 GMV 300 万+，实践从用户触达到转化的全链路运营。"
  ],
  [
    "AI 产品方法论",
    "AI 产品链路设计、评测集与 MECE 评分标准构建、Badcase 归因与迭代、LLM 置信度管理、人机协同设计。"
  ],
  [
    "AI 技术实践",
    "Prompt Engineering、Prompt Chain、LLM-as-a-Judge、RAG 检索增强生成、Agent 工作流设计。"
  ],
  [
    "数据与业务判断",
    "SQL、Excel 高级分析、A/B 测试、数据归因、数据看板、用户需求提炼、竞品分析和 SOP 流程沉淀。"
  ]
];
