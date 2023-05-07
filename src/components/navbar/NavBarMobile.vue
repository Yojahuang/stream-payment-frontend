<template>
    <div class="d-flex justify-space-between align-center">
        <div class="font-weight-bold ml-5 text-white" @click="Global.navigateTo('')">Stream Payment</div>
        <div class="d-flex align-center justify-begin">
            <v-btn class="text-white" @click="toggleTheme()" icon="mdi-theme-light-dark" variant="text"></v-btn>
            <v-btn class="mx-2 text-white" variant="tonal" v-if="address == ''" @click="connectWallet()">Connect</v-btn>
            <v-btn class="mx-2 text-white" variant="text" v-else @click="openSettingDialog()" icon="mdi-account"></v-btn>
            <v-btn class="text-white" @click="toggleMenu()" icon="mdi-menu" variant="text"></v-btn>
        </div>
    </div>
    <div class="my-2" v-if="showMenu">
        <v-btn class="w-full mx-auto my-2 text-white" @click="Global.navigateTo('dashboard')" block
            variant="text">Dashboard</v-btn>
    </div>

    <v-dialog v-model="settingDialog">
        <v-card width="400" class="mx-auto p-2">
            Wallet address: {{ beautifyAddress }}
            <v-select class="my-2 text-white" hide-details="auto" v-model="selectedChain" density="comfortable"
                :items="['ThunderCore Testnet']">
                <template v-slot:selection="{ item }">
                    <v-avatar size="25" :image="Global.getImageURL(Chain.getChainImage(item.value))"></v-avatar>
                </template>
            </v-select>
            <v-btn class="mx-2" color="danger" v-if="address != ''" @click="disconnectWallet()">Disconnect</v-btn>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref, computed } from "vue"
import { useGlobalStore } from "@/stores/Global"
import { storeToRefs } from "pinia"
import Wallet from "@/composables/Wallet"
import { Chain } from "@/composables/Chain"
import { Global } from "@/composables/Global"

const theme = useTheme()
const { selectedChain } = storeToRefs(useGlobalStore())

const showMenu = ref(false)
const settingDialog = ref(false)

const openSettingDialog = () => {
    settingDialog.value = true
}

const toggleMenu = () => {
    showMenu.value = !showMenu.value
}

const beautifyAddress = computed(() => {
    const addr = address.value
    if (addr == '') return ''
    const length = addr.length
    return addr.substring(0, 4) + '...' + addr.substring(length - 4, length)
})

const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

const wallet = new Wallet()
const address = wallet.address

const connectWallet = async () => {
    await wallet.connect()
}

const disconnectWallet = () => {
    wallet.disconnect()
    settingDialog.value = false
}
</script>

<style scoped></style>
