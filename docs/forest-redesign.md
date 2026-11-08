# 龙猫与森林：设计、素材与验收

> 后续已升级为独立角色与跨栏目联动。当前实现、素材及演示见 [龙猫引路说明](scene-journey.md)。下文保留初版设计记录。

## 设计判断

保留 React 18 / Vite / HashRouter / Markdown 内容管理和 GitHub Pages 部署。五个栏目维持“首页、笔记、文章、实验、关于”，栏目配置仍在 `src/config/sections.ts`。现有内容文件没有改名或迁移，`/#/projects` 继续兼容到实验。

研究参考项目 https://github.com/ryota-kk/personal-homepage 的 README、`styles.css` 和 `script.js` 后，提炼了“场景背景 / 氛围 / 内容”分层、半透明面板和柔和转场。采用独立的森林叙事与中文内容布局；自然滚动串联首页，不锁滚轮，不等待影片播放完才允许导航。

- 首页：午后大树与小溪 → 三条内容小径 → 精选与最近更新 → 傍晚亮灯的小屋。
- 笔记：树荫页首，紧凑记录列表，保留主题、搜索、标签、日期和分页。
- 文章：书屋页首，稳定纸张正文，目录、代码、表格、图片、公式、上下篇和相关阅读。
- 实验：工作台式作品卡片。存在 `demoUrl` 才显示“开始体验”；其余显示“过程记录”。
- 关于：小屋、个人学习方向、真实联系方式。未添加不存在的经历。

检查时仓库只有三个草稿模板，没有已公开内容。首页按真实发布数据读取标题、摘要、日期、封面与 featured 标记，空状态不伪造文章。所有临时验收记录在交付前删除。

## 素材及接入位置

| 文件 | 用途 | 说明 |
|---|---|---|
| `public/forest/afternoon.webp` | 首页大树溪流、龙猫 | 约 315 KB，主场景 |
| `public/forest/afternoon-small.webp` | 手机首页、笔记背景 | 约 101 KB |
| `public/forest/cottage.webp` | 首页傍晚小屋 | 约 346 KB |
| `public/forest/cottage-small.webp` | 小屏、正文与关于页首 | 约 104 KB |
| `public/musics/天空之城-宫崎骏.mp3` | 全站循环音乐 | 从用户提供的 dist/musics 原文件复制，约 5.9 MB |

美术使用内置 ImageGen 生成并检查，WebP 优化后随项目保存。没有依赖外部图片服务，也没有必须补齐的占位背景或视频。更换美术时替换同名文件，建议保持 16:9 构图与右侧主体位置。

生成提示词（内置工具；两个独立场景）：

### Afternoon

Use case: illustration-story. Create a final high-quality wide landscape background illustration for a Chinese personal website themed Totoro and a lived-in forest, aspect 16:9, ideally 2048x1152. Soft hand-painted 2D animated film background, watercolor and opaque gouache, fine painterly leaves and moss, no text, no lettering, no UI, no watermark. One coherent moss-green forest in warm late afternoon sunlight: a massive old camphor tree on the RIGHT half, large clearly recognizable grey Totoro with cream belly and dark chevron markings asleep sitting against the tree in lower RIGHT, little blue and white companions nearby, a small leaf on his head. Shallow winding stream from lower foreground toward the background, light sparkling on water, small stepping stones and ferns. On distant left-middle background a tiny timber cottage with warm window light. Layered leaves frame the top and corners. IMPORTANT composition: left half has open atmospheric pale sage-green clearing and mist with subdued detail and no major subjects, designed to hold dark charcoal website headline. Totoro and tree remain visible at right 65-90 percent x and center-to-bottom y. Quiet nostalgic summer, low saturation forest and moss green, muted cream and warm honey sunlight. Natural painted background detail, handcrafted animation cel character, consistent warm upper-left illumination, no photorealism, no 3D. This is artwork only, absolutely no user interface or written text.

### Cottage

Use case: illustration-story. A wide cinematic hand-painted 2D animation background illustration for the SAME Totoro woodland world: moss green, soft watercolor and gouache on paper, finely painted foliage, nostalgic calm Japanese summer forest, warm honey illumination, quiet lived-in atmosphere. Aspect ratio 16:9. Scene: early evening after rain, close view of a small timber cottage in a forest clearing, glowing amber windows, porch lamp, little weathered table with an open notebook and a ceramic cup under the porch, mossy stone path, ferns, wet garden. At far RIGHT edge a recognizable grey Totoro with cream chevron belly holds a leaf umbrella, resting beside a tree, not the main focus. Small pond foreground with warm window reflections and a few fireflies. Composition important: house and Totoro mainly RIGHT half; LEFT half is calm dark sage foliage and open hazy negative space for light website text, no clutter. Large broad trees link this scene with a massive camphor tree elsewhere in the forest. Soft consistent upper-left fading sunlight and amber windows. High quality narrative background, not photorealistic, not 3D. No text, no letters, no watermark, no UI.

## 代码实现的运动与交互

`src/components/ForestScene.tsx` 与 `src/index.css` 管理景深、局部呼吸遮罩、树冠轻摆、飘叶、光点、光线与水纹。呼吸是绘画局部的轻微缩放，不是独立角色骨骼动画；当前没有眨眼视频。离屏场景暂停动画，小屏减少粒子并关闭局部呼吸层；系统减少动态效果会关闭环境运动和转场。

导航固定，转场不阻塞点击；正文不使用视差。浅色以米白纸张为主，深色切换为低亮度森林绿。宽正文有独立目录，小屏目录位于正文前。焦点轮廓、跳到正文和原生 dialog 键盘焦点保留。

音乐位于 `src/components/MusicPlayer.tsx`，在路由外持久挂载；不会因翻页重置。首次访问可选音乐或安静进入，Esc 等同安静进入。默认音量 22%，约 1.4 秒淡入，循环播放。播放状态由 audio 的实际 play/pause 事件决定。localStorage 保存选择和音量；回访或后台恢复若被浏览器阻止播放，会显示手动继续提示。用户主动暂停后，后台返回不会自行播放。音乐首次手动开启前使用 preload=none。

## 新作品接入

在实验 Markdown 的 frontmatter 中添加可选字段：

```yaml
cover: "/images/your-project.webp"
demoUrl: "https://example.com/your-demo"
sourceUrl: "https://github.com/you/your-project"
```

站内体验也可用 `/#/experiments/...` 或 `/your-tool/index.html`。没有 demoUrl 的记录不会出现运行按钮。构建验证链接协议，拒绝脚本地址。

## 本地运行与验收

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

构建会把 public 中的音乐和场景复制到 dist。今后不要只把音乐放进 dist：该目录会被构建重建。

已用 Microsoft Edge 的独立无界面浏览器检查桌面 1440×1000、手机 390×844：五个栏目、无横向溢出、主题切换、Markdown/公式/图片/目录/上下篇、实验类型、标签/主题/正文搜索、旧栏目跳转和键盘跳到正文。音乐检查包括实际播放、淡入、音量、跨页连续性、选择记忆、循环属性；后台处理通过派发 visibilitychange 模拟验证。未在真实手机 Safari 或实际后台挂起的系统环境中测试，自动播放仍以各浏览器规则为准。

自动化检查含内容管理与音乐音量边界，共 8 项测试。正文和作品截图使用明确标为“临时验证”的测试记录，这些记录不保留、不发布。

截图位于 `docs/screenshots/`：

- `home-desktop.png` / `home-mobile.png`：最终首页。
- `welcome-desktop.png`：首次访问。
- `notes-desktop.png` / `posts-desktop.png` / `experiments-desktop.png`：真实空状态。
- `about-desktop.png` / `about-mobile.png` / `about-dark.png`：关于与主题。
- `article-layout-test.png` / `article-mobile-test.png`：测试内容的正文排版。
- `experiment-layout-test.png`：测试内容的可体验/过程记录卡片。

当前仅本地实现与预览，没有推送或更改线上部署。
