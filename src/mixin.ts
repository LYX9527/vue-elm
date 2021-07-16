export const skip = {
    methods: {
        skip(address: string) {
            (<any>this).$router.push({ name: address });
        },
    }
}