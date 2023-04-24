import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { DockerManager } from "./docker";
import { Container } from "postcss";
import { ContainerReturn, UserDataForm } from "@/utils/types";

type ReturnData =
  | {
      message?: string;
      detail?: string;
    }
  | ContainerReturn;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  let { username, email }: UserDataForm = req.body;
  if (!username || !email) {
    res.status(400).json({ message: "Bad request", detail: "Missing Data" });
    return;
  }
  // Store email for reference
  let docker = new DockerManager();

  let containerData = await docker.createContainer(username);

  res.status(200).json(containerData);
}
