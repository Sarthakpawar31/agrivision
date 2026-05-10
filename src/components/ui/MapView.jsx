import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

function MapView({ points }) {
  const center = points?.[0] ? [points[0].latitude, points[0].longitude] : [22.9734, 78.6569];
  const path = (points || []).map((point) => [point.latitude, point.longitude]);

  return (
    <div className="h-[420px] overflow-hidden rounded-[30px] border border-white/70 shadow-soft">
      <MapContainer center={center} zoom={16} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points?.map((point) => (
          <Marker key={point.id} position={[point.latitude, point.longitude]}>
            <Popup>
              <strong>{point.robot_name || "AgriVision Robot"}</strong>
              <br />
              Lat: {point.latitude}
              <br />
              Lng: {point.longitude}
            </Popup>
          </Marker>
        ))}
        {path.length > 1 ? <Polyline positions={path} pathOptions={{ color: "#16A34A", weight: 4 }} /> : null}
      </MapContainer>
    </div>
  );
}

export default MapView;
