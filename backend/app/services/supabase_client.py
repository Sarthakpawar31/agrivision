import mimetypes
import uuid

from supabase import create_client

from app.config import settings


def get_supabase():
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError("Supabase backend credentials are missing.")
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


def upload_image(image_bytes: bytes, filename: str) -> str:
    client = get_supabase()
    extension = filename.split(".")[-1] if "." in filename else "jpg"
    storage_path = f"plant-captures/{uuid.uuid4()}.{extension}"
    mime_type = mimetypes.guess_type(filename)[0] or "image/jpeg"

    client.storage.from_(settings.supabase_storage_bucket).upload(
        storage_path,
        image_bytes,
        file_options={"content-type": mime_type, "upsert": "false"},
    )
    return client.storage.from_(settings.supabase_storage_bucket).get_public_url(storage_path)
