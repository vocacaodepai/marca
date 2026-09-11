// ============================================
// CONFIGURAÇÃO — mesmos dados de contato do main.js
// ============================================
const WHATSAPP_NUMBER = "5521999999999"; // formato: 55 + DDD + número, sem espaços/símbolos
const DISPLAY_PHONE = "(21) 99999-9999";

const BUILDING_PLACEHOLDER_LARGE = `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1"><rect x="14" y="24" width="34" height="50"/><rect x="54" y="10" width="30" height="64"/><rect x="90" y="34" width="20" height="40"/><line x1="14" y1="34" x2="48" y2="34"/><line x1="14" y1="44" x2="48" y2="44"/><line x1="14" y1="54" x2="48" y2="54"/><line x1="14" y1="64" x2="48" y2="64"/><line x1="54" y1="20" x2="84" y2="20"/><line x1="54" y1="32" x2="84" y2="32"/><line x1="54" y1="44" x2="84" y2="44"/><line x1="54" y1="56" x2="84" y2="56"/></svg>`;

const MAP_TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const MAP_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function waLink(endereco) {
  const msg = `Olá, Marcelo! Vi no site a obra em ${endereco} e gostaria de mais informações.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function mapsLink(endereco) {
  const q = encodeURIComponent(`${endereco}, ${BAIRRO}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function getObraFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return OBRAS.find((o) => o.id === id) || null;
}

function renderNotFound() {
  document.getElementById("obra-content").innerHTML = `
    <div class="obra-not-found">
      <h1>Obra não encontrada</h1>
      <p>O link acessado não corresponde a nenhuma obra do portfólio.</p>
      <a href="index.html#portfolio" class="btn btn-primary">Ver portfólio completo</a>
    </div>
  `;
}

function renderGallery(obra) {
  if (!obra.galeria || obra.galeria.length === 0) {
    return `<div class="obra-gallery-empty">${BUILDING_PLACEHOLDER_LARGE}</div>`;
  }

  const thumbs = obra.galeria
    .map(
      (src, i) => `
      <button class="obra-thumb ${i === 0 ? "is-active" : ""}" data-src="${src}" aria-label="Foto ${i + 1}">
        <img src="${src}" alt="Foto ${i + 1} — ${obra.endereco}" loading="lazy">
      </button>
    `
    )
    .join("");

  return `
    <div class="obra-gallery">
      <div class="obra-gallery-main">
        <img id="obra-main-photo" src="${obra.galeria[0]}" alt="Foto principal — ${obra.endereco}">
        <span class="card-visual-tag">Fotos reais via Google Street View</span>
      </div>
      <div class="obra-thumbs">${thumbs}</div>
    </div>
  `;
}

function setupGallery() {
  const thumbs = document.querySelectorAll(".obra-thumb");
  const main = document.getElementById("obra-main-photo");
  if (!main) return;
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      main.src = thumb.dataset.src;
      thumbs.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

function renderObra(obra) {
  const isDone = obra.status === "done";
  const badgeLabel = isDone ? "Concluída" : "Em construção";
  const badgeClass = isDone ? "" : "progress";
  const index = OBRAS.findIndex((o) => o.id === obra.id);
  const prev = OBRAS[(index - 1 + OBRAS.length) % OBRAS.length];
  const next = OBRAS[(index + 1) % OBRAS.length];

  document.title = `${obra.endereco} | Marcelo Carvalho — Engenheiro Civil`;

  document.getElementById("obra-content").innerHTML = `
    <div class="obra-header">
      <span class="section-tag">Obra ${obra.id}</span>
      <span class="card-badge ${badgeClass} obra-badge">${badgeLabel}</span>
    </div>
    <h1>${obra.endereco}</h1>
    <p class="obra-location">${BAIRRO}</p>

    ${renderGallery(obra)}

    <div class="obra-info-grid">
      <div class="obra-info-main">
        <h2>Sobre esta obra</h2>
        <p>Empreendimento residencial projetado e construído por Marcelo Carvalho no Recreio dos Bandeirantes. ${
          isDone
            ? "Obra concluída e com Habite-se emitido pela prefeitura."
            : "Obra em fase de construção, ainda sem Habite-se emitido pela prefeitura."
        }</p>
        <a href="${mapsLink(obra.endereco)}" target="_blank" rel="noopener" class="card-link">Ver endereço no Google Maps →</a>
      </div>
      <div class="obra-info-side">
        <a href="${waLink(obra.endereco)}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-large obra-whatsapp-btn">
          <svg viewBox="0 0 24 24" class="icon-wa"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.117-1.34a9.96 9.96 0 0 0 4.887 1.244h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.18-2.929-7.07a9.935 9.935 0 0 0-7.072-2.834zm0 18.163h-.003a8.16 8.16 0 0 1-4.158-1.14l-.298-.177-3.037.796.811-2.962-.194-.304a8.146 8.146 0 0 1-1.25-4.36c0-4.507 3.669-8.175 8.176-8.175a8.12 8.12 0 0 1 5.783 2.396 8.12 8.12 0 0 1 2.393 5.784c0 4.507-3.67 8.142-8.223 8.142z"/></svg>
          Perguntar sobre esta obra
        </a>
        <p class="obra-phone">${DISPLAY_PHONE}</p>
      </div>
    </div>

    <div class="obra-map-section">
      <h2>Localização</h2>
      <div id="obra-map" class="map-obras obra-map"></div>
    </div>

    <div class="obra-nav">
      <a href="obra.html?id=${prev.id}" class="obra-nav-link">← ${prev.endereco}</a>
      <a href="index.html#portfolio" class="obra-nav-back">Ver todas as obras</a>
      <a href="obra.html?id=${next.id}" class="obra-nav-link">${next.endereco} →</a>
    </div>
  `;

  setupGallery();
  initObraMap(obra);
}

function showMapError() {
  const mapEl = document.getElementById("obra-map");
  if (mapEl) {
    mapEl.innerHTML = `
      <div class="map-fallback">
        <p>Não foi possível carregar o mapa interativo agora.</p>
      </div>
    `;
  }
}

function initObraMap(obra) {
  if (typeof L === "undefined") {
    showMapError();
    return;
  }
  try {
    const map = L.map("obra-map", { scrollWheelZoom: false }).setView([obra.lat, obra.lng], 16);
    const tiles = L.tileLayer(MAP_TILE_URL, {
      maxZoom: 19,
      subdomains: "abcd",
      attribution: MAP_TILE_ATTRIBUTION,
    });
    tiles.on("tileerror", () => showMapError());
    tiles.addTo(map);

    const mapEl = document.getElementById("obra-map");
    mapEl.addEventListener("click", () => map.scrollWheelZoom.enable());
    mapEl.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());

    const isDone = obra.status === "done";
    L.circleMarker([obra.lat, obra.lng], {
      radius: 10,
      weight: 2,
      color: "#0e1a26",
      fillColor: isDone ? "#1fa855" : "#c8802a",
      fillOpacity: 0.9,
    }).addTo(map);
  } catch (e) {
    showMapError();
  }
}

function setupWhatsappLinks(obra) {
  document.querySelectorAll("#cta-header, #wa-float").forEach((el) => {
    el.href = waLink(obra ? obra.endereco : "");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  }

  const obra = getObraFromUrl();
  if (!obra) {
    renderNotFound();
    setupWhatsappLinks(null);
    return;
  }

  renderObra(obra);
  setupWhatsappLinks(obra);
});
