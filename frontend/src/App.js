import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>
          Login
        </button>
      )}

      {isAuthenticated && (
        <button onClick={() => logout()}>
          Logout
        </button>
      )}
    </div>
  );
}

export default App;
