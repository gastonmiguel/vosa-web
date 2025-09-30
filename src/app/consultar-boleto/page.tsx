"use client";
import React from "react";
import TicketForm from "../ui/map/TicketForm";
import { useTicketInfo } from "../ui/map/useTicketInfo";
import DynamicBusLocationMap from "../ui/map/DynamicBusLocationMap";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function formatDate(fecha: string, hora: string) {
  try {
    const date = new Date(`${fecha}T${hora}`);
    return format(date, "dd/MM/yyyy HH:mm", { locale: es });
  } catch {
    return `${fecha} ${hora}`;
  }
}

export default function BusLocationPage() {
  const { loading, error, ticketInfo, fetchTicketInfo, reset } = useTicketInfo();

  const handleSubmit = (num: string) => {
    fetchTicketInfo(num);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100 flex flex-col items-center py-12 px-2 md:px-4 mt-16">
      <h1 className="text-4xl font-extrabold text-orange-700 mb-8 drop-shadow text-center">Tu Boleto</h1>
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden bg-white p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8">
        {!ticketInfo ? (
          <TicketForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <>
            {/* Datos del viaje siempre primero */}
            <section className="w-full bg-orange-50 rounded-xl shadow mb-2 p-4 sm:p-6 flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-orange-700 mb-2 text-center flex items-center gap-2 justify-center">
                <span>🎫</span> Detalle de tu viaje
              </h2>
              <div className="flex flex-col gap-2 text-gray-800 text-base">
                <div className="flex flex-row gap-2 items-center justify-between border-b border-orange-100 pb-2">
                  <span className="font-semibold">Origen:</span>
                  <span>{ticketInfo.origen}</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between border-b border-orange-100 pb-2">
                  <span className="font-semibold">Salida:</span>
                  <span>{ticketInfo.fechaSalida && ticketInfo.horaSalida ? formatDate(ticketInfo.fechaSalida, ticketInfo.horaSalida) : "-"} hs.</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between border-b border-orange-100 pb-2">
                </div>
                <div className="flex flex-row gap-2 items-center justify-between border-b border-orange-100 pb-2">
                  <span className="font-semibold">Destino:</span>
                  <span>{ticketInfo.destino}</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-between border-b border-orange-100 pb-2">
                  <span className="font-semibold">Llegada estimada:</span>
                  <span>{ticketInfo.fechaLlegada && ticketInfo.horaLlegada ? formatDate(ticketInfo.fechaLlegada, ticketInfo.horaLlegada) : "-"} hs.</span>
                </div>
              </div>
            </section>
            {/* Ubicación del micro solo si corresponde */}
            {ticketInfo.internalNumber && ticketInfo.fechaSalida && ticketInfo.horaSalida && ticketInfo.fechaLlegada && ticketInfo.horaLlegada && (
              <section className="w-full flex flex-col items-center">
                <div className="w-full min-h-[320px] h-[350px] max-h-[480px] sm:min-h-[350px] sm:h-[400px] md:min-h-[400px] md:h-[420px] lg:h-[480px] mb-4 rounded-xl overflow-hidden shadow-lg border border-orange-200 bg-orange-50 flex flex-col">
                  <DynamicBusLocationMap
                    internalNumber={ticketInfo.internalNumber}
                    fechaSalida={ticketInfo.fechaSalida}
                    horaSalida={ticketInfo.horaSalida}
                    fechaLlegada={ticketInfo.fechaLlegada}
                    horaLlegada={ticketInfo.horaLlegada}
                  />
                </div>
              </section>
            )}
            {/* Botón siempre debajo, nunca solapado */}
            <div className="flex justify-center mt-2 mb-2">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200"
                onClick={() => reset()}
              >
                Consultar otro boleto
              </button>
            </div>
          </>
        )}
        {error && <div className="text-red-600 text-center mt-2 font-semibold">{error}</div>}
      </div>
    </main>
  );
}
