/**
 * 在这里管理"new"标签
 * key: 页面路径
 * value: 版本号（内容有重大更新时修改这个值，new 标签会重新出现）
 */
export const NEW_PAGES: Record<string, string> = {
  '/': '2026-04-30',
  '/hliellama': '2026-04-30',
  '/bug': '2026-04-30',
  '/design': '2026-04-30',
}

export const STORAGE_KEY = 'noos_visited_pages'
