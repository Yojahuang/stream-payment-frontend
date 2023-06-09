import { ethers } from 'ethers'
import { ref, toRaw } from 'vue'
import { storeToRefs } from "pinia"
import { useGlobalStore } from "@/stores/Global"
import Chain from '@/composables/Chain'

export default class Wallet {
    address = ref<string>('')

    connect = async () => {
        try {
            const ethereum = (window as any).ethereum
            const provider = new ethers.providers.Web3Provider(ethereum, 'any')

            // MetaMask requires requesting permission to connect users accounts
            await provider.send('eth_requestAccounts', [])
        } catch {
            throw Error('Metamask not detected!')
        }

        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        const globalStore = useGlobalStore()

        // get the chain selected in the select
        const { selectedChain } = storeToRefs(globalStore)

        const chainMap = toRaw(globalStore.chainInfoMap)

        const chainInfo = chainMap[selectedChain.value]

        await Chain.switchChain(
            chainInfo.chainId,
            chainInfo.rpcUrl,
            selectedChain.value,
            chainInfo.nativeCurrency
        )

        const providerURL = provider.connection.url

        const address = await provider.getSigner().getAddress()
        const { userAddress } = storeToRefs(useGlobalStore())
        userAddress.value = address

        localStorage.setItem('address', address)
        localStorage.setItem('providerURL', providerURL)
    }

    getAddress = () => {
        const address = localStorage.getItem('address')
        if (address) this.address.value = address
        return this.address.value
    }

    getProvider = () => {
        const providerURL = localStorage.getItem('providerURL')

        if (providerURL == null) {
            return null
        }

        const provider = new ethers.providers.JsonRpcProvider(providerURL)

        return provider
    }

    getSigner = () => {
        const provider = this.getProvider()
        if (provider) {
            return provider.getSigner()
        } else {
            return null
        }
    }

    disconnect = () => {
        localStorage.removeItem('address')
        localStorage.removeItem('providerURL')
        const { userAddress } = storeToRefs(useGlobalStore())
        userAddress.value = ''
    }
}