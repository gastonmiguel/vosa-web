import { useState } from "react";

interface TicketFormProps {
  onSubmit: (ticketNumber: string) => void;
  loading?: boolean;
}

export default function TicketForm({ onSubmit, loading }: TicketFormProps) {
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketNumber.trim()) {
      onSubmit(ticketNumber.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
      <label htmlFor="ticketNumber" className="text-lg font-medium text-gray-700">
        Ingresá tu número de boleto
      </label>
      <input
        id="ticketNumber"
        type="text"
        value={ticketNumber}
        onChange={e => setTicketNumber(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Ejemplo: 123456"
        disabled={loading}
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow transition-all duration-200"
        disabled={loading}
      >
        {loading ? "Consultando..." : "Consultar boleto"}
      </button>
    </form>
  );
}

