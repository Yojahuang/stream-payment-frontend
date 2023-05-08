interface ChainInfo {
    chainId: number;
    rpcUrl: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    explorer: string;
}

interface ChainInfoMap {
    [key: string]: ChainInfo
}

export { type ChainInfo, type ChainInfoMap }