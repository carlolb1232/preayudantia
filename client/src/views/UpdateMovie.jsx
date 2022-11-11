import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { simpleGet } from '../services/simpleGet';
import { simplePut } from '../services/simplePut';

const UpdateMovie = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState();
  const [errors, setErrors] = useState();

  const getMovie = async () => {
    try {
      const response = await simpleGet(`/api/movies/${id}`);
      console.log(response.data.movie);
      setMovie(response.data.movie)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovie();
  }, []);

  const updateMovie = async (values) => {
    try {
      const response = await simplePut(`/api/movies/${id}`, values);
      if (response.data.message === "") {
        console.log(response.data);
        navigate("/")
      } else {
        console.log("ERRORES", response.data);
        const errorResponse = response.data.errors;
        console.log("Object keys", Object.keys(errorResponse));
        const errorArr = [];
        for (const llave of Object.keys(errorResponse)) {
          console.log(errorResponse[llave]);
          errorArr.push(errorResponse[llave].message);
        }
        setErrors(errorArr);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h2>Id de peli: {id}</h2>
      <h2>Editar película {id}</h2>
      {errors?.map((error, index) => <p key={index}>{error}</p>)}
      {
        movie&&
        <MovieForm movie={movie} onSubmitProp={updateMovie}/>
      }
    </div>
  );
}

export default UpdateMovie;
