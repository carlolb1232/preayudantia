import React, { useEffect, useState } from 'react';
import { useUser } from "../contexts/userContext"
import moment from "moment";
import { simpleGet } from '../services/simpleGet';
import { Link } from 'react-router-dom';
import { simpleDelete } from '../services/simpleDelete';


const Main = () => {

  const { user } = useUser();

  const [movies, setMovies] = useState();
  const [errors, setErrors] = useState();


  const getMovies = async () => {
    try {
      const response = await simpleGet("/api/movies");
      console.log(response.data)
      setMovies(response.data.movies);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  // const renderInfo=()=>{
  //     if(user){
  //         return (<>USUARIO LOGGUEADO: {user.firstName} {user.lastName} </>)
  //     }else{
  //         return(<>NO HAY USUARIO LOGGUEADO</>)
  //     }
  // }

  const deleteMovie = async (id) => {
    try {
      const response = await simpleDelete(`/api/movies/${id}`)
      console.log(response.data)
      if (response.data.message === "") {
        console.log(response.data);
        setMovies(movies.filter(movie=>movie._id !== id))
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
      <h1>LISTADO DE PELÍCULAS</h1>
      {errors?.map((error, index) => <p key={index}>{error}</p>)}
      <table className='table table-bordered border-dark table-hover'>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>PROMEDIO DE RATING</th>
            <th>GÉNERO</th>
            <th>FECHA ESTRENO</th>
            {
              user&&
              <th>ACCIONES</th>
            }
          </tr>
        </thead>
        <tbody>
          {
            movies?.map(movie=>{
              return(
                <tr key={movie._id}>
                  <td><Link to={`/movie/${movie._id}`}>{movie.nombre}</Link></td>
                  <td>{movie.average}</td>
                  <td>{moment(movie.fechaEstreno).format("YYYY-MM-DD")}</td>
                  <td>{movie.genero}</td>
                  {
                    user&&
                    <td className='button-row-container'>
                      <Link to={`/create/review/${movie._id}`} className='btn btn-primary'>Crear reseña</Link>
                      <Link to={`/update/movie/${movie._id}`} className='btn btn-warning'>Editar</Link>
                      <button className='btn btn-danger' onClick={()=>deleteMovie(movie._id)}>Borrar</button>
                    </td>
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {/* <h2>{renderInfo()} </h2> */}
      {/* {user && <button onClick={logOut}>LOGOUT</button>} */}
    </div>
  );
}

export default Main;
