import { authClient } from "./auth-client";

export const  getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error) throw error;

  return data?.token;
}
