import { Helmet } from "react-helmet-async";

export type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

export const SITE_NAME = "BSH Taxi Services";
export const SITE_URL = "https://www.bshtaxiservices.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/bshtaxiservice-homepage-banner_3.webp`;

function normalizeCanonicalPath(path = "/") {
  const withoutHash = path.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0] || "/";
  if (withoutQuery === "/") return "/";
  return `/${withoutQuery.replace(/^\/+|\/+$/g, "")}`;
}

export default function SEO({
  title,
  description,
  keywords = [],
  canonicalPath = "/",
  image,
  noIndex = false,
  schema,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${normalizeCanonicalPath(canonicalPath)}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
