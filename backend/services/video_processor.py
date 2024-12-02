import cv2
import numpy as np
from datetime import datetime
from models.detection_model import DetectionModel

class VideoProcessor:
    def __init__(self):
        self.detection_model = DetectionModel()
        self.frame_buffer = []
        self.buffer_size = 300  # 5 minutes at 1 fps

    async def process_frame(self, frame_data, facility_id, camera_id):
        # Convert frame data to OpenCV format
        nparr = np.frombuffer(frame_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Store frame in buffer
        self.frame_buffer.append({
            'timestamp': datetime.now(),
            'frame': frame
        })
        
        # Maintain buffer size
        if len(self.frame_buffer) > self.buffer_size:
            self.frame_buffer.pop(0)
        
        # Detect objects in frame
        detections = self.detection_model.detect_objects(frame)
        
        if detections:
            return {
                'facility_id': facility_id,
                'camera_id': camera_id,
                'timestamp': datetime.now().isoformat(),
                'detections': detections
            }
        
        return None

    def save_event_video(self, start_time, end_time, output_path):
        relevant_frames = [
            f['frame'] for f in self.frame_buffer
            if start_time <= f['timestamp'] <= end_time
        ]
        
        if relevant_frames:
            height, width = relevant_frames[0].shape[:2]
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(output_path, fourcc, 1.0, (width, height))
            
            for frame in relevant_frames:
                out.write(frame)
            
            out.release()
            return True
        
        return False