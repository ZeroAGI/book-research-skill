# 📚 Book Research Skill — 书籍深度研究

> 输入书名 → 四维度并行研究 → 产出「读完报告就不用看书」的综合报告

## 🎯 项目定位

给定任意一本书的名字，自动进行深度研究，产出一份高质量的 Markdown 报告。报告覆盖：

- **📖 核心内容** — 章节结构、关键论点、原创框架、重要案例
- **⭐ 读者评价** — 豆瓣、Goodreads、Amazon 评分与深度书评
- **📰 解读文章** — 知乎、微信公众号、Medium、YouTube/Bilibili 高质量解读
- **👤 作者背景** — 生平、写作动机、相关作品、时代背景

## 🏗️ 架构

```
                    ┌──────────────┐
                    │  输入：书名   │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
    ┌─────────▼──┐  ┌──────▼─────┐  ┌──▼──────────┐  ┌──────────────┐
    │ 📖 书籍内容 │  │ ⭐ 读者评价 │  │ 📰 解读文章 │  │ 👤 作者背景  │
    │  Content   │  │  Reviews   │  │ Interpret.  │  │   Author    │
    └─────────┬──┘  └──────┬─────┘  └──┬──────────┘  └──────┬───────┘
              │            │            │                     │
              └────────────┼────────────┘                     │
                           │                                  │
                    ┌──────▼───────┐                          │
                    │  🔍 交叉分析  │◄─────────────────────────┘
                    │  Synthesis   │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  📝 撰写报告  │
                    │   Report     │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │ reports/     │
                    │ {书名}.md    │
                    └──────────────┘
```

## 🚀 使用方法

```bash
# 中文书
/book-research 穷查理宝典
/book-research 人类简史

# 英文书
/book-research Thinking, Fast and Slow
/book-research The Lean Startup
```

也可以通过 Workflow 调用：
```
Workflow({ name: "book-research", args: { book: "穷查理宝典" } })
```

## 📁 项目结构

```
book-research-skill/
├── .claude/
│   ├── settings.json                  # 权限配置
│   ├── skills/
│   │   └── book-research/
│   │       └── SKILL.md               # Skill 定义（核心）
│   └── workflows/
│       └── book-research.js           # Workflow 编排脚本
├── reports/                           # 报告输出（按书名组织）
│   ├── 穷查理宝典/
│   │   └── 穷查理宝典.md
│   └── thinking-fast-and-slow/
│       └── thinking-fast-and-slow.md
├── CLAUDE.md                          # 项目指令
└── README.md                          # 本文件
```

## 📊 信号源矩阵

| 维度 | 中文书优先 | 英文书优先 |
|------|----------|----------|
| 📖 内容 | 得到/樊登 > 微信读书 > Wikipedia | Blinkist/getabstract > Kindle > Wikipedia |
| ⭐ 评价 | 豆瓣 > 专业书评 > Goodreads | Goodreads > Amazon > NYT/Guardian |
| 📰 解读 | 知乎 > 微信公众号 > Bilibili | Medium > YouTube > 博客 |
| 👤 作者 | 百度百科 > 访谈 > 维基百科 | Wikipedia > YouTube 访谈 > 播客 |

## 📝 报告模板

每份报告包含以下章节：

1. **📋 基本信息** — 元数据 + 评分 + 一句话核心论点
2. **🎯 为什么要读这本书** — 解决什么问题 + 目标读者 + 历史地位
3. **📖 核心内容概要** — 逐章详解 + 核心框架
4. **💡 关键洞见** — 5-10 个最重要思想的深度展开
5. **🔍 批判性分析** — 优缺点 + 专业书评 + 读者批评 + 局限性
6. **📝 金句摘录** — 10-20 句带上下文
7. **🌐 读者评价综合** — 多平台评分 + 评论主题 + 读者画像
8. **📰 最佳解读文章** — 精选高质量解读（带链接）
9. **👤 作者背景** — 生平 + 动机 + 相关作品
10. **🔗 延伸阅读** — 相关书籍 + 资源
11. **⚠️ 研究局限声明** — 信息缺口 + 置信度说明

## ⚙️ 技术细节

- **Workflow 引擎**: Claude Code Workflow API（`agent()` / `parallel()` / `phase()`）
- **并行度**: 4 个 agent 并行研究，内部搜索顺序执行（避免限流）
- **结构化输出**: 每个 agent 使用 JSON Schema 约束返回格式
- **三阶段流水线**: Research → Synthesis → Report
