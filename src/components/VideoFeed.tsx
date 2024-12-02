import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera } from '../types';
import { AlertTriangle } from 'lucide-react';

interface VideoFeedProps {
  camera: Camera;
  onFrame: (imageSrc: string) => void;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ camera, onFrame }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onFrame(imageSrc);
    }
  }, [onFrame]);

  // Capture frames at 1fps for analysis
  React.useEffect(() => {
    const interval = setInterval(capture, 1000);
    return () => clearInterval(interval);
  }, [capture]);

  if (camera.status === 'inactive') {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
          <p>Camera Offline</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {camera.name}
      </div>
    </div>
  );
};