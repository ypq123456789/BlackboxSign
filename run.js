const { spawn } = require('child_process');
const axios = require('axios');

const tgBotToken = process.env.TG_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const tgChatId = process.env.TG_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
const tgApiBase = process.env.TG_API_BASE || 'https://api.telegram.org';

let logs = [];

console.log('[Wrapper] Starting BlackBoxSign.js...');

// 启动子进程运行原脚本
const child = spawn('node', ['BlackBoxSign.js'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env // 继承所有环境变量，包括 BLACKBOX_COOKIE
});

// 捕获标准输出
child.stdout.on('data', (data) => {
    const str = data.toString();
    process.stdout.write(str); // 实时打印到控制台
    logs.push(str);
});

// 捕获标准错误
child.stderr.on('data', (data) => {
    const str = data.toString();
    process.stderr.write(str); // 实时打印到控制台
    logs.push('[ERROR] ' + str);
});

// 进程结束时触发推送
child.on('close', async (code) => {
    const fullLog = logs.join('');
    
    if (!tgBotToken || !tgChatId) {
        console.log('\n[Telegram Push] 未配置 TG_BOT_TOKEN 或 TG_CHAT_ID，跳过推送。');
        process.exit(code);
    }

    console.log('\n[Telegram Push] 正在发送日志到 Telegram...');
    
    // Telegram 消息长度限制为 4096 字符，这里截取最后 3500 个字符防止超限
    const text = ('【小黑盒签到运行日志】\n' + fullLog).slice(-3500);

    try {
        await axios.post(`${tgApiBase}/bot${tgBotToken}/sendMessage`, {
            chat_id: tgChatId,
            text: text
        }, { timeout: 10000 });
        console.log('[Telegram Push] 推送成功！');
    } catch (err) {
        console.error('[Telegram Push] 推送失败:', err.message);
    }
    
    // 保持与子进程相同的退出码，以便 GitHub Actions 正确识别成功或失败
    process.exit(code);
});
