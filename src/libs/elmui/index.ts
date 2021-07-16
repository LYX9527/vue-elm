interface components{
    [key: string]:any
}
import icon from './components/icon.vue'

const components:components = { icon, }
export const component = {
    install(vue: any) {
        for (const key in components) {
            vue.component(key, components[key])
        }
    }
}
export default component