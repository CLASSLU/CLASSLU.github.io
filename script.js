const DEFAULT_CONTENT = {
  hero: {
    title: "路漫漫科技｜面向 AI 时代的工程化构建",
    subtitle:
      "我正在构建一个可持续运营的个人技术品牌。方向在探索，但方法明确：工程化 + 自动化 + AI 协作，持续产出可验证结果。",
    stats: [
      { title: "10 年工程经验", description: "长期深耕后端系统与工程化交付" },
      { title: "Java 起点，多栈协同", description: "从传统后端延展到 AI 编程工作流" },
      { title: "local-cloud-hub", description: "当前重点迭代的统一服务入口平台原型" }
    ]
  },
  about: {
    description:
      "我是一名有 10 年经验的软件开发者，长期深耕后端与系统工程。路漫漫科技是我面向下一阶段实践的个人公司品牌，强调持续学习、持续构建与持续进化。",
    tags: ["Spring Boot / Java", "系统架构与平台化", "自动化与运维工具", "AI 协作开发"]
  },
  capabilities: [
    {
      title: "后端系统架构",
      description: "围绕业务域建模、接口设计、权限体系与数据链路，构建稳定可演进的服务架构。"
    },
    {
      title: "平台工程与治理",
      description: "通过配置中心、路由管理、服务编排与可观测机制提升系统自治与可操作性。"
    },
    {
      title: "自动化与效率工具",
      description: "把重复流程脚本化、工具化，缩短从想法到可运行结果的交付路径。"
    },
    {
      title: "AI 时代开发协同",
      description: "将 AI 融入需求拆解、实现、验证与迭代，让研发流程更快、更稳、更系统。"
    }
  ],
  focus: [
    {
      title: "本地到云的统一入口",
      description: "探索多服务开发环境、路由与公网入口的统一管理，降低部署与运维复杂度。"
    },
    {
      title: "AI 编程时代工程方法",
      description: "把 AI 从辅助写代码扩展到参与完整交付链路的工程实践。"
    },
    {
      title: "长期产品化沉淀",
      description: "从单点项目逐步抽象能力模块，形成可复用的技术资产与产品方向。"
    }
  ],
  projects: [
    {
      name: "local-cloud-hub",
      description:
        "本地部署网关与服务管理平台原型，聚焦统一服务入口、路由管理、状态可观测与运维自动化。",
      keywords: ["网关", "服务管理", "Cloudflare Tunnel", "平台化"],
      status: "持续迭代中",
      link: ""
    }
  ],
  contact: {
    email: "me@luyuanlab.eu.org"
  },
  meta: {
    buildLabel: "Continuous Personal Ops v1"
  }
};

const DEFAULT_UPDATES = {
  items: [
    {
      date: "2026-04-08",
      title: "主页升级为持续运营架构",
      summary: "页面内容改为数据驱动，并新增运营更新流与 OpenClaw 状态面板。"
    },
    {
      date: "2026-04-08",
      title: "科技风视觉重构",
      summary: "采用深色霓虹科技风，强化首屏层次和卡片信息可读性。"
    }
  ]
};

const DEFAULT_OPENCLAW_CONFIG = {
  enabled: false,
  name: "OpenClaw Gateway",
  mode: "manual",
  publicStatusEndpoint: "",
  note: "尚未接入。可先使用 data/openclaw-status.json 手动同步，后续改为只读公网状态端点。"
};

const DEFAULT_OPENCLAW_STATUS = {
  updatedAt: "",
  gatewayOnline: false,
  healthSummary: "未接入",
  activeModel: "未提供",
  channelsOnline: 0,
  totalChannels: 0,
  sessionsActive: 0
};

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#siteNav");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setText(id, value) {
  const node = document.querySelector(`#${id}`);
  if (!node) {
    return;
  }
  node.textContent = value ?? "";
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

async function fetchJsonWithFallback(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch {
    return fallback;
  }
}

function renderTags(tags) {
  const container = document.querySelector("#aboutTags");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  safeArray(tags).forEach((tag) => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = tag;
    container.appendChild(span);
  });
}

function renderCardList(containerId, items, className) {
  const container = document.querySelector(`#${containerId}`);
  if (!container) {
    return;
  }
  container.innerHTML = "";

  safeArray(items).forEach((item) => {
    const article = document.createElement("article");
    article.className = `neon-card ${className} reveal`;
    article.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    container.appendChild(article);
  });
}

function renderProjects(projects) {
  const container = document.querySelector("#projectList");
  if (!container) {
    return;
  }
  container.innerHTML = "";

  safeArray(projects).forEach((project) => {
    const article = document.createElement("article");
    article.className = "neon-card project-wrap reveal";

    const keywordHtml = safeArray(project.keywords)
      .map((keyword) => `<span>${keyword}</span>`)
      .join("");

    const linkHtml = project.link
      ? `<a class="panel-link" href="${project.link}" target="_blank" rel="noreferrer">查看项目链接</a>`
      : "";

    article.innerHTML = `
      <p class="eyebrow">PROJECT</p>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-meta">${keywordHtml}<span>${project.status ?? "持续迭代中"}</span></div>
      ${linkHtml}
    `;

    container.appendChild(article);
  });
}

function renderUpdates(updates) {
  const container = document.querySelector("#updateList");
  if (!container) {
    return;
  }
  container.innerHTML = "";

  safeArray(updates).forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `
      <p class="timeline-date">${item.date}</p>
      <p class="timeline-title">${item.title}</p>
      <p class="timeline-summary">${item.summary}</p>
    `;
    container.appendChild(li);
  });
}

function formatDateTime(input) {
  if (!input) {
    return "未同步";
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return String(input);
  }

  return date.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderOpenClaw(config, status) {
  const enabled = Boolean(config.enabled);
  const gatewayOnline = enabled && Boolean(status.gatewayOnline ?? status.ok ?? false);

  setText("ocName", config.name || "OpenClaw Gateway");
  setText("ocMode", config.mode || "manual");
  setText("ocSummary", status.healthSummary || status.summary || (gatewayOnline ? "运行正常" : "未连接"));
  setText("ocModel", status.activeModel || status.model || "未提供");

  const channelsOnline = Number(status.channelsOnline ?? status.channels?.online ?? 0);
  const totalChannels = Number(status.totalChannels ?? status.channels?.total ?? 0);
  setText("ocChannels", `${channelsOnline} / ${totalChannels}`);

  const sessionsActive = Number(status.sessionsActive ?? status.sessions?.active ?? 0);
  setText("ocSessions", String(sessionsActive));
  setText("ocUpdatedAt", formatDateTime(status.updatedAt ?? status.ts));

  setText("ocNote", config.note || "");

  const badge = document.querySelector("#ocBadge");
  if (!badge) {
    return;
  }

  badge.classList.remove("is-online", "is-offline", "is-warn");

  if (!enabled) {
    badge.textContent = "未配置";
    badge.classList.add("is-warn");
    return;
  }

  if (gatewayOnline) {
    badge.textContent = "在线";
    badge.classList.add("is-online");
    return;
  }

  badge.textContent = "离线";
  badge.classList.add("is-offline");
}

function applyContent(content) {
  setText("heroTitle", content.hero?.title || DEFAULT_CONTENT.hero.title);
  setText("heroSubtitle", content.hero?.subtitle || DEFAULT_CONTENT.hero.subtitle);

  const stats = safeArray(content.hero?.stats);
  const statFallback = DEFAULT_CONTENT.hero.stats;

  const stat1 = stats[0] || statFallback[0];
  const stat2 = stats[1] || statFallback[1];
  const stat3 = stats[2] || statFallback[2];

  setText("heroStat1Title", stat1.title);
  setText("heroStat1Desc", stat1.description);
  setText("heroStat2Title", stat2.title);
  setText("heroStat2Desc", stat2.description);
  setText("heroStat3Title", stat3.title);
  setText("heroStat3Desc", stat3.description);

  setText("aboutDescription", content.about?.description || DEFAULT_CONTENT.about.description);
  renderTags(content.about?.tags || DEFAULT_CONTENT.about.tags);

  renderCardList("capabilityList", content.capabilities || DEFAULT_CONTENT.capabilities, "matrix-card");
  renderCardList("focusList", content.focus || DEFAULT_CONTENT.focus, "focus-item");
  renderProjects(content.projects || DEFAULT_CONTENT.projects);

  const email = content.contact?.email || DEFAULT_CONTENT.contact.email;
  const emailNode = document.querySelector("#contactEmail");
  if (emailNode) {
    emailNode.textContent = email;
    emailNode.setAttribute("href", `mailto:${email}`);
  }

  setText("buildLabel", content.meta?.buildLabel || DEFAULT_CONTENT.meta.buildLabel);
}

function closeMobileMenu() {
  if (!siteNav || !navToggle) {
    return;
  }
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function initNavigation() {
  if (!siteNav || !navToggle) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    },
    { passive: true }
  );
}

function initHeaderState() {
  if (!header) {
    return;
  }

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReveal() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  if (reduceMotion || typeof IntersectionObserver !== "function") {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${(index % 7) * 55}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initYear() {
  setText("year", String(new Date().getFullYear()));
}

async function loadAndRender() {
  const [content, updates, openclawConfig, fallbackStatus] = await Promise.all([
    fetchJsonWithFallback("./data/site-content.json", DEFAULT_CONTENT),
    fetchJsonWithFallback("./data/updates.json", DEFAULT_UPDATES),
    fetchJsonWithFallback("./data/openclaw-config.json", DEFAULT_OPENCLAW_CONFIG),
    fetchJsonWithFallback("./data/openclaw-status.json", DEFAULT_OPENCLAW_STATUS)
  ]);

  applyContent(content);
  renderUpdates(updates.items || DEFAULT_UPDATES.items);

  let openclawStatus = fallbackStatus;
  if (openclawConfig.enabled && openclawConfig.mode === "public-proxy" && openclawConfig.publicStatusEndpoint) {
    openclawStatus = await fetchJsonWithFallback(openclawConfig.publicStatusEndpoint, fallbackStatus);
  }

  renderOpenClaw(openclawConfig, openclawStatus);
  initReveal();
}

initNavigation();
initHeaderState();
initYear();
loadAndRender();
