import { ethers } from 'ethers'
import { ERC20ABI } from '@/assets/abis/ERC20'

export default class ERC20Contract {
    address = ''
    ERC20Contract: ethers.Contract | undefined = undefined
    option = { gasLimit: 20_000_000 }

    init = (address: string) => {
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        this.address = address

        if (provider != null)
            this.ERC20Contract = new ethers.Contract(
                this.address,
                ERC20ABI,
                provider
            )
    }

    waitTx = async (tx: any) => {
        const receipt = await tx.wait()
        console.log(receipt)
    }

    approve = async (totalAmount: BigInt) => {
        if (this.ERC20Contract == undefined) return

        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        const signer = provider.getSigner()
        const tx = await this.ERC20Contract.connect(signer).approve(this.address, totalAmount, this.option)
        await this.waitTx(tx)
    }

    symbol = async () => {
        if (this.ERC20Contract == undefined) return
        const ethereum = (window as any).ethereum
        const provider = new ethers.providers.Web3Provider(ethereum, 'any')

        const signer = provider.getSigner()
        const symbol = await this.ERC20Contract.connect(signer).symbol()
        return symbol
    }
}
