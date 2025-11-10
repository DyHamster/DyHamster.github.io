import { useEffect, useRef } from 'react'

interface CommentsProps {
  repo: string
  issueTerm?: string
  theme?: 'github-light' | 'github-dark' | 'preferred-color-scheme' | 'github-dark-orange' | 'icy-dark' | 'dark-blue' | 'photon-dark'
  label?: string
  loading?: string
}

const Comments = ({ 
  repo, 
  issueTerm = 'pathname', 
  theme = 'preferred-color-scheme', 
  label = 'comment', 
  loading = '加载评论中...' 
}: CommentsProps) => {
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!commentsRef.current) return

    // 清除之前的评论
    commentsRef.current.innerHTML = ''

    // 创建 utterances 脚本
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', repo)
    script.setAttribute('issue-term', issueTerm)
    script.setAttribute('theme', theme)
    script.setAttribute('label', label)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    // 添加加载提示
    const loadingDiv = document.createElement('div')
    loadingDiv.textContent = loading
    loadingDiv.style.padding = '20px'
    loadingDiv.style.textAlign = 'center'
    loadingDiv.style.color = 'var(--color-text-secondary)'
    commentsRef.current.appendChild(loadingDiv)

    // 监听脚本加载完成
    script.onload = () => {
      if (loadingDiv.parentNode) {
        loadingDiv.remove()
      }
    }

    // 监听脚本加载错误
    script.onerror = () => {
      loadingDiv.textContent = '评论加载失败，请刷新页面重试'
      loadingDiv.style.color = 'var(--color-danger)'
    }

    commentsRef.current.appendChild(script)

    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = ''
      }
    }
  }, [repo, issueTerm, theme, label, loading])

  return (
    <div className="comments-container" style={{
      width: '100%',
      marginTop: '2rem'
    }}>
      <div ref={commentsRef} />
    </div>
  )
}

export default Comments