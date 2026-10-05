import { useEffect } from 'react';
import { SITE } from '../../utils/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_TITLE = `${SITE.name} - ${SITE.tagline}`;

const absolute = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`);

const SEO = ({ title, description = SITE.description, image = '/favicon.svg', url }: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE.name}` : DEFAULT_TITLE;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', absolute(image), true); // social crawlers need an absolute URL
    setMeta('og:type', 'website', true);
    setMeta('og:url', url ? absolute(url) : window.location.href, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
  }, [fullTitle, description, image, url]);

  return null;
};

export default SEO;
