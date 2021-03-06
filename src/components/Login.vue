<template>
    <div>
        <form 
            class="flex flex-col items-center mt-10 border-gray-600"
            @submit.prevent="login"
        >
            <div class="flex flex-col user">
                <label for="username" class="block text-gray-700 text-sm font-light mb-2">User name</label>
                <input 
                    type="text"
                    v-model="username"
                    id="username" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>

            <div class="flex flex-col mt-10 mb-5">
                <label for="username" class="block text-grey-700 text-sm font-light mb-2">Password</label>
                <input 
                    type="password"
                    v-model="password"
                    id="password" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>

            <button v-if="!loading" class="btn-blue">Sign In</button>
            <button v-if="loading" class="btn-blue flex items-center font-light">A moment
                <svg class="animate-spin h-4 w-4 rounded-full bg-transparent border-2 ml-2 border-transparent border-opacity-50" style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
            </button>
        </form>
        <div class="text-red-600 text-center">{{error.message}}</div>
    </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
    data(){
        return{
            username: "",
            password: "",
            email: "",
            error: "",
            loading: false
        }
    },
    methods: {
        ...mapActions({
            loginvue: "auth/login",
            logoutVue: "/auth/logout"
        }),
        async login(){
            this.loading = true
            try{
                await this.loginvue({
                    username: this.username,
                    password: this.password
                })
                this.loading = false
            }catch(err){
                this.loading = false
                this.error = err;
            }
        },
        async logout(){
            this.loading = true
            try{
                this.loading = false
                await this.logout()

            }catch(err){
                this.error = err;
                console.log(err)
            }
        }
    }    
}
</script>

<style lang="scss" scoped>

</style>