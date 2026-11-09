export interface Section {
  id: string;
  title: string;
  navTitle?: string;
  english: string;
  description: string;
  summary?: string;
  empty: string;
  topics?: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
  }[];
  showStatus?: boolean;
  aliases?: string[];
}

// id is both the URL prefix and the folder under src/content/. Keep it stable.
// Reorder this array to reorder the navigation. Add a folder to add content.
export const sections: Section[] = [
  {
    id: "notes",
    title: "学习笔记",
    navTitle: "笔记",
    english: "NOTEBOOK",
    description:
      "强化学习、数学基础与论文阅读中的学习记录。按主题整理，也会随着理解更新。",
    summary: "概念、推导与阅读摘记，按主题查找。",
    empty: "还没有公开笔记。",
    showStatus: true,
    topics: [
      {
        id: "reinforcement-learning",
        title: "强化学习",
        subtitle: "Reinforcement learning",
        description: "从问题的建模，到策略与价值的理解。",
      },
      {
        id: "machine-learning",
        title: "机器学习",
        subtitle: "Machine learning",
        description: "整理基本方法，连接直觉与推导。",
      },
      {
        id: "mathematics",
        title: "数学基础",
        subtitle: "Mathematics",
        description: "线性代数、概率与优化中的关键概念。",
      },
      {
        id: "reading",
        title: "论文与阅读",
        subtitle: "Reading notes",
        description: "记录问题、方法，以及值得继续追问的地方。",
      },
    ],
  },
  {
    id: "posts",
    title: "文章",
    english: "ESSAYS",
    description: "把零散笔记串起来，写成可以从头读下去的讨论。",
    summary: "围绕一个问题，写完整的分析与思考。",
    empty: "还没有公开文章。",
  },
  {
    id: "experiments",
    title: "实验",
    english: "EXPERIMENTS",
    description: "记录实现与复现的过程、结果，以及仍然解释不清的地方。",
    summary: "实现、复现与结果，也记下过程中的问题。",
    empty: "还没有公开实验。",
    aliases: ["projects"],
  },
];
export const getSection = (id: string) =>
  sections.find((section) => section.id === id);
