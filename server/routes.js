const UserController = require("./controllers/user.controller")
const authenticate = require("./config/authenticate")

const MovieController = require("./controllers/movie.controller")
const ReviewController = require("./controllers/review.controller")

module.exports = function (app) {
  // USER
  app.post("/api/register", UserController.Register);
  app.post("/api/login", UserController.Login);
  app.post("/api/logout", UserController.Logout);

  //Movies
  app.get("/api/movies", MovieController.findAll);
  app.get("/api/movies/:id", MovieController.findOne);
  
  //Movies with authenticate
  app.post("/api/movies", authenticate, MovieController.createOne);
  app.put("/api/movies/:id", authenticate, MovieController.updateOne);
  app.delete("/api/movies/:id", authenticate, MovieController.deleteOne);


  
  //Reviews
  app.get("/api/reviews/:idMovie", ReviewController.getReviesFromMovie);
  
  // Reviews with auth
  app.post("/api/reviews", authenticate, ReviewController.createOne);

  //ENDPOINTS QUE NECESITAN AUTENTICACION
  app.get("/api/users", authenticate, UserController.getAll);
  app.get("/api/user/:id", authenticate, UserController.getUser)
}