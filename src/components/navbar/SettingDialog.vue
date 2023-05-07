<template>
    <v-dialog v-model="settingDialog">
        <v-card width="280" class="mx-auto p-2">
            <v-card-item>
                Wallet address: {{ beautifyAddress }}
                <v-select class="my-2" hide-details="auto" v-model="selectedChain" density="comfortable"
                    label="Select chains" :items="chains">
                    <template v-slot:selection="{ item }">
                        <v-avatar size="25" :image="Global.getImageURL(Chain.getChainImage(item.value))"></v-avatar>
                    </template>
                </v-select>
            </v-card-item>
            <v-card-actions>
                <v-btn class="mx-2" color="error" @click="disconnectWallet()">Disconnect</v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/Global'
import Wallet from '@/composables/Wallet'
import Global from "@/composables/Global"
import { Chain, chains } from "@/composables/Chain"

const { settingDialog, selectedChain } = storeToRefs(useGlobalStore())

const wallet = new Wallet()

const beautifyAddress = computed(() => {
    const wallet = new Wallet()
    const addr = wallet.getAddress()
    if (addr == '') return ''
    const length = addr.length
    return addr.substring(0, 4) + '...' + addr.substring(length - 4, length)
})

const disconnectWallet = () => {
    wallet.disconnect()
    settingDialog.value = false
}
</script>