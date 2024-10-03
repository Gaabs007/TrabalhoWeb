"use client";

import { useState, useEffect } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function Home() {
    const [filmes, setFilmes] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [diretor, setDiretor] = useState('');
    const [lancamento, setLancamento] = useState('');
    const [idGenero, setIdGenero] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchFilmes = async () => {
        try {
            const res = await fetch('/api/filme');
            const data = await res.json();
            setFilmes(data.filmes);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    const fetchGeneros = async () => {
        try {
            const res = await fetch('/api/genero');
            const data = await res.json();
            setGeneros(data.generos);
        } catch (error) {
            console.error("Erro ao buscar gêneros:", error);
        }
    };

    const getGeneroNome = (idGenero) => {
        const genero = generos.find(gen => gen.Id_Genero === idGenero);
        return genero ? genero.Nome : 'Desconhecido';
    };

    const addFilme = async () => {
        if (!titulo || !ano || !diretor || !lancamento || !idGenero) return;

        const res = await fetch('/api/filme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Titulo: titulo, Ano: ano, Diretor: diretor, Lancamento: lancamento, Id_Genero: idGenero }),
        });

        const data = await res.json();
        setFilmes([...filmes, data.filme]);
        clearForm();
    };

    const updateFilme = async () => {
        if (!editId || !titulo || !ano || !diretor || !lancamento || !idGenero) return;

        const res = await fetch('/api/filme', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id_Filme: editId, Titulo: titulo, Ano: ano, Diretor: diretor, Lancamento: lancamento, Id_Genero: idGenero }),
        });

        const updatedFilme = await res.json();
        setFilmes(filmes.map(filme => (filme.Id_Filme === editId ? updatedFilme.filme : filme)));
        clearForm();
    };

    const deleteFilme = async (id) => {
        await fetch('/api/filme', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id_Filme: id }),
        });
        setFilmes(filmes.filter(filme => filme.Id_Filme !== id));
    };

    const clearForm = () => {
        setTitulo('');
        setAno('');
        setDiretor('');
        setLancamento('');
        setIdGenero('');
        setEditId(null);
    };

    useEffect(() => {
        fetchFilmes();
        fetchGeneros();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-black">Gerenciar Filmes</h1>

            <div className="mb-4">
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Título"
                    className="border p-2 mr-2 text-black"
                />
                <input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    placeholder="Ano"
                    className="border p-2 mr-2 text-black"
                />
                <input
                    type="text"
                    value={diretor}
                    onChange={(e) => setDiretor(e.target.value)}
                    placeholder="Diretor"
                    className="border p-2 mr-2 text-black"
                />
                <input
                    type="date"
                    value={lancamento}
                    onChange={(e) => setLancamento(e.target.value)}
                    className="border p-2 mr-2 text-black"
                />
                <select
                    value={idGenero}
                    onChange={(e) => setIdGenero(e.target.value)}
                    className="border p-2 mr-2 text-black"
                >
                    <option value="">Selecionar Gênero</option>
                    {generos.map((genero) => (
                        <option key={genero.Id_Genero} value={genero.Id_Genero}>
                            {genero.Nome}
                        </option>
                    ))}
                </select>
                <button onClick={editId ? updateFilme : addFilme} className="bg-blue-500 text-white p-2">
                    {editId ? 'Atualizar' : 'Adicionar'}
                </button>
                {editId && (
                    <button onClick={clearForm} className="bg-gray-300 text-black p-2 ml-2">
                        Cancelar
                    </button>
                )}
            </div>

            <div>
                {filmes.map((filme) => (
                    <div key={filme.Id_Filme} className="flex justify-between items-center border p-2 mb-2 text-black">
                        <span>Titulo: {filme.Titulo} Ano Lançamento({filme.Ano}) Diretor: {filme.Diretor} Gênero: {getGeneroNome(filme.Id_Genero)} </span>
                        <div>
                            <button onClick={() => {
                                setTitulo(filme.Titulo);
                                setAno(filme.Ano);
                                setDiretor(filme.Diretor);
                                setLancamento(filme.Lancamento);
                                setIdGenero(filme.Id_Genero);
                                setEditId(filme.Id_Filme);
                            }} className="text-blue-500">Editar</button>
                            <button onClick={() => deleteFilme(filme.Id_Filme)} className="text-red-500 ml-2">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
