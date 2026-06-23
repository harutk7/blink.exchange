import type { MetadataRoute } from 'next'

const stellarChainPaths = ['/pool', '/explore/pools', '/swap']

export default function sitemap(): MetadataRoute.Sitemap {
  return stellarChainPaths.map(
    (path) =>
      ({
        url: `https://blink-landing.apps.levarqo.com/stellar/${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
      }) as const,
  )
}
