import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CityComfortChart({ data, city }) {
  return (
    <div style={{ width: "100%", height: 250 }}>
      <h3 style={{ textAlign: "center", margin: "6px 0 10px", color: "#000" }}>
        {city} Comfort Trend
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          {/* X Axis */}
          <XAxis
            dataKey="time"
            stroke="#000"
            tick={{ fill: "#000", fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, 100]}
            stroke="#000"
            tick={{ fill: "#000", fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #000",
              color: "#000"
            }}
            labelStyle={{ color: "#000" }}
            itemStyle={{ color: "#000" }}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="comfort"
            stroke="#448a59"
            strokeWidth={3}
            dot
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CityComfortChart;
