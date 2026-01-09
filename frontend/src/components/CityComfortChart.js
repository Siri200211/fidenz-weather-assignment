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
    <div style={{ width: "100%", height: 300, marginTop: "20px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        {city} Comfort Trend
      </h3>

      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="comfort"
            stroke="#22c55e"
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
