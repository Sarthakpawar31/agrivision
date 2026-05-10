const now = new Date();

export const mockUser = {
  id: "demo-user",
  name: "AgriVision Demo User",
  email: "demo@agrivision.ai",
};

export const mockAnalysisHistory = [
  {
    id: "ana-001",
    user_id: "demo-user",
    image_url:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80",
    disease_name: "Tomato Leaf Blight",
    confidence: 94.2,
    health_status: "Diseased",
    suggestion: "Apply copper-based fungicide and remove infected leaves.",
    prevention_tips: "Avoid leaf wetness, improve field airflow, and rotate crops.",
    summary: "Dark lesions were detected on the leaf surface, matching late blight patterns.",
    temperature: 29.1,
    humidity: 78.4,
    soil_moisture: 56.8,
    latitude: 23.2599,
    longitude: 77.4126,
    created_at: now.toISOString(),
  },
  {
    id: "ana-002",
    user_id: "demo-user",
    image_url:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    disease_name: "Healthy Cotton Leaf",
    confidence: 97.5,
    health_status: "Healthy",
    suggestion: "Continue balanced fertilization and regular moisture checks.",
    prevention_tips: "Maintain proper field hygiene and weekly scouting.",
    summary: "No visible fungal spotting or chlorosis was detected in this sample.",
    temperature: 27.2,
    humidity: 65.8,
    soil_moisture: 61.4,
    latitude: 23.2608,
    longitude: 77.4132,
    created_at: new Date(now.getTime() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "ana-003",
    user_id: "demo-user",
    image_url:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    disease_name: "Powdery Mildew",
    confidence: 88.1,
    health_status: "Diseased",
    suggestion: "Use sulfur spray during low-heat periods and isolate affected area.",
    prevention_tips: "Reduce overcrowding and monitor leaf undersides daily.",
    summary: "White powder-like patches suggest powdery mildew progression.",
    temperature: 30.6,
    humidity: 72.9,
    soil_moisture: 52.3,
    latitude: 23.2617,
    longitude: 77.4144,
    created_at: new Date(now.getTime() - 1000 * 60 * 110).toISOString(),
  },
];

export const mockSensorData = Array.from({ length: 8 }, (_, index) => ({
  id: `sensor-${index + 1}`,
  temperature: 25.5 + index * 0.8,
  humidity: 60 + index * 2.2,
  soil_moisture: 54 + index * 1.1,
  latitude: 23.259 + index * 0.0007,
  longitude: 77.412 + index * 0.0008,
  created_at: new Date(now.getTime() - (7 - index) * 1000 * 60 * 20).toISOString(),
}));

export const mockLocationHistory = mockSensorData.map((sensor, index) => ({
  id: `gps-${index + 1}`,
  robot_name: "AgriBot-01",
  latitude: sensor.latitude,
  longitude: sensor.longitude,
  status: index === mockSensorData.length - 1 ? "Active in field" : "Traversed",
  created_at: sensor.created_at,
}));

export const mockRobotStatus = [
  {
    id: "robot-1",
    robot_name: "AgriBot-01",
    battery_percentage: 82,
    connection_status: "online",
    camera_status: "active",
    dht11_status: "active",
    gps_status: "active",
    raspberry_pi_status: "connected",
    soil_sensor_status: "active",
    last_seen: now.toISOString(),
    created_at: now.toISOString(),
  },
];

export const mockNotifications = [
  {
    id: "not-1",
    title: "High humidity trend",
    message: "Humidity crossed 78%. Monitor fungal disease risk in the eastern plot.",
    type: "warning",
    is_read: false,
    created_at: now.toISOString(),
  },
  {
    id: "not-2",
    title: "New disease prediction stored",
    message: "A new Tomato Leaf Blight result has been added to history.",
    type: "info",
    is_read: false,
    created_at: now.toISOString(),
  },
  {
    id: "not-3",
    title: "Battery healthy",
    message: "Robot battery remains above 80% during current field mission.",
    type: "success",
    is_read: true,
    created_at: now.toISOString(),
  },
];
