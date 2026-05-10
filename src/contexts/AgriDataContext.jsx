import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  mockAnalysisHistory,
  mockLocationHistory,
  mockNotifications,
  mockRobotStatus,
  mockSensorData,
} from "../data/mockData";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { enrichAnalysisRows, latestRecord } from "../lib/utils";

const AgriDataContext = createContext(null);

export function AgriDataProvider({ children }) {
  const [plantAnalysis, setPlantAnalysis] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [locationHistory, setLocationHistory] = useState([]);
  const [robotStatus, setRobotStatus] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMockData = () => {
    setPlantAnalysis(enrichAnalysisRows(mockAnalysisHistory));
    setSensorData(mockSensorData);
    setLocationHistory(mockLocationHistory);
    setRobotStatus(mockRobotStatus);
    setNotifications(mockNotifications);
    setLoading(false);
  };

  const refreshData = async () => {
    if (!isSupabaseConfigured || !supabase) {
      loadMockData();
      return;
    }

    setLoading(true);
    setError("");

    const [analysisRes, sensorRes, locationRes, robotRes, notificationRes] = await Promise.all([
      supabase.from("plant_analysis").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("sensor_data").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("sensor_data").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("robot_status").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(10),
    ]);

    const firstError =
      analysisRes.error || sensorRes.error || locationRes.error || robotRes.error || notificationRes.error;

    if (firstError) {
      setError(firstError.message);
      loadMockData();
      return;
    }

    setPlantAnalysis(enrichAnalysisRows(analysisRes.data || []));
    setSensorData(sensorRes.data || []);
    setLocationHistory(locationRes.data || []);
    setRobotStatus(robotRes.data || []);
    setNotifications(notificationRes.data || []);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;
    const channel = supabase
      .channel("agrivision-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "plant_analysis" }, refreshData)
      .on("postgres_changes", { event: "*", schema: "public", table: "sensor_data" }, refreshData)
      .on("postgres_changes", { event: "*", schema: "public", table: "robot_status" }, refreshData)
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, refreshData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const value = useMemo(() => {
    const latestAnalysis = latestRecord(plantAnalysis);
    const latestSensor = latestRecord(sensorData);
    const latestRobotStatus = latestRecord(robotStatus);
    const latestLocation = latestRecord(locationHistory);

    return {
      plantAnalysis,
      sensorData,
      locationHistory,
      robotStatus,
      notifications,
      latestAnalysis,
      latestSensor,
      latestRobotStatus,
      latestLocation,
      loading,
      error,
      refreshData,
      meta: {
        mode: isSupabaseConfigured ? "live" : "demo",
      },
    };
  }, [plantAnalysis, sensorData, locationHistory, robotStatus, notifications, loading, error]);

  return <AgriDataContext.Provider value={value}>{children}</AgriDataContext.Provider>;
}

export function useAgriData() {
  const context = useContext(AgriDataContext);
  if (!context) throw new Error("useAgriData must be used inside AgriDataProvider");
  return context;
}
