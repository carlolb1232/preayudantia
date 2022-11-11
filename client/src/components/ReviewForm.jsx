import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";

const ReviewForm = (props) => {

  const { review, onSubmitProp } = props;
  

  return (
    <div>
      <Formik
        initialValues={{
          content: review.content,
          rating: review.rating,
        }}
        validationSchema={Yup.object().shape({
          content: Yup.string()
            .min(3, "el contenido debe tener al menos 3 caracteres")
            .max(50, "el contenido es muy largo")
            .required("debe agregar un contenido"),
          rating: Yup.number()
            .min(1, "rating debe de ser al menos de 1")
            .max(5, "el rating máximo es de 5")
            .required("debe agregar calificación"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitProp(values);
          console.log(values)
        }}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <div className="mb-3">
              <Form>
                <div className="mb-3">
                  <label className="form-label" htmlFor="content">
                    Contenido de reseña
                  </label>
                  <Field
                    type="text"
                    as="textarea"
                    name="content"
                    className="form-control"
                  ></Field>
                  {errors.content && touched.content && (
                    <p className=""> {errors.content} </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="rating">
                    Rating
                  </label>
                  <Field
                    type="number"
                    as="select"
                    name="rating"
                    className="form-select"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Field>
                  {errors.rating && touched.rating && (
                    <p className=""> {errors.rating} </p>
                  )}
                </div>
                <button
                  disabled={
                    Object.values(errors).length > 0 ||
                    Object.values(touched).length === 0
                  }
                  className="btn btn-success btn-lg"
                  type="submit"
                >
                  Enviar
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default ReviewForm;
