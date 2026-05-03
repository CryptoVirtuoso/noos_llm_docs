const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// 需要追踪 new 标签的页面（路由 → 文件路径）
const TRACKED_PAGES = {
  '/hliellama': 'pages/hliellama.mdx',
  '/bug':       'pages/bug.mdx',
  '/analysis':  'pages/analysis.mdx',
  '/design':    'pages/design.mdx',
}

const versions = {}
for (const [route, filePath] of Object.entries(TRACKED_PAGES)) {
  const fullPath = path.join(__dirname, '..', filePath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  const hash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8)
  versions[route] = hash
}

const output = `// 此文件由 scripts/generate-versions.js 自动生成，请勿手动修改
// 文件内容变化时哈希自动更新，new 标签会重新显示

export const NEW_PAGES: Record<string, string> = ${JSON.stringify(versions, null, 2)}

export const STORAGE_KEY = 'noos_visited_pages'
`

fs.writeFileSync(path.join(__dirname, '../lib/newPages.ts'), output)
console.log('✅ Page versions generated:', versions)
