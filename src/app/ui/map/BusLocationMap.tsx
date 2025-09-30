import { useBusLocation } from "./useBusLocation";
import Map from "./Map";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";

interface BusLocationMapProps {
  internalNumber: string;
  fechaSalida: string;
  horaSalida: string;
  fechaLlegada: string;
  horaLlegada: string;
  origen: string;
  destino: string;
  linea: string;
  micro: string;
}

function formatDate(ts: number) {
  return format(new Date(ts), "dd/MM/yyyy HH:mm:ss", { locale: es });
}

export default function BusLocationMap({ internalNumber, fechaSalida, horaSalida, fechaLlegada, horaLlegada, origen, destino, linea, micro }: BusLocationMapProps) {
  const params = useMemo(() => ({ internalNumber, fechaSalida, horaSalida, fechaLlegada, horaLlegada }), [internalNumber, fechaSalida, horaSalida, fechaLlegada, horaLlegada]);
  const { location, loading, error } = useBusLocation(params);

  // Sección de ubicación del micro
  let locationSection = null;
  if (loading) {
    locationSection = (
      <div className="flex flex-col items-center justify-center h-[500px] w-full mb-8">
        <svg className="animate-spin h-10 w-10 text-orange-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <span className="text-gray-600 font-semibold">Obteniendo ubicación y estado del micro...</span>
      </div>
    );
  } else if (error) {
    locationSection = (
      <div className="w-full text-center text-red-600 font-semibold py-4 mb-8">{error}</div>
    );
  } else if (location) {
    locationSection = (
      <>
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-full max-w-3xl bg-orange-50 rounded-xl shadow border border-orange-100 p-4 flex flex-col gap-2 mb-4">
            <h3 className="text-lg font-bold text-orange-700 text-center mb-2 flex items-center gap-2 justify-center">
              <span>🚌</span> Ubicación del micro
            </h3>
            <div className="w-full h-[300px] rounded-xl overflow-hidden relative z-0">
              <Map lat={location.lat} lng={location.lng} />
            </div>
          </div>
          {/* Ahora los textos van fuera del contenedor del mapa, siempre visibles y con z-10 */}
          <div className="w-full max-w-3xl flex flex-col items-center mb-4 relative z-10 -mt-2">
            <div className="mt-3 text-center">
              <span className="font-semibold text-orange-700">Última posición reportada:</span>
              <span className="ml-2 font-bold text-orange-600">{formatDate(location.posTs)} hs.</span>
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              Este dato indica cuándo se actualizó la ubicación del micro.
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-2 md:px-0">
      {locationSection}
    </div>
  );
}
