import cv2
import numpy as np
import tensorflow as tf
from .yolo_config import YOLO_CONFIG

class DetectionModel:
    def __init__(self):
        self.model = tf.keras.models.load_model(YOLO_CONFIG['model_path'])
        self.classes = YOLO_CONFIG['classes']
        self.confidence_threshold = YOLO_CONFIG['confidence_threshold']

    def preprocess_frame(self, frame):
        # Resize and normalize the frame
        frame = cv2.resize(frame, (416, 416))
        frame = frame.astype(np.float32) / 255.0
        return np.expand_dims(frame, axis=0)

    def detect_objects(self, frame):
        preprocessed = self.preprocess_frame(frame)
        predictions = self.model.predict(preprocessed)
        
        detections = []
        for pred in predictions[0]:
            confidence = pred[4]
            if confidence > self.confidence_threshold:
                class_id = np.argmax(pred[5:])
                if self.classes[class_id] in YOLO_CONFIG['classes']:
                    detections.append({
                        'class': self.classes[class_id],
                        'confidence': float(confidence),
                        'bbox': pred[:4].tolist()
                    })
        
        return detections