import { type ChainId, getChainById } from 'sushi'
import { isSushiSwapChainId } from 'sushi/evm'

export const getNetworkName = (network: number) => {
  const chain = getChainById(network as ChainId)
  if (chain) return chain.name
  if (network === 17000) return 'Holesky'
  return 'Unknown'
}

export const getNetworkKey = (network: number) => {
  const chain = getChainById(network as ChainId)
  if (chain) return chain.key
  if (network === 17000) return 'holesky'
  return String(network)
}

export const replaceNetworkSlug = (network: ChainId, pathname: string) => {
  if (pathname.includes('/pool/')) {
    return `/${getNetworkKey(network)}/explore/pools`
  }
  if (pathname.includes('/token/')) {
    if (isSushiSwapChainId(network)) {
      return `/${getNetworkKey(network)}/explore/tokens`
    }
    return `/${getNetworkKey(network)}/explore/pools`
  }
  const pathSegments = pathname.split('/')
  pathSegments[1] = getNetworkKey(network)
  return pathSegments.join('/')
}
