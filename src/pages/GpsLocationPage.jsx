import { MapPinned, Navigation } from "lucide-react";
import MapView from "../components/ui/MapView";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatDateTime, formatNumber } from "../lib/utils";

function GpsLocationPage() {
  const { locationHistory, latestLocation } = useAgriData();

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">GPS Location</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Live robot position and movement path</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <MapView points={locationHistory} />
        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
                <MapPinned className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Latest Coordinates</p>
                <h2 className="text-2xl font-bold text-slate-900">
                  {formatNumber(latestLocation?.latitude, 5)}, {formatNumber(latestLocation?.longitude, 5)}
                </h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">Last updated {formatDateTime(latestLocation?.created_at)}</p>
          </div>
          <div className="rounded-[30px] border border-white/70 bg-white/88 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
                <Navigation className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">Movement Path</p>
                <h2 className="text-2xl font-bold text-slate-900">{locationHistory.length} tracking points</h2>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              The map draws the latest robot route so you can see where disease detection and sensor readings were captured.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GpsLocationPage;
