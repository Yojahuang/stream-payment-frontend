const chainNames = ['ThunderCore Testnet'] as const
type chainName = typeof chainNames[number]

export default class Chain {
    static switchChain = async (
        chainId: number,
        rpcUrl: string,
        chainName: string,
        nativeCurrency: any
    ) => {
        const ethereum = (window as any).ethereum

        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + chainId.toString(16) }],
            })
        } catch (error) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x' + chainId.toString(16),
                            rpcUrls: [rpcUrl],
                            chainName,
                            nativeCurrency,
                        },
                    ],
                })
            } catch (addError) {
                console.error(addError)
            }
            // console.error(error);
        }
    }

    static getChainImage = (chain: chainName) => {
        if (chain == 'ThunderCore Testnet') {
            return 'chains/thundercore_testnet.png'
        }
        return 'chains/thundercore_testnet.png'
    }
}

export { Chain, type chainName, chainNames }