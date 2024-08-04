"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { Camera } from "react-camera-pro";
import axios from "axios";

export default function Home() {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [mobileScreen] = useMediaQuery("(min-width: 600px)");
  const [ratio, setRatio] = useState(9 / 16);
  const [word, setWord] = useState("");

  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  useEffect(() => {
    if (mobileScreen) {
      setRatio(9 / 16);
    } else {
      setRatio(16 / 9);
    }
  }, [mobileScreen]);

  const capture = () => {
    console.log("hi");
    if (camera.current) {
      const imageSrc = camera.current.takePhoto();
      rotateImage(imageSrc, 90, (image) => {
        setImage(image);
        localStorage.setItem("myPhoto", image);
        convertAndSendImage(image);
      });
    }
  };

  const rotateImage = (imageBase64, rotation, cb) => {
    const img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.height;
      canvas.height = img.width;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      cb(canvas.toDataURL("image/jpeg"));
    };
  };

  const convertAndSendImage = (imageBase64) => {
    const img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], "photo.png", { type: "image/png" });
        sendImage(file);
      }, "image/png");
    };
  };

  const sendImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        setWord(word + letters[response.data.prediction]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      className="full overflow-clip"
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      <div className="w-full flex justify-center">
        <Camera
          ref={camera}
          numberOfCamerasCallback={setNumberOfCameras}
          facingMode="user"
          aspectRatio={ratio}
          className="w-full h-full"
        />
        <button
          className="p-2 bg-opacity-60 w-[100px] h-[100px] z-10 absolute bottom-[5%] bg-[#D9D9D9] flex justify-center items-center rounded-[50%]"
          onClick={capture}
        >
          <img src="/camera.svg" width="50px" height="50px" alt="Logo" />
        </button>
        <div className="text-[28px] p-2 bg-opacity-60 min-w-[100px] z-10 h-[50px] absolute top-[5%] left-[7%] bg-[#D9D9D9] flex justify-center items-center rounded-[10px]">
          Word: {word}
        </div>
      </div>
    </div>
  );
}
