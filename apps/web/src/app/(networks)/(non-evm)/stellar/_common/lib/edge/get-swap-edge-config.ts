import { get } from '@vercel/edge-config'

interface SwapEdgeConfig {
  maintenance: boolean
}

const getSwapEdgeConfig = async (): Promise<SwapEdgeConfig> => {
  try {
    const config = await get<SwapEdgeConfig>('swap')
    if (config) return config
  } catch {
    // Edge Config unavailable — fall back to default
  }
  return { maintenance: false }
}

export { type SwapEdgeConfig, getSwapEdgeConfig }
