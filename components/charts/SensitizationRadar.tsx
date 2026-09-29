"use client";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { PredSkinResult } from "@/lib/compounds";
import { parseKEBreakdown } from "@/lib/utils";

interface SensitizationRadarProps {
  compounds: Array<{
    id: string;
    name: string;
    predskin: PredSkinResult;
    color: string;
  }>;
}

export function SensitizationRadar({ compounds }: SensitizationRadarProps) {
  // Build unified KE keys from all compounds
  const allKeys = Array.from(
    new Set(compounds.flatMap((c) => Object.keys(c.predskin.ke_breakdown)))
  );

  // Build radar data: one object per KE key
  const radarData = allKeys.map((key) => {
    const entry: Record<string, string | number> = { key };
    for (const c of compounds) {
      const ke: string | undefined = c.predskin.ke_breakdown[key];
      if (ke) {
        const match = ke.match(/(\d+\.?\d*)%/);
        entry[c.id] = match ? parseFloat(match[1]) : 0;
      } else {
        entry[c.id] = 0;
      }
    }
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={radarData} margin={{ top: 10, right: 40, bottom: 10, left: 40 }}>
        <PolarGrid stroke="#21262d" />
        <PolarAngleAxis
          dataKey="key"
          tick={{ fill: "#94a3b8", fontSize: 11, fontFamily: "var(--font-mono)" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#475569", fontSize: 9 }}
          tickCount={5}
        />
        {compounds.map((c) => (
          <Radar
            key={c.id}
            name={c.name}
            dataKey={c.id}
            stroke={c.color}
            fill={c.color}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        <Legend
          wrapperStyle={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "#94a3b8" }}
        />
        <Tooltip
          contentStyle={{
            background: "#0d1117",
            border: "1px solid #21262d",
            borderRadius: 8,
            fontSize: 12,
            fontFamily: "var(--font-mono)",
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any, name: any) => [`${Number(value).toFixed(1)}%`, name]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
