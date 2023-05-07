import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import 'vuetify/styles'
import { createVuetify, DisplayBreakpoint } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { createPinia } from 'pinia'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const dark = {
    dark: true,
    colors: {
        primary: "#E64A19",
        secondary: "#00897a"
    }
}

const light = {
    dark: false,
    colors: {
        primary: "#ff6f43",
        secondary: "#4db6ab",
        background: "#eee"
    }
}

const theme = {
    defaultTheme: 'dark',
    themes: {
        dark, light
    }
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
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
