import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, CircleMarker as Marker } from "react-leaflet";

export default function Map({ title, coords }) {
  return (
    <>
      <h2>{title}</h2>
      <MapContainer
        style={{ border: "solid 1px red", height: "360px", width: "360px" }}
        center={coords}
        zoom={12}
        scrollWheelZoom={false}
      >
        <Marker center={coords} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}
