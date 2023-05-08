import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRecordStore = defineStore('record', () => {
    const records = ref([
        { id: 0, title: "2023 Q4 Salary", startAt: "2023/04/05", endAt: "2023/06/05", remainToken: 100, all: 400, withdraw: 300, identity: 'Creator' },
        { id: 1, title: "2024 Q4 Salary", startAt: "2024/04/05", endAt: "2024/06/05", remainToken: 200, all: 600, withdraw: 200, identity: 'Receiver' },
        { id: 2, title: "2025 Q4 Salary", startAt: "2025/04/05", endAt: "2025/06/05", remainToken: 300, all: 800, withdraw: 100, identity: 'Creator' },
        { id: 3, title: "2026 Q4 Salary", startAt: "2026/04/05", endAt: "2026/06/05", remainToken: 400, all: 1000, withdraw: 0, identity: 'Receiver' },
    ])
    return { records }
})