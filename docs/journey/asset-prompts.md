# 本次素材生成

使用内置 ImageGen，共三次生成/编辑。生成结果已检查，并将项目使用的 WebP 副本保存到 public/forest；原始生成图片保留在生成目录。

## 午后干净底图

参考图片：原 `public/forest/afternoon.webp`。

Edit this exact landscape painting to create a clean background plate for an independently animated character. Remove ONLY all three Totoro characters (large grey, small blue, small white) and their leaf hat from the right-hand tree roots. Inpaint their entire silhouettes naturally with mossy tree roots, tree bark, small ferns, flowers and grass. Keep the giant tree, stream, rocks, cottage, framing, landscape, light, colors and painterly style as close to identical as possible. No characters or creatures anywhere. Do not crop or add text. Keep this a 16:9 complete landscape clean plate with a clear mossy ground patch at the lower-right tree base for a character to stand.

## 小屋干净底图

参考图片：原 `public/forest/cottage.webp`。

Edit this exact painting into a clean character-free background plate. Remove ONLY the grey Totoro and his leaf umbrella at far right, naturally inpainting the silhouette with mossy tree bark, ferns and small grass. Keep the cottage, notebook and cup, lit windows, pond reflections, forest and palette, framing and style unchanged as much as possible. Keep 16:9, no crop. There must be absolutely no characters, faces, animals or creatures anywhere. This is a clean plate for an independently animated character; keep a little free mossy path near the right tree base.

## 透明角色帧图

真正透明背景；生成后按格切分、统一为每格 320×320，重新打包为 1280×960 WebP。没有把单张静态角色移动或缩放伪装成步态。

Use case: illustration-story. Production animation SPRITE SHEET on a genuinely transparent alpha background. EXACTLY 12 full-body poses of THE SAME Totoro character, arranged in an exact evenly spaced 4-column by 3-row grid, row-major order. Canvas aspect 4:3 (ideally 2048x1536). Every cell exactly equal size. No gutters, no labels, no numbers, no ground, no shadows, no background. Character is consistent warm grey fur, cream oval belly with seven dark chevrons, triangular ears, black nose, whiskers, small round eyes, a tiny green leaf on the head. Soft hand-drawn 2D cel-animation with watercolor fur texture, moss-forest warm light from upper left; NOT 3D, NOT photorealism. Facing slightly RIGHT at three-quarter side view in every cell. Same model, same scale, same centered body axis, same baseline at 90% cell height, entire character visible with generous transparent margins in every cell, no cropping, no overlap between cells. Row 1: cell 1 sitting resting with feet extended and eyes closed; cell 2 pushing up with hands and bent knees halfway standing, eyes open; cell 3 fully standing alert, both feet flat, arms relaxed; cell 4 same standing pose blinking eyes shut. Rows 2 and 3 are ONE complete continuous 8-frame WALK CYCLE to the right: row2 col1 left-foot forward contact and right-foot back, col2 weight drops with left foot planted and right heel lifting, col3 right knee lifted passing left planted leg, col4 right foot extends forward with left heel up, row3 col1 right-foot forward contact and left-foot back, col2 weight drops with right planted and left heel lifting, col3 left knee lifted passing right planted leg, col4 left foot extends forward and right heel up, ready to repeat row2 col1. Walking poses must clearly differ by articulated leg and foot shapes, alternate weight shifts and opposite arm swings. Small consistent torso motion, no whole-character sliding within cells. Precisely twelve figures in a 4 by 3 rectangular grid, transparent background. No text anywhere.
