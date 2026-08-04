// ==UserScript==
// @name           Quick Tabs
// @description    Floating browser containers with taskbar, drag-drop, and context menus
// @include        main
// @author         Darsh-A (original), ported and adjusted obsessively by Thomas Leon  Highbaugh
// @version        1.0.1
// @homepageURL    https://github.com/Darsh-A/Quick-Tabs
// ==/UserScript==

(function () {
    'use strict';

    /* ===== Configuration ===== */
    const CONFIG = {
        maxContainers: 5,
        defaultWidth: 640,
        defaultHeight: 800,
        minWidth: 480,
        minHeight: 640,
        animEnabled: true,
        position: 'bottom-right', // center, top-left, top-right, bottom-left, bottom-right
        linkAccessKey: 'T',
        tabAccessKey: 'Q',
        // Ctrl+Shift+9 — open current tab, F4 — close focused (avoids built-in shortcut conflicts)
        openKey: '9',
        openModifiers: 'accel shift',
        closeKey: 'VK_F4',
        closeModifiers: '',
    };

    /* ===== Theme ===== */
    const T = {
        bg: '#0c0c0c55',
        border: '#4c4c4c',
        headerBg: '#2a2a2a',
        headerFg: '#e0e0e0',
        btnBg: 'rgba(255,255,255,0.1)',
        btnHover: 'rgba(255,255,255,0.2)',
        taskbarBg: '#1a1a1a',
        taskbarBorder: '#333',
        taskbarFg: '#e0e0e0',
    };

    /* ===== State ===== */
    let containers = new Map();
    let nextId = 1;
    let taskbarExpanded = false;
    let lastFocusedId = null;
    let cleanupFns = [];

    function registerCleanup(fn) { cleanupFns.push(fn); }

    /* ===== XUL Helper ===== */
    function createXUL(tag, attrs = {}) {
        try {
            const el = document.createXULElement(tag);
            for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
            return el;
        } catch (_) {
            try {
                const el = document.createElementNS(
                    'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', tag);
                for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
                return el;
            } catch (e) {
                console.error('QuickTabs: createXUL failed for', tag, e);
                return null;
            }
        }
    }

    /* ===== Utilities ===== */
    function getFaviconUrl(url) {
        try {
            const host = new URL(url).hostname;
            return `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${host}&sz=16`;
        } catch (_) {
            return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="%23666"/><text x="8" y="12" text-anchor="middle" fill="white" font-size="10">T</text></svg>';
        }
    }

    function getTitleFromUrl(url) {
        try {
            const parsed = new URL(url);
            let host = parsed.hostname.replace(/^www\./, '');
            if (host && host !== 'localhost' && host !== '127.0.0.1') return host;
            return parsed.pathname.split('/')[1] || 'Quick Tab';
        } catch (_) {
            return 'Quick Tab';
        }
    }

    function truncate(text, max = 25) {
        if (!text || text.length <= max) return text;
        return text.slice(0, max - 3) + '...';
    }

    function isValidDragUrl(dt) {
        try {
            if (Array.from(dt.types).some(t => t === 'Files' || t === 'application/x-moz-file')) return null;
            const raw = dt.getData('text/uri-list') || dt.getData('text/x-moz-url') || dt.getData('text/plain');
            if (!raw) return null;
            const info = Services.uriFixup.getFixupURIInfo(raw.trim(),
                Ci.nsIURIFixup.FIXUP_FLAG_FIX_SCHEME_TYPOS | Ci.nsIURIFixup.FIXUP_FLAG_ALLOW_KEYWORD_LOOKUP);
            return info?.fixedURI?.spec || null;
        } catch (_) {
            return null;
        }
    }

    /* ===== CSS Injection ===== */
    function injectCSS() {
        const existing = document.getElementById('quicktabs-styles');
        if (existing) existing.remove();

        const anim = CONFIG.animEnabled ? 'transition:all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)' : '';
        const style = document.createElement('style');
        style.id = 'quicktabs-styles';
        style.textContent = `
            .quicktab-container {
                position:fixed; z-index:10000; display:flex; flex-direction:column; overflow:hidden;
                min-width:${CONFIG.minWidth}px; min-height:${CONFIG.minHeight}px;
                max-width:80vw; max-height:80vh;
                background:${T.bg}; border:1px solid ${T.border}; border-radius:8px;
                box-shadow:0 4px 12px rgba(0,0,0,0.4);
                font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
                opacity:0; transform:scale(0.8); ${anim};
            }
            .quicktab-container.visible { opacity:1; transform:scale(1); }
            .quicktab-container.minimized { display:none !important; }
            .quicktab-header {
                display:flex; align-items:center; justify-content:space-between; gap:4px;
                padding:6px 10px; background:${T.headerBg}; border-bottom:1px solid ${T.border};
                color:${T.headerFg}; cursor:grab; user-select:none; border-radius:8px 8px 0 0; min-height:36px;
            }
            .quicktab-header:active { cursor:grabbing; }
            .quicktab-title-section { display:flex; align-items:center; gap:6px; flex:1; min-width:0; }
            .quicktab-favicon { width:16px; height:16px; flex-shrink:0; }
            .quicktab-title {
                flex:1; font-size:13px; font-weight:500; overflow:hidden; white-space:nowrap;
                text-overflow:ellipsis; min-width:0; cursor:text;
            }
            .quicktab-title-editor {
                flex:1; font-size:13px; font-weight:500;
                border:1px solid ${T.border}; background:${T.bg}; color:${T.headerFg};
                padding:2px 4px; border-radius:3px; min-width:0;
            }
            .quicktab-button-group { display:flex; align-items:center; gap:2px; flex-shrink:0; }
            .quicktab-button {
                width:26px; height:26px; border:none; border-radius:4px;
                background:${T.btnBg}; color:${T.headerFg}; cursor:pointer;
                display:flex; align-items:center; justify-content:center; flex-shrink:0; padding:0;
            }
            .quicktab-button img { filter:invert(1); opacity:0.8; }
            .quicktab-button:hover { background:${T.btnHover}; }
            .quicktab-button:hover img { opacity:1; }
            .quicktab-button:disabled { opacity:0.5; cursor:not-allowed; }
            .quicktab-button:disabled:hover { background:${T.btnBg}; }
            .quicktab-content { flex:1; width:100%; border:none; background:white; overflow:hidden; }
            .quicktab-resize-handle {
                position:absolute; bottom:0; right:0; width:12px; height:12px;
                background:linear-gradient(-45deg,transparent 0%,transparent 30%,${T.border} 30%,${T.border} 100%);
                cursor:se-resize; z-index:10;
            }
            #quicktabs-taskbar {
                position:fixed; bottom:10px; right:10px; z-index:10001;
                background:${T.taskbarBg}; border:1px solid ${T.taskbarBorder}; border-radius:6px;
                box-shadow:0 2px 8px rgba(0,0,0,0.3); min-width:110px; max-width:300px;
                overflow:hidden; ${anim};
            }
            #quicktabs-taskbar.collapsed { height:40px; width:auto; min-width:110px; }
            #quicktabs-taskbar.expanded { min-width:220px; max-height:300px; }
            .quicktabs-taskbar-toggle {
                height:40px; width:100%; padding:0 12px;
                border:none; background:none; color:${T.taskbarFg}; cursor:pointer;
                display:flex; align-items:center; gap:6px; font-size:14px; flex-shrink:0;
            }
            .quicktabs-taskbar-toggle:hover { background:${T.btnHover}; }
            .quicktabs-taskbar-items { display:none; flex-direction:column; gap:2px; padding:4px 8px 8px; max-height:200px; overflow-y:auto; }
            #quicktabs-taskbar.expanded .quicktabs-taskbar-items { display:flex; }
            .quicktabs-taskbar-item {
                display:flex; align-items:center; gap:8px; padding:6px 8px; border-radius:4px; cursor:pointer;
                color:${T.taskbarFg}; min-width:180px; max-width:250px;
            }
            .quicktabs-taskbar-item:hover { background:${T.btnHover}; }
            .quicktabs-taskbar-item.minimized { opacity:0.6; }
            .quicktabs-taskbar-item .favicon { width:16px; height:16px; flex-shrink:0; }
            .quicktabs-taskbar-item .title { flex:1; font-size:12px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
            .quicktabs-taskbar-item .close-btn {
                width:20px; height:20px; border:none; background:none; cursor:pointer; opacity:0.6;
                display:flex; align-items:center; justify-content:center; flex-shrink:0; padding:2px;
            }
            .quicktabs-taskbar-item .close-btn:hover { opacity:1; background:${T.btnHover}; border-radius:2px; }
            .quicktabs-taskbar-item .close-btn img { filter:invert(1); opacity:0.7; }
            .quicktabs-taskbar-item .close-btn:hover img { opacity:1; }
            #quicktabs-taskbar.drag-over { background:${T.btnHover} !important; border-color:${T.headerFg} !important; }
            .quicktab-notice {
                position:fixed; top:20px; right:20px; z-index:99999;
                background:#2ecc71; color:white; padding:10px 18px; border-radius:6px;
                font-size:13px; font-weight:500; box-shadow:0 2px 8px rgba(0,0,0,0.3);
                pointer-events:none;
            }
        `;
        document.head.appendChild(style);
    }

    /* ===== Startup notification ===== */
    function showNotice(text, color = '#2ecc71') {
        const n = document.createElement('div');
        n.className = 'quicktab-notice';
        n.style.background = color;
        n.textContent = text;
        document.body.appendChild(n);
        setTimeout(() => { n.style.opacity = '0'; n.style.transition = 'opacity 0.5s'; setTimeout(() => n.remove(), 500); }, 2000);
    }

    /* ===== XUL Browser ===== */
    function createBrowser() {
        const b = createXUL('browser', {
            type: 'content', remote: 'true', maychangeremoteness: 'true',
            disablehistory: 'true', flex: '1', noautohide: 'true',
        });
        return b;
    }

    function loadURL(browser, url) {
        try {
            const uri = Services.io.newURI(url);
            const principal = Services.scriptSecurityManager.getSystemPrincipal();
            browser.loadURI(uri, { triggeringPrincipal: principal });
            return true;
        } catch (_) {
            try { browser.loadURI(url); return true; } catch (e) { return false; }
        }
    }

    /* ===== Container Creation ===== */
    function createContainer(url, title) {
        if (containers.size >= CONFIG.maxContainers) {
            showNotice('Quick Tabs limit reached (' + CONFIG.maxContainers + ')', '#ff6b6b');
            return null;
        }

        const id = nextId++;
        const el = document.createElement('div');
        el.className = 'quicktab-container';
        el.id = 'quicktab-' + id;

        /* --- Header --- */
        const header = document.createElement('div');
        header.className = 'quicktab-header';

        const favicon = document.createElement('img');
        favicon.className = 'quicktab-favicon';
        favicon.src = getFaviconUrl(url);

        const titleEl = document.createElement('div');
        titleEl.className = 'quicktab-title';
        const displayTitle = title || getTitleFromUrl(url);
        titleEl.textContent = truncate(displayTitle, 30);
        titleEl.title = displayTitle;

        const titleSection = document.createElement('div');
        titleSection.className = 'quicktab-title-section';
        titleSection.append(favicon, titleEl);

        function makeBtn(icon, tooltip) {
            const btn = document.createElement('button');
            btn.className = 'quicktab-button';
            btn.title = tooltip;
            const img = document.createElement('img');
            img.src = icon; img.width = 14; img.height = 14;
            btn.appendChild(img);
            return btn;
        }
        const backBtn = makeBtn('chrome://global/skin/icons/arrow-left.svg', 'Back');
        const fwdBtn = makeBtn('chrome://global/skin/icons/arrow-right.svg', 'Forward');
        const openTabBtn = makeBtn('chrome://global/skin/icons/open-in-new.svg', 'Open in New Tab');
        const minBtn = makeBtn('chrome://global/skin/icons/minus.svg', 'Minimize');
        const closeBtn = makeBtn('chrome://global/skin/icons/close.svg', 'Close');

        const btnGroup = document.createElement('div');
        btnGroup.className = 'quicktab-button-group';
        btnGroup.append(backBtn, fwdBtn, openTabBtn, minBtn, closeBtn);
        header.append(titleSection, btnGroup);

        /* --- Browser --- */
        const browser = createBrowser();
        if (!browser) { el.remove(); return null; }
        browser.className = 'quicktab-content';

        /* --- Resize handle --- */
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'quicktab-resize-handle';

        el.append(header, browser, resizeHandle);
        document.body.appendChild(el);

        /* --- Position --- */
        const m = 20;
        const iw = window.innerWidth, ih = window.innerHeight;
        const cw = Math.min(CONFIG.defaultWidth, iw * 0.9);
        const ch = Math.min(CONFIG.defaultHeight, ih * 0.9);
        let left, top;
        switch (CONFIG.position) {
            case 'top-left': left = m; top = m; break;
            case 'top-right': left = iw - cw - m; top = m; break;
            case 'bottom-left': left = m; top = ih - ch - m; break;
            case 'bottom-right': left = iw - cw - m; top = ih - ch - m; break;
            default: left = (iw - cw) / 2; top = (ih - ch) / 2; break;
        }
        el.style.left = Math.max(m, left) + 'px';
        el.style.top = Math.max(m, top) + 'px';

        /* --- State --- */
        const info = {
            id, el, browser, url, title: displayTitle,
            favicon, titleEl,
            backBtn, fwdBtn, openTabBtn, minBtn, closeBtn,
            minimized: false, customTitle: false,
            monitoringInterval: null,
        };
        containers.set(id, info);

        /* --- Event Setup --- */
        setupContainerEvents(info);
        loadURL(browser, url);

        /* --- Title Monitoring --- */
        const updateTitle = () => {
            if (info.customTitle) return;
            try {
                let pageTitle = null;
                let currentUrl = null;
                if (browser.currentURI && browser.currentURI.spec && !browser.currentURI.spec.startsWith('about:'))
                    currentUrl = browser.currentURI.spec;
                else if (browser.contentDocument && browser.contentDocument.location && browser.contentDocument.location.href && !browser.contentDocument.location.href.startsWith('about:'))
                    currentUrl = browser.contentDocument.location.href;
                currentUrl = currentUrl || info.url;
                if (currentUrl !== info.url) {
                    info.url = currentUrl;
                    favicon.src = getFaviconUrl(currentUrl);
                }
                try {
                    backBtn.disabled = !(browser.webNavigation ? browser.webNavigation.canGoBack : true);
                    fwdBtn.disabled = !(browser.webNavigation ? browser.webNavigation.canGoForward : true);
                } catch (_) { /* ignore */ }
                if (browser.contentDocument && browser.contentDocument.title && browser.contentDocument.title.trim())
                    pageTitle = browser.contentDocument.title;
                else if (browser.contentTitle && browser.contentTitle.trim())
                    pageTitle = browser.contentTitle;
                if (pageTitle && !pageTitle.startsWith('http') && !pageTitle.startsWith('about:')) {
                    if (pageTitle !== info.title) {
                        titleEl.textContent = truncate(pageTitle, 30);
                        titleEl.title = pageTitle;
                        info.title = pageTitle;
                        updateTaskbar();
                    }
                }
            } catch (_) { /* ignore */ }
        };

        ['DOMTitleChanged', 'pageshow', 'DOMContentLoaded', 'load', 'locationchange'].forEach(ev =>
            browser.addEventListener(ev, function () { setTimeout(updateTitle, 150); })
        );
        info.monitoringInterval = setInterval(updateTitle, 2000);
        setTimeout(updateTitle, 500);

        el.classList.add('visible');
        updateTaskbar();
        /* showNotice('Quick Tab opened'); — disabled */

        return info;
    }

    /* ===== Container Events ===== */
    function setupContainerEvents(info) {
        const { el, titleEl, browser, backBtn, fwdBtn, openTabBtn, minBtn, closeBtn } = info;
        const header = el.querySelector('.quicktab-header');
        const resizeHandle = el.querySelector('.quicktab-resize-handle');

        /* --- Title editing (double-click) --- */
        titleEl.addEventListener('dblclick', function (e) {
            e.stopPropagation(); e.preventDefault();
            const input = document.createElement('input');
            input.type = 'text';
            input.value = info.title;
            input.className = 'quicktab-title-editor';
            titleEl.replaceWith(input);
            input.focus(); input.select();
            function save() {
                const t = input.value.trim();
                if (t && t !== info.title) { info.title = t; info.customTitle = true; }
                titleEl.textContent = truncate(info.title, 30);
                titleEl.title = info.title;
                input.replaceWith(titleEl);
                updateTaskbar();
            }
            function cancel() { input.replaceWith(titleEl); }
            input.addEventListener('blur', save);
            input.addEventListener('keydown', function (ev) {
                if (ev.key === 'Enter') { save(); input.removeEventListener('blur', save); }
                if (ev.key === 'Escape') { cancel(); input.removeEventListener('blur', save); }
            });
        });

        /* --- Drag --- */
        let dragging = false, dragStartX, dragStartY, elStartX, elStartY;
        header.addEventListener('mousedown', function (e) {
            if (e.target.closest('.quicktab-button, .quicktab-title-editor')) return;
            dragging = true;
            dragStartX = e.clientX; dragStartY = e.clientY;
            const r = el.getBoundingClientRect();
            elStartX = r.left; elStartY = r.top;
            el.style.zIndex = '10002';
            e.preventDefault();
        });
        function onMouseMove(e) {
            if (!dragging) return;
            let nx = elStartX + (e.clientX - dragStartX);
            let ny = elStartY + (e.clientY - dragStartY);
            nx = Math.max(0, Math.min(nx, window.innerWidth - el.offsetWidth));
            ny = Math.max(0, Math.min(ny, window.innerHeight - el.offsetHeight));
            el.style.left = nx + 'px'; el.style.top = ny + 'px';
        }
        function onMouseUp() {
            if (dragging) { dragging = false; el.style.zIndex = '10000'; }
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        /* --- Resize --- */
        let resizing = false, resStartX, resStartY, resStartW, resStartH;
        resizeHandle.addEventListener('mousedown', function (e) {
            resizing = true;
            resStartX = e.clientX; resStartY = e.clientY;
            resStartW = el.offsetWidth; resStartH = el.offsetHeight;
            e.preventDefault();
        });
        function onResizeMove(e) {
            if (!resizing) return;
            let nw = Math.max(CONFIG.minWidth, resStartW + (e.clientX - resStartX));
            let nh = Math.max(CONFIG.minHeight, resStartH + (e.clientY - resStartY));
            const r = el.getBoundingClientRect();
            nw = Math.min(nw, window.innerWidth - r.left);
            nh = Math.min(nh, window.innerHeight - r.top);
            el.style.width = nw + 'px'; el.style.height = nh + 'px';
        }
        function onResizeUp() { resizing = false; }
        document.addEventListener('mousemove', onResizeMove);
        document.addEventListener('mouseup', onResizeUp);

        /* --- Button actions --- */
        backBtn.addEventListener('click', function () {
            try {
                if (browser.webNavigation) browser.webNavigation.goBack();
                else if (browser.contentDocument && browser.contentDocument.defaultView && browser.contentDocument.defaultView.history)
                    browser.contentDocument.defaultView.history.back();
            } catch (_) {}
        });
        fwdBtn.addEventListener('click', function () {
            try {
                if (browser.webNavigation) browser.webNavigation.goForward();
                else if (browser.contentDocument && browser.contentDocument.defaultView && browser.contentDocument.defaultView.history)
                    browser.contentDocument.defaultView.history.forward();
            } catch (_) {}
        });
        openTabBtn.addEventListener('click', function () {
            try {
                let url = info.url;
                if (browser.currentURI && browser.currentURI.spec && !browser.currentURI.spec.startsWith('about:'))
                    url = browser.currentURI.spec;
                if (url && !url.startsWith('about:')) {
                    const uri = Services.io.newURI(url);
                    const principal = Services.scriptSecurityManager.createContentPrincipal(uri, {});
                    gBrowser.addTab(url, { triggeringPrincipal: principal, allowInheritPrincipal: false });
                    closeContainer(info);
                }
            } catch (_) {}
        });
        minBtn.addEventListener('click', function () { minimizeContainer(info); });
        closeBtn.addEventListener('click', function () { closeContainer(info); });
        el.addEventListener('mousedown', function () { bringToFront(info); });

        /* Cleanup */
        registerCleanup(function () {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onResizeMove);
            document.removeEventListener('mouseup', onResizeUp);
        });
    }

    /* ===== Container Actions ===== */
    function minimizeContainer(info) {
        info.el.classList.add('minimized');
        info.minimized = true;
        updateTaskbar();
    }

    function restoreContainer(info) {
        info.el.classList.remove('minimized');
        info.minimized = false;
        bringToFront(info);
        updateTaskbar();
    }

    function closeContainer(info) {
        info.el.style.opacity = '0';
        info.el.style.transform = 'scale(0.8)';
        if (info.monitoringInterval) clearInterval(info.monitoringInterval);
        setTimeout(function () {
            info.el.remove();
            containers.delete(info.id);
            updateTaskbar();
        }, 300);
    }

    function bringToFront(info) {
        document.querySelectorAll('.quicktab-container').forEach(function (c) { c.style.zIndex = '10000'; });
        info.el.style.zIndex = '10002';
        lastFocusedId = info.id;
    }

    /* ===== Taskbar ===== */
    function createTaskbar() {
        let tb = document.getElementById('quicktabs-taskbar');
        if (tb) return tb;

        tb = document.createElement('div');
        tb.id = 'quicktabs-taskbar';
        tb.className = 'collapsed';

        const toggle = document.createElement('button');
        toggle.className = 'quicktabs-taskbar-toggle';
        toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="16" height="16">'
            + '<rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke="currentColor" stroke-width="3"/>'
            + '<line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" stroke-width="3"/>'
            + '<circle cx="81" cy="20" r="4" fill="none" stroke="currentColor" stroke-width="3"/>'
            + '<path d="M35 70 L65 40 M50 40 L65 40 L65 55" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            + '<span style="font-size:12px;font-weight:600">Quick Tabs</span>';
        toggle.title = 'Quick Tabs';

        const items = document.createElement('div');
        items.className = 'quicktabs-taskbar-items';

        tb.append(toggle, items);
        document.body.appendChild(tb);

        toggle.addEventListener('click', function () {
            if (taskbarExpanded) collapseTaskbar(); else expandTaskbar();
        });

        /* Drag-drop to taskbar */
        tb.addEventListener('dragenter', function (e) {
            if (isValidDragUrl(e.dataTransfer)) { e.preventDefault(); e.stopPropagation(); tb.classList.add('drag-over'); }
        });
        tb.addEventListener('dragover', function (e) {
            if (isValidDragUrl(e.dataTransfer)) { e.preventDefault(); e.dataTransfer.dropEffect = 'link'; }
        });
        tb.addEventListener('dragleave', function (e) {
            if (!tb.contains(e.relatedTarget)) tb.classList.remove('drag-over');
        });
        tb.addEventListener('drop', function (e) {
            e.preventDefault(); e.stopPropagation(); tb.classList.remove('drag-over');
            const url = isValidDragUrl(e.dataTransfer);
            if (url) createContainer(url);
        });

        registerCleanup(function () { tb.remove(); });
        return tb;
    }

    function expandTaskbar() {
        const tb = document.getElementById('quicktabs-taskbar');
        if (tb) { tb.classList.remove('collapsed'); tb.classList.add('expanded'); taskbarExpanded = true; }
    }

    function collapseTaskbar() {
        const tb = document.getElementById('quicktabs-taskbar');
        if (tb) { tb.classList.remove('expanded'); tb.classList.add('collapsed'); taskbarExpanded = false; }
    }

    function updateTaskbar() {
        let tb = document.getElementById('quicktabs-taskbar');
        if (containers.size === 0) {
            if (tb) tb.remove();
            return;
        }
        if (!tb) tb = createTaskbar();
        const items = tb.querySelector('.quicktabs-taskbar-items');
        if (!items) return;
        items.innerHTML = '';
        containers.forEach(function (info) {
            const item = document.createElement('div');
            item.className = 'quicktabs-taskbar-item' + (info.minimized ? ' minimized' : '');
            const fav = document.createElement('img');
            fav.className = 'favicon'; fav.src = info.favicon.src;
            const title = document.createElement('div');
            title.className = 'title'; title.textContent = truncate(info.title, 25); title.title = info.title;
            const close = document.createElement('button');
            close.className = 'close-btn'; close.title = 'Close';
            const ci = document.createElement('img');
            ci.src = 'chrome://global/skin/icons/close.svg'; ci.width = 10; ci.height = 10;
            close.appendChild(ci);
            item.append(fav, title, close);
            item.addEventListener('click', function (e) {
                if (e.target.closest('.close-btn')) return;
                if (info.minimized) restoreContainer(info); else bringToFront(info);
            });
            close.addEventListener('click', function (e) { e.stopPropagation(); closeContainer(info); });
            items.appendChild(item);
        });
    }

    /* ===== Context Menus ===== */
    function addLinkContextMenu() {
        const menu = document.getElementById('contentAreaContextMenu');
        if (!menu) { setTimeout(addLinkContextMenu, 500); return; }
        if (document.getElementById('qt-context-menuitem')) return;

        const item = createXUL('menuitem', {
            id: 'qt-context-menuitem',
            label: 'Open Quick Tab',
            accesskey: CONFIG.linkAccessKey,
        });
        if (!item) return;

        /* Insert after "Open Link in New Tab" (context-openlinkintab) or near navigation */
        const anchor = menu.querySelector('#context-openlinkintab')
            || menu.querySelector('#context-navigation')
            || menu.firstElementChild;
        if (anchor && anchor.nextElementSibling)
            menu.insertBefore(item, anchor.nextElementSibling);
        else
            menu.appendChild(item);

        item.addEventListener('command', function () {
            try {
                if (gContextMenu && gContextMenu.linkURL) {
                    const linkTitle = (gContextMenu.linkTextStr || '').trim();
                    createContainer(gContextMenu.linkURL,
                        linkTitle.length > 50 ? linkTitle.slice(0, 47) + '...' : linkTitle);
                }
            } catch (_) {}
        });

        menu.addEventListener('popupshowing', function () {
            const mi = document.getElementById('qt-context-menuitem');
            if (mi) mi.hidden = !(gContextMenu && gContextMenu.onLink && gContextMenu.linkURL);
        });
    }

    function addTabContextMenu() {
        const menu = document.getElementById('tabContextMenu');
        if (!menu) { setTimeout(addTabContextMenu, 500); return; }
        if (document.getElementById('qt-tab-context-menuitem')) return;

        const item = createXUL('menuitem', {
            id: 'qt-tab-context-menuitem',
            label: 'Move to Quick Tab',
            accesskey: CONFIG.tabAccessKey,
        });
        if (!item) return;

        /* Insert after "Duplicate Tab" */
        const anchor = menu.querySelector('#context_duplicateTab')
            || menu.querySelector('#context_reloadTab')
            || menu.querySelector('menuseparator');
        if (anchor && anchor.nextElementSibling)
            menu.insertBefore(item, anchor.nextElementSibling);
        else
            menu.appendChild(item);

        item.addEventListener('command', function () {
            try {
                const tab = (typeof TabContextMenu !== 'undefined' && TabContextMenu.contextTab)
                    || (gBrowser && gBrowser.selectedTab);
                if (!tab) return;
                const browser = tab.linkedBrowser;
                if (!browser) return;
                const url = browser.currentURI ? browser.currentURI.spec : '';
                const title = tab.getAttribute('label') || '';
                if (url && !url.startsWith('about:')) {
                    const info = createContainer(url, title);
                    if (info) {
                        try {
                            gBrowser.removeTab(tab, { animate: true });
                        } catch (_) { /* ignore */ }
                    }
                }
            } catch (_) {}
        });

        menu.addEventListener('popupshowing', function () {
            const mi = document.getElementById('qt-tab-context-menuitem');
            if (!mi) return;
            try {
                const tab = (typeof TabContextMenu !== 'undefined' && TabContextMenu.contextTab)
                    || (gBrowser && gBrowser.selectedTab);
                if (!tab) { mi.hidden = true; return; }
                const browser = tab.linkedBrowser;
                const url = browser && browser.currentURI ? browser.currentURI.spec : '';
                mi.hidden = !(url && !url.startsWith('about:'));
            } catch (_) { mi.hidden = true; }
        });
    }

    /* ===== Keyboard Shortcuts via XUL <key> ===== */
    function setupShortcuts() {
        const keyset = document.getElementById('mainKeyset')
            || document.querySelector('keyset')
            || (function () {
                const ks = createXUL('keyset', { id: 'quicktabs-keyset' });
                if (ks) document.documentElement.appendChild(ks);
                return ks;
            })();
        if (!keyset) {
            console.error('QuickTabs: No keyset found, shortcuts disabled');
            return;
        }

        /* Ctrl+Shift+9 — Open current tab in Quick Tab */
        const openKey = createXUL('key', {
            id: 'qt-key-open',
            key: CONFIG.openKey,
            modifiers: CONFIG.openModifiers,
        });
        if (openKey) {
            openKey.addEventListener('command', function () {
                const result = openSelectedTabInQuickTab();
                if (result && result.info) {
                    /* Optionally remove the original tab so it "moves" rather than clones. */
                    try {
                        if (result.tab && result.tab.parentNode) {
                            gBrowser.removeTab(result.tab, { animate: true });
                        }
                    } catch (_) { /* ignore */ }
                }
            });
            keyset.appendChild(openKey);
            registerCleanup(function () { if (openKey.parentNode) openKey.remove(); });
        }

        /* F4 — Close focused Quick Tab */
        const closeKey = createXUL('key', {
            id: 'qt-key-close',
            key: CONFIG.closeKey,
            modifiers: CONFIG.closeModifiers,
        });
        if (closeKey) {
            closeKey.addEventListener('command', function () {
                if (lastFocusedId && containers.has(lastFocusedId)) {
                    closeContainer(containers.get(lastFocusedId));
                }
            });
            keyset.appendChild(closeKey);
            registerCleanup(function () { if (closeKey.parentNode) closeKey.remove(); });
        }

        /* console.log('QuickTabs: Shortcuts registered — Ctrl+Shift+9 to move, F4 to close'); — disabled */
    }

    /* ===== Open the currently selected tab in a Quick Tab container ===== */
    function openSelectedTabInQuickTab() {
        try {
            const tab = gBrowser && gBrowser.selectedTab;
            if (!tab) return null;
            const browser = tab.linkedBrowser;
            if (!browser) return null;
            const url = browser.currentURI ? browser.currentURI.spec : '';
            const title = tab.getAttribute('label') || '';
            if (!url || url.startsWith('about:')) return null;
            const info = createContainer(url, title);
            return info ? { info: info, tab: tab } : null;
        } catch (_) { return null; }
    }

    /* ===== Public API ===== */
    window.QuickTabs = {
        open: function (url, title) {
            return url ? createContainer(url, title || '') : false;
        },
        openFromCurrent: function () {
            try {
                const tab = gBrowser && gBrowser.selectedTab;
                if (!tab) return false;
                const browser = tab.linkedBrowser;
                if (!browser) return false;
                const url = browser.currentURI ? browser.currentURI.spec : '';
                const title = tab.getAttribute('label') || '';
                if (url && !url.startsWith('about:')) return createContainer(url, title);
                return false;
            } catch (_) { return false; }
        },
        getInfo: function () {
            return {
                count: containers.size,
                maxContainers: CONFIG.maxContainers,
                containers: Array.from(containers.values()).map(function (i) {
                    return { id: i.id, url: i.url, title: i.title, minimized: i.minimized };
                }),
            };
        },
    };

    /* ===== Init ===== */
    function init() {
        try {
            injectCSS();
            addLinkContextMenu();
            addTabContextMenu();
            setupShortcuts();

            /* Global drag listener — create taskbar on URL drag */
            document.addEventListener('dragenter', function (e) {
                if (isValidDragUrl(e.dataTransfer)) {
                    const tb = createTaskbar();
                    tb.classList.add('drag-over');
                    if (!taskbarExpanded) { expandTaskbar(); }
                }
            }, false);
            document.addEventListener('dragend', function () {
                const tb = document.getElementById('quicktabs-taskbar');
                if (tb) tb.classList.remove('drag-over');
                if (containers.size === 0) {
                    const t = document.getElementById('quicktabs-taskbar');
                    if (t) t.remove();
                }
            }, false);

            /* Quick Tabs load notice disabled */
        } catch (e) {
            console.error('QuickTabs: Init failed', e);
            showNotice('Quick Tabs failed to load', '#ff6b6b');
        }
    }

    /* ===== Unload Cleanup ===== */
    window.addEventListener('unload', function () {
        containers.forEach(function (info) {
            if (info.monitoringInterval) clearInterval(info.monitoringInterval);
        });
        containers.clear();
        cleanupFns.forEach(function (fn) { try { fn(); } catch (_) {} });
        var s = document.getElementById('quicktabs-styles');
        if (s) s.remove();
    });

    /* ===== Bootstrap ===== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
})();
