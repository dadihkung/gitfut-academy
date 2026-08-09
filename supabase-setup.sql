-- Run this in Supabase SQL Editor
create table tasks (
  id text primary key,
  week int,
  title text,
  desc text,
  category text,
  status text default 'Bench',
  demo_url text,
  guide jsonb
);

-- Allow anyone to read/write (since this is a private app)
alter table tasks enable row level security;
create policy "public access" on tasks for all using (true) with check (true);
