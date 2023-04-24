import { NextApiRequest, NextApiResponse } from "next";
import { DockerManager } from "./docker";
import { ContainerInfo } from "dockerode";

type ReturnData = {
  containers: ContainerInfo[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  let docker = new DockerManager();
  let containers = await docker.listCTFContainers();
  res.status(200).json({ containers: containers });
}
