from pathlib import Path

YOLO_CONFIG = {
    'model_path': Path('models/weights/yolov11.pt'),
    'confidence_threshold': 0.5,
    'classes': [
        'bird',
        'cat',
        'dog',
        'raccoon',
        'squirrel'
    ]
}