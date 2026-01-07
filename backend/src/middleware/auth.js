import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://weather-api",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256"
});