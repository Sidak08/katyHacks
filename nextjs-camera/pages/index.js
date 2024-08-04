import React, { useState, useRef, useEffect } from "react";
import { Box, Center, Flex, useMediaQuery } from "@chakra-ui/react";
import { Camera } from "react-camera-pro";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);
  const [mobileScreen] = useMediaQuery("(min-width: 600px)");
  const [ratio, setRatio] = useState(9 / 16);

  useEffect(() => {
    // set ratio camera
    if (mobileScreen) {
      setRatio(9 / 16);
    } else {
      setRatio(9 / 16);
    }
  }, [mobileScreen, ratio]);

  const capture = () => {
    const imageSrc = camera.current.takePhoto();
    rotateImage(imageSrc, 90, (image) => {
      setImage(image);
      localStorage.setItem("myPhoto", image);
      convertAndSendImage(image);
    });
  };

  const rotateImage = (imageBase64, rotation, cb) => {
    var img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      cb(canvas.toDataURL("image/jpeg"));
    };
  };

  const convertAndSendImage = (imageBase64) => {
    var img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const imageCamera = {
    position: "absolute",
    bottom: "10%",
  };

  const cameraMarking = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
  };

  return (
    <Box
      bgImage={{ base: "none", md: "/112.png", lg: "/112.png" }}
      bgPosition="center"
      bgSize="cover"
      h="100vh"
    >
      <Center>
        <Box
          maxW="sm"
          mt={{ base: "0px", md: "10px", lg: "10px" }}
          height={{ base: "100%", md: "50%", lg: "25%" }}
          width={{ base: "600px", md: "50%", lg: "25%" }}
          borderWidth={{ base: "0px", md: "1px", lg: "1px" }}
          bg="teal.400"
          justifyContent="center"
          overflow="hidden"
          position={{ base: "", md: "", lg: "relative" }}
          borderRadius="lg"
          rounded={{ base: "none", md: "24", lg: "24" }}
        >
          <Flex direction="column" background="white">
            <Center>
              <Camera
                ref={camera}
                numberOfCamerasCallback={setNumberOfCameras}
                facingMode="user"
                aspectRatio={ratio}
              />
              <img
                src="/camera.svg"
                width="70px"
                height="70px"
                alt="Logo"
                style={imageCamera}
                onClick={capture}
              />
            </Center>
          </Flex>
        </Box>
      </Center>
    </Box>
  );
}
