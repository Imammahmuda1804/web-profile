"use client";

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none";
const labelClass = "block text-sm text-gray-400 mb-1";

export default function SocialEditor({ socialLinks, onChange }) {
  const set = (index, key, value) => {
    const next = [...socialLinks];
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const add = () => {
    onChange([...socialLinks, { id: Date.now(), name: "", href: "", image: "" }]);
  };

  const remove = (index) => {
    if (confirm("Hapus link ini?")) {
      onChange(socialLinks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-cyan-400">Link Sosial</h2>
        <button onClick={add} className="text-sm bg-cyan-400 text-black px-3 py-1.5 rounded-lg font-medium hover:bg-cyan-300 transition-colors">
          + Tambah
        </button>
      </div>

      {socialLinks.map((social, index) => (
        <div key={social.id || index} className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm text-gray-500">#{index + 1}</span>
            <button onClick={() => remove(index)} className="text-red-400 hover:text-red-300 text-sm">Hapus</button>
          </div>
          <div>
            <label className={labelClass}>Nama</label>
            <input className={inputClass} value={social.name} onChange={(e) => set(index, "name", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>URL</label>
            <input className={inputClass} value={social.href} onChange={(e) => set(index, "href", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Image URL</label>
            <input className={inputClass} value={social.image} onChange={(e) => set(index, "image", e.target.value)} />
            {social.image && <img src={social.image} alt="" className="mt-2 w-10 h-10 object-contain" />}
          </div>
        </div>
      ))}
    </div>
  );
}
