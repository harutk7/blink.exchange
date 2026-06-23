import { EvmChainId, evmChains } from 'sushi/evm'
import { http, type Chain, type Transport } from 'viem'
import { holesky } from 'viem/chains'

const drpcId = process.env['DRPC_ID'] || process.env['NEXT_PUBLIC_DRPC_ID']

const chainIdToKey = Object.fromEntries(
  evmChains.map((chain) => [chain.chainId, chain.key]),
) as Record<EvmChainId, string>

function rpcUrl(chainId: EvmChainId, fallback: string): string {
  const key = chainIdToKey[chainId]
  if (!key) return fallback
  const envKey = `NEXT_PUBLIC_RPC_${key.toUpperCase().replace(/-/g, '_')}`
  return process.env[envKey] || fallback
}

export const publicTransports = {
  [EvmChainId.ARBITRUM_NOVA]: http(
    rpcUrl(EvmChainId.ARBITRUM_NOVA, `https://lb.drpc.live/ogrpc?network=arbitrum-nova&dkey=${drpcId}`),
  ),
  [EvmChainId.ARBITRUM]: http(
    rpcUrl(EvmChainId.ARBITRUM, 'https://arbitrum-rpc.publicnode.com'),
  ),
  [EvmChainId.AVALANCHE]: http(
    rpcUrl(EvmChainId.AVALANCHE, 'https://avalanche-c-chain-rpc.publicnode.com'),
  ),
  [EvmChainId.BOBA]: http(
    rpcUrl(EvmChainId.BOBA, `https://lb.drpc.live/ogrpc?network=boba-eth&dkey=${drpcId}`),
  ),
  [EvmChainId.BOBA_BNB]: http(
    rpcUrl(EvmChainId.BOBA_BNB, `https://lb.drpc.live/ogrpc?network=boba-bnb&dkey=${drpcId}`),
  ),
  [EvmChainId.BSC]: http(
    rpcUrl(EvmChainId.BSC, 'https://bsc-rpc.publicnode.com'),
  ),
  [EvmChainId.BTTC]: http('https://rpc.bittorrentchain.io'),
  [EvmChainId.CELO]: http(
    rpcUrl(EvmChainId.CELO, `https://lb.drpc.live/ogrpc?network=celo&dkey=${drpcId}`),
  ),
  [EvmChainId.ETHEREUM]: http(
    rpcUrl(EvmChainId.ETHEREUM, 'https://ethereum-rpc.publicnode.com'),
  ),
  [EvmChainId.FANTOM]: http(
    rpcUrl(EvmChainId.FANTOM, `https://lb.drpc.live/ogrpc?network=fantom&dkey=${drpcId}`),
  ),
  [EvmChainId.GNOSIS]: http(
    rpcUrl(EvmChainId.GNOSIS, 'https://gnosis-rpc.publicnode.com'),
  ),
  [EvmChainId.HARMONY]: http(
    rpcUrl(EvmChainId.HARMONY, `https://lb.drpc.live/ogrpc?network=harmony-0&dkey=${drpcId}`),
  ),
  [EvmChainId.KAVA]: http(
    rpcUrl(EvmChainId.KAVA, `https://lb.drpc.live/ogrpc?network=kava&dkey=${drpcId}`),
  ),
  [EvmChainId.METIS]: http(
    rpcUrl(EvmChainId.METIS, `https://lb.drpc.live/ogrpc?network=metis&dkey=${drpcId}`),
  ),
  [EvmChainId.OPTIMISM]: http(
    rpcUrl(EvmChainId.OPTIMISM, 'https://optimism-rpc.publicnode.com'),
  ),
  [EvmChainId.POLYGON]: http(
    rpcUrl(EvmChainId.POLYGON, 'https://polygon-bor-rpc.publicnode.com'),
  ),
  [EvmChainId.POLYGON_ZKEVM]: http(
    rpcUrl(EvmChainId.POLYGON_ZKEVM, `https://lb.drpc.live/ogrpc?network=polygon-zkevm&dkey=${drpcId}`),
  ),
  [EvmChainId.THUNDERCORE]: http(
    rpcUrl(EvmChainId.THUNDERCORE, `https://lb.drpc.live/ogrpc?network=thundercore&dkey=${drpcId}`),
  ),
  [EvmChainId.HAQQ]: http(
    rpcUrl(EvmChainId.HAQQ, `https://lb.drpc.live/ogrpc?network=haqq&dkey=${drpcId}`),
  ),
  [EvmChainId.CORE]: http(
    rpcUrl(EvmChainId.CORE, `https://lb.drpc.live/ogrpc?network=core&dkey=${drpcId}`),
  ),
  [EvmChainId.ZKSYNC_ERA]: http(
    rpcUrl(EvmChainId.ZKSYNC_ERA, `https://lb.drpc.live/ogrpc?network=zksync&dkey=${drpcId}`),
  ),
  [EvmChainId.LINEA]: http(
    rpcUrl(EvmChainId.LINEA, `https://lb.drpc.live/ogrpc?network=linea&dkey=${drpcId}`),
  ),
  [EvmChainId.BASE]: http(
    rpcUrl(EvmChainId.BASE, 'https://base-rpc.publicnode.com'),
  ),
  [EvmChainId.SCROLL]: http(
    rpcUrl(EvmChainId.SCROLL, `https://lb.drpc.live/ogrpc?network=scroll&dkey=${drpcId}`),
  ),
  [EvmChainId.FILECOIN]: http('https://api.node.glif.io/rpc/v1'),
  [EvmChainId.ZETACHAIN]: http(
    rpcUrl(EvmChainId.ZETACHAIN, `https://lb.drpc.live/ogrpc?network=zeta-chain&dkey=${drpcId}`),
  ),
  [EvmChainId.CRONOS]: http(
    rpcUrl(EvmChainId.CRONOS, `https://lb.drpc.live/ogrpc?network=cronos&dkey=${drpcId}`),
  ),
  [EvmChainId.BLAST]: http(
    rpcUrl(EvmChainId.BLAST, `https://lb.drpc.live/ogrpc?network=blast&dkey=${drpcId}`),
  ),
  [EvmChainId.SKALE_EUROPA]: http(
    'https://elated-tan-skat-indexer.skalenodes.com:10072',
  ),
  [EvmChainId.ROOTSTOCK]: http(
    rpcUrl(EvmChainId.ROOTSTOCK, `https://lb.drpc.live/ogrpc?network=rootstock&dkey=${drpcId}`),
  ),
  [EvmChainId.MANTLE]: http(
    rpcUrl(EvmChainId.MANTLE, `https://lb.drpc.live/ogrpc?network=mantle&dkey=${drpcId}`),
  ),
  [EvmChainId.MANTA]: http(
    rpcUrl(EvmChainId.MANTA, `https://lb.drpc.live/ogrpc?network=manta-pacific&dkey=${drpcId}`),
  ),
  [EvmChainId.MODE]: http(
    rpcUrl(EvmChainId.MODE, `https://lb.drpc.live/ogrpc?network=mode&dkey=${drpcId}`),
  ),
  [EvmChainId.TAIKO]: http(
    rpcUrl(EvmChainId.TAIKO, `https://lb.drpc.live/ogrpc?network=taiko&dkey=${drpcId}`),
  ),
  [EvmChainId.ZKLINK]: http('https://rpc.zklink.io'),
  [EvmChainId.APE]: http(
    rpcUrl(EvmChainId.APE, `https://lb.drpc.live/ogrpc?network=apechain&dkey=${drpcId}`),
  ),
  [EvmChainId.SONIC]: http(
    rpcUrl(EvmChainId.SONIC, `https://lb.drpc.live/ogrpc?network=sonic&dkey=${drpcId}`),
  ),
  [EvmChainId.HEMI]: http(
    rpcUrl(EvmChainId.HEMI, `https://lb.drpc.live/ogrpc?network=hemi&dkey=${drpcId}`),
  ),
  [EvmChainId.KATANA]: http(
    rpcUrl(EvmChainId.KATANA, `https://lb.drpc.live/ogrpc?network=katana&dkey=${drpcId}`),
  ),
  [EvmChainId.HYPEREVM]: http(
    rpcUrl(EvmChainId.HYPEREVM, `https://lb.drpc.live/ogrpc?network=hyperliquid&dkey=${drpcId}`),
  ),
  [EvmChainId.BERACHAIN]: http(
    rpcUrl(EvmChainId.BERACHAIN, `https://lb.drpc.live/ogrpc?network=berachain&dkey=${drpcId}`),
  ),
  [EvmChainId.PLASMA]: http(
    rpcUrl(EvmChainId.PLASMA, `https://lb.drpc.live/ogrpc?network=plasma&dkey=${drpcId}`),
  ),
  [EvmChainId.FUSE]: http(
    rpcUrl(EvmChainId.FUSE, `https://lb.drpc.live/ogrpc?network=fuse&dkey=${drpcId}`),
  ),
  [EvmChainId.MONAD]: http(
    rpcUrl(EvmChainId.MONAD, `https://lb.drpc.live/ogrpc?network=monad-mainnet&dkey=${drpcId}`),
  ),
  [EvmChainId.MEGAETH]: http(
    rpcUrl(EvmChainId.MEGAETH, `https://lb.drpc.live/ogrpc?network=megaeth&dkey=${drpcId}`),
  ),
  [EvmChainId.XLAYER]: http(
    rpcUrl(EvmChainId.XLAYER, `https://lb.drpc.live/ogrpc?network=xlayer&dkey=${drpcId}`),
  ),
  /* Testnets */
  [EvmChainId.ARBITRUM_SEPOLIA]: http('https://sepolia-rollup.arbitrum.io/rpc'),
  // [EvmChainId.POLYGON_TESTNET]: http('https://rpc.ankr.com/polygon_mumbai'),
  [EvmChainId.SEPOLIA]: http(
    rpcUrl(EvmChainId.SEPOLIA, 'https://ethereum-sepolia-rpc.publicnode.com'),
  ),
  [17000]: http(
    rpcUrl(17000 as EvmChainId, 'https://ethereum-holesky-rpc.publicnode.com'),
  ),
  [EvmChainId.TATARA]: http('https://rpc.tatara.katanarpc.com'),
  [EvmChainId.BOKUTO]: http('https://rpc-bokuto.katanarpc.com'),
} as const satisfies Record<EvmChainId | 17000, Transport>

function pluck<
  Arr extends readonly Record<string, any>[],
  K extends keyof Arr[number],
>(arr: Arr, key: K): { [I in keyof Arr]: Arr[I][K] } {
  // @ts-ignore
  return arr.map((item) => item[key]) as any
}

export const publicChains = [
  ...pluck(evmChains, 'viemChain'),
  holesky as unknown as (typeof evmChains)[number]['viemChain'],
] as const satisfies readonly [Chain, ...Chain[]]

export function fromEntriesConst<
  const Pairs extends readonly (readonly [PropertyKey, any])[],
>(
  pairs: Pairs,
): {
  readonly [K in Pairs[number] as K[0]]: Extract<
    Pairs[number],
    readonly [K[0], any]
  >[1]
} {
  return Object.fromEntries(pairs) as any
}

export const publicClientConfig = fromEntriesConst(
  publicChains.map(
    (chain) =>
      [
        chain.id,
        {
          chain,
          transport: publicTransports[chain.id],
        },
      ] as const,
  ),
)
