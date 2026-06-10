import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("https://172.17.26.78:3000");
const sessionId = "session-xyz";

export default function Pos() {
  const [scanResult, setScanResult] = useState(false);
  const [scanResultList, setScanResultList] = useState([]);

  async function getUploadList() {
    const result = await fetch(`https://172.17.26.78:3000/scanner/upload`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    setScanResultList(await result.json());
  }

  useEffect(() => {
    socket.emit("join", { sessionId, role: "desktop" });
    socket.on("scan-result", async (data) => {
      console.log("data received =", data);
      setScanResult(data);
      await getUploadList();
    });
  }, []);

  useEffect(() => {
    (async () => {
      await getUploadList();
    })();
  }, []);
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="max-w-2xl w-full mx-auto p-6 bg-gray-100 rounded shadow-lg text-amber-700 bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 ">
        <h1 className="text-2xl font-bold mb-4">ID Scanner POS</h1>
        <div className="bg-white p-4 rounded shadow-inner">
          <p>Status: Connected ✅</p>
          {scanResult ? (
            <div className="mt-4">
              <p className="flex gap-2 p-2 border-b-2 border-b-amber-300">
                <strong className="w-1/2">Name:</strong> {scanResult.name}
              </p>
              <p className="flex gap-2 p-2 border-b-2 border-b-amber-300">
                <strong className="w-1/2">ID:</strong> {scanResult.idNumber}
              </p>
              <p className="flex gap-2 p-2 border-b-2 border-b-amber-300">
                <strong className="w-1/2">Raw:</strong>{" "}
                <img width="300" src={scanResult.image} />
              </p>
            </div>
          ) : (
            <p className="mt-4">Waiting for scan...</p>
          )}
        </div>
      </div>

      {scanResultList.length > 0 && (
        <div className="max-w-2xl w-full mx-auto p-6 bg-gray-100 rounded shadow-lg text-amber-700 bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 ">
          <h1 className="text-2xl font-bold mb-4">Scanned List</h1>
          <div className="bg-white p-4 rounded shadow-inner">
            {scanResultList.map((row) => (
              <div className="mt-4">
                <p className="flex gap-2 p-2 border-b-2 border-b-amber-300">
                  <strong className="w-1/2"></strong> {row.name}
                  <strong className="w-1/2"></strong> {row.idNumber}
                  <img width="200" src={row.image} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
