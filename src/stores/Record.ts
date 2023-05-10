import { defineStore } from 'pinia'
import { ref } from 'vue'
import Wallet from '@/composables/Wallet'

export const useRecordStore = defineStore('record', () => {
    const records = ref<any[]>([])

    const fetchStream = async (fetchFn: () => Promise<any>) => {
        const streams: any[] = await fetchFn()

        const wallet = new Wallet()
        const address = wallet.getAddress()

        streams.forEach((stream: any) => {
            records.value.push({
                id: Number(stream.streamID.toString()),
                title: stream.title,
                startAt: new Date(Number(stream.startTime.toString()) * 1000),
                endAt: new Date(Number(stream.endTime.toString()) * 1000),
                remainToken: Number((stream.totalAmount - stream.claimedAmount).toString()),
                all: Number(stream.totalAmount.toString()),
                withdraw: Number(stream.claimedAmount.toString()),
                identity: stream.payer == address ? 'Creator' : 'Receiver'
            })
        })
    }
    return { records, fetchStream }
})