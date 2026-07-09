"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ── Custom marker icon (from public/marker.png) ── */
const markerIcon = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [32, 48], // Proporção exata de 610x918, redimensionada
  iconAnchor: [16, 48], // Ponto na base (metade do X, final do Y)
  popupAnchor: [0, -48], // O balão abre exatamente no topo do marcador
});

interface Ponto {
  id: number;
  nome: string;
  tipo: string;
  endereco: string;
  cidade: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  pontos: Ponto[];
  selected: number | null;
  onSelect: (id: number | null) => void;
}

/* ── Subcomponent to fly to selected point ── */
function FlyTo({ pontos, selected }: { pontos: Ponto[]; selected: number | null }) {
  const map = useMap();

  useEffect(() => {
    if (selected !== null) {
      const ponto = pontos.find((p) => p.id === selected);
      if (ponto) {
        map.flyTo([ponto.lat, ponto.lng], 13, { duration: 1.2 });
      }
    }
  }, [selected, pontos, map]);

  return null;
}

export default function MapView({ pontos, selected, onSelect }: MapViewProps) {
  return (
    <MapContainer
      center={[-22.8, -47.0]}
      zoom={8}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <FlyTo pontos={pontos} selected={selected} />

      {pontos.map((ponto) => (
        <Marker
          key={ponto.id}
          position={[ponto.lat, ponto.lng]}
          icon={markerIcon}
          eventHandlers={{
            click: () => onSelect(ponto.id),
          }}
        >
          <Popup>
            <div style={{ fontFamily: "var(--font-work), sans-serif" }}>
              <strong style={{ fontSize: "14px" }}>{ponto.nome}</strong>
              <br />
              <span style={{ fontSize: "11px", color: "#5B3A29", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {ponto.tipo}
              </span>
              <br />
              <span style={{ fontSize: "12px", color: "#5B3A29aa" }}>
                {ponto.endereco}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
