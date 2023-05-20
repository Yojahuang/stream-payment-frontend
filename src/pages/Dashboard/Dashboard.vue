<template>
    <div class="mx-auto" :style="{ 'width': xs ? '360px' : '500px' }">
        <v-btn color="secondary" class="my-2" @click="Global.navigateTo('dashboard/new')" prepend-icon="mdi-plus">Create
            new payment</v-btn>

        <div class="my-2 d-flex align-center">
            <v-checkbox hide-details v-model="filter.showCreator">
                <template #label>
                    <v-icon icon="mdi-account-cog" class="mx-2"></v-icon>Creator
                </template>
            </v-checkbox>
            <v-checkbox hide-details v-model="filter.showReceiver">
                <template #label>
                    <v-icon icon="mdi-hand-coin" class="mx-2"></v-icon>Receiver
                </template>
            </v-checkbox>
        </div>

        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="Not started">Not started</v-tab>
            <v-tab value="Ongoing">Ongoing</v-tab>
            <v-tab value="Finished">Finished</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="Not started">
                <StreamList :records="NotStartedRecords" />
            </v-window-item>

            <v-window-item value="Ongoing">
                <StreamList :records="OngoingRecords" />
            </v-window-item>

            <v-window-item value="Finished">
                <StreamList :records="FinishedRecords" />
            </v-window-item>
        </v-window>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStreamStore } from '@/stores/Stream'
import { useGlobalStore } from '@/stores/Global'
import { useDisplay } from 'vuetify'
import { ref, onMounted, reactive, computed } from "vue"
import { Global } from "@/composables/Global"
import Wallet from "@/composables/Wallet"
import StreamList from '@/components/StreamList.vue'
import StreamPaymentContract from '@/composables/StreamPayment'

const tab = ref("Not started")

const { xs } = useDisplay()

const streamStore = useStreamStore()
const { streams } = storeToRefs(useStreamStore())

const currentRecords = computed(() => {
    const result: any[] = []
    streams.value.forEach((record: any) => {
        if (record.identity == 'Creator' && filter.showCreator) {
            result.push(record)
        } else if (record.identity == 'Receiver' && filter.showReceiver) {
            result.push(record)
        }
    })
    return result
})

const NotStartedRecords = computed(() => {
    const result: any = []
    const records = currentRecords.value;

    records.forEach((record: any) => {
        const now = new Date().getTime()
        const recordStartTime = record.startAt.getTime()

        if (recordStartTime > now) {
            result.push(record)
        }
    })
    return result
})

const FinishedRecords = computed(() => {
    const result: any = []
    const records = currentRecords.value;

    records.forEach((record: any) => {
        const now = new Date().getTime()
        const recordEndTime = record.endAt.getTime()

        if (recordEndTime <= now) {
            result.push(record)
        }
    })

    return result
})

const OngoingRecords = computed(() => {
    const result: any = []
    const records = currentRecords.value;

    records.forEach((record: any) => {
        const now = new Date().getTime()
        const recordStartTime = record.startAt.getTime()
        const recordEndTime = record.endAt.getTime()

        if (recordStartTime <= now && now <= recordEndTime) {
            result.push(record)
        }
    })

    return result
})

const { loadingSemaphore } = storeToRefs(useGlobalStore())

const filter = reactive({
    showCreator: true,
    showReceiver: true,
})

onMounted(async () => {
    const streamPaymentContract = new StreamPaymentContract()
    streamPaymentContract.init()

    loadingSemaphore.value += 1


    const wallet = new Wallet()
    await wallet.connect()

    streams.value = []
    await streamStore.fetchStream(streamPaymentContract.getPayerStreamInfo)
    await streamStore.fetchStream(streamPaymentContract.getReceiverStreamInfo)

    loadingSemaphore.value -= 1
})
</script>