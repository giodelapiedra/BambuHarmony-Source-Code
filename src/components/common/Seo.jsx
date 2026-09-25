import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSeo, buildJsonLd, SITE_URL, SITE_NAME, OG_IMAGE, LOCALE } from '../../data/seo';

// Keeps <head> in sync on client-side route changes. The first paint of every
// route already ships correct static tags (see scripts/seo-postbuild.mjs);
// this only re-writes them as the user navigates within the SPA.

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data) {
  let el = document.getElementById('seo-jsonld');
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'seo-jsonld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { path, title, description, noindex } = getPageSeo(pathname);
    const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta(
      'name',
      'robots',
      noindex
        ? 'noindex,follow'
        : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    );
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', LOCALE);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', OG_IMAGE);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', OG_IMAGE);

    upsertJsonLd(buildJsonLd(pathname));
  }, [pathname]);

  return null;
}

export default Seo;
