import { defineStore } from 'pinia'
import { ref } from 'vue'
import Wallet from '@/composables/Wallet'
import StreamPaymentContract from '@/composables/StreamPayment'
import ERC20Contract from '@/composables/Erc20'

interface Penalty {
    startTime: number,
    endTime: number,
    status: string,
    amount: number,
    id: number,
}

interface Stream {
    id: number,
    title: string,
    startAt: Date,
    endAt: Date,
    remainToken: number,
    totalPenaltyAmount: number,
    all: number,
    withdraw: number,
    identity: 'Creator' | 'Receiver',
    tokenAddress: string,
    tokenSymbol: string,
    penalties: Penalty[],
}

const useStreamStore = defineStore('stream', () => {
    const streams = ref<Stream[]>([])

    const fetchStream = async (fetchFn: () => Promise<any>) => {
        const streamPaymentContract = new StreamPaymentContract()
        streamPaymentContract.init()

        const fetchStreams: any[] = await fetchFn()

        const wallet = new Wallet()
        const address = wallet.getAddress()

        fetchStreams.forEach(async (stream: any) => {
            console.log(stream)

            const erc20Contract = new ERC20Contract();
            erc20Contract.init(stream.tokenAddress)
            const symbol = await erc20Contract.symbol()
            const id = Number(stream.streamID.toString())

            const totalPenaltyAmount = await streamPaymentContract.getTotalPenalty(BigInt(id))

            const penalties = await streamPaymentContract.getStreamsPenalty(id)

            streams.value.push({
                id: id,
                title: stream.title,
                startAt: new Date(Number(stream.startTime.toString()) * 1000),
                endAt: new Date(Number(stream.endTime.toString()) * 1000),
                remainToken: Number((stream.totalAmount - stream.claimedAmount).toString()),
                totalPenaltyAmount,
                all: Number(stream.totalAmount.toString()),
                withdraw: Number(stream.claimedAmount.toString()),
                identity: stream.payer == address ? 'Creator' : 'Receiver',
                tokenAddress: stream.tokenAddress,
                tokenSymbol: symbol,
                penalties: penalties ? penalties : []
            })
        })
    }

    const findStreamById = (id: number) => {
        let result: Stream | undefined
        streams.value.forEach((record: Stream) => {
            if (record.id == id) {
                result = record
            }
        })

        return result
    }

    const getStreamById = async (id: number) => {
        let result = findStreamById(id)
        if (result != undefined) return result


        const streamPaymentContract = new StreamPaymentContract()
        streamPaymentContract.init()
        const streamInfo = await streamPaymentContract.getStreamsInfo(id)

        const wallet = new Wallet()
        const address = wallet.getAddress()

        const erc20Contract = new ERC20Contract();
        erc20Contract.init(streamInfo.tokenAddress)
        const symbol = await erc20Contract.symbol()

        const penalties = await streamPaymentContract.getStreamsPenalty(id)

        const totalPenaltyAmount = await streamPaymentContract.getTotalPenalty(BigInt(id))

        streams.value.push({
            id: Number(streamInfo.streamID.toString()),
            title: streamInfo.title,
            startAt: new Date(Number(streamInfo.startTime.toString()) * 1000),
            endAt: new Date(Number(streamInfo.endTime.toString()) * 1000),
            remainToken: Number((streamInfo.totalAmount - streamInfo.claimedAmount).toString()),
            totalPenaltyAmount: Number(totalPenaltyAmount.toString()),
            all: Number(streamInfo.totalAmount.toString()),
            withdraw: Number(streamInfo.claimedAmount.toString()),
            identity: streamInfo.payer == address ? 'Creator' : 'Receiver',
            tokenAddress: streamInfo.tokenAddress,
            tokenSymbol: symbol,
            penalties: penalties ? penalties : []
        })

        result = findStreamById(id)
        if (result != undefined) return result
        else {
            throw Error('Streaminfo not found')
        }
    }
    return { streams, getStreamById, fetchStream }
})

export { useStreamStore, type Stream }