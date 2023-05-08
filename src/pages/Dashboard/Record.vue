<template>
    <div :class="{ 'w-75': !smAndDown, 'w-full': smAndDown, 'mx-auto': true }">
        <div class="text-h5 text-md-h4 text-lg-h4 my-2 font-weight-medium">
            {{ records[id].title }}
        </div>
        <div class="d-flex mx-auto align-center justify-center my-2">
            <v-progress-circular :size="smAndDown ? 250 : 400" :width="15"
                :model-value="(records[id].remainToken + records[id].withdraw) / records[id].all * 100" color="secondary">
                <v-progress-circular :size="smAndDown ? 220 : 370" :width="15"
                    :model-value="records[id].withdraw / records[id].all * 100" color="primary">
                    You had withdraw: {{ records[id].withdraw }} DAI <br />
                    You can still withdraw: {{ records[id].remainToken }} DAI
                </v-progress-circular>
            </v-progress-circular>
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
                        <td>{{ transcation.amount }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/Record'
import { useRoute } from "vue-router"
import { useDisplay } from 'vuetify'
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/stores/Global'

const globalStore = useGlobalStore()

const { smAndDown } = useDisplay()

const { records } = storeToRefs(useRecordStore())
const router = useRoute()
const id = Number(router.params.id)

interface Transcation {
    tx: string;
    amount: number;
}

const transcations = ref<Transcation[]>([])

const beautifyTxHash = (tx: string) => {
    return tx.slice(0, 15) + "..."
}

onMounted(() => {
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