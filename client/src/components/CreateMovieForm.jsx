import React from "react";
import {Formik, Field, Form} from "formik";
import * as Yup from "yup";

const CreateMovieForm = (props) => {
  const { movie, review, onSubmitProp } = props;

  return (
    <div>
      <Formik
        initialValues={{
          nombre: movie.nombre,
          trama: movie.trama,
          genero: movie.genero,
          fechaEstreno: movie.fechaEstreno,
          content: review.content,
          rating: review.rating,
        }}
        validationSchema={Yup.object().shape({
          nombre: Yup.string()
            .min(3, "el nombre es muy corto")
            .max(50, "el nombre es muy largo")
            .required("debe ingresar un nombre"),
          trama: Yup.string()
            .min(3, "la trama es muy corta")
            .max(50, "la trama es muy largo")
            .required("debe ingresar una trama"),
          genero: Yup.string()
            .min(3, "el genero es muy corto")
            .max(50, "el genero es muy largo")
            .required("debe ingresar un genero"),
          fechaEstreno: Yup.date()
            .required("debe agregar una fecha"),
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
                <div className="form-group">
                  <label className="form-label" htmlFor="nombre">
                    Nombre de Película
                  </label>
                  <Field
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Ingrese el nombre"
                  ></Field>
                  {errors.nombre && touched.nombre && (
                    <p className=""> {errors.nombre} </p>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="trama">
                    Trama de Película
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    name="trama"
                    className="form-control"
                    placeholder="Ingrese la trama"
                  ></Field>
                  {errors.trama && touched.trama && (
                    <p className=""> {errors.trama} </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="genero">
                    Genero de la película
                  </label>
                  <Field
                    type="text"
                    name="genero"
                    className="form-control"
                  ></Field>
                  {errors.genero && touched.genero && (
                    <p className=""> {errors.genero} </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="fechaEstreno">
                    Ingrese fecha de estreno
                  </label>
                  <Field
                    type="date"
                    name="fechaEstreno"
                    className="form-control"
                  ></Field>
                  {errors.fechaEstreno && touched.fechaEstreno && (
                    <p className=""> {errors.fechaEstreno} </p>
                  )}
                </div>
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
};

export default CreateMovieForm;
