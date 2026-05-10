import os
from dotenv import load_dotenv


load_dotenv()


class Settings:
    supabase_url = os.getenv("SUPABASE_URL", "")
    supabase_service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    supabase_storage_bucket = os.getenv("SUPABASE_STORAGE_BUCKET", "plant-images")
    model_labels = [label.strip() for label in os.getenv("MODEL_LABELS", "Healthy,Leaf Blight").split(",")]


settings = Settings()
