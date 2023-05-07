import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Record from '@/pages/Dashboard/Record.vue'
import CreateRecord from '@/pages/Dashboard/CreateRecord.vue'

const base = '/stream-payment-frontend'

let history = createWebHistory()
let routes = [
    {
        path: base + '/',
        name: 'Home',
        component: Home,
    },
    {
        path: base + '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: base + '/dashboard/new',
        name: base + 'CreateRecord',
        component: CreateRecord,
    },
    {
        path: base + '/dashboard/:id',
        name: 'Record',
        component: Record,
    }
]

export default createRouter({ history, routes })