import { ContainerReturn, UserDataForm } from "./types";

export const createContainer = async (username: string, email: string) => {
  const data: UserDataForm = {
    username: username,
    email: email,
  };
  let response: ContainerReturn = await fetch("/api/docker/create", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
};
