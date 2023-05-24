import { ethers } from 'ethers'
import { StreamPaymentABI } from '@/assets/abis/StreamPayment'
import ERC20Contract from '@/composables/Erc20'
import Wallet from '@/composables/Wallet'

export default class StreamPaymentContract {
    address = '0x3D3EB6207a1965D4809c1C37713b1c5850E548d3'
    streamPaymentContract: ethers.Contract | undefined = undefined
    option = { gasLimit: 20_000_000 }

    init = () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        this.address = '0x3D3EB6207a1965D4809c1C37713b1c5850E548d3'

        if (provider != null)
            this.streamPaymentContract = new ethers.Contract(
                this.address,
                StreamPaymentABI,
                provider
            )
    }

    waitTx = async (tx: any) => {
        const receipt = await tx.wait()
        console.log(receipt)
    }

    approve = async (tokenAddress: string, totalAmount: BigInt) => {
        const erc20Contract = new ERC20Contract()
        erc20Contract.init(tokenAddress)

        await erc20Contract.approve(this.address, totalAmount)
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
                endTime,
                this.option
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
                claimAmount,
                this.option
            )
        await this.waitTx(tx)
    }

    getPayerStreamInfo = async () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const result = await this.streamPaymentContract
            .connect(signer)
            .getPayerStreamInfo()
        return result
    }

    getReceiverStreamInfo = async () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const result = await this.streamPaymentContract
            .connect(signer)
            .getReceiverStreamInfo()
        return result
    }

    getStreamsInfo = async (id: number) => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const result = await this.streamPaymentContract
            .connect(signer)
            .streams(id)
        return result
    }

    getStreamsPenalty = async (id: number) => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const signer = provider.getSigner()

        if (signer == null || this.streamPaymentContract == undefined) return

        const result = await this.streamPaymentContract
            .connect(signer)
            .penalties(id)
        return result
    }
}
