import { NextApiRequest, NextApiResponse } from "next";
import { DockerManager } from "./docker";
import { ContainerInfo } from "dockerode";
import { ContainerLogs } from "@/utils/types";
import { WriteStream } from "fs";

type ReturnData = {
  logs: ContainerLogs[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  let docker = new DockerManager();
  let containers = await docker.listCTFContainers();
  let container = docker.docker.getContainer(containers[0].Id);
  const logs: ContainerLogs[] = [];
  containers.map(async (container) => {
    let containerData: ContainerLogs;
    let container_data = docker.docker.getContainer(container.Id);
    let execResp = await container_data.exec({
      Cmd: ["who"],
      AttachStdout: true,
      AttachStderr: true,
    });
    // logs.push({
    //   logs: data as string,
    //   id: container.Id,
    // });
    let resp = await execResp.start({ stdin: false });
    // console.log(resp);
    // resp.emit("close");
  });
  logs.push({
    logs: "Hello",
    id: "123",
  });

  res.status(200).json({
    logs: logs,
  });
}
