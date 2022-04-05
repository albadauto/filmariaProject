import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

const Favoritos = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem('movies')
        setMovies(JSON.parse(myList) || [])
    }, [])

    const handleDelete = (id) => {
        const myList = movies.filter((item) => {
            return (item.id !== id)
        })
        setMovies(myList);
        localStorage.setItem('movies', JSON.stringify(myList));
        toast.success('Filme excluido com sucesso');
    }   


    return (
        <div id="my-movies">
            <h1>Meus Filmes</h1>
             {movies.length === 0 && <span>Você não possui filmes salvos :( </span>}

            <ul>
                {movies.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.nome}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button className='btnDelete' onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Favoritos;