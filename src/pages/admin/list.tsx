import { listContainers } from "@/utils/api";
import { ContainerInfo } from "dockerode";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [containers, setContainers] = useState<ContainerInfo[]>([]);

  useEffect(() => {
    listContainers().then((res) => {
      console.log(res);
      //   setContainers(res);
    });
  });

  return (
    <div className={`${inter.className}`}>
      <table>
        <thead>
          <th>sl</th>
          <th>name</th>
          <th>status</th>
        </thead>
        <tbody>
          {containers.map((container, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{container.Names}</td>
              <td>{container.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
