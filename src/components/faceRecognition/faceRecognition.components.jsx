import React, { useRef, useState, useEffect } from "react";
import "./faceRecognition.css";

const FaceRecognition = ({ imageUrl, box,multiple }) => {
  const [image, setImage] = useState(null);

  const canvas = useRef(null);

  useEffect(() => {
    const img = document.getElementById("inputimage");

    img.onload = () => setImage(img);
  }, []);

  useEffect(() => {
    if (canvas && image) {
      const ctx = canvas.current.getContext("2d");

      const heigthRatio = image.naturalHeight / image.height;
      const widthRatio = image.naturalWidth / image.width;

      ctx.drawImage(
        image,
        box.leftCol * widthRatio,
        box.topRow * heigthRatio,
        (image.width - (box.rightCol + box.leftCol)) * widthRatio,
        (image.height - (box.bottomRow + box.topRow)) * heigthRatio,
        0,
        0,
        image.width - (box.leftCol + box.rightCol),
        image.height - (box.topRow + box.bottomRow)
      );



    }
  }, [box]);

  return (
    <div className="center ma">
      <div className="canvas"> 

      {box.leftCol && !multiple
          ? <canvas
            className="mt3"
            ref={canvas}
            width={
              document.getElementById("inputimage").width -
              (box.leftCol + box.rightCol)
            }
            height={document.getElementById("inputimage").height - (box.topRow + box.bottomRow)}
          ></canvas>
          : <> 
          {multiple
          ? <p className="white f3 center pt3"> Detected multiple faces. Please choose an image with only one face</p>
          :null
          } 
          <canvas id="canv" ref={canvas} width={0} height={0}></canvas>
          </>
        }    
        
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
    </div>
  );
};

export default FaceRecognition;
