export interface Section {
  id: string
  title: string
  navTitle?: string
  english: string
  description: string
  empty: string
  topics?: { id: string; title: string; subtitle: string; description: string }[]
  showStatus?: boolean
  aliases?: string[]
}

// id is both the URL prefix and the folder under src/content/. Keep it stable.
// Reorder this array to reorder the navigation. Add a folder to add content.
export const sections: Section[] = [
  {
    id: 'notes', title: '学习笔记', navTitle: '笔记', english: 'NOTEBOOK',
    description: '按主题整理概念、推导与阅读。允许不完整，也欢迎重新理解。',
    empty: '这个主题下还没有公开笔记。', showStatus: true,
    topics: [
      { id: 'reinforcement-learning', title: '强化学习', subtitle: 'Reinforcement learning', description: '从问题的建模，到策略与价值的理解。' },
      { id: 'machine-learning', title: '机器学习', subtitle: 'Machine learning', description: '整理基本方法，连接直觉与推导。' },
      { id: 'mathematics', title: '数学基础', subtitle: 'Mathematics', description: '线性代数、概率与优化中的关键概念。' },
      { id: 'reading', title: '论文与阅读', subtitle: 'Reading notes', description: '记录问题、方法，以及值得继续追问的地方。' },
    ],
  },
  { id: 'posts', title: '文章', english: 'ESSAYS', description: '把一个问题想清楚，再试着讲明白。', empty: '文章还在酝酿中。' },
  { id: 'experiments', title: '实验', english: 'EXPERIMENTS', description: '记录实现、复现与实验中的发现，也记录没有达到预期的结果。', empty: '暂时没有公开的实验记录。', aliases: ['projects'] },
]
export const getSection = (id: string) => sections.find(section => section.id === id)
