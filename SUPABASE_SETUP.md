# Supabase Setup For AgriVision AI

## 1. Create a Supabase project

- Create a new Supabase project.
- Copy the `Project URL`, `anon key`, and `service role key`.

## 2. Run the database schema

- Open the Supabase SQL editor.
- Run [supabase/schema.sql](/C:/Users/sarth/OneDrive/Documents/New%20project/agricorex-dashboard/supabase/schema.sql).

This creates the required tables:

- `users`
- `plant_analysis`
- `sensor_data`
- `robot_status`
- `notifications`

## 3. Create a storage bucket

- Open `Storage`.
- Create a public bucket called `plant-images`.

## 4. Configure the frontend

Create `.env` inside the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Configure the backend

Create `backend/.env`:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_STORAGE_BUCKET=plant-images
MODEL_LABELS=Healthy,Tomato Leaf Blight,Powdery Mildew,Bacterial Spot
```

## 6. Recommended data flow

1. Raspberry Pi captures a plant image.
2. DHT11 reads temperature and humidity.
3. GPS module reads latitude and longitude.
4. Raspberry Pi sends all values to `POST /api/v1/ingest`.
5. Backend predicts disease using the ML model service.
6. Backend stores `plant_analysis`, `sensor_data`, and `robot_status`.
7. Frontend reads the data from Supabase and displays the results.

## 7. Notes

- The frontend works in demo mode if `.env` is missing.
- Use the backend service role key only on the backend or Raspberry Pi, never in the frontend.
