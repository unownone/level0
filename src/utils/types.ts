export interface ContainerReturn {
  id: string;
  port: number | string;
  containerName: string;
}

export type UserDataForm = {
  username: string;
  email: string;
};

export type ContainerLogs = {
  logs: string;
  id: string;
};
