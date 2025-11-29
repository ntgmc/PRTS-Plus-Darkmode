// ==UserScript==
// @name         PRTS Plus 更好的暗黑模式
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  修复“突袭”标签区分度不够的问题。深度适配 Tailwind、Blueprint 及 Markdown 样式。精准替换原版切换按钮。
// @author       一只摆烂的42 & Gemini 3 pro
// @match        https://zoot.plus/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. 配置与状态管理 ---
    const STORAGE_KEY = 'prts_plus_dark_mode_v3';
    let isDarkMode = localStorage.getItem(STORAGE_KEY) === null ? true : (localStorage.getItem(STORAGE_KEY) === 'true');

    // --- 2. 罗德岛配色定义 ---
    const c = {
        bgDeep: '#18181c',      // 全局深底
        bgCard: '#232326',      // 卡片/弹窗
        bgHover: '#2d2d30',     // 悬浮/代码块
        border: '#38383b',      // 边框
        textMain: '#e0e0e0',    // 主字
        textSub: '#9ca3af',     // 辅字
        primary: '#5c8ae6',     // 罗德岛蓝
        tagRedBg: '#4a1e1e',    // 突袭-暗红背景
        tagRedText: '#fca5a5',  // 突袭-亮粉红文字
        tagRedBorder: '#7f1d1d' // 突袭-深红边框
    };

    // --- 3. CSS 样式 ---
    const cssContent = `
        /* ==================== 核心覆盖 ==================== */
        html, body, #root, #app,
        .bg-zinc-50, .bg-slate-50, .bg-gray-50, .bg-white,
        .bg-zinc-100, .bg-slate-100, .bg-gray-100 {
            background-color: ${c.bgDeep} !important;
            color: ${c.textMain} !important;
        }

        /* 顶部导航栏 */
        .bp4-navbar {
            background-color: ${c.bgCard} !important;
            border-bottom: 1px solid ${c.border} !important;
            box-shadow: none !important;
        }

        /* 抽屉与弹窗 */
        .bp4-drawer, .bp4-drawer > section, .bp4-overlay-content {
            background-color: ${c.bgDeep} !important;
            color: ${c.textMain} !important;
        }
        .bp4-drawer .bg-slate-100,
        .bp4-drawer header,
        .bp4-drawer .text-lg.font-medium {
            background-color: ${c.bgCard} !important;
            border-bottom: 1px solid ${c.border} !important;
            color: ${c.textMain} !important;
        }
        .bp4-drawer .h-full.overflow-auto {
            background-color: ${c.bgDeep} !important;
        }

        /* 组件通用 */
        .bp4-card, .card-container {
            background-color: ${c.bgCard} !important;
            border: 1px solid ${c.border} !important;
            box-shadow: none !important;
            color: ${c.textMain} !important;
        }
        h1, h2, h3, h4, h5, .bp4-heading, strong { color: #fff !important; }
        .text-gray-700, .text-zinc-600, .text-slate-900, .text-gray-800 { color: ${c.textMain} !important; }
        .text-gray-500, .text-zinc-500 { color: ${c.textSub} !important; }

        /* 按钮与输入框 */
        .bp4-button {
            background-color: ${c.bgHover} !important;
            background-image: none !important;
            border: 1px solid ${c.border} !important;
            color: ${c.textMain} !important;
            box-shadow: none !important;
        }
        .bp4-button:hover { background-color: #3e3e42 !important; }
        .bp4-button.bp4-intent-primary {
            background-color: ${c.primary} !important;
            color: #fff !important;
            border: none !important;
        }
        .bp4-input, textarea, select {
            background-color: ${c.bgHover} !important;
            color: #fff !important;
            border: 1px solid ${c.border} !important;
            box-shadow: none !important;
        }
        .bp4-input::placeholder { color: #666 !important; }

        /* 标签 (Tag) 修复 */
        .bp4-tag {
            background-color: #333 !important;
            color: #ccc !important;
            border: 1px solid #444 !important;
        }
        .bp4-tag[class*="bg-red-"], .bp4-tag.bg-red-400 {
            background-color: ${c.tagRedBg} !important;
            color: ${c.tagRedText} !important;
            border-color: ${c.tagRedBorder} !important;
        }
        .bg-orange-200 { background-color: #4a3020 !important; border-color: #6d4020 !important; }

        /* Markdown */
        .markdown-body { color: ${c.textMain} !important; background: transparent !important; }
        .markdown-body pre, .markdown-body code { background-color: ${c.bgHover} !important; color: ${c.textMain} !important; }
        .markdown-body table tr:nth-child(2n) { background-color: rgba(255, 255, 255, 0.05) !important; }
        .markdown-body a { color: ${c.primary} !important; }
    `;

    // --- 4. 逻辑控制 ---

    const styleTag = document.createElement('style');
    styleTag.id = 'prts-plus-style';
    styleTag.innerHTML = cssContent;

    function applyMode(enable) {
        const html = document.documentElement;
        if (enable) {
            if (!document.getElementById('prts-plus-style')) document.head.appendChild(styleTag);
            html.classList.add('dark');
        } else {
            if (document.getElementById('prts-plus-style')) styleTag.remove();
            html.classList.remove('dark');
        }
        updateButtonIcon(enable);
    }

    function toggleMode() {
        isDarkMode = !isDarkMode;
        localStorage.setItem(STORAGE_KEY, isDarkMode);
        applyMode(isDarkMode);
    }

    function updateButtonIcon(isDark) {
        const btn = document.getElementById('prts-mode-toggle');
        if (!btn) return;

        const moonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

        btn.innerHTML = isDark ? moonSvg : sunSvg;
        btn.title = isDark ? "关闭暗黑模式" : "开启暗黑模式";
        btn.style.color = isDark ? c.primary : '#5f6b7c';
    }

    // --- 5. 核心：XPath 精准替换 ---

    // 辅助函数：通过 XPath 获取元素
    function getElementByXPath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function manageButtons() {
        // 1. 尝试使用用户提供的精确 XPath 隐藏原版按钮
        // 目标: /html/body/main/div/div[1]/div[4]/button[2]
        const targetXPath = "/html/body/main/div/div[1]/div[4]/button[2]";
        const oldButton = getElementByXPath(targetXPath);

        if (oldButton) {
            // 只有当这个按钮不是我们自己创建的按钮时才隐藏
            if (oldButton.id !== 'prts-mode-toggle') {
                oldButton.style.display = 'none';
            }
        }

        // 2. 插入我们的按钮
        // 我们需要找到按钮的父容器 (div[4])
        const containerXPath = "/html/body/main/div/div[1]/div[4]";
        const container = getElementByXPath(containerXPath);

        // 如果找不到 XPath 的容器，尝试退回到 CSS 选择器查找
        const safeContainer = container || document.querySelector('.bp4-navbar .flex.md\\:gap-4.gap-3');

        if (safeContainer && !document.getElementById('prts-mode-toggle')) {
            const myBtn = document.createElement('button');
            myBtn.id = 'prts-mode-toggle';
            myBtn.className = 'bp4-button bp4-minimal';
            myBtn.type = 'button';
            myBtn.style.marginLeft = '4px';
            myBtn.onclick = toggleMode;

            // 插入到容器末尾 (或者插入到 oldButton 的位置之后，这里简化为末尾)
            safeContainer.appendChild(myBtn);
            updateButtonIcon(isDarkMode);
        }
    }

    // --- 6. 监控与执行 ---

    applyMode(isDarkMode);

    // 更加频繁的检测，防止 React 重新渲染把 style 冲掉
    const observer = new MutationObserver(() => {
        manageButtons();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 多次尝试，应对页面加载延迟
    setTimeout(manageButtons, 100);
    setTimeout(manageButtons, 500);
    setTimeout(manageButtons, 1500);

})();
