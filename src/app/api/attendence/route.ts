import { createCanvas, loadImage } from 'canvas'; // Make sure to import loadImage from canvas
import * as faceapi from 'face-api.js';
import { NextApiRequest, NextApiResponse } from 'next';

const MODEL_URL = '/models'; // Adjust this to where your models are located

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image } = req.body;

  // Load models if they are not already loaded
  if (!faceapi.nets.ssdMobilenetv1.isLoaded) {
    await loadModels();
  }

  // Create a canvas from the image
  const img = await loadImage(image); // Ensure image is a valid data URL or buffer
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const detections = await faceapi.detectAllFaces(canvas)
    .withFaceLandmarks()
    .withFaceDescriptors();

  if (detections.length > 0) {
    const faceDescriptor = detections[0].descriptor; // Get the first detected face

    // Implement attendance marking logic based on faceDescriptor
    res.status(200).json({ success: true, message: 'Attendance marked' });
  } else {
    res.status(404).json({ success: false, message: 'No face detected' });
  }
}
