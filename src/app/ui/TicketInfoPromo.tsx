"use client";

export default function TicketInfoPromo() {
  return (
    <section className="w-full flex justify-center py-10 bg-orange-50">
      <div className="max-w-2xl w-full flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-700">¿Querés consultar tu boleto y saber dónde está tu micro?</h2>
        <p className="text-gray-700 text-center">
          Ingresá el número de tu boleto para ver todos los datos de tu viaje.<br />
        </p>
        <a
          href="/consultar-boleto"
          className="mt-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg transition-all duration-200"
        >
          Consultar mi boleto
        </a>
      </div>
    </section>
  );
}
