# 小黑盒自动签到脚本 (BlackboxSign)

这是一个用于自动化完成小黑盒（Heybox）每日签到及相关任务的脚本。支持通过 GitHub Actions 每天定时自动运行，并支持将运行结果推送到 Telegram。

## 功能特性

- **自动签到**：每日自动完成小黑盒签到。
- **自动任务**：自动完成分享帖子、分享游戏详情、分享游戏评价、游戏榜单停留等日常任务。
- **Telegram 推送**：运行结束后，自动将执行日志推送到指定的 Telegram 账号或群组。
- **零侵入设计**：使用包裹脚本 (`run.js`) 运行核心逻辑，不修改原混淆脚本，避免触发防篡改机制。

## 使用方法 (GitHub Actions)

推荐使用 GitHub Actions 进行自动化部署，无需自己准备服务器。

### 1. Fork 本仓库
点击页面右上角的 **Fork** 按钮，将本仓库复制到你的 GitHub 账号下。

### 2. 获取小黑盒 Cookie
你需要抓包获取小黑盒 App 的 Cookie。
1. 手机上安装抓包工具（如 HttpCanary、Stream 等）。
2. 打开小黑盒 App，进行任意操作（如刷新首页、点击签到）。
3. 在抓包工具中找到请求域名为 `api.xiaoheihe.cn` 的请求。
4. 在请求头（Headers）中找到 `cookie` 字段，复制其完整内容。

### 3. 配置 GitHub Secrets
进入你 Fork 后的仓库，点击 **Settings** -> **Secrets and variables** -> **Actions**，点击 **New repository secret** 添加以下变量：

| Secret 名称 | 必填 | 说明 |
| :--- | :---: | :--- |
| `BLACKBOX_COOKIE` | **是** | 你抓取到的小黑盒 Cookie。 |
| `TG_BOT_TOKEN` | 否 | 你的 Telegram Bot Token（用于接收推送）。例如：`123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11` |
| `TG_CHAT_ID` | 否 | 接收推送的 Telegram 用户 ID 或群组 ID。 |

*注：如果不配置 `TG_BOT_TOKEN` 和 `TG_CHAT_ID`，脚本依然会正常运行，只是不会发送 Telegram 推送。*

### 4. 启用 Actions
1. 点击仓库顶部的 **Actions** 标签页。
2. 点击 **I understand my workflows, go ahead and enable them**。
3. 在左侧找到 **小黑盒自动签到**，点击 **Run workflow** 手动运行一次，检查是否配置成功。

默认情况下，脚本会在每天北京时间凌晨 1:03 自动运行。

## 本地运行

如果你想在本地或自己的服务器上运行：

1. 克隆仓库并安装依赖：
   ```bash
   git clone https://github.com/你的用户名/BlackboxSign.git
   cd BlackboxSign
   npm install axios
   ```

2. 设置环境变量并运行：
   **Linux / macOS:**
   ```bash
   export BLACKBOX_COOKIE="你的Cookie"
   export TG_BOT_TOKEN="你的BotToken"
   export TG_CHAT_ID="你的ChatID"
   node run.js
   ```

   **Windows (PowerShell):**
   ```powershell
   $env:BLACKBOX_COOKIE="你的Cookie"
   $env:TG_BOT_TOKEN="你的BotToken"
   $env:TG_CHAT_ID="你的ChatID"
   node run.js
   ```

## 免责声明

本脚本仅供学习交流使用，请勿用于非法用途。使用本脚本产生的任何后果由使用者自行承担。
