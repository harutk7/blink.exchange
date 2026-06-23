import {
  type ExtendedConnectorConfig,
  getDefaultConfig,
} from '@solana/connector'

let connectorConfigSingleton: ExtendedConnectorConfig | undefined = undefined
export const getConnectorConfig = () => {
  if (typeof window === 'undefined') {
    return createConnectorConfig()
  }

  if (!connectorConfigSingleton) {
    connectorConfigSingleton = createConnectorConfig()
  }

  return connectorConfigSingleton
}

const createConnectorConfig = () => {
  return getDefaultConfig({
    appName: 'BLINK Exchange',
    appUrl: 'https://blink-exchange.apps.levarqo.com',
    autoConnect: true,
    enableMobile: true,
  })
}
