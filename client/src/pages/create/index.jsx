import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../common/Dropdown';
import NavCreate from '../navBar/NavCreate';
import axiosTokenConfig from '../../lib/static/axiosTokenConfig';
import {
  colorsOptions, brushSize, viewTypes, baseUrl,
} from '../../lib/static';
import './index.css';

const Create = () => {
  const navigate = useNavigate();
  const [currentlyDrawing, setCurrentlyDrawing] = useState(false);
  const [viewType, setViewType] = useState('public');
  const [eraserActive, setEraserActive] = useState(false);
  const [prevCtx, setPrevCtx] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const beginningTime = new Date();

  useEffect(() => {
    const canvas = canvasRef.current;

    // double pixel density to support computers with larger screen densities (retina)
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;

    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.width = `${window.innerWidth}px`;

    const ctx = canvas.getContext('2d');

    // also needed to support higher screen density
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
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
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const eraser = () => {
    // TODO: look
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!eraserActive) {
      setEraserActive(true);

      setPrevCtx({
        lineCap: ctx.lineCap,
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });

      ctx.lineCap = 'round';
      ctx.strokeStyle = 'white';
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
    const ctx = canvas.getContext('2d');
    ctx[attr] = val;
    ctxRef.current = ctx;
  };

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const saveDrawing = async () => {
    try {
      const endTime = new Date();
      const canvasSave = document.getElementById('canvas');
      const drawingUrl = canvasSave.toDataURL('image/png');

      const miliseconds = endTime - beginningTime;
      const elapsedTime = millisToMinutesAndSeconds(miliseconds);

      const readableDate = Date(beginningTime).split(' ');
      const dateCreated = `${readableDate[1]} ${readableDate[2]} ${readableDate[3]}`;
      const timeCreate = readableDate[4];

      const axiosBody = {
        url: drawingUrl,
        viewType,
        createTime: timeCreate,
        creationDate: dateCreated,
        timeToCreate: elapsedTime,
      };

      const body = JSON.stringify(axiosBody);

      await axios.post(`${baseUrl}/create`, body, axiosTokenConfig);

      toast.success('Drawing saved!');

      navigate('/main');
    } catch (e) {
      const { response } = e;

      if (response.status === 500) {
        toast.error('Cannot reach server');
      }
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <NavCreate
        clearCanvas={clearCanvas}
        eraser={eraser}
        saveDrawing={saveDrawing}
        eraserActive={eraserActive}
      />
      <div className="canvas-control-container">
        <div className="canvas-dropdown">
          <Dropdown
            label="Color"
            value={ctxRef.strokeStyle}
            defaultValue={colorsOptions[0]}
            options={colorsOptions}
            onChange={(e) => changeCanvasValue('strokeStyle', e.target.value)}
          />
        </div>
        <div className="canvas-dropdown">
          <Dropdown
            label="Brush Size"
            value={ctxRef.lineWidth}
            defaultValue={brushSize[0]}
            options={brushSize}
            onChange={(e) => changeCanvasValue('lineWidth', e.target.value)}
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
