import { Droplets, Thermometer, Waves } from "lucide-react";
import ChartCard from "../components/ui/ChartCard";
import SensorCard from "../components/ui/SensorCard";
import { useAgriData } from "../contexts/AgriDataContext";
import { buildChartSeries, formatNumber, sensorStatus } from "../lib/utils";

function SensorDataPage() {
  const { latestSensor, sensorData } = useAgriData();
  const series = buildChartSeries(sensorData);

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Live Sensor Data</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">DHT11, soil moisture, and field climate insights</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SensorCard
          icon={Thermometer}
          label="Temperature"
          value={formatNumber(latestSensor?.temperature)}
          unit="C"
          status={sensorStatus("temperature", latestSensor?.temperature)}
          helper="Current DHT11 temperature streamed from the robot."
        />
        <SensorCard
          icon={Waves}
          label="Humidity"
          value={formatNumber(latestSensor?.humidity)}
          unit="%"
          status={sensorStatus("humidity", latestSensor?.humidity)}
          helper="Current relative humidity around the crop area."
        />
        <SensorCard
          icon={Droplets}
          label="Soil Moisture"
          value={formatNumber(latestSensor?.soil_moisture)}
          unit="%"
          status={sensorStatus("soil_moisture", latestSensor?.soil_moisture)}
          helper="Soil moisture percentage from the field sensor."
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          title="Temperature History"
          subtitle="Recent DHT11 temperature trend from the latest sensor rows."
          data={series}
          lines={[{ dataKey: "temperature", color: "#16A34A" }]}
        />
        <ChartCard
          title="Humidity History"
          subtitle="Relative humidity trend useful for disease risk monitoring."
          data={series}
          lines={[{ dataKey: "humidity", color: "#14532D" }]}
        />
      </div>
    </div>
  );
}

export default SensorDataPage;
