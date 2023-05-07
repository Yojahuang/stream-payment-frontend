import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Dashboard from '@/pages/Dashboard/Dashboard.vue'
import Record from '@/pages/Dashboard/Record.vue'

let history = createWebHistory()
let routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard/:id',
        name: 'Record',
        component: Record,
    }
]

export default createRouter({ history, routes })