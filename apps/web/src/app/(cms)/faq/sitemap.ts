import { getFaqAnswerSearch } from '@sushiswap/graph-client/strapi'
import type { MetadataRoute } from 'next'

export const revalidate = 0

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const { answers, answerGroups } = await getFaqAnswerSearch({
      search: '',
      pagination: {
        limit: 10000,
      },
    })

    const combined = answers.concat(answerGroups)

    return [
      {
        url: 'https://blink-exchange.apps.levarqo.com/faq',
        lastModified: new Date(),
        changeFrequency: 'weekly',
      },
      ...combined.map(
        (answer) =>
          ({
            url: `https://blink-exchange.apps.levarqo.com/faq/${answer.slug}`,
            changeFrequency: 'weekly',
          }) as const,
      ),
    ]
  } catch {
    console.error('sitemap: Error fetching faq articles')
    return []
  }
}
