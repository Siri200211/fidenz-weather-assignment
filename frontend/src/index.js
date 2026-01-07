import { Auth0Provider } from "@auth0/auth0-react";

<Auth0Provider
  domain="YOUR_DOMAIN"
  clientId="YOUR_CLIENT_ID"
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: "https://weather-api"
  }}
>
  <App />
</Auth0Provider>
