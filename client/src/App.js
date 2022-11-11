import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import {useUser} from "./contexts/userContext"
import Detail from "./views/Detail";
import NavBar from "./components/NavBar";
import CreateMovie from "./views/CreateMovie";
import CreateReview from "./views/CreateReview";
import UpdateMovie from "./views/UpdateMovie";

function App() {

  return (
    <div className="App">
      <UserProvider>
        <header>
          <NavBar />
        </header>
        

        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create/movie" element={<CreateMovie />}></Route>
          <Route path="/movie/:id" element={<Detail />}></Route>

          <Route path="/create/review/:idMovie" element={<CreateReview />}></Route>
          <Route path="/update/movie/:id" element={<UpdateMovie />}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
