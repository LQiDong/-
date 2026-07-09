import "dotenv/config";
import * as Lark from "@larksuiteoapi/node-sdk";
import { executeSafeAction, parseCommand } from "./safeActions.js";

const appId = process.env.FEISHU_APP_ID;
const appSecret = process.env.FEISHU_APP_SECRET;
const allowedIds = new Set(
  String(process.env.FEISHU_ALLOWED_IDS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
);

if (!appId || !appSecret) {
  console.error("Missing FEISHU_APP_ID or FEISHU_APP_SECRET. Copy .env.example to .env first.");
  process.exit(1);
}

if (allowedIds.size === 0) {
  console.error("Missing FEISHU_ALLOWED_IDS. Refusing to start without an operator allowlist.");
  process.exit(1);
}

const baseConfig = {
  appId,
  appSecret,
  domain: Lark.Domain.Feishu
};

const client = new Lark.Client(baseConfig);
const wsClient = new Lark.WSClient({ ...baseConfig, loggerLevel: Lark.LoggerLevel.info });
const seenMessageIds = new Set();

function pickMessage(data) {
  const event = data?.event || data;
  return event?.message || data?.message || {};
}

function pickSender(data) {
  const event = data?.event || data;
  return event?.sender?.sender_id || data?.sender?.sender_id || {};
}

function senderAllowed(senderId = {}) {
  return [senderId.open_id, senderId.user_id, senderId.union_id]
    .filter(Boolean)
    .some((id) => allowedIds.has(id));
}

function parseTextContent(message) {
  if (message.message_type && message.message_type !== "text") return "";

  try {
    const content = typeof message.content === "string" ? JSON.parse(message.content) : message.content;
    return String(content?.text || "").trim();
  } catch {
    return String(message.content || "").trim();
  }
}

async function replyText(chatId, text) {
  if (!chatId) {
    console.log(text);
    return;
  }

  await client.im.v1.message.create({
    params: { receive_id_type: "chat_id" },
    data: {
      receive_id: chatId,
      msg_type: "text",
      content: JSON.stringify({ text })
    }
  });
}

async function handleIncomingMessage(data) {
  const message = pickMessage(data);
  const senderId = pickSender(data);
  const messageId = message.message_id;
  const chatId = message.chat_id;

  if (messageId && seenMessageIds.has(messageId)) return;
  if (messageId) seenMessageIds.add(messageId);
  if (seenMessageIds.size > 500) seenMessageIds.clear();

  if (!senderAllowed(senderId)) {
    await replyText(chatId, "拒绝：你不在这台电脑的 Feishu 控制白名单中。");
    return;
  }

  const text = parseTextContent(message);
  const command = parseCommand(text);
  const result = await executeSafeAction(command);
  await replyText(chatId, result);
}

const eventDispatcher = new Lark.EventDispatcher({}).register({
  "im.message.receive_v1": async (data) => {
    try {
      await handleIncomingMessage(data);
    } catch (error) {
      console.error("Feishu handler error:", error);
    }
  }
});

console.log("Starting Feishu Codex control bridge...");
console.log("Allowed operators:", [...allowedIds].join(", "));
wsClient.start({ eventDispatcher });
