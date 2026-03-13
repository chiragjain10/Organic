import { useEffect } from "react";

function setMetaByName(name, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setLinkCanonical(href) {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setJsonLd(jsonLd) {
  const id = "app-json-ld";
  let script = document.head.querySelector(`#${id}`);
  if (!jsonLd) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd);
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  url,
  noindex = false,
  jsonLd,
  openGraph = {},
  twitter = {},
}) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMetaByName("description", description);
    setMetaByName("robots", noindex ? "noindex,nofollow" : "index,follow");
    if (canonical) setLinkCanonical(canonical);

    const siteName = "Leaf Burst";
    const og = {
      type: openGraph.type || "website",
      title: openGraph.title || title,
      description: openGraph.description || description,
      image: openGraph.image || image,
      url: openGraph.url || url || canonical,
      site_name: openGraph.site_name || siteName,
    };
    setMetaByProperty("og:type", og.type);
    if (og.title) setMetaByProperty("og:title", og.title);
    if (og.description) setMetaByProperty("og:description", og.description);
    if (og.image) setMetaByProperty("og:image", og.image);
    if (og.url) setMetaByProperty("og:url", og.url);
    if (og.site_name) setMetaByProperty("og:site_name", og.site_name);

    const tw = {
      card: twitter.card || "summary_large_image",
      title: twitter.title || title,
      description: twitter.description || description,
      image: twitter.image || image,
    };
    setMetaByName("twitter:card", tw.card);
    if (tw.title) setMetaByName("twitter:title", tw.title);
    if (tw.description) setMetaByName("twitter:description", tw.description);
    if (tw.image) setMetaByName("twitter:image", tw.image);

    setJsonLd(jsonLd);

    return () => {
      setJsonLd(null);
    };
  }, [title, description, canonical, image, url, noindex, jsonLd, openGraph, twitter]);

  return null;
}
