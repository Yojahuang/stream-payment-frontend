<template>
    <div>
        <v-avatar size="100" :image="Global.getImageURL(props.filename)" class="d-block mx-auto">
        </v-avatar>
        <div class="mx-auto text-center font-weight-bold">
            {{ props.fullname }}
        </div>
        <div class="mx-auto text-center">
            {{ props.nickname }}
        </div>
    </div>
</template>

<script setup lang="ts">
import Global from "@/composables/Global"
const props = defineProps(['fullname', 'nickname', 'filename'])
</script>