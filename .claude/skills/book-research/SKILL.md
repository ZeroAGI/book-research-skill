---
name: book-research
description: >-
  书籍深度研究报告：从书籍内容、读者评价、解读文章、作者背景四个维度并行研究，
  产出一份足以替代读书的综合报告。
  产出落盘于 reports/{book-name}/{book-name}-{YYYY-MM-DD}.md。
  所有产出仅供学习参考。
user_invocable: true
---

# 书籍深度研究报告

对 $ARGUMENTS 进行四维度深度研究，产出一份「读完报告就不用花时间看书」的综合报告。

> **目标**：系统性提取一本书的全部价值 — 内容精华、批判分析、读者共识、作者背景，一份报告替代一本书。

## 核心原则

1. **综合性** — 覆盖内容摘要、批判性分析、读者评价、作者背景四个维度，目标是替代读书
2. **批判性** — 不做"读书笔记翻译"，必须呈现正反两面分析，专业书评与大众评价并呈
3. **可验证性** — 每个观点、引述必须有来源链接或明确标注出处
4. **诚实原则** — 找不到的内容诚实标注「未找到」，不编造数据或观点
5. **中英双语覆盖** — 自动检测书籍语言，调整搜索策略和信息源优先级

## 语言策略

根据书名自动判断书籍语言，调整信息源优先级：

| 书籍语言 | 信息源优先级 | 报告语言 |
|---------|------------|---------|
| **中文书** | 豆瓣 > 知乎 > 微信公众号 > 得到/樊登 > 小红书 > Goodreads | 中文 |
| **英文书** | Goodreads > Amazon > Medium > YouTube > Wikipedia > 豆瓣 | 中文（除非用户指定英文） |

## 信号源矩阵

### 第一维度：书籍内容提取（Book Content）

| 渠道 | 搜什么 | 要提取的信息 |
|------|--------|-------------|
| **Wikipedia** | 书籍词条 | 简介、章节结构、主要论点、争议 |
| **书籍摘要平台** | getabstract / Blinkist / 四千字 | 专业摘要、核心框架、关键结论 |
| **得到 / 樊登读书** | 知识付费平台的书籍解读 | 中文语境下的核心观点提炼 |
| **万维钢 / 精英日课** | 深度解读专栏 | 跨学科视角的深度分析 |
| **微信读书 / Kindle** | 在线阅读平台 | 目录结构、热门划线、读者笔记 |
| **书籍官网 / 出版社** | 官方介绍页 | 作者自述、章节概要、推荐语 |

### 第二维度：读者评价收集（Reviews & Ratings）

| 渠道 | 搜什么 | 要提取的信息 |
|------|--------|-------------|
| **豆瓣读书** | 评分 + 短评 + 长评 | 评分分布、热门短评、置顶长评、标签 |
| **Goodreads** | 评分 + reviews | 均分、评分人数、Top reviews（正面+负面） |
| **Amazon** | 客户评论 | 星级分布、Most helpful reviews、verified purchase |
| **专业书评** | 报纸/杂志书评 | NYT、卫报、纽约客等专业书评人的评价 |
| **豆瓣书评长文** | 高赞长评 | 深度分析型书评（3000字以上） |

### 第三维度：解读文章收集（Interpretations）

| 渠道 | 搜什么 | 要提取的信息 |
|------|--------|-------------|
| **知乎** | 深度回答 + 专栏文章 | 高赞解读、框架梳理、与其他书的对比 |
| **微信公众号** | 深度解读文章 | 独到见解、应用案例、读书笔记 |
| **Medium / 博客** | 英文深度分析 | 独立思考者的批判性分析 |
| **YouTube / Bilibili** | 视频解读 | 高播放量的书籍解读视频核心观点 |
| **播客** | 相关播客讨论 | 作者访谈、书籍讨论、深度对话 |
| **学术引用** | Google Scholar | 学术界对该书论点的引用与评价 |

### 第四维度：作者与背景（Author & Context）

| 渠道 | 搜什么 | 要提取的信息 |
|------|--------|-------------|
| **维基百科** | 作者词条 | 生平、学术背景、主要成就 |
| **作者访谈** | YouTube / 播客访谈 | 写作动机、创作过程、核心思想 |
| **作者其他作品** | 书目 | 作品列表、阅读顺序建议、思想演变 |
| **时代背景** | 写作年代的社会背景 | 影响本书的历史事件、学术思潮 |
| **争议与回应** | 学术争议 | 对本书论点的学术批评、作者回应 |

## 执行方式

**使用 Workflow 自动编排**（推荐）：

调用 Workflow 工具执行四维度并行研究，自动控制并发避免 API 限流：

```
Workflow({ name: "book-research" })
```

可传入参数：
```
Workflow({ name: "book-research", args: { book: "穷查理宝典", date: "2026-06-29" } })
Workflow({ name: "book-research", args: { book: "Thinking, Fast and Slow", date: "2026-06-29" } })
```

如果用户直接输入书名（$ARGUMENTS 非空），自动传入（date 使用当天日期）：
```
Workflow({ name: "book-research", args: { book: "$ARGUMENTS", date: "YYYY-MM-DD" } })
```

Workflow 完成后会自动：
1. 在 4 个研究维度中并行扫描（受控并发，不超过 RPM 限制）
2. 交叉分析所有发现，识别共识与矛盾
3. 撰写完整报告并落盘

**手动执行**（备用）：

如需更细粒度控制，可按以下步骤手动执行。

## 工作流（手动模式）

```
Task Progress:
- [ ] 1. 确认书籍基本信息（书名、作者、出版年、ISBN）
- [ ] 2. 书籍内容研究（核心论点、章节结构、关键框架）
- [ ] 3. 读者评价收集（豆瓣 / Goodreads / Amazon / 专业书评）
- [ ] 4. 解读文章收集（知乎 / 微信公众号 / Medium / YouTube）
- [ ] 5. 作者背景研究（生平、动机、相关作品）
- [ ] 6. 交叉分析与综合（共识、矛盾、信息缺口）
- [ ] 7. 撰写深度研究报告
```

### Step 1：确认书籍基本信息

搜索确认以下信息：
```
{book_name} 作者 出版年 ISBN
{book_name} author publication year genre
```

确认：书名（中英文）、作者、出版年份、类型/分类、页数、ISBN

### Step 2：书籍内容研究

**搜索关键词组合**（每组取 Top 5-10 结果，顺序执行）：

```
书籍摘要与核心观点:
- {book_name} 全书内容 章节目录 核心观点
- {book_name} book summary chapter by chapter
- {book_name} key ideas main arguments framework
- {book_name} 全书要点 思维导图

摘要平台:
- site:getabstract.com {book_name}
- site:blinkist.com {book_name}
- {book_name} Blinkist OR getabstract summary

知识付费解读:
- {book_name} 得到 OR 樊登 OR 万维钢 解读
- {book_name} 精英日课 OR 每天听本书

在线阅读:
- {book_name} 微信读书 热门划线
- {book_name} Kindle highlights most popular

Wikipedia:
- {book_name} wikipedia
- {book_name} 维基百科
```

**提取模板**：

```markdown
### 章节 N：[章节标题]
- **核心论点**：一句话
- **关键框架/模型**：如有
- **重要案例**：如有
- **金句**：如有
```

### Step 3：读者评价收集

**搜索关键词组合**：

```
豆瓣:
- site:book.douban.com {book_name}
- site:douban.com {book_name} 书评
- {book_name} 豆瓣 评分 短评 长评
- {book_name} 豆瓣读书 最受欢迎的书评

Goodreads:
- site:goodreads.com {book_name} review
- {book_name} Goodreads rating reviews
- {book_name} Goodreads "most helpful" review

Amazon:
- site:amazon.com {book_name} review "most helpful"
- {book_name} Amazon review verified purchase

专业书评:
- {book_name} book review New York Times OR Guardian OR New Yorker
- {book_name} professional critic review {year}
- {book_name} 书评 文汇报 OR 读书杂志 OR 三联生活周刊
```

**提取模板**：

```markdown
### [平台] 评价概要
- **评分**：X / Y（N 人评价）
- **评分分布**：5星 X% / 4星 X% / ...
- **核心好评共识**：用 2-3 句话总结
- **核心差评共识**：用 2-3 句话总结
- **代表性评论**：
  - 好评：「...」— [用户名](链接)
  - 差评：「...」— [用户名](链接)
```

### Step 4：解读文章收集

**搜索关键词组合**：

```
知乎:
- site:zhihu.com {book_name} 解读 OR 读后感 OR 核心观点
- site:zhihu.com {book_name} 怎么评价 OR 值得读吗
- {book_name} 知乎 最佳回答

微信公众号:
- site:mp.weixin.qq.com {book_name}
- {book_name} 微信公众号 深度解读
- {book_name} 公众号 读书笔记

英文博客:
- site:medium.com {book_name} review OR analysis OR summary
- {book_name} best analysis article blog
- {book_name} deep dive review essay

视频:
- site:youtube.com {book_name} summary OR review OR analysis
- site:bilibili.com {book_name} 解读 OR 讲解
- {book_name} YouTube 最佳解读 OR best video summary

播客:
- {book_name} podcast interview author
- {book_name} 播客 解读 OR 讨论

学术引用:
- site:scholar.google.com {book_name}
- {book_name} academic review OR citation OR critique
```

**提取模板**：

```markdown
### [文章标题](链接)
- **来源**：平台 · 作者 · 日期
- **质量评估**：⭐⭐⭐⭐⭐ (1-5)
- **独到见解**：该文章最独特的观点/分析角度
- **核心摘要**：3-5 句话
```

### Step 5：作者背景研究

**搜索关键词组合**：

```
作者生平:
- {author_name} 简介 OR biography OR Wikipedia
- {author_name} 作者 背景 学术经历

写作动机:
- {author_name} interview about {book_name}
- {author_name} why wrote {book_name}
- {author_name} 为什么写 {book_name} OR 写作动机

相关作品:
- {author_name} 其他作品 OR other books OR bibliography
- {author_name} 阅读顺序 OR reading order

时代背景:
- {book_name} 创作背景 OR historical context
- {book_name} influenced by OR 受影响于
```

### Step 6：交叉分析

将四个维度的发现交叉对比：

1. **共识验证**：多个维度对同一观点的佐证 → 高置信度
2. **矛盾发现**：内容声称 vs 读者批评 的矛盾 → 最有分析价值
3. **信息缺口**：哪些维度未找到足够信息 → 诚实标注
4. **置信度标注**：
   - 🟢 高置信：多平台/多维度验证
   - 🟡 中置信：单一来源但可信
   - 🔴 低置信：信息不足或有争议

### Step 7：撰写报告

报告落盘路径：
- 中文书：`reports/{书名}/{书名}-{YYYY-MM-DD}.md`
- 英文书：`reports/{book-name-kebab-case}/{book-name-kebab-case}-{YYYY-MM-DD}.md`

## 报告模板

```markdown
# 📚 {Book Name} — 深度研究报告

> **生成日期**：{YYYY-MM-DD} | **研究方法**：AI 四维度并行研究 | **信息来源**：公开渠道
> ⚠️ 本报告由 AI 系统性研究生成，仅供学习参考。引用信息已尽可能标注来源，但可能存在遗漏或偏差。

---

## 📋 基本信息

| 项目 | 信息 |
|------|------|
| **书名** | {中文名} / {英文名} |
| **作者** | {作者名} |
| **出版年** | {年份} |
| **类型** | {分类} |
| **页数** | {页数} |
| **豆瓣评分** | {X.X}/10（{N}人评价）|
| **Goodreads** | {X.XX}/5（{N} ratings）|
| **一句话核心论点** | {用一句话概括全书最核心的观点} |

---

## 🎯 为什么要读这本书

### 这本书解决什么问题？
{具体描述}

### 目标读者是谁？
{描述目标读者画像}

### 历史地位与影响力
{描述本书在其领域的地位、影响力、获奖情况}

---

## 📖 核心内容概要

### 全书结构
{描述全书的整体架构和逻辑脉络}

### 分章节/分部分详解

#### Part I / 第一部分：{标题}

**第 1 章：{章节名}**
- 核心论点：...
- 关键概念/框架：...
- 重要案例/证据：...

{... 对每个主要章节重复 ...}

### 核心框架与模型
{列出书中提出的所有原创框架、模型、理论，每个用 2-3 句话解释}

---

## 💡 关键洞见

> 全书最重要的 5-10 个思想，每个展开详细解释。

### 洞见 1：{标题}
{详细解释这个洞见：是什么、为什么重要、原书如何论证、可以如何应用}

### 洞见 2：{标题}
{...}

{... 5-10 个洞见 ...}

---

## 🔍 批判性分析

### 本书的优势
{3-5 个优势，带具体说明}

### 本书的不足
{3-5 个不足，综合专业书评和读者反馈}

### 专业书评综合
{综合 NYT / Guardian / 专业期刊等的评价}

### 常见读者批评
{综合豆瓣差评 / Goodreads 低分评论的共性问题}

### 学术界评价（如适用）
{学术界对本书论点的接受/质疑情况}

### 局限性
{作者视角/方法论/数据的局限}

---

## 📝 金句摘录

> 10-20 句最具影响力的引用，附上下文说明。

1. 「{引用原文}」— 第 X 章
   *上下文：{简述这句话出现的背景和含义}*

2. {... 更多金句 ...}

---

## 🌐 读者评价综合

### 豆瓣读书
- **评分**：{X.X}/10（{N}人评价）
- **短评关键词**：{高频标签}
- **好评共识**：{总结}
- **差评共识**：{总结}
- **代表性长评**：
  - [{评论标题}]({链接}) — ⭐{评分} — {核心观点摘要}

### Goodreads
- **评分**：{X.XX}/5（{N} ratings, {N} reviews）
- **好评代表**：「{引用}」
- **差评代表**：「{引用}」

### Amazon
- **评分**：{X.X}/5（{N} ratings）
- **Most Helpful 评论摘要**：{总结}

### 谁会喜欢 vs 谁不会喜欢

| 会喜欢 ✅ | 不会喜欢 ❌ |
|----------|------------|
| {读者类型1} | {读者类型1} |
| {读者类型2} | {读者类型2} |

---

## 📰 最佳解读文章

> 从知乎、微信公众号、Medium、YouTube 等平台精选的高质量解读。

### 中文解读

1. **[{文章标题}]({链接})**
   - 来源：{平台} · {作者} · {日期}
   - 核心观点：{独到见解摘要}

2. {... 更多文章 ...}

### 英文解读

1. **[{Article Title}]({url})**
   - Source: {platform} · {author} · {date}
   - Key insight: {summary}

2. {... more articles ...}

### 视频解读

1. **[{视频标题}]({链接})**
   - 平台：{YouTube/Bilibili} · {频道} · {播放量}
   - 核心观点：{摘要}

---

## 👤 作者背景

### 作者简介
{生平、教育背景、职业经历、主要成就}

### 写作动机
{为什么写这本书、创作背景、受什么启发}

### 相关作品
| 作品 | 年份 | 关系 |
|------|------|------|
| {书名} | {年} | {与本书的关系：前作/续作/相关} |

### 阅读建议
{建议的阅读顺序、是否需要先读其他书}

---

## 🔗 延伸阅读

### 相关书籍
- 《{书名}》— {作者} — {为什么推荐}

### 相关资源
- [{资源名}]({链接}) — {简述}

---

## ⚠️ 研究局限声明

- **信息时效**：本报告生成于 {date}，部分数据可能已更新
- **覆盖范围**：{标注哪些维度信息充足，哪些不足}
- **内容来源**：所有信息来自公开渠道搜索，未获取书籍全文
- **AI 局限**：AI 可能存在理解偏差，建议对感兴趣的部分回到原书核实
```

## 搜索与抓取规范

1. **使用 WebSearch 进行搜索**，每组关键词取 Top 5-10 结果
2. **使用 WebFetch 抓取关键页面**，提取原始内容和数据
3. **去重**：同一观点出现在多个渠道只记录一次，但标注多渠道验证
4. **引用格式**：`[标题](url) · 平台 · 日期`
5. **不提供盗版链接**：书籍内容仅用于分析参考，报告中不包含 PDF/EPUB 下载地址
6. **评分保留原始体系**：豆瓣用 /10，Goodreads 用 /5，不做换算
