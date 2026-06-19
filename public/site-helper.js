// public/site-helper.js

(function() {
  'use strict';

  const SITE_URL = 'https://app-portal-aiyouxi.com.cn';
  const KEYWORD = '爱游戏';

  // ----- 配置数据 -----
  const tips = [
    {
      id: 'tip-welcome',
      text: '欢迎来到爱游戏平台，请先完成账号注册或登录。',
      type: 'info'
    },
    {
      id: 'tip-download',
      text: '建议使用最新版Chrome或Edge浏览器以获得最佳体验。',
      type: 'info'
    },
    {
      id: 'tip-security',
      text: '请勿在公共设备上保存登录密码，保护您的账户安全。',
      type: 'warning'
    }
  ];

  const badges = [
    { label: '热门', color: '#e74c3c' },
    { label: '新游', color: '#2ecc71' },
    { label: '限免', color: '#f39c12' },
    { label: '爱游戏', color: '#3498db' }
  ];

  // ----- 工具函数 -----
  function createElement(tag, attrs, content) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [key, val] of Object.entries(attrs)) {
        el.setAttribute(key, val);
      }
    }
    if (content) {
      if (typeof content === 'string') {
        el.textContent = content;
      } else {
        el.appendChild(content);
      }
    }
    return el;
  }

  function buildTipsContainer() {
    const container = createElement('div', { id: 'site-helper-tips', class: 'helper-card' });
    tips.forEach(tip => {
      const item = createElement('div', { class: `tip-item tip-${tip.type}`, 'data-id': tip.id });
      const icon = createElement('span', { class: 'tip-icon' });
      icon.textContent = tip.type === 'warning' ? '⚠️' : '💡';
      const text = createElement('span', { class: 'tip-text' });
      text.textContent = tip.text;
      item.appendChild(icon);
      item.appendChild(text);
      container.appendChild(item);
    });
    return container;
  }

  function buildBadgesContainer() {
    const container = createElement('div', { id: 'site-helper-badges', class: 'helper-badges' });
    badges.forEach(badge => {
      const span = createElement('span', {
        class: 'badge',
        style: `background-color: ${badge.color}; color: #fff; margin: 4px; padding: 4px 10px; border-radius: 12px; font-size: 0.85em;`
      });
      span.textContent = badge.label;
      container.appendChild(span);
    });
    return container;
  }

  function buildAccessNotice() {
    const notice = createElement('div', { id: 'site-helper-notice', class: 'helper-notice' });
    const link = createElement('a', {
      href: SITE_URL,
      target: '_blank',
      rel: 'noopener',
      style: 'color: #2c3e50; text-decoration: underline; font-weight: 600;'
    });
    link.textContent = SITE_URL;
    const msg = document.createTextNode('如需访问，请点击 ');
    notice.appendChild(msg);
    notice.appendChild(link);
    return notice;
  }

  function buildStyles() {
    const style = createElement('style', { id: 'site-helper-style' });
    style.textContent = `
      .helper-card {
        background: #f0f4f8;
        border-left: 4px solid #3498db;
        padding: 12px 16px;
        margin: 12px 0;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .helper-card .tip-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 6px;
      }
      .helper-card .tip-item:last-child {
        margin-bottom: 0;
      }
      .tip-warning {
        border-left: 3px solid #e74c3c;
        padding-left: 8px;
      }
      .tip-icon {
        margin-right: 8px;
        flex-shrink: 0;
      }
      .tip-text {
        line-height: 1.5;
        color: #2c3e50;
      }
      .helper-badges {
        margin: 12px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .helper-notice {
        background: #ecf0f1;
        padding: 10px 16px;
        border-radius: 6px;
        margin: 12px 0;
        font-size: 0.95em;
        color: #2c3e50;
      }
    `;
    return style;
  }

  // ----- 初始化 -----
  function init() {
    const style = buildStyles();
    document.head.appendChild(style);

    const target = document.querySelector('#app') || document.body;
    const wrapper = createElement('div', { id: 'site-helper-root' });

    wrapper.appendChild(buildTipsContainer());
    wrapper.appendChild(buildBadgesContainer());
    wrapper.appendChild(buildAccessNotice());

    target.insertBefore(wrapper, target.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();