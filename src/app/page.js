import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 min-w-full bg-white">
      <div className="grid sm:grid-cols-1 lg:grid-cols-4 grid-cols-2 gap-2 w-full">
        <ClassCard label="Filmes" description="Cadastro de Filmes" href="/filmes" />
        <ClassCard label="Generos" description="Cadastro de Generos" href="/generos" />
      </div>
    </main>
  );
}

function ClassCard({label, description, href=""}) {
  return <Link href={href}>
    <div className="hover:bg-slate-300  hover:border-gray-600 col-span-1 border border-gray-400 bg-gray-300 h-24 rounded-md shadow-lg items-center flex justify-center m-2 flex-col shadow-blue-300 p-2 text-center">
      <span className="text-blue-950 font-bold text-lg">{label}</span>
      <span className="text-sm text-gray-600">{description}</span>
    </div>
  </Link>
        
}