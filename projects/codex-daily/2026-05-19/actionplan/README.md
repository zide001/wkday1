# 互动小说阅读器基础版

这是一个配置驱动的互动小说阅读器。当前示例故事在 `public/stories/demo-story.json`，图片资源在 `public/images`。

## 运行

```bash
npm install
npm run dev
```

如果要让一批人点击同一个测试链接并记录数据，建议跑带后端的版本：

```bash
ADMIN_KEY=换成你的管理员口令 npm run serve
```

测试链接：

- 阅读器：`http://你的机器地址:4174/`
- 数据看板：`http://你的机器地址:4174/admin`

开发时如果继续用 Vite 的 `5173` 端口，需要同时启动后端：

```bash
npm run api
npm run dev
```

默认管理员口令是 `zide-admin`，真正发给别人测试前建议用 `ADMIN_KEY=...` 改掉。
选择数据保存在本地 `data/events.jsonl`，看板里可以清空测试数据。

## 故事配置

每个故事由 `assets` 和 `chapters` 组成：

- `coinGate` 可配置抛硬币入口，`heads` 和 `tails` 分别指向两个故事的起始章节。
- `assets` 配置背景图、插图和说明文字。
- `chapters` 配置章节标题、正文、所用图片和选项。
- `choices[].target` 决定点击选项后跳到哪个章节。
- 某章的 `choices` 为空数组时，会被视为结局。

替换内容时，优先改 `public/stories/demo-story.json`。之后如果需要多本书，可以再把读取入口扩展成故事列表或上传 JSON。

当前示例结构是：

- 示例入口：`命运硬币书架`，抛硬币进入两条故事线之一，结果只显示故事名称。
- 陈平安线五节：`糖葫芦试心`、`书简湖问心`、`落魄山立规`、`剑气长城隐官`、`大结局，人间有灯`。
- 克莱恩线五节：`克莱恩醒在廷根`、`值夜者的灯`、`灰雾上的塔罗会`、`无面人与世界`、`大结局，灰雾里有一盏灯`。
- 两条线都保留开局分支选择，后续汇入五节主线节点，方便先测试阅读体验和数据看板。

## 组件用法

主阅读器已经拆成组件，入口是 `NovelReader`：

```tsx
import { NovelReader } from "./components";
import type { Story } from "./lib/story";

export function StoryPage({ story }: { story: Story }) {
  return <NovelReader story={story} />;
}
```

组件结构：

- `NovelReader`：管理阅读进度、存档、抛硬币入口和章节跳转。
- `CoinGateView`：硬币入口展示与动画按钮。
- `ReaderView`：正文阅读区。
- `ReaderToolbar`：返回、重开按钮。
- `ConfigWarnings`：故事配置校验提示。

## 数据记录

前端会匿名记录两类事件：

- 抛硬币进入了哪个故事。
- 在某个章节点击了哪个选项，并记录是否到达结局。

数据看板只对管理员口令开放，测试读者正常阅读时看不到。
