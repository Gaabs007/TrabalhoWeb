-- CreateTable
CREATE TABLE "generos" (
    "Id_Genero" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "generos_pkey" PRIMARY KEY ("Id_Genero")
);

-- CreateTable
CREATE TABLE "filmes" (
    "Id_Filme" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Ano" INTEGER NOT NULL,
    "Lancamento" TIMESTAMP(3) NOT NULL,
    "Diretor" TEXT NOT NULL,
    "Id_Genero" INTEGER NOT NULL,

    CONSTRAINT "filmes_pkey" PRIMARY KEY ("Id_Filme")
);

-- CreateIndex
CREATE UNIQUE INDEX "generos_Nome_key" ON "generos"("Nome");

-- CreateIndex
CREATE UNIQUE INDEX "filmes_Titulo_Lancamento_Diretor_key" ON "filmes"("Titulo", "Lancamento", "Diretor");

-- AddForeignKey
ALTER TABLE "filmes" ADD CONSTRAINT "filmes_Id_Genero_fkey" FOREIGN KEY ("Id_Genero") REFERENCES "generos"("Id_Genero") ON DELETE RESTRICT ON UPDATE CASCADE;
