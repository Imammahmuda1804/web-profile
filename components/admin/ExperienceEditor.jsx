"use client";

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none";
const labelClass = "block text-sm text-gray-400 mb-1";

export default function ExperienceEditor({ experiences, onChange }) {
  const set = (index, key, value) => {
    const next = [...experiences];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const add = () => {
    onChange([...experiences, {
      id: Date.now(),
      date: "",
      title: "",
      subtitle: "",
      description: "",
      type: "work",
    }]);
  };

  const remove = (index) => {
    if (confirm("Hapus pengalaman ini?")) {
      onChange(experiences.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-cyan-400">Pengalaman</h2>
        <button onClick={add} className="text-sm bg-cyan-400 text-black px-3 py-1.5 rounded-lg font-medium hover:bg-cyan-300 transition-colors">
          + Tambah
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id || index} className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">#{index + 1}</span>
            <button onClick={() => remove(index)} className="text-red-400 hover:text-red-300 text-sm">Hapus</button>
          </div>
          <div>
            <label className={labelClass}>Tanggal</label>
            <input className={inputClass} value={exp.date} onChange={(e) => set(index, "date", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Judul</label>
            <input className={inputClass} value={exp.title} onChange={(e) => set(index, "title", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Subtitle</label>
            <input className={inputClass} value={exp.subtitle} onChange={(e) => set(index, "subtitle", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea className={inputClass + " h-20"} value={exp.description} onChange={(e) => set(index, "description", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Tipe</label>
            <select className={inputClass} value={exp.type} onChange={(e) => set(index, "type", e.target.value)}>
              <option value="work">Work</option>
              <option value="education">Education</option>
              <option value="achievement">Achievement</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
