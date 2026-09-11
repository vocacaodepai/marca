// ============================================
// CONFIGURAÇÃO — edite aqui os dados de contato
// ============================================
const WHATSAPP_NUMBER = "5521999999999"; // formato: 55 + DDD + número, sem espaços/símbolos
const WHATSAPP_MESSAGE = "Olá, Marcelo! Vi o site e gostaria de saber mais sobre suas obras.";
const DISPLAY_PHONE = "(21) 99999-9999"; // como o telefone aparece na tela

// ============================================
// OBRAS — Recreio dos Bandeirantes
// ============================================
// lat/lng: geocodificados uma única vez com a Google Geocoding API (precisão "ROOFTOP"
// na maioria dos casos). foto: caminho da imagem real (Google Street View Static API);
// null quando não há cobertura oficial do Google Street View naquele endereço — nesse
// caso o card usa a ilustração de blueprint como reserva.
const OBRAS = [
  { endereco: "Av. Genaro de Carvalho, 2350", status: "done", lat: -23.0184499, lng: -43.4674962, foto: "assets/img/obras/obra-01.jpg" },
  { endereco: "Rua Joaquim da Silveira, 265", status: "done", lat: -23.0200147, lng: -43.4691939, foto: null },
  { endereco: "Rua Clóvis Salgado, 85", status: "done", lat: -23.022892, lng: -43.4638508, foto: "assets/img/obras/obra-03.jpg" },
  { endereco: "Rua Joaquim da Silveira, 251", status: "done", lat: -23.0202387, lng: -43.4690059, foto: "assets/img/obras/obra-04.jpg" },
  { endereco: "Rua Joaquim Moreira Neves, 288", status: "done", lat: -23.0212518, lng: -43.4668122, foto: "assets/img/obras/obra-05.jpg" },
  { endereco: "Rua Joaquim Moreira Neves, 375", status: "done", lat: -23.0210361, lng: -43.4669178, foto: "assets/img/obras/obra-06.jpg" },
  { endereco: "Rua Professora Souza Leão, 90", status: "done", lat: -23.0232323, lng: -43.4556574, foto: "assets/img/obras/obra-07.jpg" },
  { endereco: "Av. Lúcio Costa, 16730", status: "done", lat: -23.0252049, lng: -43.4590624, foto: "assets/img/obras/obra-08.jpg" },
  { endereco: "Rua Demósthenes Madureira de Pinho, 221", status: "done", lat: -23.0244165, lng: -43.4595358, foto: "assets/img/obras/obra-09.jpg" },
  { endereco: "Av. Genaro de Carvalho, 2307", status: "done", lat: -23.0188952, lng: -43.4672298, foto: "assets/img/obras/obra-10.jpg" },
  { endereco: "Rua Rabino Henrique Lemle, 357", status: "done", lat: -23.0169051, lng: -43.4528878, foto: "assets/img/obras/obra-11.jpg" },
  { endereco: "Rua Mário Faustino, 345", status: "done", lat: -23.0178404, lng: -43.462147, foto: "assets/img/obras/obra-12.jpg" },
  { endereco: "Av. Genaro de Carvalho, 975", status: "done", lat: -23.0156244, lng: -43.454711, foto: "assets/img/obras/obra-13.jpg" },
  { endereco: "Rua Jorge Emílio Fontenelle, 873", status: "done", lat: -23.0148888, lng: -43.4546019, foto: "assets/img/obras/obra-14.jpg" },
  { endereco: "Av. Jarbas de Carvalho, 835", status: "done", lat: -23.0238425, lng: -43.4749859, foto: "assets/img/obras/obra-15.jpg" },
  { endereco: "Av. Genaro de Carvalho, 3842", status: "progress", lat: -23.0221555, lng: -43.4815884, foto: "assets/img/obras/obra-16.jpg" },
  { endereco: "Rua Desembargador Paulo Alonso, 282", status: "progress", lat: -23.0205181, lng: -43.4811422, foto: "assets/img/obras/obra-17.jpg" },
  { endereco: "Rua Desembargador Paulo Alonso, 619", status: "done", lat: -23.0185352, lng: -43.4768845, foto: "assets/img/obras/obra-18.jpg" },
  { endereco: "Rua Ministro Aliomar Baleeiro, 111", status: "done", lat: -23.0192192, lng: -43.4797893, foto: "assets/img/obras/obra-19.jpg" },
  { endereco: "Rua São Francisco de Assis, 223", status: "done", lat: -23.019775, lng: -43.4755258, foto: "assets/img/obras/obra-20.jpg" },
];

const BAIRRO = "Recreio dos Bandeirantes, Rio de Janeiro - RJ";

// Ilustração de blueprint usada quando não há foto real disponível
const BUILDING_PLACEHOLDER = `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="14" y="24" width="34" height="50"/><rect x="54" y="10" width="30" height="64"/><rect x="90" y="34" width="20" height="40"/><line x1="14" y1="34" x2="48" y2="34"/><line x1="14" y1="44" x2="48" y2="44"/><line x1="14" y1="54" x2="48" y2="54"/><line x1="14" y1="64" x2="48" y2="64"/><line x1="54" y1="20" x2="84" y2="20"/><line x1="54" y1="32" x2="84" y2="32"/><line x1="54" y1="44" x2="84" y2="44"/><line x1="54" y1="56" x2="84" y2="56"/></svg>`;

function waLink(customMessage) {
  const msg = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function mapsLink(endereco) {
  const q = encodeURIComponent(`${endereco}, ${BAIRRO}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
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
      <div class="card-visual">
        <span class="card-index">OBRA ${String(i + 1).padStart(2, "0")}</span>
        <span class="card-badge ${badgeClass}">${badgeLabel}</span>
        ${media}
      </div>
      <div class="card-body">
        <h3>${obra.endereco}</h3>
        <p class="card-address">${BAIRRO}</p>
        <a class="card-link" href="${mapsLink(obra.endereco)}" target="_blank" rel="noopener">Ver no mapa →</a>
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
  toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("is-open"))
  );
}

function initMap() {
  if (typeof L === "undefined") return;
  const map = L.map("map-obras", { scrollWheelZoom: false }).setView([-23.017, -43.466], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

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
      <a class="map-popup-link" href="${mapsLink(obra.endereco)}" target="_blank" rel="noopener">Abrir no Google Maps →</a>
    `);

    bounds.push([obra.lat, obra.lng]);
  });

  map.fitBounds(bounds, { padding: [30, 30], maxZoom: 16 });

  const statusEl = document.getElementById("mapa-status");
  if (statusEl) statusEl.textContent = `${OBRAS.length} obras localizadas no mapa.`;
}

function setupWhatsappLinks() {
  document.querySelectorAll("#cta-header, #cta-contato, #wa-float").forEach((el) => {
    el.href = waLink();
  });
  document.getElementById("contato-telefone").textContent = DISPLAY_PHONE;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ano").textContent = new Date().getFullYear();
  renderPortfolio();
  setupFilters();
  setupNav();
  setupWhatsappLinks();
  initMap();
});
