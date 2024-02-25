

import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useNavigate } from 'react-router-dom';
let faceIsVisibleAndGoHome = false;

let video;
let navigate;
function FaceDetect({onButtonClick}) {
  navigate = useNavigate();
  const myRef = useRef(null);

  useEffect(() => {
    const myP5 = new p5(sketch, myRef.current);
    return () => myP5.remove(); 
  }, []);

  return (
    <div className="face-container">
      <h2>Checking Face Visibility</h2>
      <div className="videoDiv"></div>
      <button className="homeButton">Visit Homepae</button>
    </div>
  );
}

function sketch(p) {
    let capture;
    let faceVisible=false;
     
    let detectionOptions = {
        withLandmarks: true,
        withDescriptors: false,
      };
    let  faceapi;
    let modelLoad = false;
    
    p.setup = function() {
      p.createCanvas(0, 0).hide();
      capture = p.createCapture(p.VIDEO).parent(p.select(".videoDiv"));
      p.select(".homeButton").style("background","grey");
      p.select(".homeButton").mouseClicked(()=>{
        if(faceVisible) navigate("/home");
      });
      faceapi = ml5.faceApi(detectionOptions, modelLoaded);
    };
    p.draw=()=>{
      if(capture.loadedmetadata && modelLoaded){
        faceapi.detect(capture,gotResults);
        p.noLoop();
      }
    }
    function modelLoaded(){
        modelLoad=true;
    }
    function gotResults(err, results){
        // console.log(results.length);
        if(results.length>0){
            p.select(".homeButton").style("background","green");
            faceapi.detect(capture,gotResults);
            faceVisible=true;
  
        }else{
            p.select(".homeButton").style("background","grey");
            faceapi.detect(capture,gotResults);
            faceVisible=false;
        }
    }
}
export {faceIsVisibleAndGoHome}

export default FaceDetect;
