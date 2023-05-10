<template>
    <v-list lines="two">
        <v-list-item @click="Global.navigateTo(`dashboard/${item.id}`)" v-for="item in props.records">
            <template #prepend>
                <v-avatar class="mr-2" v-if="item.identity == 'Creator'" icon="mdi-account-cog">
                </v-avatar>
                <v-avatar class="mr-2" v-else icon="mdi-hand-coin">
                </v-avatar>
            </template>
            <template #title>
                <div class="font-weight-bold">
                    {{ item.title }}
                </div>
            </template>
            <template #subtitle>
                <v-chip class="mr-2" prepend-icon="mdi-cash">
                    {{ item.withdraw }} / {{ item.all }}
                </v-chip>
            </template>
            <template #append>
                <v-chip prepend-icon="mdi-calendar-range">
                    {{ Global.beautifyDateTime(item.startAt) }}
                </v-chip>
            </template>
        </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { Global } from "@/composables/Global"

const props = defineProps(["records"])
</script>