export const REGISTER_URL = "https://hooks.store/register";
export const LOGIN_URL = "https://hooks.store/login";

export function getRegisterUrl(username?: string) {
  const trimmedUsername = username?.trim();

  if (!trimmedUsername) {
    return REGISTER_URL;
  }

  const registerUrl = new URL(REGISTER_URL);
  registerUrl.searchParams.set("username", trimmedUsername);

  return registerUrl.toString();
}
