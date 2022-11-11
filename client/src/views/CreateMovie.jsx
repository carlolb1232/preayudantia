import React from "react";
import { useState } from "react";
import moment from "moment";
import { simplePost } from "../services/simplePost";
import CreateMovieForm from "../components/CreateMovieForm";
import { useNavigate } from "react-router-dom";
import {useUser} from "../contexts/userContext"


const CreateMovie = () => {

  const navigate = useNavigate();

  const {user}=useUser();

  const [movie, setMovie] = useState({
    nombre: "",
    trama: "",
    genero: "",
    fechaEstreno: moment().format("YYYY-MM-DD"),
  });

  const [review, setReview] = useState({
    content: "",
    rating: 1,
  });

  const [errors, setErrors] = useState();

  const createMovie = async (values) => {
    try {
      values.author=`${user.firstName} ${user.lastName}`
      const response = await simplePost("/api/movies", values);
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Crear película</h2>
      {errors?.map((error, index) => <p key={index}>{error}</p>)}
      <CreateMovieForm movie={movie} review={review} onSubmitProp={createMovie}/>
    </div>
  );
};

export default CreateMovie;
