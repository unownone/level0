import { NextApiRequest, NextApiResponse } from "next";
import { DockerManager } from "./docker";
import { ContainerInfo } from "dockerode";
import { ContainerLogs } from "@/utils/types";
import { WriteStream } from "fs";
import { log } from "console";

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
  const logPromises = containers.map(async (container) => {
    let container_data = docker.docker.getContainer(container.Id);
    let execResp = await container_data.exec({
      Cmd: ["who"],
      AttachStdout: true,
      AttachStderr: true,
    });
    let exec = docker.docker.getExec(execResp.id);
    let stream = await exec.start(
      {
        hijack: true,
        stdin: true,
      }
    );
    let data: string[]  = [];
    stream.on("data", (chunk) => {
      data.push(chunk.toString("utf8"));
    });
    return new Promise((resolve) => {
      stream.on("end", () => {
        var ContainerLog: ContainerLogs = {
          logs: data.join(""),
          logData: data,
          id:container.Id,
        };
        logs.push(ContainerLog);
        resolve(
          log
        );
      });
    });
  });

  await Promise.all(logPromises);
  res.status(200).json({ logs: logs });
}
