/**
 * JSON-LD Structured Data Generator
 * Used for SEO and rich snippets
 */

export const generatePersonSchema = (baseUrl: string = 'https://dipeshkumar.com') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dipesh Kumar',
    url: baseUrl,
    image: `${baseUrl}/dipesh.jpg`,
    description: 'ML Engineer specializing in Machine Learning, Data Science, and Backend development',
    jobTitle: ['ML Engineer', 'Data Scientist', 'Backend Developer'],
    sameAs: [
      'https://github.com/dipesh4000',
      'https://linkedin.com/in/dipesh4000',
      'https://twitter.com/dipesh4000',
    ],
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Data Science',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'Computer Vision',
      'YOLOv8',
      'Data Engineering',
      'REST APIs',
      'Backend Development',
    ],
    email: 'dipeshkumar0853822@gmail.com',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance ML Engineer / Data Scientist',
    },
  };
};

export const generateWebsiteSchema = (baseUrl: string = 'https://dipeshkumar.com') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dipesh Kumar | Portfolio',
    url: baseUrl,
    description: 'Portfolio of Dipesh Kumar - ML Engineer specializing in Machine Learning, Data Science, and Backend development',
    creator: {
      '@type': 'Person',
      name: 'Dipesh Kumar',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>, baseUrl: string = 'https://dipeshkumar.com') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url || baseUrl,
    })),
  };
};

export const generateProjectSchema = (
  project: {
    name: string;
    description: string;
    url: string;
    image?: string;
    technologies?: string[];
    datePublished?: string;
  },
  baseUrl: string = 'https://dipeshkumar.com'
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    url: project.url,
    ...(project.image && { image: project.image }),
    creator: {
      '@type': 'Person',
      name: 'Dipesh Kumar',
    },
    datePublished: project.datePublished || new Date().toISOString().split('T')[0],
    ...(project.technologies && {
      about: project.technologies.map((tech) => ({
        '@type': 'Thing',
        name: tech,
      })),
    }),
  };
};

/**
 * Combines multiple JSON-LD schemas for a page
 * Returns a script tag-ready JSON string
 */
export const combineSchemas = (schemas: any[]) => {
  if (schemas.length === 1) {
    return JSON.stringify(schemas[0]);
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas,
  });
};

/**
 * Generates script tag HTML for JSON-LD
 * Use in Metadata or as a component
 */
export const generateJsonLdScript = (schema: any): string => {
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
};
