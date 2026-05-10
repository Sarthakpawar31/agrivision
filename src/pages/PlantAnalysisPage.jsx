import { ImagePlus, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import DiseaseResultCard from "../components/ui/DiseaseResultCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PlantImageCard from "../components/ui/PlantImageCard";
import { useAgriData } from "../contexts/AgriDataContext";

function PlantAnalysisPage() {
  const { latestAnalysis } = useAgriData();
  const [preview, setPreview] = useState("");
  const [predicting, setPredicting] = useState(false);

  const currentImage = useMemo(() => preview || latestAnalysis?.image_url, [preview, latestAnalysis]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPredicting(true);
    const nextUrl = URL.createObjectURL(file);
    setPreview(nextUrl);
    window.setTimeout(() => setPredicting(false), 1600);
  };

  const record = {
    ...latestAnalysis,
    image_url: currentImage,
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[34px] border border-white/70 bg-white/88 p-6 shadow-soft">
        <p className="text-xs uppercase tracking-[0.28em] text-primary">Plant Disease Analysis</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Latest captured plant image and AI prediction</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
          Use this page for Raspberry Pi predictions or manual image upload testing. The UI shows the
          latest image, health status, prediction confidence, and prevention guidance.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PlantImageCard
          imageUrl={currentImage}
          title="Latest Plant Image"
          description="The newest plant capture from the robot camera appears here. You can also upload an image manually to test the interface."
        />
        <div className="space-y-6">
          <div className="rounded-[30px] border border-dashed border-primary/20 bg-white/88 p-6 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-primary-light p-3 text-primary-dark">
                <ImagePlus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Manual Testing Upload</h3>
                <p className="text-sm text-slate-500">Upload an image and simulate disease prediction.</p>
              </div>
            </div>
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-[26px] border border-primary/15 bg-primary-light/40 px-6 py-12 text-center">
              <UploadCloud className="h-9 w-9 text-primary-dark" />
              <span className="mt-4 text-sm font-semibold text-slate-900">Choose a plant image</span>
              <span className="mt-2 text-xs text-slate-500">PNG, JPG, or JPEG for manual testing</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
          {predicting ? (
            <LoadingSpinner
              title="Running prediction"
              message="Uploading plant image and simulating ML disease detection..."
            />
          ) : (
            <DiseaseResultCard record={record} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlantAnalysisPage;
