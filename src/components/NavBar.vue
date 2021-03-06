<template>
    <div class="bg-white py-5 border-b-2">
        <ul class="flex justify-end">
            <li class="mr-6" v-if="!user">
                <router-link to="/">
                    <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Login</a>
                </router-link>
            </li>
            <li class="mr-6" v-if="!user">
                <router-link to="/signup">
                    <a class="text-blue-500 hover:text-blue-800 cursor-pointer">Sign Up</a>
                </router-link>
            </li>
            <li class="mr-6" v-if="user">
                <div class="font-semibold text-black-500">
                    Welcome {{user.username}}
                </div>
            </li>
            <li class="mr-6" v-if="user">
                <router-link to="/albums">
                    <div 
                        class="text-blue-500 hover:text-blue-800 cursor-pointer"
                        >
                            Albums
                    </div>
                </router-link>
            </li>
            <li class="mr-6" v-if="user">
                <div
                    @click="logout" 
                    class="text-blue-500 hover:text-blue-800 cursor-pointer"
                    >
                        Logout
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    data: () => ({

    }),
    methods: {
        async logout(){
            await this.$store.dispatch("auth/logout")
            this.$router.push("/")
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/user"
        })
    }
}
</script>