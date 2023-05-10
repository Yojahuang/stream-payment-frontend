import { ethers } from 'ethers'
import { StreamPaymentABI } from '@/assets/StreamPayment'
import { ERC20ABI } from '@/assets/ERC20'
import Wallet from '@/composables/Wallet'

export default class StreamPaymentContract {
    address = '0xeB1E5618F28170408cd52b4fF788De6A2B6A8b0D'
    streamPaymentContract: ethers.Contract | undefined = undefined
    option = { gasLimit: 20_000_000 }

    init = () => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        this.address = '0xeB1E5618F28170408cd52b4fF788De6A2B6A8b0D'

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
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')
        const ERC20Contract = new ethers.Contract(
            tokenAddress,
            ERC20ABI,
            provider
        )

        const signer = provider.getSigner()
        const tx = await ERC20Contract.connect(signer).approve(this.address, totalAmount, this.option)
        await this.waitTx(tx)
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
