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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/Record'
import { Global } from "@/composables/Global"
import { useDisplay } from 'vuetify'
import { ref, onMounted, reactive } from "vue"
import Wallet from "@/composables/Wallet"
import StreamList from '@/components/StreamList.vue'

const tab = ref("Not started")

const { xs } = useDisplay()

const { records } = storeToRefs(useRecordStore())

const filter = reactive({
    showCreator: true,
    showReceiver: true,
})

onMounted(async () => {
    const wallet = new Wallet()
    await wallet.connect()
})
</script>