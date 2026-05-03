/**
 * 在这里管理"new"标签
 * key: 页面路径
 * value: 版本号（内容有重大更新时修改这个值，new 标签会重新出现）
 */
export const NEW_PAGES: Record<string, string> = {
  '/hliellama': '2026-05-03',
  '/bug': '2026-05-03',
  '/analysis': '2026-05-03',
  '/design': '2026-05-03',
}

export const STORAGE_KEY = 'noos_visited_pages'
