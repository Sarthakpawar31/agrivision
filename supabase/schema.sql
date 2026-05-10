create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.plant_analysis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  image_url text not null,
  disease_name text not null,
  confidence numeric(5,2) not null,
  health_status text not null check (health_status in ('Healthy', 'Diseased')),
  suggestion text,
  prevention_tips text,
  temperature numeric(5,2),
  humidity numeric(5,2),
  soil_moisture numeric(5,2),
  latitude numeric(10,6),
  longitude numeric(10,6),
  created_at timestamptz not null default now()
);

create table if not exists public.sensor_data (
  id uuid primary key default gen_random_uuid(),
  temperature numeric(5,2),
  humidity numeric(5,2),
  soil_moisture numeric(5,2),
  latitude numeric(10,6),
  longitude numeric(10,6),
  created_at timestamptz not null default now()
);

create table if not exists public.robot_status (
  id uuid primary key default gen_random_uuid(),
  robot_name text not null,
  battery_percentage integer check (battery_percentage between 0 and 100),
  connection_status text not null,
  camera_status text not null,
  dht11_status text not null,
  gps_status text not null,
  raspberry_pi_status text default 'connected',
  soil_sensor_status text default 'active',
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'info',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists plant_analysis_created_at_idx on public.plant_analysis (created_at desc);
create index if not exists sensor_data_created_at_idx on public.sensor_data (created_at desc);
create index if not exists robot_status_created_at_idx on public.robot_status (created_at desc);
create index if not exists notifications_created_at_idx on public.notifications (created_at desc);

insert into public.users (id, name, email, password_hash)
values (
  '11111111-1111-1111-1111-111111111111',
  'AgriVision Demo User',
  'demo@agrivision.ai',
  '$2b$12$demo.hash.for.sample.only'
)
on conflict (email) do nothing;

insert into public.robot_status (
  robot_name,
  battery_percentage,
  connection_status,
  camera_status,
  dht11_status,
  gps_status,
  raspberry_pi_status,
  soil_sensor_status
)
values (
  'AgriBot-01',
  82,
  'online',
  'active',
  'active',
  'active',
  'connected',
  'active'
)
on conflict do nothing;
