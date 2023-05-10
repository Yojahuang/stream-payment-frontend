import { BigNumberish, ethers } from 'ethers'
import contractABI from '@/assets/StreamPayment.json'
import Wallet from '@/composables/Wallet'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/Global'

export default class StreamPaymentContract {
    address = '0xeB1E5618F28170408cd52b4fF788De6A2B6A8b0D'
    streamPaymentContract: ethers.Contract | undefined = undefined
    option = { gasLimit: 20_000_000 }

    init = () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        const { selectedChain } = storeToRefs(useGlobalStore())
        
        if (selectedChain.value == 'ThunderCore Testnet') {
            this.address = '0xeB1E5618F28170408cd52b4fF788De6A2B6A8b0D'
        }

        if (provider != null)
            this.streamPaymentContract = new ethers.Contract(
                this.address,
                contractABI,
                provider
            )
    }

    waitTx = async (tx: any) => {
        const receipt = await tx.wait()
        console.log(receipt)
    }

    createStream = async (
        title: string,
        receiver: string,
        tokenAddress: string,
        totalAmount: BigInt,
        startTime: BigInt,
        endTime: BigInt
    ) => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()  // same with payer, but this is an object

        const wallet = new Wallet()
        const payer = wallet.getAddress()  // not sure what will get here

        if (signer == null || this.streamPaymentContract == undefined) return

        const tx = await this.streamPaymentContract
            .connect(signer)
            .createStream(
                title,
                payer,
                receiver,
                tokenAddress,
                totalAmount,
                startTime,
                endTime
            )
        await this.waitTx(tx)
    }

    claimPayment = async (
        streamID: BigInt,
        claimAmount: BigInt,
    ) => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const tx = await this.streamPaymentContract
            .connect(signer)
            .claimPayment(
                streamID,
                claimAmount
            )
        await this.waitTx(tx)
    }

    getPayerStreamInfo = async () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const tx = await this.streamPaymentContract
            .connect(signer)
            .getPayerStreamInfo()
        await this.waitTx(tx)
    }

    getReceiverStreamInfo = async () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const tx = await this.streamPaymentContract
            .connect(signer)
            .getReceiverStreamInfo()
        await this.waitTx(tx)
    }
}
