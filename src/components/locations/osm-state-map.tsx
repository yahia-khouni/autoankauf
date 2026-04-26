"use client";

import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon, type LatLngExpression } from "leaflet";

export interface OSMStateMapItem {
  slug: string;
  name: string;
  stateCode: string;
  cityCount: number;
  href: string;
}

interface OSMStateMapProps {
  states: OSMStateMapItem[];
  activeStateSlug: string | null;
  onActiveStateChange: (slug: string | null) => void;
}

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];

const STATE_COORDINATES: Record<string, [number, number]> = {
  "baden-wuerttemberg": [48.7758, 9.1829],
  "bayern": [48.1351, 11.582],
  "berlin": [52.52, 13.405],
  "brandenburg": [52.3906, 13.0645],
  "bremen": [53.0793, 8.8017],
  "hamburg": [53.5511, 9.9937],
  "hessen": [50.0782, 8.2398],
  "mecklenburg-vorpommern": [53.6294, 11.4148],
  "niedersachsen": [52.3759, 9.732],
  "nordrhein-westfalen": [51.2277, 6.7735],
  "rheinland-pfalz": [49.9929, 8.2473],
  "saarland": [49.2402, 6.9969],
  "sachsen": [51.0504, 13.7373],
  "sachsen-anhalt": [52.1205, 11.6276],
  "schleswig-holstein": [54.3233, 10.1228],
  "thueringen": [50.9848, 11.0299],
};

function createStateIcon(stateCode: string, isActive: boolean) {
  const bg = isActive ? "#fbbf24" : "rgba(15, 23, 42, 0.92)";
  const fg = isActive ? "#0f172a" : "#fbbf24";
  const border = isActive ? "#fde68a" : "#334155";
  const shadow = isActive ? "0 0 20px rgba(251, 191, 36, 0.55)" : "0 8px 20px rgba(0, 0, 0, 0.25)";

  return divIcon({
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    html: `<div style="display:flex;height:34px;width:34px;align-items:center;justify-content:center;border-radius:9999px;border:1px solid ${border};background:${bg};color:${fg};font-size:11px;font-weight:700;line-height:1;box-shadow:${shadow};transition:all 0.25s ease;">${stateCode}</div>`,
  });
}

function FlyToActiveState({ activeStateSlug }: { activeStateSlug: string | null }) {
  const map = useMap();

  useEffect(() => {
    if (!activeStateSlug) return;
    const coordinates = STATE_COORDINATES[activeStateSlug];
    if (!coordinates) return;

    map.flyTo(coordinates, 7, { duration: 0.45 });
  }, [activeStateSlug, map]);

  return null;
}

export function OSMStateMap({ states, activeStateSlug, onActiveStateChange }: OSMStateMapProps) {
  const statesWithCoordinates = states.filter((state) => !!STATE_COORDINATES[state.slug]);

  return (
    <MapContainer
      center={GERMANY_CENTER as LatLngExpression}
      zoom={6}
      minZoom={5}
      maxZoom={10}
      scrollWheelZoom
      className="h-full w-full z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <FlyToActiveState activeStateSlug={activeStateSlug} />

      {statesWithCoordinates.map((state) => {
        const position = STATE_COORDINATES[state.slug] as LatLngExpression;
        const isActive = state.slug === activeStateSlug;

        return (
          <Marker
            key={state.slug}
            position={position}
            title={state.name}
            icon={createStateIcon(state.stateCode, isActive)}
            eventHandlers={{
              mouseover: () => onActiveStateChange(state.slug),
              mouseout: () => onActiveStateChange(null),
              click: () => window.location.assign(state.href),
            }}
          />
        );
      })}
    </MapContainer>
  );
}
