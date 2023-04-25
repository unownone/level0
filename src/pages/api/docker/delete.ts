import { NextApiRequest, NextApiResponse } from "next";
import { DockerManager } from "./docker";
import { ContainerInfo } from "dockerode";

type ReturnData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  if (req.method !== "DELETE") {
    res.status(405).json({
      message: "Method Not Allowed",
    });
    return;
  }

  let token = req.headers.token;
  console.log(token, process.env.API_TOKEN);
  if (!token || token !== process.env.API_TOKEN) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  let docker = new DockerManager();
  let username = req.query.username as string | undefined;
  let containers = await docker.deleteContainers(username);
  res.status(200).json({
    message: "Containers Deleted Successfully...",
  });
}
