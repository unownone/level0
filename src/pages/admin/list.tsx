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
      setContainers(res);
    });
  });

  return (
    <div
      className={`${inter.className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <table style={{ borderCollapse: "collapse", border: "1px solid white" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "8px" }}>sl</th>
            <th style={{ border: "1px solid white", padding: "8px" }}>name</th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              status
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {containers.map((container, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {index}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {container.Names}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {container.State}
              </td>
              <td style={{ border: "1px solid white", padding: "8px" }}>
                {container.Command}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
