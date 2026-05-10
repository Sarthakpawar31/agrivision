import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatTime, formatNumber } from "../../lib/utils";

function SensorLineChart({ data, dataKey, stroke, label }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Sensor graph
          </p>
          <h3 className="mt-2 text-xl font-bold text-ink">{label}</h3>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              dataKey="created_at"
              tickFormatter={formatTime}
              tick={{ fontSize: 12, fill: "#64748B" }}
            />
            <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                borderColor: "rgba(22, 163, 74, 0.12)",
              }}
              formatter={(value) => formatNumber(value, 1)}
              labelFormatter={formatTime}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SensorLineChart;
