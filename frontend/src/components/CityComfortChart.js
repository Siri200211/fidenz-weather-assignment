import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function CityComfortChart({ data, city, theme }) {
  const axisColor = theme === "dark" ? "#ffffff" : "#000000";
  const lineColor = theme === "dark" ? "#ffffff" : "#1d4ed8";
  const tooltipBg = theme === "dark" ? "#020617" : "#ffffff";
  const tooltipText = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div style={{ width: "100%", height: 250 }}>
      <h3
        style={{
          textAlign: "center",
          margin: "6px 0 10px",
          color: axisColor
        }}
      >
        {city} Temperature Trend (°C)
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
          />

          <YAxis
            stroke={axisColor}
            tick={{ fill: axisColor, fontSize: 12 }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${axisColor}`,
              color: tooltipText
            }}
            labelStyle={{ color: tooltipText }}
            itemStyle={{ color: tooltipText }}
          />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke={lineColor}
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
