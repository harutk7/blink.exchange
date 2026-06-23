import type { MetadataRoute } from 'next'

const solanaChainPaths = ['/swap']

export default function sitemap(): MetadataRoute.Sitemap {
  return solanaChainPaths.map(
    (path) =>
      ({
        url: `https://blink-landing.apps.levarqo.com/solana/${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
      }) as const,
  )
}
