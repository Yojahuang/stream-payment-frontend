import router from '@/router/index'
import { useTheme } from 'vuetify'

export default class Global {
    static getImageURL = (name: string): string => {
        const result = new URL(`/src/assets/${name}`, import.meta.url);
        return result.href;
    }

    static navigateTo = (prefix: string) => {
        router.push(`/${prefix}`)
    }

    static currentThemeIsDark = () => {
        const theme = useTheme()
        if (theme.global.current.value.dark) {
            return true
        } else {
            return false
        }
    }
}

export { Global }