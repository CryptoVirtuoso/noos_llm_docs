import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEW_PAGES, STORAGE_KEY } from '../lib/newPages'

function NewBadgeManager() {
  const router = useRouter()

  useEffect(() => {
    const currentPath = router.pathname

    // 当前页面标记为已访问
    const visited: Record<string, string> = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    )
    if (NEW_PAGES[currentPath]) {
      visited[currentPath] = NEW_PAGES[currentPath]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited))
    }

    // 注入/移除 new 标签
    const updateBadges = () => {
      const latest: Record<string, string> = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '{}'
      )

      // 移除旧标签
      document.querySelectorAll('.noos-new-badge').forEach(el => el.remove())

      // 给未访问的页面添加 new 标签
      Object.entries(NEW_PAGES).forEach(([path, version]) => {
        if (latest[path] === version) return // 已访问，跳过

        const link = document.querySelector(`a[href="${path}"]`)
        if (link && !link.querySelector('.noos-new-badge')) {
          const badge = document.createElement('span')
          badge.className = 'noos-new-badge'
          badge.textContent = 'new'
          Object.assign(badge.style, {
            background: '#00E676',
            color: '#000',
            fontSize: '10px',
            fontWeight: '700',
            padding: '1px 7px',
            borderRadius: '10px',
            marginLeft: '6px',
            verticalAlign: 'middle',
            display: 'inline-block',
            lineHeight: '1.6',
          })
          link.appendChild(badge)
        }
      })
    }

    const timer = setTimeout(updateBadges, 150)
    return () => clearTimeout(timer)
  }, [router.pathname])

  return null
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NewBadgeManager />
      <Component {...pageProps} />
    </>
  )
}
