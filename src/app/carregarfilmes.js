const { PrismaClient } = require('@prisma/client');
const { buscarFilmes } = require('./omdbapi');

const prisma = new PrismaClient();

async function carregarFilmes() {
    const totalFilmes = 200;
    const filmesPorPagina = 10;
    const totalPaginas = Math.ceil(totalFilmes / filmesPorPagina);

    try {
        for (let pagina = 1; pagina <= totalPaginas; pagina++) {
            const filmes = await buscarFilmes('movie', pagina);

            for (const movie of filmes) {
                const generoNome = movie.Genre ? movie.Genre.split(',')[0] : 'Desconhecido';

                const genero = await prisma.generos.findUnique({
                    where: { Nome: generoNome },
                });

                if (!genero) {
                    console.log(`Gênero "${generoNome}" não encontrado. Criando...`);
                    await prisma.generos.create({
                        data: { Nome: generoNome },
                    });
                }

                const generoExistente = await prisma.generos.findUnique({
                    where: { Nome: generoNome },
                });

                await prisma.filmes.create({
                    data: {
                        Titulo: movie.Title,
                        Ano: parseInt(movie.Year),
                        Lancamento: new Date(movie.Released || Date.now()),
                        Diretor: movie.Director || 'Desconhecido',
                        Id_Genero: generoExistente.Id_Genero,
                    },
                });
            }
        }
    } catch (error) {
        console.error('Erro ao carregar filmes:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

carregarFilmes();
