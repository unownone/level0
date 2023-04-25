import { listContainers } from "@/utils/api";
import { ContainerInfo } from "dockerode";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [password, setPassword] = useState<string | null>(null);

  return (
    <div className={`${inter.className}`}>
      <input
        type={`password`}
        onChange={(e) => setPassword(e.target.value)}
        value={password!}
      ></input>
      <button
        onClick={() => {
          localStorage.setItem("CTF_ADMIN_KEY", password!);
        }}
      >
        Update KEY
      </button>
    </div>
  );
}
