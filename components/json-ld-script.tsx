import { generatePersonSchema, generateWebsiteSchema } from '@/lib/json-ld'

export function JsonLdScript() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dipeshkumar.com'
  
  const schemas = [
    generatePersonSchema(baseUrl),
    generateWebsiteSchema(baseUrl),
  ]

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
      suppressHydrationWarning
    />
  )
}
