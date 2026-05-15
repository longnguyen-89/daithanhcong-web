-- Multiple images for product and news editing.

alter table public.products
  add column if not exists gallery_images text[] default '{}';

alter table public.news
  add column if not exists gallery_images text[] default '{}';

update public.products
set gallery_images = array_remove(array[image_url], null)
where image_url is not null
  and coalesce(array_length(gallery_images, 1), 0) = 0;

update public.news
set gallery_images = array_remove(array[cover_url], null)
where cover_url is not null
  and coalesce(array_length(gallery_images, 1), 0) = 0;
