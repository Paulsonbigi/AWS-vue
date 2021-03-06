<template>
    <div>
        <form 
            class="flex flex-col items-center mt-10 border-gray-700" 
            v-if="!confirmPassword"
            @submit.prevent="SignUp">
            <div class="flex flex-col user">
                <label for="username" class="block text-grey-700 textsm font-light mb-2">User name</label>
                <input 
                    type="text"
                    v-model="username"
                    id="username" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>

            <div class="flex flex-col user">
                <label 
                    for="username" 
                    class="block text-grey-700 text-sm font-light pt-5 mb-2">Email</label>
                <input 
                    type="text"
                    v-model="email"
                    id="email" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>

            <div class="flex flex-col mb-10">
                <label for="username" class="block text-gray-700 text-sm pt-5 font-light mb-2">Password</label>
                <input 
                    type="password"
                    v-model="password"
                    id="password" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>

            <button class="btn-blue" v-if="!loading">Sign Up</button>
            <button v-if="loading" class="btn-blue flex items-center font-light">A moment
                <svg class="animate-spin h-4 w-4 rounded-full bg-transparent border-2 ml-2 border-transparent border-opacity-50" style="border-right-color: white; border-top-color: white;" viewBox="0 0 24 24"></svg>
            </button>
        </form>
        <div class="text-red-600 text-center">{{error.message}}</div>

        <!-- to comfirm password -->
        <div v-if="confirmPassword" class="w-4/12 m-auto" >
            <h3>Enter your code. PLease check your email</h3>
            <div class="flex flex-col user">
                <label 
                    for="username" 
                    class="block text-grey-700 text-sm font-bold mb-2">Code</label>
                <input 
                    type="text"
                    v-model="code"
                    id="code" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 loading-tight">
            </div>
            <button class="btn-blue text-center">Confirm Code</button>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex"
export default {
    data: () => ({
            username: "",
            password: "",
            email: "",
            error: "",
            confirmPassword: false,
            code: "",
            loading: false
        }),
    methods: {
        ...mapActions({
            signupVue: "auth/signUp",
            confirmSignUpVue: "auth/confirmSignUp",
            loginvue: "authLogin"           
        }),
        async SignUp(){
            this.loading = true
            if(!this.email || !this.password){
             return   
            }
            try{
                const { username, password, email } = this;
                await this.signupVue({
                    username,
                    password,
                    email,
                })
                this.loading= false
                console.log(username, password, email)
                this.comfirmPassword = true
            }catch(err){
                this.loading = false
                console.log(err)
                this.error = err
            }
        },
        async confirmSignUp(){
            this.loading = true
            if(!this.username || !this.code ){
                return
            }

            try{
                const { username, code, password } = this
                await this.confirmSignUpVue({
                username, code,
                })

                await this.loginvue({
                    username,
                    password
                })
                this.loading = false
                this.$router.push('/albums')
            }catch(err){
                this.loading = false
                console.log(err)
                this.error = err
            }
        }
    }
}
</script>