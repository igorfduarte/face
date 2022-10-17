import React, { useRef, useState, useEffect } from "react";

const Canvas = ({imageProp}) => {
  const [image, setImage] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://www.faceapp.com/static/img/content/compare/beard-example-before@3x.jpg';
    img.onload = () => setImage(img);
  }, []);

  useEffect(() => {
    if (canvas && image) {
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(image, 0, 0);
    }
  }, [image, canvas]);

  return (
    <div>
      <canvas ref={canvas} width={600} height={600}></canvas>
    </div>
  );
};

export default Canvas;
