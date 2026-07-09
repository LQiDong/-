# Feishu Codex Control Bridge

这是一个本机运行的飞书长连接控制桥，用于从飞书给这台电脑发送**安全预设动作**，并把复杂 Codex 需求写成本地任务队列。

它不是远程任意 shell，也不会把电脑开放给所有飞书用户。默认安全策略：

- 只响应 `FEISHU_ALLOWED_IDS` 白名单用户。
- 不支持任意命令执行。
- 打开网页、打开主页、构建主页等动作默认需要本机终端确认。
- 复杂 Codex 请求写入 `.codex-feishu-tasks/`，由本机 Codex 后续读取执行。

## 1. 飞书后台配置

参考飞书开放平台长连接文档：

- 使用长连接接收事件：<https://open.feishu.cn/document/server-docs/event-subscription-guide/event-subscription-configure-/request-url-configuration-case>
- 接收消息事件：<https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive>

操作步骤：

1. 在飞书开放平台创建企业自建应用。
2. 开启机器人能力。
3. 在「凭证与基础信息」复制 `App ID` 和 `App Secret`。
4. 在「权限管理」至少开通以下权限之一：
   - 单聊：`im:message.p2p_msg` 或 `im:message.p2p_msg:readonly`
   - 群聊 @ 机器人：`im:message.group_at_msg` 或只读版本
5. 在「事件订阅」中选择「使用长连接接收事件」。
6. 订阅事件：`im.message.receive_v1`（接收消息）。
7. 发布应用，并把机器人加到你的飞书单聊/群聊里。

## 2. 本地安装

```powershell
cd D:\DESK\AI产品经理\个人主页\feishu-codex-control
npm install
Copy-Item .env.example .env
notepad .env
```

编辑 `.env`：

```env
FEISHU_APP_ID=cli_xxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
FEISHU_ALLOWED_IDS=ou_xxxxxxxxxxxxx
HOMEPAGE_DIR=D:\DESK\AI产品经理\个人主页
REQUIRE_LOCAL_APPROVAL=true
```

`FEISHU_ALLOWED_IDS` 可以填飞书事件里的 `open_id`、`user_id` 或 `union_id`，多个用英文逗号分隔。

## 3. 启动

```powershell
npm run start
```

看到类似 `ws client ready` 即表示长连接建立成功。

## 4. 飞书命令

在飞书里给机器人发：

```text
帮助
状态
打开主页
打开 https://example.com
构建主页
任务 帮我把个人主页首屏标题改得更像 AI 产品经理
```

命令说明：

- `状态`：返回电脑/工作区状态。
- `打开主页`：打开 `standalone.html`。
- `打开 URL`：只允许 `http/https` URL。
- `构建主页`：运行主页项目的 `npm run build`。
- `任务 ...`：写入 `.codex-feishu-tasks/*.json`，本机 Codex 可读取执行。

## 5. 安全建议

- 保持 `REQUIRE_LOCAL_APPROVAL=true`，至少在初期调试时不要关闭。
- 不要把 `.env` 提交到 GitHub。
- 不要把机器人加到不可信群聊。
- 不要把 `FEISHU_ALLOWED_IDS` 设置成空或共享账号。
- 如果要增加新动作，在 `src/safeActions.js` 里新增白名单函数，不要添加任意 shell 入口。

## 6. 常见问题

### 为什么不用 Webhook？

Webhook 需要公网 URL 或内网穿透。飞书官方长连接模式可以让本地电脑主动连飞书，不需要暴露本机端口。

### 能不能远程让 Codex 直接改代码？

这个桥默认不会直接驱动 Codex 桌面执行任意自然语言任务。它会把任务写到 `.codex-feishu-tasks/`，本机 Codex 读取后再执行。这样可以避免飞书账号或机器人被盗后直接控制电脑。

### 能不能加截图、关机、运行命令？

可以继续加，但建议每个动作都做成单独白名单，并保留本机确认。不要开放 `cmd`、`powershell`、`bash` 这类通用命令入口。
