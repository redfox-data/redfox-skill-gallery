# 红狐 Skills 可视化画廊 / redfox-skill-gallery

<p align="right">
  <a href="https://github.com/redfox-data/redfox-skill-gallery/blob/main/README.md">English</a>
  中文
</p>

> 红狐 Skills 可视化画廊插件 —— 把 `redfox-community-dsh` 里的红狐社区 skills 用卡片形式呈现在 DeepSeek Harness 的 Web 界面里，点一下就能用。

## 简介

`redfox-skill-gallery` 是 DeepSeek Harness 的 Web 插件。它在侧边栏底部加一个「红狐Skills」入口，点击后整个界面切换为卡片式技能画廊，集中展示 `redfox-community-dsh` 插件内的全部红狐社区 skills（不混入你本地的 skills）。

每张卡片展示技能的中文名、slug 和描述，支持实时搜索、查看 README 详情，并一键把技能引用到输入框使用。如果尚未安装 `redfox-community-dsh`，打开画廊时会自动帮你安装。

## 功能特性

- 集中展示 `redfox-community-dsh` 内的红狐社区 skills。
- 卡片式画廊，每张卡片包含中文名、slug（技能技术标识，如 `/bili-ai-feed`）和描述。
- 按中文名 / slug / 描述实时搜索。
- 点击卡片查看该技能的 README 详情，支持中文 / 英文切换。
- 点击「立即使用」把技能引用到输入框，可继续补充或修改需求后再发送。
- 未安装 `redfox-community-dsh` 时自动安装。
- 中英文界面。

## 使用方法

### 安装

建议提前安装 `redfox-community-dsh` 插件。未安装时，打开画廊也会自动安装，但自动安装后仍需重启 `dsh web` 才能生效，因此提前安装可少重启一次：

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-community-dsh
```

再安装本插件：

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-skill-gallery
```

安装完成后重启 `dsh web` 生效。

### 使用

1. 重启后刷新页面，点击左侧边栏底部的「红狐Skills」按钮。
2. 画廊以卡片形式展示所有红狐社区 skills。
3. 在顶部搜索框输入关键词，按中文名 / slug / 描述过滤。
4. 点击某张卡片，右侧滑出详情面板，查看该技能的 README（可切换中文 / 英文）。
5. 点击卡片上的「立即使用」，技能会以 `/name` 的形式引用到输入框，补充或修改你的需求后回车发送。
6. 按 ESC 或右上角「关闭」返回会话。

> 若尚未安装 `redfox-community-dsh`，打开画廊时会自动执行安装；安装完成后仍需重启 `dsh web` 才能生效，因此更推荐提前安装。

## 卸载

```sh
dsh plugin --profile web remove redfox-skill-gallery
```
