# Noos LLM Docs

Nextra 文档站点，部署在 Vercel，GitHub 仓库：https://github.com/CryptoVirtuoso/noos_llm_docs

## 技术栈
- Next.js 13 + Nextra 2.x + TypeScript
- 包管理：pnpm（lockfile 已提交）

## 推送命令
```bash
git add -A && git commit -m "update" && git push https://CryptoVirtuoso:<PAT>@github.com/CryptoVirtuoso/noos_llm_docs.git main
```

## 目录结构
```
pages/
  index.mdx        # NOOS Boot 系统文档
  hliellama.mdx    # HouMo HLIELLama 部署指南
  bug.mdx          # Bug 反馈记录
  analysis.mdx     # houmo-examples-xh2 v1.2.0 SDK 分析
  design.mdx       # NOOS Name 域名系统设计文档
  about.mdx        # 关于页面
  _meta.json       # 左侧导航栏配置
lib/
  newPages.ts      # "new"标签配置（修改版本号触发重新显示）
public/images/     # 图片资源
```

## 导航配置（_meta.json）
- `type: "separator"` 创建分隔标题
- `type: "page"` 放入顶部导航栏
- 普通字符串 = 左侧侧边栏链接

## New 标签机制
- 配置文件：`lib/newPages.ts`
- 用 localStorage 记录已访问页面
- 修改版本日期 → new 标签重新出现
- 逻辑入口：`pages/_app.tsx`

## 图片使用
- 图片放 `public/images/`
- MDX 中引用：`![描述](/images/文件名.png)`
