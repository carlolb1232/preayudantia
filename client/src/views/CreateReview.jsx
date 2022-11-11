import React from 'react';
import { useState } from 'react';
import { simplePost } from '../services/simplePost';
import {useUser} from "../contexts/userContext"
import { useNavigate, useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

const CreateReview = () => {

  const navigate = useNavigate();

  const { user } = useUser();

  const { idMovie } = useParams();

  const [review, setReview] = useState({
    content: "",
    rating:1
  });

  const [errors, setErrors] = useState();

  const createReview = async (values) => {
    try {
      values.author =  `${user.firstName} ${user.lastName}`;
      values.idMovie = idMovie;
      const response = await simplePost(`/api/reviews`, values)
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
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Crear una review</h2>
      {errors?.map((error, index) => <p key={index}>{error}</p>)}
      <ReviewForm review={review} onSubmitProp={createReview}/>
    </div>
  );
}

export default CreateReview;
