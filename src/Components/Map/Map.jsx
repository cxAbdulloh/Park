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
    label: "Car",
    profile: "driving",
    multiplier: 1,
    icon: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="red"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z"
            stroke="#00000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />{" "}
        </g>
      </svg>
    ),
  },
  {
    id: "foot",
    label: "Walk",
    profile: "foot",
    multiplier: 1,
    icon: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#4f4dff"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 6C14.1046 6 15 5.10457 15 4C15 2.89543 14.1046 2 13 2C11.8955 2 11 2.89543 11 4C11 5.10457 11.8955 6 13 6ZM11.0528 6.60557C11.3841 6.43992 11.7799 6.47097 12.0813 6.68627L13.0813 7.40056C13.3994 7.6278 13.5559 8.01959 13.482 8.40348L12.4332 13.847L16.8321 20.4453C17.1384 20.9048 17.0143 21.5257 16.5547 21.8321C16.0952 22.1384 15.4743 22.0142 15.168 21.5547L10.5416 14.6152L9.72611 13.3919C9.58336 13.1778 9.52866 12.9169 9.57338 12.6634L10.1699 9.28309L8.38464 10.1757L7.81282 13.0334C7.70445 13.575 7.17759 13.9261 6.63604 13.8178C6.09449 13.7094 5.74333 13.1825 5.85169 12.641L6.51947 9.30379C6.58001 9.00123 6.77684 8.74356 7.05282 8.60557L11.0528 6.60557ZM16.6838 12.9487L13.8093 11.9905L14.1909 10.0096L17.3163 11.0513C17.8402 11.226 18.1234 11.7923 17.9487 12.3162C17.7741 12.8402 17.2078 13.1234 16.6838 12.9487ZM6.12844 20.5097L9.39637 14.7001L9.70958 15.1699L10.641 16.5669L7.87159 21.4903C7.60083 21.9716 6.99111 22.1423 6.50976 21.8716C6.0284 21.6008 5.85768 20.9911 6.12844 20.5097Z"
            fill="#00000"
          />{" "}
        </g>
      </svg>
    ),
  },
  {
    id: "bus",
    label: "Bus",
    profile: "driving",
    multiplier: 1.4,
    icon: (
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="green"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M5 6V15.8C5 16.9201 5 17.4802 5.21799 17.908C5.40973 18.2843 5.71569 18.5903 6.09202 18.782C6.51984 19 7.07989 19 8.2 19H15.8C16.9201 19 17.4802 19 17.908 18.782C18.2843 18.5903 18.5903 18.2843 18.782 17.908C19 17.4802 19 16.9201 19 15.8V6M5 6C5 6 5 3 12 3C19 3 19 6 19 6M5 6H19M5 13H19M17 21V19M7 21V19M8 16H8.01M16 16H16.01"
            stroke="#00000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />{" "}
        </g>
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
            width: 32px; height: 32px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          ">
            <div style="
              width: 12px; height: 12px;
              background: #ff3b30; /* Apple Red */
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(255, 59, 48, 0.5);
            "></div>
          </div>
        `,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
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
