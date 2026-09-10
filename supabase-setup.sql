-- Jalankan SQL ini di Supabase Dashboard → SQL Editor
-- Buat tabel portfolio_data untuk menyimpan semua data portfolio

create table if not exists public.portfolio_data (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Allow public read
alter table public.portfolio_data enable row level security;

create policy "Allow public read" on public.portfolio_data
  for select using (true);

create policy "Allow public insert" on public.portfolio_data
  for insert with check (true);

create policy "Allow public update" on public.portfolio_data
  for update using (true);

create policy "Allow public delete" on public.portfolio_data
  for delete using (true);

-- Buat storage bucket untuk images
insert into storage.buckets (id, name, public)
values ('Foto Porto', 'Foto Porto', true)
on conflict (id) do nothing;

-- Allow public upload/read/delete pada bucket Foto Porto
create policy "Allow public upload" on storage.objects
  for insert with check (bucket_id = 'Foto Porto');

create policy "Allow public read" on storage.objects
  for select using (bucket_id = 'Foto Porto');

create policy "Allow public delete" on storage.objects
  for delete using (bucket_id = 'Foto Porto');
