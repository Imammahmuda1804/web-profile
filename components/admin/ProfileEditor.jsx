"use client";

import ImageUpload from "./ImageUpload";

const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:border-cyan-400 focus:outline-none";
const labelClass = "block text-sm text-gray-400 mb-1";

export default function ProfileEditor({ profile, education, onChange, onEducationChange }) {
  const set = (key, value) => onChange({ ...profile, [key]: value });

  const setRole = (index, value) => {
    const roles = [...profile.roles];
    roles[index] = value;
    onChange({ ...profile, roles });
  };

  const addRole = () => onChange({ ...profile, roles: [...profile.roles, ""] });
  const removeRole = (index) => onChange({ ...profile, roles: profile.roles.filter((_, i) => i !== index) });

  const setEdu = (index, key, value) => {
    const next = [...education];
    next[index] = { ...next[index], [key]: value };
    onEducationChange(next);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-cyan-400">Profil</h2>

      <div>
        <label className={labelClass}>Nama</label>
        <input className={inputClass} value={profile.name} onChange={(e) => set("name", e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Email</label>
        <input className={inputClass} value={profile.email} onChange={(e) => set("email", e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Headline</label>
        <input className={inputClass} value={profile.headline} onChange={(e) => set("headline", e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Tentang (Indonesia)</label>
        <textarea className={inputClass + " h-32"} value={profile.about || ""} onChange={(e) => set("about", e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Tentang (English)</label>
        <textarea
          className={inputClass + " h-32"}
          value={profile.about_en || ""}
          onChange={(e) => set("about_en", e.target.value)}
          placeholder="Leave blank to use default English translation"
        />
      </div>
      <div>
        <label className={labelClass}>Foto Profil (upload atau masukkan URL)</label>
        <ImageUpload
          value={profile.photo}
          onChangeValue={(val) => set("photo", val)}
          onRemove={() => set("photo", "")}
          placeholder="/foto-profil.png"
        />
      </div>
      <div>
        <label className={labelClass}>Path CV</label>
        <input className={inputClass} value={profile.cvPath} onChange={(e) => set("cvPath", e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Roles</label>
        {profile.roles.map((role, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className={inputClass} value={role} onChange={(e) => setRole(i, e.target.value)} />
            <button onClick={() => removeRole(i)} className="text-red-400 hover:text-red-300 text-sm px-2">×</button>
          </div>
        ))}
        <button onClick={addRole} className="text-sm text-cyan-400 hover:text-cyan-300">+ Tambah Role</button>
      </div>

      <h2 className="text-lg font-bold text-cyan-400 pt-4">Pendidikan</h2>
      {education.map((edu, index) => (
        <div key={edu.id} className="bg-gray-900 rounded-lg p-4 space-y-3">
          <div>
            <label className={labelClass}>Institusi</label>
            <input className={inputClass} value={edu.institution} onChange={(e) => setEdu(index, "institution", e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Periode (Indonesia)</label>
              <input className={inputClass} value={edu.period || ""} onChange={(e) => setEdu(index, "period", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Periode (English)</label>
              <input className={inputClass} value={edu.period_en || ""} onChange={(e) => setEdu(index, "period_en", e.target.value)} placeholder="e.g. 2022 - Present" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Jurusan (Indonesia)</label>
              <input className={inputClass} value={edu.major || ""} onChange={(e) => setEdu(index, "major", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Jurusan (English)</label>
              <input className={inputClass} value={edu.major_en || ""} onChange={(e) => setEdu(index, "major_en", e.target.value)} placeholder="e.g. Software Engineering Technology" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Fakultas (Indonesia)</label>
              <input className={inputClass} value={edu.faculty || ""} onChange={(e) => setEdu(index, "faculty", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Fakultas (English)</label>
              <input className={inputClass} value={edu.faculty_en || ""} onChange={(e) => setEdu(index, "faculty_en", e.target.value)} placeholder="e.g. Information Technology Department" />
            </div>
          </div>
          <div>
            <label className={labelClass}>IPK</label>
            <input className={inputClass} value={edu.gpa} onChange={(e) => setEdu(index, "gpa", e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}
