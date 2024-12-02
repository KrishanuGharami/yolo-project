import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Facility, Detection } from './types';

// Mock data for demonstration
const mockFacility: Facility = {
  id: "facility-1",
  name: "Main Substation",
  location: "Central District",
  cameras: [
    {
      id: "cam-1",
      name: "North Entrance",
      status: "active",
      streamUrl: "stream-1"
    },
    {
      id: "cam-2",
      name: "South Entrance",
      status: "active",
      streamUrl: "stream-2"
    }
  ]
};

const mockDetections: Detection[] = [
  {
    id: "det-1",
    facilityId: "facility-1",
    cameraId: "cam-1",
    subject: {
      type: "bird",
      species: "Eagle",
      confidence: 0.95,
      estimatedSize: {
        width: 60,
        height: 30,
        unit: "cm"
      }
    },
    timestamp: {
      start: new Date(Date.now() - 3600000),
      end: new Date(Date.now() - 3500000)
    },
    videoMarkers: {
      start: 3600,
      end: 3700
    },
    duration: 100
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard facility={mockFacility} detections={mockDetections} />
    </div>
  );
}

export default App;