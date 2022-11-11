const { Movie } = require("../models/movie.model");
const { Review } = require("../models/review.model");


module.exports.createOne = async (req, res) =>{
  try{
    const { content, author, rating, idMovie} = req.body;
    const review = await Review.create({content, author, rating});
    const movie = await Movie.findById(idMovie).exec();
    const moviesWithReviews = await Movie.findById(idMovie).populate("reviews").exec();
    let totalReviews = moviesWithReviews.reviews.length + 1;
    let sumReviews = moviesWithReviews.reviews.reduce((acumulado, elemento)=>acumulado+=Number(elemento.rating), 0) + Number(rating);
    let avg = sumReviews/totalReviews;
    const updateMoviesAverage = await Movie.findByIdAndUpdate({_id:idMovie}, {average:avg}, {new:true})
    movie.reviews.push(review)
    await movie.save();
    updateMoviesAverage.save()
    res.json({message:"", review: review})
  }catch(err){
    res.json({message:"Algo salio mals",errors:err.errors})
  }
}

module.exports.getReviesFromMovie = async (req, res) =>{
  try{
    const {idMovie} = req.params;
    const movie = await Movie.findById(idMovie).populate("reviews").exec();
    
    console.log("QUOTES DEL AUTORE", movie.reviews);
    res.json({message:"", reviews: movie.reviews })
  }catch(err){
    res.json({message:"Algo salio mal",errors:err.errors})
  }
}
