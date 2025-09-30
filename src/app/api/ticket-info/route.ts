import { NextRequest } from "next/server";

// Mini cache en memoria (solo para desarrollo, no escalable en serverless)
type TicketInfoCache = {
  fecha_salida: string;
  hora_salida: string;
  origen: string;
  destino: string;
  fecha_llegada: string;
  hora_llegada: string;
  coche_nro_salida: string;
  linea: string;
  tipo_de_tarifa: string;
  interno: string;
  errorNro: string;
  errorTexto: string;
};
const cache: Record<string, { data: TicketInfoCache; timestamp: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minuto

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Simulación de consulta al WS externo
async function getInfoServicioPorBoletoSimulado(boletoNumero: string) {
  await sleep(100); // Simula espera
  if (boletoNumero === "123456") {
    return {
      fecha_salida: "2025-09-30",
      hora_salida: "10:23",
      origen: "Terminal Central",
      destino: "Parada Norte",
      fecha_llegada: "2025-09-30",
      hora_llegada: "21:53",
      coche_nro_salida: "1",
      linea: "L003",
      tipo_de_tarifa: "00",
      interno: "16271",
      errorNro: "0",
      errorTexto: "Ok"
    };
  }
  return {
    errorNro: "1",
    errorTexto: "No hay datos para el boleto.",
    fecha_salida: "",
    hora_salida: "",
    origen: "",
    destino: "",
    fecha_llegada: "",
    hora_llegada: "",
    coche_nro_salida: "",
    linea: "",
    tipo_de_tarifa: "",
    interno: ""
  };
}

export async function GET(req: NextRequest) {
  const boletoNumero = req.nextUrl.searchParams.get("ticket");

  if (!boletoNumero || isNaN(Number(boletoNumero))) {
    return Response.json({ error: "El número del boleto no es válido." }, { status: 400 });
  }

  // Cache: si existe y no expiró, devolver
  const cacheKey = `${boletoNumero}_simulado`;
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json({ ...cached.data });
  }

  try {
    const data = await getInfoServicioPorBoletoSimulado(boletoNumero);
    if (data.errorNro !== "0") {
      return Response.json({ error: data.errorTexto || "No hay datos para el boleto." }, { status: 404 });
    }
    // Guardar en cache
    cache[cacheKey] = { data, timestamp: Date.now() };
    // Solo datos relevantes para el cliente
    return Response.json({
      fecha_salida: data.fecha_salida,
      hora_salida: data.hora_salida,
      origen: data.origen,
      destino: data.destino,
      fecha_llegada: data.fecha_llegada,
      hora_llegada: data.hora_llegada,
      linea: data.linea,
      interno: data.interno,
    });
  } catch {
    return Response.json({ error: "Error consultando el servicio. Intente nuevamente." }, { status: 500 });
  }
}
