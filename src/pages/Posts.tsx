import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import SEO from '../components/SEO'

const Posts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  // 获取所有标签
  const mdPosts = getAllPosts()

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    mdPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // 筛选文章
  const filteredPosts = useMemo(() => {
    return mdPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchTerm, selectedTag])

  // 按年份分组文章
  const postsByYear = useMemo(() => {
    const grouped: Record<string, typeof mdPosts> = {}
    filteredPosts.forEach(post => {
      const year = format(new Date(post.date), 'yyyy年')
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(post)
    })
    return grouped
  }, [filteredPosts])

  return (
    <>
      <SEO
        title="文章列表"
        description="我的技术文章和想法分享，涵盖前端开发、后端技术、项目经验等内容"
        keywords="技术文章, 前端开发, 后端技术, 项目经验, 编程教程"
      />
      <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">文章</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          分享技术见解和开发经验
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8 space-y-4">
        {/* 搜索框 */}
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文章标题、内容或标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* 标签筛选 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !selectedTag
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 文章列表 */}
      {Object.entries(postsByYear).length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            没有找到匹配的文章
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(postsByYear).map(([year, yearPosts]) => (
            <div key={year}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-lg mr-4">
                  {year}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-lg">
                  {yearPosts.length}篇文章
                </span>
              </h2>
              
              <div className="space-y-6">
                {yearPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <Link to={`/posts/${post.slug}`}>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {format(new Date(post.date), 'MM月dd日', { locale: zhCN })}
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {post.readTime}分钟
                          </div>
                          <div className="flex items-center">
                            <TagIcon className="h-4 w-4 mr-1" />
                            {post.tags.length}个标签
                          </div>
                        </div>
                      </div>
                      
                      {post.coverImage && (
                        <div className="md:ml-6 mt-4 md:mt-0">
                          <Link to={`/posts/${post.slug}`}>
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-32 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 统计信息 */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {filteredPosts.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">篇文章</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {allTags.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">个标签</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Object.keys(postsByYear).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">个年份</div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Posts