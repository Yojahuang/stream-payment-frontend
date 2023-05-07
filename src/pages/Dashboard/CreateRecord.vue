<template>
    <div class="mx-auto p-2" :style="{ width: smAndDown ? '350px' : '500px' }">
        <div class="font-weight-bold text-h5 text-md-h4 text-lg-h4">
            Create a new payment
        </div>

        <div class="font-weight-bold">
            Payee
        </div>
        <v-text-field :rules="addressRule" v-model="paymentDetail.payee"></v-text-field>

        <div class="font-weight-bold">
            Token address
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
            <v-btn color="success" class="mx-2">Send</v-btn>
            <v-btn color="error" @click="clearForm()">Clear</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import { Global } from "@/composables/Global"
import { useDisplay } from "vuetify"

const { smAndDown } = useDisplay()

const paymentDetail = reactive({
    payee: "",
    tokenAddress: "",
    amount: 0,
    startAndEndDate: ["", ""]
})

const clearForm = () => {
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
        if (value.length != 42) return "Not a valid ERC20 address"
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
</script>