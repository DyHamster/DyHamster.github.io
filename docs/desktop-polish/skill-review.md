GATE: OPEN 35 (rounds used up)

# 技能收尾检查逐项说明

项目功能验收已经完成；这里保留通用检查器未通过的原始项目，不将其标记为 PASS。已修复其发现的实际手机控件遮挡、键盘焦点时机和桌面标题层次问题。

最后一轮：3 / 3；开放 35 项；明确豁免 5 项。浏览器与内容验证见同目录 JSON，完整原始输出见 skill-gate.txt。

## 开放项目

### 1. copy-actions

位置：`div.route-content > section.cottage-section > div.shell.cottage-content > a.btn.button "了解作者"`

原始发现：3 actions in the hero ("阅读笔记", "了解作者", "了解作者"); at most 2

检查器建议：few actions, one wording: at most 2 in the hero, the main action word for word in nav, hero and close

本项目处理：检查器把路由包装层内的首页各节合并计算。实际首屏只有“阅读笔记”和“了解作者”两个入口，结尾 CTA 属于另一个小屋 section。

### 2. links

位置：`div.site-layout > header.header-wrap > div.site-header.shell > a.wordmark "DyHamster 一处林间，慢慢生长"`

原始发现："DyHamster 一处林间，慢慢生长" goes to #/, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 3. links

位置：`header.header-wrap > div.site-header.shell > nav > a.active "首页"`

原始发现："首页" goes to #/, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 4. links

位置：`header.header-wrap > div.site-header.shell > nav > a:nth-of-type(2) "笔记"`

原始发现："笔记" goes to #/notes, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 5. links

位置：`header.header-wrap > div.site-header.shell > nav > a:nth-of-type(3) "文章"`

原始发现："文章" goes to #/posts, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 6. links

位置：`header.header-wrap > div.site-header.shell > nav > a:nth-of-type(4) "实验"`

原始发现："实验" goes to #/experiments, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 7. links

位置：`header.header-wrap > div.site-header.shell > nav > a:nth-of-type(5) "关于"`

原始发现："关于" goes to #/about, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 8. links

位置：`div.hero-content.shell > div.hero-copy > div.hero-actions > a.btn.button:nth-of-type(1) "阅读笔记"`

原始发现："阅读笔记" goes to #/notes, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 9. links

位置：`div.hero-content.shell > div.hero-copy > div.hero-actions > a.btn.button:nth-of-type(2) "了解作者"`

原始发现："了解作者" goes to #/about, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 10. links

位置：`section#forest-paths > div.path-grid > a.card.path-card:nth-of-type(1) "笔记 强化学习、数学基础与论文阅读，按主题持续整理。 暂无公开记录"`

原始发现："笔记 强化学习、数学基础与论文阅读，按主题持续整理。 暂无公开记录" goes to #/notes, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 11. links

位置：`section#forest-paths > div.path-grid > a.card.path-card:nth-of-type(2) "文章 围绕一个问题展开推导、分析和完整的思考。 暂无公开记录"`

原始发现："文章 围绕一个问题展开推导、分析和完整的思考。 暂无公开记录" goes to #/posts, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 12. links

位置：`section#forest-paths > div.path-grid > a.card.path-card:nth-of-type(3) "实验 记录实现与复现过程，查看结果与可体验作品。 暂无公开记录"`

原始发现："实验 记录实现与复现过程，查看结果与可体验作品。 暂无公开记录" goes to #/experiments, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 13. links

位置：`div.route-content > section.updates-section.shell > div.section-heading > a.text-link "去文章里看看"`

原始发现："去文章里看看" goes to #/posts, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 14. links

位置：`div.growth-empty > div > nav.focus-topics > a:nth-of-type(1) "强化学习 ↗"`

原始发现："强化学习 ↗" goes to #/notes?topic=%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 15. links

位置：`div.growth-empty > div > nav.focus-topics > a:nth-of-type(2) "机器学习 ↗"`

原始发现："机器学习 ↗" goes to #/notes?topic=%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 16. links

位置：`div.growth-empty > div > nav.focus-topics > a:nth-of-type(3) "数学基础 ↗"`

原始发现："数学基础 ↗" goes to #/notes?topic=%E6%95%B0%E5%AD%A6%E5%9F%BA%E7%A1%80, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 17. links

位置：`div.growth-empty > div > nav.focus-topics > a:nth-of-type(4) "论文与阅读 ↗"`

原始发现："论文与阅读 ↗" goes to #/notes?topic=%E8%AE%BA%E6%96%87%E4%B8%8E%E9%98%85%E8%AF%BB, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 18. links

位置：`div.route-content > section.updates-section.shell > div.growth-empty > a.text-link "关于我"`

原始发现："关于我" goes to #/about, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 19. links

位置：`div.route-content > section.cottage-section > div.shell.cottage-content > a.btn.button "了解作者"`

原始发现："了解作者" goes to #/about, which is not on this page

检查器建议：point every link at a real section, page or file

本项目处理：这是现有 HashRouter 的真实路由地址，不是静态页面元素 id。已连续实际操作五栏目全部 20 条方向路径、前进后退及刷新，保留部署兼容性。

### 20. hero-screen

位置：`main#main > div.scene-content.content-arriving "DyHamster · 南京大学学生把日子，写进森林里。你好，我是 DyHams"`

原始发现：the hero ends at 2299px on a 900px screen, 1399px below the fold: it ends at the fold, 1px either way (SR-1)

检查器建议：make the hero exactly one screen (height: 100svh, its content fitted inside), never taller or shorter

本项目处理：检查器将 main 的路由转场包装 div 当作整个 hero，计入全部首页内容。四种桌面尺寸的实际 hero 都为 100svh，关键元素已逐一测量处于首屏。

### 21. section-height

位置：`div#root > div.journey-shell.journey-idle > div.site-layout > footer.site-footer.shell "© 2026 DyHamster愿每一次停留，都有一点收获。GitHub ↗写封"`

原始发现：the section is 132px tall (0.1 screens), 768px short of one screen (900px): every section after the hero is one screen or two, 2px either way (SR-2)

检查器建议：set the section to one screen or two (height: calc(var(--h,1) * 100vh), --h 1 or 2) and cut or split its content to fit

本项目处理：个人博客的紧凑页脚和少量内容不适合强制填满 900px。用户明确要求根据实际用途决定页面长度，收紧空状态。

### 22. one-section

位置：`div#root > div.journey-shell.journey-idle > div.site-layout > footer.site-footer.shell "© 2026 DyHamster愿每一次停留，都有一点收获。GitHub ↗写封"`

原始发现：the screen at scroll 1531px (the top of section 2) shows 132px of section 2 and the content of 2 sections, over 24px each beside section 1: a screen shows one section (another may peek 8px, 24px WARN) (SR-4)

检查器建议：make each section exactly one screen or two, so a screen shows one section and no neighbour peeks

本项目处理：现有 React 路由和转场生命周期需要内容包装层。实际内容仍分为独立 section；不为商业检查器重构已验证的场景与路由。

### 23. one-section

位置：`main#main > div.scene-content.content-arriving "DyHamster · 南京大学学生把日子，写进森林里。你好，我是 DyHams"`

原始发现：a <div> sits directly in <main>: every part of <main> is a <section> (SR-4)

检查器建议：put every block of <main> in a <section>, and give a band its own section instead of a ground inside one

本项目处理：现有 React 路由和转场生命周期需要内容包装层。实际内容仍分为独立 section；不为商业检查器重构已验证的场景与路由。

### 24. one-heading

位置：`section#forest-paths > div.section-heading > div > h2 "笔记、文章与实验"`

原始发现：the hero holds an h2 (3): its heading is the h1, and an h2 opens the next section (SR-5)

检查器建议：give each section one h2, first in its .wrap, and the hero only its h1

本项目处理：多个 h2 分属首页真实的栏目、更新及结尾 section，检查器将外部路由包装层整体当作 hero。

### 25. container-edges

位置：`div#root "跳到正文DyHamster一处林间，慢慢生长首页笔记文章实验关于 DyHamst"`

原始发现：a <div> at the top of the page, outside header.nav, main, footer.closing and nav.actionbar (SR-6)

检查器建议：build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 26. container-edges

位置：`main#main > div.scene-content.content-arriving "DyHamster · 南京大学学生把日子，写进森林里。你好，我是 DyHams"`

原始发现：the section needs exactly one in-flow child .wrap (it has 1 in-flow child, 0 .wrap) (and 1 more like it: "© 2026 DyHamster愿每一次停留，都") (SR-6)

检查器建议：build the page as header.nav, a main of sections (each one in-flow .wrap plus background layers) and footer.closing

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 27. container-edges

位置：`div.scene-content.content-arriving > div.route-content > section.cottage-section > div.forest-scene.cottage-clean`

原始发现：a box runs 0-1440px, outside the container lines of section 1 at 96-1344px: full width is for background layers and grounds only (SR-6)

检查器建议：keep it inside the container lines (.wrap): full width is for background layers and grounds only

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 28. container-edges

位置：`div.route-content > section.cottage-section > div.forest-scene.cottage-clean > div.sun-haze`

原始发现：a box runs 0-1440px, outside the container lines of section 1 at 96-1344px: full width is for background layers and grounds only (and 4 more like it: div.scene-content.content-arriving > div.route-content > section.cottage-section > div.cottage-shade, div.scene-content.content-arriving > div.route-content > section.forest-hero.hero > div.forest-scene.afternoon-clean, div.route-content > section.forest-hero.hero > div.forest-scene.afternoon-clean > div.sun-haze) (SR-6)

检查器建议：keep it inside the container lines (.wrap): full width is for background layers and grounds only

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 29. container-edges

位置：`div.site-layout > footer.site-footer.shell > div:nth-of-type(1) > span:nth-of-type(1) "© 2026 DyHamster"`

原始发现：1 text block starts on a left line at x 132, 36px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (SR-6)

检查器建议：start the text on the container's left, or on the one split line every split shares

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 30. container-edges

位置：`section.updates-section.shell > div.growth-empty > div > h3 "目前关注：强化学习、数学与论文阅读"`

原始发现：2 text blocks start on a left line at x 121, 25px from the container's left: text starts on the container's left, or on one split line (x 626, 732, 838) (also "公开记录尚在整理。可以先按主题浏览，或了解我的学习方向。") (SR-6)

检查器建议：start the text on the container's left, or on the one split line every split shares

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 31. container-edges

位置：`div.scene-content.content-arriving > div.route-content > section.cottage-section > div.cottage-shade`

原始发现：a box over half the container wide runs 0-1440px, not on the container's lines at 96-1344px (and 2 more like it: div.scene-content.content-arriving > div.route-content > section.forest-hero.hero > div.forest-scene.afternoon-clean, div.scene-content.content-arriving > div.route-content > section.forest-hero.hero > div.hero-light) (SR-6)

检查器建议：run the picture or box from the container's left line to its right line, or put it in a row or a split

本项目处理：既有 .shell 定义真实内容容器，已统一主标题、栏目、卡片与结尾。背景和光影按用户要求保持全幅；纸面内部留白及页脚图标后文字属于组件内间距。

### 32. collide

位置：`div#root > div.journey-shell.journey-idle > div.site-layout > header.header-wrap "DyHamster 首页 笔记 文章 实验 关于"`

原始发现：at the top of the page the fixed bar covers the picture "img: afternoon-clean-small.webp": nothing scrolls it out from under the bar

检查器建议：on a phone nothing lies on anything else: let the section grow with its content (min-height for its screens, never a fixed height; --hm: 2 when it needs two) or cut what it holds; keep pictures and cards off the buttons; pad the page under a fixed bar by the bar's height (top: the first section; end: the footer)

本项目处理：该命中对象是 aria-hidden 的全幅装饰背景，延伸至不透明固定导航背后；正文和导航没有互相覆盖，手机操作与实际尺寸检查已通过。

### 33. photo-upscale

位置：`section.forest-hero.hero > div.forest-scene.afternoon-clean > picture > img.scene-art "img: afternoon-clean-small.webp"`

原始发现：afternoon-clean-small.webp: 900x507 shown at 390x844, blown up 1.66x

检查器建议：use a source at least as wide as the picture is shown (twice that for sharp screens)

本项目处理：这是保留的手机素材质量限制：900×507 横图覆盖竖屏会放大和裁切。本轮 PC 优先，手机文字和操作可用；后续可补竖幅手绘底图。

### 34. menu-toggle

位置：`div.site-layout:nth-of-type(3) > header.header-wrap > div.site-header.shell > button.theme-toggle "切换到深色模式"`

原始发现：the menu button ("切换到深色模式") has no aria-expanded: a screen reader cannot tell the menu is open or shut

检查器建议：use the starter's button: <button class="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">; system.js flips it

本项目处理：该按钮是深浅主题切换，不是菜单按钮。当前 aria-label 准确描述切换动作，增加 aria-expanded 会造成错误语义。

### 35. container

位置：`page`

原始发现：no .wrap

检查器建议：put the content in one .wrap

本项目处理：容器名是 .shell，而非检查器指定的 .wrap/.container；实际几何尺寸与对齐线已在浏览器量测。

## 五项明确豁免

- **gaming-suspect** — `dist/assets/index-CreFv7r2.js`：the kit's motion.js shot() test, ported unchanged into the Vite bundle; no application-specific automation detection
- **nav** — `div.site-layout > header.header-wrap > div.site-header.shell > a.wordmark "DyHamster 一处林间，慢慢生长"`：This is the existing two-line brand plus tagline; the five actual navigation links each remain on one line in the verified desktop header.
- **copy-headline** — `h1#home-title "把日子， 写进森林里。"`：The user explicitly asks to preserve the poetic main title of this personal blog; the author, Nanjing University and research interests are immediately below/above, and there is no product being sold.
- **motion-layer** — `html[data-motion]`：The unchanged skill motion.css is imported through Vite and bundled in index CSS; actual button/card hover is active rather than a standalone link href.
- **moment-none** — `(the page)`：The user explicitly asks to retain the existing persistent forest journey and sprite controller. Its complete home-to-notes narrative is the live scene; replacing it with a newly dealt commercial module would conflict with the incremental scope.
