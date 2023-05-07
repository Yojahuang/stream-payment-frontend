import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import 'vuetify/styles'
import { createVuetify, DisplayBreakpoint } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { createPinia } from 'pinia'

const dark = {
    dark: true,
    colors: {
        background: '#0f0f0f',
        primary: '#8746cb',
        secondary: '#daa152',
        danger: '#bb2124',
        success: '#22bb33',
        warning: '#f0ad4e',
        info: '#5bc0de',
    },
}

const light = {
    dark: false,
    colors: {
        background: '#eee',
        primary: '#66319c',
        secondary: '#915d16',
        danger: '#bb2124',
        success: '#22bb33',
        warning: '#f0ad4e',
        info: '#5bc0de',
    },
}

const theme = {
    defaultTheme: 'dark',
    // themes: {
    //     dark,
    //     light
    // },
}

// Two breakpoint
// 1. When to set the width of navbar to 75%?
// -> xs, sm, md -> 1170
// 2. When to set the navbar into title and a menu button only?
// -> xs, sm -> 875
// 3. when to collapse dashboard item list
// -> xs -> 500
const display = {
    mobileBreakpoint: 'md' as DisplayBreakpoint,
    thresholds: {
        xs: 0,
        sm: 500,
        md: 875,
        lg: 1170,
        xl: 1280,
    },
}

const vuetify = createVuetify({
    components,
    directives,
    theme,
    display
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')
