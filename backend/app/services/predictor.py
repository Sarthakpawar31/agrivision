from io import BytesIO
from random import choice, uniform

from PIL import Image


def predict_disease(image_bytes: bytes) -> dict:
    """
    Replace this demo predictor with your trained ML model.
    This version validates the image and returns a realistic sample prediction.
    """
    Image.open(BytesIO(image_bytes)).convert("RGB")

    disease_name = choice(
        [
            "Healthy",
            "Tomato Leaf Blight",
            "Powdery Mildew",
            "Bacterial Spot",
        ]
    )
    health_status = "Healthy" if disease_name == "Healthy" else "Diseased"
    suggestion = (
        "Maintain current irrigation and nutrient schedule."
        if health_status == "Healthy"
        else "Apply targeted fungicide, isolate infected plants, and inspect nearby leaves."
    )
    prevention_tips = (
        "Continue weekly scouting and balanced fertilization."
        if health_status == "Healthy"
        else "Reduce excess humidity, avoid overhead watering, and remove infected leaves early."
    )

    return {
        "disease_name": disease_name,
        "confidence": round(uniform(87.0, 98.5), 2),
        "health_status": health_status,
        "suggestion": suggestion,
        "prevention_tips": prevention_tips,
    }
