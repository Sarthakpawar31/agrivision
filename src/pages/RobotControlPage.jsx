import { BatteryCharging, Camera, Cpu, MapPinned, RadioTower, Waves } from "lucide-react";
import StatusBadge from "../components/ui/StatusBadge";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatDateTime } from "../lib/utils";

function RobotControlPage() {
  const { latestRobotStatus } = useAgriData();

  const statusCards = [
    { label: "Battery Percentage", value: `${latestRobotStatus?.battery_percentage}%`, icon: BatteryCharging },
    { label: "Camera Status", value: latestRobotStatus?.camera_status, icon: Camera },
    { label: "DHT11 Status", value: latestRobotStatus?.dht11_status, icon: Waves },
    { label: "GPS Module Status", value: latestRobotStatus?.gps_status, icon: MapPinned },
    { label: "Raspberry Pi Connection", value: latestRobotStatus?.raspberry_pi_status, icon: Cpu },
    { label: "Last Seen", value: formatDateTime(latestRobotStatus?.last_seen), icon: RadioTower },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Admin / Robot Control</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Robot status, module health, and control summary</h1>
      </div>

      <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500">Robot Name</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{latestRobotStatus?.robot_name}</h2>
          </div>
          <StatusBadge
            label={latestRobotStatus?.connection_status || "offline"}
            tone={latestRobotStatus?.connection_status === "online" ? "success" : "danger"}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {statusCards.map((item) => (
          <div key={item.label} className="rounded-[28px] border border-white/70 bg-white/88 p-5 shadow-soft">
            <div className="rounded-3xl bg-primary-light p-3 text-primary-dark inline-flex">
              <item.icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm font-semibold text-slate-500">{item.label}</p>
            <h3 className="mt-2 text-2xl font-bold capitalize text-slate-900">{item.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RobotControlPage;
