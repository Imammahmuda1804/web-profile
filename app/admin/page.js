"use client";

import { useState, useEffect } from "react";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolioStore";
import ProfileEditor from "@/components/admin/ProfileEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import ProjectEditor from "@/components/admin/ProjectEditor";
import TechStackEditor from "@/components/admin/TechStackEditor";
import SocialEditor from "@/components/admin/SocialEditor";

const TABS = [
  { key: "profile", label: "Profil" },
  { key: "experiences", label: "Pengalaman" },
  { key: "projects", label: "Proyek" },
  { key: "techStack", label: "Tech Stack" },
  { key: "socialLinks", label: "Sosial" },
];

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    getPortfolioData().then(setData);
  }, []);

  if (!data) return null;

  const update = (key, value) => {
    const next = { ...data, [key]: value };
    setData(next);
    savePortfolioData(next);
  };

  return (
    <div>
      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-cyan-400 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <ProfileEditor
          profile={data.profile}
          education={data.education}
          onChange={(profile) => update("profile", profile)}
          onEducationChange={(education) => update("education", education)}
        />
      )}
      {activeTab === "experiences" && (
        <ExperienceEditor
          experiences={data.experiences}
          onChange={(experiences) => update("experiences", experiences)}
        />
      )}
      {activeTab === "projects" && (
        <ProjectEditor
          projects={data.projects}
          onChange={(projects) => update("projects", projects)}
        />
      )}
      {activeTab === "techStack" && (
        <TechStackEditor
          techStack={data.techStack}
          onChange={(techStack) => update("techStack", techStack)}
        />
      )}
      {activeTab === "socialLinks" && (
        <SocialEditor
          socialLinks={data.socialLinks}
          onChange={(socialLinks) => update("socialLinks", socialLinks)}
        />
      )}
    </div>
  );
}
