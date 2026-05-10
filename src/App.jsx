import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppShell from "./components/layout/AppShell";
import LoadingSpinner from "./components/ui/LoadingSpinner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PlantAnalysisPage = lazy(() => import("./pages/PlantAnalysisPage"));
const SensorDataPage = lazy(() => import("./pages/SensorDataPage"));
const GpsLocationPage = lazy(() => import("./pages/GpsLocationPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const RobotControlPage = lazy(() => import("./pages/RobotControlPage"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <LoadingSpinner
        title="AgriVision AI"
        message="Loading your smart agriculture workspace..."
      />
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="analysis" element={<PlantAnalysisPage />} />
          <Route path="sensors" element={<SensorDataPage />} />
          <Route path="location" element={<GpsLocationPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="control" element={<RobotControlPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
