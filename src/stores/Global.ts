import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Chain, chain } from '@/composables/Chain'

export const useGlobalStore = defineStore('global', () => {
    const selectedChain = ref<chain>('ThunderCore Testnet')

    const shouldBeDisabled = ref(false)

    const settingDialog = ref(false)

    const chainInfoMap = {
        'ThunderCore Testnet': {
            chainId: 18,
            rpcUrl: 'https://testnet-rpc.thundercore.com',
            nativeCurrency: {
                name: 'TST',
                symbol: 'TST',
                decimals: 18,
            },
        },
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

    return { selectedChain, chainInfoMap, shouldBeDisabled, settingDialog }
})