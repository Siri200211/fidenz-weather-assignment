import { auth } from "express-oauth2-jwt-bearer";

if (!process.env.AUTH0_DOMAIN) {
  throw new Error("AUTH0_DOMAIN is not set");
}

export const checkJwt = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE || "https://weather-api"
});
