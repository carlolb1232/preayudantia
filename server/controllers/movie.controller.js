const { Movie } = require("../models/movie.model");
const { Review } = require("../models/review.model");

module.exports.findAll = (req,res) => {
  Movie.find()
    .then((movies)=>res.json({message:"", movies:movies}))
    .catch((err)=>res.json({message:"Algo salio mal",error:err.errors}))
}


module.exports.createOne = async(req,res)=>{
    try{
        const {nombre, trama, genero, fechaEstreno, content, author, rating } = req.body;
        const review = new Review({content, author, rating});
        const movie = new Movie({nombre, trama, genero, fechaEstreno, average: Number(rating)});
        movie.reviews.push(review);
        await movie.save();
        await review.save();
        res.json({message:"",movie:movie,quote:review})
    }
    catch(err){
        res.json({message:"Algo salio mal",errors:err.errors})
    }
}

module.exports.findOne = (req,res) => {
  const { id } = req.params;
  Movie.findOne({_id: id})
    .then((movie)=>res.json({message: "", movie:movie}))
    .catch((err)=>res.json({message:"Algo salio mal",errors:err.errors}))
}

module.exports.updateOne = (req,res) => {
  const { id } = req.params
  Movie.findOneAndUpdate({_id:id},req.body,{new:true,runValidators:true})
      .then((movie)=>res.json({message: "", movie:movie}))
      .catch((err)=>res.json({message:"Algo salio mal",errors:err.errors}))
}

module.exports.deleteOne = (req,res) => {
  const { id } = req.params
  Movie.deleteOne({_id: id})
      .then((result)=>res.json({message: "", resultado:result}))
      .catch((err)=>res.json({message:"Algo salio mal",error:err}))
}
