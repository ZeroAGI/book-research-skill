export const meta = {
  name: 'book-research',
  description: '书籍深度研究：4维度并行研究 → 交叉综合 → 报告撰写',
  whenToUse: '给定书名，产出一份足以替代读书的综合报告',
  phases: [
    { title: 'Research', detail: '4 research agents scan in parallel' },
    { title: 'Synthesis', detail: 'Cross-analyze, identify gaps, verify claims' },
    { title: 'Report', detail: 'Write comprehensive report' },
  ],
}

// ── Schemas ──────────────────────────────────────────────────────────────────

const CONTENT_SCHEMA = {
  type: 'object',
  properties: {
    book_title: { type: 'string' },
    author: { type: 'string' },
    publication_year: { type: 'string' },
    genre: { type: 'string' },
    page_count: { type: 'string' },
    isbn: { type: 'string' },
    structure: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          part: { type: 'string' },
          chapter: { type: 'string' },
          core_argument: { type: 'string' },
          key_concepts: { type: 'array', items: { type: 'string' } },
          key_examples: { type: 'array', items: { type: 'string' } },
        },
        required: ['chapter', 'core_argument'],
      },
    },
    key_ideas: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          significance: { type: 'string' },
        },
        required: ['title', 'description'],
      },
    },
    frameworks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
        },
        required: ['name', 'description'],
      },
    },
    quotes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: { type: 'string' },
          context: { type: 'string' },
          chapter: { type: 'string' },
        },
        required: ['text'],
      },
    },
    knowledge_platform_summaries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          platform: { type: 'string' },
          url: { type: 'string' },
          summary: { type: 'string' },
        },
        required: ['platform', 'summary'],
      },
    },
  },
  required: ['book_title', 'author', 'structure', 'key_ideas', 'quotes'],
}

const REVIEWS_SCHEMA = {
  type: 'object',
  properties: {
    douban: {
      type: 'object',
      properties: {
        score: { type: 'string' },
        rating_count: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
        positive_consensus: { type: 'string' },
        negative_consensus: { type: 'string' },
        top_reviews: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              rating: { type: 'string' },
              excerpt: { type: 'string' },
              is_positive: { type: 'boolean' },
            },
            required: ['excerpt'],
          },
        },
      },
    },
    goodreads: {
      type: 'object',
      properties: {
        score: { type: 'string' },
        rating_count: { type: 'string' },
        review_count: { type: 'string' },
        positive_consensus: { type: 'string' },
        negative_consensus: { type: 'string' },
        top_reviews: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              rating: { type: 'string' },
              excerpt: { type: 'string' },
              is_positive: { type: 'boolean' },
            },
            required: ['excerpt'],
          },
        },
      },
    },
    amazon: {
      type: 'object',
      properties: {
        score: { type: 'string' },
        rating_count: { type: 'string' },
        helpful_reviews_summary: { type: 'string' },
      },
    },
    critic_reviews: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          source: { type: 'string' },
          url: { type: 'string' },
          author: { type: 'string' },
          verdict: { type: 'string' },
          excerpt: { type: 'string' },
        },
        required: ['source', 'excerpt'],
      },
    },
    who_likes: { type: 'array', items: { type: 'string' } },
    who_dislikes: { type: 'array', items: { type: 'string' } },
  },
  required: ['douban', 'goodreads'],
}

const INTERPRETATIONS_SCHEMA = {
  type: 'object',
  properties: {
    articles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          url: { type: 'string' },
          platform: { type: 'string' },
          author: { type: 'string' },
          date: { type: 'string' },
          language: { type: 'string', enum: ['zh', 'en'] },
          type: { type: 'string', enum: ['article', 'video', 'podcast', 'academic'] },
          quality_score: { type: 'number' },
          key_insights: { type: 'array', items: { type: 'string' } },
          summary: { type: 'string' },
        },
        required: ['title', 'platform', 'type', 'summary'],
      },
    },
  },
  required: ['articles'],
}

const AUTHOR_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    name_zh: { type: 'string' },
    bio: { type: 'string' },
    education: { type: 'string' },
    career: { type: 'string' },
    achievements: { type: 'array', items: { type: 'string' } },
    writing_motivation: { type: 'string' },
    interviews: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          url: { type: 'string' },
          platform: { type: 'string' },
          key_quotes: { type: 'array', items: { type: 'string' } },
        },
        required: ['title'],
      },
    },
    related_works: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          year: { type: 'string' },
          relationship: { type: 'string' },
        },
        required: ['title'],
      },
    },
    historical_context: { type: 'string' },
    controversies: { type: 'string' },
    reading_order_suggestion: { type: 'string' },
  },
  required: ['name', 'bio', 'writing_motivation', 'related_works'],
}

const SYNTHESIS_SCHEMA = {
  type: 'object',
  properties: {
    consensus_views: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string' },
          supporting_dimensions: { type: 'array', items: { type: 'string' } },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['claim', 'confidence'],
      },
    },
    contradictions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          topic: { type: 'string' },
          view_a: { type: 'string' },
          view_b: { type: 'string' },
          analysis: { type: 'string' },
        },
        required: ['topic', 'view_a', 'view_b'],
      },
    },
    information_gaps: { type: 'array', items: { type: 'string' } },
    strengths: { type: 'array', items: { type: 'string' } },
    weaknesses: { type: 'array', items: { type: 'string' } },
    overall_assessment: { type: 'string' },
    why_read: { type: 'string' },
    who_should_read: { type: 'string' },
    who_should_not_read: { type: 'string' },
  },
  required: ['consensus_views', 'contradictions', 'information_gaps', 'overall_assessment'],
}

// ── Input Handling ───────────────────────────────────────────────────────────

// Robust args parsing: handle object { book: "name" }, stringified JSON, or plain string
let bookName = 'unknown book'
if (args) {
  if (typeof args === 'object' && args.book) {
    // Normal case: args = { book: "Influence: ..." }
    bookName = args.book
  } else if (typeof args === 'string') {
    try {
      const parsed = JSON.parse(args)
      bookName = (parsed && parsed.book) ? parsed.book : args
    } catch (e) {
      // args is a plain book name string, use directly
      bookName = args
    }
  }
}
const isChinese = /[一-鿿]/.test(bookName)

// Date MUST be passed via args since Date.now()/new Date() are unavailable in workflows.
// SKILL.md instructs the caller to run `date +%Y-%m-%d` and pass the result here.
if (!args || typeof args !== 'object' || !args.date) {
  log('⚠️ WARNING: args.date not provided — the caller must run `date +%Y-%m-%d` and pass it via args.date')
}
const today = (args && typeof args === 'object' && args.date) ? args.date : 'UNKNOWN-DATE'
const year = today.slice(0, 4)
const month = today.slice(0, 7)

// For directory/file naming
const kebabName = isChinese
  ? bookName
  : bookName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

log(`Starting deep research for: "${bookName}" (${isChinese ? 'Chinese' : 'English'} book)`)

// ── Search Group Definitions ─────────────────────────────────────────────────

const SEARCH_GROUPS = [
  {
    key: 'book-content',
    label: '📖 Book Content',
    schema: CONTENT_SCHEMA,
    prompt: `You are a book content researcher. Research the book "${bookName}" thoroughly.

Run these searches ONE AT A TIME (sequential, not parallel):

1. ${bookName} book summary chapter by chapter key ideas
2. ${bookName} 全书内容 章节目录 核心观点 框架
3. site:wikipedia.org "${bookName}"
4. ${bookName} ${isChinese ? '得到 OR 樊登 OR 万维钢 解读' : 'Blinkist OR getabstract summary'}
5. ${bookName} ${isChinese ? '微信读书 热门划线 笔记' : 'Kindle highlights most popular'}
6. ${bookName} key frameworks mental models main arguments
7. ${bookName} ${isChinese ? '思维导图 全书要点 读书笔记' : 'book notes detailed summary'}

For each search, use WebSearch first, then use WebFetch on the most promising 2-3 results to extract detailed content.

YOUR GOAL: Extract the complete intellectual content of the book:
- Book metadata (title, author, year, genre, pages)
- Complete chapter-by-chapter structure with core arguments
- All key ideas (aim for 5-10 major ideas, each with detailed description)
- All original frameworks/models/theories the book proposes
- 15-20 best quotes with context
- Any summaries from knowledge platforms (得到/Blinkist etc.)

Be thorough — this research needs to be comprehensive enough that reading your output replaces reading the book.`,
  },
  {
    key: 'reviews-ratings',
    label: '⭐ Reviews & Ratings',
    schema: REVIEWS_SCHEMA,
    prompt: `You are a book review researcher. Collect comprehensive reader and critic reviews for "${bookName}".

Run these searches ONE AT A TIME:

1. ${isChinese ? `site:book.douban.com ${bookName}` : `${bookName} 豆瓣读书 评分 书评`}
2. ${bookName} 豆瓣 评分 短评 长评 最受欢迎书评
3. site:goodreads.com "${bookName}" review
4. ${bookName} Goodreads rating "most helpful" review
5. ${bookName} Amazon review "most helpful" verified purchase
6. ${bookName} book review ${isChinese ? '书评 文汇报 OR 三联生活周刊' : 'New York Times OR Guardian OR New Yorker'}
7. ${bookName} professional critic review ${year}

For each search, use WebSearch first, then WebFetch on the most promising pages (especially Douban and Goodreads pages).

YOUR GOAL: Build a complete picture of how this book is received:

**Douban (豆瓣)**:
- Score (out of 10), rating count, popular tags
- Positive consensus (what most fans agree on)
- Negative consensus (what critics agree on)
- 3-5 representative reviews (mix of positive and negative), with excerpts and URLs

**Goodreads**:
- Score (out of 5), rating count, review count
- Positive and negative consensus
- 3-5 representative reviews with excerpts

**Amazon**: Score, count, helpful reviews summary

**Professional critics**: Source, verdict, key excerpt

**Reader profiles**: Who loves this book? Who doesn't? Be specific about reader types.

If a platform returns no data, note it honestly.`,
  },
  {
    key: 'interpretations',
    label: '📰 Interpretations',
    schema: INTERPRETATIONS_SCHEMA,
    prompt: `You are a research curator. Find the BEST interpretation articles, videos, and discussions about "${bookName}".

Run these searches ONE AT A TIME:

1. ${isChinese ? `site:zhihu.com ${bookName} 解读 OR 读后感 OR 核心观点` : `${bookName} best analysis article review essay`}
2. ${isChinese ? `${bookName} 知乎 最佳回答 怎么评价 值得读吗` : `site:medium.com "${bookName}" analysis OR review OR summary`}
3. ${bookName} ${isChinese ? '微信公众号 深度解读 读书笔记' : 'blog deep dive review'}
4. site:mp.weixin.qq.com ${bookName}
5. ${isChinese ? `site:bilibili.com ${bookName} 解读 OR 讲解` : `site:youtube.com "${bookName}" summary OR review OR analysis`}
6. ${bookName} podcast interview author discussion
7. ${bookName} ${isChinese ? '播客 解读 讨论' : 'academic review critique scholarly'}

For each search, use WebSearch first, then WebFetch on the top 2-3 results to assess quality and extract insights.

YOUR GOAL: Curate the highest-quality interpretations available online:

For each article/video/podcast found:
- Title, URL, platform, author, date
- Language (zh or en)
- Type (article/video/podcast/academic)
- Quality score (1-5): 5=exceptional original insight, 4=very good analysis, 3=decent summary, 2=basic, 1=superficial
- Key unique insights (what does THIS piece offer that others don't?)
- Summary (3-5 sentences)

Aim for 10-20 total items. Prioritize quality over quantity — a 5-star Zhihu answer is worth more than five 2-star blog posts.
Include both Chinese and English sources regardless of book language.`,
  },
  {
    key: 'author-context',
    label: '👤 Author & Context',
    schema: AUTHOR_SCHEMA,
    prompt: `You are an author/context researcher. Research the author and context behind "${bookName}".

First, search to identify the author if not obvious from the book name:
1. ${bookName} author 作者

Then research the author and context:
2. ${isChinese ? `${bookName} 作者 简介 背景 经历` : `"${bookName}" author biography Wikipedia`}
3. ${bookName} author interview ${isChinese ? '访谈 对话' : 'conversation podcast'}
4. ${bookName} ${isChinese ? '为什么写 写作动机 创作背景' : 'why wrote writing motivation behind the book'}
5. ${bookName} author ${isChinese ? '其他作品 代表作' : 'other books bibliography related works'}
6. ${bookName} ${isChinese ? '时代背景 影响 受启发' : 'historical context influenced by intellectual background'}
7. ${bookName} ${isChinese ? '争议 批评 回应' : 'controversy criticism author response'}

Use WebSearch first, then WebFetch on Wikipedia pages, interview pages, and author profiles.

YOUR GOAL: Build a complete author profile and contextual understanding:

- **Bio**: Name (Chinese + English if applicable), education, career, major achievements
- **Writing motivation**: Why did they write this specific book? What triggered it?
- **Interviews**: Key interviews about this book (title, URL, platform, notable quotes)
- **Related works**: Other books by this author (title, year, relationship to this book)
- **Historical context**: What was happening in the world/field when this was written?
- **Controversies**: Any academic or public debates about the book's claims?
- **Reading order**: If the author has multiple books, what's the recommended reading order?

Be thorough with the author's background — understanding WHO wrote the book and WHY adds crucial context.`,
  },
]

// ── Phase 1: Parallel Research ───────────────────────────────────────────────

phase('Research')
log(`Launching 4 research agents in parallel for "${bookName}"...`)

const results = await parallel(
  SEARCH_GROUPS.map((g) => () =>
    agent(
      `You are a deep book researcher. Today is ${month}. Year: ${year}.

${g.prompt}

IMPORTANT RULES:
- Run searches ONE AT A TIME to avoid rate limits. Wait for each search to complete before starting the next.
- Use WebSearch for searching, WebFetch for extracting content from promising pages.
- Be thorough — this is a "replace reading the book" level research.
- If a search returns no results, try alternative queries (remove site: prefix, try different keywords).
- Include source URLs for every claim.
- For Chinese content, search in Chinese. For English content, search in English.`,
      {
        label: g.label,
        phase: 'Research',
        schema: g.schema,
        model: 'sonnet',
        effort: 'medium',
      }
    )
  )
)

const [content, reviews, interpretations, authorCtx] = results
const validCount = results.filter(Boolean).length
log(`Research complete: ${validCount}/4 dimensions returned data`)

// ── Phase 2: Synthesis ───────────────────────────────────────────────────────

phase('Synthesis')
log('Cross-analyzing findings across all 4 dimensions...')

// Build summary of all research for synthesis agent
const contentSummary = content
  ? `## Book Content Research
- Title: ${content.book_title || bookName}
- Author: ${content.author || 'unknown'}
- Year: ${content.publication_year || 'unknown'}
- Genre: ${content.genre || 'unknown'}
- Chapters found: ${content.structure ? content.structure.length : 0}
- Key ideas: ${content.key_ideas ? content.key_ideas.map((i) => i.title).join(', ') : 'none'}
- Frameworks: ${content.frameworks ? content.frameworks.map((f) => f.name).join(', ') : 'none'}
- Quotes collected: ${content.quotes ? content.quotes.length : 0}
- Knowledge platform summaries: ${content.knowledge_platform_summaries ? content.knowledge_platform_summaries.length : 0}`
  : '## Book Content Research\nNo data collected.'

const reviewsSummary = reviews
  ? `## Reviews & Ratings
- Douban: ${reviews.douban ? reviews.douban.score + ' (' + (reviews.douban.rating_count || '?') + ' ratings)' : 'not found'}
- Goodreads: ${reviews.goodreads ? reviews.goodreads.score + ' (' + (reviews.goodreads.rating_count || '?') + ' ratings)' : 'not found'}
- Amazon: ${reviews.amazon ? reviews.amazon.score : 'not found'}
- Douban positive consensus: ${reviews.douban ? reviews.douban.positive_consensus : 'N/A'}
- Douban negative consensus: ${reviews.douban ? reviews.douban.negative_consensus : 'N/A'}
- Goodreads positive consensus: ${reviews.goodreads ? reviews.goodreads.positive_consensus : 'N/A'}
- Goodreads negative consensus: ${reviews.goodreads ? reviews.goodreads.negative_consensus : 'N/A'}
- Critic reviews: ${reviews.critic_reviews ? reviews.critic_reviews.length : 0}
- Who likes: ${reviews.who_likes ? reviews.who_likes.join(', ') : 'N/A'}
- Who dislikes: ${reviews.who_dislikes ? reviews.who_dislikes.join(', ') : 'N/A'}`
  : '## Reviews & Ratings\nNo data collected.'

const interpSummary = interpretations
  ? `## Interpretation Articles
- Total articles found: ${interpretations.articles ? interpretations.articles.length : 0}
- Chinese articles: ${interpretations.articles ? interpretations.articles.filter((a) => a.language === 'zh').length : 0}
- English articles: ${interpretations.articles ? interpretations.articles.filter((a) => a.language === 'en').length : 0}
- Videos: ${interpretations.articles ? interpretations.articles.filter((a) => a.type === 'video').length : 0}
- Top quality items: ${interpretations.articles ? interpretations.articles.filter((a) => a.quality_score >= 4).map((a) => a.title).join(', ') : 'none'}`
  : '## Interpretation Articles\nNo data collected.'

const authorSummary = authorCtx
  ? `## Author & Context
- Name: ${authorCtx.name || 'unknown'} ${authorCtx.name_zh ? '(' + authorCtx.name_zh + ')' : ''}
- Bio: ${authorCtx.bio ? authorCtx.bio.slice(0, 200) + '...' : 'N/A'}
- Writing motivation: ${authorCtx.writing_motivation ? authorCtx.writing_motivation.slice(0, 200) + '...' : 'N/A'}
- Related works: ${authorCtx.related_works ? authorCtx.related_works.map((w) => w.title).join(', ') : 'none'}
- Interviews found: ${authorCtx.interviews ? authorCtx.interviews.length : 0}
- Controversies: ${authorCtx.controversies || 'none noted'}`
  : '## Author & Context\nNo data collected.'

const allSummary = [contentSummary, reviewsSummary, interpSummary, authorSummary].join('\n\n')

const synthesis = await agent(
  `You are a critical book analyst. Cross-analyze these research findings about "${bookName}".

${allSummary}

## FULL STRUCTURED DATA (for reference)

### Content Data
${JSON.stringify(content, null, 2)}

### Reviews Data
${JSON.stringify(reviews, null, 2)}

### Interpretations Data
${JSON.stringify(interpretations, null, 2)}

### Author Data
${JSON.stringify(authorCtx, null, 2)}

## YOUR TASK

Perform a critical cross-analysis:

1. **Consensus views**: What do multiple dimensions agree on? Mark confidence:
   - high: 3-4 dimensions support this
   - medium: 2 dimensions support
   - low: only 1 dimension mentions this

2. **Contradictions**: Where do dimensions disagree? E.g., the book claims X but readers critique Y. These are the MOST VALUABLE insights.

3. **Information gaps**: What couldn't we find? Be honest.

4. **Strengths**: Book's genuine strengths (supported by evidence across dimensions)

5. **Weaknesses**: Book's genuine weaknesses (supported by evidence)

6. **Overall assessment**: A fair, balanced 2-3 sentence assessment

7. **Who should read / who shouldn't**: Be specific about reader profiles`,
  {
    label: '🔍 Cross-Analysis',
    phase: 'Synthesis',
    schema: SYNTHESIS_SCHEMA,
    effort: 'high',
  }
)

log('Synthesis complete. Writing final report...')

// ── Phase 3: Report Writing ──────────────────────────────────────────────────

phase('Report')

const reportPath = `reports/${kebabName}/${kebabName}-${today}.md`
const fullData = JSON.stringify({ content, reviews, interpretations, authorCtx, synthesis }, null, 2)

const report = await agent(
  `You are an expert book report writer. Write a comprehensive deep research report for "${bookName}".

## OUTPUT FILE
Write the report to: ${reportPath}

## ALL RESEARCH DATA

${fullData}

## REPORT TEMPLATE

Follow this exact structure. Write in Chinese (unless the user specified English). Be thorough — this report should make reading the original book unnecessary.

# 📚 ${bookName} — 深度研究报告

> **生成日期**：${month} | **研究方法**：AI 四维度并行研究 | **信息来源**：公开渠道
> ⚠️ 本报告由 AI 系统性研究生成，仅供学习参考。

---

## 📋 基本信息
[Table with: 书名, 作者, 出版年, 类型, 页数, 豆瓣评分, Goodreads评分, 一句话核心论点]

## 🎯 为什么要读这本书
[解决什么问题? 目标读者? 历史地位与影响力?]

## 📖 核心内容概要
[全书结构概述 + 分章节/分部分详解，每章的核心论点、关键概念、重要案例]
[核心框架与模型列表]

## 💡 关键洞见
[5-10 个最重要思想，每个展开 3-5 句详细解释：是什么、为什么重要、如何应用]

## 🔍 批判性分析
[优势 + 不足 + 专业书评综合 + 常见读者批评 + 局限性]
[特别标注 synthesis.contradictions 中发现的矛盾]

## 📝 金句摘录
[10-20 句，带上下文说明]

## 🌐 读者评价综合
[豆瓣: 评分+短评关键词+好评共识+差评共识+代表性长评]
[Goodreads: 评分+好评代表+差评代表]
[Amazon: 评分+评论摘要]
[谁会喜欢 vs 谁不会喜欢 表格]

## 📰 最佳解读文章
[中文解读 + 英文解读 + 视频解读，每个带链接、来源、核心观点]

## 👤 作者背景
[作者简介 + 写作动机 + 相关作品表格 + 阅读建议]

## 🔗 延伸阅读
[相关书籍 + 相关资源]

## ⚠️ 研究局限声明
[信息时效 + 覆盖范围 + 信息缺口（从 synthesis.information_gaps）]

## WRITING GUIDELINES:
- Write in Chinese by default
- Every factual claim needs a source reference [来源](url) where available
- Use the ACTUAL DATA from research — don't make up ratings, quotes, or reviews
- If data is missing for a section, write "该部分信息未能获取" rather than fabricating
- Confidence markers: 🟢 高置信(多源验证) 🟡 中置信(单源可信) 🔴 低置信(信息不足)
- The report should be 500+ lines — be comprehensive, not brief
- Preserve original Douban score (/10) and Goodreads score (/5) — don't convert
- Include ALL quotes collected (aim for 15+)
- Include ALL interpretation articles found with links`,
  {
    label: '📝 Report Writer',
    phase: 'Report',
    effort: 'high',
  }
)

log(`Report written to ${reportPath}`)

return {
  book: bookName,
  language: isChinese ? 'zh' : 'en',
  report_path: reportPath,
  dimensions_completed: validCount,
  chapters_found: content && content.structure ? content.structure.length : 0,
  key_ideas: content && content.key_ideas ? content.key_ideas.length : 0,
  quotes: content && content.quotes ? content.quotes.length : 0,
  interpretations_found: interpretations && interpretations.articles ? interpretations.articles.length : 0,
  douban_score: reviews && reviews.douban ? reviews.douban.score : 'N/A',
  goodreads_score: reviews && reviews.goodreads ? reviews.goodreads.score : 'N/A',
  consensus_views: synthesis && synthesis.consensus_views ? synthesis.consensus_views.length : 0,
  contradictions_found: synthesis && synthesis.contradictions ? synthesis.contradictions.length : 0,
  information_gaps: synthesis && synthesis.information_gaps ? synthesis.information_gaps.length : 0,
}
