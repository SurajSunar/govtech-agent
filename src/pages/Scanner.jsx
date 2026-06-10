import { useEffect, useRef, useState } from "react";
import Tesseract from "tesseract.js";
import useBeep from "../hooks/useBeep";
import * as faceapi from "face-api.js";
import { LoaderCircle } from "lucide-react";
import useBeepDup from "../hooks/useBeepDup";

export default function ScannerPage() {
  const videoRef = useRef(null);
  const sessionId = "session-xyz";
  const [isdisabled, setIsdisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const deep = useBeep();
  const deepDup = useBeepDup();

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          focusMode: "continuous",
          exposureMode: "continuous",
          whiteBalanceMode: "continuous",
        },
      });

      videoRef.current.addEventListener("click", async () => {
        const track = stream.getVideoTracks()[0];

        try {
          await track.applyConstraints({
            advanced: [{ focusMode: "single-shot" }],
          });
        } catch (e) {
          console.log("Focus not supported");
        }
      });

      if (videoRef.current) videoRef.current.srcObject = stream;
    };
    startCamera();
  }, []);

  const captureAndSend = async () => {
    try {
      if (!videoRef.current) return;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      const image = canvas.toDataURL("image/jpeg", 0.9);

      const data = await processImage(image);

      if (data.idNumber && data.idNumber.length === 11 && !loading) {
        setLoading(() => true);
        setMessage(data?.idNumber);
        setIsDuplicate(false);
        const response = await fetch(
          `https://172.17.26.78:3000/scanner/upload/${sessionId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image }),
          },
        );

        const dataResult = await response.json();

        if (dataResult.duplicate) {
          setMessage("Duplicate CID: " + dataResult.idNumber);
          setIsDuplicate(true);
          deepDup();
        } else {
          deep();
        }

        setTimeout(
          () => {
            setMessage(null);
            setIsdisabled(false);
            setLoading(false);
          },
          isDuplicate ? 5000 : 2000,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  async function processImage(base64Image) {
    const result = await Tesseract.recognize(base64Image, "eng");
    const text = result.data.text;
    return extractFields(text);
  }

  function extractFields(text) {
    return {
      name: text.match(/Name[:\s]+([A-Z ]+)/i)?.[1] || "",
      idNumber: text.match(/\d{6,}/)?.[0] || "",
      raw: text,
    };
  }

  useEffect(() => {
    let interval = null;

    if (isdisabled) {
      clearInterval(interval);
    } else {
      interval = setInterval(captureAndSend, 4000);
    }

    return () => clearInterval(interval);
  }, [isdisabled]);

  return (
    <div className="py-10 w-full lg:w-1/2 bg-linear-to-br from-amber-200 via-amber-100 to-amber-50 rounded px-4">
      {/* {message && (
        <p className="text-2xl text-amber-700 mb-10">
          Detected CID No.: {message}
        </p>
      )} */}
      {/* <video
        ref={videoRef}
        autoPlay
        className="w-full rounded shadow-lg h-auto object-cover bg-"
      /> */}

      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
        <video
          ref={videoRef}
          autoPlay
          className={"w-full h-auto" + (loading && "blur-sm")}
        ></video>

        {loading && (
          <div class="absolute inset-0 flex items-center justify-center">
            {!isDuplicate ? (
              <h1 class="text-white text-4xl font-bold bg-black/30 px-4 py-2 rounded">
                Detected CID No.: {message}
              </h1>
            ) : (
              <h1 class="text-white bg-red-700 text-4xl font-bold  px-4 py-2 rounded">
                {message}
              </h1>
            )}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          disabled={loading}
          className="bg-amber-600 text-white rounded-xl p-2 w-full"
          onClick={() => setIsdisabled(!isdisabled)}
        >
          {loading ? (
            <span className=" flex justify-center gap-2">
              <LoaderCircle className="animate-spin" /> Verifying
            </span>
          ) : isdisabled ? (
            "Start Capture"
          ) : (
            "Stop Capture"
          )}
        </button>
      </div>
    </div>
  );
}
