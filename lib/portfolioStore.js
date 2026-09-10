// lib/portfolioStore.js
// ponytail: Supabase-backed store — data di PostgreSQL, foto di Supabase Storage
import { supabase } from "./supabase";
import { defaultPortfolioData } from "@/data/portfolio";

const ROW_ID = "main";

export async function getPortfolioData() {
  try {
    const { data, error } = await supabase
      .from("portfolio_data")
      .select("data")
      .eq("id", ROW_ID)
      .single();

    if (error || !data) return defaultPortfolioData;
    return data.data;
  } catch {
    return defaultPortfolioData;
  }
}

export async function savePortfolioData(portfolioData) {
  const { error } = await supabase
    .from("portfolio_data")
    .upsert({ id: ROW_ID, data: portfolioData, updated_at: new Date().toISOString() });

  if (error) console.error("Save error:", error);
}

export async function resetToDefault() {
  await supabase.from("portfolio_data").delete().eq("id", ROW_ID);
}

// Image upload to Supabase Storage
export async function uploadImage(file) {
  const ext = file.name.split(".").pop();
  const name = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `uploads/${name}`;

  const { error } = await supabase.storage.from("Foto Porto").upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from("Foto Porto").getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteImage(url) {
  if (!url) return;
  // Extract path from public URL — bucket name may be encoded as "Foto%20Porto"
  const match = url.match(/\/Foto(?:%20| )Porto\/(.+)$/);
  if (!match) return;
  const path = decodeURIComponent(match[1]);
  const { error } = await supabase.storage.from("Foto Porto").remove([path]);
  if (error) console.error("Delete image error:", error);
}
