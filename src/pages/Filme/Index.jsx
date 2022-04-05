import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../services/api';
import './filme-info.css';


const Filme = () => {
    const { id } = useParams();
    const history = useHistory();
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadMovies() {
            const response = await api.get(`/r-api/?api=filmes/${id}`)

            if (response.data.length === 0) {
                history.replace('/');
                return;
            }

            setMovies(response.data);
            setLoading(false);
        }

        loadMovies();

        return () => {
            console.log("DESMONTADO!");
        }
    }, [id, history])

    const saveMovie = () => {
        const myList = localStorage.getItem('movies');
        let savedMovies = JSON.parse(myList) || [];
        const hasMovie = savedMovies.some((filmeSalvo) => filmeSalvo.id === movies.id) //Return boolean
        if (hasMovie){
            alert('Você já possui esse filme salvo.');
            return;
        }          
        savedMovies.push(movies);

        localStorage.setItem('movies', JSON.stringify(savedMovies));
        alert('Filme salvo com sucesso!')

    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando seu filme...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1> {movies.nome} </h1>
            <img src={movies.foto} alt={movies.nome} />
            <h3>Sinopse</h3>
            {movies.sinopse}

            <div className="botoes">
                <button onClick={saveMovie}>Enviar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${movies.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>

    );
}

export default Filme;