# ⚠️ 项目已迁移 / Project Moved

> [!CAUTION]
> **本项目已停止维护 (Deprecated)**
> 
> 本脚本的所有功能（包括干员持有筛选、助战模式等）已与暗黑模式合并，并迁移至新的整合仓库：
> **👉 [ntgmc/Better-PRTS-Plus](https://github.com/ntgmc/Better-PRTS-Plus)**
> 
> 请前往新仓库下载最新版本的 **Better-PRTS-Plus** 脚本以获取最佳体验及后续更新。
>
> This repository is no longer maintained. All features have been integrated into **[Better-PRTS-Plus](https://github.com/ntgmc/Better-PRTS-Plus)**.

---

*(以下为原项目文档 / The following is the legacy documentation)*

# PRTS Plus 更好的暗黑模式 (PRTS-Plus-Darkmode)

> 专为 [zoot.plus](https://zoot.plus/) 打造的深度暗黑模式适配脚本，针对原站不完善的深色模式进行深度优化与视觉增强。

![Version](https://img.shields.io/badge/Version-1.3-blue) ![Author](https://img.shields.io/badge/Author-一只摆烂的42_%26_Gemini_3_pro-purple)

## 🌑 简介 | Introduction

虽然 zoot.plus 自带暗黑模式，但背景色观感不适、文字对比度较差。

**PRTS Plus 更好的暗黑模式** 通过强制注入 CSS，对 Blueprint UI 框架和 Tailwind 类进行深度覆盖，将界面风格统一为沉浸式的**暗黑模式**（深灰底色 + 蓝调点缀），并重点修复了可读性问题。

### ✨ 核心特性

*   **🌗 自由切换 & 完美接管 (New!)**：
    *   **原生级集成**：精准隐藏网站原版切换按钮，无缝替换为脚本接管的控制开关。
    *   **一键开关**：点击导航栏原本位置的“太阳/月亮”图标，即可在“深度暗黑”与“原版样式”间实时切换，无需刷新页面。
    *   **自动记忆**：内置状态保存功能，刷新或再次打开网页时，自动应用您上次的选择。
*   **🔴 突袭标签修复**：
    *   原版：深红背景配黑色文字，难以看清。
    *   **修正后**：采用 **暗红背景 (#4a1e1e) + 亮粉文字 (#fca5a5)**，高亮醒目，一眼识别高难作业。
*   **💻 深度暗黑美化**：
    *   **全局深色化**：将背景统一为 `#18181c`，卡片为 `#232326`，彻底消除刺眼的白色色块。
    *   **控件重绘**：重绘输入框、按钮、下拉菜单，去除多余阴影，增加扁平化硬朗质感，适配罗德岛 UI 风格。
    *   **组件全覆盖**：修复顶部导航栏、侧边抽屉 (Drawer)、弹窗 (Overlay) 在部分情况下反白的问题。
    *   **自定义滚动条**：替换浏览器默认滚动条，使其与页面暗色风格融为一体。
*   **📝 Markdown 阅读优化**：
    *   完美适配作业详情页的攻略文本。
    *   优化代码块、引用、表格的显示效果，大幅提升夜间阅读体验。

## 📥 安装方法 | Installation

1.  安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/) (油猴)。
2.  [**点击这里安装脚本**](https://github.com/ntgmc/PRTS-Plus-Darkmode/raw/refs/heads/main/PRTS%20Plus%20%E6%9B%B4%E5%A5%BD%E7%9A%84%E6%9A%97%E9%BB%91%E6%A8%A1%E5%BC%8F.user.js)。
3.  打开 [zoot.plus](https://zoot.plus/)，脚本将自动接管页面样式。
4.  注意必须在原版日间模式（白）中加载脚本，否则会出现背景错误。（若出现错误您可以暂时禁用脚本，在日间模式重新开启）

## 🎨 视觉预览 | Preview

### 1. 首页与卡片流
<img width="1282" height="914" alt="图片" src="https://github.com/user-attachments/assets/8a93b418-d689-4653-a47a-5c5752c55afa" />


### 2. 突袭标签对比 (修复前后)
<img width="400" height="100" alt="图片" src="https://github.com/user-attachments/assets/d476b2d5-56c0-4bc8-a845-9c0952b57c4f" />
<img width="393" height="97" alt="图片" src="https://github.com/user-attachments/assets/e7aabcf8-85ab-4cd1-a87a-7c7110abcefd" />



### 3. 作业详情与 Markdown
<img width="1281" height="915" alt="图片" src="https://github.com/user-attachments/assets/9dd8de11-e1f4-41ff-971c-085a02233e17" />


## ⚙️ 兼容性与推荐

*   **浏览器**：Chrome, Edge, Firefox, Safari (需安装 Tampermonkey)
*   **强烈推荐搭配**：
    *   [**PRTS Plus 干员持有筛选**](https://github.com/ntgmc/PRTS-Plus-Filter) —— 本样式脚本已为筛选插件做了底层适配，两者搭配使用可获得最佳的“PRTS-Plus”体验。

## 🛠️ 技术细节

脚本通过 `GM_addStyle` 注入 `!important` 级别的 CSS 规则，主要覆盖了以下样式库：
*   **Tailwind CSS** (`bg-zinc-50`, `text-gray-700` 等)
*   **Blueprint UI** (`.bp4-card`, `.bp4-button`, `.bp4-tag` 等)
*   **GitHub Markdown CSS** (`.markdown-body`)

---
*Disclaimer: This script is a third-party styling tool and is not affiliated with HyperGryph or zoot.plus.*
