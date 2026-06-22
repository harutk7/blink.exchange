import { get } from '@vercel/edge-config'

interface CrossChainSwapEdgeConfig {
  maintenance: boolean
}

const getCrossChainSwapEdgeConfig = async (): Promise<CrossChainSwapEdgeConfig> => {
  try {
    const config = await get<CrossChainSwapEdgeConfig>('xswap')
    if (config) return config
  } catch {
    // Edge Config unavailable — fall back to default
  }
  return { maintenance: false }
}

export { type CrossChainSwapEdgeConfig, getCrossChainSwapEdgeConfig }
