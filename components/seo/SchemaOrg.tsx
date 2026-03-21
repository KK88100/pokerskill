interface OrganizationSchemaProps {
  type: 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
}

interface CourseSchemaProps {
  type: 'Course'
  name: string
  description: string
  provider: string
  url: string
  image?: string
  courseLevel?: string
  duration?: string
  inLanguage?: string | string[]
  free?: boolean
}

interface ArticleSchemaProps {
  type: 'Article'
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  url: string
  publisher?: string
}

interface WebSiteSchemaProps {
  type: 'WebSite'
  name: string
  url: string
  description?: string
  inLanguage?: string | string[]
}

type SchemaProps =
  | OrganizationSchemaProps
  | CourseSchemaProps
  | ArticleSchemaProps
  | WebSiteSchemaProps

function buildSchema(props: SchemaProps) {
  const base = { '@context': 'https://schema.org' }

  switch (props.type) {
    case 'Organization':
      return {
        ...base,
        '@type': 'Organization',
        name: props.name,
        url: props.url,
        logo: props.logo
          ? { '@type': 'ImageObject', url: props.logo }
          : undefined,
        description: props.description,
        sameAs: props.sameAs,
      }

    case 'Course':
      return {
        ...base,
        '@type': 'Course',
        name: props.name,
        description: props.description,
        provider: {
          '@type': 'Organization',
          name: props.provider,
          sameAs: props.url,
        },
        url: props.url,
        image: props.image,
        courseLevel: props.courseLevel,
        timeRequired: props.duration,
        inLanguage: props.inLanguage,
        isAccessibleForFree: props.free ?? false,
        offers: props.free
          ? {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            }
          : undefined,
      }

    case 'Article':
      return {
        ...base,
        '@type': 'Article',
        headline: props.headline,
        description: props.description,
        author: {
          '@type': 'Person',
          name: props.author,
        },
        datePublished: props.datePublished,
        dateModified: props.dateModified || props.datePublished,
        image: props.image,
        url: props.url,
        publisher: props.publisher
          ? {
              '@type': 'Organization',
              name: props.publisher,
              logo: {
                '@type': 'ImageObject',
                url: 'https://pokerskill.io/logo.png',
              },
            }
          : undefined,
      }

    case 'WebSite':
      return {
        ...base,
        '@type': 'WebSite',
        name: props.name,
        url: props.url,
        description: props.description,
        inLanguage: props.inLanguage,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${props.url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }
  }
}

/**
 * SchemaOrg – injects JSON-LD structured data into <head>.
 * Supports Organization / Course / Article / WebSite schemas.
 */
export default function SchemaOrg(props: SchemaProps) {
  const schema = buildSchema(props)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  )
}
