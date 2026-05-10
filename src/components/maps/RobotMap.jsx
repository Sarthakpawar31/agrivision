import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { formatDateTime, formatNumber } from "../../lib/utils";

const defaultCenter = [20.5937, 78.9629];

function RobotMap({ location }) {
  const center =
    location?.latitude && location?.longitude
      ? [Number(location.latitude), Number(location.longitude)]
      : defaultCenter;

  return (
    <div className="h-[420px] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft">
      <MapContainer center={center} zoom={location ? 16 : 5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location ? (
          <CircleMarker
            center={[Number(location.latitude), Number(location.longitude)]}
            radius={14}
            pathOptions={{ color: "#14532D", fillColor: "#16A34A", fillOpacity: 0.92 }}
          >
            <Popup>
              Robot current position
              <br />
              {formatNumber(location.latitude, 5)}, {formatNumber(location.longitude, 5)}
              <br />
              {formatDateTime(location.created_at)}
            </Popup>
          </CircleMarker>
        ) : null}
      </MapContainer>
    </div>
  );
}

export default RobotMap;
