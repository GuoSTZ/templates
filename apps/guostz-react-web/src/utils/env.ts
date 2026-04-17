export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "/api";
}

export function getMicroAppBaseroute() {
  return import.meta.env.VITE_APP_MICRO_BASEROUTE || "/react-web";
}
