import { NextRequest } from "next/server";

// Mini cache en memoria (solo para desarrollo, no escalable en serverless)
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minuto

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Consulta real a la API externa AIKO
async function fetchBusLocation(vehicleIdOrPlate: string) {
  await sleep(1000); // Simula espera de 1 segundo para la demo visual
  try {
    const apiKey = process.env.AIKO_API_KEY;
    if (!apiKey) {
      throw new Error("No se configuró la API Key de AIKO en las variables de entorno.");
    }
    const res = await fetch(`https://dashboard.aikotelematics.com/v2/vehicles/${vehicleIdOrPlate}/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

function isWithinServiceWindow(fechaSalida: string, horaSalida: string, fechaLlegada: string, horaLlegada: string) {
  try {
    const now = new Date();
    const [yearS, monthS, dayS] = fechaSalida.split("-").map(Number);
    const [hourS, minuteS] = horaSalida.split(":").map(Number);
    const salida = new Date(yearS, monthS - 1, dayS, hourS, minuteS);
    const [yearL, monthL, dayL] = fechaLlegada.split("-").map(Number);
    const [hourL, minuteL] = horaLlegada.split(":").map(Number);
    const llegada = new Date(yearL, monthL - 1, dayL, hourL, minuteL);
    return now.getTime() > salida.getTime() && now.getTime() < llegada.getTime();
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { vehicleIdOrPlate, fechaSalida, horaSalida, fechaLlegada, horaLlegada } = body;
  if (!vehicleIdOrPlate || !fechaSalida || !horaSalida || !fechaLlegada || !horaLlegada) {
    return Response.json({ error: "Faltan datos requeridos para consultar la ubicación del micro." }, { status: 400 });
  }

  // Validar rango horario antes de consultar la API externa
  if (!isWithinServiceWindow(fechaSalida, horaSalida, fechaLlegada, horaLlegada)) {
    return Response.json({
      error: "La ubicación en tiempo real de tu micro podrá visualizarse solo dentro del rango de fecha y hora de inicio y fin del servicio."
    }, { status: 403 });
  }

  // Cache: si existe y no expiró, devolver
  const cacheKey = `${vehicleIdOrPlate}-${fechaSalida}-${horaSalida}-${fechaLlegada}-${horaLlegada}`;
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return Response.json({ ...cached.data });
  }

  // Consulta real a la API externa
  const data = await fetchBusLocation(vehicleIdOrPlate);

  if (!data || !Array.isArray(data.pos) || data.pos.length !== 2 ||
      typeof data.pos[0] !== "number" || typeof data.pos[1] !== "number") {
    return Response.json({ error: "No se encontró el micro o no hay ubicación disponible." }, { status: 404 });
  }

  // Guardar en cache
  cache[cacheKey] = { data, timestamp: Date.now() };

  // Devolver solo la info relevante para el cliente
  return Response.json({
    lat: data.pos[0],
    lng: data.pos[1],
    plate: data.plate,
    vehicleId: data.vehicleId,
    // name: data.name, // ← disponible si se quiere mostrar
    // online: data.online, // ← disponible si se quiere mostrar
    speed: data.speed,
    posTs: data.posTs
    // gpsSatt: data.gpsSatt, // ← disponible si se quiere mostrar
    // odo: data.odo, // ← disponible si se quiere mostrar
    // mov: data.mov, // ← disponible si se quiere mostrar
    // ignition: data.ignition, // ← disponible si se quiere mostrar
    // intrack: data.intrack, // ← disponible si se quiere mostrar
    // sensor: data.sensor, // ← disponible si se quiere mostrar
    // io: data.io // ← disponible si se quiere mostrar
  });
}
