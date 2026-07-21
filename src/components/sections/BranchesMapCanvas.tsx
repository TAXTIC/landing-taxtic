"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";

import type { Branch } from "@/content-lib/schemas/site.schema";

// Color de marca para el marcador Leaflet: un divIcon recibe HTML como string,
// no admite variables CSS del sistema, así que el naranjo va inline aquí.
const orangeSquareIcon = L.divIcon({
  className: "",
  html: '<span style="display:block;width:16px;height:16px;background:#ef7c15;box-shadow:0 0 0 3px rgba(0,0,0,0.35)"></span>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function FitToBranches({ branches }: { branches: Branch[] }) {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(
      branches.map((b) => [b.address.lat, b.address.lng] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
  }, [map, branches]);
  return null;
}

interface BranchesMapCanvasProps {
  branches: Branch[];
}

export default function BranchesMapCanvas({
  branches,
}: BranchesMapCanvasProps) {
  // FitToBranches sobrescribe este centro vía fitBounds tras el primer render;
  // el valor solo necesita ser un punto válido dentro de Chile.
  const initialCenter: [number, number] = [
    branches[0]?.address.lat ?? -34.9853,
    branches[0]?.address.lng ?? -71.2398,
  ];

  return (
    <MapContainer
      center={initialCenter}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      className="absolute inset-0 size-full"
      attributionControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {branches.map((b) => (
        <Marker
          key={b.id}
          position={[b.address.lat, b.address.lng]}
          icon={orangeSquareIcon}
          title={b.label}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[0, -12]}
            className="tx-map-label"
          >
            {b.label}
          </Tooltip>
        </Marker>
      ))}
      <ZoomControl position="bottomright" />
      <FitToBranches branches={branches} />
    </MapContainer>
  );
}
