import { Compass, Route, Satellite } from "lucide-react";
import HistoryTable from "../components/data/HistoryTable";
import SectionHeader from "../components/common/SectionHeader";
import StatePanel from "../components/common/StatePanel";
import LocationCard from "../components/cards/LocationCard";
import RobotMap from "../components/maps/RobotMap";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatNumber } from "../lib/utils";

const columns = [
  { key: "latitude", label: "Latitude" },
  { key: "longitude", label: "Longitude" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
];

function RobotLocationPage() {
  const { latestLocation, locationHistory, loading, error } = useAgriData();

  if (loading) {
    return (
      <StatePanel
        title="Loading robot location"
        description="Fetching GPS coordinates and location history."
      />
    );
  }

  if (error) {
    return <StatePanel title="Location data unavailable" description={error} />;
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Field Navigation"
        title="Robot location tracking"
        description="Monitor the current robot coordinates, online status, and previous movement records."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
            <Compass className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Latitude
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            {formatNumber(latestLocation?.latitude, 5)}
          </h3>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
            <Satellite className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Longitude
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            {formatNumber(latestLocation?.longitude, 5)}
          </h3>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
            <Route className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Tracking status
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            {latestLocation?.status || "Waiting"}
          </h3>
        </div>
      </div>

      {latestLocation ? <LocationCard record={latestLocation} /> : null}
      <RobotMap location={latestLocation} />

      {locationHistory.length > 0 ? (
        <HistoryTable columns={columns} rows={locationHistory} type="location" />
      ) : (
        <StatePanel
          title="No location history records yet"
          description="Location history will appear here after robot GPS data is inserted into Supabase."
        />
      )}
    </div>
  );
}

export default RobotLocationPage;
