<template>
    <div class="mx-auto p-2" :style="{ width: smAndDown ? '350px' : '500px' }">
        <div class="font-weight-bold text-h5 text-md-h4 text-lg-h4">
            Create a new payment
        </div>

        <div class="font-weight-bold">
            Title
        </div>
        <v-text-field v-model="paymentDetail.title"></v-text-field>

        <div class="font-weight-bold">
            Payee Address
        </div>
        <v-text-field :rules="addressRule" v-model="paymentDetail.payee"></v-text-field>

        <div class="font-weight-bold">
            Token address (ERC20)
        </div>
        <v-text-field :rules="addressRule" v-model="paymentDetail.tokenAddress"></v-text-field>

        <div class="font-weight-bold">
            Amounts
        </div>
        <v-text-field :rules="PositiveIntegerRule" v-model="paymentDetail.amount"></v-text-field>

        <div class="font-weight-bold">
            Start and End date
        </div>
        <VueDatePicker v-model="paymentDetail.startAndEndDate" range :dark="isDark" />

        <div class="d-flex justify-end my-2">
            <v-btn color="success" @click="createStream()" class="mx-2">Send</v-btn>
            <v-btn color="error" @click="clearForm()">Clear</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue"
import { storeToRefs } from "pinia"
import { useGlobalStore } from "@/stores/Global"
import { Global } from "@/composables/Global"
import Wallet from "@/composables/Wallet"
import { useDisplay } from "vuetify"
import StreamPaymentContract from "@/composables/StreamPayment"

const { smAndDown } = useDisplay()

onMounted(async () => {
    try {
        const wallet = new Wallet()
        await wallet.connect()
    } catch (error) {
        alert(`${error}`)
    }
})

const paymentDetail = reactive({
    title: "",
    payee: "",
    tokenAddress: "",
    amount: 0,
    startAndEndDate: ["", ""]
})

const { loadingSemaphore } = storeToRefs(useGlobalStore())

const clearForm = () => {
    paymentDetail.title = ""
    paymentDetail.payee = ""
    paymentDetail.tokenAddress = ""
    paymentDetail.amount = 0
    paymentDetail.startAndEndDate = ["", ""]
}

const isDark = computed(() => {
    return Global.currentThemeIsDark()
})

const addressRule = [
    (value: string) => {
        if (value.length != 42 && value.slice(0, 2) != "0x") return "Not a valid address"
        const validCharSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        for (let i = 2; i < 42; ++i) {
            if (validCharSet.indexOf(value[i].toLowerCase()) == -1) return "Not a valid address"
        }
        return true
    },
]

const PositiveIntegerRule = [
    (value: string) => {
        if (Number.isNaN(Number(value))) return 'Please input an integer'
        if (Number(value) <= 0) return "The value should be greater than 0"
        if (!Number.isInteger(Number(value))) return 'Please input an positive integer'
        return true
    },
]

const createStream = async () => {
    const streamPaymentContract = new StreamPaymentContract()
    streamPaymentContract.init()

    loadingSemaphore.value += 1
    await streamPaymentContract.approve(paymentDetail.tokenAddress,
        BigInt(paymentDetail.amount))

    const start = Math.floor(new Date(paymentDetail.startAndEndDate[0]).getTime() / 1000)
    const end = Math.floor(new Date(paymentDetail.startAndEndDate[1]).getTime() / 1000)
    await streamPaymentContract.createStream(paymentDetail.title,
        paymentDetail.payee,
        paymentDetail.tokenAddress,
        BigInt(paymentDetail.amount),
        BigInt(start),
        BigInt(end))
    loadingSemaphore.value -= 1
}
</script>