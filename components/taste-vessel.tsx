// Web port of d:\CATA\CATA_App\src\components\TasteProfile.js's TasteVessel —
// same geometry math (plate sliced into pie segments), swapped from
// react-native-svg to plain <svg>.
import type { ProfileSegment } from "@/lib/taste-profile";

const PLATE_CX = 50;
const PLATE_CY = 50;
const PLATE_R = 44;

function polarPoint(angle: number): [number, number] {
  return [PLATE_CX + PLATE_R * Math.cos(angle), PLATE_CY + PLATE_R * Math.sin(angle)];
}

function sectorPath(startAngle: number, endAngle: number): string {
  if (endAngle - startAngle >= Math.PI * 2 - 0.0001) {
    const [x1, y1] = polarPoint(startAngle);
    const [xMid, yMid] = polarPoint(startAngle + Math.PI);
    return `M${x1},${y1} A${PLATE_R},${PLATE_R} 0 1,1 ${xMid},${yMid} A${PLATE_R},${PLATE_R} 0 1,1 ${x1},${y1} Z`;
  }
  const [x1, y1] = polarPoint(startAngle);
  const [x2, y2] = polarPoint(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M${PLATE_CX},${PLATE_CY} L${x1},${y1} A${PLATE_R},${PLATE_R} 0 ${largeArc},1 ${x2},${y2} Z`;
}

type Slice = ProfileSegment & { d: string; angleEnd: number };

export function TasteVessel({ segments, size = 120 }: { segments: ProfileSegment[]; size?: number }) {
  const slices = segments.reduce<Slice[]>((acc, seg) => {
    const angleStart = acc.length ? acc[acc.length - 1].angleEnd : -Math.PI / 2;
    const angleEnd = angleStart + (seg.pct / 100) * Math.PI * 2;
    return [...acc, { ...seg, d: sectorPath(angleStart, angleEnd), angleEnd }];
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Distribución de tu perfil de sabor">
      {slices.length > 0 ? (
        slices.map((sl) => <path key={sl.key} d={sl.d} fill={sl.color} />)
      ) : (
        <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R} fill="var(--color-border)" />
      )}
      <circle cx={PLATE_CX} cy={PLATE_CY} r={PLATE_R} fill="none" stroke="var(--color-foreground)" strokeWidth={2} />
    </svg>
  );
}
