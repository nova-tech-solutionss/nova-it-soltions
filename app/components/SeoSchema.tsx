export default function SeoSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nova IT Solutions",
    url: "https://novadev.solutions",
    logo: "https://novadev.solutions/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/nova-it-solutions/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
