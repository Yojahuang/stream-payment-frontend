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
                <StreamList :records="records" />
            </v-window-item>

            <v-window-item value="Ongoing">
                <StreamList :records="records" />
            </v-window-item>

            <v-window-item value="Finished">
                <StreamList :records="records" />
            </v-window-item>
        </v-window>
    </div>

    <v-overlay v-model="loading"></v-overlay>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/Record'
import { useDisplay } from 'vuetify'
import { ref, onMounted, reactive } from "vue"
import { Global } from "@/composables/Global"
import Wallet from "@/composables/Wallet"
import StreamList from '@/components/StreamList.vue'
import StreamPaymentContract from '@/composables/StreamPayment'

const tab = ref("Not started")

const { xs } = useDisplay()

const streamStore = useRecordStore()
const { records } = storeToRefs(useRecordStore())

const loading = ref(false)

const filter = reactive({
    showCreator: true,
    showReceiver: true,
})

onMounted(async () => {
    const streamPaymentContract = new StreamPaymentContract()
    streamPaymentContract.init()

    loading.value = true

    const wallet = new Wallet()
    await wallet.connect()

    records.value = []
    await streamStore.fetchStream(streamPaymentContract.getPayerStreamInfo)
    await streamStore.fetchStream(streamPaymentContract.getReceiverStreamInfo)

    loading.value = false
})
</script>