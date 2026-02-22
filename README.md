# AEO Audit — Agent Engine Optimization

> SEO 已死，AEO 当立。检测你的网站对 AI Agent 到底有多友好。

SEO is dead. Long live AEO. Audit how AI-Agent-friendly your website really is.

## 这是什么

AEO Audit 是一个开源的网站审计工具，专门检测你的网站在 AI Agent 时代的准备程度。

输入一个 URL，30 秒内给你一份完整的诊断报告——7 个维度、百分制评分、逐条优化建议。

不废话，不卖课，不收费。

## 7 个检测维度

| 维度 | 分值 | 检测内容 |
|------|------|----------|
| **Schema.org 结构化数据** | 15 | JSON-LD、Microdata、RDFa — AI 理解你页面的基础 |
| **llms.txt** | 15 | 网站根目录的 llms.txt 文件 — 直接告诉 LLM 你是谁 |
| **robots.txt AI 爬虫策略** | 15 | GPTBot、ClaudeBot 等 AI 爬虫是否被允许 |
| **HTML 语义质量** | 15 | 语义标签、Heading 层级、表单 label — 机器可读性 |
| **WebMCP 就绪度** | 15 | toolname 属性、navigator.modelContext — 下一代 Web 标准 |
| **OpenAPI / API 文档** | 15 | 公开的 API 文档端点 — Agent 能调用你的 API 吗 |
| **内容可访问性** | 15 | Meta 信息、SSR 友好度、Open Graph — 基本功 |

满分 105 → 归一化为百分制。

## 评分标准

- **A (90+):** AI Agent 的 VIP — 你已经在未来了
- **B (75-89):** 不错，但还能更好
- **C (60-74):** 及格线，该动手优化了
- **D (40-59):** 堪忧，AI Agent 基本用不好你的站
- **F (<40):** AI Agent 看到你的网站会直接跳过

## 快速开始

```bash
git clone https://github.com/CunxiangYin/aeo-audit.git
cd aeo-audit
npm install
npm start
```

打开 http://localhost:3456 ，输入任意 URL，开始审计。

## 技术栈

- **后端:** Node.js + Express
- **解析:** Cheerio (HTML) + Axios (HTTP)
- **前端:** 原生 HTML + Tailwind CSS (CDN)
- **无数据库，无登录，无追踪**

## 部署

任何支持 Node.js 的平台都能跑：

```bash
# Vercel
npx vercel

# 或者 Docker
# 或者任何 PaaS
```

端口默认 3456，环境变量 `PORT` 可覆盖。

## 为什么做这个

SEO 优化了 20 年，大家都会了。但 AI Agent 时代的规则完全不同：

- 结构化数据比关键词密度重要 100 倍
- llms.txt 是新的 robots.txt
- WebMCP 是下一代 Web 标准
- 你的 API 文档就是你的 "内容"

这个工具帮你看清现状，给出方向。

## License

[MIT](LICENSE) — 随便用，不用谢。
