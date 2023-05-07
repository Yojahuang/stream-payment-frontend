import router from '@/router/index'

export default class Global {
    static getImageURL = (name: string): string => {
        const result = new URL(`/src/assets/${name}`, import.meta.url);
        return result.href;
    }

    static navigateTo = (prefix: string) => {
        router.push(`/${prefix}`)
    }
}

export { Global }