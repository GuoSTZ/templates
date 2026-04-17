export function getDefaultSubAppEntry() {
  return import.meta.env.VITE_DEFAULT_SUB_APP_ENTRY || "/child-app/";
}
