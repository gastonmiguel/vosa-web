import { useState } from "react";

export interface TicketInfo {
  internalNumber: string;
  fechaSalida: string;
  horaSalida: string;
  origen: string;
  destino: string;
  fechaLlegada: string;
  horaLlegada: string;
  linea: string;
}

export function useTicketInfo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo | null>(null);

  const fetchTicketInfo = async (ticketNumber: string) => {
    setLoading(true);
    setError(null);
    setTicketInfo(null);
    try {
      const res = await fetch(
        `/api/ticket-info?ticket=${encodeURIComponent(ticketNumber)}`
      );
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Boleto no encontrado o inválido.");
      } else {
        const data = await res.json();
        setTicketInfo({
          internalNumber: data.interno,
          fechaSalida: data.fecha_salida,
          horaSalida: data.hora_salida,
          origen: data.origen,
          destino: data.destino,
          fechaLlegada: data.fecha_llegada,
          horaLlegada: data.hora_llegada,
          linea: data.linea,
        });
      }
    } catch (err) {
      setError("Error de conexión. Intente nuevamente.");
    }
    setLoading(false);
  };

  const reset = () => {
    setError(null);
    setTicketInfo(null);
    setLoading(false);
  };

  return { loading, error, ticketInfo, fetchTicketInfo, reset };
}
