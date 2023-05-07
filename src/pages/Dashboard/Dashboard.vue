<template>
    <div class="mx-auto" :style="{ 'width': xs ? '360px' : '500px' }">
        <v-btn color="secondary" class="my-2" prepend-icon="mdi-plus">Create payment</v-btn>
        <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="Not started">Not started</v-tab>
            <v-tab value="Ongoing">Ongoing</v-tab>
            <v-tab value="Finished">Finished</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="Not started">
                <v-list lines="two">
                    <v-list-item @click="Global.navigateTo(`dashboard/${item.id}`)" v-for="item in records">
                        <template #title>
                            <div class="font-weight-bold">
                                {{ item.title }}
                            </div>
                        </template>
                        <template #subtitle>
                            <v-chip prepend-icon="mdi-cash">
                                {{ item.remainToken }} / {{ item.all }}
                            </v-chip>
                        </template>
                        <template #append>
                            <v-chip prepend-icon="mdi-calendar-range">
                                {{ item.startAt }}
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
            </v-window-item>

            <v-window-item value="Ongoing">
                <v-list lines="two">
                    <v-list-item @click="Global.navigateTo(`dashboard/${item.id}`)" v-for="item in records">
                        <template #title>
                            <div class="font-weight-bold">
                                {{ item.title }}
                            </div>
                        </template>
                        <template #subtitle>
                            <v-chip prepend-icon="mdi-cash">
                                {{ item.remainToken }} / {{ item.all }}
                            </v-chip>
                        </template>
                        <template #append>
                            <v-chip prepend-icon="mdi-calendar-range">
                                {{ item.endAt }}
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
            </v-window-item>

            <v-window-item value="Finished">
                <v-list lines="two">
                    <v-list-item @click="Global.navigateTo(`dashboard/${item.id}`)" v-for="item in records">
                        <template #title>
                            <div class="font-weight-bold">
                                {{ item.title }}
                            </div>
                        </template>
                        <template #subtitle>
                            <v-chip prepend-icon="mdi-cash">
                                {{ item.remainToken }} / {{ item.all }}
                            </v-chip>
                        </template>
                        <template #append>
                            <v-chip prepend-icon="mdi-calendar-range">
                                {{ item.endAt }}
                            </v-chip>
                        </template>
                    </v-list-item>
                </v-list>
            </v-window-item>
        </v-window>


    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRecordStore } from '@/stores/Record'
import { Global } from "@/composables/Global"
import { useDisplay } from 'vuetify'
import { ref } from "vue"

const tab = ref("Not started")

const { xs } = useDisplay()

const { records } = storeToRefs(useRecordStore())
</script>