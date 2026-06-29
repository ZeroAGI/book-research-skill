# Book Research Skill — 项目指令

## 项目概述

基于 Claude Code 的书籍深度研究 Skill。给定书名，从内容、评价、解读、作者四个维度并行研究，产出一份「读完报告就不用看书」的综合报告。

## 项目结构

```
.claude/
├── settings.json                          # 权限配置
├── skills/book-research/SKILL.md          # Skill 定义
└── workflows/book-research.js             # Workflow 编排脚本
reports/                                   # 报告输出目录
CLAUDE.md                                  # 本文件
README.md                                  # 项目说明
```

## 报告目录结构

```
reports/
├── 穷查理宝典/
│   └── 穷查理宝典-2026-06-29.md
├── thinking-fast-and-slow/
│   └── thinking-fast-and-slow-2026-06-29.md
└── 人类简史/
    └── 人类简史-2026-06-29.md
```

## 报告命名规范

| 书籍语言 | 目录名 | 文件名 |
|---------|--------|--------|
| 中文 | `reports/{书名}/` | `{书名}-{YYYY-MM-DD}.md` |
| 英文 | `reports/{book-name-kebab-case}/` | `{book-name-kebab-case}-{YYYY-MM-DD}.md` |

## 核心原则（最高优先级）

1. **综合性** — 覆盖全部四个维度（内容、评价、解读、作者），目标是替代读书
2. **批判性** — 必须呈现正反两面，不做"读书笔记翻译"
3. **可验证性** — 每个观点标注来源，关键评价至少 2 个平台交叉验证
4. **诚实原则** — 找不到的内容诚实标注「未找到」，不编造
5. **中英双语** — 根据书籍语言自动调整信息源优先级

## 报告语言与风格

- 默认中文报告（除非用户指定英文）
- 风格：深入但易读，像写给聪明朋友的深度书评
- 引用必须标注来源链接
- 评分使用原始平台评分（豆瓣 /10，Goodreads /5）
- 不提供盗版下载链接

## 使用方法

```
/book-research 穷查理宝典
/book-research Thinking, Fast and Slow
/book-research 人类简史
```

## 四维度研究框架

| 维度 | Agent | 目标 |
|------|-------|------|
| 📖 书籍内容 | book-content | 章节结构、核心论点、框架模型、金句 |
| ⭐ 读者评价 | reviews-ratings | 豆瓣、Goodreads、Amazon、专业书评 |
| 📰 解读文章 | interpretations | 知乎、微信公众号、Medium、YouTube/Bilibili |
| 👤 作者背景 | author-context | 作者生平、写作动机、相关作品、时代背景 |

## 置信度标注

- 🟢 高置信：多平台 / 多维度验证
- 🟡 中置信：单一来源但可信
- 🔴 低置信：信息不足或有争议

## 注意事项

- 搜索结果有时效性，报告标注生成日期
- 豆瓣和 Goodreads 评分体系不同，不直接对比
- 对争议性内容，标注不同立场的观点
- AI 可能存在理解偏差，建议对感兴趣的部分回到原书核实
