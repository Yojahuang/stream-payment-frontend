<template>
    <div :class="{ 'w-75': !smAndDown, 'w-full': smAndDown, 'mx-auto': true }">
        <div class="text-h5 text-md-h4 text-lg-h4 my-2 font-weight-medium">
            {{ record.title }}
        </div>
        <div class="d-flex mx-auto align-center justify-center my-2">
            <v-progress-circular :size="smAndDown ? 250 : 400" :width="15"
                :model-value="(calcClaimeableAmount) / record.all * 100" color="secondary">
                <v-progress-circular :size="smAndDown ? 220 : 370" :width="15"
                    :model-value="record.withdraw / record.all * 100" color="primary">
                    <v-progress-circular v-if="!smAndDown" :size="340" :width="0"
                        :color="Global.currentThemeIsDark() ? 'white' : 'black'">
                        You had withdraw: {{ record.withdraw }} {{ record.tokenSymbol }} <br />
                        You can still withdraw: {{ (calcClaimeableAmount - record.withdraw).toFixed(2) }} {{
                            record.tokenSymbol }}
                    </v-progress-circular>
                </v-progress-circular>
            </v-progress-circular>
        </div>

        <div class="my-2" v-if="smAndDown">
            You had withdraw: <div class="amount-of-money">{{ record.withdraw }}</div> {{ record.tokenSymbol }} <br />
            You can still withdraw: <div class="amount-of-money">{{ (calcClaimeableAmount - record.withdraw).toFixed(2) }}
            </div> {{ record.tokenSymbol }}
        </div>

        <div :class="{ 'my-2': true, 'd-flex': !smAndDown, 'align-center': !smAndDown }">
            <v-text-field v-model="claimAmount" label="How much you want to claim" :rules="checkClaimRule"
                hide-details="auto"></v-text-field>
            <v-btn @click="claimPayment()" :disabled="record.identity != 'Receiver'" color="primary">Claim
                payment</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { useDisplay } from 'vuetify'
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from "pinia"
import { useRecordStore, Stream } from '@/stores/Record'
import { useGlobalStore } from '@/stores/Global'
import { Global } from "@/composables/Global"
import StreamPaymentContract from '@/composables/StreamPayment'

const globalStore = useGlobalStore()
const { loadingSemaphore } = storeToRefs(globalStore)


const { smAndDown } = useDisplay()

const recordStore = useRecordStore()
const router = useRoute()
const id = Number(router.params.id)
const record = ref<Stream>({
    id: -1,
    title: "-1",
    startAt: new Date("2023-05-11T13:14:00.000Z"),
    endAt: new Date("2023-05-17T13:14:00.000Z"),
    remainToken: 0,
    all: 0,
    withdraw: 0,
    identity: "Creator",
    tokenAddress: '',
    tokenSymbol: 'DAI'
})

const currentTime = ref(Math.floor(new Date().getTime() / 1000))

setInterval(() => {
    currentTime.value = Math.floor(new Date().getTime() / 1000);
}, 1000)

const claimAmount = ref(0)

const calcClaimeableAmount = computed(() => {
    const currentTimeRaw = currentTime.value
    const startTime = Math.floor(record.value.startAt.getTime() / 1000);
    const endTime = Math.floor(record.value.endAt.getTime() / 1000);

    let result = Math.max(record.value.all * (currentTimeRaw - startTime) / (endTime - startTime), 0)
    result = Math.min(result, record.value.all)

    return result
})

onMounted(async () => {
    try {
        record.value = await recordStore.getStreamById(id)
    } catch (error) {
        alert(error)
    }
})

const checkClaimRule = [
    (value: string) => {
        const val = Number(value)
        if (Number.isNaN(val)) return "Please input a positive integer number"
        if (!Number.isInteger(val)) return "Please input a positive integer number"
        if (val <= 0) return "Please input a positive number"
        if (val > calcClaimeableAmount.value) return "You can't withdraw more than you supposed to"
        return true
    }
]

const claimPayment = async () => {
    loadingSemaphore.value += 1

    const streamPaymentContract = new StreamPaymentContract()
    streamPaymentContract.init()

    await streamPaymentContract.claimPayment(BigInt(id), BigInt(claimAmount.value))
    loadingSemaphore.value -= 1

    window.location.reload()
}
</script>

<style scoped>
.amount-of-money {
    display: inline;
    font-weight: 500;
}
</style>