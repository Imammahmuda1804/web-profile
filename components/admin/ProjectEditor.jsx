"use client";

import ImageUpload from "./ImageUpload";
import { deleteImage } from "@/lib/portfolioStore";

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none";
const labelClass = "block text-sm text-gray-400 mb-1";

export default function ProjectEditor({ projects, onChange }) {
  const set = (index, key, value) => {
    const next = [...projects];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const add = () => {
    onChange([...projects, {
      id: Date.now(),
      title: "",
      description: "",
      images: [""],
      websiteUrl: "",
      githubUrl: "",
      techIcons: [],
    }]);
  };

  const remove = async (index) => {
    if (confirm("Hapus proyek ini?")) {
      // hapus semua foto proyek dari Supabase Storage
      const imgs = projects[index].images || [];
      await Promise.all(imgs.map((url) => deleteImage(url)));
      onChange(projects.filter((_, i) => i !== index));
    }
  };

  const setImage = (projIndex, imgIndex, value) => {
    const next = [...projects];
    const images = [...next[projIndex].images];
    images[imgIndex] = value;
    next[projIndex] = { ...next[projIndex], images };
    onChange(next);
  };

  const addImage = (projIndex) => {
    const next = [...projects];
    next[projIndex] = { ...next[projIndex], images: [...next[projIndex].images, ""] };
    onChange(next);
  };

  const removeImage = (projIndex, imgIndex) => {
    const next = [...projects];
    next[projIndex] = { ...next[projIndex], images: next[projIndex].images.filter((_, i) => i !== imgIndex) };
    onChange(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-cyan-400">Proyek</h2>
        <button onClick={add} className="text-sm bg-cyan-400 text-black px-3 py-1.5 rounded-lg font-medium hover:bg-cyan-300 transition-colors">
          + Tambah
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id || index} className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">#{index + 1}</span>
            <button onClick={() => remove(index)} className="text-red-400 hover:text-red-300 text-sm">Hapus</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Judul (Indonesia)</label>
              <input className={inputClass} value={project.title || ""} onChange={(e) => set(index, "title", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Judul (English)</label>
              <input
                className={inputClass}
                value={project.title_en || ""}
                onChange={(e) => set(index, "title_en", e.target.value)}
                placeholder="Leave blank to use default English translation"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Deskripsi (Indonesia)</label>
              <textarea className={inputClass + " h-24"} value={project.description || ""} onChange={(e) => set(index, "description", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Deskripsi (English)</label>
              <textarea
                className={inputClass + " h-24"}
                value={project.description_en || ""}
                onChange={(e) => set(index, "description_en", e.target.value)}
                placeholder="Leave blank to use default English translation"
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Foto (upload atau masukkan URL)</label>
            {(project.images || []).map((img, imgIndex) => (
              <ImageUpload
                key={imgIndex}
                value={img}
                onChangeValue={(val) => setImage(index, imgIndex, val)}
                onRemove={() => removeImage(index, imgIndex)}
                placeholder="/proyek-X.png"
              />
            ))}
            <button onClick={() => addImage(index)} className="text-sm text-cyan-400 hover:text-cyan-300">+ Tambah Foto</button>
          </div>
          <div>
            <label className={labelClass}>Website URL</label>
            <input className={inputClass} value={project.websiteUrl} onChange={(e) => set(index, "websiteUrl", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input className={inputClass} value={project.githubUrl} onChange={(e) => set(index, "githubUrl", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Tech Icons (comma-separated: react,nextjs,tailwind,laravel,figma,filament)</label>
            <input
              className={inputClass}
              value={(project.techIcons || []).join(",")}
              onChange={(e) => set(index, "techIcons", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
