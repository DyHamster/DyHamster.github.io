# 本轮手绘素材的来源与替换接口

使用 Codex 内置 ImageGen 生图。背景仍是项目已有的 `public/forest/afternoon-clean.webp` 和 `cottage-clean.webp`，本轮将它们作为场景光色参考；桥接姿态参考了原 `totoro-atlas-aligned.webp` 中同一个角色。用于网页的是保留透明边缘、裁切并压缩后的 WebP。图标及 D + 叶片标记为手写 SVG。

以下是四张生成图的提示词要点，可作为复绘简报。道具共同要求：透明画布，仅一个完整物体，不画地面、光晕、文字、标志或人物，脚和轮廓留足安全边；软铅笔轮廓、低饱和矿物色、哑光水粉和可见纸纹，前上方偏左自然光，轻微三分之四俯视，和已有背景的黄绿、原木色相接。

| 资源 | 提示词要点 | 接入与替换 |
| --- | --- | --- |
| `public/forest/props/desk-v2.webp` | 树荫下简朴的低木桌，打开的素色手账、几张有清楚纸边的散页、一支笔与小陶杯；桌脚完整，正面与右边形成轻微透视。 | `src/components/SceneLandmark.tsx` 的笔记地点和 `src/editorial.css` 的 `.landmark-notes`；如画布比例改变，同步更新 `--prop-rise`。 |
| `public/forest/props/shelf-v2.webp` | 林间书屋里的窄木书架，书背有朴素的深绿、灰蓝和赭色，不出现可读书名；层板厚度、上下收边和柜脚完整。 | 同一组件的文章地点、CSS `.landmark-posts`。 |
| `public/forest/props/bench-v2.webp` | 树根旁的小型工作台，简单的草图纸与手作器物；材质区分木头、纸、旧金属，台面微俯视，避免现代荧光屏和夸张装饰。 | 同一组件的实验地点、CSS `.landmark-experiments`。原简化 SVG 是三种道具的加载失败回退。 |
| `public/forest/guide/totoro-bridges-v2.webp` | 对照现有龙猫的体积、灰褐毛色、奶油腹部、眼鼻和耳形，分开绘制 6 个完整剪影；3 列 2 行，依次为清醒坐姿、起身中段、正面站稳、看向目的地、下蹲、入睡坐姿。每格体积一致，脚底留边，不画地面和投影。 | 320×320 单格，脚底 `y=315`，网格、姿态索引及校准记录见 `public/forest/guide/bridges-v2.json`；接口见 `src/lib/guide-assets.ts`，姿态选择见 `src/lib/scene-journey.mjs`。原 4×3 图集继续承担基础步态和回退。 |

替换桥接帧时先对齐承重脚和躯干中心，再以相同尺寸、网格和索引导出 WebP，或同时调整图集配置与测试。可继续补绘过渡姿态、统一个别面部纹理或引入独立足锁；不需要改正文路由。替换道具时检查脚与场景底线的接触点，以及深浅模式下的边缘。

品牌的第三方素材仅 GitHub 官方形状（`public/brand/github.svg`，[官方来源](https://github.githubassets.com/favicons/favicon.svg)）。页签候选的源文件和 16/32/64 PNG 保存在本目录的 [`icons/`](icons/)；候选 A 同步到 `public/` 的 SVG、favicon PNG、Apple Touch Icon 和 manifest。再次替换时一起更新 `index.html` 和 `public/manifest.json` 中的缓存版本。
