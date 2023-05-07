<template>
    <div :class="{ 'w-75': !smAndDown, 'w-full': smAndDown, 'mx-auto': true }">
        <div class="text-h4 text-md-h3 text-lg-h3 my-2">
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
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/Record'
import { useRoute } from "vue-router"
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

const { records } = storeToRefs(useRecordStore())
const router = useRoute()
const id = Number(router.params.id)
</script>