const allowedPrefixes = [
  "/docs_core/",
  "/docs_tech/",
  "/docs_tpe/",
  "/docs_platforms/",
  "/docs_international/",
  "/docs_specific/",
  "/wiki/",
  "/juridique/",
  "/metier/",
  "/technique/",
  "/notes/"
];

const params = new URLSearchParams(location.search);
const inputPath = params.get("path") || params.get("file") || "";
const title = params.get("title") || "Document local";
const titleNode = document.querySelector("#title");
const pathNode = document.querySelector("#path");
const rawLink = document.querySelector("#rawLink");
const copyLink = document.querySelector("#copyLink");
const content = document.querySelector("#content");
const safePath = normalizeLocalPath(inputPath);
const page = Number(params.get("page") || extractPage(inputPath) || 1);
const pathWithPage = safePath && isPdf(safePath) ? `${safePath}#page=${page}&zoom=page-width` : safePath;

titleNode.textContent = title;
pathNode.textContent = safePath && isPdf(safePath) ? `${safePath} - page ${page}` : safePath || "Chemin local invalide.";
rawLink.href = pathWithPage || "#";

copyLink.addEventListener("click", async () => {
  await navigator.clipboard.writeText(location.href);
  copyLink.textContent = "Lien copie";
  setTimeout(() => {
    copyLink.textContent = "Copier le lien";
  }, 1200);
});

if (!safePath) {
  showMessage("Chemin local invalide.");
} else if (isPdf(safePath)) {
  const iframe = document.createElement("iframe");
  iframe.title = title;
  iframe.src = pathWithPage;
  content.replaceChildren(iframe);
} else {
  fetch(safePath)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.arrayBuffer();
    })
    .then((buffer) => {
      const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
      if (isMarkdown(safePath)) {
        renderMarkdown(text);
      } else {
        const pre = document.createElement("pre");
        pre.textContent = text;
        content.replaceChildren(pre);
      }
    })
    .catch((error) => {
      showMessage(`Impossible d'ouvrir le document local: ${error.message}`);
    });
}

async function renderMarkdown(text) {
  try {
    const [{ marked }, { default: DOMPurify }] = await Promise.all([
      import("https://cdn.jsdelivr.net/npm/marked@17.0.1/lib/marked.esm.js"),
      import("https://cdn.jsdelivr.net/npm/dompurify@3.3.1/dist/purify.es.mjs")
    ]);
    marked.use({
      gfm: true,
      breaks: false
    });
    const article = document.createElement("article");
    article.className = "markdown-body";
    const fragment = DOMPurify.sanitize(marked.parse(text), {
      RETURN_DOM_FRAGMENT: true,
      USE_PROFILES: { html: true }
    });
    article.replaceChildren(fragment);
    article.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("http://") || href.startsWith("https://")) {
        link.target = "_blank";
        link.rel = "noreferrer";
        return;
      }
      const resolved = resolveMarkdownLink(href);
      if (resolved) link.href = resolved;
    });
    content.replaceChildren(article);
  } catch (error) {
    const pre = document.createElement("pre");
    pre.textContent = text;
    content.replaceChildren(pre);
    console.warn("Markdown rendering unavailable, showing raw text.", error);
  }
}

function normalizeLocalPath(value) {
  if (!value || /[\u0000-\u001f]/.test(value)) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return "";
  const withoutHash = value.split("#")[0].trim().replaceAll("\\", "/");
  const candidate = withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;
  let url;
  try {
    url = new URL(candidate, location.origin);
  } catch {
    return "";
  }
  if (url.origin !== location.origin) return "";
  if (!allowedPrefixes.some((prefix) => url.pathname.startsWith(prefix))) return "";
  return `${url.pathname}${url.search}`;
}

function isPdf(value) {
  return /\.pdf$/i.test(value.split("?")[0]);
}

function isMarkdown(value) {
  return /\.md$/i.test(value.split("?")[0]);
}

function resolveMarkdownLink(href) {
  if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href)) return "";
  const base = safePath.split("?")[0].split("/");
  base.pop();
  const absolute = new URL(href, `${location.origin}${base.join("/")}/`);
  const normalized = normalizeLocalPath(`${absolute.pathname}${absolute.search}${absolute.hash}`);
  return normalized ? readableViewerUrl(normalized, href) : "";
}

function readableViewerUrl(pathValue, linkTitle) {
  if (isPdf(pathValue)) {
    return `/local-viewer.html?path=${encodeURIComponent(pathValue)}&title=${encodeURIComponent(linkTitle)}&page=${extractPage(pathValue) || 1}`;
  }
  if (isMarkdown(pathValue) || /\.(csv|txt|json|js)$/i.test(pathValue.split("?")[0])) {
    return `/local-viewer.html?path=${encodeURIComponent(pathValue)}&title=${encodeURIComponent(linkTitle)}`;
  }
  return pathValue;
}

function extractPage(value) {
  const match = value.match(/[#&?]page=(\d+)/i);
  return match ? match[1] : "";
}

function showMessage(message) {
  const div = document.createElement("div");
  div.className = "empty";
  div.textContent = message;
  content.replaceChildren(div);
}
