import { defineStore } from "pinia";

//Temporal values

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            name: null,
            role: 'admin'
        }
    }),
    getters: {
        hasRole: (state) => !!state.user.role,
        isAdmin: (state) => state.user.role === 'admin',
        isUser: (state) => state.user.role === 'user'
    }
});
