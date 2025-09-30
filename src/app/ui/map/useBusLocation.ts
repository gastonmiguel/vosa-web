import { useEffect, useState } from "react";

const CACHE_KEY_PREFIX = "busLocationCache_";
const CACHE_TTL = 60 * 1000; // 1 minuto en milisegundos

export interface BusLocationData {
  lat: number;
  lng: number;
  plate: string;
  vehicleId: string;
  speed: number;
  posTs: number;
  // name?: string;
  // online?: boolean;
  // gpsSatt?: number;
  // mov?: boolean;
  // ignition?: boolean;
  // odo?: number;
}

export interface BusLocationParams {
  internalNumber: string;
  fechaSalida: string;
  horaSalida: string;
  fechaLlegada: string;
  horaLlegada: string;
}

export function useBusLocation(params?: BusLocationParams) {
  const [location, setLocation] = useState<BusLocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params || !params.internalNumber) {
      setLocation(null);
      setLoading(false);
      setError(null);
      return;
    }
    let didCancel = false;
    setLoading(true);
    setError(null);
    const CACHE_KEY = `${CACHE_KEY_PREFIX}${params.internalNumber}-${params.fechaSalida}-${params.horaSalida}-${params.fechaLlegada}-${params.horaLlegada}`;
    if (typeof window !== "undefined") {
      try {
        const cacheRaw = localStorage.getItem(CACHE_KEY);
        if (cacheRaw) {
          const cache = JSON.parse(cacheRaw);
          if (cache.timestamp && Date.now() - cache.timestamp < CACHE_TTL) {
            setLocation(cache.data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {}
    }
    fetch("/api/bus-location", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleIdOrPlate: params.internalNumber,
        fechaSalida: params.fechaSalida,
        horaSalida: params.horaSalida,
        fechaLlegada: params.fechaLlegada,
        horaLlegada: params.horaLlegada,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Error de conexión. Intente nuevamente.");
        if (!didCancel) {
          setLocation(data);
          setLoading(false);
          setError(null);
          if (typeof window !== "undefined") {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
          }
        }
      })
      .catch((err) => {
        if (!didCancel) {
          setError(err.message);
          setLocation(null);
          setLoading(false);
        }
      });
    return () => {
      didCancel = true;
    };
  }, [params]);

  return { location, loading, error };
}
