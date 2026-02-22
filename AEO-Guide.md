# AEO 权威指南 2026：当 AI Agent 取代用户访问你的网站

> SEO 之后的下一个万亿级机会，以及你现在就该做的事

---

## 1. 一个你即将经历的场景

2026 年 3 月的某个早晨，你对手机说：

> "帮我订一张下周五北京飞上海的机票，东航优先，靠窗，500 以下。"

你的 AI Agent 没有打开携程，没有打开 12306，没有打开任何网页。它做了这些事：

1. 调用东航的结构化航班查询接口，拿到 JSON 格式的航班列表
2. 根据你的历史偏好（靠窗、不要红眼、偏好 T2）筛选出 3 个选项
3. 比对南航和国航的同时段报价（通过它们的 API）
4. 自动完成预订、选座、绑定常旅客号
5. 把确认信息推送给你

整个过程 **没有一个人类访问过任何网站**。

这不是科幻。Chrome 146 已经在 2026 年 2 月 10 日发布了 WebMCP 的早期预览版。Google 和 Microsoft 正在联合推动 W3C 标准化。AI Agent 正在从"聊天助手"进化成"行动代理"。

问题来了：**当 AI Agent 成为你网站的主要"访客"，你准备好了吗？**

如果你的网站只有花哨的动画和精美的 UI，但没有结构化数据、没有 API 接口、没有机器可读的服务描述——在 Agent 的世界里，你就是**隐形的**。

这就是 AEO 要解决的问题。

---

## 2. 什么是 AEO

**AEO = Agent Engine Optimization**，即"AI Agent 引擎优化"。

一句话定义：**让 AI Agent 能发现你、理解你、调用你。**

如果 SEO 是"让 Google 找到你的网站"，那 AEO 就是"让 AI Agent 调用你的服务"。

| | SEO | AEO |
|---|---|---|
| **优化对象** | 搜索引擎爬虫 | AI Agent |
| **核心目标** | 排名靠前 | 被 Agent 选中并调用 |
| **关键产出** | 点击 → 流量 → 转化 | API 调用 → 直接交易 |
| **核心技术** | 关键词、外链、PageRank | 结构化数据、API、WebMCP |
| **衡量指标** | 排名、CTR、跳出率 | 调用次数、成功率、响应时间 |

这是一次范式转变：**从"优化给人看"到"优化给机器调用"**。

在 SEO 的世界里，你需要写一篇 2000 字的文章、配上精美图片、优化 H1 标签，让用户点进来。在 AEO 的世界里，用户可能永远不会看到你的页面——Agent 直接读取你的结构化数据，完成交易，走人。

这不是说 UI 不重要了。而是说 UI 只是故事的一半。**另一半——机器可读的那一半——大多数公司还没开始做。**

---

## 3. 为什么现在很重要

### WebMCP：Agent 时代的 HTTP

2026 年 2 月 10 日，Google 在 Chrome 146 Canary 中发布了 WebMCP（Web Model Context Protocol）的早期预览。这是一个让网页直接向 AI Agent 暴露能力的协议标准。

WebMCP 之于 Agent，就像 HTTP 之于浏览器。它定义了一套标准方式，让网站告诉 Agent："我能做什么、怎么调用我、需要什么参数"。

```html
<!-- 网页中的 WebMCP 声明 -->
<link rel="webmcp" href="/.well-known/webmcp.json" />
```

Google 和 Microsoft 已经联合向 W3C 提交了标准化提案。这不是某个创业公司的 side project——这是两大浏览器厂商 all in 的方向。

### Agent 渗透率的指数增长

几个数据点：

- **ChatGPT** 周活用户突破 4 亿（2025 年底），其中 Agent 模式使用率 Q4 环比增长 340%
- **Claude** 推出 Computer Use 后，企业 API 调用量月增 200%+
- Gartner 预测：到 2027 年，**30% 的电商交易**将由 AI Agent 发起或辅助完成
- 中国市场，Kimi、豆包、通义千问的 Agent 插件生态已经起步

渗透曲线很像 2005 年的移动互联网——大多数人觉得"还早"，但指数增长的特点就是：**等你觉得不早了的时候，已经晚了**。

### 广告模式面临重构

想一想：如果用户不再浏览网页，Google Ads 的展示给谁看？

当 Agent 帮用户做决策时，传统的"竞价排名 → 展示广告 → 点击付费"模式将被根本性改变。取而代之的可能是"Agent 竞价调用"——谁的 API 响应快、数据准、佣金合理，Agent 就选谁。

**这不是未来的故事，这是正在发生的事。**

---

## 4. AEO 的七个维度

我们构建了一个 AEO 审计工具，从七个维度评估一个网站的 Agent 就绪度。以下逐一拆解。

### 维度一：Schema.org 结构化数据

**是什么**

Schema.org 是由 Google、Microsoft、Yahoo 和 Yandex 联合创建的结构化数据词汇表。它用标准化的 JSON-LD 格式描述网页内容——产品、文章、事件、组织、FAQ 等。

**为什么 Agent 需要它**

Agent 不会像人类一样"看"网页。它需要机器可读的数据。Schema.org 就是网页内容的"数据字典"。没有它，Agent 需要用 NLP 去猜测页面内容，准确率大打折扣。有了它，Agent 可以精确提取价格、库存、评分、营业时间等关键信息。

**怎么实现**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "MacBook Pro 14 M4",
  "description": "Apple MacBook Pro 14 英寸，M4 Pro 芯片",
  "brand": {
    "@type": "Brand",
    "name": "Apple"
  },
  "offers": {
    "@type": "Offer",
    "price": "14999",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Apple 官方商城"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2341"
  }
}
</script>
```

**常见错误**

- ❌ 只在首页放了 Organization schema，产品页面没有 Product schema
- ❌ 价格字段用字符串 `"¥14,999"` 而不是数字 `"14999"` + `priceCurrency`
- ❌ Schema 数据与页面实际内容不一致（这会被 Agent 标记为不可信）
- ❌ 用 Microdata 而不是 JSON-LD（Agent 解析 JSON-LD 效率高 10 倍）

### 维度二：llms.txt 文件

**是什么**

`llms.txt` 是一个放在网站根目录的文本文件，专门为大语言模型和 AI Agent 提供网站摘要信息。它类似于 `robots.txt`，但不是告诉爬虫"哪里不能去"，而是告诉 AI "我是谁、我能做什么"。

**为什么 Agent 需要它**

Agent 在决定是否与你的网站交互时，需要快速了解你是谁、提供什么服务。`llms.txt` 就是你给 Agent 的"电梯演讲"。

**怎么实现**

在 `https://yoursite.com/llms.txt` 放置：

```markdown
# 示例：一个电商网站的 llms.txt

# Site Info
> 极客优选是中国领先的数码产品电商平台，专注消费电子和智能硬件。

## 核心服务
- 数码产品在线购买（手机、电脑、配件）
- 产品评测和对比
- 以旧换新服务
- 企业批量采购

## API
- 产品搜索 API: /api/v1/products
- 价格查询 API: /api/v1/prices
- 库存查询 API: /api/v1/inventory
- 完整文档: https://developer.geekbest.com

## 联系
- 技术对接: api@geekbest.com
- 商务合作: bd@geekbest.com
```

同时提供 `llms-full.txt` 用于需要更详细信息的场景（完整产品目录、API 参数说明等）。

**常见错误**

- ❌ 把 `llms.txt` 写成营销文案（Agent 不需要"我们是业界领先的..."）
- ❌ 信息过时，与实际服务不匹配
- ❌ 没有提供 API 端点信息（这才是 Agent 最需要的）
- ❌ 文件太长，超过 2000 行（Agent 有 context window 限制）

### 维度三：robots.txt AI 爬虫策略

**是什么**

`robots.txt` 大家都熟悉。但在 Agent 时代，它有了新的含义——你需要明确对 AI 爬虫的策略。

**为什么 Agent 需要它**

越来越多的 AI 公司在用爬虫抓取网站内容来训练模型或提供 Agent 服务。你需要一个清晰的策略：哪些 AI 爬虫允许、哪些拒绝、哪些内容可以被 AI 索引。

**怎么实现**

```text
# robots.txt - AI 爬虫策略

# 传统搜索引擎：允许
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI Agent 爬虫：选择性允许
User-agent: ChatGPT-User
Allow: /products/
Allow: /api-docs/
Disallow: /account/
Disallow: /admin/

User-agent: ClaudeBot
Allow: /products/
Allow: /api-docs/
Disallow: /account/

User-agent: Bytespider
Allow: /products/

# AI 训练爬虫：禁止（不允许用我们的内容训练模型）
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /
```

**关键策略决策：Agent 访问 vs 训练抓取**

这是很多人搞混的地方。你要区分两种 AI 爬虫：

1. **Agent 服务爬虫**（如 `ChatGPT-User`）：为用户实时查询你的内容——**应该允许**，这是流量
2. **模型训练爬虫**（如 `GPTBot`）：抓取你的内容去训练模型——**看情况**，这是你的数据资产

**常见错误**

- ❌ 一刀切 `Disallow: /` 封杀所有 AI 爬虫（把 Agent 流量也拦在外面了）
- ❌ 完全没有 AI 爬虫策略（等于默认允许所有 AI 训练抓取）
- ❌ 不知道 AI 爬虫的 User-Agent 名称（至少要了解主流的 10 个）

### 维度四：HTML 语义质量

**是什么**

HTML 语义化是指使用正确的 HTML 标签来表达内容的含义，而不只是外观。`<nav>` 表示导航、`<article>` 表示文章、`<header>` 表示头部——这些语义标签帮助 Agent 理解页面结构。

**为什么 Agent 需要它**

Agent 在解析网页时，语义化的 HTML 比一堆 `<div>` 套 `<div>` 好理解 100 倍。好的语义结构让 Agent 能快速定位关键内容（正文在哪、导航在哪、侧边栏是什么），而不需要猜。

**怎么实现**

```html
<!-- ❌ 语义灾难 -->
<div class="top-bar">
  <div class="logo">极客优选</div>
  <div class="menu">
    <div class="menu-item" onclick="goto('/products')">产品</div>
  </div>
</div>
<div class="content">
  <div class="title">MacBook Pro 评测</div>
  <div class="text">这是正文...</div>
</div>

<!-- ✅ 语义清晰 -->
<header>
  <h1>极客优选</h1>
  <nav aria-label="主导航">
    <ul>
      <li><a href="/products">产品</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h2>MacBook Pro 评测</h2>
    <p>这是正文...</p>
  </article>
</main>
```

**语义质量检查清单**

- 页面有且只有一个 `<h1>`
- 标题层级不跳级（h1 → h2 → h3，不要 h1 → h3）
- 使用 `<nav>`、`<main>`、`<article>`、`<aside>`、`<footer>` 等语义标签
- 图片有 `alt` 属性（Agent 也需要知道图片内容）
- 表单有 `<label>` 和 `aria-label`
- 链接文本有意义（不要"点击这里"）

**常见错误**

- ❌ 整个页面就是 `<div>` 的俄罗斯套娃
- ❌ 用 `<div onclick>` 代替 `<a href>` 或 `<button>`（Agent 无法识别为可交互元素）
- ❌ 关键内容放在 `<iframe>` 里（大多数 Agent 不会进入 iframe）
- ❌ 标题标签乱用（把 `<h3>` 当作"小号字体"来用）

### 维度五：WebMCP 就绪度

**是什么**

WebMCP（Web Model Context Protocol）是 2026 年最重要的新标准。它允许网站通过标准协议向 AI Agent 暴露"工具"（tools）和"资源"（resources），让 Agent 可以直接调用网站的能力。

**为什么 Agent 需要它**

想象一下：一个航班预订网站，通过 WebMCP 告诉 Agent "我有这些工具：搜索航班、查询价格、预订机票、选座位"。Agent 就像调用函数一样使用这些服务。不需要模拟点击网页，不需要 scrape HTML——直接、高效、可靠。

**怎么实现**

首先，创建 WebMCP 清单文件 `/.well-known/webmcp.json`：

```json
{
  "schema_version": "0.1.0",
  "name": "GeekBest 极客优选",
  "description": "数码产品电商平台，提供产品搜索、价格查询、购买等服务",
  "tools": [
    {
      "name": "search_products",
      "description": "搜索数码产品，支持关键词、品牌、价格区间筛选",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "搜索关键词"
          },
          "brand": {
            "type": "string",
            "description": "品牌名称"
          },
          "min_price": {
            "type": "number",
            "description": "最低价格（人民币）"
          },
          "max_price": {
            "type": "number",
            "description": "最高价格（人民币）"
          }
        },
        "required": ["query"]
      }
    },
    {
      "name": "get_product_detail",
      "description": "获取产品详细信息，包括规格、评价、库存",
      "inputSchema": {
        "type": "object",
        "properties": {
          "product_id": {
            "type": "string",
            "description": "产品 ID"
          }
        },
        "required": ["product_id"]
      }
    },
    {
      "name": "check_inventory",
      "description": "查询产品库存和配送时间",
      "inputSchema": {
        "type": "object",
        "properties": {
          "product_id": { "type": "string" },
          "city": { "type": "string", "description": "配送城市" }
        },
        "required": ["product_id"]
      }
    }
  ]
}
```

然后在 HTML 中声明：

```html
<head>
  <link rel="webmcp" href="/.well-known/webmcp.json" />
</head>
```

**常见错误**

- ❌ 工具描述不清晰（Agent 靠 description 决定是否调用你）
- ❌ inputSchema 不完整，缺少 description 字段（Agent 不知道参数含义）
- ❌ 返回值没有文档（Agent 无法解析响应）
- ❌ 只暴露读取能力，不暴露写入能力（Agent 不仅想查，还想下单）

### 维度六：OpenAPI / API 文档

**是什么**

OpenAPI（原 Swagger）是描述 REST API 的标准规范。对于有 API 的网站，一份完整的 OpenAPI 文档是 Agent 调用你服务的"说明书"。

**为什么 Agent 需要它**

WebMCP 还在早期阶段，OpenAPI 是成熟的、已被广泛采用的标准。很多 Agent 框架（LangChain、AutoGPT、CrewAI）已经原生支持从 OpenAPI spec 自动生成工具调用。发布好你的 OpenAPI 文档 = 让数百万 Agent 立刻能用你的服务。

**怎么实现**

```yaml
# openapi.yaml
openapi: 3.1.0
info:
  title: GeekBest API
  description: 极客优选电商平台开放 API
  version: 2.0.0
  contact:
    email: api@geekbest.com

servers:
  - url: https://api.geekbest.com/v2

paths:
  /products/search:
    get:
      operationId: searchProducts
      summary: 搜索产品
      description: 根据关键词、品牌、价格区间搜索数码产品
      parameters:
        - name: q
          in: query
          required: true
          schema:
            type: string
          description: 搜索关键词
        - name: brand
          in: query
          schema:
            type: string
          description: 品牌筛选（如 Apple, Samsung）
        - name: min_price
          in: query
          schema:
            type: number
          description: 最低价格（CNY）
        - name: max_price
          in: query
          schema:
            type: number
          description: 最高价格（CNY）
        - name: sort
          in: query
          schema:
            type: string
            enum: [price_asc, price_desc, rating, newest]
          description: 排序方式
      responses:
        '200':
          description: 搜索结果
          content:
            application/json:
              schema:
                type: object
                properties:
                  total:
                    type: integer
                  products:
                    type: array
                    items:
                      $ref: '#/components/schemas/Product'

components:
  schemas:
    Product:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        brand:
          type: string
        price:
          type: number
        currency:
          type: string
          default: CNY
        rating:
          type: number
        in_stock:
          type: boolean
        url:
          type: string
          format: uri
```

关键：把 OpenAPI 文档发布在公开可访问的 URL，比如 `https://api.geekbest.com/openapi.yaml`，并在 `llms.txt` 中引用。

**常见错误**

- ❌ API 文档只有内部版本，没有公开版本
- ❌ `description` 字段空着或只写了 "TODO"（Agent 无法理解参数含义）
- ❌ 没有错误码说明（Agent 不知道如何处理异常）
- ❌ 认证方式不清晰（Agent 无法完成鉴权）

### 维度七：内容可访问性（SSR vs CSR）

**是什么**

这关系到你的网站内容是否能被 Agent 直接读取。SSR（Server-Side Rendering）在服务器端生成完整 HTML，CSR（Client-Side Rendering）在浏览器中用 JavaScript 动态渲染。

**为什么 Agent 需要它**

大多数 AI Agent 在抓取网页时，用的是轻量级 HTTP 请求（类似 `curl`），不会执行 JavaScript。如果你的网站是纯 CSR（比如 React SPA），Agent 拿到的就是一个空白的 `<div id="root"></div>`——**什么内容都没有**。

**怎么实现**

```javascript
// Next.js - 使用 SSR 或 SSG
// pages/products/[id].js

export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);
  return { props: { product } };
}

export default function ProductPage({ product }) {
  return (
    <article>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>¥{product.price}</span>
    </article>
  );
}
```

```python
# 或者用 Nuxt.js / Astro / 传统服务端模板
# 关键是：HTML 响应中必须包含完整内容
```

**快速检测方法**

```bash
# 如果这个命令看不到你的核心内容，Agent 也看不到
curl -s https://yoursite.com/products/123 | grep "产品名称"
```

**常见错误**

- ❌ 整站 React/Vue SPA，没有 SSR 或预渲染
- ❌ 关键产品信息通过 AJAX 异步加载（初始 HTML 是空的）
- ❌ 使用 `<noscript>` 放了一句 "请启用 JavaScript"（Agent 不需要这个提示）
- ❌ 核心内容在 `<canvas>` 或图片中（纯视觉，机器完全无法读取）

---

## 5. 真实数据：科技巨头的 AEO 评分

说了这么多理论，来看真实数据。我们用 AEO 审计工具测试了几家全球科技巨头的网站：

| 网站 | AEO 总分 | 等级 | 亮点 | 短板 |
|------|---------|------|------|------|
| **Apple.com** | 50/100 | D | Schema.org 数据较完整 | 无 llms.txt，无 WebMCP，CSR 较重 |
| **Google.com** | 29/100 | F | HTML 语义质量尚可 | 无 WebMCP（对，推 WebMCP 的公司自己没做 😂）|
| **Amazon.com** | 29/100 | F | 结构化数据丰富 | 封杀了几乎所有 AI 爬虫 |
| **淘宝 (taobao.com)** | 58/100 | D | Schema 数据相对完整，SSR | 无 API 文档公开，无 llms.txt |

**几个有趣的发现：**

🏆 **淘宝竟然是最高分**（58 分）。可能因为阿里多年的 SEO 功底——结构化数据和 SSR 做得相对扎实。但即便是"最高分"，也只是 D 级。

😂 **Google 自己才 29 分**。推动 WebMCP 标准的公司，自己的官网 AEO 就绪度是 F 级。这就像 W3C 的官网不符合 Web 标准一样讽刺。

🔒 **Amazon 封杀了所有 AI 爬虫**。在 robots.txt 里 Disallow 了几乎所有 AI User-Agent。防御心态可以理解，但也意味着 Agent 无法推荐 Amazon 的产品——这等于把流量拱手让人。

**关键结论：全球头部网站的 AEO 平均分不到 42 分。**

这意味着什么？**蓝海**。

在 SEO 领域，想和 Amazon、淘宝竞争搜索排名几乎不可能。但在 AEO 领域，一个做得好的中小网站完全可以在 Agent 生态中超越巨头。

**就像 2004 年的 SEO——谁先做，谁吃肉。**

---

## 6. 商业模式变革

AEO 不只是技术问题，它将重塑整个互联网的商业逻辑。

### 流量逻辑的终结

过去 20 年的互联网商业模式可以用一个公式概括：

> **收入 = 流量 × 转化率 × 客单价**

这个公式的根基是"用户访问网站"。但当 Agent 代替用户完成从搜索到交易的全流程，"流量"这个概念就变了。

用户不再"访问"你的网站。Agent 直接"调用"你的服务。PV、UV、跳出率——这些指标将变得越来越不相关。

### Agent 调用的商业模式

新的模式正在形成：

1. **按次付费**：Agent 每次调用你的 API，收取一定费用。类似 Twilio 的通信 API 计费模式。
2. **订阅制**：Agent 平台按月/年为商家接入付费。类似 SaaS 订阅。
3. **佣金模式**：Agent 促成交易后抽佣。类似美团、大众点评。
4. **竞价排名 2.0**：当多个同类服务可选时，商家竞价让 Agent 优先调用自己。Google Ads 的 Agent 版本。

### 从 B2C 到 B2AI

一个有趣的新范式：你的客户不再是 C 端用户，而是服务 C 端用户的 AI Agent。

这意味着你需要：
- 不需要漂亮的 Landing Page，需要清晰的 API 文档
- 不需要 SEO 外链，需要在 Agent 的 tool registry 中注册
- 不需要用户体验设计，需要 **Agent 体验设计**（AX, Agent Experience）

### 新的中间商机会

每次范式转变都会催生新的中间商：

- **AEO 咨询公司**（类似当年的 SEO Agency）
- **Agent-as-a-Service 平台**（帮传统企业快速接入 Agent 生态）
- **Agent Analytics 工具**（监控和优化 Agent 调用数据）
- **Agent 商业联盟**（类似 Google AdSense，连接 Agent 和商家）

如果你是创业者，这里每一个方向都是机会。

---

## 7. 行动清单：现在就能做的 10 件事

按优先级排序。从第 1 条开始，每完成一条你的 AEO 评分就会提升。

### ① 添加 Schema.org 结构化数据（30 分钟）

这是投入产出比最高的一步。去 [schema.org](https://schema.org) 找到你的业务类型，添加 JSON-LD。

```html
<!-- 加在每个页面的 <head> 中 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "你的公司名",
  "url": "https://yoursite.com",
  "description": "一句话描述你的业务",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-xxx-xxxx-xxxx",
    "contactType": "customer service"
  }
}
</script>
```

用 [Google 结构化数据测试工具](https://search.google.com/test/rich-results) 验证。

### ② 创建 llms.txt（15 分钟）

在网站根目录创建 `llms.txt`，简洁描述你的业务和能力。

```bash
# 检查是否已存在
curl https://yoursite.com/llms.txt
```

参考维度二的模板，写一个真诚、准确、对 Agent 有用的版本。

### ③ 优化 robots.txt AI 爬虫策略（15 分钟）

审查你的 `robots.txt`，对 AI 爬虫做出明确策略。

```bash
# 检查当前状态
curl https://yoursite.com/robots.txt
```

至少覆盖这些 User-Agent：`ChatGPT-User`、`ClaudeBot`、`Bytespider`、`GPTBot`、`Google-Extended`、`PerplexityBot`、`Applebot-Extended`。

### ④ 确保 SSR 或预渲染（2-8 小时）

```bash
# 快速测试：你的关键内容在不执行 JS 的情况下可见吗？
curl -s https://yoursite.com/ | head -100
```

如果看不到核心内容，你需要实施 SSR。Next.js、Nuxt.js、Astro 都是好选择。如果迁移成本太高，至少对关键页面做预渲染（prerender）。

### ⑤ 提升 HTML 语义质量（1-4 小时）

用以下命令快速审计：

```bash
# 检查标题层级
curl -s https://yoursite.com | grep -oP '<h[1-6][^>]*>.*?</h[1-6]>'

# 检查语义标签使用
curl -s https://yoursite.com | grep -cP '<(nav|main|article|section|aside|header|footer)[ >]'
```

目标：每个页面至少使用 `<header>`、`<nav>`、`<main>`、`<footer>` 四个语义标签。

### ⑥ 发布 OpenAPI 文档（4-16 小时）

如果你有 API，写一份 OpenAPI 3.x 的 spec 并公开发布。

```bash
# 如果用 FastAPI（Python），自动生成：
pip install fastapi uvicorn
# FastAPI 自动在 /openapi.json 提供 spec

# 如果用 Express（Node.js）：
npm install swagger-jsdoc swagger-ui-express
```

没有 API？跳到第 ⑧ 步。

### ⑦ 添加 WebMCP 声明（1-2 小时）

虽然还在早期，但现在布局不会太早。

```bash
# 创建 /.well-known/webmcp.json
mkdir -p .well-known
```

参考维度五的模板，先声明 2-3 个最核心的工具。

### ⑧ 为关键页面添加 meta 信息（1 小时）

```html
<head>
  <meta name="description" content="准确描述这个页面的内容，200字以内">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="页面标题">
  <meta property="og:description" content="页面描述">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://yoursite.com/current-page">
</head>
```

这些 meta 信息帮助 Agent 快速判断页面主题。

### ⑨ 添加 sitemap.xml 并保持更新（30 分钟）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/products/123</loc>
    <lastmod>2026-02-20</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

在 `robots.txt` 中声明 sitemap 位置：

```text
Sitemap: https://yoursite.com/sitemap.xml
```

### ⑩ 运行 AEO 审计并持续优化

用我们的审计工具或类似工具，定期检测你的 AEO 评分：

```bash
# 使用 AEO 审计工具
npx aeo-audit https://yoursite.com
```

设定目标：**3 个月内从 F/D 级达到 B 级（70+分）**。

每两周审计一次，追踪七个维度的分数变化。把 AEO 评分加入你的产品 KPI Dashboard。

---

## 8. 结语

2004 年，当大多数人还在做黄页广告的时候，一小批人开始研究这个叫 SEO 的东西。他们搞懂了 Google 的爬虫怎么工作，弄清了 PageRank 算法的逻辑，然后用极低的成本获得了巨大的流量红利。

那批人里出了不少亿万富翁。

2026 年，我们站在一个类似的拐点。

AI Agent 正在从"能聊天的助手"进化成"能行动的代理"。它们不再只是回答问题——它们帮用户搜索、比较、下单、预订、申请、投资。整个互联网的"用户"正在从人类变成 Agent。

**AEO 就是这个新时代的 SEO。**

好消息是：全球头部网站的平均 AEO 评分不到 42 分。这是蓝海中的蓝海。

坏消息是：窗口期不会太长。当 WebMCP 成为 W3C 正式标准、当每个浏览器都原生支持 Agent 调用、当 Agent 渗透率从 5% 涨到 50% ——你猜会发生什么？会有一批 AEO Agency 出来提供天价咨询服务，就像今天的 SEO 行业一样。

**现在行动的成本是最低的。**

从今天开始：给你的网站加上 Schema.org 结构化数据，写好 `llms.txt`，制定 AI 爬虫策略，发布 OpenAPI 文档，准备 WebMCP 声明。

这些事情，每一件都不超过一个下午。但它们的复利效应，可能在未来两三年里给你带来指数级的回报。

2004 年做 SEO 的人笑到了 2024 年。

**2026 年做 AEO 的人，会笑到什么时候呢？**

---

*如果你想测试自己网站的 AEO 就绪度，可以使用我们开源的 AEO 审计工具。*

*关注我们，获取更多 AEO 实战指南和行业分析。*
