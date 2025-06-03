import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">MonForum</Link>
      <div>
        {token ? (
          <>
            <span className="mr-4">Bonjour, {user?.username}</span>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">Connexion</Link>
            <Link to="/register" className="hover:underline">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}