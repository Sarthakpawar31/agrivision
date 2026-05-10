export function formatDateTime(value, options = {}) {
  if (!value) return "No data";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: options.dateStyle || "medium",
    timeStyle: options.timeStyle || "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }
  return Number(value).toFixed(digits);
}

export function formatPercentage(value) {
  return `${formatNumber(value, 1)}%`;
}

export function cn(...values) {
  return values.filter(Boolean).join(" ");
}

export function latestRecord(records) {
  return Array.isArray(records) && records.length ? records[0] : null;
}

export function sensorStatus(type, value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return { label: "Unknown", tone: "neutral" };
  if (type === "temperature") {
    if (numeric < 20) return { label: "Low", tone: "warning" };
    if (numeric > 35) return { label: "High", tone: "danger" };
    return { label: "Normal", tone: "success" };
  }
  if (type === "humidity") {
    if (numeric < 35) return { label: "Dry", tone: "warning" };
    if (numeric > 80) return { label: "High", tone: "danger" };
    return { label: "Balanced", tone: "success" };
  }
  if (type === "soil_moisture") {
    if (numeric < 30) return { label: "Dry", tone: "warning" };
    if (numeric > 85) return { label: "Wet", tone: "danger" };
    return { label: "Optimal", tone: "success" };
  }
  return { label: "Stable", tone: "neutral" };
}

export function enrichAnalysisRows(rows) {
  return rows.map((row) => ({
    ...row,
    confidence: Number(row.confidence).toFixed(1),
    created_at_label: formatDateTime(row.created_at),
  }));
}

export function buildChartSeries(sensorRows) {
  return [...sensorRows]
    .reverse()
    .map((item) => ({
      time: new Date(item.created_at).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }),
      temperature: Number(item.temperature),
      humidity: Number(item.humidity),
      soilMoisture: Number(item.soil_moisture),
    }));
}
