interface IAuthStore {
    login: string;
    password: string;
    status: boolean;
}

const defaultValue: { user: IAuthStore } = {
    user: {
        login: '',
        password: '',
        status: false,
    },
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.user.status
    },
    actions: {
        clear() {
            this.$patch(defaultValue)
        },
        set(input: IAuthStore) {
            this.$patch({user: input})
        }
    },
    persist: true,
})

export const useIsLoadingStore = defineStore('isLoading', {
    state: () => ({
        isLoading: true
    }),
    actions: {
        set(data: boolean) {
            this.$patch({isLoading: data})
        }
    }
})