import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Chain, chainName } from '@/composables/Chain'
import { ChainInfoMap } from "@/types/ChainInfo"

export const useGlobalStore = defineStore('global', () => {
    const selectedChain = ref<chainName>('ThunderCore Testnet')

    const settingDialog = ref(false)

    const userAddress = ref("")

    const chainInfoMap: ChainInfoMap = {
        'ThunderCore Testnet': {
            chainId: 18,
            rpcUrl: 'https://testnet-rpc.thundercore.com',
            nativeCurrency: {
                name: 'TST',
                symbol: 'TST',
                decimals: 18,
            },
            explorer: "https://explorer-testnet.thundercore.com/"
        },
    }

    const getExplorer = () => {
        return chainInfoMap[selectedChain.value].explorer
    }

    watch(selectedChain, async () => {
        const chainInfo = chainInfoMap[selectedChain.value]
        await Chain.switchChain(
            chainInfo.chainId,
            chainInfo.rpcUrl,
            selectedChain.value,
            chainInfo.nativeCurrency
        )

        localStorage.setItem('selectedChain', selectedChain.value)
    })

    return { selectedChain, chainInfoMap, settingDialog, userAddress, getExplorer }
})