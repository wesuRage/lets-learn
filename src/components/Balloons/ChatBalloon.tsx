import Link from "next/link";

function formatTimestamp(timestamp: string) {
  // Cria um objeto Date a partir da string
  const date = new Date(timestamp);

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", timestamp);
    return "Invalid date"; // Retorna um valor padrão caso a data seja inválida
  }

  // Formata a data para o formato desejado
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Para usar o formato de 24 horas
  });
}

interface ChatBalloonProps {
  id: string;
  title: string;
  createdAt: string;
}

export default function ChatBalloon({
  id,
  title,
  createdAt,
}: ChatBalloonProps) {
  return (
    <Link href={`/home/chat/${id}`}>
      <section className="bg-slate-800 rounded-xl mb-4 p-4 w-full text-left transition-all ease-in-out duration-150 hover:scale-105">
        <div className="w-full">
          <h2 className="line-clamp-2 text-2xl font-bold italic">{title}</h2>
          <div className="flex justify-between items-center">
            <p>Created at: </p>
            <span className="bg-slate-900 px-2 py-1 rounded-xl font-bold">
              {formatTimestamp(createdAt)}
            </span>
          </div>
        </div>
      </section>
    </Link>
  );
}
