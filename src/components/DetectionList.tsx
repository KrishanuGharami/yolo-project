import React from 'react';
import { Detection } from '../types';
import { format } from 'date-fns';
import { Bird, Cat, Clock } from 'lucide-react';

interface DetectionListProps {
  detections: Detection[];
}

export const DetectionList: React.FC<DetectionListProps> = ({ detections }) => {
  return (
    <div className="space-y-4">
      {detections.map((detection) => (
        <div
          key={detection.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {detection.subject.type === 'bird' ? (
                <Bird className="w-6 h-6 text-blue-500" />
              ) : (
                <Cat className="w-6 h-6 text-orange-500" />
              )}
              <div>
                <h3 className="font-semibold">{detection.subject.species}</h3>
                <p className="text-sm text-gray-500">
                  Confidence: {(detection.subject.confidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{detection.duration.toFixed(1)}s</span>
            </div>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Start Time</p>
              <p>{format(detection.timestamp.start, 'PPpp')}</p>
            </div>
            <div>
              <p className="text-gray-500">End Time</p>
              <p>{format(detection.timestamp.end, 'PPpp')}</p>
            </div>
          </div>

          <div className="mt-3 text-sm">
            <p className="text-gray-500">Location</p>
            <p>Facility {detection.facilityId} - Camera {detection.cameraId}</p>
          </div>
        </div>
      ))}
    </div>
  );
};