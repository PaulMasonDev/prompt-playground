let BACKEND_API_MUTABLE = "https://grocery-monorepo-production.up.railway.app";
if (window && window.location && window.location.hostname === "localhost") {
  BACKEND_API_MUTABLE = "http://localhost:8000";
}

export const BACKEND_API = BACKEND_API_MUTABLE;
