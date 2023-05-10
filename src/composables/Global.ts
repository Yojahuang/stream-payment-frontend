import router from '@/router/index'
import { useTheme } from 'vuetify'

export default class Global {
    static getImageURL = (name: string): string => {
        const result = new URL(`/src/assets/${name}`, import.meta.url);
        return result.href;
    }

    static navigateTo = (prefix: string) => {
        const base = 'stream-payment-frontend'
        router.push(`/${base}/${prefix}`)
    }

    static currentThemeIsDark = () => {
        const theme = useTheme()
        if (theme.global.current.value.dark) {
            return true
        } else {
            return false
        }
    }

    static beautifyDateTime = (dateTime: Date) => {
        return `${dateTime.getFullYear()}/${dateTime.getMonth() + 1}/${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}`
    }
}

export { Global }