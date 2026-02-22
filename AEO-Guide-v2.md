# AEO 这个东西，我越研究越觉得会是大事

> 写在前面：这篇文章很长，因为我想把事情说清楚。如果你赶时间，直接跳到第 7 节的行动清单。

---

## 先说个场景，你感受一下

你跟手机说："帮我订下周五北京飞上海的票，东航优先，靠窗，500 以下。"

然后你的 AI Agent 没打开任何 app，没打开任何网页。它直接：

1. 调东航的 API 拿到航班 JSON
2. 根据你的习惯筛了 3 个选项（靠窗、不要红眼、偏好 T2 这些它都记着）
3. 顺手比了南航国航的价
4. 自动订票选座绑常旅客号
5. 给你推了个确认通知

全程没有人类访问过任何网站。

这不是 YY。Chrome 146 在 2026 年 2 月 10 号就发了 WebMCP 的早期预览版，Google 和微软在联合推 W3C 标准化。Agent 正在从聊天工具变成真正能干活的东西。

所以问题来了——如果你的网站只有漂亮的 UI 和花哨的动画，但 Agent 读不懂你、调不了你，那在 Agent 的世界里你就是透明的。

AEO 要解决的就是这个问题。

---

## AEO 到底是什么

**AEO = Agent Engine Optimization**，AI Agent 引擎优化。

简单说就是：让 AI Agent 能找到你的服务、看懂你提供什么、然后直接调用。

如果 SEO 是"让搜索引擎找到你"，AEO 就是"让 Agent 用上你"。

| | SEO | AEO |
|---|---|---|
| **优化对象** | 搜索引擎爬虫 | AI Agent |
| **核心目标** | 排名靠前 | 被 Agent 选中并调用 |
| **关键产出** | 点击 → 流量 → 转化 | API 调用 → 直接交易 |
| **核心技术** | 关键词、外链、PageRank | 结构化数据、API、WebMCP |
| **衡量指标** | 排名、CTR、跳出率 | 调用次数、成功率、响应时间 |

说白了就是从"优化给人看"变成"优化给机器调用"。

以前你要写 2000 字的文章配精美图片优化 H1 标签，用户点进来，看广告，下单。现在呢？用户可能永远不会看到你的页面——Agent 读完你的结构化数据，交易完了，走了。

UI 当然还是重要的，但它只是一半。另一半是机器可读的那部分，这块大多数公司压根没碰过。

---

## 为什么说现在是关键时间点

### WebMCP 这个东西

2026 年 2 月 10 号，Google 在 Chrome 146 Canary 里发了 WebMCP 的预览版。这玩意让网页可以直接告诉 Agent："我能干什么、怎么调我、需要什么参数"。

```html
<link rel="webmcp" href="/.well-known/webmcp.json" />
```

Google 和微软联合提了 W3C 标准化提案。注意，这不是哪个小团队的 side project——两大浏览器厂商 all in 了。

WebMCP 对 Agent 的意义，差不多就像 HTTP 对浏览器的意义。我知道这个比喻有点大，但我暂时想不到更合适的。

### Agent 的用户量在起飞

几个数字：

- ChatGPT 周活突破 4 亿（2025 年底），Agent 模式使用率 Q4 环比增长 340%
- Claude 的 Computer Use 发了之后，企业 API 调用量月增 200%+
- Gartner 说到 2027 年 30% 的电商交易会有 AI Agent 参与（当然 Gartner 的预测嘛，你懂的，打个折听）
- 国内这边 Kimi、豆包、通义的 Agent 插件生态也开始做了

说实话这个增长曲线让我想到 2005 年前后的移动互联网——当时大多数人也觉得"还早"。

### 广告这门生意要变

这个我觉得是最有意思的部分。如果用户不刷网页了，Google Ads 展示给谁看？

当 Agent 帮用户做决策的时候，"竞价排名 → 展示广告 → 点击付费"这套就不太 work 了。可能会变成某种"Agent 竞价调用"——谁的 API 快、数据准、佣金合理，Agent 就选谁。

不过说实话这块的商业模式到底会怎么演化，我也不太确定。上面说的是我的猜测。

---

## AEO 的七个维度

我们做了个 AEO 审计工具，从七个维度评估网站的 Agent 就绪度。下面一个个说。

### 一、Schema.org 结构化数据

Schema.org 是 Google、微软、Yahoo、Yandex 一起搞的结构化数据规范，用 JSON-LD 格式描述网页内容——产品、文章、活动、FAQ 之类的。

Agent 不会"看"网页。它需要结构化的数据。没有 Schema.org，Agent 就得靠 NLP 去猜页面内容，准确率打折扣。有了它，Agent 可以精确拿到价格、库存、评分这些关键信息。

实现起来其实不难：

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

踩坑提醒：价格字段别用 `"¥14,999"` 这种字符串，要用数字 `"14999"` 加 `priceCurrency`。还有，Schema 数据和页面实际内容不一致的话会被标记为不可信。另外用 JSON-LD 别用 Microdata，Agent 解析效率差很多。

### 二、llms.txt

`llms.txt` 放在网站根目录，专门给 LLM 和 Agent 看的网站摘要。类似 `robots.txt`，但不是说"哪里不能去"，而是说"我是谁、我能干什么"。

Agent 在决定要不要跟你的网站打交道之前，需要快速搞清楚你是谁。`llms.txt` 就是你给 Agent 的电梯演讲。

```markdown
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

一个常见的毛病是把 `llms.txt` 写成营销文案——"我们是业界领先的..."。Agent 不吃这套。它就想知道你有什么 API、能干什么事。

另外最好同时提供一个 `llms-full.txt`，给需要详细信息的场景用。

### 三、robots.txt 的 AI 爬虫策略

robots.txt 大家都熟，但在 Agent 时代它有了新活儿。你要想清楚对不同的 AI 爬虫什么态度。

这里最关键的一个区分很多人搞混了：**Agent 服务爬虫**（比如 `ChatGPT-User`，帮用户实时查你的内容）和**模型训练爬虫**（比如 `GPTBot`，抓你内容去训练模型）是两码事。

前者是给你带流量的，应该允许。后者嘛……看你自己了。

```text
# AI Agent 爬虫：选择性允许
User-agent: ChatGPT-User
Allow: /products/
Allow: /api-docs/
Disallow: /account/

User-agent: ClaudeBot
Allow: /products/
Allow: /api-docs/
Disallow: /account/

# AI 训练爬虫：禁止
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /
```

我见过不少网站直接 `Disallow: /` 一刀切把所有 AI 爬虫封了——连 Agent 流量都挡在外面了，属于误伤。

### 四、HTML 语义质量

这个说起来有点老生常谈，但确实重要。

Agent 解析网页的时候，语义化的 HTML 比一堆 `<div>` 套 `<div>` 好理解太多了。`<nav>` 是导航、`<article>` 是文章、`<main>` 是主体内容——这些标签帮 Agent 快速定位它需要的东西。

对比一下：

```html
<!-- 这种 Agent 看了头疼 -->
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

<!-- 这种就清楚多了 -->
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

几个要注意的：一个页面只有一个 `<h1>`、标题别跳级、图片加 `alt`、别用 `<div onclick>` 代替 `<a>` 或 `<button>`（Agent 认不出来那是个可点的东西）、关键内容别放 `<iframe>` 里。

说实话这些在做无障碍（accessibility）的时候也是老问题了，算是一举两得吧。

### 五、WebMCP 就绪度

这可能是 2026 年最值得关注的新标准了。它让网站可以通过标准协议告诉 Agent："我这里有这些工具你可以调。"

想象一下：航班预订网站通过 WebMCP 告诉 Agent "我能搜航班、查价格、订票、选座"。Agent 就像调函数一样直接用，不用模拟点击网页，不用 scrape HTML。

做法是创建 `/.well-known/webmcp.json`：

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

然后在 HTML head 里加一行声明就行：

```html
<link rel="webmcp" href="/.well-known/webmcp.json" />
```

这里有个很多人会犯的错：工具的 `description` 写得太敷衍。Agent 就是靠这个来决定要不要调用你的，你得把它当 API 文档的摘要来写。还有就是只暴露了读取能力——Agent 不光想查，它还想下单。

### 六、OpenAPI 文档

OpenAPI（就是以前的 Swagger）是描述 REST API 的标准规范。WebMCP 还在早期，但 OpenAPI 是成熟的、大量 Agent 框架（LangChain、AutoGPT、CrewAI 这些）都原生支持的东西。

把你的 OpenAPI 文档公开发布出来，差不多就等于让几百万 Agent 可以直接用你的服务。

```yaml
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

发布到公开 URL（比如 `https://api.geekbest.com/openapi.yaml`），然后在 `llms.txt` 里引用一下。

我见过的最常见的问题：API 文档只有内部版本没有公开版本、`description` 字段全是 "TODO"、认证方式说不清楚。这些细节对人类开发者来说可能还能凑合看，但 Agent 就直接放弃了。

### 七、SSR 还是 CSR

这个问题其实很朴素：Agent 在抓你网页的时候，大多数用的是轻量级 HTTP 请求，不跑 JavaScript。如果你的站是纯 React SPA，Agent 拿到的就是一个空的 `<div id="root"></div>`。啥也没有。

测一下你就知道了：

```bash
curl -s https://yoursite.com/products/123 | grep "产品名称"
```

如果 grep 不出东西来，Agent 也看不到。

用 Next.js、Nuxt.js、Astro 这些框架做 SSR 或 SSG 都行。迁移成本大的话，至少对关键页面做个 prerender。

```javascript
// Next.js SSR 示例
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

---

## 真实数据：大厂们做得怎么样

说了一堆理论，看看实际的。我们拿审计工具测了几家大厂：

| 网站 | AEO 总分 | 等级 | 亮点 | 短板 |
|------|---------|------|------|------|
| **Apple.com** | 50/100 | D | Schema.org 数据还算完整 | 没有 llms.txt，没有 WebMCP，CSR 偏重 |
| **Google.com** | 29/100 | F | HTML 语义质量还行 | 没有 WebMCP（对，推 WebMCP 的那位自己没做 😂）|
| **Amazon.com** | 29/100 | F | 结构化数据丰富 | 封杀了几乎所有 AI 爬虫 |
| **淘宝** | 58/100 | D | Schema 数据还行，有 SSR | 没有公开 API 文档，没有 llms.txt |

几个有意思的点：

淘宝居然是最高分，58 分。我猜是因为阿里多年 SEO 积累下来的底子——结构化数据和 SSR 做得还行。但最高分也就是个 D。

Google 自己才 29 分，F 级。推 WebMCP 标准的公司自己的官网不 AEO-ready，这个讽刺程度大概跟 W3C 官网不过 W3C 验证差不多。

Amazon 在 robots.txt 里把几乎所有 AI User-Agent 都 Disallow 了。防御心态可以理解，但也意味着 Agent 没法推荐 Amazon 的商品——等于自己把流量推出去了。

**总结就是：全球头部网站的 AEO 平均分不到 42 分。**

换句话说，这是蓝海。在 SEO 赛道上跟 Amazon、淘宝竞争基本不可能，但在 AEO 上，一个做得好的中小网站完全可以在 Agent 生态里超过它们。

---

## 商业模式会怎么变

这部分我写得偏推测，可能有些想多了，但我觉得方向大概是这样。

### "流量"这个概念在变

过去 20 年互联网生意的核心公式：**收入 = 流量 × 转化率 × 客单价**。

这个公式的前提是人会来访问你的网站。但如果 Agent 代替用户完成了整个流程呢？PV、UV、跳出率这些东西会越来越不相关。

用户不再"访问"你的网站，Agent 直接"调用"你的服务。

### 新的收费方式

我看到几种可能的方向：

- **按调用次数收费**，类似 Twilio 那种模式
- **订阅制**，Agent 平台按月付费
- **佣金**，Agent 促成交易后抽成
- **竞价排名 2.0**，多个同类服务可选的时候商家出价竞争 Agent 的优先调用

### B2AI？

一个有点奇怪但可能真会发生的事：你的"客户"不再是终端用户，而是服务终端用户的 AI Agent。

这意味着你不需要漂亮的 landing page，但需要清晰的 API 文档。不需要 SEO 外链，但需要在 Agent 的 tool registry 里注册。不需要用户体验设计，需要的是 Agent 体验设计——有人开始叫它 AX（Agent Experience）了。

### 创业机会

每次这种基础设施层面的变化都会冒出一批新公司：AEO 咨询（类似当年的 SEO Agency）、Agent-as-a-Service 平台、Agent Analytics 工具、Agent 商业联盟之类的。

这些方向到底哪个能跑出来我不知道，但如果你在找方向，可以想想。

---

## 行动清单：现在就能做的 10 件事

按优先级排，从第 1 条开始做。

### ① 加 Schema.org 结构化数据（30 分钟）

投入产出比最高的一步。去 [schema.org](https://schema.org) 找到你的业务类型，加个 JSON-LD。

```html
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

用 [Google 结构化数据测试工具](https://search.google.com/test/rich-results) 验证一下。

### ② 写 llms.txt（15 分钟）

根目录放一个 `llms.txt`，简洁写清楚你是谁、能干什么、API 在哪。别写成广告。

```bash
curl https://yoursite.com/llms.txt
```

先 curl 一下看看你有没有，大概率是没有的。

### ③ 调整 robots.txt（15 分钟）

至少覆盖这些 User-Agent：`ChatGPT-User`、`ClaudeBot`、`Bytespider`、`GPTBot`、`Google-Extended`、`PerplexityBot`、`Applebot-Extended`。

想清楚哪些是 Agent 服务（该放行），哪些是训练抓取（看你策略）。

### ④ 确保关键内容不依赖 JS 渲染（2-8 小时）

```bash
curl -s https://yoursite.com/ | head -100
```

看不到核心内容？那就要上 SSR 了。Next.js、Nuxt.js、Astro 都行。实在动不了整站的，至少关键页面做个 prerender。

### ⑤ 改善 HTML 语义（1-4 小时）

```bash
# 查标题层级
curl -s https://yoursite.com | grep -oP '<h[1-6][^>]*>.*?</h[1-6]>'

# 查语义标签使用情况
curl -s https://yoursite.com | grep -cP '<(nav|main|article|section|aside|header|footer)[ >]'
```

目标：每个页面至少用上 `<header>`、`<nav>`、`<main>`、`<footer>`。

### ⑥ 发布 OpenAPI 文档（4-16 小时）

有 API 的话，写一份 OpenAPI 3.x spec 并公开发布。FastAPI 的话自带 `/openapi.json`，Express 可以用 `swagger-jsdoc`。

没有 API？跳到第 ⑧ 步。

### ⑦ 加 WebMCP 声明（1-2 小时）

虽然还在早期，但先布局不亏。

```bash
mkdir -p .well-known
```

先声明 2-3 个最核心的工具就行。

### ⑧ 补全页面 meta 信息（1 小时）

```html
<head>
  <meta name="description" content="准确描述页面内容，200字以内">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="页面标题">
  <meta property="og:description" content="页面描述">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://yoursite.com/current-page">
</head>
```

### ⑨ 加 sitemap.xml（30 分钟）

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

在 robots.txt 里声明位置：`Sitemap: https://yoursite.com/sitemap.xml`

### ⑩ 跑一次 AEO 审计然后定期复测

```bash
npx aeo-audit https://yoursite.com
```

建议每两周跑一次，把分数变化追踪起来。目标是 3 个月内从 F/D 到 B（70+ 分）。

---

## 最后说两句

AEO 这个事到底有多大，我现在其实也说不准。可能真的是下一个 SEO 级别的机会，也可能我高估了 Agent 的渗透速度。

但有几个东西是确定的：AI Agent 在变强、WebMCP 在推进、结构化数据和 API 的重要性在上升。这些趋势不会因为某个标准没成功就消失——就算 WebMCP 换了个名字或者形式变了，"让机器能读懂你的服务并调用它"这个需求是不会变的。

而且上面那些行动清单，大部分本来就是应该做的事情——结构化数据对 SEO 有好处，语义化 HTML 对无障碍有好处，SSR 对性能有好处，OpenAPI 文档对开发者生态有好处。你不会亏。

全球头部网站的平均 AEO 分数不到 42 分。这意味着现在做这些事的成本很低，竞争很小。窗口期会有多久我不知道，但现在肯定不算晚。

好了就写到这。如果你想测自己网站的 AEO 就绪度，可以试试我们开源的审计工具。

---

*有问题可以联系我们，别客气。*
