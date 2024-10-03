"use client";
import { useState, useEffect } from "react";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function Home() {
  const [generos, setGeneros] = useState([]);
  const [nome, setNome] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchGeneros = async () => {
    try {
      const res = await fetch('/api/genero'); 
      const data = await res.json();
      if (data.message === "OK") {
        setGeneros(data.generos);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
    }
  };

  const addGenero = async () => {
    if (!nome) return;
    await fetch('/api/genero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Nome: nome }),
    });
    setNome('');
    fetchGeneros();
  };

  const updateGenero = async (id) => {
    if (!nome) return;
    await fetch('/api/genero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id_Genero: id, Nome: nome }),
    });
    setEditId(null);
    setNome('');
    fetchGeneros();
  };

  const deleteGenero = async (id) => {
    await fetch('/api/genero', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Id_Genero: id }),
    });
    fetchGeneros();
  };

  const cancelEdit = () => {
    setEditId(null);
    setNome('');
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold text-black">Gerenciar Gêneros</h1>
      <div className="my-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 text-black"
          placeholder="Nome do Gênero"
        />
        {editId ? (
          <>
            <button onClick={() => updateGenero(editId)} className="bg-blue-500 text-white p-2 ml-2 text-black">
              Atualizar
            </button>
            <button onClick={cancelEdit} className="bg-gray-300 text-black p-2 ml-2">
              Cancelar
            </button>
          </>
        ) : (
          <button onClick={addGenero} className="bg-blue-500 text-white p-2 ml-2">
            Adicionar
          </button>
        )}
      </div>
      <div className="space-y-2">
        {generos.map((genero) => (
          <div key={genero.Id_Genero} className="flex justify-between items-center border p-2 text-black">
            <span>{genero.Nome}</span>
            <div>
              <button onClick={() => { setEditId(genero.Id_Genero); setNome(genero.Nome); }} className="text-blue-500">Editar</button>
              <button onClick={() => deleteGenero(genero.Id_Genero)} className="text-red-500 ml-2">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
