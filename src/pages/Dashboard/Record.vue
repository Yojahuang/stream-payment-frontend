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
                        You had withdraw: {{ record.withdraw }} DAI <br />
                        You can still withdraw: {{ record.remainToken }} DAI
                    </v-progress-circular>
                </v-progress-circular>
            </v-progress-circular>
        </div>

        <div class="my-2" v-if="smAndDown">
            You had withdraw: <div class="amount-of-money">{{ record.withdraw }}</div> DAI <br />
            You can still withdraw: <div class="amount-of-money">{{ calcClaimeableAmount - record.withdraw }}</div> DAI
        </div>

        <v-btn color="primary">Claim payment</v-btn>

        <div class="text-h5 text-md-h4 text-lg-h4 my-2 font-weight-medium">
            Transcation history
        </div>

        <v-card class="overflow-y-auto my-4" max-height="500">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Tx hash
                        </th>
                        <th class="text-left">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transcation in transcations" :key="transcation.tx">
                        <td v-if="!smAndDown"><a :href="`${globalStore.getExplorer()}/tx/${transcation.tx}`">{{
                            transcation.tx
                        }}</a>
                        </td>
                        <td v-else><a :href="`${globalStore.getExplorer()}/tx/${transcation.tx}`">{{
                            beautifyTxHash(transcation.tx) }}</a>
                        </td>
                        <td>{{ beautifyAmount(transcation.amount) }}...</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { useRecordStore } from '@/stores/Record'
import { useRoute } from "vue-router"
import { useDisplay } from 'vuetify'
import { onMounted, ref, computed } from 'vue'
import { useGlobalStore } from '@/stores/Global'
import { Global } from "@/composables/Global"

const globalStore = useGlobalStore()

const { smAndDown } = useDisplay()

const recordStore = useRecordStore()
const router = useRoute()
const id = Number(router.params.id)
const record = ref<any>({ "id": -1, "title": "-1", "startAt": new Date("2023-05-11T13:14:00.000Z"), "endAt": new Date("2023-05-17T13:14:00.000Z"), "remainToken": 0, "all": 0, "withdraw": 0, "identity": "Creator" })

interface Transcation {
    tx: string;
    amount: number;
}

const transcations = ref<Transcation[]>([])

const beautifyTxHash = (tx: string) => {
    return tx.slice(0, 14) + "..."
}

const beautifyAmount = (amount: number) => {
    return amount.toFixed(6)
}

const calcClaimeableAmount = computed(() => {
    const startTime = Math.floor(record.value.startAt.getTime() / 1000);
    const endTime = Math.floor(record.value.endAt.getTime() / 1000);

    const currentTime = Math.floor(new Date().getTime() / 1000);

    const result = record.value.all * (currentTime - startTime) / (endTime - startTime)

    return result
})

onMounted(() => {
    record.value = recordStore.getStreamById(id)

    for (let i = 0; i < 50; ++i) {
        let tx = "0x"
        for (let j = 0; j < 64; ++j) {
            const validCharacter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
            tx = tx + validCharacter[Math.floor(Math.random() * 16)]
        }

        const amount = Math.random()

        transcations.value.push({
            tx,
            amount,
        })
    }
})
</script>

<style scoped>
.amount-of-money {
    display: inline;
    font-weight: 500;
}
</style>