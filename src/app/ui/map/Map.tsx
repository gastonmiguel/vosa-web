import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  lat: number;
  lng: number;
}

// Agrega la animación CSS globalmente solo una vez
if (typeof window !== "undefined" && !document.getElementById("bus-bounce-style")) {
  const style = document.createElement("style");
  style.id = "bus-bounce-style";
  style.innerHTML = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .leaflet-marker-icon.bus-bounce {
      animation: bounce 1s infinite;
    }
  `;
  document.head.appendChild(style);
}

export default function Map({ lat, lng }: MapProps) {
  // Validación defensiva para evitar errores de lat/lng inválidos
  const isValidLatLng =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180;

  // Usar el icono por defecto de Leaflet
  const customIcon = typeof window !== "undefined"
    ? new L.Icon.Default()
    : undefined;

  if (!isValidLatLng) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-orange-700 font-semibold text-center p-4">
        No hay datos de ubicación válidos para mostrar el mapa.
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng] as [number, number]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", minHeight: 300, borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker
          position={[lat, lng] as [number, number]}
          icon={customIcon}
      >
        <Tooltip direction="top" offset={[0, -40]} opacity={1} permanent>
          <span style={{ fontWeight: "bold", color: "#ff6600" }}>¡Aquí está tu micro!</span>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
