export interface Detection {
  id: string;
  facilityId: string;
  cameraId: string;
  subject: {
    type: 'animal' | 'bird';
    species: string;
    confidence: number;
    estimatedSize?: {
      width: number;
      height: number;
      unit: 'cm' | 'inches';
    };
  };
  timestamp: {
    start: Date;
    end: Date;
  };
  videoMarkers: {
    start: number;
    end: number;
  };
  duration: number;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  cameras: Camera[];
}

export interface Camera {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  streamUrl: string;
}