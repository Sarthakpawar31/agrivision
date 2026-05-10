import { Activity, CloudSun, Droplets, Thermometer, Waves } from "lucide-react";
import SensorCard from "../components/cards/SensorCard";
import SensorLineChart from "../components/charts/SensorLineChart";
import SectionHeader from "../components/common/SectionHeader";
import StatePanel from "../components/common/StatePanel";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatDateTime, formatNumber, sensorStatus } from "../lib/utils";

function SensorMonitoringPage() {
  const { sensorReadings, latestSensor, loading, error } = useAgriData();

  if (loading) {
    return (
      <StatePanel
        title="Loading sensor monitoring"
        description="Gathering temperature, humidity, and soil moisture data."
      />
    );
  }

  if (error) {
    return <StatePanel title="Sensor monitoring unavailable" description={error} />;
  }

  if (!latestSensor) {
    return (
      <StatePanel
        title="No sensor readings yet"
        description="Once Raspberry Pi sends sensor values to the `sensor_readings` table, the graphs and cards will appear here."
      />
    );
  }

  const chartData = [...sensorReadings].reverse();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Environment"
        title="Sensor monitoring and trends"
        description={`Latest reading captured on ${formatDateTime(latestSensor.created_at)}.`}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-7 text-white shadow-card">
          <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  Climate intelligence
                </p>
                <h2 className="mt-3 max-w-xl text-3xl font-bold">
                  Live sensor patterns reveal field stress before the crop tells you.
                </h2>
              </div>
              <div className="rounded-3xl bg-white/15 p-4">
                <Activity className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
            <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
              <Waves className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Reading cadence
            </p>
            <h3 className="mt-2 text-2xl font-bold text-ink">{sensorReadings.length} samples</h3>
          </div>
          <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
            <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
              <Thermometer className="h-5 w-5" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Latest timestamp
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-ink">
              {formatDateTime(latestSensor.created_at)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <SensorCard
          icon={Thermometer}
          label="Temperature"
          value={formatNumber(latestSensor.temperature, 1)}
          unit="C"
          status={sensorStatus("temperature", latestSensor.temperature)}
          accent="from-primary/15 to-emerald-100"
        />
        <SensorCard
          icon={CloudSun}
          label="Humidity"
          value={formatNumber(latestSensor.humidity, 1)}
          unit="%"
          status={sensorStatus("humidity", latestSensor.humidity)}
          accent="from-emerald-100 to-white"
        />
        <SensorCard
          icon={Droplets}
          label="Soil Moisture"
          value={formatNumber(latestSensor.soil_moisture, 1)}
          unit="%"
          status={sensorStatus("soil_moisture", latestSensor.soil_moisture)}
          accent="from-yellow-50 to-primary-light"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <SensorLineChart
          data={chartData}
          dataKey="temperature"
          stroke="#16A34A"
          label="Temperature graph"
        />
        <SensorLineChart
          data={chartData}
          dataKey="humidity"
          stroke="#0F766E"
          label="Humidity graph"
        />
        <SensorLineChart
          data={chartData}
          dataKey="soil_moisture"
          stroke="#CA8A04"
          label="Soil moisture graph"
        />
      </div>
    </div>
  );
}

export default SensorMonitoringPage;
