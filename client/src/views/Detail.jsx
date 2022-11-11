import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { simpleGet } from "../services/simpleGet";
import moment from "moment";

const Detail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const [errors, setErrors] = useState();

  const getMovie = async () => {
    try {
      const response = await simpleGet(`/api/movies/${id}`);
      console.log(response.data);
      if (response.data.message === "") {
        console.log(response.data);
        setMovie(response.data.movie);
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
      console.log(error);
    }
  };

  const getReviews = async () => {
    try {
      const response = await simpleGet(`/api/reviews/${id}`);
      console.log(response.data.reviews);
      if (response.data.message === "") {
        console.log(response.data);
        setReviews(response.data.reviews);
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
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie();
    getReviews();
  }, []);

  return (
    <div>
      <h2>DETALLES DE PELÍCULA</h2>
      {errors?.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <h3>Título:</h3>
      <p>{movie?.nombre}</p>
      <h3>Trama:</h3>
      <p>{movie?.trama}</p>
      <h3>Genero:</h3>
      <p>{movie?.genero}</p>
      <h3>Fecha de Estreno:</h3>
      <p>{moment(movie?.fechaEstreno).format("DD-MM-YYYY")}</p>
      <h3>REVIEWS:</h3>
      {reviews?.map((review) => {
        return (
          <div className="reviews-container" key={review._id}>
            <div className="card text-center mb-5">
              <div className="card-header">Autor: {review.author}</div>
              <div className="card-body">
                <p className="card-text">
                  {review.content}
                </p>
              </div>
              <div className="card-footer text-muted">RATING: {review.rating}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
