import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import logout from "../services/logout";

const NavBar = () => {
  const { user, setUser } = useUser();

  const logOut = async () => {
    const { success } = await logout();
    if (success) setUser(null);
    else window.alert("Error. No se pude desloguear");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <p>
        GESTOR DE PELÍCULAS
      </p>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            LISTADO DE PELÍCULAS
          </Link>
        </li>
        {user && (
          <li className="nav-item">
            <Link className="nav-link" to="/create/movie">
              CREAR PELÍCULA CON RESEÑA
            </Link>
          </li>
        )}
        {!user && (
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        )}
        {!user && (
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Registro
            </Link>
          </li>
        )}
        {user && (
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button"
              aria-expanded="false"
            >
              {user.firstName} {user.lastName}
            </a>
            <ul className="dropdown-menu">
              <li>
                <button onClick={logOut} className="dropdown-item" href="#">
                  LogOut
                </button>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
