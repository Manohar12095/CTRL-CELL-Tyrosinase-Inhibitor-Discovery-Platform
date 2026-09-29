"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";

interface DockingBarChartProps {
  data: Array<{
    name: string;
    id: string;
    score: number;
    role: string;
  }>;
}

const COLORS: Record<string, string> = {
  "PHMALT-01": "#7c3aed",
  "TROP-01": "#475569",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #21262d",
        borderRadius: 8,
        padding: "0.75rem 1rem",
        fontSize: "0.8125rem",
      }}
    >
      <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 4 }}>{d.payload.name}</div>
      <div style={{ fontFamily: "var(--font-mono)", color: "#7c3aed" }}>
        ΔG = {d.value.toFixed(3)} kcal/mol
      </div>
      <div style={{ color: "#64748b", fontSize: "0.7rem", marginTop: 2 }}>{d.payload.role}</div>
    </div>
  );
}

export function DockingBarChart({ data }: DockingBarChartProps) {
  // Recharts: Y-axis for negative values (more negative = better)
  const minVal = Math.min(...data.map((d) => d.score));
  const maxVal = 0;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        barSize={60}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#21262d" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#94a3b8", fontSize: 13, fontFamily: "var(--font-mono)" }}
          axisLine={{ stroke: "#21262d" }}
          tickLine={false}
        />
        <YAxis
          domain={[minVal - 0.3, maxVal]}
          tick={{ fill: "#64748b", fontSize: 11, fontFamily: "var(--font-mono)" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v.toFixed(1)}`}
          label={{
            value: "ΔG (kcal/mol)",
            angle: -90,
            position: "insideLeft",
            fill: "#475569",
            fontSize: 11,
            dx: -10,
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <ReferenceLine y={0} stroke="#21262d" />
        <Bar dataKey="score" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.id}
              fill={COLORS[entry.id] ?? "#475569"}
              fillOpacity={0.9}
            />
          ))}
          <LabelList
            dataKey="score"
            position="top"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(v: any) => `${Number(v).toFixed(3)}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fill: "#94a3b8",
              fontWeight: 600,
            }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
