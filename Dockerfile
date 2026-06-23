FROM node:20-alpine
WORKDIR /app
RUN wget -qO /tmp/blink-deploy.tar.gz https://github.com/harutk7/blink.exchange/releases/download/deploy-v2/blink-deploy.tar.gz && \
    tar xzf /tmp/blink-deploy.tar.gz -C /app/ && \
    rm /tmp/blink-deploy.tar.gz
WORKDIR /app/apps/web
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_DRPC_ID=demo
ENV NEXT_PUBLIC_SUSHI_GRAPH_KEY=be60450c5c375eaa36fa6b1540047434
ENV NEXT_PUBLIC_SUSHI_DATA_API_HOST=https://production.data-gcp.sushi.com
ENV NEXT_PUBLIC_API_BASE_URL=https://api.sushi.com
ENV EDGE_CONFIG=https://edge-config.vercel.com/ecfg_bmnimekvxviezdhl1p5qmzpvhu2l?token=e973a21f-a8bc-4a22-9160-03328111a53e
ENV NEXT_PUBLIC_RPC_ETHEREUM=https://ethereum-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_POLYGON=https://polygon-bor-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_ARBITRUM=https://arbitrum-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_BSC=https://bsc-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_AVALANCHE=https://avalanche-c-chain-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_OPTIMISM=https://optimism-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_BASE=https://base-rpc.publicnode.com
ENV NEXT_PUBLIC_RPC_GNOSIS=https://gnosis-rpc.publicnode.com
EXPOSE 3000
CMD ["node", "server.js"]
