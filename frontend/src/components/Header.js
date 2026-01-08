import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

function Header() {
  const { logout, isAuthenticated } = useAuth0();

  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <header className="navbar">
        <div className="nav-title">
          🌤️ Weather Comfort Dashboard
        </div>
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
