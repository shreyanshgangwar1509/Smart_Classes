// import * as faceapi from 'face-api.js';
// import { useEffect, useRef, useState } from 'react';

// function Attendance() {
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const loadModels = async () => {
//       await Promise.all([

//         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//       ]);
//       setIsLoading(false);
//     };

//     loadModels();

//     if (isCameraOpen) {
//       startVideo();
//     }
//   }, [isCameraOpen]);

//   const startVideo = () => {
//     navigator.mediaDevices.getUserMedia({ video: {} })
//       .then(stream => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch(err => console.error(err));
//   };

//   const handleVideoPlay = async () => {
//     if (videoRef.current) {
//       const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks()
//         .withFaceDescriptors();

//       console.log(detections); // Use this to compare with saved face descriptors
//     }
//   };

//   return (
//     <div>
//       {isLoading ? <p>Loading models...</p> : null}
//       {isCameraOpen ? (
//         <div>
//           <video
//             ref={videoRef}
//             autoPlay
//             onPlay={handleVideoPlay}
            
//             width="640"
//             height="480"
//           />
//           <button
//             onClick={() => setIsCameraOpen(false)}
//             className="bg-red-500 text-black p-2 rounded-lg mt-4"
//           >
//             Close Camera
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={() => setIsCameraOpen(true)}
//           className="bg-blue-500 text-black p-2 rounded-lg"
//         >
//           Open Camera
//         </button>
//       )}
//     </div>
//   );
// }

// export default Attendance;

import * as faceapi from 'face-api.js';
import { useEffect, useRef, useState } from 'react';

function Attendance() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      ]);
      setIsLoading(false);
    };

    loadModels();

    if (isCameraOpen) {
      startVideo();
    }
  }, [isCameraOpen]);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error(err));
  };

  const handleVideoPlay = async () => {
    if (videoRef.current) {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      console.log(detections); // Use this to compare with saved face descriptors
    }
  };

 const handleCapture = async () => {
  if (videoRef.current) {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    document.body.append(canvas);

    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // Clear previous drawings
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the face detections and landmarks
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

    if (resizedDetections.length > 0) {
      const faceMatcher = new faceapi.FaceMatcher(resizedDetections[0].descriptor);
      
      // Assuming you have a method to get profile descriptors
      const profileDescriptor = await getProfileDescriptor(); // Implement this method
      const match = faceMatcher.findBestMatch(profileDescriptor);

      if (match.distance < 0.6) { // Adjust the threshold as needed
        console.log('User is present');
      } else {
        console.log('User is absent');
      }
    }

    // Convert the canvas to an image
    const dataUrl = canvas.toDataURL();
    setCapturedImage(dataUrl);
  }
};


  const getProfileDescriptor = async () => {
    // Implement the method to get the stored profile face descriptor
    // This might involve fetching it from your backend or local storage
    return new Float32Array(); // Replace with actual profile descriptor
  };

  return (
    <div>
      {isLoading ? <p>Loading models...</p> : null}
      {isCameraOpen ? (
        <div>
          <video
            ref={videoRef}
            autoPlay
            onPlay={handleVideoPlay}
            width="640"
            height="480"
          />
          <button
            onClick={() => setIsCameraOpen(false)}
            className="bg-red-500 text-black p-2 rounded-lg mt-4"
          >
            Close Camera
          </button>
          <button
            onClick={handleCapture}
            className="bg-green-500 text-black p-2 rounded-lg mt-4"
          >
            Capture Picture
          </button>
          {capturedImage && (
            <div>
              <img src={capturedImage} alt="Captured" />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsCameraOpen(true)}
          className="bg-blue-500 text-black p-2 rounded-lg"
        >
          Open Camera
        </button>
      )}
    </div>
  );
}

export default Attendance;
