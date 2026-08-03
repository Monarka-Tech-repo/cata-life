import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldTopology from "world-atlas/countries-110m.json";
import { PROFILE_COLORS } from "@/lib/taste-profile";

const VIEWBOX_WIDTH = 960;
const VIEWBOX_HEIGHT = 500;

// Pure data transform, no browser APIs — safe to compute once at module
// scope (including during the static build) rather than per-render.
const topology = worldTopology as unknown as Topology;
const countries = feature(topology, topology.objects.countries as GeometryCollection);
const projection = geoNaturalEarth1().fitSize([VIEWBOX_WIDTH, VIEWBOX_HEIGHT], countries);
const pathGenerator = geoPath(projection);

const countryPaths = countries.features
  .map((f, i) => ({ id: String(f.id ?? i), d: pathGenerator(f), color: PROFILE_COLORS[i % PROFILE_COLORS.length] }))
  .filter((c): c is { id: string; d: string; color: string } => !!c.d);

// Purely decorative, non-interactive colored world map used as a background
// behind the community search bar. Static SVG (no map SDK, no network
// request) so it renders instantly and works even without a Maps API key.
export function WorldMapBackground() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {countryPaths.map((c) => (
        <path key={c.id} d={c.d} fill={c.color} fillOpacity={0.55} stroke="var(--color-background)" strokeWidth={0.5} />
      ))}
    </svg>
  );
}
