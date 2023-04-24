import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { createContainer } from "@/utils/api";
import { FiCopy } from "react-icons/fi";
import Head from "next/head";
import Tilt from "react-parallax-tilt";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [terminalCommand, setTerminalCommand] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      if (uname === "" || email === "") {
        alert("Please fill in all fields");
        setLoading(false);
        return;
      }
      createContainer(uname, email).then((res) => {
        let current_host = window.location.hostname;
        let command = `ssh level0@${current_host} -p ${res.port}`;
        setTerminalCommand(command);
        setLoading(false);
      });
    }
    if (!loading) {
      setUname("");
      setEmail("");
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>lEvEl0 | HackWay</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
      >
        <Tilt>
          <div className="flex flex-col items-center border-4 p-10 rounded-xl">
            <div className="flex flex-col mb-10">
              <p className="text-6xl font-bold">lEvEl0</p>
              <p className="text-xl font-bold self-end">by GNX</p>
            </div>
            <div
              aria-disabled={loading}
              className="flex flex-col items-center space-y-2"
            >
              <label className="text-xl font-bold text-slate-100 self-start">
                Username
              </label>
              <input
                className="rounded-md p-1 bg-slate-900 "
                type="name"
                onChange={(e) => setUname(e.target.value)}
                value={uname}
                placeholder={"lEvEl0"}
              />
              <label className="text-xl font-bold text-slate-100 self-start">
                Email
              </label>
              <input
                className="rounded-md p-1 bg-slate-900"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder={"lEvEl0@gnx.one"}
              />
              <button
                className="border rounded-lg px-2 py-1 hover:bg-slate-800 hover:text-slate-100"
                onClick={() => setLoading(true)}
              >
                Get Started
              </button>
            </div>
            <Tilt>
              <div className="mt-10" hidden={terminalCommand === null}>
                <div className="flex flex-row border bg-slate-800 rounded-lg border-slate-200 p-2">
                  <p className="rounded-md p-1 font-sans font-thin">
                    {terminalCommand}
                  </p>
                  <button
                    className="border rounded-md ml-2 p-1 hover:bg-slate-900 hover:text-slate-100"
                    onClick={() => {
                      navigator.clipboard.writeText(terminalCommand!);
                    }}
                  >
                    <FiCopy />
                  </button>
                </div>

                <div className="items-center text-center">
                  <span className="font-thin">Password:</span>{" "}
                  <span className="font-bold">level0</span>
                </div>
              </div>
            </Tilt>
          </div>
        </Tilt>
      </main>
    </>
  );
}
