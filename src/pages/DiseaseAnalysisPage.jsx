import { AlertTriangle, Leaf, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DiseaseCard from "../components/cards/DiseaseCard";
import SectionHeader from "../components/common/SectionHeader";
import StatePanel from "../components/common/StatePanel";
import { useAgriData } from "../contexts/AgriDataContext";
import { formatNumber } from "../lib/utils";

function DiseaseAnalysisPage() {
  const { latestDisease, loading, error } = useAgriData();

  if (loading) {
    return (
      <StatePanel
        title="Loading disease analysis"
        description="Fetching the latest plant image and detection results."
      />
    );
  }

  if (error) {
    return <StatePanel title="Disease analysis unavailable" description={error} />;
  }

  if (!latestDisease) {
    return (
      <StatePanel
        title="No disease analysis records yet"
        description="Once Raspberry Pi uploads plant images and analysis results to Supabase, they will appear here."
      />
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Plant Vision"
        title="Latest plant disease analysis"
        description="Review the newest camera capture, health result, confidence score, and treatment recommendation."
        action={
          <Link
            to="/app/history"
            className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
          >
            View Full History
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Health status
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            {latestDisease.health_status || "Unknown"}
          </h3>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-red-50 p-3 text-danger">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Confidence
          </p>
          <h3 className="mt-2 text-2xl font-bold text-ink">
            {formatNumber(latestDisease.confidence, 1)}%
          </h3>
        </div>
        <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 shadow-soft">
          <div className="inline-flex rounded-2xl bg-primary-light p-3 text-primary-dark">
            <Leaf className="h-5 w-5" />
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            Suggested treatment
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {latestDisease.fertilizer_suggestion || "No treatment recommendation yet."}
          </p>
        </div>
      </div>
      <DiseaseCard record={latestDisease} />
    </div>
  );
}

export default DiseaseAnalysisPage;
