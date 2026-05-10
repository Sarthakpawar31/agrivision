import {
  BatteryCharging,
  Clock3,
  Droplets,
  FlaskConical,
  MapPinned,
  ShieldAlert,
  Thermometer,
  Waves,
} from "lucide-react";
import DashboardCard from "../components/ui/DashboardCard";
import DiseaseResultCard from "../components/ui/DiseaseResultCard";
import PlantImageCard from "../components/ui/PlantImageCard";
import StatusBadge from "../components/ui/StatusBadge";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatDateTime, formatNumber, sensorStatus } from "../lib/utils";

function DashboardPage() {
  const { latestAnalysis, latestSensor, latestLocation, latestRobotStatus, meta } = useAgriData();

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-primary-dark via-primary to-emerald-500 p-7 text-white shadow-card">
          <div className="absolute -right-8 top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">Main Dashboard</p>
                <h2 className="mt-3 max-w-2xl text-4xl font-bold leading-tight">
                  Monitor field disease prediction, robot health, and greenhouse conditions from one premium panel.
                </h2>
              </div>
              <StatusBadge label={meta.mode === "live" ? "Live Sync" : "Demo Mode"} tone={meta.mode === "live" ? "success" : "warning"} />
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Latest disease</p>
                <p className="mt-2 text-xl font-bold">{latestAnalysis?.disease_name || "Pending"}</p>
              </div>
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Confidence</p>
                <p className="mt-2 text-xl font-bold">{latestAnalysis?.confidence || "--"}%</p>
              </div>
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">GPS status</p>
                <p className="mt-2 text-xl font-bold">{latestLocation?.status || "Waiting"}</p>
              </div>
              <div className="rounded-[24px] bg-white/12 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/70">Last analysis</p>
                <p className="mt-2 text-sm font-semibold">{formatDateTime(latestAnalysis?.created_at)}</p>
              </div>
            </div>
          </div>
        </div>

        <PlantImageCard
          imageUrl={latestAnalysis?.image_url}
          title="Latest plant image captured"
          description="The newest Raspberry Pi image arrives here before and after ML disease prediction."
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Temperature"
          value={`${formatNumber(latestSensor?.temperature)} C`}
          subtitle="Current DHT11 reading"
          icon={Thermometer}
          tone={sensorStatus("temperature", latestSensor?.temperature).tone}
        />
        <DashboardCard
          title="Humidity"
          value={`${formatNumber(latestSensor?.humidity)}%`}
          subtitle="Current field humidity"
          icon={Waves}
          tone={sensorStatus("humidity", latestSensor?.humidity).tone}
        />
        <DashboardCard
          title="Soil Moisture"
          value={`${formatNumber(latestSensor?.soil_moisture)}%`}
          subtitle="Moisture around plant root zone"
          icon={Droplets}
          tone={sensorStatus("soil_moisture", latestSensor?.soil_moisture).tone}
        />
        <DashboardCard
          title="Battery"
          value={`${formatNumber(latestRobotStatus?.battery_percentage, 0)}%`}
          subtitle="Robot energy reserve"
          icon={BatteryCharging}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DiseaseResultCard record={latestAnalysis} />
        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-primary">Robot Snapshot</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">{latestRobotStatus?.robot_name}</h3>
              </div>
              <StatusBadge
                label={latestRobotStatus?.connection_status || "offline"}
                tone={latestRobotStatus?.connection_status === "online" ? "success" : "danger"}
              />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { icon: ShieldAlert, label: "Camera", value: latestRobotStatus?.camera_status },
                { icon: FlaskConical, label: "DHT11", value: latestRobotStatus?.dht11_status },
                { icon: MapPinned, label: "GPS", value: latestRobotStatus?.gps_status },
                { icon: Clock3, label: "Last Seen", value: formatDateTime(latestRobotStatus?.last_seen) },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] bg-slate-50 p-4">
                  <item.icon className="h-5 w-5 text-primary-dark" />
                  <p className="mt-3 text-sm font-semibold text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-bold capitalize text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">Coordinates</p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              {formatNumber(latestLocation?.latitude, 5)}, {formatNumber(latestLocation?.longitude, 5)}
            </h3>
            <p className="mt-3 text-sm text-slate-500">
              Latest robot location with timestamp {formatDateTime(latestLocation?.created_at)}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
