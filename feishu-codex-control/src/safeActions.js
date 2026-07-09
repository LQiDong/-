import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";

const DEFAULT_TIMEOUT_MS = Number(process.env.ACTION_TIMEOUT_MS || 120000);

function workspaceDir() {
  return path.resolve(process.env.HOMEPAGE_DIR || path.join(process.cwd(), ".."));
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: options.cwd || workspaceDir(),
      shell: false,
      windowsHide: true,
      env: process.env
    });

    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      stderr += `\nTimed out after ${options.timeoutMs || DEFAULT_TIMEOUT_MS}ms`;
    }, options.timeoutMs || DEFAULT_TIMEOUT_MS);

    child.stdout.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ code: 1, stdout: "", stderr: error.message });
    });
  });
}

async function requireLocalApproval(action, detail) {
  if (String(process.env.REQUIRE_LOCAL_APPROVAL || "true").toLowerCase() === "false") return true;

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question(`Allow Feishu action "${action}"? ${detail || ""} [y/N] `);
    return /^y(es)?$/i.test(answer.trim());
  } finally {
    rl.close();
  }
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function helpText() {
  return [
    "可用命令：",
    "帮助 / help",
    "状态 / status",
    "打开主页 / open homepage",
    "打开 https://example.com",
    "构建主页 / build homepage",
    "任务 <要 Codex 处理的内容>",
    "",
    "安全策略：只响应白名单用户；不支持任意 shell；敏感动作默认需要本机确认。"
  ].join("\n");
}

export function parseCommand(text) {
  const raw = text.trim();
  const lower = raw.toLowerCase();

  if (!raw || lower === "help" || raw === "帮助") return { name: "help" };
  if (["status", "状态", "电脑状态"].includes(lower) || raw === "状态") return { name: "status" };
  if (["open homepage", "打开主页", "打开个人主页"].includes(lower) || raw === "打开主页") return { name: "openHomepage" };
  if (["build homepage", "构建主页", "打包主页"].includes(lower) || raw === "构建主页") return { name: "buildHomepage" };
  if (raw.startsWith("打开 ")) return { name: "openUrl", url: raw.slice(3).trim() };
  if (lower.startsWith("open ")) return { name: "openUrl", url: raw.slice(5).trim() };
  if (raw.startsWith("任务 ")) return { name: "createCodexTask", task: raw.slice(3).trim() };
  if (lower.startsWith("task ")) return { name: "createCodexTask", task: raw.slice(5).trim() };

  return { name: "unknown", raw };
}

export async function executeSafeAction(command) {
  const root = workspaceDir();

  switch (command.name) {
    case "help":
      return helpText();

    case "status":
      return [
        `主机：${os.hostname()}`,
        `系统：${os.type()} ${os.release()}`,
        `工作区：${root}`,
        `时间：${new Date().toLocaleString()}`
      ].join("\n");

    case "openHomepage": {
      const file = path.join(root, "standalone.html");
      if (!(await requireLocalApproval("openHomepage", file))) return "已拒绝：本机未确认。";
      const result = await runProcess("C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", ["-NoProfile", "-Command", `Start-Process -LiteralPath '${file.replaceAll("'", "''")}'`], { cwd: root, timeoutMs: 10000 });
      return result.code === 0 ? `已打开主页：${file}` : `打开失败：${result.stderr}`;
    }

    case "openUrl": {
      if (!isHttpUrl(command.url)) return "拒绝：只允许打开 http/https URL。";
      if (!(await requireLocalApproval("openUrl", command.url))) return "已拒绝：本机未确认。";
      const result = await runProcess("C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe", ["-NoProfile", "-Command", `Start-Process '${command.url.replaceAll("'", "''")}'`], { cwd: root, timeoutMs: 10000 });
      return result.code === 0 ? `已打开 URL：${command.url}` : `打开失败：${result.stderr}`;
    }

    case "buildHomepage": {
      if (!(await requireLocalApproval("buildHomepage", root))) return "已拒绝：本机未确认。";
      const result = await runProcess("npm.cmd", ["run", "build"], { cwd: root });
      const output = [result.stdout, result.stderr].filter(Boolean).join("\n").slice(-1800);
      return result.code === 0 ? `构建成功。\n${output}` : `构建失败。\n${output}`;
    }

    case "createCodexTask": {
      if (!command.task) return "任务内容不能为空。";
      const inboxDir = path.join(root, ".codex-feishu-tasks");
      await fs.mkdir(inboxDir, { recursive: true });
      const id = new Date().toISOString().replace(/[:.]/g, "-");
      const file = path.join(inboxDir, `${id}.json`);
      await fs.writeFile(file, JSON.stringify({ id, task: command.task, createdAt: new Date().toISOString(), source: "feishu" }, null, 2), "utf8");
      return `已创建 Codex 本地任务：${file}\n我下次在 Codex 里可以读取并执行它。`;
    }

    default:
      return `未知命令：${command.raw || ""}\n\n${helpText()}`;
  }
}
