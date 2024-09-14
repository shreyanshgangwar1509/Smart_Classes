import * as faceapi from 'face-api.js';
import { useEffect, useRef, useState } from 'react';

function Attendance() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

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
