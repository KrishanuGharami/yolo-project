import json
from datetime import datetime
from pathlib import Path

class AlertManager:
    def __init__(self, alert_dir='alerts'):
        self.alert_dir = Path(alert_dir)
        self.alert_dir.mkdir(exist_ok=True)

    async def create_alert(self, detection_event, video_path=None):
        alert = {
            'id': f"alert-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
            'facility_id': detection_event['facility_id'],
            'camera_id': detection_event['camera_id'],
            'timestamp': detection_event['timestamp'],
            'detections': detection_event['detections'],
            'video_path': str(video_path) if video_path else None
        }
        
        # Save alert to file
        alert_path = self.alert_dir / f"{alert['id']}.json"
        with open(alert_path, 'w') as f:
            json.dump(alert, f, indent=2)
        
        return alert

    async def get_alerts(self, facility_id=None, start_time=None, end_time=None):
        alerts = []
        for alert_file in self.alert_dir.glob('*.json'):
            with open(alert_file) as f:
                alert = json.load(f)
                
            if facility_id and alert['facility_id'] != facility_id:
                continue
                
            alert_time = datetime.fromisoformat(alert['timestamp'])
            if start_time and alert_time < start_time:
                continue
            if end_time and alert_time > end_time:
                continue
                
            alerts.append(alert)
        
        return sorted(alerts, key=lambda x: x['timestamp'], reverse=True)