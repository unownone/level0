import { ContainerReturn } from "@/utils/types";
import dockerode from "dockerode";
import { nanoid } from "nanoid";

const CTF_CONTAINER_IMAGE_NAME = "ananyo141/gnx-ctf:1.2.1";

export class DockerManager {
  docker: dockerode;
  constructor() {
    // Create a new dockerode instance
    this.docker = new dockerode();
  }

  async createContainer(username: string): Promise<ContainerReturn> {
    // Generate a unique name for the username
    username = `ctf-${username.replace(" ", "-")}-${nanoid(6)}`;
    const container = await this.docker.createContainer({
      Image: CTF_CONTAINER_IMAGE_NAME,
      name: username,
      Labels: {
        "ctf-container": "true",
        "ctf-container-name": username,
      },
      HostConfig: {
        PortBindings: {
          // This Config will generate a random port for the host
          "22/tcp": [
            {
              HostPort: "0",
            },
          ],
        },
      },
      Volumes: {
        [`/logs/level0_logs.json`]: {
          "/etc/logs/level0_logs.json": "ro",
        },
      },
      Env: ["CTF_USERNAME=" + username],
    });

    await container.start();

    let data = await container.inspect();

    return {
      id: data.Id,
      containerName: data.Name,
      port: data.NetworkSettings.Ports["22/tcp"][0].HostPort,
    };
  }

  async listCTFContainers(username?: string) {
    /// By Default lists all CTF Containers.
    /// If username is provided, it will list all containers for that user

    let filterLabels = ["ctf-container=true"];
    if (username) {
      filterLabels.push(`ctf-container-name=ctf-${username}`);
    }
    const containers = await this.docker.listContainers({
      filters: {
        label: filterLabels,
      },
    });
    return containers;
  }

  async deleteContainers(username?: string) {
    // Delete all CTF containers
    // If username is provided, it will delete all containers for that user

    let containers = await this.listCTFContainers(username);
    containers.map(async (container) => {
      let container_data = this.docker.getContainer(container.Id);
      await container_data.stop();
      await container_data.remove();
    });
  }

  async get_new_port() {
    // Get a unix port that is not being used currently
  }
}
