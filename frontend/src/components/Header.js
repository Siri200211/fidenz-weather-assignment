import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

function Header({ theme, setTheme }) {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return null;

  return (
    <>
      <header className="navbar">
        <div className="nav-title">
          🌤️ Weather Comfort Dashboard
        </div>

        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </header>

      <button
        className="btn-secondary logout-fab"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    </>
  );
}

export default Header;
