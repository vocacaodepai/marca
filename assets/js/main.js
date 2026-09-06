// ============================================
// CONFIGURAÇÃO — edite aqui os dados de contato
// ============================================
const WHATSAPP_NUMBER = "5521999999999"; // formato: 55 + DDD + número, sem espaços/símbolos
const WHATSAPP_MESSAGE = "Olá, Marcelo! Vi o site e gostaria de saber mais sobre suas obras.";
const DISPLAY_PHONE = "(21) 99999-9999"; // como o telefone aparece na tela

// ============================================
// OBRAS — Recreio dos Bandeirantes
// ============================================
const OBRAS = [
  { endereco: "Av. Genaro de Carvalho, 2350", status: "done" },
  { endereco: "Rua Joaquim da Silveira, 265", status: "done" },
  { endereco: "Rua Clóvis Salgado, 85", status: "done" },
  { endereco: "Rua Joaquim da Silveira, 251", status: "done" },
  { endereco: "Rua Joaquim Moreira Neves, 288", status: "done" },
  { endereco: "Rua Joaquim Moreira Neves, 375", status: "done" },
  { endereco: "Rua Professora Souza Leão, 90", status: "done" },
  { endereco: "Av. Lúcio Costa, 16730", status: "done" },
  { endereco: "Rua Demósthenes Madureira de Pinho, 221", status: "done" },
  { endereco: "Av. Genaro de Carvalho, 2307", status: "done" },
  { endereco: "Rua Rabino Henrique Lemle, 357", status: "done" },
  { endereco: "Rua Mário Faustino, 345", status: "done" },
  { endereco: "Av. Genaro de Carvalho, 975", status: "done" },
  { endereco: "Rua Jorge Emílio Fontenelle, 873", status: "done" },
  { endereco: "Av. Jarbas de Carvalho, 835", status: "done" },
  { endereco: "Av. Genaro de Carvalho, 3842", status: "progress" },
  { endereco: "Rua Desembargador Paulo Alonso, 282", status: "progress" },
  { endereco: "Rua Desembargador Paulo Alonso, 619", status: "done" },
  { endereco: "Rua Ministro Aliomar Baleeiro, 111", status: "done" },
  { endereco: "Rua São Francisco de Assis, 223", status: "done" },
];

const BAIRRO = "Recreio dos Bandeirantes, Rio de Janeiro - RJ";

// Variações de silhueta (SVG) usadas ciclicamente nos cards do portfólio
const BUILDING_SHAPES = [
  `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="14" y="24" width="34" height="50"/><rect x="54" y="10" width="30" height="64"/><rect x="90" y="34" width="20" height="40"/><line x1="20" y1="34" x2="20" y2="34"/><line x1="14" y1="34" x2="48" y2="34"/><line x1="14" y1="44" x2="48" y2="44"/><line x1="14" y1="54" x2="48" y2="54"/><line x1="14" y1="64" x2="48" y2="64"/><line x1="54" y1="20" x2="84" y2="20"/><line x1="54" y1="32" x2="84" y2="32"/><line x1="54" y1="44" x2="84" y2="44"/><line x1="54" y1="56" x2="84" y2="56"/></svg>`,
  `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><polygon points="20,74 20,34 45,18 70,34 70,74"/><rect x="80" y="40" width="26" height="34"/><line x1="20" y1="44" x2="70" y2="44"/><line x1="20" y1="54" x2="70" y2="54"/><line x1="20" y1="64" x2="70" y2="64"/><line x1="45" y1="18" x2="45" y2="74"/></svg>`,
  `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="10" y="30" width="100" height="44"/><line x1="10" y1="42" x2="110" y2="42"/><line x1="10" y1="54" x2="110" y2="54"/><line x1="10" y1="64" x2="110" y2="64"/><line x1="30" y1="30" x2="30" y2="74"/><line x1="60" y1="30" x2="60" y2="74"/><line x1="90" y1="30" x2="90" y2="74"/><line x1="10" y1="30" x2="60" y2="10"/><line x1="60" y1="10" x2="110" y2="30"/></svg>`,
  `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="24" y="14" width="40" height="60"/><rect x="64" y="34" width="30" height="40"/><line x1="24" y1="24" x2="64" y2="24"/><line x1="24" y1="34" x2="64" y2="34"/><line x1="24" y1="44" x2="64" y2="44"/><line x1="24" y1="54" x2="64" y2="54"/><line x1="24" y1="64" x2="64" y2="64"/><line x1="64" y1="44" x2="94" y2="44"/><line x1="64" y1="54" x2="94" y2="54"/><line x1="64" y1="64" x2="94" y2="64"/></svg>`,
];

const GEO_CACHE_KEY = "mc_obras_geocode_v1";
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
const GEOCODE_DELAY_MS = 1100; // respeita o limite de 1 req/s da política de uso do Nominatim

function loadGeoCache() {
  try {
    return JSON.parse(localStorage.getItem(GEO_CACHE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveGeoCache(cache) {
  try {
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    /* localStorage indisponível — segue sem cache */
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocodeAddress(endereco) {
  const query = `${endereco}, ${BAIRRO}, Brasil`;
  const url = `${NOMINATIM_URL}?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("geocode failed");
  const data = await res.json();
  if (!data.length) throw new Error("sem resultado");
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

function streetViewUrl(lat, lon) {
  return `https://maps.google.com/maps?layer=c&cbll=${lat},${lon}&cbp=11,0,0,0,0&output=svembed`;
}

function waLink(customMessage) {
  const msg = encodeURIComponent(customMessage || WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

function mapsLink(endereco) {
  const q = encodeURIComponent(`${endereco}, ${BAIRRO}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const resolvedCoords = {};

function reapplyStreetViews() {
  Object.keys(resolvedCoords).forEach((index) => {
    const { lat, lon } = resolvedCoords[index];
    showStreetViewOnCard(index, lat, lon);
  });
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
    const shape = BUILDING_SHAPES[i % BUILDING_SHAPES.length];

    card.innerHTML = `
      <div class="card-visual" id="card-visual-${i}">
        <span class="card-index">OBRA ${String(i + 1).padStart(2, "0")}</span>
        <span class="card-badge ${badgeClass}">${badgeLabel}</span>
        ${shape}
      </div>
      <div class="card-body">
        <h3>${obra.endereco}</h3>
        <p class="card-address">${BAIRRO}</p>
        <a class="card-link" href="${mapsLink(obra.endereco)}" target="_blank" rel="noopener">Ver no mapa →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

function showStreetViewOnCard(index, lat, lon) {
  const visual = document.getElementById(`card-visual-${index}`);
  if (!visual) return;
  const media = document.createElement("div");
  media.className = "card-visual-media";
  media.innerHTML = `
    <iframe src="${streetViewUrl(lat, lon)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    <span class="card-visual-tag">Foto real via Google Street View</span>
  `;
  visual.appendChild(media);
  const iframe = media.querySelector("iframe");
  iframe.addEventListener("load", () => iframe.classList.add("is-loaded"));
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderPortfolio(btn.dataset.filter);
      reapplyStreetViews();
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

let map = null;
const mapBounds = [];

function initMap() {
  if (typeof L === "undefined") return null;
  map = L.map("map-obras", { scrollWheelZoom: false }).setView([-23.017, -43.466], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const mapEl = document.getElementById("map-obras");
  mapEl.addEventListener("click", () => map.scrollWheelZoom.enable());
  mapEl.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
  return map;
}

function addMarkerToMap(obra, index, lat, lon) {
  if (!map) return;
  const isDone = obra.status === "done";
  const marker = L.circleMarker([lat, lon], {
    radius: 9,
    weight: 2,
    color: "#0e1a26",
    fillColor: isDone ? "#1fa855" : "#c8802a",
    fillOpacity: 0.9,
  }).addTo(map);

  marker.bindPopup(`
    <span class="map-popup-title">Obra ${String(index + 1).padStart(2, "0")} — ${obra.endereco}</span>
    <span class="map-popup-status">${isDone ? "Concluída" : "Em construção"}</span><br>
    <a class="map-popup-link" href="${mapsLink(obra.endereco)}" target="_blank" rel="noopener">Abrir no Google Maps →</a>
  `);

  mapBounds.push([lat, lon]);
  if (mapBounds.length === 1) {
    map.setView([lat, lon], 15);
  } else {
    map.fitBounds(mapBounds, { padding: [30, 30], maxZoom: 16 });
  }
}

async function geocodeAll() {
  const statusEl = document.getElementById("mapa-status");
  const cache = loadGeoCache();
  let resolved = 0;
  let failed = 0;

  for (let i = 0; i < OBRAS.length; i++) {
    const obra = OBRAS[i];
    let coords = cache[obra.endereco];

    if (!coords) {
      try {
        coords = await geocodeAddress(obra.endereco);
        cache[obra.endereco] = coords;
        saveGeoCache(cache);
        await sleep(GEOCODE_DELAY_MS);
      } catch (e) {
        failed++;
        if (statusEl) {
          statusEl.textContent = `Localizando obras no mapa… (${resolved + failed}/${OBRAS.length})`;
        }
        continue;
      }
    }

    resolved++;
    resolvedCoords[i] = coords;
    addMarkerToMap(obra, i, coords.lat, coords.lon);
    showStreetViewOnCard(i, coords.lat, coords.lon);

    if (statusEl) {
      statusEl.textContent = `Localizando obras no mapa… (${resolved + failed}/${OBRAS.length})`;
    }
  }

  if (statusEl) {
    statusEl.textContent = failed
      ? `${resolved} de ${OBRAS.length} obras localizadas no mapa.`
      : `${resolved} obras localizadas no mapa.`;
  }
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
  geocodeAll();
});
