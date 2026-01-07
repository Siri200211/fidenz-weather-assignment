import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain= "dev-oucy02cp1k7f6sfd.us.auth0.com"
      clientId= "jhHU7KqOtlxdxlyQxG5NXpXegrDndZOE"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://weather-api"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
