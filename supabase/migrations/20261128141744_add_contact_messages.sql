begin;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null
    check (char_length(full_name) between 1 and 120 and full_name ~ '[^[:space:]]'),
  email text not null
    check (char_length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+$'),
  order_reference text
    check (char_length(order_reference) <= 100),
  topic text not null
    check (topic in ('order', 'sizing', 'shipping', 'product', 'other')),
  message text not null
    check (char_length(message) between 1 and 4000 and message ~ '[^[:space:]]')
);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from public, anon, authenticated;
grant insert (full_name, email, order_reference, topic, message)
  on table public.contact_messages to anon, authenticated;

create policy "Storefront can submit contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

commit;
