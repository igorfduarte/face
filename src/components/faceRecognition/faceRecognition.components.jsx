import React, { useRef, useState, useEffect } from "react";
import "./faceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  const [image, setImage] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    const img = document.getElementById("inputimage");

    img.onload = () => setImage(img);
  }, []);

  useEffect(() => {
    if (canvas && image) {
      //console.log({originalHeigth})
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

       const oriHeigth = image.naturalHeight
      

      const heigthRatio = image.naturalHeight/ image.height
      const widthRatio =image.naturalWidth / (image.width)
      

      ctx.drawImage(
        image,
        box.leftCol * widthRatio,
        box.topRow * heigthRatio,
        (image.width - (box.rightCol + box.leftCol)) * widthRatio,
        (image.height - (box.bottomRow + box.topRow)) * heigthRatio,
        0,
        0,
        (image.width - (box.leftCol + box.rightCol)),
        image.height - (box.topRow + box.bottomRow)
      );
    }
  }, [image, canvas]);


  const getImageElement= (img) => {
    if(Object.keys(box) == 0)
    return 500


    if(document.getElementById(img) != null){
      
      const returnValue= Number(Number(document.getElementById(img).width) - Number(box.leftCol + box.rightCol))
      return(returnValue)
    }
    
    else{
      return 500
    }
  }
  const getImageElement2= (img) => {
    if(Object.keys(box) == 0)
    return 500

    if(document.getElementById(img) != null){
      const returnValue = Number(Number(document.getElementById(img).height) - Number(box.topRow+ box.bottomRow))
  
      return(returnValue)
    }else{
      return 500
    }
  }




  return (    

    <div className="center ma">
      <div className="canvas">
        
        <canvas
          ref={canvas}
          width={getImageElement("inputimage") }
          height={getImageElement2("inputimage") }
        ></canvas>
      </div>
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          width="500px"
          height="auto"
          alt=""
        />

        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
      <button className="absolute">crop</button>
    </div>
  );
};



export default FaceRecognition;
