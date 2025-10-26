import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="bg-gradient-to-r from-rose-200 via-purple-200 to-sky-200 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl font-bold"
            title="ToyTopia"
          >
            TT
          </div>
          <span className="font-extrabold text-xl">ToyTopia</span>
        </Link>

        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-indigo-700 font-semibold" : "")}>
            Home
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "text-indigo-700 font-semibold" : "")}>
            My Profile
          </NavLink>
          <NavLink to="/extra" className={({ isActive }) => (isActive ? "text-indigo-700 font-semibold" : "")}>
            My Try Requests
          </NavLink>
          

          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/7bQQYkP/default-avatar.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                title={user.displayName || user.email}
              />
              <button onClick={logout} className="btn btn-sm btn-ghost">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
