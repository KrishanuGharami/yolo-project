from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import asyncio
import uvicorn
from services.video_processor import VideoProcessor
from services.alert_manager import AlertManager

app = FastAPI(title="Substation Monitoring System")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
video_processor = VideoProcessor()
alert_manager = AlertManager()

@app.post("/api/process-frame")
async def process_frame(
    facility_id: str,
    camera_id: str,
    frame: UploadFile = File(...)
):
    try:
        frame_data = await frame.read()
        detection_result = await video_processor.process_frame(
            frame_data,
            facility_id,
            camera_id
        )
        
        if detection_result:
            # Create alert for detected objects
            alert = await alert_manager.create_alert(detection_result)
            return alert
        
        return {"message": "No detections in frame"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/alerts")
async def get_alerts(
    facility_id: str = None,
    hours: int = 24
):
    try:
        end_time = datetime.now()
        start_time = end_time - timedelta(hours=hours)
        
        alerts = await alert_manager.get_alerts(
            facility_id=facility_id,
            start_time=start_time,
            end_time=end_time
        )
        
        return alerts
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)