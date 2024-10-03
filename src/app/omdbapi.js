
const BASE_URL = `http://www.omdbapi.com/?apikey=7149db5e`;

async function buscarFilmes(searchTerm) {
    try {
        const response = await fetch(`${BASE_URL}&s=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.Response === 'False') {
            throw new Error(`Erro na API: ${data.Error}`);
        }

        return data.Search;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error.message);
        throw error;
    }
}

module.exports = { buscarFilmes };
