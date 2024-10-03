const { PrismaClient } = require('@prisma/client');
const { buscarFilmes } = require('./omdbapi'); // Importa a função de busca

const prisma = new PrismaClient();

async function carregarFilmes() {
  const totalFilmes = 200; // Número total de filmes a carregar
  const filmesPorPagina = 10; // Número de filmes retornados por página
  const totalPaginas = Math.ceil(totalFilmes / filmesPorPagina); // Total de páginas necessárias

  try {
    for (let pagina = 1; pagina <= totalPaginas; pagina++) {
      const filmes = await buscarFilmes('movie', pagina); // Chama a função para buscar filmes

      for (const movie of filmes) {
        const generoNome = movie.Genre ? movie.Genre.split(',')[0] : 'Desconhecido'; // Verifica se Genre existe

        // Verifique se o gênero já existe no banco de dados
        const genero = await prisma.generos.findUnique({
          where: { Nome: generoNome },
        });

        if (!genero) {
          console.log(`Gênero "${generoNome}" não encontrado. Criando...`);
          await prisma.generos.create({
            data: { Nome: generoNome },
          });
        }

        // Agora você pode pegar o ID do gênero
        const generoExistente = await prisma.generos.findUnique({
          where: { Nome: generoNome },
        });

        // Crie o filme com o gênero conectado
        await prisma.filmes.create({
          data: {
            Titulo: movie.Title,
            Ano: parseInt(movie.Year),
            Lancamento: new Date(movie.Released || Date.now()), // Adiciona tratamento para data inválida
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
