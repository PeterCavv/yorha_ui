import { defineStore } from "pinia";

//Temporal values

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            name: null,
            role: null
        }
    }),
    getters: {
        hasRole: (state) => !!state.user.role,
        isAdmin: (state) => state.user.role === 'admin',
        isUser: (state) => state.user.role === 'user'
    },
    actions: {
        setRole(role){
            this.user.role = role;
        }
    }
});
