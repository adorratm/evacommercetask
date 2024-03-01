import { useMainStore } from '~/store'

export default defineNuxtPlugin(({ $pinia }) => {
    return {
        provide: {
            store: useMainStore(<object | any>$pinia)
        }
    }
})