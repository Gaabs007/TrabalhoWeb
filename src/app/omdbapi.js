// omdbApi.js
const API_KEY = '7149db5e'; // Substitua pela sua chave
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

/**
 * Função para buscar filmes na API do OMDb.
 * @param {string} searchTerm - O termo de pesquisa para os filmes.
 * @returns {Promise<Object>} - Os dados dos filmes ou um erro.
 */
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

    return data.Search; // Retorna a lista de filmes
  } catch (error) {
    console.error('Erro ao buscar filmes:', error.message);
    throw error; // Propaga o erro para ser tratado no chamador
  }
}

module.exports = { buscarFilmes };
