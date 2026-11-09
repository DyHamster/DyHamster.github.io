# 龙猫森林 · 编辑与动效精修

**GATE: OPEN 42**（商业首页自动检查仍有未关闭项；功能验证见下文。）

本地预览：`npm ci && npm run build && npm run preview -- --host 127.0.0.1 --port 5190`，打开 [127.0.0.1:5190](http://127.0.0.1:5190/)。线上地址为 [dyhamster.github.io](https://dyhamster.github.io/)。

## 文案与版式

首页先交代作者和关注方向，再给出阅读入口、栏目和主题。保留开场和小屋结尾的诗意。列表、搜索、联系方式使用直接的字句。文章与笔记正文未改写。

| 位置 | 修改前 | 修改后及理由 |
| --- | --- | --- |
| 首页开场 | 身份行之后，再说「你好，我是 DyHamster。」 | 身份统一到「DyHamster · 南京大学学生」；介绍改为「我在学强化学习，也读论文、整理数学笔记。这里放推导、实验过程，还有暂时没想明白的问题。」下一句话说明这里能读到什么。 |
| 首屏按钮与滚动提示 | 「了解作者」「也翻过一页笔记」 | 「关于我」「浏览栏目」，与实际去向一致；首选项仍为「阅读笔记」。 |
| 栏目卡 | 复用各栏的长简介，并标「暂无公开记录」 | 用一句具体的区别，例如「概念、推导与阅读摘记，按主题查找。」有公开内容时读取实际数量，无内容时仍可「查看笔记」。 |
| 近期动态与空状态 | 空的更新区域仍说「目前关注：强化学习、数学与论文阅读」 | 无公开内容时显示「按主题阅读」，下面是四个真实主题及「公开笔记还在整理」；有内容时展示精选与更新，同一篇不重复。列表区分尚未发布与筛选无结果。 |
| 关于 | 「森林里的一盏灯，也是一个人的学习与生活。」之后另起一段介绍身份 | 「你好，我是 DyHamster。」「南京大学学生，主要关注强化学习。」随后用「怎么记录」「从哪里开始」「联系我」组织信息。 |
| 小屋结尾 | 「很高兴在这片森林里，与你相遇。」 | 保留小屋标题；邀请具体化为「有想讨论的问题，或者发现笔记里的疏漏，都欢迎告诉我。」 |

`src/editorial.css` 集中维护三种字体角色。展示标题采用 Georgia 配中文宋体（Songti SC、Noto/思源宋体、SimSun），常用正文字体是本机系统字配苹方或微软雅黑，代码采用 SF Mono / Menlo / Consolas 等宽系列。中文首屏标题只留 0.025em 字距；导航沿用 14–15px，重要介绍和长文为 16–18px。正文 18px、1.95 行高，主要栏约 760px，约可排 42 个全角字；日期、元数据和标签用较小字号并保持对比度，数字用等宽数字。没有新增字体请求，公式仍由 KaTeX 渲染。Edge 的 DevTools 实际读到 Songti SC、PingFang SC、Georgia、Menlo 和 KaTeX_Math；Windows 已设置回退，但未在 Windows 或 Safari 真机验证。

## 龙猫动作与性能

对照基线为 `25e8cce4`。在同一台 arm64 Mac、Edge 156.0.4314.58、1440×900、不限速下，预热后对「首页 → 笔记」各取 5 次。用 `requestAnimationFrame` 帧间隔、Long Tasks、CDP 性能增量和测试侧 React commit 计数。连续录屏另采，避免录屏影响测量。

| 转场指标 | 修改前 | 修改后 |
| --- | ---: | ---: |
| 帧间隔 p50 / p95（各次典型值） | 16.7 / 16.8ms | 16.7 / 16.8ms |
| >25ms 间隔（5 次合计） | 1（最大 33.4ms） | 2（最大 33.3ms） |
| ≥50ms 长任务 | 0 | 0 |
| React commit（中位） | 95 | 7 |
| LayoutCount 增量（中位） | 64 | 6 |
| ScriptDuration 增量（中位） | 86.8ms | 23.8ms |

这台机器没有复现持续掉帧或预热后的解码停顿。旧版每帧驱动 React，且移动时改 `left`、`top`、`width`；浏览器和逐帧记录显示，视觉顿挫还来自起身到迈步缺桥接、步态与路径距离脱节、镜头过渡另走一条时钟、行走末端直接换坐姿与朝向。优化降低了布局和脚本开销，两次测量的典型帧间隔相同。

- 现有状态机保留目的地、导航提交点和取消编号。每帧只在局部更新角色和镜头的 `transform`、影子与透明度；React 负责实际路由和语义阶段。冷启动提前解码，起步锁定本次可用的图集；缺少桥接图或全部森林素材时仍可导航。
- 醒眼、起身中间姿态、稳脚、转身的正面过渡、下蹲和入座由新图集衔接。每格统一脚底基线和比例，步数根据路径弧长决定，最后一脚落稳才转向或坐下。暗部和前景仍沿用各场景空间规则。
- 桌面完整转场约 1.68 秒，正文约在 48% 处提交；减速、落地和坐下留在后半段。快速改选从当前姿势和位置接走，未完成的提交会失效。待机的呼吸和眨眼分开，动作间隔有轻微变化。减少动态时保留快速切换。

连续实录均为「首页 → 笔记 → 关于」：[优化前](editorial-polish/before-journey.webp) · [优化后](editorial-polish/after-journey.webp)。两段都是浏览器连续录制，导出 864×540 WebP；[前测量](editorial-polish/before-performance.json) · [后测量](editorial-polish/after-performance.json) 保留逐帧记录。当前是对齐的手绘帧与距离驱动步态，尚未做到每只脚独立锁地；近看个别姿态的脸部纹理仍可补绘。没有做低端 GPU、Windows 或跨刷新率的性能基准。

## 图标、场景与实际画面

- 功能图标共用 Lucide 线重。笔记本、打开的书、实验工作台、屋顶图标使用小尺寸 SVG；GitHub 保留官方轮廓。较大的木桌、书架和工作台换成透明手绘素材，通过接触阴影落地；关于页使用背景原有的木台阶。 [栏目入口](editorial-polish/entry-icons-1440.png) · [笔记桌](editorial-polish/notes-1440x900.png) · [林间书屋](editorial-polish/posts-1440x900.png) · [实验工作台](editorial-polish/experiments-1440x900.png) · [小屋](editorial-polish/about-1440x900.png) · [深色小屋](editorial-polish/about-dark-1440x900.png)。
- 页签选择 **D + 叶片**：16px 下 D 的内孔与轮廓仍能辨认，浅色底牌也能与深色浏览器界面分离。候选 B 是圆润龙猫，小尺寸仍容易与其他动物剪影混淆，龙猫继续在页面内做主角。 [明暗底上的 16／32／64px 对照](editorial-polish/favicon-comparison.png) · [真实 Edge 页签](editorial-polish/browser-tab.png) · [A 的 SVG](editorial-polish/icons/option-a.svg) · [B 的 SVG](editorial-polish/icons/option-b.svg)。实际接入 SVG、16/32/64 PNG、180 Apple Touch Icon、192/512 manifest 图标，统一版本 `leaf-2`。
- 首页：[1440×900](editorial-polish/home-1440x900.png) · [1366×768](editorial-polish/home-1366x768.png) · [1920×1080](editorial-polish/home-1920x1080.png) · [1024×768](editorial-polish/home-1024x768.png) · [390×844](editorial-polish/home-390x844.png)。[素材来源、提示词及替换位置](editorial-polish/asset-prompts.md)。

## 验证范围

`npm run lint`、`npm run check`、`npm test`（20 项）和 `npm run build`。另用实际 Edge 检查七个窗口、五栏目 20 种双向起点和终点组合、快速改选、前进与后退、刷新和直链、键盘焦点、系统减少动态、深浅主题、音频节点跨页持续和音量操作，以及图集、场景资源失败。完整结果见 [浏览器记录](editorial-polish/browser-verification.json)。

发布源目前有 3 篇草稿、0 篇公开内容。长文、数学公式、目录、代码、上下篇、标签、搜索、分页及实验体验入口用临时构建验证，测试内容已移除，现有草稿和链接保留。 [长文测试画面](editorial-polish/reading-local-fixture-1440x900.png) · [代码排版测试画面](editorial-polish/code-local-fixture-1440x900.png)。

设计技能用于检查字体、对齐、层级和动效。个人博客按内容长度排版，保留紧凑索引、连续滚动、满幅手绘背景、诗意开场与常驻龙猫。商业首页要求的固定整屏章节、独立宣传画面、单一成交入口不适用。工具也把桌面品牌的两行字当成导航折行、未识别栏目 SVG，以及把 `#/notes` 等客户端路由判为页内锚点。浏览器实测五个导航项、分类链接和栏目入口都有效。具体结果、剩余告警和五项豁免见 [设计门禁原始输出](editorial-polish/skill-gate.txt)。门禁记录的小屋手机文案对比度在最终构建中单独修正，390×844 下逐像素核对最低 7.48:1，见 [实际画面](editorial-polish/cottage-mobile-390x844.png)；没有另开门禁轮次。手机背景为轻量竖屏裁切，本轮只验证了手机基本可用。

[布局诊断](editorial-polish/layout.json) · [文案扫描](editorial-polish/copy-lint.txt) · [整页性能](editorial-polish/site-performance.json)。整页扫描在本地预览未发现断开的请求，仍提示部分预备场景图未延迟加载和移动端图集尺寸较大；保留提前准备是为了立即启动跨页动作，按设备分发图集是后续的优化方向。
