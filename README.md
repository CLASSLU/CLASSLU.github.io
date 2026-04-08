# 路漫漫科技主页（持续运营版）

这是一个可持续运营的个人技术展示网站，重点特性：

- 数据驱动内容：通过 `data/*.json` 维护文案与模块
- 运营更新流：用 `data/updates.json` 记录持续进展
- OpenClaw 接入面板：支持手动状态或只读公网状态端点
- 深色霓虹科技风 UI，移动端适配

## 目录结构

- `index.html`：页面结构（模块容器）
- `styles.css`：视觉样式与响应式
- `script.js`：数据加载、渲染、交互
- `data/site-content.json`：主页核心内容
- `data/updates.json`：更新日志
- `data/openclaw-config.json`：OpenClaw 接入配置
- `data/openclaw-status.json`：OpenClaw 状态数据（可手动/自动更新）
- `scripts/refresh-openclaw-status.ps1`：本地抓取 OpenClaw 状态脚本
- `docs/openclaw-integration.md`：OpenClaw 接入说明

## 本地预览

```bash
npx --yes serve . -l 4173
```

打开 `http://localhost:4173`。

## 持续运营流程（推荐）

1. 更新内容：编辑 `data/site-content.json`
2. 追加进展：编辑 `data/updates.json`
3. 同步 OpenClaw 状态（可选）：

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\refresh-openclaw-status.ps1
```

4. 提交并推送：

```bash
git add .
git commit -m "chore: update site content"
git push
```
