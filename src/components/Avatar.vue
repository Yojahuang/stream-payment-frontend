<template>
    <div>
        <v-avatar size="100" :image="Global.getImageURL(props.filename)" class="d-block mx-auto">
        </v-avatar>
        <div class="mx-auto text-center font-weight-bold">
            {{ props.fullname }}
        </div>
        <div class="w-full d-flex justify-center">
            <v-chip color="primary" @click="openInNewTab(github_link)" prepend-icon="mdi-github" class="mx-auto">
                {{ props.nickname }}
            </v-chip>
        </div>
    </div>
</template>

<script setup lang="ts">
import Global from "@/composables/Global"
const props = defineProps(['fullname', 'nickname', 'filename', 'github_link'])

const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noreferer')
}
</script>