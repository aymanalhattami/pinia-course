<script>
// imports
import CartWidget from './CartWidget.vue';
import {mapState, mapActions} from "pinia";
import {useAuthUserStore} from "@/stores/AuthUserStore";

export default {
    components: {CartWidget},
    computed: {
        ...mapState(useAuthUserStore, ['username']),
    },
    methods:{
        ...mapActions(useAuthUserStore, ['visitTwitterProfile'])
    }
}
</script>

<template>
  <header 
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div class="flex gap-x-4">
        <span class="cursor-pointer" @click="visitTwitterProfile">{{username}}</span>
        <CartWidget/>
    </div>
  </header>
</template>