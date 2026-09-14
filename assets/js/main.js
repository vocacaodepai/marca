// ============================================
// CONFIGURAÇÃO — edite aqui os dados de contato
// ============================================
const WHATSAPP_NUMBER = "5521970073346"; // formato: 55 + DDD + número, sem espaços/símbolos
const WHATSAPP_MESSAGE = "Olá, Marcelo! Vi o site e gostaria de saber mais sobre suas obras.";
const DISPLAY_PHONE = "(21) 97007-3346"; // como o telefone aparece na tela

// OBRAS e BAIRRO vêm de assets/js/obras-data.js (carregado antes deste arquivo)

// Ilustração de blueprint usada quando não há foto real disponível
const BUILDING_PLACEHOLDER = `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="14" y="24" width="34" height="50"/><rect x="54" y="10" width="30" height="64"/><rect x="90" y="34" width="20" height="40"/><line x1="14" y1="34" x2="48" y2="34"/><line x1="14" y1="44" x2="48" y2="44"/><line x1="14" y1="54" x2="48" y2="54"/><line x1="14" y1="64" x2="48" y2="64"/><line x1="54" y1="20" x2="84" y2="20"/><line x1="54" y1="32" x2="84" y2="32"/><line x1="54" y1="44" x2="84" y2="44"/><line x1="54" y1="56" x2="84" y2="56"/></svg>`;

function waLink(customMessage) {
  const msg = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function detailLink(obra) {
  return `obra.html?id=${obra.id}`;
}

function renderPortfolio(filter = "all") {
  const grid = document.getElementById("portfolio-grid");
  grid.innerHTML = "";

  OBRAS.forEach((obra, i) => {
    if (filter !== "all" && obra.status !== filter) return;

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.status = obra.status;

    const isDone = obra.status === "done";
    const badgeLabel = isDone ? "Concluída" : "Em construção";
    const badgeClass = isDone ? "" : "progress";

    const media = obra.foto
      ? `<div class="card-visual-media">
           <img src="${obra.foto}" alt="Fachada real do imóvel — ${obra.endereco}" loading="lazy">
           <span class="card-visual-tag">Foto real via Google Street View</span>
         </div>`
      : BUILDING_PLACEHOLDER;

    card.innerHTML = `
      <a class="card-visual-link" href="${detailLink(obra)}" aria-label="Ver detalhes da obra ${obra.endereco}">
        <div class="card-visual">
          <span class="card-index">OBRA ${String(i + 1).padStart(2, "0")}</span>
          <span class="card-badge ${badgeClass}">${badgeLabel}</span>
          ${media}
        </div>
      </a>
      <div class="card-body">
        <h3><a href="${detailLink(obra)}">${obra.endereco}</a></h3>
        <p class="card-address">${BAIRRO}</p>
        <a class="card-link" href="${detailLink(obra)}">Ver detalhes e fotos →</a>
      </div>
    `;
    grid.appendChild(card);

    const img = card.querySelector(".card-visual-media img");
    if (img) img.addEventListener("load", () => img.classList.add("is-loaded"));
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderPortfolio(btn.dataset.filter);
    });
  });
}

function setupNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );
}

// Tiles CartoDB Positron: CDN dedicado e confiável para uso em produção,
// combina com o visual minimalista/blueprint do site (sem precisar de chave).
const MAP_TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const MAP_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function showMapError() {
  const mapEl = document.getElementById("map-obras");
  const statusEl = document.getElementById("mapa-status");
  if (mapEl) {
    mapEl.innerHTML = `
      <div class="map-fallback">
        <p>Não foi possível carregar o mapa interativo agora.</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BAIRRO)}" target="_blank" rel="noopener" class="btn btn-outline btn-small">Ver região no Google Maps →</a>
      </div>
    `;
  }
  if (statusEl) statusEl.textContent = "";
}

function initMap() {
  if (typeof L === "undefined") {
    showMapError();
    return;
  }

  try {
    const map = L.map("map-obras", { scrollWheelZoom: false }).setView([-23.017, -43.466], 14);

    const tiles = L.tileLayer(MAP_TILE_URL, {
      maxZoom: 19,
      subdomains: "abcd",
      attribution: MAP_TILE_ATTRIBUTION,
    });
    tiles.on("tileerror", () => {
      // Se os tiles não carregarem (ex.: rede bloqueando o provedor), mostra reserva
      showMapError();
    });
    tiles.addTo(map);

    const mapEl = document.getElementById("map-obras");
    mapEl.addEventListener("click", () => map.scrollWheelZoom.enable());
    mapEl.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());

    const bounds = [];
    OBRAS.forEach((obra, i) => {
      const isDone = obra.status === "done";
      const marker = L.circleMarker([obra.lat, obra.lng], {
        radius: 9,
        weight: 2,
        color: "#0e1a26",
        fillColor: isDone ? "#1fa855" : "#c8802a",
        fillOpacity: 0.9,
      }).addTo(map);

      marker.bindPopup(`
        <span class="map-popup-title">Obra ${String(i + 1).padStart(2, "0")} — ${obra.endereco}</span>
        <span class="map-popup-status">${isDone ? "Concluída" : "Em construção"}</span><br>
        <a class="map-popup-link" href="${detailLink(obra)}">Ver detalhes e fotos →</a>
      `);

      bounds.push([obra.lat, obra.lng]);
    });

    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });

    const statusEl = document.getElementById("mapa-status");
    if (statusEl) statusEl.textContent = `${OBRAS.length} obras localizadas no mapa.`;
  } catch (e) {
    showMapError();
  }
}

function setupWhatsappLinks() {
  document.querySelectorAll("#cta-header, #cta-contato, #wa-float").forEach((el) => {
    el.href = waLink();
  });
  const phoneEl = document.getElementById("contato-telefone");
  if (phoneEl) phoneEl.textContent = DISPLAY_PHONE;
}

document.addEventListener("DOMContentLoaded", () => {
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();
  renderPortfolio();
  setupFilters();
  setupNav();
  setupWhatsappLinks();
  initMap();
});
