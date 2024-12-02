import React from 'react';
import { VideoFeed } from './VideoFeed';
import { DetectionList } from './DetectionList';
import { Detection, Facility } from '../types';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProps {
  facility: Facility;
  detections: Detection[];
}

export const Dashboard: React.FC<DashboardProps> = ({ facility, detections }) => {
  const handleFrame = (imageSrc: string) => {
    // In a real implementation, this would send the frame to your Python backend
    // for processing with OpenCV/YOLO/TensorFlow
    console.log('Processing frame...');
  };

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [{
      label: 'Detections',
      data: [4, 2, 6, 8, 12, 5],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Substation Monitoring System</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Live Feeds</h2>
            <div className="grid gap-4">
              {facility.cameras.map(camera => (
                <VideoFeed
                  key={camera.id}
                  camera={camera}
                  onFrame={handleFrame}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Detection Trends</h2>
            <Line data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Detections</h2>
          <DetectionList detections={detections} />
        </div>
      </div>
    </div>
  );
};