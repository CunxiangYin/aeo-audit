process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const TIMEOUT = 10000;
const AI_BOTS = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'Anthropic', 'ChatGPT-User', 'CCBot', 'anthropic-ai', 'Claude-Web'];
const OPENAPI_PATHS = ['/api-docs', '/swagger', '/swagger.json', '/openapi.json', '/swagger/v1/swagger.json', '/api/swagger.json'];

async function fetchUrl(url, method = 'get', timeout = TIMEOUT) {
  return axios({ method, url, timeout, maxRedirects: 5, validateStatus: s => s < 500, headers: { 'User-Agent': 'AEO-Audit/1.0' } });
}

// 1. Schema.org structured data (0-15)
function auditSchema($, html) {
  const findings = [];
  let score = 0;
  
  // JSON-LD
  const jsonLd = $('script[type="application/ld+json"]');
  if (jsonLd.length > 0) {
    score += 8;
    findings.push(`找到 ${jsonLd.length} 个 JSON-LD 结构化数据块`);
    jsonLd.each((i, el) => {
      try {
        const data = JSON.parse($(el).html());
        const type = data['@type'] || (Array.isArray(data['@graph']) ? 'Graph' : 'Unknown');
        findings.push(`  → 类型: ${type}`);
      } catch (e) {}
    });
  }
  
  // Microdata
  const microdata = $('[itemscope]');
  if (microdata.length > 0) {
    score += 4;
    findings.push(`找到 ${microdata.length} 个 Microdata 元素`);
  }
  
  // RDFa
  const rdfa = $('[typeof], [property], [vocab]');
  if (rdfa.length > 0) {
    score += 3;
    findings.push(`找到 ${rdfa.length} 个 RDFa 属性`);
  }
  
  if (findings.length === 0) findings.push('未检测到任何结构化数据');
  
  return { name: 'Schema.org 结构化数据', score: Math.min(score, 15), max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 2. llms.txt (0-15)
async function auditLlmsTxt(baseUrl) {
  const findings = [];
  let score = 0;
  
  try {
    const res = await fetchUrl(`${baseUrl}/llms.txt`);
    if (res.status === 200 && res.data && typeof res.data === 'string' && res.data.length > 10) {
      score = 15;
      findings.push(`llms.txt 存在 (${res.data.length} 字节)`);
      const lines = res.data.split('\n').filter(l => l.trim()).slice(0, 3);
      lines.forEach(l => findings.push(`  → ${l.substring(0, 80)}`));
    } else if (res.status === 200) {
      score = 5;
      findings.push('llms.txt 存在但内容为空或过短');
    } else {
      findings.push(`llms.txt 不存在 (HTTP ${res.status})`);
    }
  } catch (e) {
    findings.push('llms.txt 请求失败');
  }
  
  // Also check llms-full.txt
  try {
    const res = await fetchUrl(`${baseUrl}/llms-full.txt`);
    if (res.status === 200 && res.data && typeof res.data === 'string' && res.data.length > 10) {
      if (score < 15) score = Math.min(score + 5, 15);
      findings.push(`llms-full.txt 也存在 (${res.data.length} 字节)`);
    }
  } catch (e) {}
  
  return { name: 'llms.txt 文件', score, max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 3. robots.txt AI crawler policy (0-15)
async function auditRobots(baseUrl) {
  const findings = [];
  let score = 0;
  
  try {
    const res = await fetchUrl(`${baseUrl}/robots.txt`);
    if (res.status !== 200 || !res.data) {
      findings.push('robots.txt 不存在');
      return { name: 'robots.txt AI 爬虫策略', score: 5, max: 15, findings: [...findings, '无 robots.txt 意味着默认允许所有爬虫（包括 AI 爬虫）'], status: 'partial' };
    }
    
    const text = typeof res.data === 'string' ? res.data : String(res.data);
    findings.push('robots.txt 存在');
    
    let allowedBots = 0;
    let blockedBots = [];
    
    for (const bot of AI_BOTS) {
      const regex = new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?(?=User-agent:|$)`, 'i');
      const match = text.match(regex);
      if (match) {
        if (/Disallow:\s*\/\s*$/m.test(match[0])) {
          blockedBots.push(bot);
          findings.push(`  ❌ ${bot} 被禁止`);
        } else {
          allowedBots++;
          findings.push(`  ✅ ${bot} 被允许`);
        }
      } else {
        // Check wildcard
        const wildcard = text.match(/User-agent:\s*\*[\s\S]*?(?=User-agent:|$)/i);
        if (wildcard && /Disallow:\s*\/\s*$/m.test(wildcard[0])) {
          blockedBots.push(bot);
        } else {
          allowedBots++;
        }
      }
    }
    
    if (blockedBots.length === 0) {
      score = 15;
      findings.push('所有主要 AI 爬虫均被允许');
    } else if (blockedBots.length < AI_BOTS.length) {
      score = Math.round(15 * allowedBots / AI_BOTS.length);
      findings.push(`${blockedBots.length} 个 AI 爬虫被屏蔽`);
    } else {
      score = 0;
      findings.push('所有 AI 爬虫均被屏蔽');
    }
  } catch (e) {
    score = 5;
    findings.push('robots.txt 请求失败，默认允许');
  }
  
  return { name: 'robots.txt AI 爬虫策略', score, max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 4. HTML semantic quality (0-15)
function auditSemantics($) {
  const findings = [];
  let score = 0;
  
  const semanticTags = { header: $('header').length, main: $('main').length, nav: $('nav').length, article: $('article').length, section: $('section').length, footer: $('footer').length };
  const usedTags = Object.entries(semanticTags).filter(([,v]) => v > 0);
  
  if (usedTags.length >= 4) { score += 5; findings.push(`语义标签使用良好: ${usedTags.map(([k,v]) => `${k}(${v})`).join(', ')}`); }
  else if (usedTags.length > 0) { score += 2; findings.push(`部分使用语义标签: ${usedTags.map(([k,v]) => `${k}(${v})`).join(', ')}`); }
  else { findings.push('未使用任何语义化 HTML 标签'); }
  
  // Heading hierarchy
  const headings = [];
  $('h1,h2,h3,h4,h5,h6').each((i, el) => headings.push(parseInt(el.tagName[1])));
  const h1Count = headings.filter(h => h === 1).length;
  if (h1Count === 1) { score += 3; findings.push('H1 标签使用正确（仅一个）'); }
  else if (h1Count > 1) { score += 1; findings.push(`存在 ${h1Count} 个 H1 标签（建议仅保留一个）`); }
  else { findings.push('缺少 H1 标签'); }
  
  let hierarchyOk = true;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i-1] > 1) { hierarchyOk = false; break; }
  }
  if (headings.length > 0 && hierarchyOk) { score += 2; findings.push('Heading 层级结构合理'); }
  else if (headings.length > 0) { findings.push('Heading 层级存在跳跃'); }
  
  // Form labels
  const forms = $('form');
  const inputs = $('input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea');
  if (inputs.length > 0) {
    const labeled = inputs.filter((i, el) => {
      const id = $(el).attr('id');
      return $(el).attr('aria-label') || $(el).attr('aria-labelledby') || (id && $(`label[for="${id}"]`).length > 0) || $(el).closest('label').length > 0;
    });
    if (labeled.length === inputs.length) { score += 5; findings.push(`所有 ${inputs.length} 个表单控件都有 label`); }
    else if (labeled.length > 0) { score += 2; findings.push(`${labeled.length}/${inputs.length} 个表单控件有 label`); }
    else { findings.push(`${inputs.length} 个表单控件缺少 label`); }
  } else {
    score += 5;
    findings.push('页面无表单控件（此项默认满分）');
  }
  
  return { name: 'HTML 语义质量', score: Math.min(score, 15), max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 5. WebMCP readiness (0-15)
function auditWebMCP($, html) {
  const findings = [];
  let score = 0;
  
  // toolname / tooldescription attributes
  const toolElements = $('[toolname], [data-toolname], [data-tool-name]');
  if (toolElements.length > 0) {
    score += 8;
    findings.push(`找到 ${toolElements.length} 个带 toolname 属性的元素`);
  }
  
  const toolDesc = $('[tooldescription], [data-tooldescription], [data-tool-description]');
  if (toolDesc.length > 0) {
    score += 4;
    findings.push(`找到 ${toolDesc.length} 个带 tooldescription 属性的元素`);
  }
  
  // navigator.modelContext in scripts
  if (html.includes('navigator.modelContext') || html.includes('modelContext')) {
    score += 3;
    findings.push('检测到 navigator.modelContext 相关代码');
  }
  
  // MCP meta tags or link
  const mcpLink = $('link[rel="mcp"], meta[name="mcp-server"], meta[name="mcp-endpoint"]');
  if (mcpLink.length > 0) {
    score += 5;
    findings.push('找到 MCP 相关 meta/link 标签');
  }
  
  if (findings.length === 0) findings.push('未检测到 WebMCP 相关实现');
  
  return { name: 'WebMCP 就绪度', score: Math.min(score, 15), max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 6. OpenAPI/API docs (0-15)
async function auditOpenAPI(baseUrl) {
  const findings = [];
  let score = 0;
  
  for (const path of OPENAPI_PATHS) {
    try {
      const res = await fetchUrl(`${baseUrl}${path}`, 'head', 5000);
      if (res.status >= 200 && res.status < 400) {
        score += 5;
        findings.push(`✅ ${path} 可访问 (HTTP ${res.status})`);
      }
    } catch (e) {}
  }
  
  // Check for API link in page
  if (score === 0) findings.push('未找到公开的 API 文档端点');
  
  return { name: 'OpenAPI / API 文档', score: Math.min(score, 15), max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

// 7. Content accessibility (0-10 → 0-15)
function auditAccessibility($, html) {
  const findings = [];
  let score = 0;
  
  // Meta description
  const metaDesc = $('meta[name="description"]').attr('content');
  if (metaDesc && metaDesc.length > 20) {
    score += 4;
    findings.push(`Meta description 存在 (${metaDesc.length} 字符)`);
  } else if (metaDesc) {
    score += 2;
    findings.push('Meta description 过短');
  } else {
    findings.push('缺少 meta description');
  }
  
  // Title
  const title = $('title').text();
  if (title && title.length > 0) { score += 2; findings.push(`页面标题: "${title.substring(0, 60)}"`); }
  else { findings.push('缺少页面标题'); }
  
  // SSR vs CSR detection
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
  const scriptTags = $('script[src]').length;
  const noscript = $('noscript').length;
  
  if (bodyText.length > 200) {
    score += 5;
    findings.push(`SSR 友好：页面包含 ${bodyText.length} 字符的可见文本内容`);
  } else if (bodyText.length > 50) {
    score += 2;
    findings.push(`页面文本内容较少 (${bodyText.length} 字符)，可能依赖 JS 渲染`);
  } else {
    findings.push('页面几乎无文本内容，高度依赖 JS 渲染（CSR），对 AI Agent 不友好');
  }
  
  // Open Graph
  const og = $('meta[property^="og:"]');
  if (og.length >= 3) { score += 2; findings.push(`Open Graph 标签完整 (${og.length} 个)`); }
  else if (og.length > 0) { score += 1; findings.push(`Open Graph 标签不完整 (${og.length} 个)`); }
  
  // Canonical
  if ($('link[rel="canonical"]').length) { score += 2; findings.push('存在 canonical 链接'); }
  
  return { name: '内容可访问性', score: Math.min(score, 15), max: 15, findings, status: score >= 10 ? 'pass' : score > 0 ? 'partial' : 'fail' };
}

function generateSuggestions(results) {
  const suggestions = [];
  
  for (const r of results) {
    if (r.status === 'fail') {
      switch (r.name) {
        case 'Schema.org 结构化数据':
          suggestions.push({ priority: 1, title: '添加 JSON-LD 结构化数据', desc: '在页面 <head> 中添加 <script type="application/ld+json"> 标签，描述页面内容类型（Organization, WebPage, Article 等）。这是 AI Agent 理解页面内容的关键信号。', impact: '高' });
          break;
        case 'llms.txt 文件':
          suggestions.push({ priority: 1, title: '创建 /llms.txt 文件', desc: '在网站根目录放置 llms.txt 文件，向 LLM 说明网站用途、关键页面和 API。格式参考 llmstxt.org 规范。', impact: '高' });
          break;
        case 'robots.txt AI 爬虫策略':
          suggestions.push({ priority: 2, title: '优化 robots.txt AI 爬虫策略', desc: '确保 robots.txt 不屏蔽 GPTBot、ClaudeBot、Google-Extended 等 AI 爬虫。如需限制，建议仅限制特定路径而非全站。', impact: '高' });
          break;
        case 'HTML 语义质量':
          suggestions.push({ priority: 2, title: '改善 HTML 语义结构', desc: '使用 <header>, <main>, <nav>, <article>, <section> 等语义标签。确保 Heading 层级合理（单个 H1，不跳级），所有表单控件都有关联 label。', impact: '中' });
          break;
        case 'WebMCP 就绪度':
          suggestions.push({ priority: 3, title: '实现 WebMCP 支持', desc: '为关键交互元素添加 toolname 和 tooldescription 属性，使 AI Agent 能理解页面功能。考虑实现 navigator.modelContext API。', impact: '中' });
          break;
        case 'OpenAPI / API 文档':
          suggestions.push({ priority: 3, title: '提供 OpenAPI 文档', desc: '如有 API，在 /api-docs 或 /openapi.json 提供 OpenAPI 3.0 规范文档，便于 AI Agent 自动发现和调用 API。', impact: '中' });
          break;
        case '内容可访问性':
          suggestions.push({ priority: 1, title: '优化内容可访问性', desc: '确保添加 meta description、Open Graph 标签、canonical 链接。采用 SSR 渲染关键内容，减少 JS 依赖。', impact: '高' });
          break;
      }
    } else if (r.status === 'partial') {
      suggestions.push({ priority: 3, title: `优化: ${r.name}`, desc: `当前评分 ${r.score}/${r.max}，仍有提升空间。${r.findings.join(' ')}`, impact: '低' });
    }
  }
  
  return suggestions.sort((a, b) => a.priority - b.priority);
}

function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

app.post('/api/audit', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: '请提供 URL' });
  
  let parsedUrl;
  try {
    parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
  } catch (e) {
    return res.status(400).json({ error: '无效的 URL' });
  }
  
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
  const targetUrl = parsedUrl.href;
  
  try {
    // Fetch main page
    const pageRes = await fetchUrl(targetUrl);
    const html = typeof pageRes.data === 'string' ? pageRes.data : String(pageRes.data);
    const $ = cheerio.load(html);
    
    // Run all audits
    const [llmsTxt, robots, openapi] = await Promise.all([
      auditLlmsTxt(baseUrl),
      auditRobots(baseUrl),
      auditOpenAPI(baseUrl)
    ]);
    
    const schema = auditSchema($, html);
    const semantics = auditSemantics($);
    const webmcp = auditWebMCP($, html);
    const accessibility = auditAccessibility($, html);
    
    const results = [schema, llmsTxt, robots, semantics, webmcp, openapi, accessibility];
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    // Scale to 100 (max raw = 105 from 7×15)
    const score = Math.round(totalScore * 100 / 105);
    const grade = getGrade(score);
    const suggestions = generateSuggestions(results);
    
    res.json({ url: targetUrl, score, grade, results, suggestions });
  } catch (e) {
    res.status(500).json({ error: `审计失败: ${e.message}` });
  }
});

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => console.log(`AEO Audit running on http://localhost:${PORT}`));
