const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:[true,"El nombre es obligatorio (back)"],
        minlength: [3,"El nombre es muy corto"],
        maxlength: [50, "El nombre es muy largo"],
    },
    trama:{
      type:String,
      required:[true,"La trama es obligatorio (back)"],
      minlength: [3,"La trama es muy corta"],
      maxlength: [50, "La trama es muy larga"],
    },
    genero:{
        type:String,
        required:[true,"El género es obligatorio (back)"],
        minlength: [3,"El género es muy corto"],
        maxlength: [50, "El género es muy largo"],
    },
    fechaEstreno:{
      type:Date,
      required:[true,"La fecha de estreno es obligatoria (back)"],
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    average:{
        type:Number,
        default: 0
    }
},
{timestamps:true})

const Movie = mongoose.model("Movie",MovieSchema);



module.exports = {Movie, MovieSchema};