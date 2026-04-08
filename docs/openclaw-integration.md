# OpenClaw 接入说明

本网站是静态站点（GitHub Pages），不要在前端保存 OpenClaw 网关令牌。

## 推荐接入方式（安全）

1. 在你的基础设施（例如 local-cloud-hub）提供一个只读公开状态端点。
2. 这个端点只返回非敏感信息（在线状态、更新时间、通道统计、会话统计、模型名）。
3. 网站通过 `data/openclaw-config.json` 指向该端点。

## 配置步骤

1. 编辑 `data/openclaw-config.json`：

```json
{
  "enabled": true,
  "name": "OpenClaw Gateway",
  "mode": "public-proxy",
  "publicStatusEndpoint": "https://your-public-endpoint.example.com/openclaw-status.json",
  "note": "状态来自只读公开端点，不包含敏感信息。"
}
```

2. 公开状态端点建议返回如下 JSON：

```json
{
  "updatedAt": "2026-04-08T20:00:00+08:00",
  "gatewayOnline": true,
  "healthSummary": "Gateway 可达",
  "activeModel": "openai/gpt-5.4",
  "channelsOnline": 3,
  "totalChannels": 5,
  "sessionsActive": 12
}
```

## 本地手动同步（不暴露网关）

如果你暂时没有公开状态端点，可以在本地执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\refresh-openclaw-status.ps1
```

脚本会尝试调用 `openclaw health --json`，并更新 `data/openclaw-status.json`。

## 自动同步（可选）

仓库已包含工作流：`.github/workflows/update-openclaw-status.yml`

使用方式：

1. 在 GitHub 仓库 Secrets 中设置 `OPENCLAW_STATUS_URL`
2. 工作流会每 30 分钟拉取一次状态并更新 `data/openclaw-status.json`

> 注意：该 URL 必须是只读无敏感信息的公开状态端点。
