import type { MetadataRoute } from 'next'
import { legalPages } from './_config'

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(legalPages).map(
    (page) =>
      ({
        url: `https://blink-exchange.apps.levarqo.com/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
      }) as const,
  )
}
