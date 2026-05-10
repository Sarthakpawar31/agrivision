from datetime import datetime
from typing import Optional

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.services.predictor import predict_disease
from app.services.supabase_client import get_supabase, upload_image


app = FastAPI(title="AgriVision AI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "AgriVision AI backend"}


@app.post("/api/v1/ingest")
async def ingest_capture(
    image: UploadFile = File(...),
    temperature: float = Form(...),
    humidity: float = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    soil_moisture: Optional[float] = Form(None),
    robot_name: str = Form("AgriBot-01"),
    battery_percentage: int = Form(80),
    analysis_time: Optional[str] = Form(None),
):
    image_bytes = await image.read()
    prediction = predict_disease(image_bytes)
    image_url = upload_image(image_bytes, image.filename or "plant.jpg")
    created_at = analysis_time or datetime.utcnow().isoformat()

    client = get_supabase()

    client.table("sensor_data").insert(
        {
            "temperature": temperature,
            "humidity": humidity,
            "soil_moisture": soil_moisture,
            "latitude": latitude,
            "longitude": longitude,
            "created_at": created_at,
        }
    ).execute()

    client.table("plant_analysis").insert(
        {
            "image_url": image_url,
            "disease_name": prediction["disease_name"],
            "confidence": prediction["confidence"],
            "health_status": prediction["health_status"],
            "suggestion": prediction["suggestion"],
            "prevention_tips": prediction["prevention_tips"],
            "temperature": temperature,
            "humidity": humidity,
            "soil_moisture": soil_moisture,
            "latitude": latitude,
            "longitude": longitude,
            "created_at": created_at,
        }
    ).execute()

    client.table("robot_status").insert(
        {
            "robot_name": robot_name,
            "battery_percentage": battery_percentage,
            "connection_status": "online",
            "camera_status": "active",
            "dht11_status": "active",
            "gps_status": "active",
            "raspberry_pi_status": "connected",
            "soil_sensor_status": "active",
            "last_seen": created_at,
        }
    ).execute()

    return {
      "message": "Data received successfully",
      "image_url": image_url,
      **prediction,
      "created_at": created_at,
    }


@app.get("/api/v1/latest-analysis")
def latest_analysis():
    client = get_supabase()
    response = client.table("plant_analysis").select("*").order("created_at", desc=True).limit(1).execute()
    return response.data


@app.get("/api/v1/history")
def history():
    client = get_supabase()
    response = client.table("plant_analysis").select("*").order("created_at", desc=True).limit(50).execute()
    return response.data


@app.get("/api/v1/live-sensor-data")
def live_sensor_data():
    client = get_supabase()
    response = client.table("sensor_data").select("*").order("created_at", desc=True).limit(30).execute()
    return response.data


@app.get("/api/v1/robot-status")
def robot_status():
    client = get_supabase()
    response = client.table("robot_status").select("*").order("created_at", desc=True).limit(1).execute()
    return response.data
