import { useState, useEffect, useRef, useCallback } from "react";
import "./Map.css";

const DEST = { lat: 41.3135675, lng: 69.2977087 };
const DEST_NAME = "Ташкент, ул. Мавераннахр, 21";
const DEST_SUB = "Central Park Tashkent";
const LEAFLET_CSS =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
const OSRM_BASE = "https://router.project-osrm.org/route/v1";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";

const MODES = [
  {
    id: "car",
    label: "Mashina",
    profile: "driving",
    multiplier: 1,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M18 17H6a2 2 0 01-2-2v-4l2.5-5h11L20 11v4a2 2 0 01-2 2z" />
        <circle cx="7.5" cy="17" r="2" />
        <circle cx="16.5" cy="17" r="2" />
        <path d="M4 11h16" />
      </svg>
    ),
  },
  {
    id: "foot",
    label: "Piyoda",
    profile: "foot",
    multiplier: 1,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <circle cx="13" cy="4" r="1.4" fill="currentColor" stroke="none" />
        <path d="M8 21l2.5-6.5L13 17l2.5-7L18 13" />
        <path d="M9.5 12l1-4 2.5-2 3.5 1.5" />
      </svg>
    ),
  },
  {
    id: "bus",
    label: "Avtobus",
    profile: "driving",
    multiplier: 1.4,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="13" rx="2" />
        <path d="M3 10h18M9 19l-1 2M15 19l1 2" />
        <circle cx="7.5" cy="15" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="15" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function formatTime(mins) {
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)} soat ${mins % 60} min`;
}

function makePin(color, size = 16) {
  return `<div style="
    width:${size}px;height:${size}px;border-radius:50%;
    background:${color};border:2.5px solid #fff;
    box-shadow:0 2px 8px rgba(0,0,0,.28);">
  </div>`;
}

let leafletReady = !!window.L;
const leafletCallbacks = [];

function loadLeaflet(cb) {
  if (leafletReady) {
    cb();
    return;
  }
  leafletCallbacks.push(cb);
  if (leafletCallbacks.length > 1) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS;
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = LEAFLET_JS;
  script.onload = () => {
    leafletReady = true;
    leafletCallbacks.forEach((fn) => fn());
    leafletCallbacks.length = 0;
  };
  document.head.appendChild(script);
}

export default function Map() {
  const mapEl = useRef(null);
  const mapInst = useRef(null);
  const routeLyr = useRef(null);
  const fromMark = useRef(null);
  const destMark = useRef(null);

  const [mode, setMode] = useState("car");
  const [inputVal, setInputVal] = useState("");
  const [fromCoords, setFromCoords] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLeaflet(initMap);
    return () => {
      mapInst.current?.remove();
      mapInst.current = null;
    };
  }, []);

  function initMap() {
    if (mapInst.current || !mapEl.current) return;
    const L = window.L;

    const map = L.map(mapEl.current, {
      zoomControl: false,
      crs: L.CRS.EPSG3857,
    }).setView([DEST.lat, DEST.lng], 14);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap © CARTO",
        maxZoom: 19,
      }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    destMark.current = L.marker([DEST.lat, DEST.lng], {
      icon: L.divIcon({
        html: `
              <div style="
                width: 30px; height: 30px;
                background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex; align-items: center; justify-content: center;
                border: 2px solid white;
                box-shadow: 0 4px 10px rgba(0,0,0,0.25);
              ">
                <div style="
                  width: 10px; height: 10px;
                  background: white;
                  border-radius: 50%;
                  transform: rotate(45deg);
                "></div>
              </div>
            `,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      }),
    })
      .addTo(map)
      .bindPopup(
        `<b>${DEST_NAME}</b><br><span style="font-size:12px;color:#6b7280">${DEST_SUB}</span>`
      );

    map.on("click", (e) => {
      const c = { lat: e.latlng.lat, lng: e.latlng.lng };
      setFromCoords(c);
      setInputVal(`${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}`);
    });

    mapInst.current = map;
  }

  const placeFromMarker = useCallback((coords) => {
    if (!mapInst.current) return;
    const L = window.L;
    if (fromMark.current) mapInst.current.removeLayer(fromMark.current);
    fromMark.current = L.marker([coords.lat, coords.lng], {
      icon: L.divIcon({
        html: makePin("#185FA5", 14),
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      }),
    }).addTo(mapInst.current);
  }, []);

  const fetchRoute = useCallback(async (from, modeId) => {
    const m = MODES.find((x) => x.id === modeId);
    setIsLoading(true);
    setStatus("The path is being calculated...");
    try {
      const url =
        `${OSRM_BASE}/${m.profile}/${from.lng},${from.lat};${DEST.lng},${DEST.lat}` +
        `?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.routes?.length) throw new Error("No route found");

      const route = data.routes[0];
      const seconds = route.duration * m.multiplier;
      const meters = route.distance;

      if (routeLyr.current) mapInst.current.removeLayer(routeLyr.current);
      routeLyr.current = window.L.geoJSON(route.geometry, {
        style: {
          color: "#E24B4A",
          weight: 5,
          opacity: 0.88,
          lineCap: "round",
          lineJoin: "round",
        },
      }).addTo(mapInst.current);

      mapInst.current.fitBounds(routeLyr.current.getBounds(), {
        padding: [56, 56],
      });

      setRouteInfo({
        mins: Math.round(seconds / 60),
        km: (meters / 1000).toFixed(1),
      });
      setStatus("");
    } catch {
      setStatus("Path not found, Check the Internet.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!fromCoords) return;
    placeFromMarker(fromCoords);
    fetchRoute(fromCoords, mode);
  }, [fromCoords]);

  useEffect(() => {
    if (fromCoords) fetchRoute(fromCoords, mode);
  }, [mode]);

  async function resolveAddress() {
    const val = inputVal.trim();
    if (!val) return;

    const m = val.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/);
    if (m) {
      setFromCoords({ lat: parseFloat(m[1]), lng: parseFloat(m[2]) });
      return;
    }

    setIsLoading(true);
    setStatus("Manzil qidirilmoqda…");
    try {
      const r = await fetch(
        `${NOMINATIM}?q=${encodeURIComponent(val)}&format=json&limit=1&countrycodes=uz`
      );
      const d = await r.json();
      if (!d.length) {
        setStatus("Manzil topilmadi.");
        return;
      }
      setFromCoords({ lat: parseFloat(d[0].lat), lng: parseFloat(d[0].lon) });
      setStatus("");
    } catch {
      setStatus("Search error.");
    } finally {
      setIsLoading(false);
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported.");
      return;
    }
    setStatus("Determining your location...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setFromCoords(c);
        setInputVal(`${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}`);
        setStatus("");
      },
      () => setStatus("Location not allowed."),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  const currentMode = MODES.find((m) => m.id === mode);

  return (
    <section className="ms-root" aria-label="Route map">
      <aside className="ms-panel">
        <div className="ms-dest">
          <span className="ms-dest__pin" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="15"
              height="15"
            >
              <path d="M12 21s-7-6.5-7-11a7 7 0 0114 0c0 4.5-7 11-7 11z" />
              <circle
                cx="12"
                cy="10"
                r="2.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </span>
          <div>
            <p className="ms-dest__name">{DEST_NAME}</p>
            <p className="ms-dest__sub">{DEST_SUB}</p>
          </div>
        </div>

        <div className="ms-divider" />

        <div className="ms-modes" role="group" aria-label="Type of transport">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`ms-mode-btn ${mode === m.id ? "ms-mode-btn--active" : ""}`}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
            >
              <span className="ms-mode-btn__icon">{m.icon}</span>
              <span className="ms-mode-btn__label">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="ms-from">
          <label className="ms-label" htmlFor="ms-from-input">
            Qayerdan
          </label>
          <div className="ms-input-row">
            <div className="ms-input-wrap">
              <span className="ms-input-dot" aria-hidden="true" />
              <input
                id="ms-from-input"
                className="ms-input"
                type="text"
                placeholder="Address or coordinates..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && resolveAddress()}
                autoComplete="off"
              />
              <button
                className="ms-geo-btn"
                onClick={detectLocation}
                title="Find my location"
                aria-label="GPS location determination"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22" />
                </svg>
              </button>
            </div>
            <button
              className="ms-go-btn"
              onClick={resolveAddress}
              aria-label="Direction calculation"
            >
              →
            </button>
          </div>
        </div>

        {routeInfo && (
          <div className="ms-time-card" aria-live="polite">
            <div className="ms-time-card__main">
              <span className="ms-time-card__value">
                {formatTime(routeInfo.mins)}
              </span>
              <span className="ms-time-card__mode-icon">
                {currentMode.icon}
              </span>
            </div>
            <div className="ms-time-card__meta">
              <span>{routeInfo.km} km</span>
              <span className="ms-time-card__sep">·</span>
              <span>{currentMode.label} with</span>
            </div>
          </div>
        )}

        {(status || isLoading) && (
          <p
            className={`ms-status ${isLoading ? "ms-status--loading" : ""}`}
            aria-live="polite"
          >
            {isLoading && <span className="ms-spinner" aria-hidden="true" />}
            {status}
          </p>
        )}

        <p className="ms-hint">
          Click on the map to enter a starting point or type an address
        </p>
      </aside>

      <div
        ref={mapEl}
        className="ms-map"
        role="application"
        aria-label="Interaktiv xarita"
      />
    </section>
  );
}
