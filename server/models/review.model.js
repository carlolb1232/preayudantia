const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: [3,"El contenido de la cita es muy corto"],
    maxlength: [50, "El contenido de la cita es muy largo"],
    required: [true, "El contenido de la cita es obligatorio"]
  },
  author: {
    type: String,
    required: [true, "El autor de la review es obligatorio"],
  },
  rating:{
    type: Number,
    minlength: [1,"Se necesita mínimo un 1 de calificación"],
    maxlength: [5, "La calificación máxima es 5"],
    required: [true, "El rating es obligatorio"],
  }
}, 
{
  timestamps:true
});

const Review = mongoose.model("Review",ReviewSchema);

module.exports = {ReviewSchema, Review};