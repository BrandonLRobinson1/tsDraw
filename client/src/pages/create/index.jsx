import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import NavCreate from "../navBar/NavCreate";
import { AuthContext } from "../../lib/context/AuthContext";
import Loading from "../common/Loading";
import {
  colorsOptions,
  brushSize,
  strokeSize,
  brushType,
  viewTypes,
} from "./dropdownValues";
import "./index.css";

// TODO: rename and move
const baseUrl = "http://localhost:3100";

const Create = () => {
  const navigate = useNavigate();
  const [currentlyDrawing, setCurrentlyDrawing] = useState(false);
  const [viewType, setViewType] = useState("public");
  const [isLoading, setIsLoading] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);
  const [prevCtx, setPrevCtx] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const beginningTime = new Date();

  useEffect(() => {
    console.log("canvasRef", canvasRef);

    const canvas = canvasRef.current;
    // double pixel density to support computers with larger screen densities (retina)
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;

    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.width = `${window.innerWidth}px`;

    const ctx = canvas.getContext("2d");

    // also needed to support higher screen density
    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctxRef.current = ctx;
  }, []);

  const beginDrawing = ({ nativeEvent }) => {
    const { offsetX: x, offsetY: y } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setCurrentlyDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setCurrentlyDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!currentlyDrawing) return;
    const { offsetX: x, offsetY: y } = nativeEvent;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const eraser = () => {
    // TODO: look
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!eraserActive) {
      setEraserActive(true);

      setPrevCtx({
        lineCap: ctx.lineCap,
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });

      ctx.lineCap = "round";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 30;
      ctxRef.current = ctx;
    } else {
      setEraserActive(false);
      ctx.lineCap = prevCtx.lineCap;
      ctx.strokeStyle = prevCtx.strokeStyle;
      ctx.lineWidth = prevCtx.lineWidth;
      ctxRef.current = ctx;

      setPrevCtx(null);
    }
  };

  const changeCanvasValue = (attr, val) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx[attr] = val;
    ctxRef.current = ctx;
  };

  // const dataURLtoBlob = (dataURL) => {
  //   const array = [];
  //   const binary = atob(dataURL.split(",")[1]);
  //   let i = 0;
  //   const { length } = binary;
  //   while (i < length) {
  //     array.push(binary.charCodeAt(i));
  //     // eslint-disable-next-line
  //     i++;
  //   }
  //   return new Blob([new Uint8Array(array)], {
  //     type: "image/png",
  //   });
  // };

  // const saveDrawing = async () => {
  //   const canvas = document.getElementById("canvas");
  //   const file = dataURLtoBlob(canvas.toDataURL());
  //   const fd = new FormData();
  //   fd.append("image", file);
  //   console.log("file", file);
  //   // TODO:
  //   // get email out of  context
  // };

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const saveDrawing = async () => {
    setIsLoading(true);
    try {
      const endTime = new Date();
      const canvasSave = document.getElementById("canvas");
      const drawingUrl = canvasSave.toDataURL("image/png");

      const miliseconds = endTime - beginningTime;
      const elapsedTime = millisToMinutesAndSeconds(miliseconds);
      // alst need this for creation time -> beginningTime

      const readableDate = Date(beginningTime).split(" ");
      const dateCreated = `${readableDate[1]} ${readableDate[2]} ${readableDate[3]}`;
      const timeCreate = readableDate[4];
      console.log("memberSince", dateCreated, timeCreate);

      const token = JSON.parse(localStorage.getItem("tsToken"));

      const axiosBody = {
        url: drawingUrl,
        viewType,
        createTime: timeCreate,
        creationDate: dateCreated,
        timeToCreate: elapsedTime,
      };

      const body = JSON.stringify(axiosBody);

      const config = {
        headers: {
          "Content-Type": "application/JSON",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${baseUrl}/create`, body, config);

      setIsLoading(false);

      toast.success("Drawing saved!");

      navigate("/main");
    } catch (e) {
      const { response } = e;

      setIsLoading(false);

      if (response.status === 500) {
        toast.error("Cannot reach server");
      }
      toast.error(response.data.message);
    }
  };

  console.log("ctxRef", ctxRef);

  // const changeCanvasScale = (attr, val) => {
  //   const ctx = canvas.getContext("2d");

  //   // also needed to support higher screen density
  //   ctx.scale(2, 2);
  //   ctx.lineCap = "round";
  //   ctx.strokeStyle = "blue";
  //   ctx.lineWidth = 10;
  //   ctxRef.current = ctx;
  // };

  if (isLoading) return <Loading />;

  return (
    <div>
      <NavCreate
        clearCanvas={clearCanvas}
        eraser={eraser}
        saveDrawing={saveDrawing}
      />
      <div className="canvas-control-container">
        <div className="canvas-dropdown">
          <Dropdown
            label="Color"
            value={ctxRef.strokeStyle}
            defaultValue={colorsOptions[0]}
            options={colorsOptions}
            onChange={(e) => changeCanvasValue("strokeStyle", e.target.value)}
          />
        </div>
        <div className="canvas-dropdown">
          <Dropdown
            label="Brush Size"
            value={ctxRef.lineWidth}
            defaultValue={brushSize[0]}
            options={brushSize}
            onChange={(e) => changeCanvasValue("lineWidth", e.target.value)}
          />
        </div>
        <div className="Brush Type">
          <Dropdown
            label="Brush Type"
            value="label"
            defaultValue={brushType[0]}
            options={brushType}
            onChange={(e) => changeCanvasValue("lineCap", e.target.value)}
          />
        </div>
        <div className="canvas-dropdown">
          <Dropdown
            label="Stroke Size"
            value="label"
            defaultValue={strokeSize[0]}
            options={strokeSize}
            onChange={(e) => console.log("hi")}
          />
        </div>
        <div className="canvas-dropdown">
          <Dropdown
            label="Public/Private"
            value={viewType}
            defaultValue={viewTypes[0]}
            options={viewTypes}
            onChange={(e) => setViewType(e.target.value)}
          />
        </div>
      </div>
      <canvas
        id="canvas"
        onMouseDown={beginDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        pauseOnFocusLoss
        limit={1}
      />
    </div>
  );
};

export default Create;
