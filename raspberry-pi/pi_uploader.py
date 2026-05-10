import os
from datetime import datetime
from pathlib import Path

import requests


BACKEND_API_URL = os.getenv("BACKEND_API_URL", "http://127.0.0.1:8000/api/v1")
IMAGE_PATH = os.getenv("PLANT_IMAGE_PATH", "sample-plant.jpg")


def collect_sensor_payload():
    """
    Replace the sample values below with real DHT11, soil moisture,
    and GPS module readings from your Raspberry Pi.
    """
    return {
        "temperature": 29.1,
        "humidity": 78.4,
        "soil_moisture": 56.8,
        "latitude": 23.2599,
        "longitude": 77.4126,
        "robot_name": "AgriBot-01",
        "battery_percentage": 82,
        "analysis_time": datetime.now().isoformat(),
    }


def send_capture_to_backend(image_path: str):
    payload = collect_sensor_payload()
    file_path = Path(image_path)
    if not file_path.exists():
      raise FileNotFoundError(f"Image file not found: {file_path}")

    with file_path.open("rb") as image_file:
        response = requests.post(
            f"{BACKEND_API_URL}/ingest",
            data=payload,
            files={"image": (file_path.name, image_file, "image/jpeg")},
            timeout=30,
        )

    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    result = send_capture_to_backend(IMAGE_PATH)
    print("Prediction response:")
    print(result)
