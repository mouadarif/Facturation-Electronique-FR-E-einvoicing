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
      const pre = document.createElement("pre");
      pre.textContent = text;
      content.replaceChildren(pre);
    })
    .catch((error) => {
      showMessage(`Impossible d'ouvrir le document local: ${error.message}`);
    });
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
